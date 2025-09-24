"use server";

import { cookies } from "next/headers";

// API Configuration
const API_BASE_URL = "https://imocc.iracode.com/api/v1/job-advertisements";

// Helper function to get auth token
async function getAuthToken() {
  try {
    console.log("🔑 Getting auth token...");
    
    // Try to get from cookies first (server-side)
    try {
      const cookieStore = cookies();
      const authToken = cookieStore.get("auth_token")?.value;
      console.log("🔑 Token from cookies:", authToken ? `${authToken.substring(0, 10)}...` : "null");
      if (authToken) return authToken;
    } catch (cookieError) {
      console.log("⚠️ Could not access cookies (might be client-side):", cookieError.message);
    }
    
    // Fallback to localStorage (client-side) - but this won't work in server actions
    if (typeof window !== 'undefined') {
      console.log("🔑 Trying localStorage...");
      const localToken = localStorage.getItem("auth_token");
      console.log("🔑 Token from localStorage:", localToken ? `${localToken.substring(0, 10)}...` : "null");
      return localToken;
    }
    
    console.log("⚠️ No token found in any storage");
    return null;
  } catch (error) {
    console.error("❌ Error getting auth token:", error);
    return null;
  }
}

// Helper function for headers
async function getHeaders(includeAuth = true) {
  console.log("🔧 Building headers, includeAuth:", includeAuth);
  
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (includeAuth) {
    const token = await getAuthToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
      console.log("🔑 Authorization header added");
    } else {
      console.log("⚠️ No auth token found");
    }
  }

  console.log("🔧 Final headers:", headers);
  return headers;
}

// Data mapping functions طبق مستندات API
function mapFormDataToAPI(formData) {
  console.log("🔄 ===== MAPPING FORM DATA TO API =====");
  console.log("🔄 Raw form data:", formData);
  console.log("🔄 Form data keys:", Object.keys(formData));
  console.log("🔄 Form data values:", Object.values(formData));
  
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

  // Validate required fields
  if (!formData.title || !formData.title.trim()) {
    throw new Error("عنوان آگهی الزامی است");
  }
  if (!formData.description || !formData.description.trim()) {
    throw new Error("توضیحات آگهی الزامی است");
  }

  // Create minimal payload first to test basic functionality
  const mappedData = {
    title: formData.title.trim(),
    description: formData.description.trim(),
    contract_type: "full-time", // Fixed value for testing
    
    // Only include optional fields if they have valid values
    ...(formData.requirements?.trim() && { requirements: formData.requirements.trim() }),
    ...(formData.location?.trim() && { location_text: formData.location.trim() }),
    ...(formData.salary && parseSalary(formData.salary) && { salary: parseSalary(formData.salary) }),
    
    // Safe default values
    gender_preference: "both",
    min_education_level: "diploma", 
    experience_level: "fresh",
    is_remote_possible: false,
    is_urgent: false,
    
    // Date in simple format
    expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  };

  console.log("✅ ===== FINAL MAPPED DATA =====");
  console.log("✅ Mapped data:", mappedData);
  console.log("✅ Data types check:");
  console.log("  - title:", typeof mappedData.title, mappedData.title);
  console.log("  - description:", typeof mappedData.description, mappedData.description);
  console.log("  - contract_type:", typeof mappedData.contract_type, mappedData.contract_type);
  console.log("  - salary:", typeof mappedData.salary, mappedData.salary);
  console.log("  - expires_at:", typeof mappedData.expires_at, mappedData.expires_at);
  console.log("  - is_remote_possible:", typeof mappedData.is_remote_possible, mappedData.is_remote_possible);
  console.log("  - is_urgent:", typeof mappedData.is_urgent, mappedData.is_urgent);
  
  return mappedData;
}

