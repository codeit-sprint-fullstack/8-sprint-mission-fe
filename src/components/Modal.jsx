export default function Modal({ open, message, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
      <div
        className="
    flex shrink-0 flex-col items-center justify-center
    rounded-[8px] bg-white

    mobile:w-[327px] mobile:h-[220px] mobile:px-[90px] mobile:py-[23px] mobile:gap-[42px]
    tablet:w-[540px] tablet:h-[250px] tablet:px-[187px] tablet:py-[40px] tablet:gap-[40px]
    pc:w-[540px] pc:h-[250px] pc:px-[187px] pc:py-[40px] pc:gap-[40px]
  "
      >
        <p
          className="
    text-[var(--Secondary-800,#1F2937)] text-center
    font-pretendard text-[16px] font-medium leading-[26px] whitespace-nowrap
  "
        >
          {message}
        </p>
        <button
          onClick={onClose}
          className="
    flex w-[120px] h-[48px] shrink-0
    items-center justify-center
    px-[23px] py-[12px] gap-[10px]
    rounded-[8px] bg-[var(--Primary-100,#3692FF)]
    text-white font-medium
    hover:opacity-90 active:opacity-80
  "
        >
          확인
        </button>
      </div>
    </div>
  );
}
