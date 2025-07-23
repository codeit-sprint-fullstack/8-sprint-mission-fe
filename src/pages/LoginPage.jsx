// ✅ 파일의 최상단에 import
import '../css/LoginPage.css';

function LoginPage() {
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
          <img src="/img/logo.png" />
          <h1>판다마켓</h1>
        </div>

        <input className="input-box" placeholder="이메일을 입력해주세요" />
        <input className="input-box" placeholder="비밀번호를 입력해주세요" />

        <button className="login-button">로그인</button>

        <div className="social-box">
          <p>간편 로그인하기</p>
          {/* SNS 아이콘 자리 */}
        </div>

        <p className="link-text">
          판다마켓이 처음이신가요? <span>회원가입</span>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;