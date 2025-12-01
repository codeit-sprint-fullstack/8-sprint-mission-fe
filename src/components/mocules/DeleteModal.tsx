import Image from 'next/image';
import checkIcon from '@/images/modal/ic_check.svg';

interface DeleteModalProps {
  message: string;
  isOpen: boolean;
  onConfirm?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onCancel?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function DeleteModal({
  message = '',
  isOpen = false,
  onConfirm,
  onCancel,
}: DeleteModalProps) {
  return (
    isOpen && (
      <div className="fixed z-20 left-0 top-0 w-full h-full overflow-auto bg-[rgba(0,0,0,0.7)] flex items-center justify-center">
        <div className="w-[calc(100%-48px)] max-w-fit h-fit p-[24px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-[32px] bg-white border border-[#888] text-center shadow-[0px_4px_16px_rgba(108,57,57,0.2)] rounded-[8px] overflow-hidden">
          <div className="flex flex-col gap-[24px] items-center w-[250px]">
            <div className="w-[24px] h-[24px] rounded-[999px] bg-[#F74747] flex justify-center items-center">
              <Image src={checkIcon} alt="checkIcon" className="" />
            </div>
            <p className="text-[var(--gray-800)] font-[var(--font-18-medium)] text-center">
              {message}
            </p>
          </div>
          <div className="flex gap-[8px]">
            <button
              onClick={onCancel}
              className="w-[88px] h-[48px] px-[23px] py-[12px] border border-[var(--error-red,#f74747)] rounded-[8px] bg-[var(--Cool-Gray-50,#f9fafb)] text-[var(--error-red,#f74747)] font-[var(--font-16-semmibold)]"
            >
              취소
            </button>
            <button
              onClick={onConfirm}
              className="w-[88px] h-[48px] px-[23px] py-[12px] border-none rounded-[8px] bg-[var(--error-red,#f74747)] text-[var(--Cool-Gray-100)] font-[var(--font-16-semmibold)]"
            >
              네
            </button>
          </div>
        </div>
      </div>
    )
  );
}
