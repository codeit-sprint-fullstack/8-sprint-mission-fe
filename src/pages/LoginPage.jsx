import { useState } from "react";
import '../styles/login.css'

const USER_DATA = [
  { email: "codeit1@codeit.com", password: "codeit101!" },
  { email: "codeit2@codeit.com", password: "codeit202!" },
  { email: "codeit3@codeit.com", password: "codeit303!" },
  { email: "codeit4@codeit.com", password: "codeit404!" },
  { email: "codeit5@codeit.com", password: "codeit505!" },
  { email: "codeit6@codeit.com", password: "codeit606!" },
];

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const validateEmail = () => {
    if (!email.trim()) return "이메일을 입력해주세요.";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) return "잘못된 이메일 형식입니다.";
    return "";
  };

  const validatePassword = () => {
    if (!password.trim()) return "비밀번호를 입력해주세요.";
    if (password.length < 8) return "비밀번호를 8자 이상 입력해주세요.";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailError = validateEmail();
    const passwordError = validatePassword();
    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    const foundUser = USER_DATA.find((u) => u.email === email);
    if (!foundUser || foundUser.password !== password) {
      setModalMessage("비밀번호가 일치하지 않습니다.");
      setIsModalOpen(true);
    } else {
      // 실제 앱에서는 navigate('/items') 같은 라우터 사용
      window.location.href = "/items";
    }
  };

  const isFormValid = !validateEmail() && !validatePassword();

  return (
    <main className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        {/* 이메일 */}
        <div className="form-group">
          <label>이메일</label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() =>
              setErrors((prev) => ({ ...prev, email: validateEmail() }))
            }
            className={errors.email ? "invalid" : ""}
            placeholder="이메일을 입력해주세요"
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        {/* 비밀번호 */}
        <div className="form-group">
          <label>비밀번호</label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() =>
                setErrors((prev) => ({ ...prev, password: validatePassword() }))
              }
              className={errors.password ? "invalid" : ""}
              placeholder="비밀번호를 입력해주세요"
            />
            <img
              src={showPassword ? "img/eye.png" : "img/eye.off.png"}
              alt="비밀번호 토글"
              className="toggle-password"
              onClick={() => setShowPassword((prev) => !prev)}
              style={{ cursor: "pointer", marginLeft: "8px" }}
            />
          </div>
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

        {/* 로그인 버튼 */}
        <button
          type="submit"
          className="login-submit"
          disabled={!isFormValid}
          style={{
            opacity: isFormValid ? "1" : "0.5",
            cursor: isFormValid ? "pointer" : "not-allowed",
          }}
        >
          로그인
        </button>
      </form>

      {/* 에러 모달 */}
      {isModalOpen && (
        <div id="error-modal" className="modal">
          <div className="modal-content">
            <p className="modal-message">{modalMessage}</p>
            <button onClick={() => setIsModalOpen(false)}>확인</button>
          </div>
        </div>
      )}
    </main>
  );
}
