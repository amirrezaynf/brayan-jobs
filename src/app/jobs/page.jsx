"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Sample jobs data (normally would come from API)
const sampleJobs = [
  {
    id: 1,
    title: "توسعه‌دهنده React Frontend",
    company: "شرکت فناوری اطلاعات پارامکس",
    location: "تهران",
    description: "جستجوی توسعه‌دهنده React باتجربه برای پروژه‌های بزرگ",
    category: "فناوری اطلاعات",
    specialization: "برنامه‌نویسی وب",
    type: "تمام وقت",
    salary: "۱۵,۰۰۰,۰۰۰ تومان",
    applicants: 45,
    date: "۱۴۰۳/۰۶/۲۰",
    urgent: true,
  },
  {
    id: 2,
    title: "طراح UI/UX پیاده‌روی مسیر",
    company: "استارتاپ تهیکس",
    location: "اصفهان",
    description: "طراحی رابط کاربری جذاب برای اپلیکیشن‌های موبایل",
    category: "طراحی و گرافیک",
    specialization: "طراحی UI/UX",
    type: "پاره وقت",
    salary: "۸,۰۰۰,۰۰۰ تومان",
    applicants: 32,
    date: "۱۴۰۳/۰۶/۱۹",
    urgent: false,
  },
  {
    id: 3,
    title: "مدیر محصول دیجیتال",
    company: "شرکت بازرگانی پارسه",
    location: "مشهد",
    description: "مدیریت محصول برای پلتفرم‌های دیجیتال B2B",
    category: "مدیریت پروژه",
    specialization: "مدیریت محصول",
    type: "تمام وقت",
    salary: "۱۸,۰۰۰,۰۰۰ تومان",
    applicants: 28,
    date: "۱۴۰۳/۰۶/۱۸",
    urgent: true,
  },
];

export default function JobsPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);

  // Set some default jobs
  useEffect(() => {
    setJobs(sampleJobs);
  }, []);

  const handleViewJob = (jobId) => {
    router.push(`/jobsingle?id=${jobId}`);
  };

  return (
    <div className="min-h-screen dark-bg py-8" dir="rtl">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            جستجوی فرصت‌های شغلی
          </h1>
          <p className="text-gray-400">{jobs.length} فرصت شغلی پیدا شد</p>
        </div>

        {/* Jobs Results */}
        <div className="space-y-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className={`bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 ${
                job.urgent ? "ring-2 ring-yellow-500/20" : ""
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                <div className="flex-1 mb-4 lg:mb-0">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-blue-500"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-white">
                          {job.title}
                        </h3>
                        {job.urgent && (
                          <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded-full">
                            فوری
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 mb-2">
                        {job.company} • {job.location}
                      </p>
                      <p className="text-gray-300 text-sm mb-3">
                        {job.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>دسته: {job.category}</span>
                        <span>{job.applicants} متقاضی</span>
                        <span>{job.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-4">
                  <div className="text-left">
                    <p className="text-yellow-400 font-bold text-lg">
                      {job.salary}
                    </p>
                    <p className="text-gray-400 text-sm">{job.type}</p>
                  </div>
                  <button
                    onClick={() => handleViewJob(job.id)}
                    className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                  >
                    مشاهده فرصت شغلی
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
