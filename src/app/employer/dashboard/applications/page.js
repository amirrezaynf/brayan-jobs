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

// کامپوننت کارت رزومه
const ResumeCard = ({ application, onStatusChange, onViewResume }) => (
  <div
    className={`bg-gray-900 rounded-xl p-6 border hover:border-yellow-400/50 transition-all duration-300 relative ${
      application.isPro
        ? "border-purple-500/50 bg-gradient-to-br from-purple-500/5 to-pink-500/5"
        : "border-gray-800"
    }`}
  >
    <div className="flex items-start justify-between mb-6">
      <div className="flex items-center space-x-4 space-x-reverse">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
            application.isPro
              ? "bg-gradient-to-br from-purple-500/20 to-pink-500/30 border-purple-500/50"
              : "bg-gradient-to-br from-blue-400/20 to-blue-600/30 border-blue-400/50"
          }`}
        >
          <span
            className={`font-bold text-lg ${
              application.isPro ? "text-purple-300" : "text-blue-400"
            }`}
          >
            {application.name.charAt(0)}
          </span>
        </div>
        <div className="text-right">
          <h3
            className={`text-lg font-bold ${
              application.isPro ? "text-purple-200" : "text-white"
            }`}
          >
            {application.isPro && (
              <div className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg ml-2">
                <svg
                  className="w-3 h-3 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    clipRule="evenodd"
                  />
                </svg>
                pro
              </div>
            )}
            {application.name}
          </h3>
          <p className="text-gray-400 text-sm my-2">{application.position}</p>
          <p className="text-gray-500 text-xs">{application.appliedDate}</p>
        </div>
      </div>
      <div className="flex flex-col items-end space-y-2">
        {/* Status Badge */}
        <div
          className={`px-3 py-1.5 rounded-full text-xs
            font-medium ${
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
      </div>
    </div>

    <div className="mb-4">
      <p className="text-gray-300 text-sm mb-2 text-right">
        <span className="font-medium">آگهی:</span> {application.jobTitle}
      </p>
      <p className="text-gray-300 text-sm text-right">
        {application.experience} سال تجربه • {application.education}
      </p>
    </div>

    <div className="flex items-center justify-between">
      <div className="flex space-x-2 space-x-reverse">
        <button
          onClick={() => onViewResume(application.id)}
          className="bg-blue-400/10 text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-400/20 transition duration-200 text-sm"
        >
          مشاهده رزومه
        </button>
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
          className="bg-green-400/10 text-green-400 px-4 py-2 rounded-lg hover:bg-green-400/20 transition duration-200 text-sm"
        >
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
          className="bg-red-400/10 text-red-400 px-4 py-2 rounded-lg hover:bg-red-400/20 transition duration-200 text-sm"
        >
          رد کردن
        </button>
      </div>
      <div className="text-yellow-400 text-sm">
        امتیاز: {application.score}/100
      </div>
    </div>
  </div>
);

// کامپوننت فیلترها (بدون تغییر)
const Filters = ({
  activeFilter,
  setActiveFilter,
  searchTerm,
  setSearchTerm,
  applications,
}) => (
  <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-6">
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
      <div className="flex space-x-2 space-x-reverse">
        <button
          onClick={() => setActiveFilter("all")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 min-w-[100px] ${
            activeFilter === "all"
              ? "bg-yellow-400 text-gray-900"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          همه ({applications.length})
        </button>
        <button
          onClick={() => setActiveFilter("new")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 min-w-[100px] ${
            activeFilter === "new"
              ? "bg-yellow-400 text-gray-900"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          جدید ({applications.filter((app) => app.status === "new").length})
        </button>
        <button
          onClick={() => setActiveFilter("reviewed")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 min-w-[120px] ${
            activeFilter === "reviewed"
              ? "bg-yellow-400 text-gray-900"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          بررسی شده (
          {applications.filter((app) => app.status === "reviewed").length})
        </button>
        <button
          onClick={() => setActiveFilter("shortlisted")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 min-w-[120px] ${
            activeFilter === "shortlisted"
              ? "bg-yellow-400 text-gray-900"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          انتخاب شده (
          {applications.filter((app) => app.status === "shortlisted").length})
        </button>
        <button
          onClick={() => setActiveFilter("pro")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 relative min-w-[100px] ${
            activeFilter === "pro"
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
              : "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 hover:from-purple-500/30 hover:to-pink-500/30 border border-purple-500/30"
          }`}
        >
          <span className="flex items-center">
            <svg
              className="w-4 h-4 ml-1"
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

      <div className="flex items-center bg-gray-800 rounded-lg px-4 py-2 w-full md:w-80">
        <svg
          className="w-5 h-5 text-gray-400 ml-2"
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
          className="bg-transparent text-white placeholder-gray-400 focus:outline-none w-full text-right"
        />
      </div>
    </div>
  </div>
);

// کامپوننت آمار سریع (به‌روزرسانی آمار پس از کاهش تعداد رزومه‌ها)
const QuickStats = () => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 text-center">
      <div className="text-3xl font-bold text-blue-400 mb-2">۲۰</div>
      <div className="text-gray-300 text-sm">کل رزومه‌ها</div>
    </div>
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 text-center">
      <div className="text-3xl font-bold text-green-400 mb-2">۶</div>
      <div className="text-gray-300 text-sm">رزومه جدید</div>
    </div>
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 text-center">
      <div className="text-3xl font-bold text-yellow-400 mb-2">۵</div>
      <div className="text-gray-300 text-sm">انتخاب شده</div>
    </div>
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 text-center">
      <div className="text-3xl font-bold text-purple-400 mb-2">۷</div>
      <div className="text-gray-300 text-sm">بررسی شده</div>
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

  // تنظیمات pagination
  const itemsPerPage = 12;

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
    <div className="space-y-6">
      {/* Header (بدون تغییر) */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white text-right">
            رزومه‌های دریافتی
          </h1>
          <p className="text-gray-400 mt-2 text-right">
            مدیریت و بررسی رزومه‌های ارسال شده برای آگهی‌های شما
          </p>
        </div>
        <div className="text-yellow-400">
          <svg
            className="w-12 h-12"
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

      {/* Applications List */}
      <div className="space-y-4">
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
          <div className="bg-gray-900 rounded-xl p-12 text-center border border-gray-800">
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
        <div className="flex items-center justify-center mt-8">
          <div className="flex space-x-2 space-x-reverse">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg transition duration-200 ${
                currentPage === 1
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
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
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
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
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
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
