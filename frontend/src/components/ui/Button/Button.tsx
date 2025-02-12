// src/components/ui/Button/Button.tsx
import { ButtonProps } from './types';
import { twMerge } from 'tailwind-merge';

const variantStyles = {
  primary: 'bg-primary-600 border-2 border-primary-600 text-white hover:bg-primary-700',
  secondary: 'bg-secondary-600 bg-white border-2 border-white text-black hover:bg-secondary-700',
    outline: 'border-2 bg-white/10 border-white/20 text-white hover:bg-primary-50 ',
    ghost: 'border-2 bg-gray-50 border-gray-100 text-black hover:bg-gray-100 '

};

const sizeStyles = {
  sm: 'px-5 py-1.5 text-sm',
  md: 'px-6 py-2 text-base',
  lg: 'px-7 py-3 text-md'
};

export const Button = ({ 
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-0 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const styles = twMerge(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth ? 'w-full' : '',
    className
  );

  return (
    <button
      className={styles}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg 
          className="animate-spin -ml-1 mr-2 h-4 w-4" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};