// Fallback functions for localStorage
function saveVacancyToLocalStorage(vacancy) {
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

function updateVacancyInLocalStorage(id, vacancy) {
  try {
    const existingVacancies = JSON.parse(localStorage.getItem("userVacancies") || "[]");
    const updatedVacancies = existingVacancies.map(v => 
      v.id === id ? { ...vacancy, id } : v
    );
    localStorage.setItem("userVacancies", JSON.stringify(updatedVacancies));
    return { success: true, data: vacancy };
  } catch (error) {
    console.error("Error updating localStorage:", error);
    return { success: false, error: "خطا در به‌روزرسانی محلی" };
  }
}

function deleteVacancyFromLocalStorage(id) {
  try {
    const existingVacancies = JSON.parse(localStorage.getItem("userVacancies") || "[]");
    const updatedVacancies = existingVacancies.filter(v => v.id !== id);
    localStorage.setItem("userVacancies", JSON.stringify(updatedVacancies));
    return { success: true };
  } catch (error) {
    console.error("Error deleting from localStorage:", error);
    return { success: false, error: "خطا در حذف محلی" };
  }
}

function getVacanciesFromLocalStorage() {
  try {
    const vacancies = JSON.parse(localStorage.getItem("userVacancies") || "[]");
    return { success: true, data: vacancies };
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return { success: false, data: [], error: "خطا در خواندن داده‌های محلی" };
  }
}

// Create new vacancy - with client token parameter
export async function createVacancy(vacancyData, clientToken = null) {
  try {
    console.log("🚀 ===== CREATE VACANCY SERVER ACTION =====");
    console.log("📦 Raw vacancy data:", vacancyData);
    console.log("🔑 Client token provided:", clientToken ? `${clientToken.substring(0, 10)}...` : "null");
    
    // Check if user has a company first
    console.log("🏢 Checking user company status...");
    
    // Try to get company data from localStorage or API
    let companyData = null;
    try {
      if (typeof window !== 'undefined') {
        const storedCompanyData = localStorage.getItem('companyData');
        if (storedCompanyData) {
          companyData = JSON.parse(storedCompanyData);
          console.log("🏢 Found company data in localStorage:", companyData);
          console.log("🏢 Company ID:", companyData.id);
          console.log("🏢 Company Name:", companyData.companyName);
          
          // Check if company has ID (means it's saved to server)
          if (!companyData.id) {
            console.log("⚠️ Company exists in localStorage but has no ID - might not be saved to server");
          }
        } else {
          console.log("⚠️ No company data found in localStorage");
        }
      }
    } catch (error) {
      console.log("⚠️ Could not get company data from localStorage:", error);
    }
    
    // Map form data to API format
    const mappedData = mapFormDataToAPI(vacancyData);
    console.log("🔄 Mapped data for API:", mappedData);
    
    // Build headers with client token if provided
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    
    // Try to get token from cookies first, then use client token
    let authToken = null;
    try {
      const cookieStore = cookies();
      authToken = cookieStore.get("auth_token")?.value;
      console.log("🔑 Token from cookies:", authToken ? `${authToken.substring(0, 10)}...` : "null");
    } catch (cookieError) {
      console.log("⚠️ Could not access cookies:", cookieError.message);
    }
    
    // Use client token as fallback
    if (!authToken && clientToken) {
      authToken = clientToken;
      console.log("🔑 Using client token as fallback");
    }
    
    if (authToken) {
      headers.Authorization = `Bearer ${authToken}`;
      console.log("🔑 Authorization header added");
    } else {
      console.log("❌ No auth token available");
      return {
        success: false,
        error: "لطفاً ابتدا وارد حساب کاربری خود شوید",
      };
    }
    
    console.log("🔑 Final headers:", headers);
    console.log("🌐 API URL:", API_BASE_URL);
    
    // Test: Try to get user's company first
    console.log("🧪 Testing: Getting user's company info...");
    try {
      const testResponse = await fetch(`https://imocc.iracode.com/api/v1/companies`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
          Accept: "application/json",
        },
      });
      console.log("🧪 Company test response:", testResponse.status);
      if (testResponse.ok) {
        const companyData = await testResponse.json();
        console.log("🧪 User's company data:", companyData);
      } else {
        const errorText = await testResponse.text();
        console.log("🧪 Company test error:", errorText);
      }
    } catch (testError) {
      console.log("🧪 Company test failed:", testError);
    }
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

    console.log("📡 Starting fetch request...");
    const response = await fetch(`${API_BASE_URL}`, {
      method: "POST",
      headers,
      body: JSON.stringify(mappedData),
      signal: controller.signal,
      cache: "no-store",
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
      let errorMessage = `خطای سرور: ${response.status}`;
      
      try {
        const responseText = await response.text();
        console.log("❌ Raw error response:", responseText);
        console.log("❌ Response status:", response.status);
        console.log("❌ Response headers:", Object.fromEntries(response.headers.entries()));
        
        errorData = JSON.parse(responseText);
        console.log("❌ Parsed error data:", errorData);
        
        // Extract detailed error information
        if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.errors) {
          // Handle Laravel validation errors
          const validationErrors = Object.values(errorData.errors).flat();
          errorMessage = validationErrors.join(', ');
          console.log("❌ Validation errors:", validationErrors);
        } else if (errorData.error) {
          errorMessage = errorData.error;
          
          // Handle specific company-related errors
          if (errorMessage.includes('شرکتی متصل نیست') || errorMessage.includes('company')) {
            errorMessage = "❌ مشکل در ارتباط با شرکت!\n\n🔍 احتمالات:\n1️⃣ شرکت در localStorage هست اما در سرور ثبت نشده\n2️⃣ شرکت ثبت شده اما تأیید نشده\n3️⃣ مشکل در ارتباط کاربر با شرکت\n\n💡 راه حل:\n- به بخش 'پروفایل شرکت' بروید\n- دوباره اطلاعات را ذخیره کنید\n- مطمئن شوید که پیام موفقیت نمایش داده شود";
          }
        }
        
        // Log the mapped data that was sent for debugging
        console.log("❌ Data that was sent to API:", JSON.stringify(mappedData, null, 2));
        
      } catch (parseError) {
        console.log("❌ Could not parse error response:", parseError);
        errorMessage = `خطای سرور: ${response.status} - ${response.statusText}`;
      }
      
      throw new Error(errorMessage);
    }

    const result = await response.json();
    console.log("✅ Vacancy created successfully:", result);
    
    return {
      success: true,
      data: result.data,
      message: result.message || "آگهی با موفقیت ایجاد شد",
    };
  } catch (error) {
    console.error("❌ ===== CREATE VACANCY ERROR =====");
    console.error("❌ Error type:", error.constructor.name);
    console.error("❌ Error message:", error.message);
    console.error("❌ Error stack:", error.stack);
    
    // Check if it's a network error
    if (error.name === 'AbortError') {
      console.error("❌ Request timed out");
    } else if (error.message.includes('fetch')) {
      console.error("❌ Network/fetch error");
    }
    
    return {
      success: false,
      error: error.message || "خطا در ایجاد آگهی",
    };
  }
}

