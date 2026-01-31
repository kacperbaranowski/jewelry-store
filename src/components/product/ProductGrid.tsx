import type { Product } from '../../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
}

export function ProductGrid({
  products,
  emptyMessage = 'Brak produktów do wyświetlenia.',
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-text-muted">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      role="list"
      aria-label="Lista produktów"
    >
      {products.map((product) => (
        <div key={product.id} role="listitem">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
