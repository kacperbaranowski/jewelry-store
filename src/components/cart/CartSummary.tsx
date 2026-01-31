import { Link } from 'react-router-dom';
import { useCartStore } from '../../stores/cartStore';
import { formatPrice } from '../../utils/formatPrice';
import { Button } from '../ui/Button';

const SHIPPING_COST = 0; // Free shipping
const FREE_SHIPPING_THRESHOLD = 500;

export function CartSummary() {
  const { items, getTotalPrice } = useCartStore();
  const subtotal = getTotalPrice();
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <h2 className="font-heading text-lg font-semibold text-text mb-4">
        Podsumowanie
      </h2>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-text-muted">Produkty ({items.length})</span>
          <span className="text-text">{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-text-muted">Dostawa</span>
          <span className="text-text">
            {shipping === 0 ? (
              <span className="text-green-600">Gratis</span>
            ) : (
              formatPrice(shipping)
            )}
          </span>
        </div>

        {subtotal < FREE_SHIPPING_THRESHOLD && (
          <p className="text-xs text-text-muted">
            Dodaj produkty za {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)}{' '}
            aby uzyskać darmową dostawę.
          </p>
        )}

        <div className="pt-3 border-t border-border">
          <div className="flex justify-between">
            <span className="font-medium text-text">Razem</span>
            <span className="font-heading text-xl font-semibold text-text">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      </div>

      <Link to="/zamowienie" className="block mt-6">
        <Button variant="secondary" fullWidth size="lg" disabled={items.length === 0}>
          Przejdź do zamówienia
        </Button>
      </Link>

      <Link
        to="/katalog"
        className="block mt-3 text-center text-sm text-text-muted hover:text-accent transition-colors"
      >
        Kontynuuj zakupy
      </Link>
    </div>
  );
}
