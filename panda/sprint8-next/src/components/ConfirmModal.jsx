"use client";

export default function ConfirmModal({
  open,
  title = "확인",
  message = "삭제하시겠어요?",
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  onCancel,
}) {
  if (!open) return null;
  return (
    <>
      <div className="fixed inset-0 z-[999] bg-black/50" onClick={onCancel} />
      <div
        className="
          fixed z-[1000] inset-0 m-auto
          w-[420px] h-auto
          rounded-[8px] bg-white shadow-xl
          p-6 box-border
          flex flex-col gap-5
        "
        role="dialog"
        aria-modal="true"
      >
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray-700 whitespace-pre-line">{message}</p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={onCancel}
            className="px-4 h-10 rounded-[8px] bg-gray-200 text-gray-900 text-sm font-medium"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 h-10 rounded-[8px] bg-red-600 text-white text-sm font-semibold"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </>
  );
}