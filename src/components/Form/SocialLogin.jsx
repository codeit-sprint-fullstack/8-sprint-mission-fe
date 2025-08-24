import ic_google from "../../assets/icon/ic_google.svg";
import ic_kakao from "../../assets/icon/ic_kakao.svg";

function SocialLogin() {
  const socialLogin = {
    display: "flex",
    maxWidth: "640px",
    width: "100%",
    height: "74px",
    padding: "16px 23px",
    margin: "24px 0",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: "8px",
    background: "#E6F2FF",
  };

  const spanStyle = {
    color: "var(--Secondary-800)",
    fontFamily: "Pretendard",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "26px",
  };

  const snsIconStyle = {
    width: "42px",
    height: "42px",
    borderRadius: "9999px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={socialLogin}>
      <span style={spanStyle}>간편 로그인하기</span>
      <div style={{ display: "flex", gap: "16px" }}>
        <a
          style={{ ...snsIconStyle, backgroundColor: "#fff" }}
          href="https://www.google.com/"
        >
          <img src={ic_google} alt="google" />
        </a>
        <a
          style={{ ...snsIconStyle, backgroundColor: "#F5E14B" }}
          href="https://www.kakaocorp.com/page/"
        >
          <img src={ic_kakao} alt="kakao" />
        </a>
      </div>
    </div>
  );
}

export default SocialLogin;
