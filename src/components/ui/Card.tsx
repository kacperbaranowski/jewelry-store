import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'section';
}

export function Card({ children, className, as: Component = 'div' }: CardProps) {
  return (
    <Component
      className={cn(
        'bg-surface rounded-lg border border-border overflow-hidden',
        className
      )}
    >
      {children}
    </Component>
  );
}

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function CardImage({ src, alt, className }: CardImageProps) {
  return (
    <div className={cn('aspect-square overflow-hidden', className)}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={cn('p-4', className)}>{children}</div>;
}
