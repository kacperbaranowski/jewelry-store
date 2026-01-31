import { useState, useEffect, useCallback } from 'react';
import { cn } from '../../utils/cn';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPrevious = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxOpen, goToPrevious, goToNext]);

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* Main Image */}
        <button
          onClick={() => openLightbox(activeIndex)}
          className="aspect-square rounded-lg overflow-hidden bg-background border border-border cursor-zoom-in focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          aria-label="Powiększ zdjęcie"
        >
          <img
            src={images[activeIndex]}
            alt={`${productName} - zdjęcie ${activeIndex + 1}`}
            className="w-full h-full object-cover"
          />
        </button>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-3" role="tablist" aria-label="Galeria zdjęć produktu">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  'w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors',
                  activeIndex === index
                    ? 'border-accent'
                    : 'border-border hover:border-accent/50'
                )}
                role="tab"
                aria-selected={activeIndex === index}
                aria-label={`Zdjęcie ${index + 1}`}
              >
                <img
                  src={image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
          role="dialog"
          aria-modal="true"
          aria-label="Powiększone zdjęcie produktu"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors z-10"
            aria-label="Zamknij"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>

          {/* Previous button */}
          {images.length > 1 && (
            <button
              onClick={goToPrevious}
              className="absolute left-4 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Poprzednie zdjęcie"
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
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
          )}

          {/* Image */}
          <div className="max-w-[90vw] max-h-[90vh] flex items-center justify-center">
            <img
              src={images[activeIndex]}
              alt={`${productName} - zdjęcie ${activeIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>

          {/* Next button */}
          {images.length > 1 && (
            <button
              onClick={goToNext}
              className="absolute right-4 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Następne zdjęcie"
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
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          )}

          {/* Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm">
              {activeIndex + 1} / {images.length}
            </div>
          )}

          {/* Thumbnails in lightbox */}
          {images.length > 1 && (
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    'w-16 h-16 rounded-lg overflow-hidden border-2 transition-all',
                    activeIndex === index
                      ? 'border-white opacity-100'
                      : 'border-transparent opacity-50 hover:opacity-80'
                  )}
                >
                  <img
                    src={image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
