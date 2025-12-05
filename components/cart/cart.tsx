import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

  if (loadingCart) return <div>Loading cart…</div>;

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section className={`mt-[20px] md:mt-[100px]`}>
      <h2 className={`text-fg1 px-4 py-1 text-2xl font-medium`}>{`Cart`}</h2>

      <div
        aria-label="Shopping cart (compact)"
        className={cn(
          'scrollbar-thin relative m-2 mt-0 min-h-[150px] overflow-y-auto rounded-md border border-gray-600 p-2',
          !cartItems.length ? 'flex h-[150px] items-center justify-center' : 'h-[300px]',
          className
        )}
      >
        {!cartItems.length && <div>Your cart is empty.</div>}

        {cartItems.length > 0 && (
          <div className="text-fg1 bg-background border-fg1 absolute top-0 right-0 z-10 rounded-md border-1 px-4 py-2 text-sm font-medium lg:text-2xl">
            {`Total: ${total.toFixed(2)}$`}
          </div>
        )}

        {cartItems.length > 0 && (
          <ul className="space-y-3">
            {cartItems.map(({ sku, image, name, price, quantity }) => (
              <CartItem key={sku} name={name} price={price} quantity={quantity} image={image} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Cart;
