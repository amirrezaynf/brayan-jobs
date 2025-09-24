"use client";

// Client-side API functions for vacancy management - FIXED VERSION
const API_BASE_URL = "/api/proxy/job-advertisements"; // Use local proxy to avoid CORS

// Get company ID from localStorage or user profile
function getCompanyIdFromStorage() {
  try {
    // Try to get from user profile first
    const userProfile = JSON.parse(localStorage.getItem("userProfile") || "{}");
    if (userProfile.company_id) {
      console.log("🏢 Found company_id in userProfile:", userProfile.company_id);
      return userProfile.company_id;
    }
    
    // Try to get from company data
    const companyData = JSON.parse(localStorage.getItem("companyData") || "{}");
    if (companyData.id) {
      console.log("🏢 Found company_id in companyData:", companyData.id);
      return companyData.id;
    }
    
    // Try to get from auth user data
    const authUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (authUser.company_id) {
      console.log("🏢 Found company_id in user data:", authUser.company_id);
      return authUser.company_id;
    }
    
    console.warn("⚠️ No company_id found in localStorage, this will likely cause a 400 error");
    return null; // This will cause API validation error
  } catch (error) {
    console.error("❌ Error getting company_id from storage:", error);
    return null;
  }
}

// Map industry/category to activity field ID
function mapIndustryToActivityField(category) {
  const industryMap = {
    "فناوری اطلاعات": 1,
    "بانکداری و مالی": 2,
    "مهندسی": 3,
    "پزشکی و درمان": 4,
    "آموزش": 5,
    "بازاریابی و فروش": 6,
    "منابع انسانی": 7,
    "حقوقی": 8,
    "طراحی و گرافیک": 9,
    "ساخت و تولید": 10,
    // English mappings
    "technology": 1,
    "finance": 2,
    "engineering": 3,
    "healthcare": 4,
    "education": 5,
    "marketing": 6,
    "hr": 7,
    "legal": 8,
    "design": 9,
    "manufacturing": 10
  };
  
  const fieldId = industryMap[category] || 2; // Default to Banking/Finance (more likely to exist)
  console.log(`🎯 Mapped category "${category}" to activity field ID: ${fieldId}`);
  return fieldId;
}

// Data mapping functions طبق مستندات API
function mapFormDataToAPI(formData) {
  console.log("🔄 Mapping form data to API format:", formData);
  
  // Map contract type
  const contractTypeMap = {
    "full-time": "full-time",
    "part-time": "part-time", 
    "contract": "contract",
    "internship": "internship",
    "freelance": "freelance",
    "تمام وقت": "full-time",
    "پاره وقت": "part-time",
    "قراردادی": "contract", 
    "کارآموزی": "internship",
    "فریلنسر": "freelance"
  };

  // Map experience level
  const experienceMap = {
    "fresh": "fresh",
    "1-2": "1-2",
    "2-5": "2-5", 
    "5+": "5+",
    "بدون تجربه": "fresh",
    "۱-۲ سال": "1-2",
    "۲-۵ سال": "2-5",
    "بیش از ۵ سال": "5+"
  };

  // Map education level
  const educationMap = {
    "diploma": "diploma",
    "associate": "associate",
    "bachelor": "bachelor", 
    "master": "master",
    "phd": "phd",
    "دیپلم": "diploma",
    "کاردانی": "associate",
    "کارشناسی": "bachelor",
    "کارشناسی ارشد": "master",
    "دکتری": "phd"
  };

  // Map military service
  const militaryMap = {
    "completed": "completed",
    "exempt": "exempt",
    "not-required": "not-required",
    "پایان خدمت": "completed",
    "معافیت": "exempt", 
    "مشمول نمی‌شود": "not-required"
  };

  // Map insurance
  const insuranceMap = {
    "full": "full",
    "basic": "basic",
    "none": "none",
    "کامل": "full",
    "پایه": "basic",
    "بدون بیمه": "none"
  };

  // Map gender
  const genderMap = {
    "both": "both",
    "male": "male", 
    "female": "female",
    "مرد و زن": "both",
    "مرد": "male",
    "زن": "female"
  };

  // Parse salary
  function parseSalary(salaryStr) {
    if (!salaryStr || salaryStr === "توافقی") {
      return null;
    }
    
    // Remove commas and convert to number
    const numericValue = salaryStr.replace(/[,،]/g, "");
    const parsed = parseInt(numericValue);
    return isNaN(parsed) ? null : parsed;
  }

  // Extract skills from requirements text
  function extractSkills(requirementsText) {
    if (!requirementsText) return [];
    
    const skillKeywords = [
      "React", "JavaScript", "TypeScript", "Node.js", "Python", "Java", 
      "PHP", "Laravel", "Vue.js", "Angular", "CSS", "HTML", "SQL",
      "MongoDB", "PostgreSQL", "MySQL", "Git", "Docker", "Kubernetes",
      "AWS", "Azure", "Linux", "Windows", "MacOS", "Figma", "Photoshop"
    ];
    
    const foundSkills = [];
    skillKeywords.forEach(skill => {
      if (requirementsText.includes(skill)) {
        foundSkills.push(skill);
      }
    });
    
    return foundSkills;
  }

  // Get company ID from form data or localStorage
  const companyId = formData.company_id || getCompanyIdFromStorage();
  const activityFieldId = mapIndustryToActivityField(formData.category);
  
  console.log("🏢 Company ID:", companyId);
  console.log("🎯 Activity Field ID:", activityFieldId);
  
  // Validate required fields
  if (!companyId) {
    throw new Error("شناسه شرکت یافت نشد. لطفاً ابتدا پروفایل شرکت خود را تکمیل کنید.");
  }

  const mappedData = {
    // Required fields طبق مستندات
    company_id: companyId,
    expert_activity_field_id: activityFieldId,
    title: formData.title || "",
    contract_type: contractTypeMap[formData.type] || "full-time",
    location_text: formData.location || "",
    description: formData.description || "",
    requirements: formData.requirements || "",
    
    // Optional fields
    responsibilities: formData.responsibilities || formData.description || "",
    salary: parseSalary(formData.salary),
    working_hours: formData.workHours || "9 تا 17",
    
    // Requirements
    gender_preference: genderMap[formData.gender] || "both",
    min_education_level: educationMap[formData.education] || "bachelor",
    experience_level: experienceMap[formData.experience] || "fresh",
    military_service_status: militaryMap[formData.militaryService] || "not-required",
    
    // Benefits and conditions
    insurance_status: insuranceMap[formData.insurance] || "full",
    probation_period: formData.probationPeriod || "3 ماه",
    benefits: Array.isArray(formData.benefits) ? formData.benefits : [],
    required_skills: extractSkills(formData.requirements),
    
    // Work conditions
    is_remote_possible: Boolean(formData.remoteWork),
    travel_required: Boolean(formData.travelRequired),
    is_urgent: Boolean(formData.urgent),
    
    // Expiry date (30 days from now)
    expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // Format: YYYY-MM-DD
  };

  console.log("✅ Mapped data:", mappedData);
  return mappedData;
}

