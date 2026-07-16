"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const {
    cart,
    removeFromCart,
    calculateCartTotal,
    calculateTotalItems,
    formatPrice,
    isDrawerOpen,
    setIsDrawerOpen,
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
  } = useCart();

  const totalItems = calculateTotalItems();

  const [checkoutStep, setCheckoutStep] = useState(1);
  const [formData, setFormData] = useState({ name: "", email: "", whatsapp: "" });
  const [selectedPayment, setSelectedPayment] = useState(null);

  const paymentOptions = [
    { id: "bri", name: "BRI", account: "166201018349500", holder: "SUNANDAR SUHERMAN" },
    { id: "mandiri", name: "MANDIRI", account: "1440024597335", holder: "SUNANDAR SUHERMAN" },
    { id: "seabank", name: "SEABANK", account: "901624712351", holder: "SUNANDAR SUHERMAN" },
    { id: "jago", name: "BANK JAGO", account: "107639852185", holder: "SUNANDAR SUHERMAN" },
    { id: "dana", name: "DANA", account: "083824981369", holder: "SUAEDAH" },
    { id: "shopeepay", name: "SHOPEEPAY", account: "083824981369", holder: "SUNANDAR SUHERMAN" },
  ];

  const handleCloseDrawer = () => setIsDrawerOpen(false);
  const handleOpenCheckout = () => {
    setIsDrawerOpen(false);
    setIsCheckoutModalOpen(true);
    setCheckoutStep(1);
  };
  const handleCloseCheckout = () => setIsCheckoutModalOpen(false);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.id.replace("buyer-", "")]: e.target.value });
  };

  const handleContinueReview = () => {
    if (!formData.name || !formData.email || !formData.whatsapp) return;
    setCheckoutStep(2);
  };

  const handlePaymentRedirect = () => {
    let itemDetailsText = "";
    cart.forEach((item, index) => {
      itemDetailsText += `${index + 1}. ${item.product.name} (x${item.quantity}) - Rp ${formatPrice(
        item.product.price * item.quantity
      )}\n`;
    });

    const message = `Halo Vermilion Web Labs! Saya ingin memesan kado digital:

*DETAIL PESANAN*
---------------------------------
${itemDetailsText}---------------------------------
*TOTAL:* Rp ${formatPrice(calculateCartTotal())}

*DATA PEMBELI*
Nama Panggilan: ${formData.name}
Email: ${formData.email}
Nomor WhatsApp: ${formData.whatsapp}

Metode Pembayaran: ${selectedPayment ? selectedPayment.name : "-"}

Akses digital mohon dikirimkan ke email di atas. Berikut saya lampirkan bukti pembayaran. Terima kasih!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/6285134791706?text=${encodedMessage}`;
    
    // In a real app we might want to clear cart here, but maybe we let user decide
    window.open(whatsappUrl, "_blank");
    handleCloseCheckout();
  };

  return (
    <>
      {/* Cart Drawer Overlay */}
      {isDrawerOpen && (
        <div id="cart-drawer-overlay" className="cart-drawer-overlay open" onClick={handleCloseDrawer}></div>
      )}

      {/* Cart Drawer */}
      <div id="cart-drawer" className={`cart-drawer ${isDrawerOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <h2 className="drawer-title">
            Keranjang <span className="count-badge" id="drawer-count">{totalItems}</span>
          </h2>
          <button id="drawer-close" className="drawer-close" aria-label="Tutup Keranjang" onClick={handleCloseDrawer}>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div id="drawer-items" className="drawer-items">
          {cart.length === 0 ? (
            <div className="empty-cart-state">
              <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p>Keranjang belanja kamu masih kosong. Jelajahi katalog untuk menemukan kado terbaik.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.product.id} className="cart-item">
                <div className="cart-item-img" dangerouslySetInnerHTML={{ __html: item.product.svgMarkup }}></div>
                <div className="cart-item-details">
                  <div className="cart-item-name">
                    {item.product.name} {item.quantity > 1 && `x${item.quantity}`}
                  </div>
                  <div className="cart-item-price">Rp {formatPrice(item.product.price * item.quantity)}</div>
                </div>
                <button
                  className="cart-item-remove"
                  aria-label="Hapus Item"
                  onClick={() => removeFromCart(item.product.id)}
                >
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        <div className="drawer-footer">
          <div className="summary-row">
            <span className="summary-label">Total</span>
            <span className="summary-value" id="summary-value">
              Rp {formatPrice(calculateCartTotal())}
            </span>
          </div>
          <button
            id="checkout-action-btn"
            className="checkout-action-btn"
            disabled={totalItems === 0}
            onClick={handleOpenCheckout}
          >
            {totalItems > 0 ? `Checkout Semua (${totalItems} kado)` : "Keranjang Kosong"}
          </button>
          <div className="footer-note">Akses digital akan dikirim otomatis ke email kamu</div>
        </div>
      </div>

      {/* Checkout Modal Overlay */}
      {isCheckoutModalOpen && (
        <div id="checkout-modal" className="modal-overlay open">
          <div className="modal-card">
            <div className="modal-header">
              <h2 className="modal-title">Checkout</h2>
              <button id="modal-close" className="modal-close" aria-label="Tutup Checkout" onClick={handleCloseCheckout}>
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="modal-body">
              {checkoutStep === 1 && (
                <div id="modal-step-1" className="modal-step active">
                  <p className="modal-subtext">Akses produk digital akan dikirim otomatis ke email kamu. Lengkapi data di bawah ini:</p>

                  <div className="form-group">
                    <label htmlFor="buyer-name">Nama Panggilan</label>
                    <input type="text" id="buyer-name" placeholder="Contoh: Budi" required value={formData.name} onChange={handleFormChange} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="buyer-email">Email Kamu</label>
                    <input type="email" id="buyer-email" placeholder="Akses akan dikirim ke sini" required value={formData.email} onChange={handleFormChange} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="buyer-whatsapp">Nomor WhatsApp</label>
                    <input type="tel" id="buyer-whatsapp" placeholder="Contoh: 08123456789" required value={formData.whatsapp} onChange={handleFormChange} />
                  </div>

                  <div className="modal-actions">
                    <button id="continue-review-btn" className="modal-btn-primary" style={{ width: "100%" }} onClick={handleContinueReview}>
                      Lanjutkan Review
                    </button>
                  </div>
                </div>
              )}

              {checkoutStep === 2 && (
                <div id="modal-step-2" className="modal-step active">
                  <p className="modal-subtext">Pastikan detail pesanan dan email kamu sudah benar.</p>

                  <div className="review-block">
                    <div className="review-item">
                      <span className="review-label">Nama</span>
                      <span id="review-name" className="review-value">{formData.name}</span>
                    </div>
                    <div className="review-item">
                      <span className="review-label">Email</span>
                      <span id="review-email" className="review-value" style={{ wordBreak: "break-all" }}>{formData.email}</span>
                    </div>
                    <div className="review-item">
                      <span className="review-label">WhatsApp</span>
                      <span id="review-whatsapp" className="review-value">{formData.whatsapp}</span>
                    </div>

                    <div className="review-divider"></div>

                    <div id="review-items-list" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {cart.map((item) => (
                        <div key={item.product.id} className="review-item">
                          <span className="review-label">{item.product.name} x{item.quantity}</span>
                          <span className="review-value">Rp {formatPrice(item.product.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="review-divider"></div>

                    <div className="review-item" style={{ fontWeight: 800, fontSize: "14px" }}>
                      <span className="review-label" style={{ color: "var(--text-primary)" }}>Total Bayar</span>
                      <span id="review-total" className="review-value" style={{ color: "var(--accent-gold)" }}>
                        Rp {formatPrice(calculateCartTotal())}
                      </span>
                    </div>
                  </div>

                  <div className="payment-methods-block" style={{ marginTop: "16px", padding: "16px", background: "var(--bg-secondary)", border: "1px solid var(--border-subtle)", borderRadius: "var(--border-radius-sharp)", fontSize: "12px" }}>
                    <p style={{ marginBottom: "12px", fontWeight: "600", color: "var(--text-primary)" }}>Pilih Metode Pembayaran:</p>
                    
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "16px" }}>
                      {paymentOptions.map(option => (
                        <div 
                          key={option.id}
                          onClick={() => setSelectedPayment(option)}
                          style={{
                            padding: "10px",
                            border: selectedPayment?.id === option.id ? "1px solid var(--accent-gold)" : "1px solid var(--border-subtle)",
                            borderRadius: "4px",
                            cursor: "pointer",
                            textAlign: "center",
                            background: selectedPayment?.id === option.id ? "rgba(230, 57, 70, 0.05)" : "transparent",
                            color: selectedPayment?.id === option.id ? "var(--accent-gold)" : "var(--text-secondary)",
                            fontWeight: selectedPayment?.id === option.id ? "600" : "400",
                            transition: "all 0.2s"
                          }}
                        >
                          {option.name}
                        </div>
                      ))}
                    </div>

                    {selectedPayment && (
                      <div style={{ padding: "12px", background: "rgba(0,0,0,0.2)", borderRadius: "4px", textAlign: "center", border: "1px dashed var(--border-subtle)" }}>
                        <p style={{ color: "var(--text-secondary)", marginBottom: "4px" }}>Transfer ke Rekening / Nomor {selectedPayment.name}:</p>
                        <p style={{ fontSize: "16px", fontWeight: "bold", color: "var(--text-primary)", letterSpacing: "1px" }}>{selectedPayment.account}</p>
                        <p style={{ color: "var(--text-muted)", fontSize: "11px", marginTop: "4px" }}>a.n. {selectedPayment.holder}</p>
                      </div>
                    )}

                    <p style={{ marginTop: "12px", fontStyle: "italic", fontSize: "11px", color: "var(--text-muted)" }}>
                      *Pilih salah satu metode pembayaran di atas, lakukan transfer, dan kirimkan bukti transfer setelah klik <strong>Bayar Sekarang</strong>.
                    </p>
                  </div>

                  <div className="modal-actions">
                    <button id="change-details-btn" className="modal-btn-secondary" onClick={() => setCheckoutStep(1)}>
                      Ubah
                    </button>
                    <button id="pay-now-btn" className="modal-btn-primary" onClick={handlePaymentRedirect} disabled={!selectedPayment} style={{ opacity: selectedPayment ? 1 : 0.5 }}>
                      Bayar Sekarang
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
