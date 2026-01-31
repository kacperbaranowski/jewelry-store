import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, categoryNames } from '../data/products';
import { ProductGrid } from '../components/product/ProductGrid';
import { ProductFilters } from '../components/product/ProductFilters';
import type { Category, Material, SortOption } from '../types';

export function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get('kategoria') as Category | null;
  const selectedMaterial = searchParams.get('material') as Material | null;
  const sortBy = (searchParams.get('sortuj') as SortOption) || 'newest';

  const handleCategoryChange = (category?: Category) => {
    const params = new URLSearchParams(searchParams);
    if (category) {
      params.set('kategoria', category);
    } else {
      params.delete('kategoria');
    }
    setSearchParams(params);
  };

  const handleMaterialChange = (material?: Material) => {
    const params = new URLSearchParams(searchParams);
    if (material) {
      params.set('material', material);
    } else {
      params.delete('material');
    }
    setSearchParams(params);
  };

  const handleSortChange = (sort: SortOption) => {
    const params = new URLSearchParams(searchParams);
    params.set('sortuj', sort);
    setSearchParams(params);
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by material
    if (selectedMaterial) {
      result = result.filter((p) => p.material === selectedMaterial);
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name, 'pl'));
        break;
      case 'newest':
      default:
        // Keep original order (assuming newest first in data)
        break;
    }

    return result;
  }, [selectedCategory, selectedMaterial, sortBy]);

  const pageTitle = selectedCategory
    ? categoryNames[selectedCategory]
    : 'Wszystkie Produkty';

  return (
    <div className="py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl lg:text-4xl font-semibold text-text">
            {pageTitle}
          </h1>
          <p className="mt-2 text-text-muted">
            {filteredProducts.length}{' '}
            {filteredProducts.length === 1
              ? 'produkt'
              : filteredProducts.length < 5
              ? 'produkty'
              : 'produktów'}
          </p>
        </div>

        {/* Filters */}
        <ProductFilters
          selectedCategory={selectedCategory || undefined}
          selectedMaterial={selectedMaterial || undefined}
          sortBy={sortBy}
          onCategoryChange={handleCategoryChange}
          onMaterialChange={handleMaterialChange}
          onSortChange={handleSortChange}
          className="mb-8"
        />

        {/* Products Grid */}
        <ProductGrid
          products={filteredProducts}
          emptyMessage="Nie znaleziono produktów spełniających kryteria."
        />
      </div>
    </div>
  );
}
