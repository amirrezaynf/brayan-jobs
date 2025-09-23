"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { loadCompanyData } from "@/constants/companyData";
import VacancyContainer from "@/components/modules/employer/vacancy/VacancyContainer";
import { getUserActiveVacancies, getUserExpiredVacancies, deleteVacancy } from "@/app/actions/vacancy";

function VacanciesContent() {
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState("active");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [vacancies, setVacancies] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load jobs from API on component mount and when filter changes
  useEffect(() => {
    loadJobs();
  }, [filter]);

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

  const loadJobs = async () => {
    setIsLoading(true);
    try {
      let result;
      
      // Use different endpoints based on filter
      if (filter === "expired") {
        result = await getUserExpiredVacancies();
      } else {
        // For "active", "draft", and "all" filters, use active endpoint
        result = await getUserActiveVacancies();
      }
      
      if (result.success) {
        // Map API data to component format with enhanced information
        const mappedVacancies = result.data.map(vacancy => {
          // Calculate days until expiry
          let daysUntilExpiry = 0;
          if (vacancy.expires_at) {
            const expiryDate = new Date(vacancy.expires_at);
            const today = new Date();
            daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
          }

          // Format salary
          let formattedSalary = "توافقی";
          if (vacancy.salary && vacancy.salary > 0) {
            formattedSalary = vacancy.salary.toLocaleString("fa-IR") + " تومان";
          }

          return {
            id: vacancy.id,
            title: vacancy.title,
            company: vacancy.company?.display_name || vacancy.company?.name || "شرکت نامشخص",
            date: vacancy.published_at ? new Date(vacancy.published_at).toLocaleDateString("fa-IR") : 
                  vacancy.created_at ? new Date(vacancy.created_at).toLocaleDateString("fa-IR") : 
                  new Date().toLocaleDateString("fa-IR"),
            applicants: vacancy.applicants_count || 0,
            status: vacancy.status || "active",
            
            // Enhanced information from API
            contract_type: vacancy.contract_type,
            salary: formattedSalary,
            location: vacancy.location_text,
            is_urgent: vacancy.is_urgent,
            is_remote_possible: vacancy.is_remote_possible,
            days_until_expiry: daysUntilExpiry,
            expires_at: vacancy.expires_at,
            
            // Keep original API data for editing
            ...vacancy
          };
        });
        
        setVacancies(mappedVacancies);
      } else {
        // If API fails, show empty list
        console.error("❌ Failed to load vacancies from API:", result.error);
        setVacancies([]);
        
        // Show error message if API failed
        if (result.error) {
          showErrorMessage(result.error);
        }
      }
    } catch (error) {
      console.error("Error loading vacancies:", error);
      showErrorMessage("خطا در بارگذاری آگهی‌ها");
      setVacancies([]);
    } finally {
      setIsLoading(false);
    }
  };


  const showSuccessMessage = (message) => {
    const successMessage = document.createElement("div");
    successMessage.className =
      "fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50";
    successMessage.textContent = message;
    document.body.appendChild(successMessage);

    setTimeout(() => {
      if (document.body.contains(successMessage)) {
        document.body.removeChild(successMessage);
      }
    }, 3000);
  };

  const showErrorMessage = (message) => {
    const errorMessage = document.createElement("div");
    errorMessage.className =
      "fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50";
    errorMessage.textContent = message;
    document.body.appendChild(errorMessage);

    setTimeout(() => {
      if (document.body.contains(errorMessage)) {
        document.body.removeChild(errorMessage);
      }
    }, 4000);
  };

  const handleJobSubmit = (jobData) => {
    // Close form
    setShowCreateForm(false);
    setEditingJob(null);
    
    // Reload jobs from API to get the latest data
    loadJobs();
  };

  const handleEditJob = (job) => {
    // If the same job is already being edited, close the form first
    if (editingJob && editingJob.id === job.id && showCreateForm) {
      setShowCreateForm(false);
      setEditingJob(null);
      return;
    }
    
    // If a different job is being edited, close form first then open with new job
    if (showCreateForm) {
      setShowCreateForm(false);
      setTimeout(() => {
        setEditingJob(job);
        setShowCreateForm(true);
        // Scroll to top of page to show the form
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }, 100);
      }, 50);
    } else {
      // No form is open, just open with the selected job
      setEditingJob(job);
      setShowCreateForm(true);
      // Scroll to top of page to show the form
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm("آیا از حذف این آگهی اطمینان دارید؟")) {
      try {
        const result = await deleteVacancy(jobId);
        
        if (result.success) {
          showSuccessMessage(result.message || "آگهی با موفقیت حذف شد!");
          // Reload jobs from API to get the latest data
          loadJobs();
        } else {
          showErrorMessage(result.error || "خطا در حذف آگهی");
        }
      } catch (error) {
        console.error("Error deleting vacancy:", error);
        showErrorMessage("خطا در ارتباط با سرور");
      }
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
        <div className="flex gap-2">
          <button
            onClick={() => loadJobs()}
            disabled={isLoading}
            className="bg-blue-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-blue-500 transition duration-300 font-medium text-sm sm:text-base flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 sm:h-5 sm:w-5 ml-2 ${isLoading ? 'animate-spin' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            تازه‌سازی
          </button>
          <button
            onClick={() => {
              setShowCreateForm(true);
              setEditingJob(null);
              // Scroll to top to show the form
              setTimeout(() => {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
              }, 100);
            }}
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
      </div>

      {/* Create Job Posting Form */}
      {showCreateForm && (
        <VacancyContainer
          onClose={() => {
            setShowCreateForm(false);
            setEditingJob(null);
          }}
          editingJob={editingJob}
          onSubmit={handleJobSubmit}
        />
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
          <span className="mr-3 text-gray-400">در حال بارگذاری آگهی‌ها...</span>
        </div>
      )}

      {/* Desktop Table */}
      {!isLoading && (
        <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-right">
          <thead>
            <tr className="border-b border-gray-700 text-gray-400 text-sm">
              <th className="p-3">عنوان آگهی</th>
              <th className="p-3">نوع قرارداد</th>
              <th className="p-3">حقوق</th>
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
                <td className="p-3">
                  <div className="flex flex-col">
                    <span className="font-semibold text-white">{job.title}</span>
                    <div className="flex items-center gap-2 mt-1">
                      {job.is_urgent && (
                        <span className="px-2 py-0.5 text-xs bg-red-500/20 text-red-400 rounded-full">
                          فوری
                        </span>
                      )}
                      {job.is_remote_possible && (
                        <span className="px-2 py-0.5 text-xs bg-blue-500/20 text-blue-400 rounded-full">
                          دورکاری
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="p-3 text-gray-300">
                  {job.contract_type === "full-time" ? "تمام وقت" :
                   job.contract_type === "part-time" ? "پاره وقت" :
                   job.contract_type === "contract" ? "قراردادی" :
                   job.contract_type === "internship" ? "کارآموزی" :
                   job.contract_type === "freelance" ? "فریلنسر" :
                   job.contract_type || "نامشخص"}
                </td>
                <td className="p-3 text-gray-300">{job.salary}</td>
                <td className="p-3 text-gray-300">
                  <div className="flex flex-col">
                    <span>{job.date}</span>
                    {job.days_until_expiry > 0 && job.days_until_expiry <= 7 && (
                      <span className="text-xs text-yellow-400 mt-1">
                        {job.days_until_expiry} روز تا انقضا
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-3 text-gray-300">{job.applicants} نفر</td>
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
      )}

      {/* Mobile Cards */}
      {!isLoading && (
      <div className="md:hidden space-y-4">
        {filteredVacancies.map((job) => (
          <div
            key={job.id}
            className="bg-black rounded-lg p-4 border border-gray-700"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-white text-right mb-2">
                  {job.title}
                </h3>
                <div className="flex items-center gap-2 flex-wrap">
                  {job.is_urgent && (
                    <span className="px-2 py-0.5 text-xs bg-red-500/20 text-red-400 rounded-full">
                      فوری
                    </span>
                  )}
                  {job.is_remote_possible && (
                    <span className="px-2 py-0.5 text-xs bg-blue-500/20 text-blue-400 rounded-full">
                      دورکاری
                    </span>
                  )}
                </div>
              </div>
              <span
                className={`px-2 py-1 text-xs rounded-full ml-2 flex-shrink-0 ${
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
              <p>نوع قرارداد: {
                job.contract_type === "full-time" ? "تمام وقت" :
                job.contract_type === "part-time" ? "پاره وقت" :
                job.contract_type === "contract" ? "قراردادی" :
                job.contract_type === "internship" ? "کارآموزی" :
                job.contract_type === "freelance" ? "فریلنسر" :
                job.contract_type || "نامشخص"
              }</p>
              <p>حقوق: {job.salary}</p>
              <p>تاریخ انتشار: {job.date}</p>
              {job.days_until_expiry > 0 && job.days_until_expiry <= 7 && (
                <p className="text-yellow-400">
                  ⚠️ {job.days_until_expiry} روز تا انقضا
                </p>
              )}
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
      )}

      {/* Empty State */}
      {!isLoading && filteredVacancies.length === 0 && (
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
            onClick={() => {
              setShowCreateForm(true);
              setEditingJob(null);
              // Scroll to top to show the form
              setTimeout(() => {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
              }, 100);
            }}
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
