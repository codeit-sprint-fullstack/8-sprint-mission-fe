import { useState } from "react";
import style from "./LabeledInput.module.css";

function LabeledInput({
  name,
  label,
  inputType = "text",
  placeholder = "",
  value,
  onChange,
  errMessage = "",
  isValid = true,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const handleBlurOrEnter = () => { // focus out
    setIsFocused(false);
    setIsTouched(true);
  };

  // 스타일 적용 여부 결정
  const getInputClass = () => {
    if (isFocused) return style.focused; // focus 중엔 항상 focused 스타일
    if (!isTouched) return ""; // 처음 입력 전엔 스타일 없음
    // focus out 이후에만 valid/invalid 스타일 적용
    return isValid ? style.valid : style.invalid;
  };

  return (
    <div className={style.container}>
      <label className={style.label} htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlurOrEnter} // focus out 처리
        onKeyDown={(e) => { // enter 시 focus out
          if (e.key === "Enter") {
            handleBlurOrEnter(); // Enter 시 focus out과 동일 처리
            e.currentTarget.blur(); // 실제로 input에서 focus 제거
          }
        }}
        className={`${style.input} ${getInputClass()}`}
      />
      {!isValid && !isFocused && <p className={style.errorMsg}>{errMessage}</p>}
    </div>
  );
}

export default LabeledInput;
