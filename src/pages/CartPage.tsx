import { Link } from 'react-router-dom';
import { useCartStore } from '../stores/cartStore';
import { CartItem } from '../components/cart/CartItem';
import { CartSummary } from '../components/cart/CartSummary';
import { Button } from '../components/ui/Button';

export function CartPage() {
  const { items, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-full bg-background">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-text-muted"
              aria-hidden="true"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
          </div>
          <h1 className="font-heading text-2xl lg:text-3xl font-semibold mb-4 text-text">
            Twój koszyk jest pusty
          </h1>
          <p className="text-text-muted mb-8">
            Dodaj produkty do koszyka, aby kontynuować zakupy.
          </p>
          <Link to="/katalog">
            <Button variant="secondary" size="lg">
              Przeglądaj produkty
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h1 className="font-heading text-2xl lg:text-3xl font-semibold text-text">
            Koszyk ({items.length})
          </h1>
          <button
            onClick={clearCart}
            className="text-sm text-text-muted hover:text-red-600 transition-colors"
          >
            Wyczyść koszyk
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="divide-y divide-border">
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <CartSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
