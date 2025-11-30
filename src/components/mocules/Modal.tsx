interface ModalProps {
  message: string;
  isOpen: boolean;
  onClick?: () => void;
}

export default function Modal({ message = '', isOpen = false, onClick }: ModalProps) {
  return (
    isOpen && (
      <div className="fixed top-0 left-0 z-[1] flex h-full w-full items-center justify-center overflow-auto bg-[rgba(0,0,0,0.7)]">
        <div className="absolute top-1/2 left-1/2 flex h-[250px] w-[calc(100%-48px)] max-w-[540px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-10 overflow-hidden rounded-[8px] border-[0.1rem] border-[#888] bg-white text-center shadow-[0px_4px_16px_rgba(108,57,57,0.2)]">
          <p className="text-center text-[18px] font-medium text-[var(--gray-800)]">{message}</p>
          <button
            className="h-12 w-[165px] rounded-[5px] border-none bg-[var(--brand-blue)] px-[23px] py-3 text-[16px] font-semibold text-[var(--Cool-Gray-100)] hover:bg-[var(--hover-blue)] focus:bg-[var(--hover-blue)]"
            onClick={onClick}
          >
            확인
          </button>
        </div>
      </div>
    )
  );
}
