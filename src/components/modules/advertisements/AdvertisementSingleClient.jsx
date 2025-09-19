"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  MapPin,
  Calendar,
  FileText,
  GraduationCap,
  DollarSign,
  User,
  ShieldCheck,
  ChevronsRight,
  UploadCloud,
  Trash2,
} from "lucide-react";

// A custom component for detail items to avoid repetition
const DetailItem = ({ icon: Icon, label, value }) => (
  <div className="flex flex-col items-center justify-center text-center p-4 rounded-xl border border-gray-700 h-full">
    <div className="flex items-center justify-center w-12 h-12 mb-3 bg-yellow-400/10 text-yellow-400 rounded-full">
      <Icon size={24} />
    </div>
    <p className="text-sm text-gray-400 mb-1">{label}</p>
    <p className="font-semibold text-white">{value}</p>
  </div>
);

// A custom component for form input fields
const FormInput = ({
  id,
  label,
  type = "text",
  placeholder,
  required = true,
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-300 mb-2 text-right"
    >
      {label} {required && <span className="text-yellow-400">*</span>}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      placeholder={placeholder}
      className="w-full border border-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 placeholder-gray-500 bg-transparent"
      required={required}
    />
  </div>
);

// Custom File Upload Component
const FileUpload = ({ id, label, multiple = false }) => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => file.name);
      if (multiple) {
        // Add new files to existing ones
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      } else {
        // Replace existing file
        setFiles(newFiles);
      }
    }
  };

  const handleClick = () => {
    document.getElementById(id).click();
  };

  const removeFile = (indexToRemove) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };

  const clearAllFiles = () => {
    setFiles([]);
    // Reset the input value
    const input = document.getElementById(id);
    if (input) input.value = "";
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2 text-right">
        {label} <span className="text-yellow-400">*</span>
      </label>
      <div
        onClick={handleClick}
        className="relative flex flex-col items-center justify-center w-full h-32 px-4 transition border-2 border-gray-700 border-dashed rounded-lg cursor-pointer hover:border-yellow-400"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <UploadCloud className="w-8 h-8 mb-4 text-gray-500" />
          <p className="mb-2 text-sm text-gray-400">
            <span className="font-semibold text-yellow-400">
              برای آپلود کلیک کنید
            </span>{" "}
            یا فایل‌ها را بکشید و رها کنید
          </p>
          <p className="text-xs text-gray-500">
            {multiple
              ? " فایل های خود را انتخاب کنید- SVG, PNG, JPG or PDF"
              : "SVG, PNG, JPG or PDF"}
          </p>
        </div>
        <input
          id={id}
          type="file"
          className="hidden"
          multiple={multiple}
          onChange={handleFileChange}
        />
      </div>
      {files.length > 0 && (
        <div className="mt-2 text-xs text-gray-400 text-right">
          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold">
              فایل‌های انتخاب شده: ({files.length})
            </p>
            {multiple && files.length > 1 && (
              <button
                type="button"
                onClick={clearAllFiles}
                className="text-red-400 hover:text-red-300 text-xs underline"
              >
                حذف همه
              </button>
            )}
          </div>
          <ul className="space-y-1">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between rounded px-3 py-2"
              >
                <span className="truncate flex-1">{file}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="text-red-400 hover:text-red-300 text-sm font-bold ml-2 flex-shrink-0"
                >
                  <Trash2 className="w-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default function AdvertisementSingleClient({ adId }) {
  const router = useRouter();
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (adId && typeof window !== "undefined") {
      // Get all jobs from localStorage
      const allJobs = JSON.parse(localStorage.getItem("allJobs") || "[]");

      // Find the specific job by ID
      const job = allJobs.find((j) => j.id === adId);

      if (job) {
        setJobData(job);
      }
    }

    setLoading(false);
  }, [adId]);

  // Default fallback data if no job data is found
  const jobDetails = jobData
    ? {
        gender:
          jobData.gender === "both"
            ? "آقا و خانم"
            : jobData.gender === "male"
            ? "آقا"
            : jobData.gender === "female"
            ? "خانم"
            : "آقا و خانم",
        contractType:
          jobData.type === "full-time"
            ? "تمام وقت"
            : jobData.type === "part-time"
            ? "پاره وقت"
            : jobData.type === "contract"
            ? "قراردادی"
            : jobData.type === "freelance"
            ? "فریلنسری"
            : jobData.type === "remote"
            ? "دورکاری"
            : "تمام وقت",
        education:
          jobData.education === "diploma"
            ? "دیپلم"
            : jobData.education === "associate"
            ? "کاردانی"
            : jobData.education === "bachelor"
            ? "کارشناسی"
            : jobData.education === "master"
            ? "کارشناسی ارشد"
            : jobData.education === "phd"
            ? "دکتری"
            : "کارشناسی",
        experience:
          jobData.experience === "fresh"
            ? "تازه‌کار"
            : jobData.experience === "1-2"
            ? "۱-۲ سال"
            : jobData.experience === "2-5"
            ? "۲-۵ سال"
            : jobData.experience === "5+"
            ? "بیش از ۵ سال"
            : "۲-۵ سال",
        militaryService:
          jobData.militaryService === "completed"
            ? "پایان خدمت"
            : jobData.militaryService === "exempt"
            ? "معاف"
            : jobData.militaryService === "not-required"
            ? "نیازی نیست"
            : "پایان خدمت",
        salary: jobData.salary || "توافقی",
        benefits: Array.isArray(jobData.benefits) ? jobData.benefits : [],
      }
    : null;

  if (loading) {
    return (
      <div
        className="bg-[#121212] min-h-screen text-white font-sans flex items-center justify-center"
        dir="rtl"
      >
        <div className="text-yellow-400 text-xl">در حال بارگذاری...</div>
      </div>
    );
  }

  if (!jobData) {
    return (
      <div
        className="bg-[#121212] min-h-screen text-white font-sans flex items-center justify-center"
        dir="rtl"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">
            آگهی یافت نشد
          </h1>
          <p className="text-gray-400">
            آگهی مورد نظر موجود نیست یا حذف شده است.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#121212] min-h-screen text-white font-sans" dir="rtl">
      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* --- Header Section --- */}
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500">
            {jobData ? `استخدام ${jobData.title}` : "عنوان آگهی"}
          </h1>
          <div className="flex items-center justify-center gap-x-6 text-gray-400 text-lg">
            <div className="flex items-center gap-x-2">
              <Briefcase size={20} className="text-yellow-400" />
              <span>{jobData ? jobData.company : "نام شرکت"}</span>
            </div>
            <div className="flex items-center gap-x-2">
              <MapPin size={20} className="text-yellow-400" />
              <span>{jobData ? jobData.location : "محل کار"}</span>
            </div>
          </div>
        </header>

        {/* --- Job Details Grid --- */}
        <section className="mb-12 md:mb-20">
          <h2 className="text-2xl font-bold text-right mb-6 border-r-4 border-yellow-400 pr-4">
            مشخصات کلی آگهی
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <DetailItem icon={User} label="جنسیت" value={jobDetails?.gender} />
            <DetailItem
              icon={FileText}
              label="نوع قرارداد"
              value={jobDetails?.contractType}
            />
            <DetailItem
              icon={GraduationCap}
              label="مدرک تحصیلی"
              value={jobDetails?.education}
            />
            <DetailItem
              icon={Calendar}
              label="سابقه کاری"
              value={jobDetails?.experience}
            />
            <DetailItem
              icon={ShieldCheck}
              label="وضعیت سربازی"
              value={jobDetails?.militaryService}
            />
            <DetailItem
              icon={DollarSign}
              label="حقوق"
              value={jobDetails?.salary}
            />
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* --- Left Column: Description & Benefits --- */}
          <div className="lg:col-span-2">
            <section className="p-8 rounded-2xl border border-gray-800">
              <h2 className="text-2xl font-bold text-right mb-6 border-r-4 border-yellow-400 pr-4">
                شرح موقعیت شغلی
              </h2>
              <div className="prose prose-invert prose-p:text-right prose-p:leading-relaxed prose-li:text-right max-w-none text-gray-300 space-y-4">
                <p>{jobData ? jobData.description : "توضیحات آگهی شغلی"}</p>
                {jobData && jobData.responsibilities && (
                  <>
                    <h3 className="text-xl font-semibold text-yellow-400 pt-4 text-right">
                      مسئولیت‌ها:
                    </h3>
                    <ul className="pr-5">
                      <li>{jobData.responsibilities}</li>
                    </ul>
                  </>
                )}
                {jobData && jobData.requirements && (
                  <>
                    <h3 className="text-xl font-semibold text-yellow-400 pt-4 text-right">
                      نیازمندی‌ها:
                    </h3>
                    <ul className="pr-5">
                      <li>{jobData.requirements}</li>
                    </ul>
                  </>
                )}
                {jobData && jobData.skills && (
                  <>
                    <h3 className="text-xl font-semibold text-yellow-400 pt-4 text-right">
                      مهارت‌های مورد نیاز:
                    </h3>
                    <ul className="pr-5">
                      <li>{jobData.skills}</li>
                    </ul>
                  </>
                )}
              </div>

              <div className="mt-10">
                <h3 className="text-xl font-bold text-right mb-5 border-r-4 border-yellow-400 pr-4">
                  مزایا و تسهیلات
                </h3>
                <div className="flex flex-wrap gap-3">
                  {jobDetails?.benefits.map((benefit, index) => (
                    <span
                      key={index}
                      className="bg-yellow-400/10 text-yellow-300 text-sm font-medium px-4 py-2 rounded-full"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* --- Right Column: Application Form --- */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 p-8 rounded-2xl border border-gray-800 shadow-lg shadow-black/20">
              <h2 className="text-2xl font-bold text-center mb-4">
                ارسال رزومه
              </h2>
              <p className="text-gray-400 text-center mb-6">
                برای این موقعیت شغلی، اطلاعات خود را وارد کنید.
              </p>

              <button 
                onClick={() => router.push("/karjoo/resume")}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-3 px-6 rounded-lg mb-6 hover:shadow-lg hover:shadow-yellow-500/20 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-x-2"
              >
                <ChevronsRight size={20} />
                <span>ارسال مستقیم رزومه از پروفایل</span>
              </button>

              <div className="flex items-center my-6">
                <div className="flex-grow border-t border-gray-700"></div>
                <span className="flex-shrink mx-4 text-gray-500 text-sm">
                  یا
                </span>
                <div className="flex-grow border-t border-gray-700"></div>
              </div>

              <form className="space-y-6">
                {/* اطلاعات پایه */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-yellow-400 border-b border-gray-700 pb-2">
                    اطلاعات پایه
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                      id="firstName"
                      label="نام"
                      placeholder="نام خود را وارد کنید"
                    />
                    <FormInput
                      id="lastName"
                      label="نام خانوادگی"
                      placeholder="نام خانوادگی خود را وارد کنید"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                      id="mobile"
                      label="شماره موبایل"
                      placeholder="09123456789"
                    />
                    <FormInput
                      id="email"
                      label="ایمیل"
                      type="email"
                      placeholder="example@email.com"
                    />
                  </div>
                  <FileUpload id="profileImage" label="آپلود عکس پروفایل" multiple={false} />
                </div>

                {/* محل سکونت */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-yellow-400 border-b border-gray-700 pb-2">
                    محل سکونت
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                      id="province"
                      label="استان"
                      placeholder="انتخاب استان"
                    />
                    <FormInput
                      id="city"
                      label="شهرستان"
                      placeholder="انتخاب شهرستان"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-300 mb-2 text-right"
                    >
                      آدرس <span className="text-yellow-400">*</span>
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      rows="3"
                      placeholder="آدرس کامل خود را وارد کنید"
                      className="w-full border border-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 placeholder-gray-500 bg-transparent"
                    ></textarea>
                  </div>
                </div>

                {/* اطلاعات شغلی */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-yellow-400 border-b border-gray-700 pb-2">
                    اطلاعات شغلی
                  </h3>
                  <FormInput
                    id="jobTitle"
                    label="عنوان شغلی"
                    placeholder="مثال: توسعه‌دهنده فرانت‌اند"
                  />
                  <FormInput
                    id="salaryAmount"
                    label="مبلغ حقوق درخواستی (تومان)"
                    placeholder="مثال: 15000000"
                  />
                </div>

                {/* سابقه کاری */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-yellow-400 border-b border-gray-700 pb-2">
                    سابقه کاری
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                      id="companyName"
                      label="نام شرکت"
                      placeholder="نام شرکت"
                    />
                    <FormInput
                      id="position"
                      label="موقعیت شغلی"
                      placeholder="عنوان شغل"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                      id="startDate"
                      label="تاریخ شروع"
                      type="date"
                    />
                    <FormInput
                      id="endDate"
                      label="تاریخ اتمام"
                      type="date"
                    />
                  </div>
                </div>

                {/* فایل‌های پورتفولیو */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-yellow-400 border-b border-gray-700 pb-2">
                    پورتفولیو و مدارک
                  </h3>
                  <FileUpload id="portfolioFiles" label="فایل‌های پورتفولیو" multiple />
                  <FileUpload id="certificates" label="مدارک و گواهینامه‌ها" multiple />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-4 px-6 rounded-lg mt-4 hover:shadow-lg hover:shadow-yellow-500/20 transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  ثبت و ارسال رزومه
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}