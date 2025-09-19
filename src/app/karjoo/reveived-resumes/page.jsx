"use client";

import React, { useState, Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import CustomInput from "@/components/ui/input/CustomInput";
import KarjooHeader from "@/components/layout/header/KarjooHeader";

// داده‌های نمونه رزومه‌های ارسالی کاربر
const initialSentApplicationsData = [
  {
    id: 1,
    companyName: "تکنولوژی پارس",
    jobTitle: "توسعه‌دهنده React",
    appliedDate: "۲ ساعت پیش",
    status: "pending",
    salary: "۱۵-۲۰ میلیون",
    location: "تهران",
    companyLogo: "TP",
    jobType: "تمام وقت",
    responseTime: "معمولاً ۳ روز",
    matchScore: 92,
  },
  {
    id: 2,
    companyName: "شرکت نوآوری دیجیتال",
    jobTitle: "طراح UX/UI",
    appliedDate: "۴ ساعت پیش",
    status: "reviewed",
    salary: "۱۲-۱۸ میلیون",
    location: "تهران",
    companyLogo: "ND",
    jobType: "تمام وقت",
    responseTime: "معمولاً ۵ روز",
    matchScore: 88,
  },
  {
    id: 3,
    companyName: "فناوری آریا",
    jobTitle: "توسعه‌دهنده Node.js",
    appliedDate: "۶ ساعت پیش",
    status: "interview",
    salary: "۱۸-۲۵ میلیون",
    location: "تهران",
    companyLogo: "FA",
    jobType: "تمام وقت",
    responseTime: "معمولاً ۲ روز",
    matchScore: 95,
    interviewDetails: {
      date: "۱۴۰۳/۰۷/۲۵",
      time: "۱۰:۰۰ صبح",
      duration: "۴۵ دقیقه",
      type: "حضوری",
      location: "تهران، خیابان ولیعصر، پلاک ۱۲۳، طبقه ۵",
      interviewer: "آقای احمد رضایی",
      interviewerRole: "مدیر فنی",
      requirements: ["مدارک شناسایی", "نمونه کارهای انجام شده", "لپ‌تاپ شخصی"],
      topics: [
        "بررسی تجربیات قبلی",
        "تست فنی Node.js",
        "مباحث معماری نرم‌افزار",
        "کار تیمی و مدیریت پروژه",
      ],
      contactPerson: "خانم مریم کریمی",
      contactPhone: "۰۲۱-۸۸۷۷۶۶۵۵",
      notes:
        "لطفاً ۱۵ دقیقه زودتر حضور داشته باشید. در صورت تأخیر بیش از ۳۰ دقیقه، مصاحبه لغو خواهد شد.",
    },
  },
  {
    id: 4,
    companyName: "استارتاپ تک",
    jobTitle: "مدیر محصول دیجیتال",
    appliedDate: "۱ روز پیش",
    status: "rejected",
    salary: "۲۰-۳۰ میلیون",
    location: "تهران",
    companyLogo: "ST",
    jobType: "تمام وقت",
    responseTime: "معمولاً ۷ روز",
    matchScore: 78,
  },
  {
    id: 5,
    companyName: "داده‌کاوان پیشرو",
    jobTitle: "تحلیلگر داده",
    appliedDate: "۲ روز پیش",
    status: "pending",
    salary: "۱۴-۲۰ میلیون",
    location: "تهران",
    companyLogo: "DP",
    jobType: "تمام وقت",
    responseTime: "معمولاً ۴ روز",
    matchScore: 85,
  },
  {
    id: 6,
    companyName: "موبایل سازان",
    jobTitle: "توسعه‌دهنده React Native",
    appliedDate: "۳ روز پیش",
    status: "reviewed",
    salary: "۱۶-۲۲ میلیون",
    location: "تهران",
    companyLogo: "MS",
    jobType: "تمام وقت",
    responseTime: "معمولاً ۳ روز",
    matchScore: 82,
  },
  {
    id: 7,
    companyName: "سیستم‌های هوشمند",
    jobTitle: "کارشناس DevOps",
    appliedDate: "۴ روز پیش",
    status: "interview",
    salary: "۲۲-۳۰ میلیون",
    location: "تهران",
    companyLogo: "SH",
    jobType: "تمام وقت",
    responseTime: "معمولاً ۲ روز",
    matchScore: 91,
    interviewDetails: {
      date: "۱۴۰۳/۰۷/۲۸",
      time: "۱۴:۳۰",
      duration: "۶۰ دقیقه",
      type: "آنلاین",
      platform: "Google Meet",
      meetingLink: "https://meet.google.com/xyz-abc-def",
      interviewer: "خانم سارا احمدی",
      interviewerRole: "مدیر عملیات",
      requirements: [
        "اتصال اینترنت پایدار",
        "وب‌کم و میکروفون",
        "محیط آرام برای مصاحبه",
      ],
      topics: [
        "تجربه کار با Docker و Kubernetes",
        "مدیریت سرورها و زیرساخت",
        "CI/CD و اتوماسیون",
        "مانیتورینگ و لاگ‌گیری",
      ],
      contactPerson: "آقای علی محمدی",
      contactPhone: "۰۹۱۲-۳۴۵۶۷۸۹",
      notes:
        "لطفاً ۱۰ دقیقه قبل از شروع مصاحبه وارد جلسه شوید. در صورت بروز مشکل فنی، با شماره تماس ارائه شده تماس بگیرید.",
    },
  },
  // ...
];

// کامپوننت مودال جزئیات مصاحبه
const InterviewDetailsModal = ({
  isOpen,
  onClose,
  interviewDetails,
  companyName,
  jobTitle,
}) => {
  if (!isOpen || !interviewDetails) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />


      {/* Modal */}
      <div className="relative bg-[#1e1e1e] rounded-2xl border border-gray-700 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#1e1e1e] border-b border-gray-700 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="text-right">
              <h2 className="text-2xl font-bold text-white mb-1">
                جزئیات مصاحبه
              </h2>
              <p className="text-gray-400">
                {companyName} - {jobTitle}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-2 hover:border border-gray-700-800 rounded-lg"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* زمان و مکان */}
          <div className="bg-gradient-to-r from-yellow-400/10 to-amber-500/10 border border-yellow-400/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-yellow-400 mb-3 flex items-center">
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              زمان و مکان مصاحبه
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">تاریخ:</span>
                <span className="text-white font-medium">
                  {interviewDetails.date}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">ساعت:</span>
                <span className="text-white font-medium">
                  {interviewDetails.time}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">مدت زمان:</span>
                <span className="text-white font-medium">
                  {interviewDetails.duration}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">نوع مصاحبه:</span>
                <span
                  className={`font-medium ${
                    interviewDetails.type === "آنلاین"
                      ? "text-blue-400"
                      : "text-green-400"
                  }`}
                >
                  {interviewDetails.type}
                </span>
              </div>
            </div>

            {interviewDetails.type === "حضوری" && (
              <div className="mt-3 pt-3 border-t border-yellow-400/20">
                <div className="flex justify-between items-start">
                  <span className="text-gray-400">آدرس:</span>
                  <span className="text-white text-right max-w-xs">
                    {interviewDetails.location}
                  </span>
                </div>
              </div>
            )}

            {interviewDetails.type === "آنلاین" && (
              <div className="mt-3 pt-3 border-t border-yellow-400/20 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">پلتفرم:</span>
                  <span className="text-blue-400 font-medium">
                    {interviewDetails.platform}
                  </span>
                </div>
                {interviewDetails.meetingLink && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">لینک جلسه:</span>
                    <a
                      href={interviewDetails.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors text-sm underline"
                    >
                      ورود به جلسه
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* مصاحبه‌کننده */}
          <div className="bg-[#2a2a2a] rounded-xl p-4">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              مصاحبه‌کننده
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">نام:</span>
                <span className="text-white font-medium">
                  {interviewDetails.interviewer}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">سمت:</span>
                <span className="text-gray-300">
                  {interviewDetails.interviewerRole}
                </span>
              </div>
            </div>
          </div>

          {/* موضوعات مصاحبه */}
          <div className="bg-[#2a2a2a] rounded-xl p-4">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              موضوعات مصاحبه
            </h3>
            <ul className="space-y-2">
              {interviewDetails.topics.map((topic, index) => (
                <li
                  key={index}
                  className="flex items-center text-gray-300 text-sm"
                >
                  <div className="w-2 h-2 bg-yellow-400 rounded-full ml-3 flex-shrink-0" />
                  {topic}
                </li>
              ))}
            </ul>
          </div>

          {/* ملزومات */}
          <div className="bg-[#2a2a2a] rounded-xl p-4">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              ملزومات مصاحبه
            </h3>
            <ul className="space-y-2">
              {interviewDetails.requirements.map((requirement, index) => (
                <li
                  key={index}
                  className="flex items-center text-gray-300 text-sm"
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full ml-3 flex-shrink-0" />
                  {requirement}
                </li>
              ))}
            </ul>
          </div>

          {/* اطلاعات تماس */}
          <div className="bg-[#2a2a2a] rounded-xl p-4">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              اطلاعات تماس
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">مسئول هماهنگی:</span>
                <span className="text-white font-medium">
                  {interviewDetails.contactPerson}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">شماره تماس:</span>
                <a
                  href={`tel:${interviewDetails.contactPhone}`}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {interviewDetails.contactPhone}
                </a>
              </div>
            </div>
          </div>

          {/* نکات مهم */}
          {interviewDetails.notes && (
            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-400/20 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-orange-400 mb-3 flex items-center">
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                نکات مهم
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {interviewDetails.notes}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-[#1e1e1e] border-t border-gray-700 p-6 rounded-b-2xl">
          <div className="flex justify-end space-x-3 space-x-reverse">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-700-700 text-gray-300 rounded-lg hover:border border-gray-700-600 transition-colors"
            >
              بستن
            </button>
            <button className="px-6 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-colors font-medium">
              افزودن به تقویم
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// کامپوننت کارت درخواست شغل ارسالی
const ApplicationCard = ({ application, onWithdraw, onViewJob }) => {
  const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false);

  return (
    <>
    
      <div className="bg-[#1e1e1e] rounded-xl p-6 border border-gray-800 hover:border-yellow-400/50 transition-all duration-300">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400/20 to-blue-600/30 border-2 border-blue-400/50 flex items-center justify-center">
              <span className="font-bold text-lg text-blue-400">
                {application.companyLogo}
              </span>
            </div>
            <div className="text-right">
              <h3 className="text-lg font-bold text-white">
                {application.companyName}
              </h3>
              <p className="text-gray-400 text-sm my-1">
                {application.jobTitle}
              </p>
              <p className="text-gray-500 text-xs">{application.appliedDate}</p>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            {/* Status Badge */}
            <div
              className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                application.status === "pending"
                  ? "bg-yellow-400/10 text-yellow-400 border border-yellow-400/20"
                  : application.status === "reviewed"
                  ? "bg-blue-400/10 text-blue-400 border border-blue-400/20"
                  : application.status === "interview"
                  ? "bg-green-400/10 text-green-400 border border-green-400/20"
                  : application.status === "rejected"
                  ? "bg-red-400/10 text-red-400 border border-red-400/20"
                  : "border border-gray-700-400/10 text-gray-400 border border-gray-400/20"
              }`}
            >
              {application.status === "pending"
                ? "در انتظار بررسی"
                : application.status === "reviewed"
                ? "بررسی شده"
                : application.status === "interview"
                ? "دعوت به مصاحبه"
                : "رد شده"}
            </div>
            {/* Match Score */}
            <div className="text-yellow-400 text-sm font-medium">
              تطبیق: {application.matchScore}%
            </div>
          </div>
        </div>

        <div className="mb-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">حقوق:</span>
            <span className="text-gray-300">{application.salary} تومان</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">موقعیت:</span>
            <span className="text-gray-300">{application.location}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">نوع همکاری:</span>
            <span className="text-gray-300">{application.jobType}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">زمان پاسخ:</span>
            <span className="text-gray-300">{application.responseTime}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex space-x-2 space-x-reverse">
            <button
              onClick={() => onViewJob(application.id)}
              className="bg-blue-400/10 text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-400/20 transition duration-200 text-sm"
            >
              مشاهده آگهی
            </button>
            {application.status === "pending" && (
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      `آیا مطمئن هستید که درخواست خود را از ${application.companyName} پس بگیرید؟`
                    )
                  ) {
                    onWithdraw(application.id);
                  }
                }}
                className="bg-red-400/10 text-red-400 px-4 py-2 rounded-lg hover:bg-red-400/20 transition duration-200 text-sm"
              >
                پس گیری
              </button>
            )}
            {application.status === "interview" && (
              <button
                onClick={() => setIsInterviewModalOpen(true)}
                className="bg-green-400/10 text-green-400 px-4 py-2 rounded-lg hover:bg-green-400/20 transition duration-200 text-sm"
              >
                جزئیات مصاحبه
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Interview Details Modal */}
      {isInterviewModalOpen && (
        <InterviewDetailsModal
          isOpen={isInterviewModalOpen}
          onClose={() => setIsInterviewModalOpen(false)}
          interviewDetails={application.interviewDetails}
          companyName={application.companyName}
          jobTitle={application.jobTitle}
        />
      )}
    </>
  );
};

// کامپوننت فیلترها
const Filters = ({
  activeFilter,
  setActiveFilter,
  searchTerm,
  setSearchTerm,
  applications,
}) => (
  <div className="bg-[#1e1e1e] rounded-xl p-6 border border-gray-800 mb-6">
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
      <div className="flex space-x-2 space-x-reverse">
        <button
          onClick={() => setActiveFilter("all")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 min-w-[100px] ${
            activeFilter === "all"
              ? "bg-yellow-400 text-gray-900"
              : "border border-gray-700-800 text-gray-300 hover:border border-gray-700-700"
          }`}
        >
          همه ({applications.length})
        </button>
        <button
          onClick={() => setActiveFilter("pending")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 min-w-[120px] ${
            activeFilter === "pending"
              ? "bg-yellow-400 text-gray-900"
              : "border border-gray-700-800 text-gray-300 hover:border border-gray-700-700"
          }`}
        >
          در انتظار (
          {applications.filter((app) => app.status === "pending").length})
        </button>
        <button
          onClick={() => setActiveFilter("reviewed")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 min-w-[120px] ${
            activeFilter === "reviewed"
              ? "bg-yellow-400 text-gray-900"
              : "border border-gray-700-800 text-gray-300 hover:border border-gray-700-700"
          }`}
        >
          بررسی شده (
          {applications.filter((app) => app.status === "reviewed").length})
        </button>
        <button
          onClick={() => setActiveFilter("interview")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 min-w-[120px] ${
            activeFilter === "interview"
              ? "bg-yellow-400 text-gray-900"
              : "border border-gray-700-800 text-gray-300 hover:border border-gray-700-700"
          }`}
        >
          مصاحبه (
          {applications.filter((app) => app.status === "interview").length})
        </button>
        <button
          onClick={() => setActiveFilter("rejected")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 min-w-[100px] ${
            activeFilter === "rejected"
              ? "bg-yellow-400 text-gray-900"
              : "border border-gray-700-800 text-gray-300 hover:border border-gray-700-700"
          }`}
        >
          رد شده (
          {applications.filter((app) => app.status === "rejected").length})
        </button>
      </div>

      <div className="flex items-center border border-gray-700-800 rounded-lg px-4 py-2 w-full md:w-80">
        <svg
          className="w-5 h-5 text-gray-400 ml-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="جستجو در درخواست‌ها..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent text-white placeholder-gray-400 focus:outline-none w-full text-right"
        />
      </div>
    </div>
  </div>
);

// کامپوننت آمار سریع
const QuickStats = ({ applications }) => {
  const pendingCount = applications.filter(
    (app) => app.status === "pending"
  ).length;
  const reviewedCount = applications.filter(
    (app) => app.status === "reviewed"
  ).length;
  const interviewCount = applications.filter(
    (app) => app.status === "interview"
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-[#1e1e1e] rounded-xl p-6 border border-gray-800 text-center">
        <div className="text-3xl font-bold text-blue-400 mb-2">
          {applications.length}
        </div>
        <div className="text-gray-300 text-sm">کل درخواست‌ها</div>
      </div>
      <div className="bg-[#1e1e1e] rounded-xl p-6 border border-gray-800 text-center">
        <div className="text-3xl font-bold text-yellow-400 mb-2">
          {pendingCount}
        </div>
        <div className="text-gray-300 text-sm">در انتظار بررسی</div>
      </div>
      <div className="bg-[#1e1e1e] rounded-xl p-6 border border-gray-800 text-center">
        <div className="text-3xl font-bold text-green-400 mb-2">
          {interviewCount}
        </div>
        <div className="text-gray-300 text-sm">دعوت به مصاحبه</div>
      </div>
      <div className="bg-[#1e1e1e] rounded-xl p-6 border border-gray-800 text-center">
        <div className="text-3xl font-bold text-purple-400 mb-2">
          {reviewedCount}
        </div>
        <div className="text-gray-300 text-sm">بررسی شده</div>
      </div>
    </div>
  );
};

function ReceivedResumesPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [applicationsData, setApplicationsData] = useState(
    initialSentApplicationsData
  );

  const activeFilter = searchParams.get("status") || "all";
  const searchTerm = searchParams.get("q") || "";
  const currentPage = parseInt(searchParams.get("page") || "1");
  const itemsPerPage = 9;

  const updateURLParams = (paramsToUpdate) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    Object.entries(paramsToUpdate).forEach(([key, value]) => {
      if (value && value !== "all") {
        currentParams.set(key, value);
      } else {
        currentParams.delete(key);
      }
    });
    router.push(`${pathname}?${currentParams.toString()}`, { scroll: false });
  };

  const handleSetFilter = (filter) => updateURLParams({ status: filter });
  const handleSetSearch = (term) => updateURLParams({ q: term });
  const handleWithdraw = (applicationId) => {
    setApplicationsData((prevData) =>
      prevData.filter((app) => app.id !== applicationId)
    );
  };
  const handleViewJob = (applicationId) => {
    console.log("View job details for application:", applicationId);
  };

  const filteredApplications = applicationsData.filter((app) => {
    const matchesFilter = activeFilter === "all" || app.status === activeFilter;
    const matchesSearch =
      searchTerm === "" ||
      app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPageApplications = filteredApplications.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => updateURLParams({ page: page.toString() });
  const handlePrevPage = () => {
    if (currentPage > 1) handlePageChange(currentPage - 1);
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) handlePageChange(currentPage + 1);
  };

  return (
    <div className="min-h-screen bg-black/90 text-white pb-6 ">
      <KarjooHeader />
      

      <div className="max-w-7xl mx-auto space-y-6 ">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white text-right">
              رزومه های ارسالی
            </h1>
            <p className="text-gray-400 mt-2 text-right">
              مدیریت و پیگیری رزومه های شغلی ارسال شده توسط شما
            </p>
          </div>
          <div className="text-yellow-400">
            <svg
              className="w-12 h-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </div>
        </div>

        <QuickStats applications={applicationsData} />
        <Filters
          activeFilter={activeFilter}
          setActiveFilter={handleSetFilter}
          searchTerm={searchTerm}
          setSearchTerm={handleSetSearch}
          applications={applicationsData}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentPageApplications.length > 0 ? (
            currentPageApplications.map((application) => (
              <ApplicationCard
                key={application.id}
                application={application}
                onWithdraw={handleWithdraw}
                onViewJob={handleViewJob}
              />
            ))
          ) : (
            <div className="col-span-full bg-[#1e1e1e] rounded-xl p-12 text-center border border-gray-800">
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
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-400 mb-2">
                هیچ درخواستی یافت نشد
              </h3>
              <p className="text-gray-500">
                با تغییر فیلترها یا جستجو، درخواست‌های بیشتری پیدا کنید
              </p>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center mt-8">
            <div className="flex space-x-2 space-x-reverse">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg transition duration-200 ${
                  currentPage === 1
                    ? "border border-gray-700-700 text-gray-500 cursor-not-allowed"
                    : "border border-gray-700-800 text-gray-300 hover:border border-gray-700-700"
                }`}
              >
                قبلی
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNumber =
                  totalPages <= 5
                    ? i + 1
                    : currentPage <= 3
                    ? i + 1
                    : currentPage >= totalPages - 2
                    ? totalPages - 4 + i
                    : currentPage - 2 + i;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
                      currentPage === pageNumber
                        ? "bg-yellow-400 text-gray-900"
                        : "border border-gray-700-800 text-gray-300 hover:border border-gray-700-700"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg transition duration-200 ${
                  currentPage === totalPages
                    ? "border border-gray-700-700 text-gray-500 cursor-not-allowed"
                    : "border border-gray-700-800 text-gray-300 hover:border border-gray-700-700"
                }`}
              >
                بعدی
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ReceivedResumes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReceivedResumesPageContent />
    </Suspense>
  );
}
