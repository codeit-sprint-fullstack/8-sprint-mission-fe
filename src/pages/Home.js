import React from 'react';
import Header from '../components/Header';
import BannerTop from '../components/home/BannerTop';
import HotItem from '../components/home/HotItem';
import BannerBottom from '../components/home/BannerBottom';
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