"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { PRODUCTS } from "../data/products";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    const savedCart = localStorage.getItem("premium_catalog_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("premium_catalog_cart", JSON.stringify(cart));
  }, [cart]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const addToCart = (productId) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === productId);
      if (existing) {
        return prev.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { product: PRODUCTS[productId], quantity: 1 }];
      }
    });
    showToast(`Berhasil menambahkan ${PRODUCTS[productId].name} ke keranjang!`);
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const calculateCartTotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const calculateTotalItems = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const formatPrice = (amount) => {
    return new Intl.NumberFormat("id-ID", { minimumFractionDigits: 0 }).format(amount);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        calculateCartTotal,
        calculateTotalItems,
        formatPrice,
        isDrawerOpen,
        setIsDrawerOpen,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        toastMessage,
        setToastMessage,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
