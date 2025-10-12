'use client';
import { useState } from 'react';
import PropTypes from 'prop-types';

/*
  공통 인증 입력 컴포넌트
  props:
    - id: string (input id)
    - label: string (라벨 텍스트)
    - type: 'text' | 'email' | 'password'
    - value: string
    - onChange: (e) => void
    - placeholder: string
    - error: string (에러 메시지)
    - withToggle: boolean (password 토글 버튼 사용할지)
    - className: 추가 래퍼 클래스
*/
function AuthInput({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  withToggle = false,
  className = '',
}) {
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
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full h-14 rounded-lg bg-[var(--gray-100)] ${withToggle && isPassword ? 'pr-14 pl-6' : 'px-6'} text-black placeholder:text-[var(--gray-400)] focus:outline-none border ${error ? 'border-[var(--error-red)]' : 'border-transparent focus:border-primary'}`}
          aria-invalid={error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        {withToggle && isPassword && (
          <button
            type="button"
            aria-label={show ? `${label} 숨기기` : `${label} 보기`}
            onClick={() => setShow((s) => !s)}
            className="absolute inset-y-0 right-2 flex items-center px-2"
            tabIndex={-1}
          >
            <img
              src={
                show
                  ? '/images/icon/btn_visibility_off_24px.svg'
                  : '/images/icon/btn_visibility_on_24px.svg'
              }
              alt="toggle visibility"
              className="w-6 h-6"
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
}

AuthInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  withToggle: PropTypes.bool,
  className: PropTypes.string,
};

export default AuthInput;
