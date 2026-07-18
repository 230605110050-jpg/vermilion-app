"use client";

import { useEffect, useState } from "react";

const SOCIAL_NAMES = ["Dewi", "Budi", "Ega", "Rian", "Indah", "Putri", "Adit", "Nadia", "Fajar", "Gita", "Hendra", "Sari", "Yusuf", "Wulan", "Kartika", "Roni", "Ayu", "Dimas", "Laras", "Miko"];
const SOCIAL_PRODUCTS = [
  "Vermilion Memoria",
  "Vermilion Voices",
  "Vermilion Mixtape",
  "Vermilion Invitation",
  "Vermilion Letter",
  "Vermilion Arcade",
  "Vermilion Retro",
  "Vermilion Night Flower",
  "Vermilion Red Flowers"
];
const SOCIAL_ACTIONS = [
  "baru saja memesan",
  "baru saja order",
  "memesan",
  "baru saja membeli"
];
const SOCIAL_TIMES = ["1 menit lalu", "3 menit lalu", "baru saja", "5 menit lalu", "2 menit lalu"];

export default function SocialProofWidget() {
  const [proof, setProof] = useState(null);

  useEffect(() => {
    let timeoutId;

    const triggerSocialProof = () => {
      const name = SOCIAL_NAMES[Math.floor(Math.random() * SOCIAL_NAMES.length)];
      const product = SOCIAL_PRODUCTS[Math.floor(Math.random() * SOCIAL_PRODUCTS.length)];
      const action = SOCIAL_ACTIONS[Math.floor(Math.random() * SOCIAL_ACTIONS.length)];
      const time = SOCIAL_TIMES[Math.floor(Math.random() * SOCIAL_TIMES.length)];

      setProof({ name, product, action, time });

      // Hide after 6 seconds
      setTimeout(() => {
        setProof(null);
        // Trigger next after 15-25 seconds
        const nextInterval = 15000 + Math.random() * 10000;
        timeoutId = setTimeout(triggerSocialProof, nextInterval);
      }, 6000);
    };

    // Initial trigger after 8 seconds
    timeoutId = setTimeout(triggerSocialProof, 8000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div id="social-proof-widget" className={`floating-social-proof ${proof ? "show" : ""}`}>
      {proof && (
        <div className="toast-container">
          <div className="toast-avatar">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <div className="toast-content">
            <span className="toast-title">
              {proof.name} {proof.action} <strong>{proof.product}</strong>
            </span>
            <span className="toast-subtitle">{proof.time}</span>
          </div>
        </div>
      )}
    </div>
  );
}
