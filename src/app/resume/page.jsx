"use client";

import { useState, useRef } from "react";
import {
  UserCircle2,
  Briefcase,
  Paperclip,
  UploadCloud,
  Award,
  Send,
  Trash2,
  ChevronDown,
} from "lucide-react";

// کامپوننت اختصاصی برای بخش آپلود فایل
const FileUploadZone = ({
  id,
  label,
  acceptedFormats,
  files,
  setFiles,
  icon: Icon,
}) => {
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
    const allFiles = [...files, ...newFiles];
    const uniqueFiles = allFiles.filter(
      (file, index, self) =>
        index ===
        self.findIndex((f) => f.name === file.name && f.size === file.size)
    );
    setFiles(uniqueFiles);
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
            ? "border-yellow-500 "
            : "border-gray-700 hover:border-yellow-500 hover:/50"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          id={id}
          multiple
          className="absolute w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange}
        />
        <div className="text-center text-gray-500">
          <Icon className="w-10 h-10 mx-auto text-gray-500" />
          <p className="mt-2">فایل‌ها را اینجا بکشید یا کلیک کنید</p>
          <p className="text-xs mt-1">{`فرمت‌های مجاز: ${acceptedFormats}`}</p>
        </div>
      </div>
      <div className="mt-3 space-y-2">
        {files.map((file, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2  rounded-md"
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

export default function ResumePage() {
  const [formData, setFormData] = useState({
    fullName: "",
    birthDate: "",
    nationalId: "",
    location: "",
    fieldOfWork: "",
    workExperience: "",
    education: "",
    description: "",
  });

  const [projectFiles, setProjectFiles] = useState([]);
  const [certificateFiles, setCertificateFiles] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSubmit = new FormData();
    for (const key in formData) {
      dataToSubmit.append(key, formData[key]);
    }
    projectFiles.forEach((file) => {
      dataToSubmit.append("projects", file);
    });
    certificateFiles.forEach((file) => {
      dataToSubmit.append("certificates", file);
    });

    console.log(
      "داده‌های آماده برای ارسال:",
      Object.fromEntries(dataToSubmit.entries())
    );
    alert("رزومه شما با موفقیت ارسال شد! (شبیه‌سازی)");
  };

  return (
    <div className="bg-black/90 text-gray-200 font-['Vazirmatn']" dir="rtl">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto border border-gray-700 rounded-xl shadow-lg shadow-yellow-500/10 overflow-hidden">
          <div className="px-6 py-8 sm:px-10">
            {/* Header Section */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white">
                اعتماد دکتر برایان
              </h1>
              <p className="mt-2 text-lg text-gray-400">فرم ثبت رزومه</p>
              <div className="mt-4 w-24 h-1 bg-yellow-500 mx-auto rounded"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Section: Personal Information */}
              <div className="border-b border-gray-800 pb-6">
                <h2 className="text-xl font-semibold text-gray-100 mb-4 flex items-center">
                  <UserCircle2 className="w-6 h-6 ml-2 text-yellow-500" />
                  اطلاعات فردی
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-400 mb-1"
                    >
                      نام و نام خانوادگی
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-2  border border-gray-700 text-white rounded-lg focus:ring-yellow-500 focus:border-yellow-500 transition placeholder-gray-500"
                      placeholder="مثال: مریم رضایی"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="birthDate"
                      className="block text-sm font-medium text-gray-400 mb-1"
                    >
                      تاریخ تولد
                    </label>
                    <input
                      type="text"
                      id="birthDate"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleChange}
                      className="w-full px-4 py-2  border border-gray-700 text-white rounded-lg focus:ring-yellow-500 focus:border-yellow-500 transition placeholder-gray-500"
                      placeholder="مثال: ۱۳۷۵/۰۴/۱۵"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="nationalId"
                      className="block text-sm font-medium text-gray-400 mb-1"
                    >
                      کد ملی
                    </label>
                    <input
                      type="text"
                      id="nationalId"
                      name="nationalId"
                      value={formData.nationalId}
                      onChange={handleChange}
                      className="w-full px-4 py-2  border border-gray-700 text-white rounded-lg focus:ring-yellow-500 focus:border-yellow-500 transition placeholder-gray-500"
                      placeholder="کد ملی ۱۰ رقمی خود را وارد کنید"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium text-gray-400 mb-1"
                    >
                      محل سکونت
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-4 py-2  border border-gray-700 text-white rounded-lg focus:ring-yellow-500 focus:border-yellow-500 transition placeholder-gray-500"
                      placeholder="مثال: تهران، سعادت آباد"
                    />
                  </div>
                </div>
              </div>

              {/* Section: Professional Details */}
              <div className="border-b border-gray-800 pb-6">
                <h2 className="text-xl font-semibold text-gray-100 mb-4 flex items-center">
                  <Briefcase className="w-6 h-6 ml-2 text-yellow-500" />
                  اطلاعات حرفه‌ای
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label
                      htmlFor="fieldOfWork"
                      className="block text-sm font-medium text-gray-400 mb-1"
                    >
                      حوزه کاری
                    </label>
                    <select
                      id="fieldOfWork"
                      name="fieldOfWork"
                      value={formData.fieldOfWork}
                      onChange={handleChange}
                      className="w-full appearance-none pr-10 pl-4 py-2  border border-gray-700 text-white rounded-lg focus:ring-yellow-500 focus:border-yellow-500 transition"
                    >
                      <option value="" className="bg-black/90 text-gray-400">
                        انتخاب کنید...
                      </option>
                      <option
                        value="software-development"
                        className="bg-black/90 text-gray-200"
                      >
                        توسعه نرم‌افزار
                      </option>
                      <option
                        value="ui-ux-design"
                        className="bg-black/90 text-gray-200"
                      >
                        طراحی UI/UX
                      </option>
                      <option
                        value="product-management"
                        className="bg-black/90 text-gray-200"
                      >
                        مدیریت محصول
                      </option>
                      <option
                        value="digital-marketing"
                        className="bg-black/90 text-gray-200"
                      >
                        دیجیتال مارکتینگ
                      </option>
                      <option
                        value="human-resources"
                        className="bg-black/90 text-gray-200"
                      >
                        منابع انسانی
                      </option>
                    </select>
                    <ChevronDown className="w-5 h-5 text-yellow-500 absolute left-3 top-10 pointer-events-none" />
                  </div>
                  <div className="relative">
                    <label
                      htmlFor="workExperience"
                      className="block text-sm font-medium text-gray-400 mb-1"
                    >
                      سابقه کاری
                    </label>
                    <select
                      id="workExperience"
                      name="workExperience"
                      value={formData.workExperience}
                      onChange={handleChange}
                      className="w-full appearance-none pr-10 pl-4 py-2  border border-gray-700 text-white rounded-lg focus:ring-yellow-500 focus:border-yellow-500 transition"
                    >
                      <option value="" className="bg-black/90 text-gray-400">
                        انتخاب کنید...
                      </option>
                      <option
                        value="less-than-1"
                        className="bg-black/90 text-gray-200"
                      >
                        کمتر از یک سال
                      </option>
                      <option
                        value="1-to-3"
                        className="bg-black/90 text-gray-200"
                      >
                        ۱ تا ۳ سال
                      </option>
                      <option
                        value="3-to-5"
                        className="bg-black/90 text-gray-200"
                      >
                        ۳ تا ۵ سال
                      </option>
                      <option
                        value="5-to-10"
                        className="bg-black/90 text-gray-200"
                      >
                        ۵ تا ۱۰ سال
                      </option>
                      <option
                        value="more-than-10"
                        className="bg-black/90 text-gray-200"
                      >
                        بیشتر از ۱۰ سال
                      </option>
                    </select>
                    <ChevronDown className="w-5 h-5 text-yellow-500 absolute left-3 top-10 pointer-events-none" />
                  </div>
                </div>
                <div className="mt-6">
                  <label
                    htmlFor="education"
                    className="block text-sm font-medium text-gray-400 mb-1"
                  >
                    تحصیلات
                  </label>
                  <textarea
                    id="education"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-2  border border-gray-700 text-white rounded-lg focus:ring-yellow-500 focus:border-yellow-500 transition placeholder-gray-500"
                    placeholder="آخرین مدرک تحصیلی، رشته و دانشگاه خود را ذکر کنید."
                  ></textarea>
                </div>
              </div>

              {/* Section: File Uploads */}
              <div>
                <h2 className="text-xl font-semibold text-gray-100 mb-4 flex items-center">
                  <Paperclip className="w-6 h-6 ml-2 text-yellow-500" />
                  پیوست‌ها
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FileUploadZone
                    id="projects"
                    label="پروژه‌ها"
                    acceptedFormats="PDF, DOCX, ZIP"
                    files={projectFiles}
                    setFiles={setProjectFiles}
                    icon={UploadCloud}
                  />
                  <FileUploadZone
                    id="certificates"
                    label="مدارک و گواهینامه‌ها"
                    acceptedFormats="PDF, JPG, PNG"
                    files={certificateFiles}
                    setFiles={setCertificateFiles}
                    icon={Award}
                  />
                </div>
              </div>

              {/* Section: Additional Notes */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  توضیحات تکمیلی
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2  border border-gray-700 text-white rounded-lg focus:ring-yellow-500 focus:border-yellow-500 transition placeholder-gray-500"
                  placeholder="اگر نکته دیگری لازم است، اینجا بنویسید..."
                ></textarea>
              </div>

              {/* Submit Button */}
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
