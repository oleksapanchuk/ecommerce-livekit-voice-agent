'use client';

import React, { useEffect } from 'react';
import { type AgentState, useRoomContext, useVoiceAssistant } from '@livekit/components-react';
import { toastAlert } from '@/components/alert-toast';
import Cart from '@/components/cart/cart';
import Chat from '@/components/chat/chat';
import Menu from '@/components/menu/menu';
import { useDebugMode } from '@/hooks/useDebug';
import { CartItem } from '@/lib/attach-cart-listener';
import type { AppConfig } from '@/lib/types';

function isAgentAvailable(agentState: AgentState) {
  return agentState == 'listening' || agentState == 'thinking' || agentState == 'speaking';
}

interface SessionViewProps {
  appConfig: AppConfig;
  disabled: boolean;
  sessionStarted: boolean;
  cart: CartItem[];
}

export const SessionView = ({
  appConfig,
  disabled,
  sessionStarted,
  ref,
  cart,
}: React.ComponentProps<'div'> & SessionViewProps) => {
  const { state: agentState } = useVoiceAssistant();
  const room = useRoomContext();

  useDebugMode();

  useEffect(() => {
    if (sessionStarted) {
      const timeout = setTimeout(() => {
        if (!isAgentAvailable(agentState)) {
          const reason =
            agentState === 'connecting'
              ? 'Agent did not join the room. '
              : 'Agent connected but did not complete initializing. ';

          toastAlert({
            title: 'Session ended',
            description: (
              <p className="w-full">
                {reason}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://docs.livekit.io/agents/start/voice-ai/"
                  className="whitespace-nowrap underline"
                >
                  See quickstart guide
                </a>
                .
              </p>
            ),
          });
          room.disconnect();
        }
      }, 10_000);

      return () => clearTimeout(timeout);
    }
  }, [agentState, sessionStarted, room]);

  return (
    <div className={`flex w-full flex-col md:flex-row`}>
      <div className={`relative flex h-screen overflow-hidden md:max-w-[50%] md:min-w-[50%]`}>
        <main
          ref={ref}
          inert={disabled}
          className={`relative flex h-full min-h-0 w-full flex-col gap-3`}
        >
          <div className={`h-[80px] md:hidden`} />

          <Cart cart={cart} isVisible={sessionStarted} />

          <Chat appConfig={appConfig} sessionStarted={sessionStarted} />
        </main>
      </div>

      <Menu isVisible={sessionStarted} className={`hidden md:flex`} />
    </div>
  );
};
