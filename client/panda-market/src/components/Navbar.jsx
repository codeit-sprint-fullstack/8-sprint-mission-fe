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

export default function Navbar() {
  return (
    <nav style={{ borderBottom: '1px solid #eee', padding: '12px 0' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 16px', fontWeight: 700 }}>
        Panda Market
      </div>
    </nav>
  );
}
