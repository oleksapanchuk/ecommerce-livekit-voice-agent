import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Storefront } from '@phosphor-icons/react';
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
      {/* Enhanced Products Header */}
      <div className="hidden items-center gap-3 px-7 py-4 md:flex">
        <div className="flex items-center gap-3">
          <div className="from-primary shadow-primary/25 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br to-blue-600 shadow-lg">
            <Storefront weight="duotone" size={22} className="text-white" />
          </div>
          <div>
            <h2 className="text-foreground text-2xl font-bold tracking-tight">Our Products</h2>
            <p className="text-muted-foreground text-sm">Discover our delicious selection</p>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium">
            {pizzas.length} items
          </span>
        </div>
      </div>

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
