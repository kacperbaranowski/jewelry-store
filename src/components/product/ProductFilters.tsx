import { categoryNames, materialNames } from '../../data/products';
import type { Category, Material, SortOption } from '../../types';
import { Select } from '../ui/Select';
import { cn } from '../../utils/cn';

interface ProductFiltersProps {
  selectedCategory?: Category;
  selectedMaterial?: Material;
  sortBy: SortOption;
  onCategoryChange: (category?: Category) => void;
  onMaterialChange: (material?: Material) => void;
  onSortChange: (sort: SortOption) => void;
  className?: string;
}

export function ProductFilters({
  selectedCategory,
  selectedMaterial,
  sortBy,
  onCategoryChange,
  onMaterialChange,
  onSortChange,
  className,
}: ProductFiltersProps) {
  const categoryOptions = [
    { value: '', label: 'Wszystkie kategorie' },
    ...Object.entries(categoryNames).map(([value, label]) => ({ value, label })),
  ];

  const materialOptions = [
    { value: '', label: 'Wszystkie materiały' },
    ...Object.entries(materialNames).map(([value, label]) => ({ value, label })),
  ];

  const sortOptions = [
    { value: 'newest', label: 'Najnowsze' },
    { value: 'price-asc', label: 'Cena: rosnąco' },
    { value: 'price-desc', label: 'Cena: malejąco' },
    { value: 'name', label: 'Nazwa A-Z' },
  ];

  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row gap-4',
        className
      )}
      role="group"
      aria-label="Filtry produktów"
    >
      <div className="w-full sm:w-48">
        <Select
          label="Kategoria"
          options={categoryOptions}
          value={selectedCategory || ''}
          onChange={(e) =>
            onCategoryChange(e.target.value as Category || undefined)
          }
        />
      </div>

      <div className="w-full sm:w-48">
        <Select
          label="Materiał"
          options={materialOptions}
          value={selectedMaterial || ''}
          onChange={(e) =>
            onMaterialChange(e.target.value as Material || undefined)
          }
        />
      </div>

      <div className="w-full sm:w-48 sm:ml-auto">
        <Select
          label="Sortowanie"
          options={sortOptions}
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
        />
      </div>
    </div>
  );
}
