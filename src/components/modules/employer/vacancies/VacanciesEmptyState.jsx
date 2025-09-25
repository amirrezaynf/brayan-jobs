export default function VacanciesEmptyState({ filter, onCreateNew }) {
  const getEmptyMessage = () => {
    if (filter === "all") {
      return "هنوز آگهی‌ای ایجاد نکرده‌اید";
    }

    const filterLabels = {
      active: "فعال",
      draft: "پیش‌نویس",
      expired: "منقضی",
    };

    return `هیچ آگهی ${filterLabels[filter] || ""}ی وجود ندارد`;
  };

  return (
    <div className="text-center py-12">
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
        هیچ آگهی‌ای یافت نشد
      </h3>
      <p className="text-gray-500 mb-4">{getEmptyMessage()}</p>
      <button
        onClick={onCreateNew}
        className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg hover:bg-yellow-300 transition duration-300 font-bold"
      >
        ایجاد اولین آگهی
      </button>
    </div>
  );
}
