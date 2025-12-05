import * as React from 'react';
import { cn } from '@/lib/utils';

function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn(
        // Base styling
        'relative flex flex-col gap-6 rounded-2xl py-6',
        // Glassmorphism effect
        'bg-card/80 backdrop-blur-sm',
        // Modern border with gradient illusion
        'border border-white/20 dark:border-white/10',
        // Multi-layer shadow for depth
        'shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_10px_15px_-3px_rgba(0,0,0,0.08),0_20px_25px_-5px_rgba(0,0,0,0.05)]',
        'dark:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3),0_10px_15px_-3px_rgba(0,0,0,0.4)]',
        // Smooth hover transitions
        'transition-all duration-300 ease-out',
        'hover:shadow-[0_8px_12px_-2px_rgba(0,0,0,0.08),0_16px_24px_-4px_rgba(0,0,0,0.12),0_24px_32px_-6px_rgba(0,0,0,0.08)]',
        'hover:dark:shadow-[0_8px_12px_-2px_rgba(0,0,0,0.4),0_16px_24px_-4px_rgba(0,0,0,0.5)]',
        'hover:-translate-y-1',
        // Text color
        'text-card-foreground',
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
        className
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn('leading-none font-semibold tracking-tight', className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-content" className={cn('px-6', className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
      {...props}
    />
  );
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent };
