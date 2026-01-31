import { NavLink } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { categoryNames } from '../../data/products';
import type { Category } from '../../types';

interface NavigationProps {
  className?: string;
  onLinkClick?: () => void;
}

const mainCategories: Category[] = ['rings', 'necklaces', 'earrings', 'bracelets', 'wedding'];

export function Navigation({ className, onLinkClick }: NavigationProps) {
  return (
    <nav className={cn('items-center gap-8', className)} aria-label="Nawigacja główna">
      <NavLink
        to="/katalog"
        onClick={onLinkClick}
        className={({ isActive }) =>
          cn(
            'text-sm font-medium transition-colors hover:text-accent',
            isActive ? 'text-accent' : 'text-text'
          )
        }
      >
        Wszystkie Produkty
      </NavLink>
      {mainCategories.map((category) => (
        <NavLink
          key={category}
          to={`/katalog?kategoria=${category}`}
          onClick={onLinkClick}
          className={({ isActive }) =>
            cn(
              'text-sm font-medium transition-colors hover:text-accent',
              isActive ? 'text-accent' : 'text-text'
            )
          }
        >
          {categoryNames[category]}
        </NavLink>
      ))}
      <NavLink
        to="/kontakt"
        onClick={onLinkClick}
        className={({ isActive }) =>
          cn(
            'text-sm font-medium transition-colors hover:text-accent',
            isActive ? 'text-accent' : 'text-text'
          )
        }
      >
        Kontakt
      </NavLink>
    </nav>
  );
}
