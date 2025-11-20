import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuthHeader from '@/components/auth/AuthHeader';

export function DefaultLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-[1200px] mx-auto">{children}</main>
      <Footer />
    </div>
  );
}

export function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-[540px] mx-auto">
        <AuthHeader />
        {children}
      </div>
    </div>
  );
}

export default {
  DefaultLayout,
  AuthLayout,
};
