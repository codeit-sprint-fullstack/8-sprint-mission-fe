'use client';
import { useEffect } from 'react';
import Button from '@/components/Button';

interface ToastProps {
  open: boolean;
  message: string;
  onClose: () => void;
  autoCloseMs?: number;
  type?: 'info' | 'error' | 'success';
}

export default function Toast({ open, message, onClose, autoCloseMs, type = 'info' }: ToastProps) {
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
