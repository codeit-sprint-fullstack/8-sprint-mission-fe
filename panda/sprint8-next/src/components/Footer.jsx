"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-wrapper">
        <div className="footer-left">© codeit - {new Date().getFullYear()}</div>

        <div className="footer-center">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/faq">FAQ</Link>
        </div>

        <div className="footer-right">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferr" aria-label="Facebook">
            <img src="/images/facebook.svg" alt="Facebook" />
          </a>

          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <img src="/images/twitter.svg" alt="Twitter" />
          </a>

          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="Youtube">
            <img src="/images/youtube.svg" alt="Youtube" />
          </a>

          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <img src="/images/instagram.svg" alt="Instagram" />
          </a>
        </div>
      </div>
    </footer>
  )
}