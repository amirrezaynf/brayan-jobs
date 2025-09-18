"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { COMPANY_DATA, loadCompanyData } from "@/constants/companyData";

// استایل‌های سراسری
const GlobalStyles = () => (
  <style jsx global>{`
    body {
      font-family: "Vazirmatn", sans-serif;
      background-color: #000000; /* Pure black background */
      color: #d1d5db; /* Light gray for text */
      overflow-x: hidden; /* Prevent horizontal scroll */
    }

    /* No specific employer-hero background for this dashboard layout */

    input:focus,
    select:focus,
    textarea:focus {
      outline: none;
      border-color: #facc15; /* Yellow focus border */
      box-shadow: 0 0 0 1px #facc15; /* Optional: inner shadow for focus */
    }

    select option {
      background-color: #1f2937; /* Dark background for dropdown options */
      color: #d1d5db; /* Light text for dropdown options */
    }

    /* Right-aligned placeholders */
    input::placeholder,
    textarea::placeholder {
      text-align: right;
      direction: rtl;
    }

    /* Scrollbar styling for dark theme */
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px; /* For horizontal scrollbars */
    }
    ::-webkit-scrollbar-track {
      background: #1a1a1a;
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb {
      background: #4a4a4a;
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #6a6a6a;
    }
  `}</style>
);

