"use client";

import Link from "next/link";
import { useTheme } from "../context/ThemeContext";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer>
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="logo-wrapper">
              <img
                src={theme === "light" ? "/VERMILION LOGO/DARK LONG.png" : "/VERMILION LOGO/LIGHT LONG.png"}
                alt="Vermilion Web Labs"
              />
            </div>
          </div>
          <p className="footer-desc">
            Studio produk digital premium dan website interaktif mewah bertema gelap untuk merangkai ide dan kenangan terbaik menjadi karya digital nyata.
          </p>
        </div>

        <div className="footer-links-group">
          <div className="footer-links">
            <h4>Navigasi</h4>
            <Link href="/">Home</Link>
            <Link href="/detail-nightflower">Produk</Link>
            <a href="/#cara-kerja">Cara Kerja</a>
            <a href="/#testimoni">Testimoni</a>
          </div>
          <div className="footer-links">
            <h4>Bantuan</h4>
            <a href="https://wa.me/6285134791706" target="_blank" rel="noopener noreferrer">
              Hubungi Admin
            </a>
            <a href="/#faq">FAQ</a>
            <a href="/#cara-kerja">Cara Order</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>&copy; 2026 Vermilion Web Labs. All rights reserved.</span>
        <span>Where Ideas Become Digital.</span>
      </div>
    </footer>
  );
}
