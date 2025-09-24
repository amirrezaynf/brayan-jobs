"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import VacancyBasicInfo from "./VacancyBasicInfo";
import VacancyDescription from "./VacancyDescription";
import VacancyRequirements from "./VacancyRequirements";
import VacancyBenefits from "./VacancyBenefits";
import { Send, X, Loader2 } from "lucide-react";
import { loadCompanyData } from "@/constants/companyData";
import { createVacancyClient, updateVacancyClient } from "@/utils/vacancyAPI";

export default function VacancyContainer({ onClose, editingJob, onSubmit }) {
  const router = useRouter();
  
  // State برای مدیریت خطاهای validation
  const [errors, setErrors] = useState({});
  
  // State برای loading
  const [isLoading, setIsLoading] = useState(false);

  // اطلاعات پایه
  const [basicInfo, setBasicInfo] = useState(() => {
    if (editingJob) {
      return {
        company: editingJob.company?.display_name || editingJob.company?.name || "",
        title: editingJob.title || "",
        category: editingJob.expert_activity_field?.name || editingJob.category || "",
        type: editingJob.contract_type || editingJob.type || "full-time",
        salary: typeof editingJob.salary === 'number' ? editingJob.salary.toString() : (editingJob.salary || ""),
        location: editingJob.location_text || editingJob.location || "",
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
      // Convert salary to string if it's a number
      const salaryStr = typeof editingJob.salary === 'number' ? editingJob.salary.toString() : (editingJob.salary || "");
      const hasSalary = salaryStr && salaryStr.trim() !== "";
      return {
        salaryType: hasSalary && salaryStr !== "توافقی" ? "amount" : "agreement",
        salaryAmount: hasSalary && salaryStr !== "توافقی" ? salaryStr : "",
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
        gender: editingJob.gender_preference || editingJob.gender || "both",
        education: editingJob.min_education_level || editingJob.education || "",
        experience: editingJob.experience_level || editingJob.experience || "",
        militaryService: editingJob.military_service_status || editingJob.militaryService || "",
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
        workHours: editingJob.working_hours || editingJob.workHours || "",
        probationPeriod: editingJob.probation_period || editingJob.probationPeriod || "",
        insurance: editingJob.insurance_status || editingJob.insurance || "",
        remoteWork: editingJob.is_remote_possible || editingJob.remoteWork || false,
        travelRequired: editingJob.travel_required || editingJob.travelRequired || false,
        urgent: editingJob.is_urgent || editingJob.urgent || false,
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

    // اطلاعات پایه - Safe string checks
    if (!basicInfo.company || !basicInfo.company.trim()) {
      newErrors.company = "لطفاً نام شرکت یا سازمان خود را وارد کنید";
    }
    if (!basicInfo.title || !basicInfo.title.trim()) {
      newErrors.title = "لطفاً عنوان شغل و موقعیت شغلی را وارد کنید";
    }
    if (!basicInfo.category || !basicInfo.category.trim()) {
      newErrors.category = "لطفاً دسته‌بندی شغلی مناسب را انتخاب کنید";
    }
    if (!basicInfo.location || !basicInfo.location.trim()) {
      newErrors.location = "لطفاً محل کار را مشخص کنید";
    }

    // شرح شغل - Safe string checks
    if (!description || !description.trim()) {
      newErrors.description = "لطفاً شرح کامل شغل و وظایف را بنویسید";
    }
    if (!requirements || !requirements.trim()) {
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
      console.log("🔥 ===== FORM SUBMISSION STARTED =====");
      
      // تعیین مقدار حقوق بر اساس انتخاب کاربر
      let salaryValue = "";
      if (salaryInfo.salaryType === "agreement") {
        salaryValue = "توافقی";
      } else if (salaryInfo.salaryType === "amount" && salaryInfo.salaryAmount.trim()) {
        salaryValue = salaryInfo.salaryAmount.trim();
      }

      // Get company data for API
      const companyData = loadCompanyData();
      
      // Get auth token from localStorage for server action
      const authToken = localStorage.getItem("authToken") || localStorage.getItem("auth_token");
      
      // Combine all data
      const jobData = {
        ...basicInfo,
        salary: salaryValue, // استفاده از مقدار محاسبه شده حقوق
        description,
        requirements,
        ...jobRequirements,
        benefits: benefits.filter((benefit) => benefit.trim() !== ""), // فیلتر کردن مزایای خالی
        ...workConditions,
        // Add company_id for API
        company_id: companyData.id || 1, // Use company ID from localStorage or default
        // Pass auth token to server action
        _authToken: authToken,
      };

      console.log("📦 Job data to submit:", jobData);

      let result;
      
      if (editingJob) {
        console.log("🔄 Updating existing vacancy:", editingJob.id);
        result = await updateVacancyClient(editingJob.id, jobData);
      } else {
        console.log("🆕 Creating new vacancy");
        result = await createVacancyClient(jobData);
      }

      console.log("📡 API Result:", result);

      if (result.success) {
        console.log("✅ Submission successful!");
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
        
        // Redirect to job advertisements page after successful creation
        if (!editingJob) {
          setTimeout(() => {
            router.push("/advertisements");
          }, 2000); // Wait 2 seconds to show success message
        }
      } else {
        console.error("❌ Submission failed:", result.error);
        // Show error message
        showErrorMessage(result.error || "خطا در ثبت آگهی");
      }
    } catch (error) {
      console.error("💥 Exception during submission:", error);
      console.error("💥 Error details:", {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
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
        <div className="flex items-center gap-3">
          {editingJob ? (
            <div className="flex items-center gap-3">
              <div className="bg-blue-500/20 p-2 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">ویرایش آگهی استخدام</h2>
                <p className="text-sm text-blue-400 mt-1">
                  در حال ویرایش: {editingJob.title || "آگهی انتخاب شده"}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="bg-yellow-400/20 p-2 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-yellow-400"
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
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">ایجاد آگهی استخدام جدید</h2>
                <p className="text-sm text-gray-400 mt-1">
                  اطلاعات آگهی شغلی خود را وارد کنید
                </p>
              </div>
            </div>
          )}
        </div>
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
