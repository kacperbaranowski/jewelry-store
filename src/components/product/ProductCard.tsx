import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import { formatPrice } from '../../utils/formatPrice';
import { useCartStore } from '../../stores/cartStore';
import { useFavoritesStore } from '../../stores/favoritesStore';
import { cn } from '../../utils/cn';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const isProductFavorite = isFavorite(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(product);
  };

  return (
    <article className="group relative bg-surface rounded-lg border border-border overflow-hidden">
      {/* Image */}
      <Link to={`/produkt/${product.slug}`} className="block">
        <div className="aspect-square overflow-hidden bg-background">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* Badges */}
      <div className="absolute top-3 left-3 flex flex-col gap-2">
        {product.oldPrice && <Badge variant="sale">Promocja</Badge>}
        {product.featured && <Badge variant="new">Bestseller</Badge>}
        {!product.inStock && <Badge variant="out-of-stock">Niedostępny</Badge>}
      </div>

      {/* Favorite Button */}
      <button
        onClick={handleToggleFavorite}
        className={cn(
          'absolute top-3 right-3 p-2 rounded-full bg-surface/90 backdrop-blur-sm',
          'hover:bg-surface focus-visible:ring-2 focus-visible:ring-accent',
          'transition-colors'
        )}
        aria-label={isProductFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
        aria-pressed={isProductFavorite}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill={isProductFavorite ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(isProductFavorite ? 'text-red-500' : 'text-text')}
          aria-hidden="true"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      </button>

      {/* Content */}
      <div className="p-4">
        <Link to={`/produkt/${product.slug}`}>
          <h3 className="font-medium text-text line-clamp-2 group-hover:text-accent transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2 flex items-center gap-2">
          <span className="font-heading text-lg font-semibold text-text">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-sm text-text-muted line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        <Button
          onClick={handleAddToCart}
          variant="outline"
          size="sm"
          fullWidth
          className="mt-4"
          disabled={!product.inStock}
        >
          {product.inStock ? 'Dodaj do koszyka' : 'Niedostępny'}
        </Button>
      </div>
    </article>
  );
}
