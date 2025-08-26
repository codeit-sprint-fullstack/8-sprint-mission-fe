import LabeledInput from "../Atoms/LabeledInput";
import visibility_off from "../../assets/icon/btn_visibility_off_24px.svg";
import visibility_on from "../../assets/icon/btn_visibility_on_24px.svg";
import { useState } from "react";

function PasswordInput({
  name,
  label,
  placeholder,
  value,
  onChange,
  errMessage,
  isValid,
}) {
  const [isVisible, setIsVisible] = useState(false);

  //style
  const btn_visibility = {
    position: "absolute",
    width: "24px",
    height: "24px",
    top: "59px",
    right: "24px",
    cursor: "pointer",
  };

  return (
    <div style={{ width: "100%", position: "relative" }}>
      <LabeledInput
        name={name}
        label={label}
        inputType={isVisible ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        errMessage={errMessage}
        isValid={isValid}
      />
      <div style={btn_visibility} onClick={() => setIsVisible((prev) => !prev)}>
        <img
          src={isVisible ? visibility_on : visibility_off}
          alt={isVisible ? "btn_visibility_on" : "btn_visibility_off"}
        />
      </div>
    </div>
  );
}

export default PasswordInput;
