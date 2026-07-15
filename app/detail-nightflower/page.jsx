"use client";

import Link from "next/link";
import { useCart } from "../../context/CartContext";

export default function DetailNightFlower() {
  const { addToCart, setIsDrawerOpen } = useCart();

  return (
    <>
      <main className="detail-page-main">
    <div className="detail-layout">
      {/* Left side: Visual representation */}
      <div className="detail-visual-wrapper">
        <div className="detail-visual" id="iframe-container" style={{"-GlowColor":"rgba(230, 57, 70, 0.25)"}}>
          {/* Wrapper untuk iframe demo dan tombol fullscreen */}
          <div id="demo-wrapper" style={{"width":"100%","height":"100%","position":"absolute","top":"0","left":"0","zIndex":"2"}}>
            <iframe id="preview-iframe" src="https://night-flower.vercel.app/" className="desktop-preview-iframe" scrolling="no"></iframe>
            <a href="https://night-flower.vercel.app/" target="_blank" rel="noopener noreferrer" className="action-view" style={{"position":"absolute","bottom":"16px","right":"16px","padding":"12px 24px","fontSize":"11px","height":"38px","zIndex":"10","display":"flex","alignItems":"center","gap":"6px"}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{"marginRight":"2px"}}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
              Demo Live
            </a>
          </div>
          
          {/* Image untuk slide selanjutnya */}
          <img id="preview-image" src="" alt="Slide Preview" style={{"width":"100%","height":"100%","objectFit":"cover","position":"absolute","top":"0","left":"0","zIndex":"1","display":"none","borderRadius":"var(--border-radius-sharp)"}} />
        </div>
        <script dangerouslySetInnerHTML={{ __html: `
          function scaleIframe() {
            const container = document.getElementById('iframe-container');
            const iframe = document.getElementById('preview-iframe');
            if (container && iframe) {
              const scale = container.offsetWidth / 1920;
              iframe.style.transform = \`scale(\${scale})\`;
            }
          }
          window.addEventListener('resize', scaleIframe);
          setTimeout(scaleIframe, 100);
          scaleIframe();
        ` }} />

        <div className="showcase-slider-card">
          <div className="slider-header">
            <span className="slider-title-label">Koleksi Pages</span>
            <div className="slider-divider"></div>
          </div>
          
          <div className="slider-controls">
            <button className="slider-btn prev-btn" aria-label="Previous">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>

            <div className="slider-text">
              <span className="slider-title">Opening Gate</span>
              <span className="slider-subtitle">Animasi kado pembuka</span>
            </div>

            <button className="slider-btn next-btn" aria-label="Next">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
          
          <div className="slider-dots">
            <div className="dot active" title="Opening Gate"></div>
            <div className="dot" title="Dedication Page"></div>
            <div className="dot" title="On This Earth"></div>
            <div className="dot" title="Letter Section"></div>
            <div className="dot" title="Things I Like"></div>
            <div className="dot" title="Year of Memories"></div>
            <div className="dot" title="Captured Moments"></div>
            <div className="dot" title="Blow the Candle"></div>
          </div>
        </div>
        
        <script dangerouslySetInnerHTML={{ __html: `
          const slidesData = [
            { title: "Opening Gate", subtitle: "Animasi kado pembuka" },
            { title: "Dedication Page", subtitle: "Salam pembuka eksklusif" },
            { title: "On This Earth", subtitle: "Penghitung waktu hidup" },
            { title: "Letter Section", subtitle: "Surat rahasia dalam amplop" },
            { title: "Things I Like", subtitle: "Grid interaktif karakter" },
            { title: "Year of Memories", subtitle: "Kilas balik kebersamaan" },
            { title: "Captured Moments", subtitle: "Galeri polaroid" },
            { title: "Blow the Candle", subtitle: "Kue & lilin interaktif" }
          ];

          const slideImages = [
            null, // Index 0 = iframe demo (1.png is the landing page but we show iframe)
            "assets/image/night-flower/2.png",
            "assets/image/night-flower/3.png",
            "assets/image/night-flower/4.png",
            "assets/image/night-flower/5.png",
            "assets/image/night-flower/6.png",
            "assets/image/night-flower/7.png",
            "assets/image/night-flower/8.png"
          ];
          
          let currentSlideIndex = 0;
          
          const sTitle = document.querySelector('.slider-title');
          const sSubtitle = document.querySelector('.slider-subtitle');
          const sDots = document.querySelectorAll('.slider-dots .dot');
          const btnPrev = document.querySelector('.prev-btn');
          const btnNext = document.querySelector('.next-btn');
          const demoWrapper = document.getElementById('demo-wrapper');
          const previewImage = document.getElementById('preview-image');

          function updateSliderUI(index) {
            currentSlideIndex = index;
            
            // Update teks
            sTitle.textContent = slidesData[index].title;
            sSubtitle.textContent = slidesData[index].subtitle;
            
            // Update dots
            sDots.forEach((dot, i) => {
              if (i === index) dot.classList.add('active');
              else dot.classList.remove('active');
            });

            // Tampilkan iframe untuk slide 0, gambar untuk slide lainnya
            if (index === 0) {
              demoWrapper.style.display = 'block';
              previewImage.style.display = 'none';
            } else {
              demoWrapper.style.display = 'none';
              previewImage.style.display = 'block';
              previewImage.src = slideImages[index];
            }
          }

          btnPrev.addEventListener('click', () => {
            if (currentSlideIndex > 0) updateSliderUI(currentSlideIndex - 1);
          });

          btnNext.addEventListener('click', () => {
            if (currentSlideIndex < slidesData.length - 1) updateSliderUI(currentSlideIndex + 1);
          });
          
          sDots.forEach((dot, i) => {
            dot.addEventListener('click', () => updateSliderUI(i));
          });
        ` }} />
      </div>

      {/* Right side: Content */}
      <div className="detail-info">
        <a href="/catalog" className="detail-back-btn">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Kembali ke Katalog
        </a>
        
        <div className="detail-meta">
          <h1 className="detail-title">Vermilion Night Flower</h1>
          <span className="detail-tagline">Buku Cerita Ulang Tahun Digital Interaktif Premium</span>
        </div>

        <p className="detail-description">
          Vermilion Night Flower adalah produk website ulang tahun interaktif premium (Birthday Web) yang menghadirkan pengalaman storybook digital yang megah. Dirancang khusus untuk merayakan hari kelahiran orang tersayang dengan fitur interaktif tiup lilin dan amplop surat rahasia.
        </p>

        <div className="detail-pricing-box" style={{"flexWrap":"wrap","gap":"16px"}}>
          <div style={{"display":"flex","flexDirection":"column","gap":"4px"}}>
            <span className="detail-price-title">Harga Flat</span>
            <div className="detail-price"><span className="currency">Rp</span>55.000</div>
          </div>
          <div style={{"display":"flex","gap":"12px","alignItems":"center"}}>
            <button className="action-order" style={{"padding":"12px 28px","fontSize":"11px","height":"38px"}} onClick={() => { addToCart("nightflower"); setIsDrawerOpen(true); }}>
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
                <span className="premium-feature-text">8 Halaman Animasi Interaktif</span>
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
                <span className="premium-feature-text">Galeri Foto Polaroid Custom</span>
              </div>
              <div className="premium-feature-icon anim-square">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
              </div>
            </div>

            <div className="premium-feature-item">
              <div className="premium-feature-left">
                <div className="premium-feature-check">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <span className="premium-feature-text">Surat Lilin & Countdown Timer</span>
              </div>
              <div className="premium-feature-icon anim-mail">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
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
        <p>Hal yang paling sering ditanyakan mengenai kado Vermilion Night Flower.</p>
      </div>
      
      <div className="faq-container">
        <div className="faq-item">
          <div className="faq-question" onClick={(e) => { const item = e.currentTarget.parentElement; item.classList.toggle("active"); const icon = e.currentTarget.querySelector(".faq-icon"); icon.textContent = item.classList.contains("active") ? "-" : "+"; }}>
            <span>Bagaimana lilin interaktif ditiup oleh penerima?</span>
            <span className="faq-icon">+</span>
          </div>
          <div className="faq-answer">
            Penerima kado cukup mengetuk/mengklik api lilin di layar handphone mereka, kemudian api akan padam dengan animasi asap halus dan memicu pesan ucapan utama bermunculan.
          </div>
        </div>
        <div className="faq-item">
          <div className="faq-question" onClick={(e) => { const item = e.currentTarget.parentElement; item.classList.toggle("active"); const icon = e.currentTarget.querySelector(".faq-icon"); icon.textContent = item.classList.contains("active") ? "-" : "+"; }}>
            <span>Apakah saya bisa mengganti lagu Married Life bawaannya?</span>
            <span className="faq-icon">+</span>
          </div>
          <div className="faq-answer">
            Tentu saja. Anda dapat memberikan file MP3 lagu pilihan Anda sendiri saat pengiriman bahan kado, agar dipasang permanen oleh tim admin kami.
          </div>
        </div>
      </div>
    </div>
  </main>
    </>
  );
}
