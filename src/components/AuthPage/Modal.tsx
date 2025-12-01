"use client";

import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

const Modal = ({ isOpen, message, onClose }: ModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="w-80 rounded-lg bg-white p-6 text-center shadow-lg">
        <p className="mb-4 text-gray-700">{message}</p>
        <button
          onClick={onClose}
          className="rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default Modal;