// ======================================================================
// کامپوننت صفحه داشبورد کارفرمایان (بازطراحی‌شده)
// ======================================================================
export default function EmployerDashboardPage() {
  const [companyData, setCompanyData] = useState(COMPANY_DATA);
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState("home"); // برای مدیریت تب‌های اصلی داشبورد
  const [activeVacancyFilter, setActiveVacancyFilter] = useState("active"); // برای فیلتر آگهی‌ها
  const [activeWalletTab, setActiveWalletTab] = useState("overview"); // برای مدیریت تب‌های کیف پول

  useEffect(() => {
    setIsClient(true);
    const loadedData = loadCompanyData();
    setCompanyData(loadedData);

    // Listen for company data changes
    const handleDataChange = (event) => {
      setCompanyData(event.detail);
    };

    window.addEventListener("companyDataChanged", handleDataChange);

    return () => {
      window.removeEventListener("companyDataChanged", handleDataChange);
    };
  }, []);

  // Use default data for server-side rendering to avoid hydration mismatch
  const displayData = isClient ? companyData : COMPANY_DATA;

  // داده‌های کیف پول
  const walletTransactions = [
    {
      id: "TXN001",
      date: "۱۴۰۳/۰۶/۲۱",
      desc: "افزایش موجودی از طریق کارت بانکی",
      amount: "+۵۰۰,۰۰۰ تومان",
      status: "موفق",
      type: "deposit",
    },
    {
      id: "TXN002",
      date: "۱۴۰۳/۰۶/۲۰",
      desc: "ارتقاء آگهی 'توسعه‌دهنده React'",
      amount: "-۵۰,۰۰۰ تومان",
      status: "موفق",
      type: "expense",
    },
    {
      id: "TXN003",
      date: "۱۴۰۳/۰۶/۱۸",
      desc: "خرید بسته ویژه استخدام",
      amount: "-۱۵۰,۰۰۰ تومان",
      status: "موفق",
      type: "expense",
    },
    {
      id: "TXN004",
      date: "۱۴۰۳/۰۶/۱۵",
      desc: "افزایش موجودی از طریق درگاه پرداخت",
      amount: "+۲۰۰,۰۰۰ تومان",
      status: "ناموفق",
      type: "deposit",
    },
    {
      id: "TXN005",
      date: "۱۴۰۳/۰۶/۱۴",
      desc: "بازگشت وجه آگهی منقضی",
      amount: "+۲۵,۰۰۰ تومان",
      status: "موفق",
      type: "refund",
    },
  ];

  const walletPackages = [
    {
      name: "بسته استارت",
      price: "۱۰۰,۰۰۰ تومان",
      features: ["۵ آگهی استخدام", "۳۰ روز اعتبار", "پشتیبانی عادی"],
      popular: false,
    },
    {
      name: "بسته حرفه‌ای",
      price: "۲۵۰,۰۰۰ تومان",
      features: [
        "۱۵ آگهی استخدام",
        "۹۰ روز اعتبار",
        "پشتیبانی اولویت‌دار",
        "آمار پیشرفته",
      ],
      popular: true,
    },
    {
      name: "بسته سازمانی",
      price: "۵۰۰,۰۰۰ تومان",
      features: [
        "۵۰ آگهی استخدام",
        "۱۸۰ روز اعتبار",
        "پشتیبانی ویژه",
        "مشاوره اختصاصی",
      ],
      popular: false,
    },
  ];

  const paymentMethods = [
    { name: "کارت بانکی", icon: "💳", available: true },
    { name: "درگاه پرداخت", icon: "🏦", available: true },
    { name: "کیف پول الکترونیک", icon: "📱", available: false },
    { name: "انتقال بانکی", icon: "🏪", available: true },
  ];

  return (
    <>
      <GlobalStyles />
      <div className="flex min-h-screen  text-gray-200">
        {/* Sidebar */}
        <aside className="fixed right-0 top-0 h-full w-64 bg-[#1e1e1e] border-l border-gray-800 shadow-lg p-6 flex flex-col items-center z-50">
          <div className="mb-10 text-center">
            <Link href="/" className="flex items-center justify-center">
              <svg
                className="w-10 h-10 text-yellow-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
                />
              </svg>
            </Link>
          </div>

          <nav className="space-y-4 flex flex-col items-center w-full">
            {[
              {
                id: "home",
                label: "داشبورد",
                href: "/employer/dashboard",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2 2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                ),
              },
              {
                id: "applications",
                label: "رزومه‌های دریافتی",
                href: "/employer/dashboard/applications",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                ),
              },
              {
                id: "vacancies",
                label: "آگهی‌های من",
                href: "/employer/dashboard/vacancies",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                ),
              },
              {
                id: "performance",
                label: "عملکرد استخدامی",
                href: "/employer/dashboard/performance",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                    />
                  </svg>
                ),
              },
              {
                id: "wallet",
                label: "کیف پول",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                ),
              },

              {
                id: "organization-profile",
                label: "پروفایل سازمان",
                href: "/employer/dashboard/profile",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                ),
              },
            ].map((item) =>
              item.href ? (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex items-center w-full px-4 py-3 rounded-lg text-right transition-colors duration-200 ${
                    activeTab === item.id
                      ? "bg-yellow-400 text-gray-900 shadow-md"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  {item.icon}
                  <span className="mr-3">{item.label}</span>
                </Link>
              ) : (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center w-full px-4 py-3 rounded-lg text-right transition-colors duration-200 ${
                    activeTab === item.id
                      ? "bg-yellow-400 text-gray-900 shadow-md"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  {item.icon}
                  <span className="mr-3">{item.label}</span>
                </button>
              )
            )}
          </nav>

          {/* Contact Support */}
          <div className="mt-auto w-full text-center">
            <button className="flex items-center justify-center w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors duration-200">
              <span className="ml-2">ارتباط با پشتیبانی</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18.364 5.636l-3.536 3.536m0 0A9.953 9.953 0 0112 11c-2.43 0-4.71-.853-6.505-2.317m6.505 2.317c-2.43 0-4.71-.853-6.505-2.317m0 0L5.636 5.636m12.728 12.728l-3.536-3.536m0 0A9.953 9.953 0 0112 13c2.43 0 4.71.853 6.505 2.317m-6.505-2.317c2.43 0 4.71.853 6.505 2.317m0 0L18.364 18.364M5.636 18.364L9.172 14.828m0 0A9.953 9.953 0 0112 13c2.43 0 4.71.853 6.505 2.317M9.172 14.828L5.636 18.364"
                />
              </svg>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 mr-64">
          {/* Topbar -- START OF CHANGES */}
          <header className="bg-black/80 backdrop-blur-sm shadow-md shadow-black/50 sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <svg
                  className="w-10 h-10 text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
                  />
                </svg>
                <div className="text-right">
                  <h1 className="text-xl font-bold text-white">
                    پلتفرم استخدام{" "}
                    <span className="text-yellow-400">
                      {companyData.companyName}
                    </span>{" "}
                  </h1>
                  <p className="text-xs text-gray-200">پلتفرم اعتماد و تخصص</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <a
                  href="/auth"
                  className="bg-yellow-400 text-gray-900 px-5 py-2 rounded-lg hover:bg-yellow-300 transition duration-300 shadow-lg shadow-yellow-500/10 font-bold"
                >
                  ورود | ثبت نام
                </a>

                {/* Notification Bell - Moved to better position */}
                <button className="relative text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-gray-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="absolute -top-1 -right-1 block h-3 w-3 rounded-full bg-red-500 ring-2 ring-gray-900 animate-pulse"></span>
                </button>

                {/* User Profile / Organization Name */}
                <Link
                  href="/employer/dashboard/profile"
                  className="flex items-center space-x-4 hover:bg-gray-800 rounded-lg px-3 py-2 transition-colors duration-200"
                  style={{ direction: "rtl" }}
                >
                  <span className="text-white pl-4 font-medium">
                    {displayData.companyName}
                  </span>
                  <div className="h-10 w-10 bg-yellow-400 rounded-full flex items-center justify-center text-gray-900 font-bold text-lg overflow-hidden">
                    {displayData.companyLogo ? (
                      <img
                        src={displayData.companyLogo}
                        alt="Company Logo"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      displayData.companyName.charAt(0)
                    )}
                  </div>
                </Link>
              </div>
            </div>
          </header>
          {/* END OF CHANGES */}

          {/* Main Content */}
          <main className="p-6">
            {activeTab === "home" && (
              <div className="space-y-8">
                {/* Section: ثبت آگهی استخدام (Quick Access) */}
                <div className="bg-[#1e1e1e] rounded-xl p-6 shadow-lg border border-gray-800">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white text-right">
                      ثبت آگهی استخدام
                    </h2>
                    <Link
                      href="/employer/dashboard/vacancies"
                      className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg hover:bg-yellow-300 transition duration-300 font-bold flex items-center shadow-lg shadow-yellow-500/20"
                    >
                      <span className="ml-2">ایجاد آگهی جدید</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Link>
                  </div>
                  <div className="flex items-center justify-between bg-gradient-to-r from-purple-800 to-indigo-800 rounded-lg p-5">
                    <div>
                      <p className="text-lg text-white font-semibold text-right">
                        مدت زمان آگهی‌ها (۳ ماهه)
                      </p>
                      <p className="text-sm text-gray-300 text-right">
                        (شش برابر قبل) شد
                      </p>
                    </div>
                    <div className="bg-purple-600/50 rounded-full p-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Section: Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Card: آگهی‌های فعال */}
                  <div className="bg-[#1e1e1e] rounded-xl p-6 shadow-lg border border-gray-800 flex flex-col justify-between">
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-yellow-400 bg-yellow-400/10 rounded-full p-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-white">
                        آگهی‌های فعال
                      </h3>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-yellow-400 mb-1">
                        ۳
                      </p>
                      <p className="text-sm text-gray-400">در حال استخدام</p>
                    </div>
                  </div>

                  {/* Card: تعداد داوطلبان */}
                  <div className="bg-[#1e1e1e] rounded-xl p-6 shadow-lg border border-gray-800 flex flex-col justify-between">
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-blue-400 bg-blue-400/10 rounded-full p-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-white">
                        داوطلبان
                      </h3>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-blue-400 mb-1">
                        ۲۴۷
                      </p>
                      <p className="text-sm text-gray-400">این ماه</p>
                    </div>
                  </div>

                  {/* Card: امتیاز عملکرد استخدامی */}
                  <div className="bg-[#1e1e1e] rounded-xl p-6 shadow-lg border border-gray-800 flex flex-col justify-between">
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-green-400 bg-green-400/10 rounded-full p-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-white">
                        امتیاز عملکرد
                      </h3>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-green-500 mb-1">
                        ۹۲
                      </p>
                      <p className="text-sm text-gray-400">از ۱۰۰</p>
                    </div>
                    <button className="mt-4 text-yellow-400 hover:underline text-sm text-right">
                      مشاهده جزئیات
                    </button>
                  </div>

                  {/* Card: موجودی کیف پول */}
                  <div className="bg-[#1e1e1e] rounded-xl p-6 shadow-lg border border-gray-800 flex flex-col justify-between">
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-yellow-400 bg-yellow-400/10 rounded-full p-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-white">
                        موجودی کیف پول
                      </h3>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-yellow-400 mb-1">
                        ۲,۵۰۰,۰۰۰
                      </p>
                      <p className="text-sm text-gray-400">تومان</p>
                    </div>
                    <button className="mt-4 text-yellow-400 hover:underline text-sm text-right">
                      مدیریت کیف پول
                    </button>
                  </div>
                </div>

                {/* Section: آمار سریع */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* بازدیدها */}
                  <div className="bg-[#1e1e1e] rounded-xl p-6 shadow-lg border border-gray-800">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white">
                        بازدید آگهی‌ها
                      </h3>
                      <div className="text-green-400 bg-green-400/10 rounded-full p-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          />
                        </svg>
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-white mb-1">۱۵,۶۲۰</p>
                    <p className="text-sm text-green-400">
                      +۱۲% نسبت به ماه گذشته
                    </p>
                  </div>

                  {/* نرخ پاسخگویی */}
                  <div className="bg-[#1e1e1e] rounded-xl p-6 shadow-lg border border-gray-800">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white">
                        نرخ پاسخگویی
                      </h3>
                      <div className="text-blue-400 bg-blue-400/10 rounded-full p-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-white mb-1">۸۴%</p>
                    <p className="text-sm text-blue-400">میانگین پاسخگویی</p>
                  </div>

                  {/* میانگین زمان استخدام */}
                  <div className="bg-[#1e1e1e] rounded-xl p-6 shadow-lg border border-gray-800">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white">
                        میانگین زمان استخدام
                      </h3>
                      <div className="text-purple-400 bg-purple-400/10 rounded-full p-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-white mb-1">۲۱ روز</p>
                    <p className="text-sm text-purple-400">
                      -۳ روز نسبت به ماه گذشته
                    </p>
                  </div>
                </div>

                {/* Section: آگهی‌های من */}
                <div className="bg-[#1e1e1e] rounded-xl p-6 shadow-lg border border-gray-800">
                  <h2 className="text-xl font-bold mb-4 text-white text-right">
                    آگهی‌های من
                  </h2>
                  <div className="flex border-b border-gray-700 mb-4 justify-end">
                    <button
                      onClick={() => setActiveVacancyFilter("new")}
                      className={`px-4 py-2 text-sm font-medium ${
                        activeVacancyFilter === "new"
                          ? "text-yellow-400 border-b-2 border-yellow-400"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      جدید
                    </button>
                    <button
                      onClick={() => setActiveVacancyFilter("active")}
                      className={`px-4 py-2 text-sm font-medium ${
                        activeVacancyFilter === "active"
                          ? "text-yellow-400 border-b-2 border-yellow-400"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      فعال
                    </button>
                    <button
                      onClick={() => setActiveVacancyFilter("all")}
                      className={`px-4 py-2 text-sm font-medium ${
                        activeVacancyFilter === "all"
                          ? "text-yellow-400 border-b-2 border-yellow-400"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      آگهی‌های فعال
                    </button>
                  </div>

                  {activeVacancyFilter === "new" && (
                    <div className="bg-gray-800 rounded-lg p-4 flex items-center justify-end text-right">
                      <p className="text-gray-300 ml-4">
                        تازه سازی آگهی : انتقال به صدر لیست آگهی ها و
                        به‌روزرسانی تاریخ آگهی
                      </p>
                      <span className="bg-yellow-400/20 text-yellow-300 text-xs font-bold px-3 py-1 rounded-full">
                        جدید
                      </span>
                    </div>
                  )}
                  {activeVacancyFilter === "active" && (
                    <p className="text-gray-400 text-center py-8">
                      هیچ آگهی فعالی برای نمایش وجود ندارد.
                    </p>
                  )}
                  {activeVacancyFilter === "all" && (
                    <p className="text-gray-400 text-center py-8">
                      لیست همه آگهی‌ها در اینجا نمایش داده می‌شود.
                    </p>
                  )}
                </div>

                {/* Section: پروفایل سازمان */}
                <div className="bg-[#1e1e1e] rounded-xl p-6 shadow-lg border border-gray-800">
                  <h2 className="text-xl font-bold mb-4 text-white text-right">
                    پروفایل سازمان
                  </h2>
                  <div className="bg-gray-800 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between text-right space-y-4 md:space-y-0 md:space-x-8">
                    <div className="flex items-center space-x-4">
                      <div className="h-16 w-16 bg-gradient-to-br from-yellow-400/20 to-yellow-600/30 rounded-full flex items-center justify-center text-yellow-400 font-bold text-2xl border-2 border-yellow-400/50 overflow-hidden">
                        {companyData.companyLogo ? (
                          <img
                            src={companyData.companyLogo}
                            alt="Company Logo"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          companyData.companyName.charAt(0)
                        )}
                      </div>
                      <div className=" flex space-x-2">
                        <p className="text-white font-semibold pl-2">
                          {companyData.companyName}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {companyData.city}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-gray-300 text-sm">
                      <div className="flex items-center justify-end">
                        <span className="ml-2">{companyData.phone}</span>
                        <span>تلفن ثابت</span>
                      </div>
                      <div className="flex items-center justify-end">
                        <span className="ml-2">{companyData.mobile}</span>
                        <span>موبایل</span>
                      </div>
                      <div className="flex items-center justify-end">
                        <span className="ml-2">{companyData.email}</span>
                        <span>ایمیل</span>
                      </div>
                    </div>
                    <button className="bg-yellow-400 text-gray-900 px-6 py-2 rounded-lg hover:bg-yellow-300 transition duration-300 font-bold w-full md:w-auto mt-4 md:mt-0">
                      پروفایل سازمان
                    </button>
                  </div>
                </div>

                {/* Section: قبل از استخدام محک بزنید */}
                <div className="bg-gradient-to-br from-purple-800/60 to-indigo-800/60 rounded-xl p-6 shadow-lg border border-purple-700/50 relative overflow-hidden flex flex-col items-center text-center">
                  <div className="absolute inset-0 bg-pattern opacity-10"></div>
                  <div className="relative z-10 flex flex-col items-center">
                    <img
                      src="https://www.e-estekhdam.com/images/pages/employer/ai-hiring-graphic.webp" // replace with your desired image path
                      alt="AI Hiring Graphic"
                      className="w-full max-w-sm mb-6"
                    />
                    <h3 className="text-2xl font-bold text-white mb-3">
                      قبل از استخدام محک بزنید
                    </h3>
                    <p className="text-gray-300 max-w-2xl mx-auto mb-6">
                      با ایجاد پرسشنامه به شما کمک می‌کند تا شایسته‌ترین فرد را
                      برای استخدام خود دست پیدا کنید.
                    </p>
                    <button className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg hover:bg-yellow-300 transition duration-300 font-bold text-lg">
                      ایجاد پرسشنامه
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Wallet Tab */}
            {activeTab === "wallet" && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h1 className="text-3xl font-bold text-white">
                    کیف پول و امور مالی
                  </h1>
                  <div className="flex space-x-4 space-x-reverse">
                    <button
                      onClick={() => setActiveWalletTab("overview")}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        activeWalletTab === "overview"
                          ? "bg-yellow-400 text-gray-900"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      نمای کلی
                    </button>
                    <button
                      onClick={() => setActiveWalletTab("packages")}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        activeWalletTab === "packages"
                          ? "bg-yellow-400 text-gray-900"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      بسته‌ها
                    </button>
                    <button
                      onClick={() => setActiveWalletTab("transactions")}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        activeWalletTab === "transactions"
                          ? "bg-yellow-400 text-gray-900"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      تراکنش‌ها
                    </button>
                  </div>
                </div>

                {activeWalletTab === "overview" && (
                  <div className="space-y-8">
                    {/* Balance Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-gradient-to-tr from-yellow-500/20 to-gray-900 rounded-xl p-8 border border-yellow-400/50">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-white">
                            موجودی فعلی
                          </h3>
                          <div className="text-yellow-400 bg-yellow-400/10 rounded-full p-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                              />
                            </svg>
                          </div>
                        </div>
                        <p className="text-4xl font-bold text-yellow-400 mb-2">
                          ۲,۵۰۰,۰۰۰ تومان
                        </p>
                        <p className="text-sm text-gray-400">
                          موجودی قابل استفاده
                        </p>
                      </div>

                      <div className="bg-[#1e1e1e] rounded-xl p-8 border border-gray-800">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-white">
                            هزینه‌های ماه جاری
                          </h3>
                          <div className="text-red-400 bg-red-400/10 rounded-full p-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                            </svg>
                          </div>
                        </div>
                        <p className="text-4xl font-bold text-red-400 mb-2">
                          ۳۲۰,۰۰۰ تومان
                        </p>
                        <p className="text-sm text-gray-400">
                          +۱۵% نسبت به ماه گذشته
                        </p>
                      </div>

                      <div className="bg-[#1e1e1e] rounded-xl p-8 border border-gray-800">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-white">
                            میانگین هزینه روزانه
                          </h3>
                          <div className="text-blue-400 bg-blue-400/10 rounded-full p-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                              />
                            </svg>
                          </div>
                        </div>
                        <p className="text-4xl font-bold text-blue-400 mb-2">
                          ۱۰,۶۶۷ تومان
                        </p>
                        <p className="text-sm text-gray-400">
                          بر اساس ۳۰ روز گذشته
                        </p>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-[#1e1e1e] rounded-xl p-6 border border-gray-800">
                        <h3 className="text-lg font-semibold text-white mb-4">
                          افزایش موجودی
                        </h3>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            {[100000, 200000, 500000, 1000000].map((amount) => (
                              <button
                                key={amount}
                                className="bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-lg transition-colors"
                              >
                                {amount.toLocaleString()} تومان
                              </button>
                            ))}
                          </div>
                          <input
                            type="number"
                            placeholder="مبلغ دلخواه"
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400"
                          />
                          <button className="w-full bg-yellow-400 text-gray-900 font-bold py-3 rounded-lg hover:bg-yellow-300 transition-colors">
                            پرداخت و افزایش موجودی
                          </button>
                        </div>
                      </div>

                      <div className="bg-[#1e1e1e] rounded-xl p-6 border border-gray-800">
                        <h3 className="text-lg font-semibold text-white mb-4">
                          روش‌های پرداخت
                        </h3>
                        <div className="space-y-3">
                          {paymentMethods.map((method, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
                            >
                              <div className="flex items-center">
                                <span className="text-2xl ml-3">
                                  {method.icon}
                                </span>
                                <span className="text-white">
                                  {method.name}
                                </span>
                              </div>
                              <span
                                className={`text-sm ${
                                  method.available
                                    ? "text-green-400"
                                    : "text-red-400"
                                }`}
                              >
                                {method.available ? "فعال" : "غیرفعال"}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeWalletTab === "packages" && (
                  <div className="space-y-8">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold text-white mb-4">
                        بسته‌های خدماتی
                      </h2>
                      <p className="text-gray-400">
                        انتخاب بسته مناسب برای نیازهای استخدامی سازمان شما
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {walletPackages.map((pkg, index) => (
                        <div
                          key={index}
                          className={`bg-[#1e1e1e] rounded-xl p-8 border transition-all duration-200 ${
                            pkg.popular
                              ? "border-yellow-400 shadow-lg shadow-yellow-400/10"
                              : "border-gray-800"
                          }`}
                        >
                          {pkg.popular && (
                            <div className="bg-yellow-400 text-gray-900 text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">
                              محبوب‌ترین
                            </div>
                          )}
                          <h3 className="text-2xl font-bold text-white mb-2">
                            {pkg.name}
                          </h3>
                          <p className="text-3xl font-bold text-yellow-400 mb-6">
                            {pkg.price}
                          </p>
                          <ul className="space-y-3 mb-8">
                            {pkg.features.map((feature, idx) => (
                              <li
                                key={idx}
                                className="flex items-center text-gray-300"
                              >
                                <svg
                                  className="w-5 h-5 text-green-400 ml-2"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                {feature}
                              </li>
                            ))}
                          </ul>
                          <button
                            className={`w-full py-3 rounded-lg font-bold transition-colors ${
                              pkg.popular
                                ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
                                : "bg-gray-800 text-white hover:bg-gray-700"
                            }`}
                          >
                            خرید بسته
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeWalletTab === "transactions" && (
                  <div className="space-y-8">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold text-white">
                        تاریخچه تراکنش‌ها
                      </h2>
                      <div className="flex space-x-4 space-x-reverse">
                        <select className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white">
                          <option>همه تراکنش‌ها</option>
                          <option>واریزی‌ها</option>
                          <option>برداشت‌ها</option>
                          <option>بازگشت وجه</option>
                        </select>
                        <input
                          type="date"
                          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                        />
                      </div>
                    </div>

                    <div className="bg-[#1e1e1e] rounded-xl border border-gray-800 overflow-hidden">
                      <table className="w-full text-right">
                        <thead className="bg-gray-800">
                          <tr className="text-gray-400 text-sm">
                            <th className="p-4">شناسه تراکنش</th>
                            <th className="p-4">تاریخ</th>
                            <th className="p-4">توضیحات</th>
                            <th className="p-4">مبلغ</th>
                            <th className="p-4">وضعیت</th>
                            <th className="p-4">عملیات</th>
                          </tr>
                        </thead>
                        <tbody>
                          {walletTransactions.map((t, i) => (
                            <tr
                              key={i}
                              className="border-b border-gray-800 hover:bg-gray-800/50"
                            >
                              <td className="p-4 text-gray-300 font-mono text-sm">
                                {t.id}
                              </td>
                              <td className="p-4 text-white">{t.date}</td>
                              <td className="p-4 text-gray-300">{t.desc}</td>
                              <td
                                className={`p-4 font-semibold ${
                                  t.amount.startsWith("+")
                                    ? "text-green-400"
                                    : "text-red-400"
                                }`}
                              >
                                {t.amount}
                              </td>
                              <td className="p-4">
                                <span
                                  className={`px-3 py-1 text-xs rounded-full ${
                                    t.status === "موفق"
                                      ? "bg-green-500/20 text-green-400"
                                      : "bg-red-500/20 text-red-400"
                                  }`}
                                >
                                  {t.status}
                                </span>
                              </td>
                              <td className="p-4">
                                <button className="text-yellow-400 hover:text-yellow-300 text-sm">
                                  مشاهده جزئیات
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Transaction Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="bg-[#1e1e1e] rounded-xl p-6 border border-gray-800 text-center">
                        <p className="text-2xl font-bold text-green-400 mb-2">
                          ۱,۲۰۰,۰۰۰
                        </p>
                        <p className="text-sm text-gray-400">کل واریزی‌ها</p>
                      </div>
                      <div className="bg-[#1e1e1e] rounded-xl p-6 border border-gray-800 text-center">
                        <p className="text-2xl font-bold text-red-400 mb-2">
                          ۵۲۰,۰۰۰
                        </p>
                        <p className="text-sm text-gray-400">کل برداشت‌ها</p>
                      </div>
                      <div className="bg-[#1e1e1e] rounded-xl p-6 border border-gray-800 text-center">
                        <p className="text-2xl font-bold text-blue-400 mb-2">
                          ۲۵,۰۰۰
                        </p>
                        <p className="text-sm text-gray-400">بازگشت وجه</p>
                      </div>
                      <div className="bg-[#1e1e1e] rounded-xl p-6 border border-gray-800 text-center">
                        <p className="text-2xl font-bold text-yellow-400 mb-2">
                          ۲,۵۰۰,۰۰۰
                        </p>
                        <p className="text-sm text-gray-400">موجودی فعلی</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Placeholder for other tabs */}
            {activeTab !== "home" && activeTab !== "wallet" && (
              <div className="text-center py-20 text-gray-400">
                محتوای بخش {activeTab} در اینجا نمایش داده خواهد شد.
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
