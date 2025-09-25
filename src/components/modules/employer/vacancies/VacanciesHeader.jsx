export default function VacanciesHeader() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 lg:mr-6">
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white text-right">
          آگهی‌های من
        </h1>
        <p className="text-gray-400 mt-2 text-right text-sm sm:text-base">
          مدیریت آگهی‌های استخدامی شما
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
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
      </div>
    </div>
  );
}