// Get auth token from localStorage
function getAuthToken() {
  try {
    const token = localStorage.getItem("auth_token") || localStorage.getItem("authToken");
    console.log("🔑 Token from localStorage:", token ? `${token.substring(0, 10)}...` : "null");
    return token;
  } catch (error) {
    console.error("❌ Error getting token from localStorage:", error);
    return null;
  }
}

// Build headers with auth token
function getHeaders() {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const token = getAuthToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
    console.log("🔑 Authorization header added");
  } else {
    console.log("⚠️ No auth token found");
  }

  return headers;
}

// Create new vacancy - Client-side function with enhanced error handling
export async function createVacancyClient(vacancyData, retryCount = 0) {
  const maxRetries = 2;
  
  try {
    console.log(`🚀 ===== CLIENT-SIDE CREATE VACANCY (Attempt ${retryCount + 1}/${maxRetries + 1}) =====`);
    console.log("📦 Raw vacancy data:", vacancyData);
    
    // Check if we have auth token
    const token = getAuthToken();
    if (!token) {
      return {
        success: false,
        error: "لطفاً ابتدا وارد حساب کاربری خود شوید",
      };
    }
    
    // Map form data to API format
    const mappedData = mapFormDataToAPI(vacancyData);
    console.log("🔄 Mapped data for API:", mappedData);
    
    const headers = getHeaders();
    console.log("🔑 Headers:", headers);
    console.log("🌐 API URL:", API_BASE_URL);
    
    // Add reasonable timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      console.log("⏰ Request timeout after 20 seconds");
      controller.abort();
    }, 20000); // 20 second timeout
    
    console.log("📡 Starting fetch request (20s timeout)...");
    console.log("📡 Request details:", {
      method: "POST",
      url: API_BASE_URL,
      headers: headers,
      bodySize: JSON.stringify(mappedData).length
    });
    
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(mappedData),
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);

    console.log("📡 Response received:", {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      url: response.url
    });

    if (!response.ok) {
      let errorData = {};
      try {
        const responseText = await response.text();
        console.log("❌ Raw error response:", responseText);
        errorData = JSON.parse(responseText);
        console.log("❌ Parsed error data:", errorData);
      } catch (parseError) {
        console.log("❌ Could not parse error response:", parseError);
      }
      
      // Enhanced error handling for 400 errors
      if (response.status === 400) {
        const validationErrors = errorData.errors || {};
        const errorMessages = Object.values(validationErrors).flat();
        console.error("❌ 400 Bad Request Details:", {
          errors: validationErrors,
          messages: errorMessages,
          sentData: mappedData
        });
        
        return {
          success: false,
          error: errorMessages.length > 0 
            ? errorMessages.join("، ") 
            : (errorData.message || "درخواست نامعتبر - لطفاً اطلاعات را بررسی کنید"),
          validationErrors: validationErrors
        };
      }
      
      return {
        success: false,
        error: errorData.message || `خطای سرور: ${response.status}`,
      };
    }

    const result = await response.json();
    console.log("✅ Vacancy created successfully:", result);
    
    return {
      success: true,
      data: result.data,
      message: result.message || "آگهی با موفقیت ایجاد شد",
    };
  } catch (error) {
    console.error("❌ ===== CLIENT CREATE VACANCY ERROR =====");
    console.error("❌ Error type:", error.constructor.name);
    console.error("❌ Error message:", error.message);
    console.error("❌ Error stack:", error.stack);
    
    // If it's a validation error from our mapping function, return it directly
    if (error.message.includes("شناسه شرکت یافت نشد")) {
      return {
        success: false,
        error: error.message,
      };
    }
    
    // Retry logic
    if (retryCount < maxRetries) {
      console.log(`🔄 Retrying... (${retryCount + 1}/${maxRetries})`);
      await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1))); // Progressive delay
      return createVacancyClient(vacancyData, retryCount + 1);
    }
    
    // Check if it's a network error
    if (error.name === 'AbortError') {
      return {
        success: false,
        error: "درخواست منقضی شد. لطفاً دوباره تلاش کنید.",
      };
    } else if (error.message.includes('fetch')) {
      return {
        success: false,
        error: "خطا در اتصال به سرور. لطفاً اتصال اینترنت خود را بررسی کنید.",
      };
    }
    
    return {
      success: false,
      error: error.message || "خطا در ایجاد آگهی",
    };
  }
}

