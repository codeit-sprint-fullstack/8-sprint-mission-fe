import styles from './Modal.module.css'

export default function Modal({message='', isOpen=false, onClick=null}){
    return (
        isOpen && <div className={styles.modal}>
            <div className={styles.content}>
                <p className={styles.message}>{message}</p>
                <button className={styles.confirmButton} onClick={onClick}>확인</button>
            </div>
        </div>
    )
}