import React from 'react';
import { motion } from 'motion/react';
import { AgentControlBar } from '@/components/livekit/agent-control-bar/agent-control-bar';
import { AppConfig } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ChatControllerProps {
  appConfig: AppConfig;
  sessionStarted: boolean;
  messages: number;
  onSendMessage?: (message: string) => Promise<void>;
}

const ChatController = ({
  appConfig,
  sessionStarted,
  messages,
  onSendMessage,
}: ChatControllerProps) => {
  const { supportsChatInput, supportsVideoInput, supportsScreenShare } = appConfig;
  const capabilities = {
    supportsChatInput,
    supportsVideoInput,
    supportsScreenShare,
  };

  return (
    <div className="bg-background z-50 w-full px-3 pt-2 pb-3 md:px-4 md:pb-4">
      <motion.div
        key="control-bar"
        initial={{ opacity: 0, translateY: '100%' }}
        animate={{
          opacity: sessionStarted ? 1 : 0,
          translateY: sessionStarted ? '0%' : '100%',
        }}
        transition={{ duration: 0.3, delay: sessionStarted ? 0.5 : 0, ease: 'easeOut' }}
      >
        <div className="relative z-10 mx-auto w-full">
          {appConfig.isPreConnectBufferEnabled && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: sessionStarted && messages === 0 ? 1 : 0,
                transition: {
                  ease: 'easeIn',
                  delay: messages > 0 ? 0 : 0.8,
                  duration: messages > 0 ? 0.2 : 0.5,
                },
              }}
              aria-hidden={messages > 0}
              className={cn(
                'absolute inset-x-0 -top-12 text-center',
                sessionStarted && messages === 0 && 'pointer-events-none'
              )}
            >
              <p className="animate-text-shimmer inline-block !bg-clip-text text-sm font-semibold text-transparent">
                Agent is listening, ask it a question
              </p>
            </motion.div>
          )}

          <AgentControlBar capabilities={capabilities} onSendMessage={onSendMessage} />
        </div>

        <div className="from-background border-background absolute top-0 left-0 h-12 w-full -translate-y-full bg-gradient-to-t to-transparent" />
      </motion.div>
    </div>
  );
};

export default ChatController;
