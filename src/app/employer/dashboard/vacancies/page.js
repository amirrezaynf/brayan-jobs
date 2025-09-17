"use client";

import React, { useState } from "react";

export default function VacanciesPage() {
  const [filter, setFilter] = useState("active");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    type: "full-time",
    category: "",
  });

  // Mock data for vacancies
  const vacancies = [
    {
      title: "توسعه‌دهنده Front-End (React)",
      status: "active",
      applicants: 25,
      date: "۱۴۰۳/۰۶/۲۰",
    },
    {
      title: "کارشناس بازاریابی دیجیتال",
      status: "active",
      applicants: 42,
      date: "۱۴۰۳/۰۶/۱۸",
    },
    {
      title: "طراح UI/UX",
      status: "expired",
      applicants: 89,
      date: "۱۴۰۳/۰۵/۱۰",
    },
    { title: "مدیر محصول", status: "draft", applicants: 0, date: "۱۴۰۳/۰۶/۲۲" },
  ];

  const filteredVacancies = vacancies.filter((v) => {
    if (filter === "all") return true;
    return v.status === filter;
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !newJob.title.trim() ||
      !newJob.description.trim() ||
      !newJob.requirements.trim() ||
      !newJob.location.trim() ||
      !newJob.category
    ) {
      alert("لطفاً تمام فیلدهای ضروری را پر کنید.");
      return;
    }

    // Here you would typically send the data to your backend
    console.log("New job posting:", newJob);

    // Reset form and hide it
    setNewJob({
      title: "",
      description: "",
      requirements: "",
      salary: "",
      location: "",
      type: "full-time",
      category: "",
    });
    setShowCreateForm(false);

    // Show success message
    alert("آگهی با موفقیت منتشر شد!");
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">مدیریت آگهی‌ها</h1>
        <div className="flex items-center space-x-4">
          <div className="flex border border-gray-700 rounded-lg p-1">
            <button
              onClick={() => setFilter("expired")}
              className={`px-4 py-1.5 rounded-md text-sm ${
                filter === "expired"
                  ? "bg-yellow-400 text-gray-900"
                  : "text-gray-400"
              }`}
            >
              منقضی شده
            </button>
            <button
              onClick={() => setFilter("draft")}
              className={`px-4 py-1.5 rounded-md text-sm ${
                filter === "draft"
                  ? "bg-yellow-400 text-gray-900"
                  : "text-gray-400"
              }`}
            >
              پیش‌نویس
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`px-4 py-1.5 rounded-md text-sm ${
                filter === "active"
                  ? "bg-yellow-400 text-gray-900"
                  : "text-gray-400"
              }`}
            >
              فعال
            </button>
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-1.5 rounded-md text-sm ${
                filter === "all"
                  ? "bg-yellow-400 text-gray-900"
                  : "text-gray-400"
              }`}
            >
              همه
            </button>
          </div>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-yellow-400 text-gray-900 px-6 py-2 rounded-lg hover:bg-yellow-300 transition duration-300 font-bold flex items-center shadow-lg shadow-yellow-500/20"
          >
            <span className="ml-2">
              {showCreateForm ? "لغو ایجاد" : "ایجاد آگهی جدید"}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d={
                  showCreateForm
                    ? "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    : "M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                }
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Create Job Posting Form */}
      {showCreateForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 rounded-lg p-6 mb-6 border border-gray-700"
        >
          <h2 className="text-xl font-bold text-white mb-6 text-right">
            ایجاد آگهی استخدام جدید
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* عنوان آگهی */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2 text-right">
                عنوان آگهی *
              </label>
              <input
                type="text"
                value={newJob.title}
                onChange={(e) =>
                  setNewJob({ ...newJob, title: e.target.value })
                }
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-right"
                placeholder="مثال: توسعه‌دهنده Front-End (React)"
                required
              />
            </div>

            {/* دسته‌بندی شغلی */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 text-right">
                دسته‌بندی شغلی *
              </label>
              <select
                value={newJob.category}
                onChange={(e) =>
                  setNewJob({ ...newJob, category: e.target.value })
                }
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-right"
                required
              >
                <option value="">انتخاب دسته‌بندی</option>
                <option value="programming">برنامه‌نویسی</option>
                <option value="design">طراحی</option>
                <option value="marketing">بازاریابی</option>
                <option value="management">مدیریت</option>
                <option value="sales">فروش</option>
                <option value="other">سایر</option>
              </select>
            </div>

            {/* نوع همکاری */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 text-right">
                نوع همکاری *
              </label>
              <select
                value={newJob.type}
                onChange={(e) => setNewJob({ ...newJob, type: e.target.value })}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-right"
              >
                <option value="full-time">تمام وقت</option>
                <option value="part-time">پاره وقت</option>
                <option value="contract">قراردادی</option>
                <option value="freelance">فریلنسری</option>
                <option value="remote">دورکاری</option>
              </select>
            </div>

            {/* حقوق */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 text-right">
                حقوق (تومان)
              </label>
              <input
                type="text"
                value={newJob.salary}
                onChange={(e) =>
                  setNewJob({ ...newJob, salary: e.target.value })
                }
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-right"
                placeholder="مثال: ۱۵,۰۰۰,۰۰۰"
              />
            </div>

            {/* محل کار */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 text-right">
                محل کار *
              </label>
              <input
                type="text"
                value={newJob.location}
                onChange={(e) =>
                  setNewJob({ ...newJob, location: e.target.value })
                }
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-right"
                placeholder="مثال: تهران، میدان تجریش"
                required
              />
            </div>

            {/* شرح شغلی */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2 text-right">
                شرح شغلی *
              </label>
              <textarea
                value={newJob.description}
                onChange={(e) =>
                  setNewJob({ ...newJob, description: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-right resize-vertical"
                placeholder="شرح کامل شغلی، وظایف و مسئولیت‌ها را وارد کنید..."
                required
              />
            </div>

            {/* شرایط و الزامات */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2 text-right">
                شرایط و الزامات *
              </label>
              <textarea
                value={newJob.requirements}
                onChange={(e) =>
                  setNewJob({ ...newJob, requirements: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-right resize-vertical"
                placeholder="مهارت‌ها، تجربیات و شرایط مورد نیاز را وارد کنید..."
                required
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-8">
            <button
              onClick={() => setShowCreateForm(false)}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition duration-300"
            >
              لغو
            </button>
            <button className="px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-300 transition duration-300 font-bold flex items-center">
              <span className="ml-2">انتشار آگهی</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto">
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
            {filteredVacancies.map((job, index) => (
              <tr
                key={index}
                className="border-b border-gray-800 hover:bg-gray-800/50"
              >
                <td className="p-3 font-semibold text-white">{job.title}</td>
                <td className="p-3">{job.date}</td>
                <td className="p-3">{job.applicants} نفر</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      job.status === "active"
                        ? "bg-green-500/20 text-green-400"
                        : job.status === "expired"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-gray-500/20 text-gray-400"
                    }`}
                  >
                    {job.status === "active"
                      ? "فعال"
                      : job.status === "expired"
                      ? "منقضی"
                      : "پیش‌نویس"}
                  </span>
                </td>
                <td className="p-3 space-x-2 space-x-reverse">
                  <button className="text-gray-400 hover:text-yellow-400">
                    ویرایش
                  </button>
                  <button className="text-gray-400 hover:text-yellow-400">
                    مشاهده
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredVacancies.length === 0 && (
          <p className="text-center text-gray-500 py-10">
            هیچ آگهی در این دسته‌بندی یافت نشد.
          </p>
        )}
      </div>
    </div>
  );
}
