"use client";

import React, { useState, useEffect } from "react";

// داده‌های نمونه رزومه
const getResumeData = (id) => {
  const resumes = {
    1: {
      id: 1,
      name: "سارا احمدی",
      position: "توسعه‌دهنده React",
      email: "sara.ahmdi@example.com",
      phone: "+۹۸ ۹۱۲ ۳۴۵ ۶۷۸۹",
      location: "تهران، ایران",
      appliedDate: "۲ ساعت پیش",
      experienceYears: "۴",
      status: "new",
      score: 92,
      isPro: true,
      summary: "توسعه‌دهنده Front-End با تجربه ۴ ساله در React، Next.js و TypeScript.",
      skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3"],
      experience: [{
        id: 1,
        title: "توسعه‌دهنده Front-End Senior",
        company: "شرکت فناوری اطلاعات سپهر",
        location: "تهران",
        startDate: "۱۳۹۹/۰۱",
        endDate: "اکنون",
        description: "طراحی و توسعه رابط کاربری وب اپلیکیشن‌های بزرگ.",
        achievements: ["افزایش سرعت بارگذاری صفحات تا ۴۰%"]
      }],
      education: [{
        id: 1,
        degree: "کارشناسی مهندسی نرم‌افزار",
        institution: "دانشگاه تهران",
        location: "تهران",
        graduationYear: "۱۳۹۷",
        gpa: "۱۷.۵ از ۲۰"
      }],
      languages: [
        { name: "فارسی", level: "زبان مادری" },
        { name: "انگلیسی", level: "خوب" }
      ]
    }
  };
  return resumes[id] || null;
};

