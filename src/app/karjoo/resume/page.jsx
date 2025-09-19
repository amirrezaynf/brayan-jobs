"use client";

import { useState, useRef } from "react";
import {
  UserCircle2,
  Briefcase,
  MapPin,
  Award,
  Languages,
  FileText,
  UploadCloud,
  Plus,
  Trash2,
  Link as LinkIcon,
  Send,
} from "lucide-react";
import CustomSelect from "@/components/ui/select/CustomSelect";
import CustomInput from "@/components/ui/input/CustomInput";
import KarjooDashboard from "@/components/modules/karjoo/KarjooDashboard";
import KarjooMobileMenu from "@/components/layout/header/KarjooMobileMenu";
import KarjooHeader from "@/components/layout/header/KarjooHeader";

// ====================================================================
// کامپوننت‌های اختصاصی (برای سادگی در همین فایل قرار داده شده‌اند)
// ====================================================================


// کامپوننت آپلود فایل
const FileUploadZone = ({ label, files, setFiles, multiple = true }) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const newFiles = Array.from(e.dataTransfer.files);
    updateFiles(newFiles);
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    updateFiles(newFiles);
  };

  const updateFiles = (newFiles) => {
    if (multiple) {
      const allFiles = [...files, ...newFiles];
      const uniqueFiles = allFiles.filter(
        (file, index, self) =>
          index ===
          self.findIndex((f) => f.name === file.name && f.size === file.size)
      );
      setFiles(uniqueFiles);
    } else {
      setFiles(newFiles.slice(0, 1));
    }
  };

  const removeFile = (indexToRemove) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-400 mb-2">
        {label}
      </label>
      <div
        onClick={() => inputRef.current?.click()}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`relative flex flex-col justify-center items-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
          isDragging
            ? "border-yellow-500 bg-yellow-500/10"
            : "border-gray-700 hover:border-yellow-500 hover:bg-yellow-500/5"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          className="absolute w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange}
        />
        <div className="text-center text-gray-500">
          <UploadCloud className="w-10 h-10 mx-auto" />
          <p className="mt-2 text-sm">فایل‌ها را اینجا بکشید یا کلیک کنید</p>
        </div>
      </div>
      <div className="mt-3 space-y-2">
        {files.map((file, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 bg-gray-800 rounded-md"
          >
            <span className="text-sm text-gray-300 truncate">{file.name}</span>
            <button
              type="button"
              onClick={() => removeFile(index)}
              className="p-1 text-red-500 hover:bg-red-500/20 rounded-full"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// ====================================================================
// کامپوننت اصلی صفحه
// ====================================================================

export default function ResumePage() {
  // اطلاعات پایه
  const [basicInfo, setBasicInfo] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
  });
  const [profileImage, setProfileImage] = useState([]);

  // محل سکونت
  const [residence, setResidence] = useState({
    province: "",
    city: "",
    address: "",
  });

  // اطلاعات شغلی
  const [jobInfo, setJobInfo] = useState({
    jobTitle: "",
    showSalary: false,
    salaryType: "agreement", // "agreement" or "amount"
    salaryAmount: "",
  });

  // سوابق کاری
  const [workExperiences, setWorkExperiences] = useState([
    {
      companyName: "",
      position: "",
      startDate: "",
      endDate: "",
      currentJob: false,
      responsibilities: "",
    },
  ]);

  // مهارت‌ها
  const [skills, setSkills] = useState([{ skillName: "", proficiency: "" }]);

  // زبان‌های خارجی
  const [languages, setLanguages] = useState([
    { language: "", proficiency: "" },
  ]);

  // مدارک و گواهینامه‌ها
  const [certificates, setCertificates] = useState([
    {
      title: "",
      issuer: "",
      certificateNumber: "",
      link: "",
      issueDate: "",
      expiryDate: "",
      noExpiry: false,
      description: "",
    },
  ]);

  // نمونه کار
  const [portfolioFiles, setPortfolioFiles] = useState([]);
  const [portfolioLink, setPortfolioLink] = useState("");

  // آپشن‌ها برای سلکت‌ها
  const provinces = [
    "تهران",
    "اصفهان",
    "فارس",
    "خراسان رضوی",
    "آذربایجان شرقی",
    "خوزستان",
    "مازندران",
  ];
  const cities = {
    تهران: ["تهران", "ورامین", "شهریار", "ری"],
    اصفهان: ["اصفهان", "کاشان", "نجف‌آباد", "خمینی‌شهر"],
    فارس: ["شیراز", "مرودشت", "کازرون", "لار"],
  };
  const proficiencyLevels = ["مبتدی", "متوسط", "پیشرفته", "حرفه‌ای"];
  const foreignLanguages = [
    "انگلیسی",
    "عربی",
    "فرانسوی",
    "آلمانی",
    "اسپانیایی",
    "ترکی",
    "روسی",
  ];

  // هندلرها
  const handleBasicInfoChange = (field, value) => {
    setBasicInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleResidenceChange = (field, value) => {
    setResidence((prev) => ({ ...prev, [field]: value }));
    if (field === "province") {
      setResidence((prev) => ({ ...prev, city: "" }));
    }
  };

  const handleJobInfoChange = (field, value) => {
    setJobInfo((prev) => ({ ...prev, [field]: value }));
  };

  // توابع عمومی برای مدیریت آرایه‌ها
  const addItem = (setter, newItem) => setter((prev) => [...prev, newItem]);
  const removeItem = (setter, index) =>
    setter((prev) => prev.filter((_, i) => i !== index));
  const updateItem = (setter, index, field, value) => {
    setter((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      // منطق‌های خاص برای چک‌باکس‌ها
      if (field === "currentJob" && value) updated[index].endDate = "";
      if (field === "noExpiry" && value) updated[index].expiryDate = "";
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const resumeData = {
      basicInfo,
      profileImage,
      residence,
      jobInfo,
      workExperiences,
      skills,
      languages,
      certificates,
      portfolioFiles,
      portfolioLink,
    };
    console.log("Resume Data:", resumeData);
    alert("رزومه شما با موفقیت ارسال شد! (اطلاعات در کنسول نمایش داده شده)");
  };

  return (
    <div
      className="bg-black/90 text-gray-200 font-['Vazirmatn'] min-h-screen"
      dir="rtl"
    >
      <KarjooHeader />
      <div className="  container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto border border-gray-700  rounded-xl shadow-lg shadow-yellow-500/10 overflow-hidden">
          <div className="px-6 py-8 sm:px-10">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white">
                رزومه ساز برایان
              </h1>
              <p className="mt-2 text-lg text-gray-400">فرم ثبت رزومه کامل</p>
              <div className="mt-4 w-24 h-1 bg-yellow-500 mx-auto rounded"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* اطلاعات پایه */}
              <section className="border-b border-gray-800 pb-6">
                <h2 className="text-xl font-semibold text-gray-100 mb-4 flex items-center">
                  <UserCircle2 className="w-6 h-6 ml-2 text-yellow-500" />
                  اطلاعات پایه
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      نام
                    </label>
                    <CustomInput
                      placeholder="نام خود را وارد کنید"
                      value={basicInfo.firstName}
                      onChange={(e) =>
                        handleBasicInfoChange("firstName", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      نام خانوادگی
                    </label>
                    <CustomInput
                      placeholder="نام خانوادگی خود را وارد کنید"
                      value={basicInfo.lastName}
                      onChange={(e) =>
                        handleBasicInfoChange("lastName", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      شماره موبایل
                    </label>
                    <CustomInput
                      placeholder="09123456789"
                      value={basicInfo.mobile}
                      onChange={(e) =>
                        handleBasicInfoChange("mobile", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      ایمیل
                    </label>
                    <CustomInput
                      type="email"
                      placeholder="example@email.com"
                      value={basicInfo.email}
                      onChange={(e) =>
                        handleBasicInfoChange("email", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <FileUploadZone
                    label="آپلود عکس پروفایل"
                    files={profileImage}
                    setFiles={setProfileImage}
                    multiple={false}
                  />
                </div>
              </section>

              {/* محل سکونت */}
              <section className="border-b border-gray-800 pb-6">
                <h2 className="text-xl font-semibold text-gray-100 mb-4 flex items-center">
                  <MapPin className="w-6 h-6 ml-2 text-yellow-500" />
                  محل سکونت
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      استان
                    </label>
                    <CustomSelect
                      options={provinces}
                      value={residence.province}
                      onChange={(value) =>
                        handleResidenceChange("province", value)
                      }
                      placeholder="انتخاب استان"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      شهرستان
                    </label>
                    <CustomSelect
                      options={cities[residence.province] || []}
                      value={residence.city}
                      onChange={(value) => handleResidenceChange("city", value)}
                      placeholder="انتخاب شهرستان"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    آدرس
                  </label>
                  <textarea
                    value={residence.address}
                    onChange={(e) =>
                      handleResidenceChange("address", e.target.value)
                    }
                    className="w-full p-3 rounded-lg bg-[#2a2a2a] border border-[#444] focus:border-yellow-500 focus:ring-yellow-500 transition placeholder:text-gray-400 text-white"
                    placeholder="آدرس کامل خود را وارد کنید"
                    rows="3"
                  />
                </div>
              </section>

              {/* اطلاعات شغلی */}
              <section className="border-b border-gray-800 pb-6">
                <h2 className="text-xl font-semibold text-gray-100 mb-4 flex items-center">
                  <Briefcase className="w-6 h-6 ml-2 text-yellow-500" />
                  اطلاعات شغلی
                </h2>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    عنوان شغلی
                  </label>
                  <CustomInput
                    placeholder="مثال: توسعه‌دهنده فرانت‌اند"
                    value={jobInfo.jobTitle}
                    onChange={(e) =>
                      handleJobInfoChange("jobTitle", e.target.value)
                    }
                  />
                </div>

                <div className="mb-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={jobInfo.showSalary}
                      onChange={(e) =>
                        handleJobInfoChange("showSalary", e.target.checked)
                      }
                      className="sr-only peer"
                    />
                    <div className="relative w-12 h-6 rounded-full bg-gray-600 peer-checked:bg-yellow-500 transition-colors">
                      <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
                    </div>
                    <span className="mr-3 text-gray-300">
                      نمایش حقوق درخواستی
                    </span>
                  </label>
                </div>

                {jobInfo.showSalary && (
                  <div className="space-y-4 p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex gap-6">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="salaryType"
                          value="agreement"
                          checked={jobInfo.salaryType === "agreement"}
                          onChange={(e) =>
                            handleJobInfoChange("salaryType", e.target.value)
                          }
                          className="w-4 h-4 text-yellow-500 border-gray-600 focus:ring-yellow-500"
                        />
                        <span className="mr-2 text-gray-300">توافقی</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="salaryType"
                          value="amount"
                          checked={jobInfo.salaryType === "amount"}
                          onChange={(e) =>
                            handleJobInfoChange("salaryType", e.target.value)
                          }
                          className="w-4 h-4 text-yellow-500 border-gray-600 focus:ring-yellow-500"
                        />
                        <span className="mr-2 text-gray-300">درج مبلغ</span>
                      </label>
                    </div>
                    {jobInfo.salaryType === "amount" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          مبلغ حقوق درخواستی (تومان)
                        </label>
                        <CustomInput
                          placeholder="مثال: 15000000"
                          value={jobInfo.salaryAmount}
                          onChange={(e) =>
                            handleJobInfoChange("salaryAmount", e.target.value)
                          }
                        />
                      </div>
                    )}
                  </div>
                )}
              </section>

              {/* سوابق کاری */}
              <section>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-100 flex items-center">
                    <Briefcase className="w-6 h-6 ml-2 text-yellow-500" />
                    سوابق کاری
                  </h2>
                  <button
                    type="button"
                    onClick={() =>
                      addItem(setWorkExperiences, {
                        companyName: "",
                        position: "",
                        startDate: "",
                        endDate: "",
                        currentJob: false,
                        responsibilities: "",
                      })
                    }
                    className="flex items-center px-3 py-2 bg-yellow-500/80 text-gray-900 rounded-lg hover:bg-yellow-500 transition text-sm font-bold"
                  >
                    <Plus className="w-4 h-4 ml-1" />
                    افزودن
                  </button>
                </div>
                {workExperiences.map((exp, index) => (
                  <div
                    key={index}
                    className="mb-4 p-4 border border-gray-700 rounded-lg relative"
                  >
                    {workExperiences.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem(setWorkExperiences, index)}
                        className="absolute top-2 left-2 text-red-500 hover:bg-red-500/20 p-1 rounded-full"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          نام شرکت
                        </label>
                        <CustomInput
                          placeholder="نام شرکت"
                          value={exp.companyName}
                          onChange={(e) =>
                            updateItem(
                              setWorkExperiences,
                              index,
                              "companyName",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          موقعیت شغلی
                        </label>
                        <CustomInput
                          placeholder="عنوان شغل"
                          value={exp.position}
                          onChange={(e) =>
                            updateItem(
                              setWorkExperiences,
                              index,
                              "position",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          تاریخ شروع
                        </label>
                        <CustomInput
                          type="date"
                          value={exp.startDate}
                          onChange={(e) =>
                            updateItem(
                              setWorkExperiences,
                              index,
                              "startDate",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          تاریخ اتمام
                        </label>
                        <CustomInput
                          type="date"
                          value={exp.endDate}
                          onChange={(e) =>
                            updateItem(
                              setWorkExperiences,
                              index,
                              "endDate",
                              e.target.value
                            )
                          }
                          disabled={exp.currentJob}
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={exp.currentJob}
                          onChange={(e) =>
                            updateItem(
                              setWorkExperiences,
                              index,
                              "currentJob",
                              e.target.checked
                            )
                          }
                          className="w-4 h-4 text-yellow-500 border-gray-600 focus:ring-yellow-500"
                        />
                        <span className="mr-2 text-gray-300">
                          هنوز در این شرکت مشغولم
                        </span>
                      </label>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        شرح وظایف
                      </label>
                      <textarea
                        value={exp.responsibilities}
                        onChange={(e) =>
                          updateItem(
                            setWorkExperiences,
                            index,
                            "responsibilities",
                            e.target.value
                          )
                        }
                        className="w-full p-3 rounded-lg bg-[#2a2a2a] border border-[#444] focus:border-yellow-500 transition placeholder:text-gray-400"
                        placeholder="شرح وظایف و مسئولیت‌ها..."
                        rows="3"
                      />
                    </div>
                  </div>
                ))}
              </section>

              {/* دکمه ارسال */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full flex justify-center items-center bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-yellow-400 transition-transform transform hover:scale-105"
                >
                  <Send className="w-5 h-5 ml-2" />
                  ارسال رزومه
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