// Update existing vacancy
export async function updateVacancy(id, vacancyData, clientToken = null) {
  try {
    console.log("🚀 ===== UPDATE VACANCY SERVER ACTION =====");
    console.log("📦 Updating vacancy", id, "with data:", vacancyData);
    console.log("🔑 Client token provided:", clientToken ? `${clientToken.substring(0, 10)}...` : "null");
    
    // Map form data to API format
    const mappedData = mapFormDataToAPI(vacancyData);
    console.log("🔄 Mapped data for API:", mappedData);
    
    // Build headers with client token if provided
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    
    // Try to get token from cookies first, then use client token
    let authToken = null;
    try {
      const cookieStore = cookies();
      authToken = cookieStore.get("auth_token")?.value;
      console.log("🔑 Token from cookies:", authToken ? `${authToken.substring(0, 10)}...` : "null");
    } catch (cookieError) {
      console.log("⚠️ Could not access cookies:", cookieError.message);
    }
    
    // Use client token as fallback
    if (!authToken && clientToken) {
      authToken = clientToken;
      console.log("🔑 Using client token as fallback");
    }
    
    if (authToken) {
      headers.Authorization = `Bearer ${authToken}`;
      console.log("🔑 Authorization header added");
    } else {
      console.log("❌ No auth token available");
      return {
        success: false,
        error: "لطفاً ابتدا وارد حساب کاربری خود شوید",
      };
    }
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

    console.log("📡 Starting update request...");
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(mappedData),
      signal: controller.signal,
      cache: "no-store",
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
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("✅ Vacancy updated successfully:", result);
    
    return {
      success: true,
      data: result.data,
      message: result.message || "آگهی با موفقیت به‌روزرسانی شد",
    };
  } catch (error) {
    console.error("❌ ===== UPDATE VACANCY ERROR =====");
    console.error("❌ Error type:", error.constructor.name);
    console.error("❌ Error message:", error.message);
    console.error("❌ Error stack:", error.stack);
    
    return {
      success: false,
      error: error.message || "خطا در به‌روزرسانی آگهی",
    };
  }
}

