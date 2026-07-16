import { ThemeProvider } from "../context/ThemeContext";
import { CartProvider } from "../context/CartContext";
import { UserProvider } from "../context/UserContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";
import NotificationToast from "../components/NotificationToast";
import SocialProofWidget from "../components/SocialProofWidget";
import FloatingWhatsapp from "../components/FloatingWhatsapp";
import "./globals.css";

export const metadata = {
  title: "Vermilion Web Labs — Where Ideas Become Digital.",
  description: "Studio produk digital premium dan web interaktif terindah bertema gelap dan elegan dari Vermilion Web Labs.",
  icons: {
    icon: "/favicon-vermilion.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <UserProvider>
          <ThemeProvider>
            <CartProvider>
              <Navbar />
              {children}
              <Footer />
              <CartDrawer />
              <NotificationToast />
              <SocialProofWidget />
              <FloatingWhatsapp />
            </CartProvider>
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
