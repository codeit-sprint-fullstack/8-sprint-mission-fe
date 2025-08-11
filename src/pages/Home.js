import React from 'react';
import Header from '../components/Header';
import BannerTop from '../components/BannerTop';
import HotItem from '../components/HotItem';
import BannerBottom from '../components/BannerBottom';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <Header />
      <BannerTop />
      <HotItem />
      <BannerBottom />
      <Footer />
    </div>
  );
};

export default Home;