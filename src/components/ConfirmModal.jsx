'use client';

import React from 'react';
import Button from './Button';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <Button appearance="secondary" onClick={onClose} className="px-4 py-2">
            취소
          </Button>
          <Button
            appearance="primary"
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 hover:bg-red-600"
          >
            삭제
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
