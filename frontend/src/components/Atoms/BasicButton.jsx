function BasicButton({
  name,
  type = "button",
  widthSize,
  heightSize,
  fontSize,
  shape,
  isAble = true,
}) {
  const backgroundColor = isAble ? "var(--Primary-100)" : "var(--Secondary-400)";
  const cursorType = isAble ? "pointer" : "default";

  const shapStyle = {
    round: "40px",
    square: "8px",
  };

  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: 0,
    color: "var(--Cool-Gray-100)",
    fontFamily: "Pretendard",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "26px",
    width: widthSize,
    height: heightSize,
    fontSize: fontSize,
    background: backgroundColor,
    cursor: cursorType,
    borderRadius: shapStyle[shape],
  };

  return (
    <button style={style} type={type} disabled={!isAble}>
      {name}
    </button>
  );
}

export default BasicButton;