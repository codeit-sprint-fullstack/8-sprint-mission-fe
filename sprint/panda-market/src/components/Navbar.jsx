// src/components/Navbar.jsx
export default function Navbar() {
  return (
    <nav className="nav">
      <div className="container">
        <a href="/" className="logo">Panda Market</a>
        {/* 필요시 메뉴들 */}
      </div>
    </nav>
  );
}

// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">© 2025 Panda Market</div>
    </footer>
  );
}

export default function Navbar() {
  return (
    <nav style={{ borderBottom: '1px solid #eee', padding: '12px 0' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 16px', fontWeight: 700 }}>
        Panda Market
      </div>
    </nav>
  );
}
