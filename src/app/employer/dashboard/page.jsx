"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { COMPANY_DATA, loadCompanyData } from "@/constants/companyData";

// ======================================================================
// کامپوننت صفحه داشبورد کارفرمایان (بازطراحی‌شده)
// ======================================================================
export default function EmployerDashboardPage() {
  const [companyData, setCompanyData] = useState(COMPANY_DATA);

  useEffect(() => {
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

  return (
    <div className="space-y-6 sm:space-y-8 p-4 sm:p-0">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-yellow-500/10 to-gray-900 rounded-xl p-4 sm:p-6 border border-yellow-400/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight">
              به داشبورد {companyData.companyName} خوش آمدید
            </h1>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              مدیریت آگهی‌های استخدامی و نظارت بر عملکرد استخدامی سازمان شما
            </p>
          </div>
          <div className="text-yellow-400 flex-shrink-0">
            <svg
              className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Active Vacancies */}
        <div className="bg-[#1e1e1e] rounded-xl p-4 sm:p-6 shadow-lg border border-black flex flex-col justify-between min-h-[140px]">
          <div className="flex justify-between items-center mb-4">
            <div className="text-yellow-400 bg-yellow-400/10 rounded-full p-2 flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 sm:h-7 sm:w-7"
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
            <h3 className="text-base sm:text-lg font-semibold text-white text-right flex-1 ml-2">
              آگهی‌های فعال
            </h3>
          </div>
          <div className="text-right">
            <p className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-1">
              ۳
            </p>
            <p className="text-xs sm:text-sm text-gray-400">در حال استخدام</p>
          </div>
        </div>

        {/* Total Applicants */}
        <div className="bg-[#1e1e1e] rounded-xl p-4 sm:p-6 shadow-lg border border-black flex flex-col justify-between min-h-[140px]">
          <div className="flex justify-between items-center mb-4">
            <div className="text-blue-400 bg-blue-400/10 rounded-full p-2 flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 sm:h-7 sm:w-7"
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
            <h3 className="text-base sm:text-lg font-semibold text-white text-right flex-1 ml-2">
              کل داوطلبان
            </h3>
          </div>
          <div className="text-right">
            <p className="text-2xl sm:text-3xl font-bold text-blue-400 mb-1">
              ۲۴۷
            </p>
            <p className="text-xs sm:text-sm text-gray-400">این ماه</p>
          </div>
        </div>

        {/* Performance Score */}
        <div className="bg-[#1e1e1e] rounded-xl p-4 sm:p-6 shadow-lg border border-black flex flex-col justify-between min-h-[140px]">
          <div className="flex justify-between items-center mb-4">
            <div className="text-green-400 bg-green-400/10 rounded-full p-2 flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 sm:h-7 sm:w-7"
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
            <h3 className="text-base sm:text-lg font-semibold text-white text-right flex-1 ml-2">
              امتیاز عملکرد
            </h3>
          </div>
          <div className="text-right">
            <p className="text-2xl sm:text-3xl font-bold text-green-500 mb-1">
              ۹۲
            </p>
            <p className="text-xs sm:text-sm text-gray-400">از ۱۰۰</p>
          </div>
        </div>

        {/* Wallet Balance */}
        <div className="bg-[#1e1e1e] rounded-xl p-4 sm:p-6 shadow-lg border border-black flex flex-col justify-between min-h-[140px]">
          <div className="flex justify-between items-center mb-4">
            <div className="text-yellow-400 bg-yellow-400/10 rounded-full p-2 flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 sm:h-7 sm:w-7"
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
            <h3 className="text-base sm:text-lg font-semibold text-white text-right flex-1 ml-2">
              موجودی کیف پول
            </h3>
          </div>
          <div className="text-right">
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-400 mb-1">
              ۲,۵۰۰,۰۰۰
            </p>
            <p className="text-xs sm:text-sm text-gray-400">تومان</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Transactions */}
        <div className="bg-[#1e1e1e] rounded-xl p-4 sm:p-6 shadow-lg border border-black">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
            <h3 className="text-lg sm:text-xl font-semibold text-white">
              آخرین تراکنش‌ها
            </h3>
            <div className="text-green-400 bg-green-400/10 rounded-full p-2 flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6"
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
            </div>
          </div>
          <div className="space-y-2 sm:space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 sm:p-3 bg-black rounded-lg gap-2">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-400/10 rounded-full flex items-center justify-center ml-3 flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9.5 9.293 10.793a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <span className="text-sm sm:text-base text-gray-300 block">
                    شارژ کیف پول
                  </span>
                  <span className="text-xs text-gray-500">امروز - ۱۴:۳۰</span>
                </div>
              </div>
              <span className="text-sm font-bold text-green-400 mr-11 sm:mr-0">
                +۵۰۰,۰۰۰ تومان
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 sm:p-3 bg-black rounded-lg gap-2">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-red-400/10 rounded-full flex items-center justify-center ml-3 flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-red-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9.5 9.293 10.793a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                      clipRule="evenodd"
                      transform="rotate(180 10 10)"
                    />
                  </svg>
                </div>
                <div>
                  <span className="text-sm sm:text-base text-gray-300 block">
                    انتشار آگهی React
                  </span>
                  <span className="text-xs text-gray-500">دیروز - ۱۰:۱۵</span>
                </div>
              </div>
              <span className="text-sm font-bold text-red-400 mr-11 sm:mr-0">
                -۱۲۰,۰۰۰ تومان
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 sm:p-3 bg-black rounded-lg gap-2">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-400/10 rounded-full flex items-center justify-center ml-3 flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <span className="text-sm sm:text-base text-gray-300 block">
                    بازگشت وجه
                  </span>
                  <span className="text-xs text-gray-500">
                    ۲ روز پیش - ۱۶:۴۵
                  </span>
                </div>
              </div>
              <span className="text-sm font-bold text-blue-400 mr-11 sm:mr-0">
                +۸۰,۰۰۰ تومان
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 sm:p-3 bg-black rounded-lg gap-2">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-red-400/10 rounded-full flex items-center justify-center ml-3 flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-red-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9.5 9.293 10.793a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                      clipRule="evenodd"
                      transform="rotate(180 10 10)"
                    />
                  </svg>
                </div>
                <div>
                  <span className="text-sm sm:text-base text-gray-300 block">
                    ارتقاء آگهی UI/UX
                  </span>
                  <span className="text-xs text-gray-500">
                    ۳ روز پیش - ۰۹:۳۰
                  </span>
                </div>
              </div>
              <span className="text-sm font-bold text-red-400 mr-11 sm:mr-0">
                -۲۰۰,۰۰۰ تومان
              </span>
            </div>
          </div>
        </div>

        {/* Recent Jobs */}
        <div className="bg-[#1e1e1e] rounded-xl p-4 sm:p-6 shadow-lg border border-black">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
            <h3 className="text-lg sm:text-xl font-semibold text-white">
              آگهی‌های اخیر
            </h3>
            <div className="text-yellow-400 bg-yellow-400/10 rounded-full p-2 flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6"
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
            </div>
          </div>
          <div className="space-y-2 sm:space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 sm:p-3 bg-black rounded-lg gap-2">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full ml-3 flex-shrink-0"></div>
                <span className="text-sm sm:text-base text-gray-300">
                  توسعه‌دهنده React Senior
                </span>
              </div>
              <div className="flex items-center gap-2 mr-5 sm:mr-0">
                <span className="text-xs bg-green-400/10 text-green-400 px-2 py-1 rounded-full">
                  فعال
                </span>
                <span className="text-xs text-gray-500">۱۲ داوطلب</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 sm:p-3 bg-black rounded-lg gap-2">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full ml-3 flex-shrink-0"></div>
                <span className="text-sm sm:text-base text-gray-300">
                  طراح UI/UX
                </span>
              </div>
              <div className="flex items-center gap-2 mr-5 sm:mr-0">
                <span className="text-xs bg-blue-400/10 text-blue-400 px-2 py-1 rounded-full">
                  فعال
                </span>
                <span className="text-xs text-gray-500">۸ داوطلب</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 sm:p-3 bg-black rounded-lg gap-2">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-400 rounded-full ml-3 flex-shrink-0"></div>
                <span className="text-sm sm:text-base text-gray-300">
                  مدیر محصول
                </span>
              </div>
              <div className="flex items-center gap-2 mr-5 sm:mr-0">
                <span className="text-xs bg-yellow-400/10 text-yellow-400 px-2 py-1 rounded-full">
                  در انتظار
                </span>
                <span className="text-xs text-gray-500">۵ داوطلب</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 sm:p-3 bg-black rounded-lg gap-2">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full ml-3 flex-shrink-0"></div>
                <span className="text-sm sm:text-base text-gray-300">
                  توسعه‌دهنده Backend
                </span>
              </div>
              <div className="flex items-center gap-2 mr-5 sm:mr-0">
                <span className="text-xs bg-purple-400/10 text-purple-400 px-2 py-1 rounded-full">
                  فعال
                </span>
                <span className="text-xs text-gray-500">۱۵ داوطلب</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 sm:p-3 bg-black rounded-lg gap-2">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-400 rounded-full ml-3 flex-shrink-0"></div>
                <span className="text-sm sm:text-base text-gray-300">
                  مهندس DevOps
                </span>
              </div>
              <div className="flex items-center gap-2 mr-5 sm:mr-0">
                <span className="text-xs bg-gray-400/10 text-gray-400 px-2 py-1 rounded-full">
                  منقضی
                </span>
                <span className="text-xs text-gray-500">۳ داوطلب</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Company Info */}
      <div className="bg-[#1e1e1e] rounded-xl p-4 sm:p-6 shadow-lg border border-black">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3">
          <h3 className="text-lg sm:text-xl font-semibold text-white">
            اطلاعات شرکت
          </h3>
          <div className="text-blue-400 bg-blue-400/10 rounded-full p-2 flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="text-center p-3 sm:p-4 bg-black/50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-8 bg-green-400/20 rounded-full flex items-center justify-center ml-2">
                <svg
                  className="w-4 h-4 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-green-400">
                ۱۲۸
              </p>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mb-1">روز عضویت</p>
            <p className="text-xs text-green-400">در سایت</p>
          </div>

          <div className="text-center p-3 sm:p-4 bg-black/50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-8 bg-blue-400/20 rounded-full flex items-center justify-center ml-2">
                <svg
                  className="w-4 h-4 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-blue-400">
                تایید شده
              </p>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mb-1">وضعیت حساب</p>
            <p className="text-xs text-blue-400">فعال</p>
          </div>

          <div className="text-center p-3 sm:p-4 bg-black/50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-8 bg-purple-400/20 rounded-full flex items-center justify-center ml-2">
                <svg
                  className="w-4 h-4 text-purple-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2.003V2a1 1 0 00-1.75-.628L6.5 2.122a1 1 0 00-.628.928v.001L6 18a1 1 0 001.75.628L8.5 17.878A1 1 0 009 17V3.003zM11 2.003V2a1 1 0 011.75-.628l.75.75a1 1 0 01.628.928v.001L14 18a1 1 0 01-1.75.628l-.75-.75A1 1 0 0111 17V3.003z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-purple-400">
                ۳۸۷
              </p>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mb-1">
              رزومه دریافتی
            </p>
            <p className="text-xs text-purple-400">کل زمان</p>
          </div>

          <div className="text-center p-3 sm:p-4 bg-black/50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-8 bg-indigo-400/20 rounded-full flex items-center justify-center ml-2">
                <svg
                  className="w-4 h-4 text-indigo-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-indigo-400">
                ۹۲%
              </p>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mb-1">
              تکمیل پروفایل
            </p>
            <p className="text-xs text-indigo-400">کامل</p>
          </div>
        </div>
      </div>
    </div>
  );
}
