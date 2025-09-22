import React from 'react';

const RecentJobs = () => {
  const jobs = [
    {
      id: 1,
      title: 'توسعه‌دهنده React Senior',
      status: 'فعال',
      applicants: '۱۲ داوطلب',
      color: 'green'
    },
    {
      id: 2,
      title: 'طراح UI/UX',
      status: 'فعال',
      applicants: '۸ داوطلب',
      color: 'blue'
    },
    {
      id: 3,
      title: 'مدیر محصول',
      status: 'در انتظار',
      applicants: '۵ داوطلب',
      color: 'yellow'
    },
    {
      id: 4,
      title: 'توسعه‌دهنده Backend',
      status: 'فعال',
      applicants: '۱۵ داوطلب',
      color: 'purple'
    },
    {
      id: 5,
      title: 'مهندس DevOps',
      status: 'منقضی',
      applicants: '۳ داوطلب',
      color: 'gray'
    }
  ];

  return (
    <div className="bg-[#1e1e1e] rounded-xl p-4 sm:p-6 shadow-lg border border-black">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
        <h3 className="text-lg sm:text-xl font-semibold text-white">
          آگهی‌های اخیر
        </h3>
        <div className="text-yellow-400 bg-yellow-400/10 rounded-full p-2 flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 sm:h-6 sm:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>
        </div>
      </div>
      <div className="space-y-2 sm:space-y-3">
        {jobs.map((job) => (
          <div key={job.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 sm:p-3 bg-black rounded-lg gap-2">
            <div className="flex items-center">
              <div className={`w-2 h-2 bg-${job.color}-400 rounded-full ml-3 flex-shrink-0`}></div>
              <span className="text-sm sm:text-base text-gray-300">
                {job.title}
              </span>
            </div>
            <div className="flex items-center gap-2 mr-5 sm:mr-0">
              <span className={`text-xs bg-${job.color}-400/10 text-${job.color}-400 px-2 py-1 rounded-full`}>
                {job.status}
              </span>
              <span className="text-xs text-gray-500">{job.applicants}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentJobs;
