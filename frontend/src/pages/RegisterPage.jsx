import { useMediaQuery } from "react-responsive";
import RegisterForm from "../components/Form/RegisterForm";

function RegisterPage() {
  const isTablet = useMediaQuery({ maxWidth: 1199 });

  let pagePadding = 0;
  if (isTablet) {
    pagePadding = "24px 16px";
  }

  const pageStyle = {
    marginTop: "96px",
    marginBottom: "160px",
    padding: pagePadding,
  };

  return (
    <section style={pageStyle}>
      <RegisterForm />
    </section>
  );
}

export default RegisterPage;
