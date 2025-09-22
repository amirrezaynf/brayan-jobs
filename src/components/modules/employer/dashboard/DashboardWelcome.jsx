import React from 'react';

const DashboardWelcome = ({ companyName }) => {
  return (
    <div className="bg-gradient-to-r from-yellow-500/10 to-gray-900 rounded-xl p-4 sm:p-6 border border-yellow-400/20">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight">
            به داشبورد {companyName} خوش آمدید
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
  );
};

export default DashboardWelcome;
