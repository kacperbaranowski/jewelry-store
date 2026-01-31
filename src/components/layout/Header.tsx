import { Link } from 'react-router-dom';
import { useCartStore } from '../../stores/cartStore';
import { useFavoritesStore } from '../../stores/favoritesStore';
import { AccessibilityPanel } from '../accessibility/AccessibilityPanel';
import { Navigation } from './Navigation';

export function Header() {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const favoritesCount = useFavoritesStore((state) => state.items.length);

  return (
    <header className="sticky top-0 z-30 bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-heading text-xl lg:text-2xl font-semibold text-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-accent"
              aria-hidden="true"
            >
              <path d="M6 3h12l4 6-10 13L2 9l4-6z" />
              <path d="M11 3l1 10 1-10" />
              <path d="M2 9h20" />
            </svg>
            <span>Aurelius</span>
          </Link>

          {/* Desktop Navigation */}
          <Navigation className="hidden lg:flex" />

          {/* Actions */}
          <div className="flex items-center gap-2">
            <AccessibilityPanel />

            {/* Favorites */}
            <Link
              to="/ulubione"
              className="relative p-2 rounded-lg hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-accent"
              aria-label={`Ulubione, ${favoritesCount} produktów`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs font-medium bg-accent text-white rounded-full">
                  {favoritesCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/koszyk"
              className="relative p-2 rounded-lg hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-accent"
              aria-label={`Koszyk, ${totalItems} produktów`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs font-medium bg-accent text-white rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Menu nawigacji"
              aria-haspopup="menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
