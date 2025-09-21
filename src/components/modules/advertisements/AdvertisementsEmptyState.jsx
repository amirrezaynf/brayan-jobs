import React from "react";

export default function AdvertisementsEmptyState({ onGoHome }) {
  return (
    <div className="text-center py-16">
      <svg
        className="w-16 h-16 text-gray-600 mx-auto mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      <h3 className="text-xl font-semibold text-gray-300 mb-2">
        هیچ آگهی‌ای یافت نشد
      </h3>
      <p className="text-gray-500 mb-6">
        هیچ آگهی‌ای با معیارهای جستجوی شما مطابقت ندارد. فیلترها را تغییر دهید.
      </p>
      <button
        onClick={onGoHome}
        className="bg-yellow-500 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-medium transition-colors duration-200"
      >
        بازگشت به صفحه اصلی
      </button>
    </div>
  );
}
