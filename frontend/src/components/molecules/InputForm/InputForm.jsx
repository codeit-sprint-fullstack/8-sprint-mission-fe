import { useState } from 'react';
import Image from 'next/image';
import styles from './InputForm.module.css';
import eyeInvisible from './eye-invisible.svg';
import eyeVisible from './eye-visible.svg';

export default function InputForm({
    label,
    name,
    value,
    onChange,
    onKeyDown = null,
    placeholder = '',
    rows = 1,
    validErrorMsg = '',
    isPassword=false,
}) {
    const style = validErrorMsg === '' ? {} : { border: '1px solid var(--error-red, #F74747)' };
    const [isVisible, setIsVisible] = useState(!isPassword);

    //공통되는 prop을 묶었습니다.
    const props = {
        className: styles.inputPlace,
        style: style,
        name,
        value,
        onChange,
        onKeyDown,
        placeholder,
    };

    //textara는 기본적으로 rows={2}로 설정 되어 있다.
    //input처럼 높이를 맞추려면 rows={1}이 꼭 필요.
    //rows={1}인 textarea보다 input이 UX적으로 좋다고 판단.
    return (
        <div className={styles.inputForm}>
            <label>{label}</label>
            {rows === 1 && <div className={styles.inputDiv}>
                <input {...props} type={isVisible ? 'text' : 'password'}/>
                {isPassword && <button className={styles.eyeButton} onClick={()=>setIsVisible(!isVisible)} type='button'>
                    <Image src={isVisible ? eyeVisible : eyeInvisible} alt="eye-icon"/>
                </button>}
            </div>}
            {rows > 1 && <textarea {...props} rows={rows} />}
            {validErrorMsg.length > 0 && <p className={styles.validErrorMsg}>{validErrorMsg}</p>}
        </div>
    );
}