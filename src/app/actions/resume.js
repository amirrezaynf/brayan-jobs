"use server";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://imocc.iracode.com/api/v1";

/**
 * ایجاد رزومه کامل با API جدید
 * @param {FormData} formData - داده‌های فرم شامل فایل‌ها
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
export async function createCompleteResume(formData) {
  console.log("🚀 شروع createCompleteResume");

  try {
    // دریافت token از localStorage (در client-side)
    const authToken = formData.get("authToken");
    if (!authToken) {
      console.error("❌ Token یافت نشد");
      return {
        success: false,
        error: "لطفاً ابتدا وارد حساب کاربری خود شوید",
      };
    }

    console.log("✅ Token دریافت شد");

    // ساخت URL
    const url = `${API_BASE_URL}/resume/create-resume`;
    console.log("🌐 URL:", url);

    // ارسال درخواست
    console.log("📤 ارسال درخواست به API...");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        // Content-Type را تنظیم نمی‌کنیم تا browser خودش multipart/form-data تنظیم کند
      },
      body: formData,
      timeout: 30000, // 30 second timeout
    });

    console.log("📥 پاسخ دریافت شد - Status:", response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("❌ خطا در API:", errorData);

      if (response.status === 401) {
        return {
          success: false,
          error: "احراز هویت نامعتبر است. لطفاً دوباره وارد شوید",
        };
      }

      if (response.status === 422) {
        return {
          success: false,
          error: errorData.message || "داده‌های ارسالی نامعتبر است",
          validationErrors: errorData.errors,
        };
      }

      return {
        success: false,
        error: errorData.message || "خطا در ایجاد رزومه",
      };
    }

    const result = await response.json();
    console.log("✅ رزومه با موفقیت ایجاد شد");

    return {
      success: true,
      data: result.data,
      message: result.message || "رزومه با موفقیت ایجاد شد",
    };
  } catch (error) {
    console.error("❌ خطا در createCompleteResume:", error);

    if (error.name === "AbortError") {
      return {
        success: false,
        error: "درخواست منقضی شد. لطفاً دوباره تلاش کنید",
      };
    }

    return {
      success: false,
      error: "خطا در اتصال به سرور. لطفاً اتصال اینترنت خود را بررسی کنید",
    };
  }
}

/**
 * تبدیل داده‌های فرم به فرمت API
 * @param {Object} resumeData - داده‌های رزومه از فرم
 * @returns {Promise<FormData>} - FormData آماده برای ارسال
 */
export async function prepareResumeFormData(resumeData) {
  console.log("🔄 شروع prepareResumeFormData");

  const formData = new FormData();

  try {
    // Basic Info
    if (resumeData.basicInfo) {
      console.log("📝 اضافه کردن basic_info");
      const basicInfo = {
        name: resumeData.basicInfo.firstName || "",
        family: resumeData.basicInfo.lastName || "",
        email: resumeData.basicInfo.email || "",
        mobile: resumeData.basicInfo.mobile || "",
      };
      formData.append("basic_info", JSON.stringify(basicInfo));
    }

    // Address
    if (resumeData.residence) {
      console.log("📍 اضافه کردن address");
      const address = {
        province_id: resumeData.residence.province
          ? parseInt(resumeData.residence.province)
          : null,
        city_id: resumeData.residence.city
          ? parseInt(resumeData.residence.city)
          : null,
        address: resumeData.residence.address || "",
      };
      formData.append("address", JSON.stringify(address));
    }

    // Job Info
    if (resumeData.jobInfo) {
      console.log("💼 اضافه کردن job_info");
      const jobInfo = {
        current_job_title: resumeData.jobInfo.jobTitle || "",
        current_company: "", // این فیلد در فرم فعلی نیست
        job_status: "unemployed", // پیش‌فرض
        expected_salary_min:
          resumeData.jobInfo.salaryType === "amount"
            ? parseInt(resumeData.jobInfo.salaryAmount) || 0
            : 0,
        expected_salary_max:
          resumeData.jobInfo.salaryType === "amount"
            ? parseInt(resumeData.jobInfo.salaryAmount) || 0
            : 0,
        is_remote_ok: true,
        is_available_for_hire: true,
      };
      formData.append("job_info", JSON.stringify(jobInfo));
    }

    // Work Experiences
    if (resumeData.workExperiences && resumeData.workExperiences.length > 0) {
      console.log("🏢 اضافه کردن work_experiences");
      const workExperiences = resumeData.workExperiences
        .filter((exp) => exp.companyName && exp.position)
        .map((exp) => ({
          job_title: exp.position,
          company_name: exp.companyName,
          start_date: exp.startDate,
          end_date: exp.currentJob ? null : exp.endDate,
          is_current_job: exp.currentJob || false,
          job_description: exp.responsibilities || "",
        }));
      formData.append("work_experiences", JSON.stringify(workExperiences));
    }

    // Skills
    if (resumeData.skills && resumeData.skills.length > 0) {
      console.log("🎯 اضافه کردن skills");
      const skills = resumeData.skills
        .filter((skill) => skill.skillName)
        .map((skill) => ({
          skill_name: skill.skillName,
          proficiency_level: skill.proficiency || "متوسط",
        }));
      formData.append("skills", JSON.stringify(skills));
    }

    // Languages
    if (resumeData.languages && resumeData.languages.length > 0) {
      console.log("🌍 اضافه کردن languages");
      const languages = resumeData.languages
        .filter((lang) => lang.language)
        .map((lang) => ({
          language: lang.language,
          proficiency_level: lang.proficiency || "متوسط",
        }));
      formData.append("languages", JSON.stringify(languages));
    }

    // Additional Description
    if (resumeData.additionalInfo) {
      console.log("📄 اضافه کردن additional_description");
      formData.append("additional_description", resumeData.additionalInfo);
    }

    // Profile Photo
    if (resumeData.profileImage && resumeData.profileImage.length > 0) {
      console.log("📸 اضافه کردن profile_photo");
      formData.append("profile_photo", resumeData.profileImage[0]);
    }

    // Documents
    if (resumeData.documents && resumeData.documents.length > 0) {
      console.log("📋 اضافه کردن documents_certificates");
      resumeData.documents.forEach((doc, index) => {
        formData.append("documents_certificates[]", doc);
      });
    }

    console.log("✅ FormData آماده شد");
    return formData;
  } catch (error) {
    console.error("❌ خطا در prepareResumeFormData:", error);
    throw error;
  }
}
