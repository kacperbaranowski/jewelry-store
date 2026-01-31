import { Link } from 'react-router-dom';
import type { CartItem as CartItemType } from '../../types';
import { formatPrice } from '../../utils/formatPrice';
import { useCartStore } from '../../stores/cartStore';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { product, quantity } = item;
  const { updateQuantity, removeItem } = useCartStore();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(product.id);
    } else {
      updateQuantity(product.id, newQuantity);
    }
  };

  return (
    <article className="flex gap-4 py-4 border-b border-border">
      {/* Image */}
      <Link
        to={`/produkt/${product.slug}`}
        className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-background"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <Link
          to={`/produkt/${product.slug}`}
          className="font-medium text-text hover:text-accent transition-colors line-clamp-2"
        >
          {product.name}
        </Link>

        <p className="mt-1 text-sm text-text-muted">
          {formatPrice(product.price)} / szt.
        </p>

        {/* Quantity Controls */}
        <div className="mt-3 flex items-center gap-3">
          <div className="flex items-center border border-border rounded-lg">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className="px-3 py-1.5 hover:bg-primary/10 rounded-l-lg transition-colors"
              aria-label="Zmniejsz ilość"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
              </svg>
            </button>
            <span
              className="px-4 py-1.5 text-center min-w-[3rem] font-medium"
              aria-label={`Ilość: ${quantity}`}
            >
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="px-3 py-1.5 hover:bg-primary/10 rounded-r-lg transition-colors"
              aria-label="Zwiększ ilość"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
            </button>
          </div>

          <button
            onClick={() => removeItem(product.id)}
            className="p-2 text-text-muted hover:text-red-600 transition-colors"
            aria-label={`Usuń ${product.name} z koszyka`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
          </button>
        </div>
      </div>

      {/* Price */}
      <div className="text-right">
        <span className="font-heading font-semibold text-text">
          {formatPrice(product.price * quantity)}
        </span>
      </div>
    </article>
  );
}
