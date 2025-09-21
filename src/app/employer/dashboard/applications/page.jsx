"use client";

import React, { useState, Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

// داده‌های نمونه رزومه‌ها - برای جلوگیری از hydration mismatch، داده‌ها ثابت هستند
const initialApplicationsData = [
  {
    id: 1,
    name: "سارا احمدی",
    position: "توسعه‌دهنده React",
    jobTitle: "توسعه‌دهنده Front-End (React)",
    appliedDate: "۲ ساعت پیش",
    experience: "۴",
    education: "کارشناسی مهندسی نرم‌افزار",
    status: "new",
    score: 92,
    isPro: true,
  },
  {
    id: 2,
    name: "امیرحسین رضایی",
    position: "طراح UX/UI",
    jobTitle: "طراح رابط کاربری",
    appliedDate: "۴ ساعت پیش",
    experience: "۳",
    education: "کارشناسی طراحی گرافیک",
    status: "new",
    score: 88,
    isPro: false,
  },
  {
    id: 3,
    name: "مریم کرمی",
    position: "توسعه‌دهنده Node.js",
    jobTitle: "توسعه‌دهنده Back-End",
    appliedDate: "۶ ساعت پیش",
    experience: "۵",
    education: "کارشناسی کامپیوتر",
    status: "reviewed",
    score: 85,
    isPro: true,
  },
  {
    id: 4,
    name: "علیرضا محمدی",
    position: "مدیر محصول دیجیتال",
    jobTitle: "مدیر محصول دیجیتال",
    appliedDate: "۱ روز پیش",
    experience: "۶",
    education: "کارشناسی MBA",
    status: "shortlisted",
    score: 95,
    isPro: false,
  },
  {
    id: 5,
    name: "فاطمه زمانی",
    position: "تحلیلگر داده",
    jobTitle: "تحلیلگر داده",
    appliedDate: "۲ روز پیش",
    experience: "۴",
    education: "کارشناسی آمار و احتمال",
    status: "reviewed",
    score: 82,
    isPro: true,
  },
  {
    id: 6,
    name: "حسین علوی",
    position: "توسعه‌دهنده React Native",
    jobTitle: "توسعه‌دهنده Mobile",
    appliedDate: "۳ روز پیش",
    experience: "۳",
    education: "کارشناسی مهندسی برق",
    status: "reviewed",
    score: 79,
    isPro: false,
  },
  {
    id: 7,
    name: "نازنین حسینی",
    position: "کارشناس DevOps",
    jobTitle: "کارشناس DevOps",
    appliedDate: "۴ روز پیش",
    experience: "۵",
    education: "کارشناسی مهندسی کامپیوتر",
    status: "shortlisted",
    score: 91,
    isPro: true,
  },
  {
    id: 8,
    name: "رضا شریفی",
    position: "توسعه‌دهنده Python",
    jobTitle: "توسعه‌دهنده Back-End",
    appliedDate: "۵ روز پیش",
    experience: "۴",
    education: "کارشناسی علوم کامپیوتر",
    status: "new",
    score: 87,
    isPro: false,
  },
  {
    id: 9,
    name: "محمد علیزاده",
    position: "توسعه‌دهنده Vue.js",
    jobTitle: "توسعه‌دهنده Front-End",
    appliedDate: "۲ ساعت پیش",
    experience: "۲",
    education: "کارشناسی مهندسی نرم‌افزار",
    status: "new",
    score: 78,
    isPro: false,
  },
  {
    id: 10,
    name: "زهرا کریمی",
    position: "توسعه‌دهنده PHP",
    jobTitle: "توسعه‌دهنده Back-End",
    appliedDate: "۶ ساعت پیش",
    experience: "۳",
    education: "کارشناسی کامپیوتر",
    status: "reviewed",
    score: 81,
    isPro: false,
  },
  {
    id: 11,
    name: "احمد رضایی",
    position: "طراح گرافیک",
    jobTitle: "طراح گرافیک",
    appliedDate: "۱ روز پیش",
    experience: "۴",
    education: "کارشناسی هنر",
    status: "new",
    score: 76,
    isPro: false,
  },
  {
    id: 12,
    name: "مائده جعفری",
    position: "کارشناس امنیت",
    jobTitle: "کارشناس امنیت سایبری",
    appliedDate: "۲ روز پیش",
    experience: "۵",
    education: "کارشناسی امنیت اطلاعات",
    status: "shortlisted",
    score: 89,
    isPro: true,
  },
  {
    id: 13,
    name: "پارسا محمدی",
    position: "توسعه‌دهنده React",
    jobTitle: "توسعه‌دهنده Front-End (React)",
    appliedDate: "۴ ساعت پیش",
    experience: "۱",
    education: "کارشناسی مهندسی نرم‌افزار",
    status: "new",
    score: 74,
    isPro: false,
  },
  {
    id: 14,
    name: "یاسمن احمدی",
    position: "تحلیلگر داده",
    jobTitle: "تحلیلگر داده",
    appliedDate: "۳ روز پیش",
    experience: "۶",
    education: "کارشناسی آمار و احتمال",
    status: "reviewed",
    score: 93,
    isPro: true,
  },
  {
    id: 15,
    name: "کیانوش رضایی",
    position: "مدیر محصول دیجیتال",
    jobTitle: "مدیر محصول دیجیتال",
    appliedDate: "۱ روز پیش",
    experience: "۷",
    education: "کارشناسی MBA",
    status: "shortlisted",
    score: 96,
    isPro: true,
  },
  {
    id: 16,
    name: "نیلوفر کرمی",
    position: "طراح UX/UI",
    jobTitle: "طراح رابط کاربری",
    appliedDate: "۵ روز پیش",
    experience: "۲",
    education: "کارشناسی طراحی گرافیک",
    status: "new",
    score: 77,
    isPro: false,
  },
  {
    id: 17,
    name: "امیر محمدزاده",
    position: "توسعه‌دهنده Node.js",
    jobTitle: "توسعه‌دهنده Back-End",
    appliedDate: "۲ ساعت پیش",
    experience: "۴",
    education: "کارشناسی کامپیوتر",
    status: "reviewed",
    score: 84,
    isPro: false,
  },
  {
    id: 18,
    name: "سپیده زمانی",
    position: "کارشناس DevOps",
    jobTitle: "کارشناس DevOps",
    appliedDate: "۴ روز پیش",
    experience: "۳",
    education: "کارشناسی مهندسی کامپیوتر",
    status: "shortlisted",
    score: 88,
    isPro: false,
  },
  {
    id: 19,
    name: "بهرام علوی",
    position: "توسعه‌دهنده Python",
    jobTitle: "توسعه‌دهنده Back-End",
    appliedDate: "۱ روز پیش",
    experience: "۵",
    education: "کارشناسی علوم کامپیوتر",
    status: "reviewed",
    score: 86,
    isPro: true,
  },
  {
    id: 20,
    name: "ملیکا حسینی",
    position: "توسعه‌دهنده React Native",
    jobTitle: "توسعه‌دهنده Mobile",
    appliedDate: "۳ روز پیش",
    experience: "۲",
    education: "کارشناسی مهندسی برق",
    status: "new",
    score: 75,
    isPro: false,
  },
  // تعداد رزومه‌ها به ۲۰ تا کاهش یافت
];

// کامپوننت کارت رزومه زیبا و مدرن
const ResumeCard = ({ application, onStatusChange, onViewResume }) => (
  <div
    className={`group relative bg-[#1e1e1e] rounded-xl p-5 border hover:border-yellow-400/50 transition-all duration-300 h-full ${
      application.isPro
        ? "border-purple-500/50 bg-gradient-to-br from-purple-500/5 to-pink-500/5"
        : "border-black"
    }`}
  >
    
    {/* Pro Badge - Top Right */}
    {application.isPro && (
      <div className="absolute top-3 left-3 z-10">
        <div className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              clipRule="evenodd"
            />
          </svg>
          PRO
        </div>
      </div>
    )}

    {/* Header با آواتار و نام */}
    <div className="flex items-center mb-4 relative z-10">
      <div className="relative">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ml-3 flex-shrink-0 ${
            application.isPro
              ? "bg-gradient-to-br from-purple-500/20 to-pink-500/30 border-purple-500/50"
              : "bg-gradient-to-br from-blue-400/20 to-blue-600/30 border-blue-400/50"
          }`}
        >
          <span
            className={`font-bold text-sm ${
              application.isPro ? "text-purple-300" : "text-blue-400"
            }`}
          >
            {application.name.charAt(0)}
          </span>
        </div>
        {/* Online indicator */}
        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-black" />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3
          className={`text-sm font-bold truncate mb-1 ${
            application.isPro ? "text-purple-100" : "text-white"
          }`}
        >
          {application.name}
        </h3>
        <p className="text-gray-400 text-xs truncate flex items-center">
          <svg className="w-3 h-3 ml-1 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
          {application.position}
        </p>
      </div>
    </div>

    {/* Status Badge و Score */}
    <div className="flex justify-between items-center mb-4">
      <div
        className={`px-3 py-1.5 rounded-full text-xs font-medium ${
          application.status === "new"
            ? "bg-green-400/10 text-green-400 border border-green-400/20"
            : application.status === "reviewed"
            ? "bg-blue-400/10 text-blue-400 border border-blue-400/20"
            : application.status === "shortlisted"
            ? "bg-yellow-400/10 text-yellow-400 border border-yellow-400/20"
            : application.status === "rejected"
            ? "bg-red-400/10 text-red-400 border border-red-400/20"
            : "bg-gray-400/10 text-gray-400 border border-gray-400/20"
        }`}
      >
        {application.status === "new"
          ? "جدید"
          : application.status === "reviewed"
          ? "بررسی شده"
          : application.status === "shortlisted"
          ? "انتخاب شده"
          : "رد شده"}
      </div>
      
      <div className="flex items-center bg-yellow-400/10 px-2.5 py-1 rounded-full border border-yellow-400/20">
        <svg className="w-3 h-3 text-yellow-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <span className="text-yellow-400 text-xs font-bold">{application.score}</span>
      </div>
    </div>

    {/* اطلاعات کوتاه با آیکون */}
    <div className="mb-5 space-y-2 bg-black/50 rounded-lg p-3">
      <div className="flex items-center text-xs">
        <svg className="w-3 h-3 text-blue-400 ml-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
        <span className="text-gray-300 truncate">{application.jobTitle}</span>
      </div>
      
      <div className="flex items-center text-xs">
        <svg className="w-3 h-3 text-green-400 ml-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
        <span className="text-gray-400">{application.experience} سال تجربه</span>
      </div>
      
      <div className="flex items-center text-xs">
        <svg className="w-3 h-3 text-gray-400 ml-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
        <span className="text-gray-500">{application.appliedDate}</span>
      </div>
    </div>

    {/* دکمه‌های عملیات */}
    <div className="space-y-3">
      <button
        onClick={() => onViewResume(application.id)}
        className="w-full bg-blue-400/10 text-blue-400 px-4 py-2.5 rounded-lg hover:bg-blue-400/20 transition duration-200 text-xs font-medium flex items-center justify-center group"
      >
        <svg className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
        </svg>
        مشاهده رزومه
      </button>
      
      <div className="flex gap-2">
        <button
          onClick={() => {
            if (application.status !== "shortlisted") {
              if (
                window.confirm(
                  `آیا مطمئن هستید که ${application.name} را برای مصاحبه انتخاب کنید؟`
                )
              ) {
                onStatusChange(application.id, "shortlisted");
              }
            }
          }}
          className="flex-1 bg-green-400/10 text-green-400 px-3 py-2 rounded-lg hover:bg-green-400/20 transition duration-200 text-xs font-medium flex items-center justify-center group"
        >
          <svg className="w-3 h-3 ml-1 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          مصاحبه
        </button>
        
        <button
          onClick={() => {
            if (application.status !== "rejected") {
              if (
                window.confirm(
                  `آیا مطمئن هستید که درخواست ${application.name} را رد کنید؟`
                )
              ) {
                onStatusChange(application.id, "rejected");
              }
            }
          }}
          className="flex-1 bg-red-400/10 text-red-400 px-3 py-2 rounded-lg hover:bg-red-400/20 transition duration-200 text-xs font-medium flex items-center justify-center group"
        >
          <svg className="w-3 h-3 ml-1 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          رد
        </button>
      </div>
    </div>
  </div>
);

// کامپوننت فیلترها - responsive
const Filters = ({
  activeFilter,
  setActiveFilter,
  searchTerm,
  setSearchTerm,
  applications,
}) => (
  <div className="bg-[#1e1e1e] rounded-xl p-4 sm:p-6 border border-black mb-6 lg:mr-6">
    <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
      {/* جستجو */}
      <div className="flex items-center bg-black rounded-lg px-3 sm:px-4 py-2 order-1 lg:order-2">
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 ml-2 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="جستجو در رزومه‌ها..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent text-white placeholder-gray-400 focus:outline-none w-full text-right text-sm sm:text-base"
        />
      </div>

      {/* فیلترها */}
      <div className="flex flex-wrap gap-2 order-2 lg:order-1">
        <button
          onClick={() => setActiveFilter("all")}
          className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition duration-200 ${
            activeFilter === "all"
              ? "bg-yellow-400 text-gray-900"
              : "bg-black text-gray-300 hover:bg-gray-700"
          }`}
        >
          همه ({applications.length})
        </button>
        <button
          onClick={() => setActiveFilter("new")}
          className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition duration-200 ${
            activeFilter === "new"
              ? "bg-yellow-400 text-gray-900"
              : "bg-black text-gray-300 hover:bg-gray-700"
          }`}
        >
          جدید ({applications.filter((app) => app.status === "new").length})
        </button>
        <button
          onClick={() => setActiveFilter("reviewed")}
          className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition duration-200 ${
            activeFilter === "reviewed"
              ? "bg-yellow-400 text-gray-900"
              : "bg-black text-gray-300 hover:bg-gray-700"
          }`}
        >
          بررسی شده ({applications.filter((app) => app.status === "reviewed").length})
        </button>
        <button
          onClick={() => setActiveFilter("shortlisted")}
          className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition duration-200 ${
            activeFilter === "shortlisted"
              ? "bg-yellow-400 text-gray-900"
              : "bg-black text-gray-300 hover:bg-gray-700"
          }`}
        >
          انتخاب شده ({applications.filter((app) => app.status === "shortlisted").length})
        </button>
        <button
          onClick={() => setActiveFilter("pro")}
          className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition duration-200 relative ${
            activeFilter === "pro"
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
              : "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 hover:from-purple-500/30 hover:to-pink-500/30 border border-purple-500/30"
          }`}
        >
          <span className="flex items-center">
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 ml-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                clipRule="evenodd"
              />
            </svg>
            pro ({applications.filter((app) => app.isPro).length})
          </span>
        </button>
      </div>
    </div>
  </div>
);

