import styles from './DeleteModal.module.css';
import Image from 'next/image';
import checkIcon from './ic_check.svg';

export default function DeleteModal({
  message = '',
  isOpen = false,
  onConfirm = null,
  onCancel = null,
}) {
  return (
    isOpen && (
      <div className={styles.modal}>
        <div className={styles.content}>
          <div className="flex flex-col gap-[24px] items-center w-[250px]">
            <div className="w-[24px] h-[24px] rounded-[999px] bg-[#F74747] flex justify-center items-center">
              <Image src={checkIcon} alt="checkIcon" className={styles.checkIcon} />
            </div>
            <p className={styles.message}>{message}</p>
          </div>
          <div className="flex gap-[8px]">
            <button className={styles.cancelButton} onClick={onCancel}>
              취소
            </button>
            <button className={styles.confirmButton} onClick={onConfirm}>
              네
            </button>
          </div>
        </div>
      </div>
    )
  );
}
