import React from "react";
import Header from "./Header/Header";
import Headline from "./LandingPage/Headline/Headline";
import InfoCard from "./LandingPage/infoCard/infoCard";
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
      </main>

      <Footer />
    </>
  )
}

export default LandingHome;