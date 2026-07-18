"use client";

import Link from "next/link";
import { useCart } from "../../context/CartContext";

export default function DetailCustomWeb() {
  const { addToCart, setIsDrawerOpen } = useCart();

  return (
    <>
      <main className="detail-page-main">
        <div className="detail-layout">
          {/* Left side: Visual representation */}
          <div className="detail-visual-wrapper" style={{ alignItems: "center" }}>
            <div className="detail-visual" style={{ "--GlowColor":"rgba(212, 175, 55, 0.25)", aspectRatio: "4/3", width: "100%", padding: 0, borderRadius: "24px", overflow: "hidden", margin: "0 auto" }}>
              <img
                src="/assets/image/custom-cover.svg"
                alt="Custom Web Preview"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block"
                }}
              />
            </div>
          </div>

          {/* Right side: Content */}
          <div className="detail-info">
            <a href="/catalog" className="detail-back-btn">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              Kembali ke Katalog
            </a>
            
            <div className="detail-meta">
              <h1 className="detail-title">Custom Web Request</h1>
              <span className="detail-tagline">Website Eksklusif Sesuai Kebutuhan Anda</span>
            </div>

            <p className="detail-description">
              Punya ide spesifik untuk website acara, portofolio, atau kebutuhan khusus lainnya? Layanan Custom Web dari Vermilion Web Labs siap membantu mewujudkan visi Anda menjadi produk digital premium yang responsif, modern, dan unik.
            </p>

            <div className="detail-pricing-box" style={{"flexWrap":"wrap","gap":"16px"}}>
              <div style={{"display":"flex","flexDirection":"column","gap":"4px"}}>
                <span className="detail-price-title">Harga Mulai</span>
                <div className="detail-price" style={{ fontSize: "1.4rem" }}>Menyesuaikan</div>
              </div>
              <div style={{"display":"flex","gap":"12px","alignItems":"center"}}>
                <button className="action-order" style={{"padding":"12px 28px","fontSize":"11px","height":"38px"}} onClick={() => { addToCart("customweb"); setIsDrawerOpen(true); }}>
                  Mulai Konsultasi
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tahapan Section */}
        <div className="catalog-section" style={{"paddingTop":"20px", paddingBottom: "80px"}}>
          <div className="section-header">
            <h2>Tahapan Pemesanan Custom Web</h2>
            <p>Proses kreatif yang transparan dari ide hingga website siap digunakan.</p>
          </div>
          
          <div className="steps-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            <div className="step-card">
              <div className="step-num">1</div>
              <h3 className="step-title">Konsultasi Ide</h3>
              <p className="step-desc">Ceritakan visi, fitur yang diinginkan, serta referensi desain (jika ada). Kami akan merumuskan konsep terbaik untuk Anda.</p>
            </div>

            <div className="step-card">
              <div className="step-num">2</div>
              <h3 className="step-title">Penawaran & Estimasi</h3>
              <p className="step-desc">Berdasarkan hasil diskusi, kami akan memberikan penawaran harga dan estimasi waktu pengerjaan yang transparan.</p>
            </div>

            <div className="step-card">
              <div className="step-num">3</div>
              <h3 className="step-title">Proses Development</h3>
              <p className="step-desc">Tim kami mulai merancang UI/UX dan melakukan koding. Anda akan mendapatkan pembaruan berkala tentang progresnya.</p>
            </div>

            <div className="step-card">
              <div className="step-num">4</div>
              <h3 className="step-title">Review & Revisi</h3>
              <p className="step-desc">Kami memberikan kesempatan bagi Anda untuk menguji website versi beta dan meminta penyesuaian jika diperlukan.</p>
            </div>
            
            <div className="step-card">
              <div className="step-num">5</div>
              <h3 className="step-title">Go Live</h3>
              <p className="step-desc">Setelah semua disetujui, website diluncurkan ke domain publik dan siap Anda bagikan kepada seluruh dunia.</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
