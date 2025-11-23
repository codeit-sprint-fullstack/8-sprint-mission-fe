import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps {
  to: string | null;
  className?: string;
  disabled?: boolean;
  onClick?: (() => void) | undefined;
  children: ReactNode;
}

export default function Button({
  className,
  to = null,
  disabled = false,
  onClick,
  children,
}: ButtonProps) {
  const defaultStyle =
    'flex text-white items-center justify-center hover:bg-[var(--hover-blue)] focus:bg-[var(--focus-blue)]';

  return (
    <div>
      {!to && (
        <button
          className={`${defaultStyle} ${
            disabled ? 'cursor-pointer bg-[var(--Cool-Gray-400)]' : 'bg-[var(--brand-blue)]'
          } ${className}`}
          disabled={disabled}
          {...(onClick ? { onClick } : {})}
        >
          {children}
        </button>
      )}
      {to && (
        <Link
          href={to}
          className={`${defaultStyle} ${
            disabled ? 'cursor-pointer bg-[var(--Cool-Gray-400)]' : 'bg-[var(--brand-blue)]'
          } ${className}`}
        >
          {children}
        </Link>
      )}
    </div>
  );
}
