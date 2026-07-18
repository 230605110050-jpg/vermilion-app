import FAQAccordion from "../components/FAQAccordion";
import Link from "next/link";
import ProductCard from "../components/ProductCard";
import CurvedLoop from "../components/CurvedLoop";
import { PRODUCTS } from "../data/products";

export default function Home() {
  return (
    <>
      {/* Hero Split-Screen Section */}
      <header className="hero">
        <div className="hero-content">
          <h1>Vermilion /<br />Web Labs.</h1>
          <p style={{ fontSize: "1.2rem", color: "var(--accent-gold)", fontWeight: 500, letterSpacing: "0.05em", marginBottom: "-10px" }}>
            Where Ideas Become Digital.
          </p>
          <p>
            Kami merancang dan membangun produk web interaktif, kado digital premium, dan kanvas kenangan terindah bertema gelap dan elegan. Abadikan momen berhargamu di laboratorium kreatif kami.
          </p>
          <div className="hero-actions">
            <Link href="/catalog" className="order-btn" style={{ padding: "12px 28px" }}>
              Lihat Katalog
            </Link>
            <a href="#cara-kerja" className="action-view">
              Cara Kerja
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <svg className="celestial-circle" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
            <circle cx="50" cy="50" r="45" strokeDasharray="10 4 2 4" />
            <circle cx="50" cy="50" r="38" strokeDasharray="1 3" />
            <circle cx="50" cy="50" r="30" />
            <circle cx="50" cy="50" r="10" strokeDasharray="2 2" />
            <line x1="50" y1="5" x2="50" y2="95" strokeDasharray="1 1" />
            <line x1="5" y1="50" x2="95" y2="50" strokeDasharray="1 1" />
            <circle cx="50" cy="20" r="2" fill="currentColor" />
          </svg>
        </div>
      </header>

      {/* Curved Marquee Section */}
      <CurvedLoop />

      {/* Featured Collection Section */}
      <section className="catalog-section" style={{ paddingBottom: "80px" }}>
        <div className="section-header">
          <h2>Produk Unggulan Kami</h2>
          <p>Desain web interaktif eksklusif pilihan dari Vermilion Web Labs.</p>
        </div>

        <div className="products-grid">
          <ProductCard
            product={PRODUCTS.nightflower}
            badge="Premium Gift"
            tagLabel="For"
            tags={["Birthday", "Special Gift", "Interactive"]}
          />
          <ProductCard
            product={PRODUCTS.redflowers}
            badge="Premium Invitation"
            tagLabel="For"
            tags={["Wedding", "Digital Invite", "Elegant"]}
          />
          <ProductCard
            product={PRODUCTS.customweb}
            badge="By Request"
            tagLabel="For"
            tags={["Any Event", "Company Profile", "Custom"]}
          />
        </div>
      </section>

      {/* Cara Kerja Section */}
      <section id="cara-kerja" className="catalog-section" style={{ paddingTop: "40px", paddingBottom: "80px" }}>
        <div className="section-header">
          <h2>Cara Kerja</h2>
          <p>Tiga langkah sederhana untuk mewujudkan produk digital istimewa bagi orang tersayang.</p>
        </div>

        <div className="steps-grid">
          <div className="step-card">
            <div className="step-num">I</div>
            <h3 className="step-title">Pilih Produk</h3>
            <p className="step-desc">Pesan desain web interaktif eksklusif kami untuk merayakan momen spesial Anda.</p>
          </div>

          <div className="step-card">
            <div className="step-num">II</div>
            <h3 className="step-title">Kirim Konten</h3>
            <p className="step-desc">Kirimkan file media (foto, musik, rekaman audio, tulisan) untuk dipasang di laboratorium kami.</p>
          </div>

          <div className="step-card">
            <div className="step-num">III</div>
            <h3 className="step-title">Nikmati Hasilnya</h3>
            <p className="step-desc">Kami merakit file Anda menjadi link web terproteksi premium yang siap dibagikan secara instan.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimoni" className="catalog-section" style={{ paddingTop: "40px", paddingBottom: "80px" }}>
        <div className="section-header">
          <h2>Ulasan Tulus</h2>
          <p>Kesan mendalam dari mereka yang telah merealisasikan ide digitalnya bersama Vermilion Web Labs.</p>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-stars">★★★★★</div>
            <p className="testimonial-quote">"Desain kado rekaman suaranya sangat bersih dan responsif di handphone! Hasil kerja Vermilion Web Labs luar biasa rapi, respon cepat."</p>
            <span className="testimonial-author">Vira, Jakarta</span>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-stars">★★★★★</div>
            <p className="testimonial-quote">"Merakit kado mixtape retro di sini gampang banget, tinggal kirim list lagu. Idenya keren banget, webnya pun loadingnya kencang."</p>
            <span className="testimonial-author">Rian, Bandung</span>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-stars">★★★★★</div>
            <p className="testimonial-quote">"Aura Memoria versi Vermilion ini bener-bener berkelas. Tampilan hitam arang dengan aksen merah neon sangat premium dan disukai pasangan saya."</p>
            <span className="testimonial-author">Alif, Surabaya</span>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="catalog-section" style={{ paddingTop: "40px", paddingBottom: "80px" }}>
        <div className="section-header">
          <h2>Pertanyaan Umum</h2>
          <p>Jawaban ringkas mengenai pemesanan produk web di laboratorium kami.</p>
        </div>

        <FAQAccordion />
      </section>

      {/* Promo Panel Section */}
      <section className="promo-section">
        <div className="promo-panel">
          <h2>Where Ideas Become Digital.</h2>
          <p>Saatnya merealisasikan momen dan ide kreatif Anda menjadi produk web interaktif yang premium, mewah, dan abadi.</p>
          <Link href="/catalog" className="order-btn" style={{ padding: "14px 36px" }}>
            Lihat Katalog
          </Link>
        </div>
      </section>
    </>
  );
}
