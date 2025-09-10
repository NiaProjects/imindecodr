"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const phoneNumber = "01208777757"; // رقم الهاتف من معلومات الشركة
  const message = "مرحباً! أريد الاستفسار عن خدمات التصميم الداخلي"; // رسالة افتراضية

  const handleWhatsAppClick = () => {
    // تنظيف رقم الهاتف (إزالة الأصفار من البداية)
    const cleanNumber = phoneNumber.replace(/^0+/, "");
    const whatsappUrl = `https://wa.me/20${cleanNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
      aria-label="تواصل معنا عبر الواتساب"
    >
      <MessageCircle className="h-6 w-6" />

      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        تواصل معنا عبر الواتساب
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
      </div>
    </button>
  );
};

export default WhatsAppButton;
