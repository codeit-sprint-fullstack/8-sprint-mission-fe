import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { USER_DATA } from "/src/data/USER_DATA";
import "/src/assets/css/reset.css";
import "/src/assets/css/common.css";

function CustomAlert({ message, onClose }) {
  if (!message) return null;
  return (
    <div className="custom-alert-overlay">
      <div className="custom-alert-box">
        <p className="custom-alert-message">{message}</p>
        <button className="custom-alert-button" onClick={onClose}>확인</button>
      </div>
    </div>
  );
}

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  const validateEmail = (val) => {
    if (!val) return "이메일을 입력해주세요.";
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(val)) return "올바른 이메일 형식이 아닙니다.";
    return "";
  };

  const validatePassword = (val) => {
    if (!val) return "비밀번호를 입력해주세요.";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailErr = validateEmail(email.trim());
    const pwErr = validatePassword(password.trim());

    setEmailError(emailErr);
    setPasswordError(pwErr);

    if (emailErr || pwErr) return;

    const user = USER_DATA.find(u => u.email === email.trim());
    if (!user || user.password !== password.trim()) {
      setAlertMsg("이메일 또는 비밀번호가 올바르지 않습니다.");
      return;
    }

    // 로그인 성공
    setAlertMsg("로그인 성공!");
    setTimeout(() => navigate("/items"), 1000);
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <header>
          <a href="/"><img src="/assets/logo.svg" alt="판다마켓 로고" /></a>
        </header>
        <main>
          <form className="form-container" onSubmit={handleSubmit}>
            {/* 이메일 */}
            <div className="form-field">
              <label htmlFor="email" className="form-label">이메일</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                  setEmailError(validateEmail(e.target.value));
                }}
                placeholder="이메일을 입력하세요"
                required
              />
              {emailError && <div className="error-message">{emailError}</div>}
            </div>

            {/* 비밀번호 */}
            <div className="form-field">
              <label htmlFor="password" className="form-label">비밀번호</label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value);
                    setPasswordError(validatePassword(e.target.value));
                  }}
                  placeholder="비밀번호를 입력하세요"
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                >
                  <img src={showPassword ? "/assets/eye(open).svg" : "/assets/eye(close).svg"} alt="eye" />
                </button>
              </div>
              {passwordError && <div className="error-message">{passwordError}</div>}
            </div>

            <button className="btn-primary" type="submit">로그인</button>
            <p className="form-footer-text">
              판다마켓이 처음이신가요? <a href="/signup">회원가입</a>
            </p>
          </form>
        </main>
        <CustomAlert message={alertMsg} onClose={() => setAlertMsg("")} />
      </div>
    </div>
  );
}
