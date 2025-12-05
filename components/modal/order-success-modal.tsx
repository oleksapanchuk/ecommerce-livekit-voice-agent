'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle, Confetti } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OrderSuccessModal({ isOpen, onClose }: OrderSuccessModalProps) {
  // Auto-close after 4 seconds
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={cn(
              'fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
              'w-[90vw] max-w-md rounded-3xl p-8',
              // Glassmorphism
              'bg-card/95 backdrop-blur-xl',
              'border border-white/20 dark:border-white/10',
              // Shadow
              'shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]'
            )}
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.1 }}
              className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-600 shadow-lg shadow-green-500/30"
            >
              <CheckCircle weight="fill" size={48} className="text-white" />
            </motion.div>

            {/* Confetti decorations */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute -top-2 -right-2"
            >
              <Confetti weight="duotone" size={40} className="text-yellow-500" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute top-8 -left-2"
            >
              <Confetti weight="duotone" size={32} className="rotate-45 text-pink-500" />
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-foreground mb-2 text-center text-2xl font-bold tracking-tight"
            >
              Order Placed! 🎉
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground mb-6 text-center"
            >
              Your order has been successfully submitted. Thank you for your purchase!
            </motion.p>

            {/* Progress bar - shows auto-close countdown */}
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 4, ease: 'linear' }}
              className="mx-auto h-1 w-32 origin-left rounded-full bg-gradient-to-r from-green-400 to-emerald-500"
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
