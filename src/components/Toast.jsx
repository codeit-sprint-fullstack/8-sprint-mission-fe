'use client';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@/components/Button';

/*
Props:
- open: boolean
- message: string
- onClose: () => void
- autoCloseMs?: number (자동 닫기 시간, 미지정 시 자동 닫기 없음)
- type?: 'info' | 'error' | 'success'
Rendering: 중앙 모달 스타일 (기존 alert overlay 대체)
*/
export default function Toast({ open, message, onClose, autoCloseMs, type = 'info' }) {
  useEffect(() => {
    if (!open || !autoCloseMs) return;
    const id = setTimeout(() => {
      onClose?.();
    }, autoCloseMs);
    return () => clearTimeout(id);
  }, [open, autoCloseMs, onClose]);

  if (!open) return null;

  const colorMap = {
    info: 'bg-primary',
    success: 'bg-green-600',
    error: 'bg-[var(--primary-100)]',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6">
      <div className="flex flex-col justify-center items-center gap-8 w-full h-full max-w-[540px] max-h-[250px] bg-white rounded-lg p-6 shadow-lg">
        <span className="font-semibold text-lg leading-relaxed block">{message}</span>
        <Button
          onClick={onClose}
          appearance="primary"
          className={`px-6 py-2 min-w-[165px] text-white ${colorMap[type]}`}
        >
          확인
        </Button>
      </div>
    </div>
  );
}

Toast.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string,
  onClose: PropTypes.func,
  autoCloseMs: PropTypes.number,
  type: PropTypes.oneOf(['info', 'error', 'success']),
};
