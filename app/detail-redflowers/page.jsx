"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "../../context/CartContext";

const slidesData = [
  { title: "Live Preview", subtitle: "Tampilan Undangan Langsung" },
  { title: "Cover Page", subtitle: "Halaman Sampul & Judul" },
  { title: "Profil Mempelai", subtitle: "Pengenalan Pasangan" },
  { title: "Informasi Acara", subtitle: "Waktu & Tempat" },
  { title: "Save the Date", subtitle: "Kalender & Hitung Mundur" },
  { title: "Galeri Pre-wedding", subtitle: "Momen Bahagia Bersama" },
  { title: "Wedding Gift", subtitle: "Hadiah & Amplop Digital" },
  { title: "Buku Tamu & RSVP", subtitle: "Konfirmasi Kehadiran" },
];

const slideImages = [
  null, // Index 0 = iframe demo
  "/assets/image/red-flower/cover.jpeg",
  "/assets/image/red-flower/foto pria.jpeg",
  "/assets/image/red-flower/informasi.jpeg",
  "/assets/image/red-flower/kalender.jpeg",
  "/assets/image/red-flower/galery.jpeg",
  "/assets/image/red-flower/wedding gift.jpeg",
  "/assets/image/red-flower/RSVP.jpeg",
];

export default function DetailRedFlowers() {
  const { addToCart, setIsDrawerOpen } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Scale iframe to fit container
  useEffect(() => {
    function scaleIframe() {
      const container = document.getElementById("iframe-container");
      const iframe = document.getElementById("preview-iframe");
      if (container && iframe) {
        const scale = container.offsetWidth / 375;
        iframe.style.transform = `scale(${scale})`;
      }
    }
    window.addEventListener("resize", scaleIframe);
    setTimeout(scaleIframe, 100);
    scaleIframe();
    return () => window.removeEventListener("resize", scaleIframe);
  }, []);

  const goToPrev = () => {
    setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : slidesData.length - 1);
  };

  const goToNext = () => {
    setCurrentSlide(currentSlide < slidesData.length - 1 ? currentSlide + 1 : 0);
  };

  return (
    <>
      <main className="detail-page-main">
        <div className="detail-layout">
          {/* Left side: Visual representation */}
          <div className="detail-visual-wrapper" style={{ alignItems: "center" }}>
            <div className="detail-visual" id="iframe-container" style={{ "--GlowColor":"rgba(230, 57, 70, 0.25)", aspectRatio: "9/16", width: "100%", maxWidth: "375px", padding: 0, borderRadius: "24px", overflow: "hidden", margin: "0 auto" }}>
              {/* Wrapper untuk iframe demo */}
              <div
                id="demo-wrapper"
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: "0",
                  left: "0",
                  zIndex: "2",
                  display: currentSlide === 0 ? "block" : "none",
                }}
              >
                <iframe id="preview-iframe" src="https://invitation-red-flowers.vercel.app/" scrolling="no" style={{ position: "absolute", top: 0, left: 0, width: "375px", height: "812px", transformOrigin: "0 0", border: "none", zIndex: 2 }}></iframe>
                <a href="https://invitation-red-flowers.vercel.app/" target="_blank" rel="noopener noreferrer" className="action-view" style={{"position":"absolute","bottom":"16px","right":"16px","padding":"12px 24px","fontSize":"11px","height":"38px","zIndex":"10","display":"flex","alignItems":"center","gap":"6px"}}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{"marginRight":"2px"}}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
                  Demo Live
                </a>
              </div>
              
              {/* Image untuk slide selanjutnya */}
              {currentSlide !== 0 && (
                <img
                  src={slideImages[currentSlide]}
                  alt={slidesData[currentSlide].title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    position: "absolute",
                    top: "0",
                    left: "0",
                    zIndex: "1",
                    borderRadius: "var(--border-radius-sharp)",
                  }}
                />
              )}
            </div>

            <div className="showcase-slider-card" style={{ width: "100%", maxWidth: "375px" }}>
              <div className="slider-header">
                <span className="slider-title-label">Koleksi Pages</span>
                <div className="slider-divider"></div>
              </div>
              
              <div className="slider-controls">
                <button className="slider-btn prev-btn" aria-label="Previous" onClick={goToPrev}>
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
                  </svg>
                </button>

                <div className="slider-text">
                  <span className="slider-title">{slidesData[currentSlide].title}</span>
                  <span className="slider-subtitle">{slidesData[currentSlide].subtitle}</span>
                </div>

                <button className="slider-btn next-btn" aria-label="Next" onClick={goToNext}>
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
              
              <div className="slider-dots">
                {slidesData.map((slide, i) => (
                  <div
                    key={i}
                    className={`dot ${i === currentSlide ? "active" : ""}`}
                    title={slide.title}
                    onClick={() => setCurrentSlide(i)}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side: Content */}
          <div className="detail-info">
            <a href="/catalog" className="detail-back-btn">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              Kembali ke Katalog
            </a>
            
            <div className="detail-meta">
              <h1 className="detail-title">Vermilion Red Flowers</h1>
              <span className="detail-tagline">Undangan Pernikahan Digital Premium</span>
            </div>

            <p className="detail-description">
              Vermilion Red Flowers adalah undangan pernikahan digital interaktif premium (Digital Wedding Invitation) yang elegan dengan tema bunga merah. Sampaikan kabar bahagia Anda kepada tamu undangan dengan cara yang modern, praktis, dan berkesan.
            </p>

            <div className="detail-pricing-box" style={{"flexWrap":"wrap","gap":"16px"}}>
              <div style={{"display":"flex","flexDirection":"column","gap":"4px"}}>
                <span className="detail-price-title">Harga Flat</span>
                <div className="detail-price"><span className="currency">Rp</span>55.000</div>
              </div>
              <div style={{"display":"flex","gap":"12px","alignItems":"center"}}>
                <button className="action-order" style={{"padding":"12px 28px","fontSize":"11px","height":"38px"}} onClick={() => { addToCart("redflowers"); setIsDrawerOpen(true); }}>
                  Tambah ke Keranjang
                </button>
              </div>
            </div>

            <div>
              <h3 style={{"fontSize":"11px","fontWeight":"700","textTransform":"uppercase","letterSpacing":"0.15em","color":"var(--accent-gold)","marginBottom":"16px","marginTop":"24px"}}>Fitur Interaktif</h3>
              
              <div className="premium-feature-list">
                <div className="premium-feature-item">
                  <div className="premium-feature-left">
                    <div className="premium-feature-check">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span className="premium-feature-text">Kustomisasi Penuh Teks & Pesan</span>
                  </div>
                  <div className="premium-feature-icon anim-sparkle">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/></svg>
                  </div>
                </div>

                <div className="premium-feature-item">
                  <div className="premium-feature-left">
                    <div className="premium-feature-check">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span className="premium-feature-text">RSVP Terintegrasi</span>
                  </div>
                  <div className="premium-feature-icon anim-dots">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2.5"/><circle cx="12" cy="12" r="2.5"/><circle cx="19" cy="12" r="2.5"/></svg>
                  </div>
                </div>

                <div className="premium-feature-item">
                  <div className="premium-feature-left">
                    <div className="premium-feature-check">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span className="premium-feature-text">Kustomisasi & Autoplay Musik Latar</span>
                  </div>
                  <div className="premium-feature-icon anim-music">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
                  </div>
                </div>

                <div className="premium-feature-item">
                  <div className="premium-feature-left">
                    <div className="premium-feature-check">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span className="premium-feature-text">Galeri Foto Pre-wedding</span>
                  </div>
                  <div className="premium-feature-icon anim-square">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product FAQ Section */}
        <div className="catalog-section" style={{"paddingTop":"20px"}}>
          <div className="section-header">
            <h2>Pertanyaan Produk</h2>
            <p>Hal yang paling sering ditanyakan mengenai undangan Vermilion Red Flowers.</p>
          </div>
          
          <div className="faq-container">
            <div className="faq-item">
              <div className="faq-question" onClick={(e) => { const item = e.currentTarget.parentElement; item.classList.toggle("active"); const icon = e.currentTarget.querySelector(".faq-icon"); icon.textContent = item.classList.contains("active") ? "-" : "+"; }}>
                <span>Berapa lama proses pembuatan undangan ini?</span>
                <span className="faq-icon">+</span>
              </div>
              <div className="faq-answer">
                Proses pembuatan memakan waktu 1-3 hari kerja setelah kami menerima seluruh detail acara dan foto-foto dari Anda.
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-question" onClick={(e) => { const item = e.currentTarget.parentElement; item.classList.toggle("active"); const icon = e.currentTarget.querySelector(".faq-icon"); icon.textContent = item.classList.contains("active") ? "-" : "+"; }}>
                <span>Apakah saya bisa mengganti lagu bawaannya?</span>
                <span className="faq-icon">+</span>
              </div>
              <div className="faq-answer">
                Tentu saja. Anda dapat memberikan file MP3 lagu pilihan Anda sendiri saat pengisian form detail acara.
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
