"use client";

import { useState } from "react";

export default function FAQAccordion() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "Berapa lama waktu pengerjaan web kustom?",
      answer: "Proses perakitan dan peluncuran link web memakan waktu 1 hingga 2 hari kerja setelah data media yang Anda berikan terkumpul lengkap."
    },
    {
      question: "Apakah lagu latar belakangnya bisa saya pilih sendiri?",
      answer: "Ya. Anda bebas melampirkan file audio MP3 atau menyertakan tautan lagu Spotify/YouTube apa pun untuk kami pasang sebagai musik latar belakang."
    },
    {
      question: "Apakah link web kustom ini akan aktif selamanya?",
      answer: "Betul. Seluruh link produk web dari Vermilion Web Labs akan aktif selamanya tanpa batas waktu dan bebas biaya sewa hosting tahunan."
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="faq-container">
      {faqs.map((faq, index) => (
        <div key={index} className={`faq-item ${activeIndex === index ? "active" : ""}`}>
          <div className="faq-question" onClick={() => toggleAccordion(index)}>
            <span>{faq.question}</span>
            <span className="faq-icon">{activeIndex === index ? "-" : "+"}</span>
          </div>
          <div className="faq-answer">
            {faq.answer}
          </div>
        </div>
      ))}
    </div>
  );
}
