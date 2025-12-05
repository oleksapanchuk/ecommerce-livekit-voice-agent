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
  return (
    <li
      className={cn(
        `hover:bg-muted/20 flex items-center gap-3 rounded-md border border-gray-600/70 p-2`,
        className
      )}
    >
      <div className="shrink-0 overflow-hidden rounded-md border">
        <Image
          src={image || '/placeholder.svg?'}
          alt={name}
          width={64}
          height={64}
          className="h-16 w-16 object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="truncate font-medium">{name}</div>
        <div className="text-muted-foreground mt-1 flex gap-5 text-sm">
          <div className={`flex gap-2`}>
            <span>Price:</span>
            <span className="text-foreground">{String(price)}</span>
          </div>
          <div className={`flex gap-2`}>
            <span>Quantity:</span>
            <span className="text-foreground">{quantity}</span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
