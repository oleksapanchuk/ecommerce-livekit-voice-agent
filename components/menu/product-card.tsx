'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '../ui/card';

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
  return (
    <Card
      className={cn('gap-4 overflow-hidden py-0', className)}
      role="article"
      aria-label={product.title}
    >
      <div className="relative h-56 w-full">
        <Image
          src={product.mob_img || '/placeholder.svg'}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
          priority={false}
        />
      </div>

      <CardContent className="p-4 pt-2">
        <div className="flex items-start justify-between gap-3 pb-2">
          <div className={`flex flex-col gap-1`}>
            <h3 className="text-base leading-tight font-semibold">{product.title}</h3>

            <div className={`text-muted-foreground flex gap-3 text-sm`}>
              <span>{`${product.weight}g`}</span>
              <span>{`${product.width}cm`}</span>
            </div>
          </div>
          <span className="text-fg1 shrink-0 rounded-md px-2 py-1 text-2xl font-medium">
            {`${product.price.toFixed(2)}$`}
          </span>
        </div>

        <p className="text-muted-foreground mt-2 text-sm">{product.ingredients}</p>
      </CardContent>
    </Card>
  );
}
