import React from "react";
import Header from "./Header/Header";
import ControllerBox from "./RegisterationPage/ControllerBox/ControllerBox";
import inputBox from "./RegisterationPage/inputBoxes/inputBoxes";
import Footer from "./Footer/Footer";
import '../style/style.css';

function RegisterationHome() {
  return (
    <>
      <Header />

      <main>
        <section>
          <ControllerBox />
        </section>

        <section>
          <inputBox />
        </section>
      </main>

      <Footer />
    </>
  );
}

export default RegisterationHome;