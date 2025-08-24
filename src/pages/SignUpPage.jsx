import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Logo from "../components/Atoms/Logo";
import SignUpForm from "../components/Form/SignUpForm";
import SocialLogin from "../components/Form/SocialLogin";
import FormMove from "../components/Form/FormMove";

function SignUpPage() {
  const isMobile = useMediaQuery({ maxWidth: 743 });

  let logoSize = "large";
  let margintop = "60px";
  let pagePadding = 0;

  if (isMobile) {
    logoSize = "medium";
    margintop = 0,
    pagePadding = "24px 16px";
  } 

  const pageStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: margintop,
    padding: pagePadding,
  };
  return (
    <div style={pageStyle}>
      <Link to="/">
        <Logo size={logoSize} />
      </Link>
      <SignUpForm />
      <SocialLogin />
      <FormMove
        text="이미 회원이신가요?"
        pagePath="/login"
        pageName="로그인"
      />
    </div>
  );

}

export default SignUpPage;