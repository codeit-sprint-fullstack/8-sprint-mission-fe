import React from 'react';
import RegistrationForm from '../components/RegistrationForm';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Registration = () => {
  return (
    <div>
      <Header />
      <main>
        <RegistrationForm />
      </main>
      <Footer />
    </div>
  );
};

export default Registration;