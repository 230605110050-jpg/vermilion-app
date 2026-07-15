"use client";

import { useCart } from "../context/CartContext";

export default function NotificationToast() {
  const { toastMessage } = useCart();

  return (
    <div id="notification-toast" className={`notification-toast ${toastMessage ? "show" : ""}`}>
      <div className="notification-toast-content" id="toast-message">
        {toastMessage}
      </div>
    </div>
  );
}
