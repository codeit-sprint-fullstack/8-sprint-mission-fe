"use client";

export default function Modal({
  open,
  message = "비밀번호가 일치하지 않습니다",
  onClose,
}) {
  if (!open) return null;

  return (
    <>
    
      <div className="fixed inset-0 z-[999] bg-black/50" onClick={onClose} />

   
      <div
        className="
          fixed z-[1000]
          inset-y-[415px] inset-x-[690px]
          w-[540px] h-[250px]
          rounded-[8px] bg-white shadow-xl
          pt-[40px] pb-[40px] pl-[187px] pr-[187px]
          box-border
          flex flex-col items-center
        "
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
       
        <p
          id="modal-title"
          className="text-[18px] font-medium text-[#1F2937] text-center"
        >
          {message}
        </p>

       
        <div className="h-[40px]" />

        
        <button
          type="button"
          onClick={onClose}
          className="
            w-[165px] h-[48px] rounded-[8px]
            px-[23px] py-[12px]
            bg-gray-900 text-white
            text-[16px] font-semibold
            flex items-center justify-center
          "
          style={{ color: "#F3F4F6", background: "#3692ff"}}
        >
          확인
        </button>
      </div>
    </>
  );
}
