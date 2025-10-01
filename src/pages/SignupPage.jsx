import { useState } from "react";
import '../styles/signup.css'


const USER_DATA = [
  { email: "codeit1@codeit.com", password: "codeit101!" },
  { email: "codeit2@codeit.com", password: "codeit202!" },
  { email: "codeit3@codeit.com", password: "codeit303!" },
  { email: "codeit4@codeit.com", password: "codeit404!" },
  { email: "codeit5@codeit.com", password: "codeit505!" },
  { email: "codeit6@codeit.com", password: "codeit606!" },
];

export default function Signup() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  const [errors, setErrors] = useState({ email: "", nickname: "", password: "", confirm: "" });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // ---- validators (문자열 에러 메시지 반환, ""면 통과) ----
  const validateEmail = () => {
    const v = email.trim();
    if (!v) return "이메일을 입력해주세요.";
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(v)) return "잘못된 이메일 형식입니다.";
    return "";
  };

  const validateNickname = () => (!nickname.trim() ? "닉네임을 입력해주세요." : "");

  const validatePassword = () => {
    const v = password.trim();
    if (!v) return "비밀번호를 입력해주세요.";
    if (v.length < 8) return "비밀번호를 8자 이상 입력해주세요.";
    return "";
  };

  const validateConfirm = () => {
    const v = confirm.trim();
    if (!v) return "비밀번호를 다시 입력해주세요.";
    if (v !== password.trim()) return "비밀번호가 일치하지 않습니다.";
    return "";
  };

  const runAllValidations = () => {
    const next = {
      email: validateEmail(),
      nickname: validateNickname(),
      password: validatePassword(),
      confirm: validateConfirm(),
    };
    setErrors(next);
    // 모든 값이 ""면 true
    return Object.values(next).every((m) => m === "");
  };

  const isFormValid =
    validateEmail() === "" &&
    validateNickname() === "" &&
    validatePassword() === "" &&
    validateConfirm() === "";

  const onSubmit = (e) => {
    e.preventDefault();
    if (!runAllValidations()) return;

    const isDuplicated = USER_DATA.some((u) => u.email === email.trim());
    if (isDuplicated) {
      setModalMessage("사용 중인 이메일입니다");
      setIsModalOpen(true);
      return;
    }

    alert("회원가입 성공!");
    // 실제 앱에서는 navigate('/login') 사용 권장
    window.location.href = "/login";
  };

  return (
    <main className="signup-container">
      <form className="signup-form" onSubmit={onSubmit}>
        {/* 이메일 */}
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setErrors((p) => ({ ...p, email: validateEmail() }))}
            className={errors.email ? "invalid" : ""}
            placeholder="이메일을 입력해주세요"
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        {/* 닉네임 */}
        <div className="form-group">
          <label htmlFor="nickname">닉네임</label>
          <input
            id="nickname"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            onBlur={() => setErrors((p) => ({ ...p, nickname: validateNickname() }))}
            className={errors.nickname ? "invalid" : ""}
            placeholder="닉네임을 입력해주세요"
          />
          {errors.nickname && <p className="error-message">{errors.nickname}</p>}
        </div>

        {/* 비밀번호 */}
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              id="password"
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setErrors((p) => ({ ...p, password: validatePassword() }))}
              className={errors.password ? "invalid" : ""}
              placeholder="비밀번호를 입력해주세요"
            />
            <img
              src={showPw ? "img/eye.png" : "img/eye.off.png"}
              alt="비밀번호 보기 전환"
              className="toggle-password"
              onClick={() => setShowPw((v) => !v)}
              style={{ cursor: "pointer", marginLeft: 8 }}
            />
          </div>
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

        {/* 비밀번호 확인 */}
        <div className="form-group">
          <label htmlFor="confirm-password">비밀번호 확인</label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              id="confirm-password"
              type={showConfirmPw ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              onBlur={() => setErrors((p) => ({ ...p, confirm: validateConfirm() }))}
              className={errors.confirm ? "invalid" : ""}
              placeholder="비밀번호를 다시 입력해주세요"
            />
            <img
              src={showConfirmPw ? "img/eye.png" : "img/eye.off.png"}
              alt="비밀번호 확인 보기 전환"
              className="toggle-password"
              onClick={() => setShowConfirmPw((v) => !v)}
              style={{ cursor: "pointer", marginLeft: 8 }}
            />
          </div>
          {errors.confirm && <p className="error-message">{errors.confirm}</p>}
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit"
          className="signup-submit"
          disabled={!isFormValid}
          style={{
            opacity: isFormValid ? "1" : "0.5",
            cursor: isFormValid ? "pointer" : "not-allowed",
          }}
        >
          회원가입
        </button>
      </form>

      {/* 에러 모달 */}
      {isModalOpen && (
        <div id="error-modal" className="modal">
          <div className="modal-content">
            <p className="modal-message">{modalMessage}</p>
            <button onClick={() => setIsModalOpen(false)} id="close-modal">
              확인
            </button>
          </div>
        </div>
      )}
    </main>
  );
}