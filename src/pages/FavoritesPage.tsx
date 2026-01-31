import { Link } from 'react-router-dom';
import { useFavoritesStore } from '../stores/favoritesStore';
import { ProductGrid } from '../components/product/ProductGrid';
import { Button } from '../components/ui/Button';

export function FavoritesPage() {
  const items = useFavoritesStore((state) => state.items);

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
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </div>
          <h1 className="font-heading text-2xl lg:text-3xl font-semibold mb-4 text-text">
            Lista ulubionych jest pusta
          </h1>
          <p className="text-text-muted mb-8">
            Dodaj produkty do ulubionych, klikając ikonę serca przy produkcie.
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
        <div className="mb-8">
          <h1 className="font-heading text-2xl lg:text-3xl font-semibold text-text">
            Ulubione ({items.length})
          </h1>
          <p className="mt-2 text-text-muted">
            Twoje ulubione produkty są zapisane i czekają na Ciebie.
          </p>
        </div>

        <ProductGrid products={items} />
      </div>
    </div>
  );
}
