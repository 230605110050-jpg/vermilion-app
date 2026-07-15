import ProductCard from "../../components/ProductCard";
import { PRODUCTS } from "../../data/products";

export default function Catalog() {
  const catalogItems = [
    {
      key: "nightflower",
      product: PRODUCTS.nightflower,
      badge: "Premium Gift",
      tagLabel: "For",
      tags: ["Birthday", "Special Gift", "Interactive"],
      animationDelay: "0.35s",
    },
  ];

  return (
    <>
      <header className="hero" style={{ gridTemplateColumns: "1fr", textAlign: "center", padding: "160px 24px 60px" }}>
        <div className="hero-content" style={{ maxWidth: "700px", margin: "0 auto" }}>
          <h1>Semua <span className="italic">Koleksi.</span></h1>
          <p>Jelajahi laboratorium koleksi web kustom kami. Temukan media terbaik untuk merangkai cerita perjalanan berharga kalian.</p>
        </div>
      </header>

      <main className="catalog-section">
        <div className="products-grid">
          {catalogItems.map((item) => (
            <ProductCard
              key={item.key}
              product={item.product}
              badge={item.badge}
              tagLabel={item.tagLabel}
              tags={item.tags}
              animationDelay={item.animationDelay}
            />
          ))}
        </div>
      </main>
    </>
  );
}
