export default function VacanciesMobileCards({ vacancies, onEdit, onDelete }) {
  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { bg: "bg-green-500/20", text: "text-green-400", label: "فعال" },
      expired: { bg: "bg-red-500/20", text: "text-red-400", label: "منقضی" },
      draft: { bg: "bg-gray-500/20", text: "text-gray-400", label: "پیش‌نویس" },
    };

    const config = statusConfig[status] || statusConfig.draft;

    return (
      <span
        className={`px-2 py-1 text-xs rounded-full ml-2 ${config.bg} ${config.text}`}
      >
        {config.label}
      </span>
    );
  };

  return (
    <div className="md:hidden space-y-4">
      {vacancies.map((job) => (
        <div
          key={job.id}
          className="bg-black rounded-lg p-4 border border-gray-700"
        >
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-semibold text-white text-right flex-1">
              {job.title}
            </h3>
            {getStatusBadge(job.status)}
          </div>
          <div className="text-gray-400 text-sm space-y-1 text-right">
            <p>تاریخ انتشار: {job.date}</p>
            <p>تعداد کارجویان: {job.applicants} نفر</p>
          </div>
          <div className="flex justify-end space-x-4 space-x-reverse mt-4">
            <button
              onClick={() => onEdit(job)}
              className="text-yellow-400 hover:text-yellow-300 transition-colors text-sm"
            >
              ویرایش
            </button>
            <button
              onClick={() => onDelete(job.id)}
              className="text-red-400 hover:text-red-300 transition-colors text-sm"
            >
              حذف
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
