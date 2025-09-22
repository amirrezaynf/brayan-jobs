import React from 'react';

const DashboardStats = () => {
  return (
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
  );
};

export default DashboardStats;
