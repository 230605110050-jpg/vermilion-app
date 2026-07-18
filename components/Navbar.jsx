"use client";

import Link from "next/link";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { calculateTotalItems, setIsDrawerOpen } = useCart();
  const { userId } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <div className="nav-container">
        <nav>
          <Link href="/" className="nav-brand" onClick={closeMobileMenu}>
            <div className="logo-wrapper">
              {/* Logo src is managed by CSS var or theme, but we can render dynamically or keep the original logic */}
              <img
                src={theme === "light" ? "/VERMILION LOGO/DARK LONG.png" : "/VERMILION LOGO/LIGHT LONG.png"}
                alt="Vermilion Web Labs"
              />
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/catalog">Katalog</Link>
            <a href="/#cara-kerja">Cara Kerja</a>
            <a href="/#testimoni">Testimoni</a>
          </div>

          {/* Actions */}
          <div className="nav-actions">
            {userId && (
              <div className="user-badge" style={{ fontSize: "10px", color: "var(--text-secondary)", marginRight: "8px", display: "flex", alignItems: "center", gap: "6px", fontWeight: "600", letterSpacing: "0.05em" }}>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="hide-mobile" style={{ display: "none" }} >{userId}</span>
              </div>
            )}
            <button
              id="theme-toggle"
              className="theme-toggle-btn"
              aria-label="Ganti Tema"
              onClick={toggleTheme}
            >
              {theme === "dark" ? (
                <svg className="sun-icon" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
              ) : (
                <svg className="moon-icon" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              )}
            </button>
            <button
              id="cart-btn"
              className="cart-btn"
              aria-label="Keranjang Belanja"
              onClick={() => setIsDrawerOpen(true)}
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span id="cart-badge" className="cart-badge" style={{ display: calculateTotalItems() > 0 ? "flex" : "none" }}>
                {calculateTotalItems()}
              </span>
            </button>

            <Link href="/catalog" className="order-btn">
              Katalog Produk
            </Link>

            <button
              id="menu-toggle"
              className="menu-toggle"
              aria-label="Toggle menu"
              onClick={toggleMobileMenu}
            >
              <span style={isMobileMenuOpen ? { transform: "translateY(5.5px) rotate(45deg)" } : {}}></span>
              <span style={isMobileMenuOpen ? { opacity: "0" } : {}}></span>
              <span style={isMobileMenuOpen ? { transform: "translateY(-5.5px) rotate(-45deg)" } : {}}></span>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Dropdown Menu */}
      <div id="nav-mobile-dropdown" className={`nav-mobile-dropdown ${isMobileMenuOpen ? "open" : ""}`}>
        <Link href="/" onClick={closeMobileMenu}>Home</Link>
        <Link href="/catalog" onClick={closeMobileMenu}>Katalog</Link>
        <a href="/#cara-kerja" onClick={closeMobileMenu}>Cara Kerja</a>
        <a href="/#testimoni" onClick={closeMobileMenu}>Testimoni</a>
        <Link href="/catalog" onClick={closeMobileMenu} style={{ color: "var(--accent-gold)", borderBottom: "none", fontWeight: 700 }}>
          Lihat Katalog Produk
        </Link>
      </div>
    </>
  );
}
