export default function VacanciesFilters({
  filter,
  setFilter,
  vacancies,
  onCreateNew,
}) {
  const filterOptions = [
    { key: "all", label: "همه", count: vacancies.length },
    {
      key: "active",
      label: "فعال",
      count: vacancies.filter((j) => j.status === "active").length,
    },
    {
      key: "draft",
      label: "پیش‌نویس",
      count: vacancies.filter((j) => j.status === "draft").length,
    },
    {
      key: "expired",
      label: "منقضی",
      count: vacancies.filter((j) => j.status === "expired").length,
    },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 lg:mr-6">
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {filterOptions.map((item) => (
          <button
            key={item.key}
            onClick={() => setFilter(item.key)}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition duration-200 ${
              filter === item.key
                ? "bg-yellow-400 text-gray-900"
                : "bg-black text-gray-300 hover:bg-gray-700"
            }`}
          >
            {item.label} ({item.count})
          </button>
        ))}
      </div>
      <button
        onClick={onCreateNew}
        className="bg-yellow-400 text-gray-900 px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-yellow-300 transition duration-300 font-bold text-sm sm:text-base flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 sm:h-5 sm:w-5 ml-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        ایجاد آگهی جدید
      </button>
    </div>
  );
}
