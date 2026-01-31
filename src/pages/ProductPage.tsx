import { useParams, Link } from 'react-router-dom';
import { getProductBySlug, getRelatedProducts, categoryNames, materialNames } from '../data/products';
import { ProductGallery } from '../components/product/ProductGallery';
import { ProductGrid } from '../components/product/ProductGrid';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { formatPrice } from '../utils/formatPrice';
import { useCartStore } from '../stores/cartStore';
import { useFavoritesStore } from '../stores/favoritesStore';
import { cn } from '../utils/cn';

export function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;
  const addItem = useCartStore((state) => state.addItem);
  const { isFavorite, toggleFavorite } = useFavoritesStore();

  if (!product) {
    return (
      <div className="py-16 text-center">
        <h1 className="font-heading text-2xl font-semibold mb-4 text-text">
          Produkt nie został znaleziony
        </h1>
        <Link to="/katalog">
          <Button>Wróć do katalogu</Button>
        </Link>
      </div>
    );
  }

  const isProductFavorite = isFavorite(product.id);
  const relatedProducts = getRelatedProducts(product, 4);

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <div className="py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Ścieżka nawigacji" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-text-muted">
            <li>
              <Link to="/" className="hover:text-accent">
                Strona główna
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link to="/katalog" className="hover:text-accent">
                Katalog
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                to={`/katalog?kategoria=${product.category}`}
                className="hover:text-accent"
              >
                {categoryNames[product.category]}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-text">
              {product.name}
            </li>
          </ol>
        </nav>

        {/* Product Details */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Gallery */}
          <ProductGallery images={product.images} productName={product.name} />

          {/* Info */}
          <div>
            {/* Badges */}
            <div className="flex gap-2 mb-4">
              {product.oldPrice && <Badge variant="sale">Promocja</Badge>}
              {product.featured && <Badge variant="new">Bestseller</Badge>}
              {!product.inStock && (
                <Badge variant="out-of-stock">Niedostępny</Badge>
              )}
            </div>

            <h1 className="font-heading text-2xl lg:text-3xl font-semibold text-text">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mt-4 flex items-center gap-3">
              <span className="font-heading text-3xl font-semibold text-text">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-xl text-text-muted line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>

            {/* Material */}
            <div className="mt-6">
              <span className="text-sm text-text-muted">Materiał: </span>
              <span className="text-sm font-medium text-text">
                {materialNames[product.material]}
              </span>
            </div>

            {/* Description */}
            <p className="mt-6 text-text-muted leading-relaxed">
              {product.description}
            </p>

            {/* Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleAddToCart}
                variant="secondary"
                size="lg"
                className="flex-1"
                disabled={!product.inStock}
              >
                {product.inStock ? 'Dodaj do koszyka' : 'Niedostępny'}
              </Button>

              <Button
                onClick={() => toggleFavorite(product)}
                variant="outline"
                size="lg"
                className={cn(
                  'flex items-center gap-2',
                  isProductFavorite && 'border-red-500 text-red-500'
                )}
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
                  aria-hidden="true"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                {isProductFavorite ? 'W ulubionych' : 'Dodaj do ulubionych'}
              </Button>
            </div>

            {/* Features */}
            <div className="mt-10 pt-8 border-t border-border">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-accent flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-text">Gwarancja</p>
                    <p className="text-xs text-text-muted">24 miesiące</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-accent flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    <rect width="16" height="13" x="4" y="5" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-text">Dostawa</p>
                    <p className="text-xs text-text-muted">Gratis od 500 zł</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-accent flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-text">Zwroty</p>
                    <p className="text-xs text-text-muted">30 dni na zwrot</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-accent flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-text">Opakowanie</p>
                    <p className="text-xs text-text-muted">Eleganckie pudełko</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 lg:mt-24" aria-labelledby="related-heading">
            <h2
              id="related-heading"
              className="font-heading text-2xl lg:text-3xl font-semibold mb-8 text-text"
            >
              Podobne produkty
            </h2>
            <ProductGrid products={relatedProducts} />
          </section>
        )}
      </div>
    </div>
  );
}
