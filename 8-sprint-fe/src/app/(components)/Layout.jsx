import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";

export function LandingLayout({ children }) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
}

export function MainLayout({ children }) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
}

export function AuthLayout({ children }) {
  return <>{children}</>;
}
