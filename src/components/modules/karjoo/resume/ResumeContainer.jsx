"use client";

import { useState } from "react";
import ResumeHeader from "./ResumeHeader";
import ResumeBasicInfo from "./ResumeBasicInfo";
import ResumeResidence from "./ResumeResidence";
import ResumeJobInfo from "./ResumeJobInfo";
import ResumeWorkExperience from "./ResumeWorkExperience";
import ResumeSkills from "./ResumeSkills";
import ResumeLanguages from "./ResumeLanguages";
import ResumeAdditionalInfo from "./ResumeAdditionalInfo";
import ResumeDocuments from "./ResumeDocuments";
import { Send, Loader2 } from "lucide-react";
import {
  createCompleteResume,
  prepareResumeFormData,
} from "../../../../app/actions/resume";

export default function ResumeContainer() {
  // States برای loading و error handling
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

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

  // توضیحات تکمیلی
  const [additionalInfo, setAdditionalInfo] = useState("");

  // مدارک و گواهینامه‌ها (فایل‌ها)
  const [documents, setDocuments] = useState([]);

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

  const handleAdditionalInfoChange = (value) => {
    setAdditionalInfo(value);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🚀 شروع ارسال فرم");

    // پاک کردن پیام‌های قبلی
    setSubmitError("");
    setSubmitSuccess("");
    setIsSubmitting(true);

    try {
      // جمع‌آوری داده‌های فرم
      const resumeData = {
        basicInfo,
        profileImage,
        residence,
        jobInfo,
        workExperiences,
        skills,
        languages,
        certificates,
        portfolioLink,
        portfolioFiles,
        additionalInfo,
        documents,
      };

      console.log("📊 داده‌های فرم:", resumeData);

      // تبدیل به FormData
      const formData = await prepareResumeFormData(resumeData);

      // دریافت token از localStorage
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        throw new Error("لطفاً ابتدا وارد حساب کاربری خود شوید");
      }

      // اضافه کردن token به FormData
      formData.append("authToken", authToken);

      console.log("📤 ارسال به API...");

      // ارسال به API
      const result = await createCompleteResume(formData);

      if (result.success) {
        console.log("✅ رزومه با موفقیت ایجاد شد");
        setSubmitSuccess(result.message || "رزومه شما با موفقیت ایجاد شد!");

        // پاک کردن فرم بعد از 3 ثانیه
        setTimeout(() => {
          // می‌توانید فرم را reset کنید یا کاربر را redirect کنید
          console.log("🔄 فرم آماده برای استفاده مجدد");
        }, 3000);
      } else {
        console.error("❌ خطا در ایجاد رزومه:", result.error);
        setSubmitError(result.error || "خطا در ایجاد رزومه");

        // نمایش خطاهای validation اگر وجود دارد
        if (result.validationErrors) {
          console.error("🔍 خطاهای validation:", result.validationErrors);
        }
      }
    } catch (error) {
      console.error("❌ خطا در handleSubmit:", error);
      setSubmitError(
        error.message || "خطا در ارسال رزومه. لطفاً دوباره تلاش کنید"
      );
    } finally {
      setIsSubmitting(false);
      console.log("🏁 پایان ارسال فرم");
    }
  };

  return (
    <div className="text-gray-200 font-['Vazirmatn'] min-h-screen" dir="rtl">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto border border-gray-700 rounded-xl shadow-lg shadow-yellow-500/10 overflow-hidden">
          <div className="px-6 py-8 sm:px-10">
            {/* Header */}
            <ResumeHeader />

            {/* نمایش پیام‌های موفقیت و خطا */}
            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-900/20 border border-green-500/30 rounded-lg text-green-400">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full ml-3"></div>
                  {submitSuccess}
                </div>
              </div>
            )}

            {submitError && (
              <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-400 rounded-full ml-3"></div>
                  {submitError}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* اطلاعات پایه */}
              <ResumeBasicInfo
                basicInfo={basicInfo}
                profileImage={profileImage}
                handleBasicInfoChange={handleBasicInfoChange}
                setProfileImage={setProfileImage}
              />

              {/* محل سکونت */}
              <ResumeResidence
                residence={residence}
                handleResidenceChange={handleResidenceChange}
              />

              {/* اطلاعات شغلی */}
              <ResumeJobInfo
                jobInfo={jobInfo}
                handleJobInfoChange={handleJobInfoChange}
              />

              {/* سوابق کاری */}
              <ResumeWorkExperience
                workExperiences={workExperiences}
                addItem={addItem}
                removeItem={removeItem}
                updateItem={updateItem}
                setWorkExperiences={setWorkExperiences}
              />

              {/* مهارت‌ها */}
              <ResumeSkills
                skills={skills}
                addItem={addItem}
                removeItem={removeItem}
                updateItem={updateItem}
                setSkills={setSkills}
              />

              {/* زبان‌های خارجی */}
              <ResumeLanguages
                languages={languages}
                addItem={addItem}
                removeItem={removeItem}
                updateItem={updateItem}
                setLanguages={setLanguages}
              />

              {/* توضیحات تکمیلی */}
              <ResumeAdditionalInfo
                additionalInfo={additionalInfo}
                handleAdditionalInfoChange={handleAdditionalInfoChange}
              />

              {/* مدارک و گواهینامه‌ها */}
              <ResumeDocuments
                documents={documents}
                setDocuments={setDocuments}
              />

              {/* دکمه ارسال */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center items-center bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-yellow-400 transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                      در حال ارسال...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 ml-2" />
                      ارسال رزومه
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
