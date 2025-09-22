export default function VacanciesTable({ vacancies, onEdit, onDelete }) {
  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { bg: "bg-green-500/20", text: "text-green-400", label: "فعال" },
      expired: { bg: "bg-red-500/20", text: "text-red-400", label: "منقضی" },
      draft: { bg: "bg-gray-500/20", text: "text-gray-400", label: "پیش‌نویس" },
    };

    const config = statusConfig[status] || statusConfig.draft;

    return (
      <span
        className={`px-2 py-1 text-xs rounded-full ${config.bg} ${config.text}`}
      >
        {config.label}
      </span>
    );
  };

  return (
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full text-right">
        <thead>
          <tr className="border-b border-gray-700 text-gray-400 text-sm">
            <th className="p-3">عنوان آگهی</th>
            <th className="p-3">تاریخ انتشار</th>
            <th className="p-3">تعداد کارجویان</th>
            <th className="p-3">وضعیت</th>
            <th className="p-3">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {vacancies.map((job) => (
            <tr
              key={job.id}
              className="border-b border-black hover:bg-black/50"
            >
              <td className="p-3 font-semibold text-white">{job.title}</td>
              <td className="p-3">{job.date}</td>
              <td className="p-3">{job.applicants} نفر</td>
              <td className="p-3">{getStatusBadge(job.status)}</td>
              <td className="p-3 space-x-4">
                <button
                  onClick={() => onEdit(job)}
                  className="text-gray-400 hover:text-yellow-400 transition-colors text-sm"
                >
                  ویرایش
                </button>
                <button
                  onClick={() => onDelete(job.id)}
                  className="text-gray-400 hover:text-red-400 transition-colors text-sm"
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
