import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary:
        'btn-primary bg-[#1a1a1a] text-white border-2 border-[#1a1a1a] hover:bg-[#333333] hover:border-[#333333]',
      secondary:
        'btn-secondary bg-[#c9a962] text-black border-2 border-[#c9a962] hover:bg-[#b8954f] hover:border-[#b8954f]',
      outline:
        'btn-outline bg-transparent text-[#1a1a1a] border-2 border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white',
      ghost:
        'btn-ghost bg-transparent text-[#1a1a1a] border-2 border-transparent hover:bg-[#1a1a1a]/10',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-5 py-2.5 text-base',
      lg: 'px-8 py-3.5 text-lg',
    };

    return (
      <button
        ref={ref}
        data-variant={variant}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
