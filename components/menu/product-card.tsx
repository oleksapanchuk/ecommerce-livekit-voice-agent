'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface IProduct {
  id: number;
  title: string;
  description?: string;
  ingredients: string;
  sku: string;
  price: number;
  weight: string;
  width: string;
  proteins: number;
  mob_img?: string;
}

export type CardProps = {
  product: IProduct;
  className?: string;
};

export function ProductCard({ product, className }: CardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Parse ingredients to show as pills (limit to 3)
  const ingredientList = product.ingredients
    .split(',')
    .map((i) => i.trim())
    .filter(Boolean);
  const displayedIngredients = ingredientList.slice(0, 3);
  const remainingCount = ingredientList.length - 3;

  return (
    <div
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl',
        // Glassmorphism background
        'bg-card/80 backdrop-blur-sm',
        // Modern border
        'border border-white/20 dark:border-white/10',
        // Multi-layer shadow
        'shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_10px_15px_-3px_rgba(0,0,0,0.08),0_20px_25px_-5px_rgba(0,0,0,0.05)]',
        'dark:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3),0_10px_15px_-3px_rgba(0,0,0,0.4)]',
        // Hover transitions
        'transition-all duration-300 ease-out',
        'hover:shadow-[0_8px_12px_-2px_rgba(0,0,0,0.08),0_16px_24px_-4px_rgba(0,0,0,0.12),0_24px_32px_-6px_rgba(0,0,0,0.08)]',
        'hover:dark:shadow-[0_8px_12px_-2px_rgba(0,0,0,0.4),0_16px_24px_-4px_rgba(0,0,0,0.5)]',
        'hover:-translate-y-1',
        className
      )}
      role="article"
      aria-label={product.title}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Overlay */}
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={product.mob_img || '/placeholder.svg'}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={cn(
            'object-cover transition-transform duration-500 ease-out',
            isHovered && 'scale-110'
          )}
          priority={false}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Floating Price Badge */}
        <div
          className={cn(
            'absolute top-3 right-3 rounded-xl px-3 py-1.5',
            'bg-white/90 backdrop-blur-md dark:bg-black/70',
            'shadow-lg',
            'transition-transform duration-300',
            isHovered && 'scale-105'
          )}
        >
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            ${product.price.toFixed(2)}
          </span>
        </div>

        {/* Protein Badge - Dark Blue */}
        {product.proteins > 0 && (
          <div
            className={cn(
              'absolute top-3 left-3 flex items-center gap-1 rounded-lg px-2 py-1',
              'bg-blue-800/90 backdrop-blur-sm',
              'text-xs font-semibold text-white'
            )}
          >
            <span>🥩</span>
            <span>{product.proteins}g protein</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Title */}
        <h3 className="text-foreground text-lg font-bold tracking-tight">{product.title}</h3>

        {/* Detail Chips */}
        <div className="mt-2 flex items-center gap-2">
          <span
            className={cn(
              'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5',
              'bg-muted text-muted-foreground text-xs font-medium'
            )}
          >
            📏 {product.width}cm
          </span>
          <span
            className={cn(
              'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5',
              'bg-muted text-muted-foreground text-xs font-medium'
            )}
          >
            ⚖️ {product.weight}g
          </span>
        </div>

        {/* Ingredient Pills */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {displayedIngredients.map((ingredient, idx) => (
            <span
              key={idx}
              className={cn(
                'rounded-full px-2.5 py-1',
                'bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30',
                'border border-amber-200/50 dark:border-amber-700/30',
                'text-xs font-medium text-amber-800 dark:text-amber-200'
              )}
            >
              {ingredient}
            </span>
          ))}
          {remainingCount > 0 && (
            <span
              className={cn(
                'rounded-full px-2.5 py-1',
                'bg-muted',
                'text-muted-foreground text-xs font-medium'
              )}
            >
              +{remainingCount} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