export default function ResumeDetailView({ resumeId, onBack }) {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      setLoading(true);
      setTimeout(() => {
        const resumeData = getResumeData(resumeId);
        setResume(resumeData);
        setLoading(false);
      }, 500);
    };

    if (resumeId) {
      fetchResume();
    }
  }, [resumeId]);

  const handleStatusChange = (newStatus) => {
    if (window.confirm(`آیا مطمئن هستید که وضعیت این رزومه را تغییر دهید؟`)) {
      setResume((prev) => (prev ? { ...prev, status: newStatus } : null));
      alert(`وضعیت رزومه تغییر یافت.`);
    }
  };

  const handleContact = () => {
    alert(`تماس با ${resume.name} از طریق ایمیل: ${resume.email}`);
  };

  const handleDownload = () => {
    alert("دانلود رزومه به صورت PDF");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-400 text-sm sm:text-base">در حال بارگذاری رزومه...</p>
        </div>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <div className="text-center">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-400 mb-2">رزومه یافت نشد</h3>
          <button onClick={onBack} className="mt-4 bg-yellow-400 text-gray-900 px-4 sm:px-6 py-2 rounded-lg hover:bg-yellow-500 transition duration-200">
            بازگشت
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="bg-[#1e1e1e] border-b border-black sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
            <div className="flex items-center space-x-4 space-x-reverse">
              <button onClick={onBack} className="flex items-center text-gray-400 hover:text-white transition duration-200">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm sm:text-base">بازگشت</span>
              </button>
              <div className="text-xs sm:text-sm text-gray-500">
                رزومه‌های دریافتی / {resume.name}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <button onClick={handleDownload} className="flex items-center bg-black text-gray-300 px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200 text-xs sm:text-sm">
                دانلود PDF
              </button>
              <button onClick={handleContact} className="flex items-center bg-blue-400/10 text-blue-400 px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-400/20 transition duration-200 text-xs sm:text-sm">
                تماس
              </button>
              <button onClick={() => handleStatusChange("shortlisted")} className="flex items-center bg-green-400/10 text-green-400 px-3 sm:px-4 py-2 rounded-lg hover:bg-green-400/20 transition duration-200 text-xs sm:text-sm">
                انتخاب
              </button>
              <button onClick={() => handleStatusChange("rejected")} className="flex items-center bg-red-400/10 text-red-400 px-3 sm:px-4 py-2 rounded-lg hover:bg-red-400/20 transition duration-200 text-xs sm:text-sm">
                رد کردن
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* محتوای اصلی */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* هدر رزومه */}
        <div className="bg-[#1e1e1e] rounded-xl p-4 sm:p-6 lg:p-8 border border-black mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 sm:space-x-reverse">
            {/* تصویر پروفایل */}
            <div className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center border-4 flex-shrink-0 ${resume.isPro ? "bg-gradient-to-br from-purple-500/20 to-pink-500/30 border-purple-500/50" : "bg-gradient-to-br from-blue-400/20 to-blue-600/30 border-blue-400/50"}`}>
              <span className={`font-bold text-lg sm:text-xl lg:text-2xl ${resume.isPro ? "text-purple-300" : "text-blue-400"}`}>
                {resume.name.charAt(0)}
              </span>
            </div>

            {/* اطلاعات اصلی */}
            <div className="flex-1 text-center sm:text-right w-full">
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3 sm:space-x-reverse mb-3 sm:mb-2">
                <h1 className={`text-xl sm:text-2xl lg:text-3xl font-bold ${resume.isPro ? "text-purple-200" : "text-white"}`}>
                  {resume.isPro && (
                    <span className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg ml-2 sm:ml-3">
                      PRO
                    </span>
                  )}
                  {resume.name}
                </h1>
                <div className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${resume.status === "new" ? "bg-green-400/10 text-green-400 border border-green-400/20" : "bg-blue-400/10 text-blue-400 border border-blue-400/20"}`}>
                  {resume.status === "new" ? "جدید" : "بررسی شده"}
                </div>
              </div>

              <p className="text-lg sm:text-xl text-blue-400 font-medium mb-3 sm:mb-4">
                {resume.position}
              </p>

              {/* اطلاعات تماس */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="flex items-center justify-center sm:justify-start text-gray-300 text-sm">
                  <span>📧 {resume.email}</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start text-gray-300 text-sm">
                  <span>📱 {resume.phone}</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start text-gray-300 text-sm">
                  <span>📍 {resume.location}</span>
                </div>
              </div>

              {/* امتیاز و اطلاعات کلی */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-6 sm:space-x-reverse text-xs sm:text-sm">
                <div className="flex items-center text-yellow-400">
                  ⭐ امتیاز: {resume.score}/100
                </div>
                <div className="text-gray-400">{resume.experienceYears} سال تجربه</div>
                <div className="text-gray-400">ارسال شده: {resume.appliedDate}</div>
              </div>
            </div>
          </div>

          {/* خلاصه حرفه‌ای */}
          {resume.summary && (
            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-black">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3 text-center sm:text-right">خلاصه حرفه‌ای</h3>
              <p className="text-gray-300 leading-relaxed text-center sm:text-right text-sm sm:text-base">{resume.summary}</p>
            </div>
          )}
        </div>

        {/* بخش‌های مختلف رزومه */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* ستون سمت چپ */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* تجربه کاری */}
            <div className="bg-[#1e1e1e] rounded-xl p-4 sm:p-6 border border-black">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 text-right">تجربه کاری</h3>
              <div className="space-y-4 sm:space-y-6">
                {resume.experience.map((exp) => (
                  <div key={exp.id} className="border-r-2 border-yellow-400 pr-4 sm:pr-6 relative">
                    <div className="absolute -right-2 top-0 w-3 h-3 sm:w-4 sm:h-4 bg-yellow-400 rounded-full"></div>
                    <div className="text-right">
                      <h4 className="text-base sm:text-lg font-semibold text-white">{exp.title}</h4>
                      <p className="text-blue-400 font-medium text-sm sm:text-base">{exp.company}</p>
                      <p className="text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3">
                        {exp.location} • {exp.startDate} - {exp.endDate}
                      </p>
                      <p className="text-gray-300 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                        {exp.description}
                      </p>
                      {exp.achievements && exp.achievements.length > 0 && (
                        <div>
                          <h5 className="text-yellow-400 font-medium mb-2 text-sm sm:text-base">دستاوردها:</h5>
                          <ul className="list-disc list-inside space-y-1 text-gray-300 text-xs sm:text-sm">
                            {exp.achievements.map((achievement, index) => (
                              <li key={index}>{achievement}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* تحصیلات */}
            <div className="bg-[#1e1e1e] rounded-xl p-4 sm:p-6 border border-black">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 text-right">تحصیلات</h3>
              <div className="space-y-3 sm:space-y-4">
                {resume.education.map((edu) => (
                  <div key={edu.id} className="text-right">
                    <h4 className="text-base sm:text-lg font-semibold text-white">{edu.degree}</h4>
                    <p className="text-blue-400 font-medium text-sm sm:text-base">{edu.institution}</p>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      {edu.location} • فارغ‌التحصیل {edu.graduationYear}
                    </p>
                    {edu.gpa && (
                      <p className="text-yellow-400 text-xs sm:text-sm">معدل: {edu.gpa}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ستون سمت راست */}
          <div className="space-y-6 sm:space-y-8">
            {/* مهارت‌ها */}
            <div className="bg-[#1e1e1e] rounded-xl p-4 sm:p-6 border border-black">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4 text-right">مهارت‌ها</h3>
              <div className="flex flex-wrap gap-2">
                {resume.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-400/10 text-blue-400 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm border border-blue-400/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* زبان‌ها */}
            <div className="bg-[#1e1e1e] rounded-xl p-4 sm:p-6 border border-black">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4 text-right">زبان‌ها</h3>
              <div className="space-y-2">
                {resume.languages.map((lang, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-yellow-400 font-medium text-sm sm:text-base">{lang.level}</span>
                    <span className="text-white text-sm sm:text-base">{lang.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
