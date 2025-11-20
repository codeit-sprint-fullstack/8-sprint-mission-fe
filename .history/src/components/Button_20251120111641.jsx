'use client';

import React, { forwardRef } from 'react';
import Link from 'next/link';

// 지원 variant 목록 (appearance -> variant 명칭 통일)
const VARIANTS = ['primary', 'secondary',  'outline'];

function buildBaseClasses({ fullWidth }) {
  return [
    'inline-flex items-center justify-center',
    'px-6 py-3 rounded-lg text-[16px] font-medium box-border select-none',
    'transition-all duration-200',
    'hover:opacity-90 hover:-translate-y-[1px] active:translate-y-0',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
    fullWidth && 'w-full flex',
  ]
    .filter(Boolean)
    .join(' ');
}

function variantClasses(variant) {
  switch (variant) {
    case 'secondary':
      return ['bg-[var(--gray-200)] text-[var(--gray-900)]', 'hover:bg-[var(--gray-400)]'].join(
        ' ',
      );
    case 'outline':
      return [
        'bg-transparent text-[var(--primary-100)] border border-[var(--primary-100)]',
        'hover:bg-[var(--primary-100)] hover:text-white',
        'py-[11px] px-6', // border 보정
      ].join(' ');
    case 'primary':
    default:
      return ['bg-[var(--primary-100)] text-white', 'hover:bg-[var(--primary-200)]'].join(' ');
  }
}

/**
 * 다목적 접근성 Button 컴포넌트
 * - as / href 조합 처리
 * - disabled 시 aria-disabled, tabIndex 제어
 */
const Button = forwardRef(
  (
    {
      as: As,
      href,
      type = 'button',
      variant = 'primary',
      appearance, // backward compat
      fullWidth = false,
      disabled = false,
      className = '',
      children,
      role,
      ...rest
    },
    ref,
  ) => {
    // appearance prop 과거 호환
    const effectiveVariant = appearance || variant;
    const classes = [
      buildBaseClasses({ fullWidth }),
      VARIANTS.includes(effectiveVariant) && variantClasses(effectiveVariant),
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // 링크 역할: 비활성화 지원 (a 태그는 disabled 없음 → aria 처리)
    if ((As === Link || (href && !As)) && href) {
      return (
        <Link
          href={href}
          ref={ref}
          className={classes}
          aria-disabled={disabled || undefined}
          tabIndex={disabled ? -1 : undefined}
          role={role || 'link'}
          {...rest}
        >
          {children}
        </Link>
      );
    }

    // 커스텀 컴포넌트 (예: motion.button 등) - role/type 위임
    if (As) {
      return (
        <As
          ref={ref}
          className={classes}
          disabled={disabled}
          aria-disabled={disabled || undefined}
          role={role}
          {...rest}
        >
          {children}
        </As>
      );
    }

    // 기본 button
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        aria-disabled={disabled || undefined}
        className={classes}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
