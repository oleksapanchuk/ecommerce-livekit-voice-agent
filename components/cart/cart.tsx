import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Package, ShoppingCart } from '@phosphor-icons/react';
import CartItem from '@/components/cart/cart-item';
import { IProduct } from '@/components/menu/product-card';
import { CartItem as ICartItem } from '@/lib/attach-cart-listener';
import { cn } from '@/lib/utils';

export interface ICartItemWithDetails {
  sku: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartProps {
  cart: ICartItem[];
  isVisible?: boolean;
  className?: string;
}

const Cart = ({ cart, isVisible = false, className }: CartProps) => {
  const [loadingCart, setLoadingCart] = useState(true);
  const [cartItems, setCartItems] = useState<ICartItemWithDetails[]>([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoadingCart(true);

        const skus = cart.map((r) => r.code);
        const response = await axios.post<IProduct[]>(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products/skus`,
          {
            skus,
          }
        );
        const products = response.data ?? [];

        const bySku = new Map(products.map((p) => [p.sku, p]));
        const merged: ICartItemWithDetails[] = cart.map((r) => {
          const p = bySku.get(r.code);
          return {
            sku: r.code,
            image: p?.mob_img ?? '',
            name: p?.title ?? r.code,
            price: p?.price ?? 0,
            quantity: r.amount,
          };
        });

        setCartItems(merged);
      } catch (err) {
        console.error('Error fetching cart:', err);
        setCartItems([]);
      } finally {
        setLoadingCart(false);
      }
    };

    if (isVisible) fetchCart();
  }, [cart, isVisible]);

  const total = cartItems.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Loading state with skeleton
  if (loadingCart) {
    return (
      <section className="mt-[20px] md:mt-[100px]">
        <div className="bg-card/40 m-2 animate-pulse space-y-3 rounded-2xl border border-white/10 p-4">
          <div className="bg-muted h-6 w-24 rounded-lg" />
          <div className="bg-muted h-20 rounded-xl" />
          <div className="bg-muted h-20 rounded-xl" />
        </div>
      </section>
    );
  }

  return (
    <section className={className}>
      {/* Enhanced Cart Header */}
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg shadow-purple-500/25">
          <ShoppingCart weight="duotone" size={22} className="text-white" />
        </div>
        <div className="flex-1">
          <h2 className="text-foreground text-2xl font-bold tracking-tight">Your Cart</h2>
          <p className="text-muted-foreground text-sm">
            {cartItems.length === 0 ? 'Empty' : `${totalItems} item${totalItems > 1 ? 's' : ''}`}
          </p>
        </div>
      </div>

      {/* Cart Container */}
      <div
        aria-label="Shopping cart"
        className={cn(
          'scrollbar-thin relative mx-2 overflow-hidden rounded-2xl',
          // Glassmorphism
          'bg-card/40 backdrop-blur-sm',
          // Border
          'border border-white/15 dark:border-white/10',
          // Shadow
          'shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.3)]',
          !cartItems.length ? 'h-[180px]' : 'max-h-[400px]'
        )}
      >
        {/* Empty State */}
        {!cartItems.length && (
          <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
            <div className="bg-muted/50 flex h-16 w-16 items-center justify-center rounded-full">
              <Package weight="duotone" size={32} className="text-muted-foreground" />
            </div>
            <div>
              <p className="text-foreground font-medium">Your cart is empty</p>
              <p className="text-muted-foreground mt-1 text-sm">Use voice commands to add items</p>
            </div>
          </div>
        )}

        {/* Cart Items */}
        {cartItems.length > 0 && (
          <div className="overflow-y-auto p-3">
            <ul className="space-y-2">
              {cartItems.map(({ sku, image, name, price, quantity }) => (
                <CartItem key={sku} name={name} price={price} quantity={quantity} image={image} />
              ))}
            </ul>
          </div>
        )}

        {/* Total Footer */}
        {cartItems.length > 0 && (
          <div className="from-card/80 to-card/60 border-t border-white/10 bg-gradient-to-r p-4 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-muted-foreground text-sm">Total</span>
                <p className="text-muted-foreground text-xs">{totalItems} items</p>
              </div>
              <div className="text-right">
                <span className="text-foreground text-2xl font-bold tracking-tight">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