// Update existing vacancy - Client-side function
export async function updateVacancyClient(id, vacancyData) {
  try {
    console.log("🚀 ===== CLIENT-SIDE UPDATE VACANCY =====");
    console.log("📦 Updating vacancy", id, "with data:", vacancyData);
    
    // Check if we have auth token
    const token = getAuthToken();
    if (!token) {
      return {
        success: false,
        error: "لطفاً ابتدا وارد حساب کاربری خود شوید",
      };
    }
    
    // Map form data to API format
    const mappedData = mapFormDataToAPI(vacancyData);
    console.log("🔄 Mapped data for API:", mappedData);
    
    const headers = getHeaders();
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

    console.log("📡 Starting update request...");
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(mappedData),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    console.log("📡 Update response received:", {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      url: response.url
    });

    if (!response.ok) {
      let errorData = {};
      try {
        const responseText = await response.text();
        console.log("❌ Raw error response:", responseText);
        errorData = JSON.parse(responseText);
        console.log("❌ Parsed error data:", errorData);
      } catch (parseError) {
        console.log("❌ Could not parse error response:", parseError);
      }
      
      return {
        success: false,
        error: errorData.message || `خطای سرور: ${response.status}`,
      };
    }

    const result = await response.json();
    console.log("✅ Vacancy updated successfully:", result);
    
    return {
      success: true,
      data: result.data,
      message: result.message || "آگهی با موفقیت به‌روزرسانی شد",
    };
  } catch (error) {
    console.error("❌ ===== CLIENT UPDATE VACANCY ERROR =====");
    console.error("❌ Error type:", error.constructor.name);
    console.error("❌ Error message:", error.message);
    
    if (error.name === 'AbortError') {
      return {
        success: false,
        error: "درخواست منقضی شد. لطفاً دوباره تلاش کنید.",
      };
    } else if (error.message.includes('fetch')) {
      return {
        success: false,
        error: "خطا در اتصال به سرور. لطفاً اتصال اینترنت خود را بررسی کنید.",
      };
    }
    
    return {
      success: false,
      error: error.message || "خطا در به‌روزرسانی آگهی",
    };
  }
}

// Fallback functions for localStorage
export function saveVacancyToLocalStorage(vacancy) {
  try {
    const existingVacancies = JSON.parse(localStorage.getItem("userVacancies") || "[]");
    const updatedVacancies = [...existingVacancies, { ...vacancy, id: Date.now() }];
    localStorage.setItem("userVacancies", JSON.stringify(updatedVacancies));
    return { success: true, data: vacancy };
  } catch (error) {
    console.error("Error saving to localStorage:", error);
    return { success: false, error: "خطا در ذخیره محلی" };
  }
}
