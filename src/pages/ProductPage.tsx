import { useState } from 'react';
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

type TabType = 'description' | 'specifications' | 'certificates';

export function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;
  const addItem = useCartStore((state) => state.addItem);
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const [activeTab, setActiveTab] = useState<TabType>('description');

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

  const tabs: { id: TabType; label: string }[] = [
    { id: 'description', label: 'Opis' },
    { id: 'specifications', label: 'Specyfikacja' },
    { id: 'certificates', label: 'Certyfikaty' },
  ];

  // Generate specifications based on product data
  const specifications = [
    { label: 'Materiał', value: materialNames[product.material] },
    { label: 'Kategoria', value: categoryNames[product.category] },
    { label: 'Próba', value: product.material === 'gold' || product.material === 'rose-gold' ? '585 (14K)' : product.material === 'platinum' ? '950' : '925' },
    { label: 'Waga', value: product.category === 'rings' ? '3.5 - 5.0 g' : product.category === 'necklaces' ? '8.0 - 15.0 g' : product.category === 'bracelets' ? '10.0 - 20.0 g' : '2.0 - 4.0 g' },
    { label: 'Rozmiar', value: product.category === 'rings' ? '8 - 24 (na zamówienie)' : product.category === 'necklaces' ? '42 - 50 cm' : product.category === 'bracelets' ? '17 - 21 cm' : 'Uniwersalny' },
    { label: 'Wykończenie', value: 'Polerowane, wysoki połysk' },
    { label: 'Opakowanie', value: 'Eleganckie pudełko prezentowe' },
    { label: 'Gwarancja', value: '24 miesiące' },
  ];

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

            {/* Short Description */}
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

        {/* Tabs Section */}
        <div className="mt-16 lg:mt-24">
          {/* Tab Navigation */}
          <div className="border-b border-border" role="tablist" aria-label="Informacje o produkcie">
            <div className="flex gap-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls={`panel-${tab.id}`}
                  className={cn(
                    'pb-4 text-sm font-medium border-b-2 -mb-px transition-colors',
                    activeTab === tab.id
                      ? 'border-accent text-accent'
                      : 'border-transparent text-text-muted hover:text-text hover:border-border'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Panels */}
          <div className="py-8">
            {/* Description Panel */}
            <div
              id="panel-description"
              role="tabpanel"
              aria-labelledby="tab-description"
              hidden={activeTab !== 'description'}
            >
              <div className="prose prose-lg max-w-none">
                <h3 className="font-heading text-xl font-semibold mb-4 text-text">
                  O produkcie
                </h3>
                <p className="text-text-muted leading-relaxed mb-6">
                  {product.description}
                </p>

                <h4 className="font-heading text-lg font-semibold mb-3 text-text">
                  Dlaczego warto wybrać ten produkt?
                </h4>
                <ul className="space-y-2 text-text-muted mb-6">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Wykonany z najwyższej jakości {materialNames[product.material].toLowerCase()}
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Ręcznie wykończony przez doświadczonych jubilerów
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Ponadczasowy design pasujący do każdej stylizacji
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Idealny prezent na wyjątkowe okazje
                  </li>
                </ul>

                <h4 className="font-heading text-lg font-semibold mb-3 text-text">
                  Pielęgnacja biżuterii
                </h4>
                <p className="text-text-muted leading-relaxed">
                  Aby zachować blask biżuterii, zalecamy przechowywanie jej w dołączonym pudełku.
                  Unikaj kontaktu z kosmetykami i perfumami. Czyść miękką szmatką do polerowania srebra lub złota.
                  W przypadku mocniejszych zabrudzeń, zanurz biżuterię w ciepłej wodzie z delikatnym mydłem,
                  a następnie osusz miękką ściereczką.
                </p>
              </div>
            </div>

            {/* Specifications Panel */}
            <div
              id="panel-specifications"
              role="tabpanel"
              aria-labelledby="tab-specifications"
              hidden={activeTab !== 'specifications'}
            >
              <h3 className="font-heading text-xl font-semibold mb-6 text-text">
                Specyfikacja techniczna
              </h3>
              <div className="bg-surface border border-border rounded-lg overflow-hidden">
                <table className="w-full">
                  <tbody>
                    {specifications.map((spec, index) => (
                      <tr
                        key={spec.label}
                        className={cn(
                          'border-b border-border last:border-0',
                          index % 2 === 0 ? 'bg-background' : 'bg-surface'
                        )}
                      >
                        <td className="px-4 py-3 text-sm font-medium text-text w-1/3">
                          {spec.label}
                        </td>
                        <td className="px-4 py-3 text-sm text-text-muted">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 p-4 bg-accent/10 border border-accent/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-accent flex-shrink-0"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-text mb-1">
                      Potrzebujesz innego rozmiaru?
                    </p>
                    <p className="text-sm text-text-muted">
                      Skontaktuj się z nami, a przygotujemy biżuterię w dowolnym rozmiarze.
                      Realizacja zamówień na wymiar trwa 7-14 dni roboczych.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Certificates Panel */}
            <div
              id="panel-certificates"
              role="tabpanel"
              aria-labelledby="tab-certificates"
              hidden={activeTab !== 'certificates'}
            >
              <h3 className="font-heading text-xl font-semibold mb-6 text-text">
                Certyfikaty i gwarancje
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Certificate of Authenticity */}
                <div className="p-6 bg-surface border border-border rounded-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-accent"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-text">Certyfikat Autentyczności</h4>
                      <p className="text-sm text-text-muted">Dołączony do każdego produktu</p>
                    </div>
                  </div>
                  <p className="text-sm text-text-muted">
                    Każdy produkt Aurelius jest dostarczany z certyfikatem autentyczności
                    potwierdzającym jakość materiałów i oryginalność wyrobu.
                  </p>
                </div>

                {/* Hallmark */}
                <div className="p-6 bg-surface border border-border rounded-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-accent"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-text">Próba Mennicza</h4>
                      <p className="text-sm text-text-muted">Oficjalna cecha probierza</p>
                    </div>
                  </div>
                  <p className="text-sm text-text-muted">
                    Wszystkie wyroby ze złota i srebra posiadają oficjalną cechę probierczą
                    nadawaną przez Urząd Probierczy, potwierdzającą próbę metalu.
                  </p>
                </div>

                {/* Warranty */}
                <div className="p-6 bg-surface border border-border rounded-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-accent"
                      >
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-text">Gwarancja 24 miesiące</h4>
                      <p className="text-sm text-text-muted">Pełna ochrona produktu</p>
                    </div>
                  </div>
                  <p className="text-sm text-text-muted">
                    Oferujemy 24-miesięczną gwarancję obejmującą wady materiałowe
                    i produkcyjne. W razie problemów wymienimy lub naprawimy produkt bezpłatnie.
                  </p>
                </div>

                {/* Diamond Certificate */}
                <div className="p-6 bg-surface border border-border rounded-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-accent"
                      >
                        <path d="M6 3h12l4 6-10 13L2 9l4-6z" />
                        <path d="M11 3l1 10 1-10" />
                        <path d="M2 9h20" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-text">Certyfikat Diamentów</h4>
                      <p className="text-sm text-text-muted">Dla produktów z brylantami</p>
                    </div>
                  </div>
                  <p className="text-sm text-text-muted">
                    Wyroby z diamentami powyżej 0.3 ct są dostarczane z międzynarodowym
                    certyfikatem gemmologicznym (GIA, HRD lub IGI) określającym parametry 4C.
                  </p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-primary text-white rounded-lg">
                <div className="flex items-center gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-accent flex-shrink-0"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <div>
                    <h4 className="font-semibold mb-1">100% Satysfakcji</h4>
                    <p className="text-sm text-white/80">
                      Jeśli produkt nie spełni Twoich oczekiwań, masz 30 dni na bezpłatny zwrot
                      bez podawania przyczyny. Twoje zadowolenie jest dla nas priorytetem.
                    </p>
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