// کامپوننت آمار سریع - responsive
const QuickStats = () => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 lg:mr-6">
    <div className="bg-[#1e1e1e] rounded-xl p-4 sm:p-6 border border-black text-center">
      <div className="text-2xl sm:text-3xl font-bold text-blue-400 mb-2">۲۰</div>
      <div className="text-gray-300 text-xs sm:text-sm">کل رزومه‌ها</div>
    </div>
    <div className="bg-[#1e1e1e] rounded-xl p-4 sm:p-6 border border-black text-center">
      <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-2">۶</div>
      <div className="text-gray-300 text-xs sm:text-sm">رزومه جدید</div>
    </div>
    <div className="bg-[#1e1e1e] rounded-xl p-4 sm:p-6 border border-black text-center">
      <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-2">۵</div>
      <div className="text-gray-300 text-xs sm:text-sm">انتخاب شده</div>
    </div>
    <div className="bg-[#1e1e1e] rounded-xl p-4 sm:p-6 border border-black text-center">
      <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-2">۷</div>
      <div className="text-gray-300 text-xs sm:text-sm">بررسی شده</div>
    </div>
  </div>
);

function ApplicationsPageContent() {
  // --- بهبود ۱: هوک‌های لازم برای کار با URL اضافه شدند ---
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // State برای مدیریت داده‌های رزومه‌ها
  const [applicationsData, setApplicationsData] = useState(
    initialApplicationsData
  );

  // بارگذاری وضعیت‌ها از localStorage بعد از mount شدن کامپوننت
  React.useEffect(() => {
    const statusUpdates = JSON.parse(
      localStorage.getItem("applicationStatusUpdates") || "{}"
    );
    setApplicationsData((prevData) =>
      prevData.map((app) => ({
        ...app,
        status: statusUpdates[app.id] || app.status,
      }))
    );
  }, []);

  // --- بهبود ۲: وضعیت فیلترها از URL خوانده می‌شود، نه از useState ---
  const activeFilter = searchParams.get("status") || "all";
  const searchTerm = searchParams.get("q") || "";
  const currentPage = parseInt(searchParams.get("page") || "1");

  // تنظیمات pagination - 9 کارت در هر صفحه (3x3)
  const itemsPerPage = 9;

  // تابع کمکی برای به‌روزرسانی URL بدون رفرش صفحه
  const updateURLParams = (paramsToUpdate) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    Object.entries(paramsToUpdate).forEach(([key, value]) => {
      if (value && value !== "all") {
        // اگر مقدار جدید وجود داشت و 'all' نبود
        currentParams.set(key, value);
      } else {
        // اگر مقدار جدید 'all' یا خالی بود، پارامتر را حذف کن
        currentParams.delete(key);
      }
    });
    // آدرس جدید را با پارامترهای به‌روز شده اعمال کن
    router.push(`${pathname}?${currentParams.toString()}`, { scroll: false });
  };

  // --- بهبود ۳: توابع کنترل‌کننده جدید که URL را آپدیت می‌کنند ---
  const handleSetFilter = (filter) => {
    updateURLParams({ status: filter });
  };
  const handleSetSearch = (term) => {
    updateURLParams({ q: term });
  };

  // تابع تغییر وضعیت رزومه
  const handleStatusChange = (applicationId, newStatus) => {
    setApplicationsData((prevData) =>
      prevData.map((app) =>
        app.id === applicationId ? { ...app, status: newStatus } : app
      )
    );
  };

  // تابع مشاهده رزومه
  const handleViewResume = (applicationId) => {
    router.push(`/employer/dashboard/applications/${applicationId}`);
  };

  // فیلتر کردن رزومه‌ها بر اساس مقادیر خوانده شده از URL
  const filteredApplications = applicationsData.filter((app) => {
    const matchesFilter =
      activeFilter === "all" ||
      app.status === activeFilter ||
      (activeFilter === "pro" && app.isPro);
    const matchesSearch =
      searchTerm === "" ||
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // محاسبات pagination
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageApplications = filteredApplications.slice(
    startIndex,
    endIndex
  );

  // توابع pagination
  const handlePageChange = (page) => {
    updateURLParams({ page: page.toString() });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 p-4 lg:p-0 lg:pl-6">
      {/* Header - responsive */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 lg:mr-6">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white text-right">
            رزومه‌های دریافتی
          </h1>
          <p className="text-gray-400 mt-2 text-right text-sm sm:text-base">
            مدیریت و بررسی رزومه‌های ارسال شده برای آگهی‌های شما
          </p>
        </div>
        <div className="text-yellow-400 flex-shrink-0">
          <svg
            className="w-10 h-10 sm:w-12 sm:h-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
      </div>

      {/* Quick Stats (بدون تغییر) */}
      <QuickStats />

      {/* --- بهبود ۴: پاس دادن مقادیر و توابع جدید به کامپوننت Filters --- */}
      <Filters
        activeFilter={activeFilter}
        setActiveFilter={handleSetFilter}
        searchTerm={searchTerm}
        setSearchTerm={handleSetSearch}
        applications={applicationsData} // استفاده از داده‌های ثابت
      />

      {/* Applications Grid - 3 کارت در هر ردیف */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {currentPageApplications.length > 0 ? (
          currentPageApplications.map((application) => (
            <ResumeCard
              key={application.id}
              application={application}
              onStatusChange={handleStatusChange}
              onViewResume={handleViewResume}
            />
          ))
        ) : (
          <div className="col-span-full bg-[#1e1e1e] rounded-xl p-12 text-center border border-black">
            <svg
              className="w-16 h-16 text-gray-600 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              هیچ رزومه‌ای یافت نشد
            </h3>
            <p className="text-gray-500">
              با تغییر فیلترها یا جستجو، رزومه‌های بیشتری پیدا کنید
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center mt-8 lg:mr-6">
          <div className="flex space-x-2 space-x-reverse">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg transition duration-200 ${
                currentPage === 1
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-black text-gray-300 hover:bg-gray-700"
              }`}
            >
              قبلی
            </button>

            {/* Page Numbers */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNumber;
              if (totalPages <= 5) {
                pageNumber = i + 1;
              } else if (currentPage <= 3) {
                pageNumber = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + i;
              } else {
                pageNumber = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
                    currentPage === pageNumber
                      ? "bg-yellow-400 text-gray-900"
                      : "bg-black text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg transition duration-200 ${
                currentPage === totalPages
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-black text-gray-300 hover:bg-gray-700"
              }`}
            >
              بعدی
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ApplicationsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ApplicationsPageContent />
    </Suspense>
  );
}
