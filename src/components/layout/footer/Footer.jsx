"use client";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription logic here
    setIsSubscribed(true);
    setEmail("");
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <footer className="bg-gradient-to-br from-transparent  to-black/50 border-t border-gray-800 mt-16">
      <div className="container mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info Section */}
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                دکتر برایان اعتماد
              </h3>
              <div className="w-12 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded"></div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              پلتفرم پیشرفته استخدامی که با استفاده از هوش مصنوعی، بهترین
              فرصت‌های شغلی را برای شما پیدا می‌کند.
            </p>
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm">آنلاین و فعال</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">دسترسی سریع</h4>
            <ul className="space-y-2">
              {[
                "جستجوی شغل",
                "شرکت‌های برتر",
                "راهنمای کاریابی",
                "مشاوره شغلی",
                "رزومه ساز",
                "آموزش‌های تخصصی",
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 text-sm flex items-center group"
                  >
                    <span className="w-2 h-2 bg-gray-600 rounded-full ml-2 group-hover:bg-yellow-400 transition-colors duration-300"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">خدمات ما</h4>
            <ul className="space-y-2">
              {[
                "استخدام هوشمند",
                "تحلیل بازار کار",
                "مشاوره حرفه‌ای",
                "آموزش مهارت‌ها",
                "ارزیابی شخصیت",
                "پیگیری مصاحبه",
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 text-sm flex items-center group"
                  >
                    <span className="w-2 h-2 bg-gray-600 rounded-full ml-2 group-hover:bg-yellow-400 transition-colors duration-300"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">ارتباط با ما</h4>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-gray-300 text-sm">
                <svg
                  className="w-4 h-4 ml-2 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                info@brianjobs.com
              </div>
              <div className="flex items-center text-gray-300 text-sm">
                <svg
                  className="w-4 h-4 ml-2 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                تهران، ایران
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="mt-6">
              <h5 className="text-sm font-medium text-white mb-3">خبرنامه</h5>
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ایمیل شما"
                    className="w-full px-3 py-2  border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-yellow-400 transition-colors duration-300"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-medium py-2 px-4 rounded-lg transition-all duration-300 text-sm"
                >
                  {isSubscribed ? "✓ عضو شدید" : "عضویت"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Social Media & Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Social Media Links */}
            <div className="flex items-center space-x-4 space-x-reverse">
              <span className="text-gray-400 text-sm ml-4">
                ما را دنبال کنید:
              </span>
              {[
                {
                  name: "LinkedIn",
                  icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
                },
                {
                  name: "Twitter",
                  icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
                },
                {
                  name: "Instagram",
                  icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
                },
                {
                  name: "Telegram",
                  icon: "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z",
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10  hover:bg-yellow-500 rounded-full flex items-center justify-center transition-all duration-300 group"
                  title={social.name}
                >
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} پلتفرم استخدامی دکتر برایان
                اعتماد. تمام حقوق محفوظ است.
              </p>
              
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <div className="fixed bottom-8 left-8 z-50">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group"
            title="بازگشت به بالا"
          >
            <svg
              className="w-6 h-6 text-black group-hover:scale-110 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
