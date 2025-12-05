'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Room, RoomEvent } from 'livekit-client';
import { motion } from 'motion/react';
import { RoomAudioRenderer, RoomContext, StartAudio } from '@livekit/components-react';
import { toastAlert } from '@/components/alert-toast';
import { OrderSuccessModal } from '@/components/modal/order-success-modal';
import { SessionView } from '@/components/session-view';
import { Toaster } from '@/components/ui/sonner';
import { Welcome } from '@/components/welcome';
import useConnectionDetails from '@/hooks/useConnectionDetails';
import { CartItem, attachCartListener } from '@/lib/attach-cart-listener';
import type { AppConfig } from '@/lib/types';

const MotionWelcome = motion.create(Welcome);
const MotionSessionView = motion.create(SessionView);

interface AppProps {
  appConfig: AppConfig;
}

export function App({ appConfig }: AppProps) {
  const [sessionId, setSessionId] = useState(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const room = useMemo(() => new Room(), [sessionId]);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const { connectionDetails, refreshConnectionDetails } = useConnectionDetails();

  const onOrderCompleted = useCallback(() => {
    setCart([]);
    setShowOrderSuccess(true);
  }, []);

  const handleCloseOrderSuccess = useCallback(() => {
    setShowOrderSuccess(false);
  }, []);

  useEffect(() => {
    const onDisconnected = () => {
      setSessionStarted(false);
      setCart([]);
      refreshConnectionDetails();
    };
    const onMediaDevicesError = (error: Error) => {
      toastAlert({
        title: 'Encountered an error with your media devices',
        description: `${error.name}: ${error.message}`,
      });
    };
    room.on(RoomEvent.MediaDevicesError, onMediaDevicesError);
    room.on(RoomEvent.Disconnected, onDisconnected);

    attachCartListener(room, setCart, onOrderCompleted);

    return () => {
      room.off(RoomEvent.Disconnected, onDisconnected);
      room.off(RoomEvent.MediaDevicesError, onMediaDevicesError);
    };
  }, [room, refreshConnectionDetails, onOrderCompleted]);

  useEffect(() => {
    async function connectRoom() {
      if (!(sessionStarted && room.state === 'disconnected' && connectionDetails)) return;
      try {
        await room.connect(connectionDetails.serverUrl, connectionDetails.participantToken);
        if (appConfig.isPreConnectBufferEnabled) {
          await room.localParticipant.setMicrophoneEnabled(true, undefined, {
            preConnectBuffer: true,
          });
        } else {
          await room.localParticipant.setMicrophoneEnabled(true);
        }
      } catch (error) {
        toastAlert({
          title: 'There was an error connecting to the agent',
          description: `${error}`,
        });
      }
    }

    connectRoom();
  }, [room, sessionStarted, connectionDetails, appConfig.isPreConnectBufferEnabled]);

  // Disconnect when the session is ended, and on unmount
  useEffect(() => {
    if (!sessionStarted && room.state !== 'disconnected') {
      room.disconnect();
    }
  }, [sessionStarted, room]);

  useEffect(() => {
    return () => {
      if (room.state !== 'disconnected') {
        room.disconnect();
      }
    };
  }, [room]);

  const { startButtonText } = appConfig;

  return (
    <>
      <MotionWelcome
        key="welcome"
        startButtonText={startButtonText}
        onStartCall={() => {
          // Ensure we always use a fresh token for a new session
          refreshConnectionDetails();
          setSessionId((id) => id + 1);
          setSessionStarted(true);
        }}
        disabled={sessionStarted}
        initial={{ opacity: 0 }}
        animate={{ opacity: sessionStarted ? 0 : 1 }}
        transition={{ duration: 0.5, ease: 'linear', delay: sessionStarted ? 0 : 0.5 }}
      />

      <RoomContext.Provider key={`room-${sessionId}`} value={room}>
        <RoomAudioRenderer />
        <StartAudio label="Start Audio" />
        {/* --- */}
        <MotionSessionView
          key={`session-view-${sessionId}`}
          appConfig={appConfig}
          disabled={!sessionStarted}
          sessionStarted={sessionStarted}
          initial={{ opacity: 0 }}
          animate={{ opacity: sessionStarted ? 1 : 0 }}
          transition={{
            duration: 0.5,
            ease: 'linear',
            delay: sessionStarted ? 0.5 : 0,
          }}
          cart={cart}
        />
      </RoomContext.Provider>

      {/* Order Success Modal */}
      <OrderSuccessModal isOpen={showOrderSuccess} onClose={handleCloseOrderSuccess} />

      <Toaster />
    </>
  );
}
