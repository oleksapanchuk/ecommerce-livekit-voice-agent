import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface CartItemProps {
  name: string;
  price: number;
  quantity: number;
  image: string;
  className?: string;
}

const CartItem = ({ name, price, quantity, image, className }: CartItemProps) => {
  // Ensure price is a number (may come as string from API)
  const safePrice = Number(price) || 0;
  const itemTotal = safePrice * quantity;

  return (
    <li
      className={cn(
        'group relative flex items-center gap-4 rounded-xl p-3',
        // Glassmorphism background
        'bg-card/60 backdrop-blur-sm',
        // Modern border
        'border border-white/15 dark:border-white/10',
        // Subtle shadow
        'shadow-sm',
        // Hover effect
        'transition-all duration-200',
        'hover:bg-card/80 hover:shadow-md',
        className
      )}
    >
      {/* Product Image with rounded corners */}
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl shadow-md">
        <Image
          src={image || '/placeholder.svg'}
          alt={name}
          fill
          className="object-cover"
          sizes="64px"
        />
        {/* Quantity Badge on Image */}
        <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-lg">
          {quantity}
        </div>
      </div>

      {/* Item Details */}
      <div className="min-w-0 flex-1">
        <h4 className="truncate font-semibold tracking-tight text-foreground">{name}</h4>
        <div className="mt-1 flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            ${safePrice.toFixed(2)} × {quantity}
          </span>
        </div>
      </div>

      {/* Item Total */}
      <div className="shrink-0 text-right">
        <div className="text-lg font-bold text-foreground">${itemTotal.toFixed(2)}</div>
        <div className="text-xs text-muted-foreground">subtotal</div>
      </div>
    </li>
  );
};

export default CartItem;
