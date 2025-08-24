import { useState } from "react";
import BasicButton from "../Atoms/BasicButton";
import LabeledInput from "../Atoms/LabeledInput";
import style from "./LoginForm.module.css";
import { validateEmail, validatePassword } from "./vaildator";
import PasswordInput from "./PasswordInput";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    setErrors((prev) => ({ ...prev, email: validateEmail(val) }));
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    setErrors((prev) => ({ ...prev, password: validatePassword(val) }));
  };

  // 버튼 활성화 조건
  const isFormValid =
    email !== "" && password !== "" && !errors.email && !errors.password;

  // 폼 제출
  const handleSubmit = (e) => {
    e.preventDefault(); // 페이지 새로고침 방지
    if (!isFormValid) return;
    console.log("로그인 폼 제출", { email, password });
  };

  return (
    <form className={style.loginForm} onSubmit={handleSubmit}>
      <LabeledInput
        name="userEmail"
        label="이메일"
        placeholder="이메일을 입력해주세요"
        value={email}
        onChange={handleEmailChange}
        errMessage={errors.email}
        isValid={!errors.email && email !== ""}
      />
      <PasswordInput
        name="userPassword"
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요"
        value={password}
        onChange={handlePasswordChange}
        errMessage={errors.password}
        isValid={!errors.password && password !== ""}
      />
      <BasicButton
        name="로그인"
        type="submit"
        widthSize="100%"
        heightSize="56px"
        fontSize="20px"
        shape="round"
        isAble={isFormValid}
      />
    </form>
  );
}

export default LoginForm;