// Delete vacancy
export async function deleteVacancy(id) {
  try {
    console.log("🚀 Deleting vacancy:", id);
    
    const headers = await getHeaders();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
      headers,
      signal: controller.signal,
      cache: "no-store",
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    console.log("✅ Vacancy deleted successfully");
    
    return {
      success: true,
      message: "آگهی با موفقیت حذف شد",
    };
  } catch (error) {
    console.error("❌ Error deleting vacancy:", error);
    
    // Fallback to localStorage if API fails
    if (typeof window !== 'undefined') {
      console.log("🔄 Falling back to localStorage...");
      const fallbackResult = deleteVacancyFromLocalStorage(id);
      if (fallbackResult.success) {
        return {
          success: true,
          message: "آگهی به صورت محلی حذف شد (اتصال به سرور برقرار نشد)",
        };
      }
    }
    
    return {
      success: false,
      error: error.message || "خطا در حذف آگهی",
    };
  }
}

// Get user active vacancies
export async function getUserActiveVacancies(userId = null) {
  try {
    console.log("🚀 Getting user active vacancies");
    
    const headers = await getHeaders();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    // Use the main endpoint to get all active vacancies
    // The API will filter based on authentication token
    // Add timestamp to prevent any caching
    const timestamp = Date.now();
    const url = `${API_BASE_URL}?_t=${timestamp}`;
    
    const response = await fetch(url, {
      method: "GET", 
      headers: {
        ...headers,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
      signal: controller.signal,
      cache: "no-store", // Force fresh data from server
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("✅ User active vacancies retrieved successfully:", result);
    
    return {
      success: true,
      data: result.data || [],
      message: result.message,
    };
  } catch (error) {
    console.error("❌ Error getting user active vacancies:", error);
    
    // Fallback to localStorage if API fails
    if (typeof window !== 'undefined') {
      console.log("🔄 Falling back to localStorage...");
      const fallbackResult = getVacanciesFromLocalStorage();
      if (fallbackResult.success) {
        return {
          success: true,
          data: fallbackResult.data,
          message: "آگهی‌ها از حافظه محلی بارگذاری شدند (اتصال به سرور برقرار نشد)",
        };
      }
    }
    
    return {
      success: false,
      error: error.message || "خطا در دریافت آگهی‌ها",
      data: [],
    };
  }
}

// Get user expired vacancies  
export async function getUserExpiredVacancies(userId = null) {
  try {
    console.log("🚀 Getting user expired vacancies");
    
    const headers = await getHeaders();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    // For now, return empty array for expired vacancies
    // Until we have a proper endpoint for expired vacancies
    console.log("⚠️ Returning empty array for expired vacancies");
    
    return {
      success: true,
      data: [],
      message: "Expired vacancies not implemented yet",
    };
  } catch (error) {
    console.error("❌ Error getting user expired vacancies:", error);
    
    // Fallback to empty array for expired vacancies
    return {
      success: false,
      error: error.message || "خطا در دریافت آگهی‌های منقضی",
      data: [],
    };
  }
}

// Backward compatibility - alias for getUserActiveVacancies
export async function getUserVacancies() {
  return getUserActiveVacancies();
}

// Get vacancy details
export async function getVacancyDetails(id) {
  try {
    console.log("🚀 Getting vacancy details for:", id);
    
    const headers = await getHeaders();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "GET",
      headers,
      signal: controller.signal,
      cache: "no-store",
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("✅ Vacancy details retrieved successfully:", result);
    
    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    console.error("❌ Error getting vacancy details:", error);
    return {
      success: false,
      error: error.message || "خطا در دریافت جزئیات آگهی",
      data: null,
    };
  }
}

// Get active vacancies (public endpoint)
export async function getActiveVacancies(params = {}) {
  try {
    console.log("🚀 Getting active vacancies with params:", params);
    
    // Build query string
    const queryParams = new URLSearchParams();
    
    if (params.search) queryParams.append("search", params.search);
    if (params.company_id) queryParams.append("company_id", params.company_id);
    if (params.expert_activity_field_id) queryParams.append("expert_activity_field_id", params.expert_activity_field_id);
    if (params.contract_type) queryParams.append("contract_type", params.contract_type);
    if (params.experience_level) queryParams.append("experience_level", params.experience_level);
    if (params.is_remote !== undefined) queryParams.append("is_remote", params.is_remote);
    if (params.is_urgent !== undefined) queryParams.append("is_urgent", params.is_urgent);
    if (params.salary_min) queryParams.append("salary_min", params.salary_min);
    if (params.salary_max) queryParams.append("salary_max", params.salary_max);
    if (params.sort_by) queryParams.append("sort_by", params.sort_by);
    if (params.sort_order) queryParams.append("sort_order", params.sort_order);
    if (params.per_page) queryParams.append("per_page", Math.min(params.per_page, 50));
    if (params.page) queryParams.append("page", params.page);

    const url = `${API_BASE_URL.replace('/job-advertisements', '/vacancies')}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      signal: controller.signal,
      cache: "no-store",
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("✅ Active vacancies retrieved successfully:", result);
    
    return {
      success: true,
      data: result.data || [],
      meta: result.meta || {},
      message: result.message,
    };
  } catch (error) {
    console.error("❌ Error getting active vacancies:", error);
    return {
      success: false,
      error: error.message || "خطا در دریافت آگهی‌های فعال",
      data: [],
      meta: {},
    };
  }
}

// Get urgent vacancies
export async function getUrgentVacancies() {
  try {
    console.log("🚀 Getting urgent vacancies");
    
    const url = `${API_BASE_URL.replace('/job-advertisements', '/vacancies/urgent')}`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      signal: controller.signal,
      cache: "no-store",
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("✅ Urgent vacancies retrieved successfully:", result);
    
    return {
      success: true,
      data: result.data || [],
      message: result.message,
    };
  } catch (error) {
    console.error("❌ Error getting urgent vacancies:", error);
    return {
      success: false,
      error: error.message || "خطا در دریافت آگهی‌های فوری",
      data: [],
    };
  }
}

// Get remote vacancies
export async function getRemoteVacancies() {
  try {
    console.log("🚀 Getting remote vacancies");
    
    const url = `${API_BASE_URL.replace('/job-advertisements', '/vacancies/remote')}`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      signal: controller.signal,
      cache: "no-store",
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("✅ Remote vacancies retrieved successfully:", result);
    
    return {
      success: true,
      data: result.data || [],
      message: result.message,
    };
  } catch (error) {
    console.error("❌ Error getting remote vacancies:", error);
    return {
      success: false,
      error: error.message || "خطا در دریافت آگهی‌های دورکاری",
      data: [],
    };
  }
}
