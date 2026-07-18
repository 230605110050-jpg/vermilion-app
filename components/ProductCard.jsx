"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product, badge, tagLabel, tags, glowColor, animationDelay }) {
  const { addToCart, setIsDrawerOpen, formatPrice } = useCart();

  const handleOrder = () => {
    addToCart(product.id);
  };

  return (
    <div className="card-wrapper" style={{ animationDelay: animationDelay || "0s" }}>
      <article className="product-card" style={{ "--glow-color": glowColor || "rgba(230, 57, 70, 0.25)" }}>
        <div className="card-image-container">
          <div className="vector-cover">
            <img 
              src={product.image} 
              alt={product.name} 
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} 
            />
          </div>
          {badge && <span className="card-badge">{badge}</span>}
        </div>
        <div className="card-body">
          <div className="card-header-info">
            <div className="card-title-tags">
              <h3 className="card-title">{product.name}</h3>
              {tags && tags.length > 0 && (
                <div className="card-tags">
                  {tagLabel && <span className="tag-label">{tagLabel}</span>}
                  {tags.map((tag) => (
                    <span key={tag} className="tag-pill">{tag}</span>
                  ))}
                </div>
              )}
            </div>
            <div className="card-price-badge">
              {product.price === 0 ? (
                <span style={{ fontSize: "14px", letterSpacing: "0.1em", textTransform: "uppercase" }}>By Request</span>
              ) : (
                <>
                  <span className="currency">Rp</span>
                  {formatPrice(product.price)}
                </>
              )}
            </div>
          </div>
          <ul className="features-list">
            {/* We can map specific features if we pass them, or keep it simple */}
            <li className="feature-item">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>Desain Eksklusif</span>
            </li>
            <li className="feature-item">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>Fitur Premium</span>
            </li>
            <li className="feature-item">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>Terima Beres (Admin Input)</span>
            </li>
          </ul>
          <div className="card-actions">
            <Link href={`/detail-${product.id}`} className="action-view">
              Detail
            </Link>
            <button
              className="action-order"
              style={{ "--glow-color": "#e63946", color: "#fff" }}
              onClick={handleOrder}
            >
              Pesan
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
