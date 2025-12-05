'use client';

import { type RefObject, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export function useAutoScroll(scrollContentContainerRef: RefObject<Element | null>) {
  useEffect(() => {
    const container = scrollContentContainerRef.current as HTMLElement | null;
    if (!container) return;

    const isNearBottom = () => {
      const threshold = 80; // px
      const distanceFromBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight;
      return distanceFromBottom <= threshold;
    };

    const scrollToBottomIfNeeded = () => {
      if (isNearBottom()) {
        container.scrollTop = container.scrollHeight;
      }
    };

    const resizeObserver = new ResizeObserver(scrollToBottomIfNeeded);
    resizeObserver.observe(container);

    const mutationObserver = new MutationObserver(scrollToBottomIfNeeded);
    mutationObserver.observe(container, { childList: true, subtree: true });

    // Initial scroll on mount
    container.scrollTop = container.scrollHeight;

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [scrollContentContainerRef]);
}
interface ChatProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

export const ChatMessageView = ({ className, children, ...props }: ChatProps) => {
  const scrollContentRef = useRef<HTMLDivElement>(null);

  useAutoScroll(scrollContentRef);

  return (
    <div
      ref={scrollContentRef}
      className={cn('flex flex-col justify-end', className)}
      {...props}
      style={{
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
        ...(props.style || {}),
      }}
    >
      {children}
    </div>
  );
};
