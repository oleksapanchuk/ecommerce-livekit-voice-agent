import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import type { ReceivedChatMessage } from '@livekit/components-react';
import ChatController from '@/components/chat/chat-controller';
import { ChatEntry } from '@/components/livekit/chat/chat-entry';
import { ChatMessageView } from '@/components/livekit/chat/chat-message-view';
import useChatAndTranscription from '@/hooks/useChatAndTranscription';
import { AppConfig } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ChatProps {
  appConfig: AppConfig;
  sessionStarted: boolean;
  className?: string;
}

const Chat = ({ appConfig, sessionStarted }: ChatProps) => {
  const { messages, send } = useChatAndTranscription();

  async function handleSendMessage(message: string) {
    await send(message);
  }

  return (
    <>
      <ChatMessageView
        className={cn(
          'scrollbar-hidden h-[600px] overflow-y-auto px-2 ' +
            'translate-y-0 opacity-100 transition-[opacity,translate] delay-200 duration-300 ease-out'
        )}
      >
        <div className="space-y-3 whitespace-pre-wrap">
          <AnimatePresence>
            {messages.map((message: ReceivedChatMessage) => (
              <motion.div
                key={`${message.id}-${message.timestamp}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 1, height: 'auto', translateY: 0.001 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <ChatEntry hideName key={`${message.id}-${message.timestamp}`} entry={message} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </ChatMessageView>

      <ChatController
        appConfig={appConfig}
        sessionStarted={sessionStarted}
        messages={messages.length}
        onSendMessage={handleSendMessage}
      />
    </>
  );
};

export default Chat;
