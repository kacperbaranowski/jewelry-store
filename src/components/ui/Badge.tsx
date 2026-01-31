import { cn } from '../../utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'sale' | 'new' | 'out-of-stock';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    default: 'badge-default bg-[#1a1a1a] text-white',
    sale: 'badge-sale bg-[#dc2626] text-white',
    new: 'badge-new bg-[#c9a962] text-black',
    'out-of-stock': 'badge-out-of-stock bg-[#6b7280] text-white',
  };

  return (
    <span
      data-variant={variant}
      className={cn(
        'inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
