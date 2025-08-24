import React from "react";
import Header from "./Header/Header";
import Headline from "./LandingPage/Headline/Headline";
import InfoCard from "./LandingPage/infoCard/infoCard";
import Headline2 from "./LandingPage/Headline/Headline2";
import Footer from "./Footer/Footer";
import '../style/style.css';

function LandingHome() {

  return (
    <>
      <Header />

      <main>
        <section>
          <Headline />
        </section>

        <section>
          <InfoCard />
        </section>

        <section>
          <Headline2 />
        </section>

      </main>

      <Footer />
    </>
  )
}

export default LandingHome;