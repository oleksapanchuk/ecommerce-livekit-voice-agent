import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IProduct, ProductCard } from '@/components/menu/product-card';
import { cn } from '@/lib/utils';

interface MenuProps {
  isVisible?: boolean;
  className?: string;
}

const Menu = ({ className, isVisible }: MenuProps) => {
  const [pizzas, setPizzas] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await axios.get<IProduct[]>(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products`
        );

        setPizzas(response.data);
      } catch (err) {
        console.error('Error fetching pizzas:', err);
      }
    };

    if (isVisible) {
      fetchPizzas();
      return;
    }

    setPizzas([]);
  }, [isVisible]);

  return (
    <section
      className={cn(
        `scrollbar-thin flex h-screen flex-col overflow-hidden pt-[100px]`,
        !isVisible && 'opacity-0',
        className
      )}
      aria-label="Pizza list section with internal scroll"
    >
      <h2 className={`text-fg1 hidden px-7 py-1 text-2xl font-medium md:flex`}>{`Products`}</h2>

      <div className="min-h-0 flex-1">
        <div className="scrollbar-thin h-full overflow-y-auto">
          <div className="grid grid-cols-1 gap-6 px-5 pb-6 lg:grid-cols-2 2xl:grid-cols-3">
            {pizzas.map((p, i) => (
              <ProductCard key={i} product={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
