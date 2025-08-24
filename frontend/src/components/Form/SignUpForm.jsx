import { useState } from "react";
import { validateEmail, validateNickname, validatePassword, validatePasswordChecker } from "./vaildator";
import LabeledInput from "../Atoms/LabeledInput";
import PasswordInput from "./PasswordInput";
import BasicButton from "../Atoms/BasicButton";
import style from "./SignUpform.module.css";

function SignUpForm() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordChecker, setPasswordChecker] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordChecker: "",
  });

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    setErrors((prev) => ({ ...prev, email: validateEmail(val) }));
  };

  const handleNicknameChange = (e) => {
    const val = e.target.value;
    setNickname(val);
    setErrors((prev) => ({ ...prev, nickname: validateNickname(val) }));
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    setErrors((prev) => ({ ...prev, password: validatePassword(val) }));
  };

  const handlePasswordCheckerChange = (e) => {
    const val = e.target.value;
    setPasswordChecker(val);
    setErrors((prev) => ({
      ...prev,
      passwordChecker: validatePasswordChecker(val, password),
    }));
  };

  // 버튼 활성화 조건
  const isFormValid =
    email !== "" &&
    password !== "" &&
    nickname !== "" &&
    passwordChecker !== "" &&
    !errors.email &&
    !errors.password &&
    !errors.nickname &&
    !errors.passwordChecker;;

  // 폼 제출
  const handleSubmit = (e) => {
    e.preventDefault(); // 페이지 새로고침 방지
    if (!isFormValid) return;
    console.log("회원가입 폼 제출", { email, nickname, password });
  };

  return (
    <form className={style.signUpForm} onSubmit={handleSubmit}>
      <LabeledInput
        name="userEmail"
        label="이메일"
        placeholder="이메일을 입력해주세요"
        value={email}
        onChange={handleEmailChange}
        errMessage={errors.email}
        isValid={!errors.email && email !== ""}
      />
      <LabeledInput
        name="userNickname"
        label="닉네임"
        placeholder="닉네임을 입력해주세요"
        value={nickname}
        onChange={handleNicknameChange}
        errMessage={errors.nickname}
        isValid={!errors.nickname && nickname !== ""}
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
      <PasswordInput
        name="userPasswordChecker"
        label="비밀번호 확인"
        placeholder="비밀번호를 다시 한 번 입력해주세요"
        value={passwordChecker}
        onChange={handlePasswordCheckerChange}
        errMessage={errors.passwordChecker}
        isValid={!errors.passwordChecker && passwordChecker !== ""}
      />
      <BasicButton
        name="회원가입"
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

export default SignUpForm;
