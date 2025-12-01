'use client';
import Image from 'next/image';
import { forwardRef, useState } from 'react';

interface AuthInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  id: string;
  label?: string;
  type?: 'text' | 'email' | 'password';
  error?: string;
  withToggle?: boolean;
  className?: string;
}

const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(function AuthInput(
  { id, label, type = 'text', error, withToggle = false, className = '', ...props },
  ref,
) {
  const isPassword = type === 'password';
  const [show, setShow] = useState(false);
  const inputType = isPassword && withToggle ? (show ? 'text' : 'password') : type;

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="mb-4 inline-block text-lg font-bold text-[var(--gray-800)]">
          {label}
        </label>
      )}
      <div className={withToggle && isPassword ? 'relative' : ''}>
        <input
          id={id}
          type={inputType}
          ref={ref}
          className={`w-full h-14 rounded-lg bg-[var(--gray-100)] ${
            withToggle && isPassword ? 'pr-14 pl-6' : 'px-6'
          } text-black placeholder:text-[var(--gray-400)] focus:outline-none border ${
            error ? 'border-[var(--error-red)]' : 'border-transparent focus:border-primary'
          }`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
        {withToggle && isPassword && (
          <button
            type="button"
            aria-label={show ? `${label} 숨기기` : `${label} 보기`}
            onClick={() => setShow((s) => !s)}
            className="absolute inset-y-0 right-2 flex items-center px-2"
            tabIndex={-1}
          >
            <Image
              src={
                show
                  ? '/images/icon/btn_visibility_off_24px.svg'
                  : '/images/icon/btn_visibility_on_24px.svg'
              }
              alt="toggle visibility"
              className="w-6 h-6"
              width={24}
              height={24}
            />
          </button>
        )}
      </div>
      {error && (
        <span id={`${id}-error`} className="mt-2 ml-4 inline-block text-sm text-[var(--error-red)]">
          {error}
        </span>
      )}
    </div>
  );
});

export default AuthInput;
