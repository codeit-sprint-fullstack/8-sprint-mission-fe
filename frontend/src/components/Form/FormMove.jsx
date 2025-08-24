import { Link } from "react-router-dom";

function FormMove({ text, pagePath, pageName }) {
  const txtStyle = {
    color: "var(--Secondary-800)",
    fontFamily: "Pretendard",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "24px",
    marginRight: "4px",
  };

  const linkStyle = {
    color: "var(--Primary-100)",
    fontFamily: "Pretendard",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "normal",
    textDecorationLine: "underline",
  }
  return (
    <div style={{ marginBottom: "20px" }}>
      <span style={txtStyle}>{text}</span>
      <Link to={pagePath}>
        <span style={linkStyle}>{pageName}</span>
      </Link>
    </div>
  );
}

export default FormMove;
