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
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-yellow-500/10 to-gray-900 rounded-xl p-6 border border-yellow-400/20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">
              به داشبورد {companyData.companyName} خوش آمدید
            </h1>
            <p className="text-gray-400">
              مدیریت آگهی‌های استخدامی و نظارت بر عملکرد استخدامی سازمان شما
            </p>
          </div>
          <div className="text-yellow-400">
            <svg
              className="w-16 h-16"
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Active Vacancies */}
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
            <h3 className="text-lg font-semibold text-white">آگهی‌های فعال</h3>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-yellow-400 mb-1">۳</p>
            <p className="text-sm text-gray-400">در حال استخدام</p>
          </div>
        </div>

        {/* Total Applicants */}
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
            <h3 className="text-lg font-semibold text-white">کل داوطلبان</h3>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-blue-400 mb-1">۲۴۷</p>
            <p className="text-sm text-gray-400">این ماه</p>
          </div>
        </div>

        {/* Performance Score */}
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
            <h3 className="text-lg font-semibold text-white">امتیاز عملکرد</h3>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-green-500 mb-1">۹۲</p>
            <p className="text-sm text-gray-400">از ۱۰۰</p>
          </div>
        </div>

        {/* Wallet Balance */}
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
            <h3 className="text-lg font-semibold text-white">موجودی کیف پول</h3>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-yellow-400 mb-1">۲,۵۰۰,۰۰۰</p>
            <p className="text-sm text-gray-400">تومان</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Create New Job Posting */}
        <div className="bg-[#1e1e1e] rounded-xl p-6 shadow-lg border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">ثبت آگهی جدید</h3>
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
          </div>
          <p className="text-gray-400 mb-4">
            آگهی استخدام جدید ایجاد کنید و بهترین نیروی کار را پیدا کنید
          </p>
          <Link
            href="/employer/dashboard/vacancies"
            className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg hover:bg-yellow-300 transition duration-300 font-bold flex items-center w-full justify-center"
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

        {/* Recent Activity */}
        <div className="bg-[#1e1e1e] rounded-xl p-6 shadow-lg border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">
              فعالیت‌های اخیر
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full ml-3"></div>
                <span className="text-gray-300">
                  ۲ داوطلب جدید برای آگهی React
                </span>
              </div>
              <span className="text-xs text-gray-500">۲ ساعت پیش</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full ml-3"></div>
                <span className="text-gray-300">آگهی UI/UX منقضی شد</span>
              </div>
              <span className="text-xs text-gray-500">۱ روز پیش</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-400 rounded-full ml-3"></div>
                <span className="text-gray-300">کیف پول شارژ شد</span>
              </div>
              <span className="text-xs text-gray-500">۳ روز پیش</span>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="bg-[#1e1e1e] rounded-xl p-6 shadow-lg border border-gray-800">
        <h3 className="text-lg font-semibold text-white mb-4">
          نمای کلی عملکرد
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400 mb-2">۱۵,۶۲۰</p>
            <p className="text-sm text-gray-400">بازدید آگهی‌ها</p>
            <p className="text-xs text-green-400 mt-1">
              +۱۲% نسبت به ماه گذشته
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400 mb-2">۸۴%</p>
            <p className="text-sm text-gray-400">نرخ پاسخگویی</p>
            <p className="text-xs text-blue-400 mt-1">میانگین پاسخگویی</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-400 mb-2">۲۱ روز</p>
            <p className="text-sm text-gray-400">میانگین زمان استخدام</p>
            <p className="text-xs text-purple-400 mt-1">
              -۳ روز نسبت به ماه گذشته
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
