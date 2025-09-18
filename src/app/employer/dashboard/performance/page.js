import React from "react";

export default function PerformancePage() {
  const performanceStats = [
    { label: "بازدید کل آگهی‌ها", value: "۱۵,۶۲۰", change: "+۱۲٪" },
    { label: "تعداد کل رزومه‌ها", value: "۸۷۴", change: "+۸٪" },
    { label: "نرخ تبدیل بازدید به رزومه", value: "۵.۶٪", change: "-۱.۲٪" },
    { label: "میانگین زمان استخدام", value: "۲۱ روز", change: "-۳ روز" },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-white">تحلیل عملکرد استخدامی</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceStats.map((stat) => (
          <div
            key={stat.label}
            className="bg-gray-900 rounded-xl p-6 border border-gray-800"
          >
            <p className="text-sm text-gray-400 mb-2">{stat.label}</p>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
            <p
              className={`text-sm mt-1 ${
                stat.change.startsWith("+") ? "text-green-400" : "text-red-400"
              }`}
            >
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* Chart Placeholder */}
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">
          نمودار بازدید آگهی‌ها (۳۰ روز گذشته)
        </h2>
        <div className="h-64 flex items-center justify-center bg-gray-800/50 rounded-lg">
          <p className="text-gray-500">[محل قرارگیری نمودار]</p>
        </div>
      </div>

      {/* Top Performing Vacancies */}
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">
          آگهی‌ها با بیشترین بازخورد
        </h2>
        {/* Placeholder for a list of top vacancies */}
        <p className="text-gray-500">
          لیست آگهی‌ها با بهترین عملکرد در اینجا نمایش داده خواهد شد.
        </p>
      </div>
    </div>
  );
}
