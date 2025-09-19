"use client";

import React, { useState, useEffect } from "react";
import { loadCompanyData } from "@/constants/companyData";

export default function VacanciesPage() {
  const [filter, setFilter] = useState("active");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [vacancies, setVacancies] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    type: "full-time",
    category: "",
    specialization: "",
    gender: "both",
    education: "",
    experience: "",
    militaryService: "",
    benefits: [],
    responsibilities: "",
    skills: "",
    workHours: "",
    probationPeriod: "",
    insurance: "",
    remoteWork: false,
    travelRequired: false,
    urgent: false,
  });

  // Load jobs from localStorage on component mount
  useEffect(() => {
    loadJobs();
  }, []);

  // Load company profile data when creating new job
  useEffect(() => {
    if (showCreateForm && !editingJob) {
      const companyData = loadCompanyData();
      setNewJob((prev) => ({
        ...prev,
        company: companyData.companyName || prev.company,
        location: companyData.city
          ? `${companyData.city}, ${companyData.province}`
          : prev.location,
        province: companyData.province || prev.province,
        // Pre-populate based on industry type if possible
        ...(companyData.industryType === "technology" && {
          category: "فناوری اطلاعات",
        }),
        // Enhanced company data pre-fill
        description: companyData.description
          ? `امکان همکاری با ${companyData.companyName}. ${companyData.description}`
          : prev.description,
        responsibilities: companyData.mission
          ? `مأموریت شرکت: ${companyData.mission}`
          : prev.responsibilities,
        // Pre-populate contact info in skills section for reference
        skills: `تماس با شرکت: ${companyData.email ? companyData.email : ""}${
          companyData.phone ? ` - ${companyData.phone}` : ""
        }`,
        // Pre-populate work environment details
        workHours: "۹ صبح تا ۶ عصر", // Default work hours
        insurance: "full", // Default insurance
        probationPeriod: "۳ ماه", // Default probation
        workEnvironment: companyData.workEnvironment
          ? companyData.workEnvironment
          : prev.workEnvironment,
        // Include company benefits
        ...(companyData.benefits &&
          companyData.benefits.length > 0 && {
            benefits: [
              ...companyData.benefits,
              // Add company services as additional benefits
              ...(companyData.services && companyData.services.length > 0
                ? companyData.services
                : []),
            ],
          }),
        // Pre-fill website if available
        website: companyData.website || prev.website,
        // Set default remote work based on company preference
        remoteWork:
          companyData.workEnvironment?.toLowerCase().includes("دورکاران") ||
          false,
      }));
    }
  }, [showCreateForm, editingJob]);

  // Function to load jobs from localStorage
  const loadJobs = () => {
    if (typeof window !== "undefined") {
      const savedJobs = localStorage.getItem("postedJobs");
      if (savedJobs) {
        setVacancies(JSON.parse(savedJobs));
      }
    }
  };

  // Function to save jobs to localStorage
  const saveJobs = (jobs) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("postedJobs", JSON.stringify(jobs));
    }
  };

  // Function to show success message
  const showSuccessMessage = (message) => {
    const successMessage = document.createElement("div");
    successMessage.className =
      "fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50";
    successMessage.textContent = message;
    document.body.appendChild(successMessage);

    // Remove the message after 3 seconds
    setTimeout(() => {
      if (document.body.contains(successMessage)) {
        document.body.removeChild(successMessage);
      }
    }, 3000);
  };

  // Function to handle editing a job
  const handleEditJob = (job) => {
    setEditingJob(job);
    setNewJob({
      title: job.title || "",
      company: job.company || "",
      description: job.description || "",
      requirements: job.requirements || "",
      salary: job.salary || "",
      location: job.location || "",
      type: job.type || "full-time",
      category: job.category || "",
      specialization: job.specialization || "",
      gender: job.gender || "both",
      education: job.education || "",
      experience: job.experience || "",
      militaryService: job.militaryService || "",
      benefits: Array.isArray(job.benefits) ? job.benefits : [],
      responsibilities: job.responsibilities || "",
      skills: job.skills || "",
      workHours: job.workHours || "",
      probationPeriod: job.probationPeriod || "",
      insurance: job.insurance || "",
      remoteWork: job.remoteWork || false,
      travelRequired: job.travelRequired || false,
      urgent: job.urgent || false,
      province: job.province || "",
      specialization: job.specialization || "",
    });
    setShowCreateForm(true);
  };

  // Function to handle viewing a job
  const handleViewJob = (job) => {
    // Navigate to single job page with job ID
    if (typeof window !== "undefined") {
      window.location.href = `/ad/${job.id}`;
    }
  };

  // Function to handle deleting a job
  const handleDeleteJob = (job) => {
    // Show confirmation dialog
    const confirmDelete = window.confirm(
      `آیا مطمئن هستید که می‌خواهید آگهی "${job.title}" را حذف کنید؟`
    );

    if (!confirmDelete) return;

    // Remove from vacancies list
    const updatedVacancies = vacancies.filter((v) => v.id !== job.id);
    setVacancies(updatedVacancies);
    saveJobs(updatedVacancies);

    // Remove from global jobs list
    if (typeof window !== "undefined") {
      const existingJobs = JSON.parse(localStorage.getItem("allJobs") || "[]");
      const updatedAllJobs = existingJobs.filter((j) => j.id !== job.id);
      localStorage.setItem("allJobs", JSON.stringify(updatedAllJobs));
    }

    showSuccessMessage("آگهی با موفقیت حذف شد!");
  };

  const filteredVacancies = vacancies.filter((v) => {
    if (filter === "all") return true;
    return v.status === filter;
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !newJob.title.trim() ||
      !newJob.company.trim() ||
      !newJob.description.trim() ||
      !newJob.requirements.trim() ||
      !newJob.location.trim() ||
      !newJob.category
    ) {
      alert("لطفاً تمام فیلدهای ضروری را پر کنید.");
      return;
    }

    if (editingJob) {
      // Update existing job
      const updatedJob = {
        ...editingJob,
        ...newJob,
        updatedAt: new Date().toISOString(),
      };

      const updatedVacancies = vacancies.map((job) =>
        job.id === editingJob.id ? updatedJob : job
      );
      setVacancies(updatedVacancies);
      saveJobs(updatedVacancies);

      // Update global jobs list
      if (typeof window !== "undefined") {
        const existingJobs = JSON.parse(
          localStorage.getItem("allJobs") || "[]"
        );
        const updatedAllJobs = existingJobs.map((job) =>
          job.id === editingJob.id ? updatedJob : job
        );
        localStorage.setItem("allJobs", JSON.stringify(updatedAllJobs));
      }

      setEditingJob(null);
      showSuccessMessage("آگهی با موفقیت بروزرسانی شد!");
    } else {
      // Create new job
      const jobToSave = {
        ...newJob,
        id: Date.now().toString(),
        applicants: 0,
        date: new Date().toLocaleDateString("fa-IR"),
        createdAt: new Date().toISOString(),
        status: "active",
      };

      // Add to vacancies list
      const updatedVacancies = [jobToSave, ...vacancies];
      setVacancies(updatedVacancies);
      saveJobs(updatedVacancies);

      // Add to global jobs list since all jobs are now active (with employer userType)
      if (typeof window !== "undefined") {
        const jobWithUserType = { ...jobToSave, userType: "employer" };
        const existingJobs = JSON.parse(
          localStorage.getItem("allJobs") || "[]"
        );
        const updatedAllJobs = [jobWithUserType, ...existingJobs];
        localStorage.setItem("allJobs", JSON.stringify(updatedAllJobs));

        // Debug: Log saved job
        console.log("آگهی ذخیره شده:", jobToSave);
        console.log("تمام آگهی‌های ذخیره شده:", updatedAllJobs);
      }

      showSuccessMessage("آگهی با موفقیت منتشر شد!");
    }

    // Reset form and hide it with enhanced company data pre-fill
    const companyData = loadCompanyData();
    setNewJob({
      title: "",
      company: companyData.companyName || "",
      description: companyData.description
        ? `امکان همکاری با ${companyData.companyName}. ${companyData.description}`
        : "",
      requirements: "",
      salary: "",
      location: companyData.city
        ? `${companyData.city}, ${companyData.province}`
        : "",
      type: "full-time",
      category:
        companyData.industryType === "technology" ? "فناوری اطلاعات" : "",
      specialization: "",
      gender: "both",
      education: "",
      experience: "",
      militaryService: "",
      benefits: [
        ...(companyData.benefits && companyData.benefits.length > 0
          ? companyData.benefits
          : []),
        // Add company services as additional benefits
        ...(companyData.services && companyData.services.length > 0
          ? companyData.services
          : []),
      ],
      responsibilities: companyData.mission
        ? `مأموریت شرکت: ${companyData.mission}`
        : "",
      skills: `تماس با شرکت: ${companyData.email ? companyData.email : ""}${
        companyData.phone ? ` - ${companyData.phone}` : ""
      }`,
      workHours: "۹ صبح تا ۶ عصر",
      probationPeriod: "۳ ماه",
      insurance: "full",
      remoteWork:
        companyData.workEnvironment?.toLowerCase().includes("دورکاری") ||
        companyData.workEnvironment?.toLowerCase().includes("از راه دور"),
      travelRequired: false,
      urgent: false,
      province: companyData.province || "",
      workEnvironment: companyData.workEnvironment
        ? companyData.workEnvironment
        : "",
      website: companyData.website || "",
    });
    setShowCreateForm(false);
  };

  return (
    <div className="bg-[#1e1e1e] rounded-xl p-6 shadow-lg border border-gray-800">
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
            onClick={() => {
              setShowCreateForm(!showCreateForm);
              if (showCreateForm) {
                setEditingJob(null);
              }
            }}
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
            {editingJob ? "ویرایش آگهی استخدام" : "ایجاد آگهی استخدام جدید"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* رتبه/توضیح شرکت */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 text-right">
                نام شرکت *
              </label>
              <input
                type="text"
                value={newJob.company}
                onChange={(e) =>
                  setNewJob({ ...newJob, company: e.target.value })
                }
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-right"
                placeholder="مثال: شرکت فناوری اطلاعات پارامکس"
                required
              />
            </div>

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
                <option value="فناوری اطلاعات">فناوری اطلاعات</option>
                <option value="طراحی و گرافیک">طراحی و گرافیک</option>
                <option value="مدیریت پروژه">مدیریت پروژه</option>
                <option value="بازاریابی و فروش">بازاریابی و فروش</option>
                <option value="منابع انسانی">منابع انسانی</option>
                <option value="مالی و حسابداری">مالی و حسابداری</option>
                <option value="سایر">سایر</option>
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

            {/* جنسیت */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 text-right">
                جنسیت
              </label>
              <select
                value={newJob.gender}
                onChange={(e) =>
                  setNewJob({ ...newJob, gender: e.target.value })
                }
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-right"
              >
                <option value="both">آقا و خانم</option>
                <option value="male">آقا</option>
                <option value="female">خانم</option>
              </select>
            </div>

            {/* تحصیلات */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 text-right">
                حداقل تحصیلات
              </label>
              <select
                value={newJob.education}
                onChange={(e) =>
                  setNewJob({ ...newJob, education: e.target.value })
                }
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-right"
              >
                <option value="">انتخاب تحصیلات</option>
                <option value="diploma">دیپلم</option>
                <option value="associate">کاردانی</option>
                <option value="bachelor">کارشناسی</option>
                <option value="master">کارشناسی ارشد</option>
                <option value="phd">دکتری</option>
              </select>
            </div>

            {/* سابقه کاری */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 text-right">
                سابقه کاری
              </label>
              <select
                value={newJob.experience}
                onChange={(e) =>
                  setNewJob({ ...newJob, experience: e.target.value })
                }
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-right"
              >
                <option value="">انتخاب سابقه</option>
                <option value="fresh">تازه‌کار</option>
                <option value="1-2">۱-۲ سال</option>
                <option value="2-5">۲-۵ سال</option>
                <option value="5+">بیش از ۵ سال</option>
              </select>
            </div>

            {/* وضعیت سربازی */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 text-right">
                وضعیت سربازی
              </label>
              <select
                value={newJob.militaryService}
                onChange={(e) =>
                  setNewJob({ ...newJob, militaryService: e.target.value })
                }
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-right"
              >
                <option value="">انتخاب وضعیت</option>
                <option value="completed">پایان خدمت</option>
                <option value="exempt">معاف</option>
                <option value="not-required">نیازی نیست</option>
              </select>
            </div>

            {/* ساعت کاری */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 text-right">
                ساعت کاری
              </label>
              <input
                type="text"
                value={newJob.workHours}
                onChange={(e) =>
                  setNewJob({ ...newJob, workHours: e.target.value })
                }
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-right"
                placeholder="مثال: ۹ صبح تا ۶ عصر"
              />
            </div>

            {/* بیمه */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 text-right">
                بیمه
              </label>
              <select
                value={newJob.insurance}
                onChange={(e) =>
                  setNewJob({ ...newJob, insurance: e.target.value })
                }
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-right"
              >
                <option value="">انتخاب بیمه</option>
                <option value="full">بیمه کامل</option>
                <option value="basic">بیمه پایه</option>
                <option value="none">بدون بیمه</option>
              </select>
            </div>

            {/* دوره آزمایشی */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 text-right">
                دوره آزمایشی
              </label>
              <input
                type="text"
                value={newJob.probationPeriod}
                onChange={(e) =>
                  setNewJob({ ...newJob, probationPeriod: e.target.value })
                }
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-right"
                placeholder="مثال: ۳ ماه"
              />
            </div>

            {/* مزایا و تسهیلات */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2 text-right">
                مزایا و تسهیلات
              </label>
              <textarea
                value={newJob.benefits.join("\n")}
                onChange={(e) =>
                  setNewJob({
                    ...newJob,
                    benefits: e.target.value
                      .split("\n")
                      .filter((b) => b.trim()),
                  })
                }
                rows={3}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-right resize-vertical"
                placeholder="هر مزیت را در یک خط جداگانه وارد کنید&#10;مثال: بیمه تکمیلی&#10;ساعت کاری شناور&#10;اتاق بازی"
              />
            </div>

            {/* مسئولیت‌ها */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2 text-right">
                مسئولیت‌ها
              </label>
              <textarea
                value={newJob.responsibilities}
                onChange={(e) =>
                  setNewJob({ ...newJob, responsibilities: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-right resize-vertical"
                placeholder="مسئولیت‌های اصلی این موقعیت را شرح دهید..."
              />
            </div>

            {/* مهارت‌های مورد نیاز */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2 text-right">
                مهارت‌های مورد نیاز
              </label>
              <textarea
                value={newJob.skills}
                onChange={(e) =>
                  setNewJob({ ...newJob, skills: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-right resize-vertical"
                placeholder="مهارت‌های فنی و نرم مورد نیاز را وارد کنید..."
              />
            </div>

            {/* گزینه‌های اضافی */}
            <div className="md:col-span-2">
              <div className="flex flex-wrap gap-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newJob.remoteWork}
                    onChange={(e) =>
                      setNewJob({ ...newJob, remoteWork: e.target.checked })
                    }
                    className="ml-2 w-4 h-4 text-yellow-400 bg-gray-700 border-gray-600 rounded focus:ring-yellow-400 focus:ring-2"
                  />
                  <span className="text-sm text-gray-300">امکان دورکاری</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newJob.travelRequired}
                    onChange={(e) =>
                      setNewJob({ ...newJob, travelRequired: e.target.checked })
                    }
                    className="ml-2 w-4 h-4 text-yellow-400 bg-gray-700 border-gray-600 rounded focus:ring-yellow-400 focus:ring-2"
                  />
                  <span className="text-sm text-gray-300">نیاز به سفر</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newJob.urgent}
                    onChange={(e) =>
                      setNewJob({ ...newJob, urgent: e.target.checked })
                    }
                    className="ml-2 w-4 h-4 text-yellow-400 bg-gray-700 border-gray-600 rounded focus:ring-yellow-400 focus:ring-2"
                  />
                  <span className="text-sm text-gray-300">فوری</span>
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-8">
            <button
              onClick={() => {
                setShowCreateForm(false);
                setEditingJob(null);
              }}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition duration-300"
            >
              لغو
            </button>
            <button className="px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-300 transition duration-300 font-bold flex items-center">
              <span className="ml-2">
                {editingJob ? "بروزرسانی آگهی" : "انتشار آگهی"}
              </span>
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
                  <button
                    onClick={() => handleEditJob(job)}
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    ویرایش
                  </button>
                  <button
                    onClick={() => handleViewJob(job)}
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    مشاهده
                  </button>
                  <button
                    onClick={() => handleDeleteJob(job)}
                    className="text-gray-400 hover:text-red-400 transition-colors"
                  >
                    حذف
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
