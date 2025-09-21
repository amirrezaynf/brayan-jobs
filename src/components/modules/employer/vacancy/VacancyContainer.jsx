"use client";

import { useState } from "react";
import VacancyBasicInfo from "./VacancyBasicInfo";
import VacancyDescription from "./VacancyDescription";
import VacancyRequirements from "./VacancyRequirements";
import VacancyBenefits from "./VacancyBenefits";
import { Send, X, Loader2 } from "lucide-react";
import { loadCompanyData } from "@/constants/companyData";
import { createVacancy, updateVacancy } from "@/app/action/vacancy";

export default function VacancyContainer({ onClose, editingJob, onSubmit }) {
  // State برای مدیریت خطاهای validation
  const [errors, setErrors] = useState({});
  
  // State برای loading
  const [isLoading, setIsLoading] = useState(false);

  // اطلاعات پایه
  const [basicInfo, setBasicInfo] = useState(() => {
    if (editingJob) {
      return {
        company: editingJob.company || "",
        title: editingJob.title || "",
        category: editingJob.category || "",
        type: editingJob.type || "full-time",
        salary: editingJob.salary || "",
        location: editingJob.location || "",
      };
    }

    // Pre-fill with company data for new jobs
    const companyData = loadCompanyData();
    return {
      company: companyData.companyName || "",
      title: "",
      category:
        companyData.industryType === "technology" ? "فناوری اطلاعات" : "",
      type: "full-time",
      salary: "",
      location: companyData.city
        ? `${companyData.city}, ${companyData.province}`
        : "",
    };
  });

  // مدیریت حقوق
  const [salaryInfo, setSalaryInfo] = useState(() => {
    if (editingJob) {
      // اگر آگهی در حال ویرایش است، تشخیص نوع حقوق
      const hasSalary = editingJob.salary && editingJob.salary.trim() !== "";
      return {
        salaryType: hasSalary && editingJob.salary !== "توافقی" ? "amount" : "agreement",
        salaryAmount: hasSalary && editingJob.salary !== "توافقی" ? editingJob.salary : "",
      };
    }
    
    return {
      salaryType: "amount", // پیش‌فرض روی درج مبلغ
      salaryAmount: "",
    };
  });

  // شرح شغل و الزامات
  const [description, setDescription] = useState(() => {
    if (editingJob) return editingJob.description || "";

    const companyData = loadCompanyData();
    return companyData.description
      ? `امکان همکاری با ${companyData.companyName}. ${companyData.description}`
      : "";
  });

  const [requirements, setRequirements] = useState(() => {
    if (editingJob) return editingJob.requirements || "";
    return "";
  });

  // شرایط استخدام
  const [jobRequirements, setJobRequirements] = useState(() => {
    if (editingJob) {
      return {
        gender: editingJob.gender || "both",
        education: editingJob.education || "",
        experience: editingJob.experience || "",
        militaryService: editingJob.militaryService || "",
      };
    }
    return {
      gender: "both",
      education: "",
      experience: "",
      militaryService: "",
    };
  });

  // مزایا و شرایط کاری
  const [benefits, setBenefits] = useState(() => {
    if (editingJob) return editingJob.benefits || [];

    const companyData = loadCompanyData();
    // اگر benefits از companyData آرایه string است، آن را حفظ کن
    // اگر نیست، یک آرایه با یک آیتم خالی شروع کن
    const companyBenefits = companyData.benefits || [];
    return companyBenefits.length > 0 ? companyBenefits : ["بیمه تکمیلی"];
  });

  const [workConditions, setWorkConditions] = useState(() => {
    if (editingJob) {
      return {
        workHours: editingJob.workHours || "",
        probationPeriod: editingJob.probationPeriod || "",
        insurance: editingJob.insurance || "",
        remoteWork: editingJob.remoteWork || false,
        travelRequired: editingJob.travelRequired || false,
        urgent: editingJob.urgent || false,
      };
    }
    return {
      workHours: "۹ صبح تا ۶ عصر",
      probationPeriod: "۳ ماه",
      insurance: "full",
      remoteWork: false,
      travelRequired: false,
      urgent: false,
    };
  });

  // Handlers
  const handleBasicInfoChange = (field, value) => {
    setBasicInfo((prev) => ({ ...prev, [field]: value }));
    // پاک کردن خطا وقتی کاربر شروع به تایپ می‌کند
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSalaryInfoChange = (field, value) => {
    setSalaryInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleDescriptionChange = (field, value) => {
    if (field === "description") {
      setDescription(value);
    } else if (field === "requirements") {
      setRequirements(value);
    }
    // پاک کردن خطا وقتی کاربر شروع به تایپ می‌کند
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleRequirementsChange = (field, value) => {
    setJobRequirements((prev) => ({ ...prev, [field]: value }));
  };

  const handleBenefitsChange = (field, value) => {
    if (field === "benefits") {
      setBenefits(value);
    }
  };

  const handleWorkConditionsChange = (field, value) => {
    setWorkConditions((prev) => ({ ...prev, [field]: value }));
  };

  // تابع نمایش پیام خطا
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

  // تابع validation
  const validateForm = () => {
    const newErrors = {};

    // اطلاعات پایه
    if (!basicInfo.company.trim()) {
      newErrors.company = "لطفاً نام شرکت یا سازمان خود را وارد کنید";
    }
    if (!basicInfo.title.trim()) {
      newErrors.title = "لطفاً عنوان شغل و موقعیت شغلی را وارد کنید";
    }
    if (!basicInfo.category.trim()) {
      newErrors.category = "لطفاً دسته‌بندی شغلی مناسب را انتخاب کنید";
    }
    if (!basicInfo.location.trim()) {
      newErrors.location = "لطفاً محل کار را مشخص کنید";
    }

    // شرح شغل
    if (!description.trim()) {
      newErrors.description = "لطفاً شرح کامل شغل و وظایف را بنویسید";
    }
    if (!requirements.trim()) {
      newErrors.requirements = "لطفاً شرایط و الزامات شغلی را مشخص کنید";
    }

    setErrors(newErrors);
    return { isValid: Object.keys(newErrors).length === 0, errors: newErrors };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // اجرای validation
    const validationResult = validateForm();
    if (!validationResult.isValid) {
      const errorCount = Object.keys(validationResult.errors).length;
      if (errorCount === 1) {
        showErrorMessage("❌ لطفاً فیلد ضروری که قرمز شده را تکمیل کنید");
      } else {
        showErrorMessage(`❌ لطفاً ${errorCount} فیلد ضروری  را تکمیل کنید`);
      }
      return;
    }

    setIsLoading(true);

    try {
      // تعیین مقدار حقوق بر اساس انتخاب کاربر
      let salaryValue = "";
      if (salaryInfo.salaryType === "agreement") {
        salaryValue = "توافقی";
      } else if (salaryInfo.salaryType === "amount" && salaryInfo.salaryAmount.trim()) {
        salaryValue = salaryInfo.salaryAmount.trim();
      }

      // Combine all data
      const jobData = {
        ...basicInfo,
        salary: salaryValue, // استفاده از مقدار محاسبه شده حقوق
        description,
        requirements,
        ...jobRequirements,
        benefits: benefits.filter((benefit) => benefit.trim() !== ""), // فیلتر کردن مزایای خالی
        ...workConditions,
      };

      let result;
      
      if (editingJob) {
        // Update existing vacancy
        result = await updateVacancy(editingJob.id, jobData);
      } else {
        // Create new vacancy
        result = await createVacancy(jobData);
      }

      if (result.success) {
        // Show success message
        showSuccessMessage(result.message);
        
        // Call the onSubmit callback with the result data
        if (onSubmit) {
          const responseData = {
            ...jobData,
            id: result.data?.id || editingJob?.id || Date.now(),
            status: result.data?.status || "active",
            createdAt: result.data?.created_at || editingJob?.createdAt || new Date().toISOString(),
            updatedAt: result.data?.updated_at || new Date().toISOString(),
            applicants: result.data?.applicants_count || editingJob?.applicants || 0,
            date: result.data?.created_at ? new Date(result.data.created_at).toLocaleDateString("fa-IR") : new Date().toLocaleDateString("fa-IR")
          };
          onSubmit(responseData);
        }
        
        // Close form after successful submission
        onClose();
      } else {
        // Show error message
        showErrorMessage(result.error || "خطا در ثبت آگهی");
      }
    } catch (error) {
      console.error("Error submitting vacancy:", error);
      showErrorMessage("خطا در ارتباط با سرور");
    } finally {
      setIsLoading(false);
    }
  };

  // تابع نمایش پیام موفقیت
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
    }, 4000);
  };

  return (
    <div className="bg-[#1a1a1a] rounded-xl p-6 mb-6 border border-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          {editingJob ? "ویرایش آگهی استخدام" : "ایجاد آگهی استخدام جدید"}
        </h2>
        <button
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8" noValidate>
        {/* اطلاعات پایه */}
        <VacancyBasicInfo
          basicInfo={basicInfo}
          handleBasicInfoChange={handleBasicInfoChange}
          salaryInfo={salaryInfo}
          handleSalaryInfoChange={handleSalaryInfoChange}
          errors={errors}
        />

        {/* شرح شغل */}
        <VacancyDescription
          description={description}
          requirements={requirements}
          handleDescriptionChange={handleDescriptionChange}
          errors={errors}
        />

        {/* شرایط استخدام */}
        <VacancyRequirements
          requirements={jobRequirements}
          handleRequirementsChange={handleRequirementsChange}
        />

        {/* مزایا و شرایط کاری */}
        <VacancyBenefits
          benefits={benefits}
          workConditions={workConditions}
          handleBenefitsChange={handleBenefitsChange}
          handleWorkConditionsChange={handleWorkConditionsChange}
        />

        {/* دکمه‌های عملیات */}
        <div className="flex justify-end space-x-4  pt-6 border-t border-gray-800">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            لغو
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-400 transition duration-200 flex items-center font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 ml-2 animate-spin" />
            ) : (
              <Send className="w-5 h-5 ml-2" />
            )}
            {isLoading 
              ? (editingJob ? "در حال به‌روزرسانی..." : "در حال ثبت...")
              : (editingJob ? "به‌روزرسانی آگهی" : "انتشار آگهی")
            }
          </button>
        </div>
      </form>
    </div>
  );
}
