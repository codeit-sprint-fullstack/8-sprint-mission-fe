"use client";

import React from "react";
import styles from "./Button.module.css";
import Link from "next/link";

function Button({
  className = "",
  appearance = "primary",
  children,
  as: AsComponent,
  href,
  fullWidth,
  ...rest
}) {
  // 스타일 클래스 생성
  const buttonClasses = `${styles.Button} ${styles[appearance]} ${className} ${
    fullWidth ? styles.fullWidth : ""
  }`;

  // fullWidth 스타일 생성
  const fullWidthStyle = fullWidth ? { width: "100%" } : {};

  // next/link를 사용하는 경우
  if (AsComponent === Link && href) {
    return (
      <Link
        href={href}
        className={buttonClasses}
        style={{
          backgroundColor:
            appearance === "primary"
              ? "var(--primary-100)"
              : appearance === "secondary"
              ? "var(--gray-200)"
              : "transparent",
          color: appearance === "primary" ? "white" : "var(--gray-900)",
          ...fullWidthStyle,
        }}
        {...rest}
      >
        {children}
      </Link>
    );
  }

  // 다른 컴포넌트를 사용하는 경우
  if (AsComponent) {
    return (
      <AsComponent
        className={buttonClasses}
        style={{
          backgroundColor:
            appearance === "primary"
              ? "var(--primary-100)"
              : appearance === "secondary"
              ? "var(--gray-200)"
              : "transparent",
          color: appearance === "primary" ? "white" : "var(--gray-900)",
          ...fullWidthStyle,
        }}
        {...rest}
      >
        {children}
      </AsComponent>
    );
  }

  // 기본 버튼
  return (
    <button
      className={buttonClasses}
      style={{
        backgroundColor:
          appearance === "primary"
            ? "var(--primary-100)"
            : appearance === "secondary"
            ? "var(--gray-200)"
            : "transparent",
        color: appearance === "primary" ? "white" : "var(--gray-900)",
        ...fullWidthStyle,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
