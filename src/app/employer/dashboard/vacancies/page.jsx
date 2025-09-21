"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { loadCompanyData } from "@/constants/companyData";
import VacancyContainer from "@/components/modules/employer/vacancy/VacancyContainer";

function VacanciesContent() {
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState("active");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [vacancies, setVacancies] = useState([]);
  const [editingJob, setEditingJob] = useState(null);

  // Load jobs from localStorage on component mount
  useEffect(() => {
    loadJobs();
  }, []);

  // Check URL parameter to open create form
  useEffect(() => {
    const createParam = searchParams.get("create");
    if (createParam === "true") {
      setShowCreateForm(true);
      setEditingJob(null);

      // Clean up URL parameter
      if (typeof window !== "undefined") {
        const url = new URL(window.location);
        url.searchParams.delete("create");
        window.history.replaceState({}, "", url);
      }
    }
  }, [searchParams]);

  const loadJobs = () => {
    const savedJobs = localStorage.getItem("employerJobs");
    if (savedJobs) {
      setVacancies(JSON.parse(savedJobs));
    } else {
      // Default sample jobs
      const sampleJobs = [
        {
          id: 1,
          title: "توسعه‌دهنده React Senior",
          company: "شرکت فناوری اطلاعات پارامکس",
          date: "۱۴۰۲/۱۲/۱۵",
          applicants: 12,
          status: "active",
        },
        {
          id: 2,
          title: "طراح UI/UX",
          company: "شرکت فناوری اطلاعات پارامکس",
          date: "۱۴۰۲/۱۲/۱۰",
          applicants: 8,
          status: "active",
        },
        {
          id: 3,
          title: "مدیر محصول",
          company: "شرکت فناوری اطلاعات پارامکس",
          date: "۱۴۰۲/۱۲/۰۵",
          applicants: 5,
          status: "draft",
        },
      ];
      setVacancies(sampleJobs);
      localStorage.setItem("employerJobs", JSON.stringify(sampleJobs));
    }
  };

  const saveJobs = (jobs) => {
    localStorage.setItem("employerJobs", JSON.stringify(jobs));
  };

  const showSuccessMessage = (message) => {
    const successMessage = document.createElement("div");
    successMessage.className =
      "fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50";
    successMessage.textContent = message;
    document.body.appendChild(successMessage);

    setTimeout(() => {
      document.body.removeChild(successMessage);
    }, 3000);
  };

  const handleSubmit = (jobData) => {
    if (editingJob) {
      // Update existing job
      const updatedJobs = vacancies.map((job) =>
        job.id === editingJob.id ? { ...jobData, id: editingJob.id } : job
      );
      setVacancies(updatedJobs);
      saveJobs(updatedJobs);
      showSuccessMessage("آگهی با موفقیت به‌روزرسانی شد!");
    } else {
      // Create new job
      const newJobWithId = {
        ...jobData,
        id: Date.now(),
        date: new Date().toLocaleDateString("fa-IR"),
        applicants: 0,
        status: "active",
      };
      const updatedJobs = [...vacancies, newJobWithId];
      setVacancies(updatedJobs);
      saveJobs(updatedJobs);
      showSuccessMessage("آگهی با موفقیت منتشر شد!");
    }

    // Close form
    setShowCreateForm(false);
    setEditingJob(null);
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
    setShowCreateForm(true);
  };

  const handleDeleteJob = (jobId) => {
    if (window.confirm("آیا از حذف این آگهی اطمینان دارید؟")) {
      const updatedJobs = vacancies.filter((job) => job.id !== jobId);
      setVacancies(updatedJobs);
      saveJobs(updatedJobs);
      showSuccessMessage("آگهی با موفقیت حذف شد!");
    }
  };

  const filteredVacancies = vacancies.filter((job) => {
    if (filter === "all") return true;
    return job.status === filter;
  });

  return (
    <div className="space-y-4 sm:space-y-6 p-4 lg:p-0 lg:pl-6">
      {/* Header */}
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

      {/* Filters and Create Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 lg:mr-6">
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {[
            { key: "all", label: "همه", count: vacancies.length },
            { key: "active", label: "فعال", count: vacancies.filter(j => j.status === "active").length },
            { key: "draft", label: "پیش‌نویس", count: vacancies.filter(j => j.status === "draft").length },
            { key: "expired", label: "منقضی", count: vacancies.filter(j => j.status === "expired").length },
          ].map((item) => (
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
          onClick={() => setShowCreateForm(true)}
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

      {/* Create Job Posting Form */}
      {showCreateForm && (
        <VacancyContainer
          onClose={() => {
            setShowCreateForm(false);
            setEditingJob(null);
          }}
          editingJob={editingJob}
          onSubmit={handleSubmit}
        />
      )}

      {/* Desktop Table */}
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
            {filteredVacancies.map((job) => (
              <tr
                key={job.id}
                className="border-b border-black hover:bg-black/50"
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
                <td className="p-3 space-x-4">
                  <button
                    onClick={() => handleEditJob(job)}
                    className="text-gray-400 hover:text-yellow-400 transition-colors text-sm"
                  >
                    ویرایش
                  </button>
                  <button
                    onClick={() => handleDeleteJob(job.id)}
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

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {filteredVacancies.map((job) => (
          <div
            key={job.id}
            className="bg-black rounded-lg p-4 border border-gray-700"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-white text-right flex-1">
                {job.title}
              </h3>
              <span
                className={`px-2 py-1 text-xs rounded-full ml-2 ${
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
            </div>
            <div className="text-gray-400 text-sm space-y-1 text-right">
              <p>تاریخ انتشار: {job.date}</p>
              <p>تعداد کارجویان: {job.applicants} نفر</p>
            </div>
            <div className="flex justify-end space-x-4 space-x-reverse mt-4">
              <button
                onClick={() => handleEditJob(job)}
                className="text-yellow-400 hover:text-yellow-300 transition-colors text-sm"
              >
                ویرایش
              </button>
              <button
                onClick={() => handleDeleteJob(job.id)}
                className="text-red-400 hover:text-red-300 transition-colors text-sm"
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredVacancies.length === 0 && (
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
          <p className="text-gray-500 mb-4">
            {filter === "all" 
              ? "هنوز آگهی‌ای ایجاد نکرده‌اید"
              : `هیچ آگهی ${filter === "active" ? "فعال" : filter === "draft" ? "پیش‌نویس" : "منقضی"}ی وجود ندارد`
            }
          </p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg hover:bg-yellow-300 transition duration-300 font-bold"
          >
            ایجاد اولین آگهی
          </button>
        </div>
      )}
    </div>
  );
}

export default function VacanciesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VacanciesContent />
    </Suspense>
  );
}
