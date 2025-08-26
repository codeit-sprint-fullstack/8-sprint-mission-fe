import pandaLogo from "../../assets/icon/ic_panda.svg";

function Logo({ size = "small" }) {
  const sizeMap = {
    tiny: {
      imgSize: "0",
      font: "20.202px",
      fontWeight: 700,
      gap: "0",
    },

    small: {
      imgSize: "40px",
      font: "25.633px",
      fontWeight: 700,
      gap: "8.592px",
    },

    medium: {
      imgSize: "51.765px",
      font: "33.172px",
      fontWeight: 700,
      gap: "11.12px",
    },

    large: {
      imgSize: "103.529px",
      font: "66.344px",
      fontWeight: 800,
      gap: "22.24px",
    },
  };
  
  const { imgSize, font, fontWeight, gap } = sizeMap[size];

  // style
  const logoContainer = {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    gap: gap,
  };

  const logoImg = {
    width: imgSize,
  };

  const logoText = {
    color: "var(--brand-blue)",
    fontFamily: "ROKAF Sans",
    fontStyle: "normal",
    lineHeight: "normal",
    fontSize: font,
    fontWeight: fontWeight,
  };

  return (
    <div className="logo" style={logoContainer}>
      <img src={pandaLogo} alt="pandaLogo" style={logoImg} />
      <span style={logoText}>판다마켓</span>
    </div>
  );
}

export default Logo;
