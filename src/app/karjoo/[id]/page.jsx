"use client";

import React from "react";
import {
  User,
  MapPin,
  Phone,
  Mail,
  Briefcase,
  Calendar,
  Star,
  Award,
  Languages,
  FileText,
  ExternalLink,
  Download,
  Share2,
  Heart,
  Eye,
} from "lucide-react";

// کامپوننت نمایش سطح مهارت
const SkillLevel = ({ level }) => {
  const levels = ["مبتدی", "متوسط", "پیشرفته", "حرفه‌ای"];
  const levelIndex = levels.indexOf(level);

  return (
    <div className="flex items-center gap-1">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className={`w-2 h-2 rounded-full ${
            index <= levelIndex ? "bg-yellow-400" : "bg-gray-600"
          }`}
        />
      ))}
    </div>
  );
};

// کامپوننت نمایش تگ
const Tag = ({ children, color = "yellow" }) => {
  const colorClasses = {
    yellow: "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
    blue: "bg-blue-400/10 text-blue-400 border-blue-400/20",
    green: "bg-green-400/10 text-green-400 border-green-400/20",
    purple: "bg-purple-400/10 text-purple-400 border-purple-400/20",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClasses[color]}`}
    >
      {children}
    </span>
  );
};

export default function ResumeViewPage({ params }) {
  // داده‌های نمونه رزومه (در واقعیت از API یا دیتابیس دریافت می‌شود)
  const resumeData = {
    basicInfo: {
      firstName: "علی",
      lastName: "احمدی",
      mobile: "09123456789",
      email: "ali.ahmadi@example.com",
    },
    profileImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    residence: {
      province: "تهران",
      city: "تهران",
      address: "خیابان ولیعصر، پلاک ۱۲۳",
    },
    jobInfo: {
      jobTitle: "توسعه‌دهنده فول‌استک",
      showSalary: true,
      salaryType: "amount",
      salaryAmount: "15000000",
    },
    workExperiences: [
      {
        companyName: "شرکت فناوری پارس",
        position: "توسعه‌دهنده ارشد React",
        startDate: "1401/03/15",
        endDate: "",
        currentJob: true,
        responsibilities:
          "توسعه و نگهداری اپلیکیشن‌های وب با React و Node.js، همکاری با تیم طراحی UI/UX، بهینه‌سازی عملکرد اپلیکیشن‌ها",
      },
      {
        companyName: "استودیو طراحی نوین",
        position: "برنامه‌نویس فرانت‌اند",
        startDate: "1399/06/10",
        endDate: "1401/02/28",
        currentJob: false,
        responsibilities:
          "پیاده‌سازی رابط کاربری وب‌سایت‌ها با HTML، CSS و JavaScript، همکاری با تیم بک‌اند برای یکپارچه‌سازی API",
      },
    ],
    skills: [
      { skillName: "React.js", proficiency: "حرفه‌ای" },
      { skillName: "Node.js", proficiency: "پیشرفته" },
      { skillName: "JavaScript", proficiency: "حرفه‌ای" },
      { skillName: "TypeScript", proficiency: "پیشرفته" },
      { skillName: "Python", proficiency: "متوسط" },
      { skillName: "MongoDB", proficiency: "پیشرفته" },
    ],
    languages: [
      { language: "انگلیسی", proficiency: "پیشرفته" },
      { language: "عربی", proficiency: "متوسط" },
    ],
    certificates: [
      {
        title: "گواهینامه React Developer",
        issuer: "Meta",
        certificateNumber: "RD-2023-001",
        link: "https://example.com/certificate",
        issueDate: "1402/05/15",
        expiryDate: "",
        noExpiry: true,
        description: "گواهینامه تخصصی توسعه اپلیکیشن با React",
      },
      {
        title: "AWS Cloud Practitioner",
        issuer: "Amazon Web Services",
        certificateNumber: "AWS-CP-2023",
        link: "https://example.com/aws-cert",
        issueDate: "1402/08/20",
        expiryDate: "1405/08/20",
        noExpiry: false,
        description: "گواهینامه مبانی خدمات ابری آمازون",
      },
    ],
    portfolioLink: "https://ali-ahmadi-portfolio.com",
    portfolioFiles: ["project1.pdf", "project2.pdf", "design-samples.zip"],
  };

  return (
    <div className="min-h-screen bg-black/90">
      {/* Header با اکشن‌ها */}
      <div className="sticky top-0 z-50  backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-white">
                رزومه {resumeData.basicInfo.firstName}{" "}
                {resumeData.basicInfo.lastName}
              </h1>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Eye className="w-4 h-4" />
                <span>۱۲۳ بازدید</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg- text-white rounded-lg transition-colors">
                <Heart className="w-4 h-4" />
                <span className="hidden sm:inline">علاقه‌مندی</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">اشتراک‌گذاری</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg transition-colors font-medium">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">دانلود PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ستون سمت راست - اطلاعات اصلی */}
          <div className="lg:col-span-2 space-y-8">
            {/* بخش اطلاعات پایه */}
            <div className="bg-gradient-to-br from-black/50 to-black/10 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative">
                  <img
                    src={resumeData.profileImage}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-yellow-400/20 shadow-2xl"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-gray-900 flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>

                <div className="flex-1 text-center sm:text-right">
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {resumeData.basicInfo.firstName}{" "}
                    {resumeData.basicInfo.lastName}
                  </h1>
                  <p className="text-xl text-yellow-400 mb-4 font-medium">
                    {resumeData.jobInfo.jobTitle}
                  </p>

                  <div className="flex flex-wrap justify-center sm:justify-end gap-4 text-gray-300">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>
                        {resumeData.residence.city}،{" "}
                        {resumeData.residence.province}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{resumeData.basicInfo.mobile}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span>{resumeData.basicInfo.email}</span>
                    </div>
                  </div>

                  {resumeData.jobInfo.showSalary &&
                    resumeData.jobInfo.salaryType === "amount" && (
                      <div className="mt-4">
                        <Tag color="green">
                          حقوق مورد انتظار:{" "}
                          {parseInt(
                            resumeData.jobInfo.salaryAmount
                          ).toLocaleString("fa-IR")}{" "}
                          تومان
                        </Tag>
                      </div>
                    )}
                </div>
              </div>
            </div>

            {/* بخش سوابق کاری */}
            <div className="bg-gradient-to-br from-black/50 to-black/10 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-black/50 to-black/10 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">سوابق کاری</h2>
              </div>

              <div className="space-y-6">
                {resumeData.workExperiences.map((exp, index) => (
                  <div key={index} className="relative">
                    {index !== resumeData.workExperiences.length - 1 && (
                      <div className="absolute right-5 top-12 w-0.5 h-full bg-gradient-to-b from-yellow-400 to-transparent"></div>
                    )}

                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-yellow-400/20 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-yellow-400/30">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      </div>

                      <div className="flex-1 bg-gradient-to-br from-black/50 to-black/10 rounded-xl p-6 border border-gray-700/30">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
                          <h3 className="text-xl font-semibold text-white">
                            {exp.position}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {exp.startDate} -{" "}
                              {exp.currentJob ? "تاکنون" : exp.endDate}
                            </span>
                            {exp.currentJob && <Tag color="green">فعلی</Tag>}
                          </div>
                        </div>

                        <p className="text-yellow-400 font-medium mb-3">
                          {exp.companyName}
                        </p>
                        <p className="text-gray-300 leading-relaxed">
                          {exp.responsibilities}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* بخش مدارک و گواهینامه‌ها */}
            <div className="bg-gradient-to-br from-black/50 to-black/10 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-black/50 to-black/10 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  مدارک و گواهینامه‌ها
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resumeData.certificates.map((cert, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-black/50 to-black/10 rounded-xl p-6 border border-gray-700/30 hover:border-purple-400/30 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-white flex-1">
                        {cert.title}
                      </h3>
                      {cert.link && (
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-400 hover:text-purple-300 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>

                    <p className="text-purple-400 font-medium mb-2">
                      {cert.issuer}
                    </p>
                    <p className="text-gray-400 text-sm mb-3">
                      {cert.description}
                    </p>

                    <div className="flex flex-wrap gap-2 text-xs text-gray-400">
                      <span>تاریخ صدور: {cert.issueDate}</span>
                      {!cert.noExpiry && cert.expiryDate && (
                        <span>• انقضا: {cert.expiryDate}</span>
                      )}
                      {cert.noExpiry && <Tag color="green">بدون انقضا</Tag>}
                    </div>

                    {cert.certificateNumber && (
                      <div className="mt-3 pt-3 border-t border-gray-700">
                        <span className="text-xs text-gray-500">
                          شماره گواهینامه: {cert.certificateNumber}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* بخش نمونه کارها */}
            <div className="bg-gradient-to-br from-black/50 to-black/10 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">نمونه کارها</h2>
              </div>

              <div className="space-y-4">
                {resumeData.portfolioLink && (
                  <div className="bg-gradient-to-br from-black/50 to-black/10 rounded-xl p-6 border border-gray-700/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">
                          وب‌سایت نمونه کارها
                        </h3>
                        <p className="text-gray-400">
                          مشاهده کامل پروژه‌ها و نمونه کارها
                        </p>
                      </div>
                      <a
                        href={resumeData.portfolioLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>مشاهده</span>
                      </a>
                    </div>
                  </div>
                )}

                {resumeData.portfolioFiles.length > 0 && (
                  <div className="bg-gradient-to-br from-black/50 to-black/10 rounded-xl p-6 border border-gray-700/30">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      فایل‌های نمونه کار
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {resumeData.portfolioFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gradient-to-br from-black/50 to-black/10 rounded-lg border border-gray-700/30"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-green-400" />
                            <span className="text-gray-300">{file}</span>
                          </div>
                          <button className="text-green-400 hover:text-green-300 transition-colors">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ستون سمت چپ - اطلاعات جانبی */}
          <div className="space-y-8">
            {/* بخش مهارت‌ها */}
            <div className="bg-gradient-to-br from-black/50 to-black/10 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <Star className="w-4 h-4 text-yellow-400" />
                </div>
                <h2 className="text-xl font-bold text-white">مهارت‌ها</h2>
              </div>

              <div className="space-y-4">
                {resumeData.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="text-gray-300 font-medium">
                      {skill.skillName}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400">
                        {skill.proficiency}
                      </span>
                      <SkillLevel level={skill.proficiency} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* بخش زبان‌های خارجی */}
            <div className="bg-gradient-to-br from-black/50 to-black/10 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Languages className="w-4 h-4 text-blue-400" />
                </div>
                <h2 className="text-xl font-bold text-white">زبان‌های خارجی</h2>
              </div>

              <div className="space-y-4">
                {resumeData.languages.map((lang, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="text-gray-300 font-medium">
                      {lang.language}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400">
                        {lang.proficiency}
                      </span>
                      <SkillLevel level={lang.proficiency} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* بخش اطلاعات تماس تکمیلی */}
            <div className="bg-gradient-to-br from-black/50 to-black/10backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <h2 className="text-xl font-bold text-white mb-6">
                اطلاعات تماس
              </h2>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-black/50 to-black/10 rounded-lg">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-white font-medium">آدرس</p>
                    <p className="text-gray-400 text-sm">
                      {resumeData.residence.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-black/50 to-black/10 rounded-lg">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-white font-medium">تلفن همراه</p>
                    <p className="text-gray-400 text-sm">
                      {resumeData.basicInfo.mobile}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-black/50 to-black/10 rounded-lg">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-white font-medium">ایمیل</p>
                    <p className="text-gray-400 text-sm">
                      {resumeData.basicInfo.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* دکمه‌های اقدام */}
            <div className="bg-gradient-to-br from-black/50 to-black/10 backdrop-blur-sm rounded-2xl p-6 border border-yellow-400/20">
              <h3 className="text-lg font-bold text-white mb-4">
                علاقه‌مند هستید؟
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg transition-colors font-medium">
                  <Mail className="w-4 h-4" />
                  ارسال پیام
                </button>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                  <Phone className="w-4 h-4" />
                  تماس تلفنی
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
