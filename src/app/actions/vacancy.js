"use server";

import { cookies } from "next/headers";

// API Configuration - Updated to match the provided API documentation
const API_BASE_URL = "https://imocc.iracode.com/api/v1/job-advertisements";

// Fallback API URL for development/testing
const FALLBACK_API_URL = "https://api.iracode.com/api/v1/job-advertisements";

// Helper function to get auth token (enhanced version)
function getAuthToken(clientToken = null) {
  console.log("🔐 Server Action: Getting auth token...");

  // If token is passed from client, use it first
  if (clientToken) {
    console.log(
      "🔐 Server Action: Using token from client:",
      clientToken ? `${clientToken.substring(0, 20)}...` : "null"
    );
    return clientToken;
  }

  // Check if we're in server environment
  if (typeof window === "undefined") {
    // Server-side: get from cookies
    try {
      const cookieStore = cookies();
      // Check both possible cookie names
      let token =
        cookieStore.get("auth_token")?.value ||
        cookieStore.get("authToken")?.value;
      console.log(
        "🔐 Server Action: Token from cookies:",
        token ? `${token.substring(0, 20)}...` : "null"
      );
      return token;
    } catch (error) {
      console.error("🔐 Server Action: Error accessing cookies:", error);
      return null;
    }
  } else {
    console.log(
      "🔐 Server Action: Client environment detected, checking localStorage"
    );
    // Client-side: get from localStorage (check both possible names)
    let token =
      localStorage.getItem("authToken") || localStorage.getItem("auth_token");
    console.log(
      "🔐 Server Action: Token from localStorage:",
      token ? `${token.substring(0, 20)}...` : "null"
    );
    return token;
  }
}

// Helper function for headers
function getHeaders(includeAuth = true, clientToken = null) {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (includeAuth) {
    const token = getAuthToken(clientToken);
    if (token) {
      headers.Authorization = `Bearer ${token}`;
      console.log("🔑 Server Action: Authorization header added");
    } else {
      console.log("❌ Server Action: No token available for authorization");
    }
  }

  console.log("🔧 Final headers:", headers);
  return headers;
}

// Create new vacancy with enhanced error handling
export async function createVacancy(vacancyData) {
  try {
    console.log("🚀 Creating vacancy with data:", vacancyData);

    // Extract auth token from form data
    const clientToken = vacancyData._authToken;
    console.log("🔑 Client token received:", clientToken ? "Yes" : "No");

    // Transform form data to API format (remove _authToken from API data)
    const { _authToken, ...formDataWithoutToken } = vacancyData;
    const apiData = transformFormDataToAPI(formDataWithoutToken);
    console.log("📝 Transformed API data:", apiData);

    const headers = getHeaders(true, clientToken);
    console.log("🔑 Request headers:", headers);
    console.log("🌐 API URL:", API_BASE_URL);

    // First attempt with main API
    let response;
    try {
      response = await fetch(`${API_BASE_URL}`, {
        method: "POST",
        headers,
        body: JSON.stringify(apiData),
        mode: "cors", // Explicitly set CORS mode
        credentials: "include", // Include credentials
      });
    } catch (fetchError) {
      console.error(
        "❌ Fetch failed with main API, trying fallback:",
        fetchError
      );

      // Try fallback API
      try {
        response = await fetch(`${FALLBACK_API_URL}`, {
          method: "POST",
          headers,
          body: JSON.stringify(apiData),
          mode: "cors",
          credentials: "include",
        });
      } catch (fallbackError) {
        console.error("❌ Fallback API also failed:", fallbackError);
        throw new Error(
          "خطا در اتصال به سرور. لطفاً اتصال اینترنت خود را بررسی کنید."
        );
      }
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("❌ API Error Response:", {
        status: response.status,
        statusText: response.statusText,
        errorData,
        sentData: apiData, // Log the data we sent
      });

      // Handle specific error cases
      if (response.status === 400) {
        const validationErrors = errorData.errors || {};
        const errorMessages = Object.values(validationErrors).flat();
        console.error("❌ 400 Bad Request Details:", {
          errors: validationErrors,
          messages: errorMessages,
          sentData: apiData,
        });
        throw new Error(
          errorMessages.join("، ") ||
            "درخواست نامعتبر - لطفاً اطلاعات را بررسی کنید"
        );
      }
      if (response.status === 403) {
        throw new Error("فقط کارفرمایان می‌توانند آگهی ایجاد کنند");
      }
      if (response.status === 422) {
        const validationErrors = errorData.errors || {};
        const errorMessages = Object.values(validationErrors).flat();
        console.error("❌ 422 Validation Error Details:", {
          errors: validationErrors,
          messages: errorMessages,
          sentData: apiData,
        });
        throw new Error(
          errorMessages.join("، ") || "اطلاعات وارد شده نامعتبر است"
        );
      }

      throw new Error(
        errorData.message || `خطا در ارتباط با سرور (${response.status})`
      );
    }

    const result = await response.json();
    console.log("✅ Vacancy created successfully:", result);

    return {
      success: true,
      data: result.data,
      message: result.message || "آگهی با موفقیت ایجاد شد",
    };
  } catch (error) {
    console.error("❌ Error creating vacancy:", error);

    // Provide more specific error messages
    let errorMessage = "خطا در ایجاد آگهی";

    if (error.name === "TypeError" && error.message.includes("fetch")) {
      errorMessage =
        "خطا در اتصال به سرور. لطفاً اتصال اینترنت خود را بررسی کنید.";
    } else if (error.message.includes("CORS")) {
      errorMessage = "خطا در دسترسی به سرور. لطفاً صفحه را رفرش کنید.";
    } else if (error.message) {
      errorMessage = error.message;
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
}

// Update existing vacancy
export async function updateVacancy(id, vacancyData, clientToken = null) {
  try {
    console.log("🚀 Updating vacancy", id, "with data:", vacancyData);

    // Extract auth token from form data
    const clientToken = vacancyData._authToken;
    console.log(
      "🔑 Client token received for update:",
      clientToken ? "Yes" : "No"
    );

    // Transform form data to API format (remove _authToken from API data)
    const { _authToken, ...formDataWithoutToken } = vacancyData;
    const apiData = transformFormDataToAPI(formDataWithoutToken);
    console.log("📝 Transformed API data for update:", apiData);

    const headers = getHeaders(true, clientToken);

    // Try PUT first, then PATCH as fallback
    let response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(apiData),
    });

    // If PUT fails with 405, try PATCH
    if (!response.ok && response.status === 405) {
      console.log("🔄 PUT failed, trying PATCH method");
      response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify(apiData),
      });
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("❌ API Error Response:", {
        status: response.status,
        statusText: response.statusText,
        errorData,
      });

      // Handle specific error cases
      if (response.status === 403) {
        throw new Error("شما مجاز به ویرایش این آگهی نیستید");
      }
      if (response.status === 404) {
        throw new Error("آگهی مورد نظر یافت نشد");
      }
      if (response.status === 422) {
        const validationErrors = errorData.errors || {};
        const errorMessages = Object.values(validationErrors).flat();
        throw new Error(
          errorMessages.join("، ") || "اطلاعات وارد شده نامعتبر است"
        );
      }

      throw new Error(
        errorData.message || `خطا در ارتباط با سرور (${response.status})`
      );
    }

    const result = await response.json();
    console.log("✅ Vacancy updated successfully:", result);

    return {
      success: true,
      data: result.data,
      message: result.message || "آگهی با موفقیت به‌روزرسانی شد",
    };
  } catch (error) {
    console.error("❌ Error updating vacancy:", error);
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

    const headers = getHeaders();
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
      headers,
      signal: controller.signal,
      cache: "no-store",
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    console.log("✅ Vacancy deleted successfully");

    return {
      success: true,
      message: "آگهی با موفقیت حذف شد",
    };
  } catch (error) {
    console.error("❌ Error deleting vacancy:", error);
    return {
      success: false,
      error: error.message || "خطا در حذف آگهی",
    };
  }
}

// Get user active vacancies
export async function getUserActiveVacancies(userId = null) {
  try {
    console.log("🚀 Getting user vacancies");

    const headers = getHeaders();
    const response = await fetch(`${API_BASE_URL}/my/active`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    const result = await response.json();
    console.log("✅ User vacancies retrieved successfully:", result);

    return {
      success: true,
      data: result.data || [],
      message: result.message,
    };
  } catch (error) {
    console.error("❌ Error getting user vacancies:", error);
    return {
      success: false,
      error: error.message || "خطا در دریافت آگهی‌ها",
      data: [],
    };
  }
}

// Get vacancy details
export async function getVacancyDetails(id) {
  try {
    console.log("🚀 Getting vacancy details for:", id);

    const headers = getHeaders();
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "GET",
      headers,
      signal: controller.signal,
      cache: "no-store",
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
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
      error: error.message || "خطا در دریافت جزئیات آگهی",
      data: null,
    };
  }
}

// Validate required fields
function validateVacancyData(formData) {
  const errors = [];

  if (!formData.title || formData.title.trim() === "") {
    errors.push("عنوان شغل الزامی است");
  }

  if (!formData.description || formData.description.trim() === "") {
    errors.push("شرح شغل الزامی است");
  }

  if (!formData.requirements || formData.requirements.trim() === "") {
    errors.push("الزامات شغل الزامی است");
  }

  if (!formData.category) {
    errors.push("دسته‌بندی شغل الزامی است");
  }

  if (!formData.type) {
    errors.push("نوع قرارداد الزامی است");
  }

  if (!formData.location || formData.location.trim() === "") {
    errors.push("محل کار الزامی است");
  }

  return errors;
}

// Transform form data to API format
function transformFormDataToAPI(formData) {
  console.log("🔄 Transforming form data to API format:", formData);

  // Validate required fields first
  const validationErrors = validateVacancyData(formData);
  if (validationErrors.length > 0) {
    throw new Error(`فیلدهای زیر الزامی هستند: ${validationErrors.join("، ")}`);
  }

  // Map contract type from Persian/form to API format
  const contractTypeMap = {
    "full-time": "full-time",
    "part-time": "part-time",
    contract: "contract",
    internship: "internship",
    freelance: "freelance",
    "تمام وقت": "full-time",
    "پاره وقت": "part-time",
    قراردادی: "contract",
    کارآموزی: "internship",
    فریلنسر: "freelance",
  };

  // Map experience level from Persian/form to API format
  const experienceLevelMap = {
    fresh: "fresh",
    "1-2": "1-2",
    "2-5": "2-5",
    "5+": "5+",
    تازه‌کار: "fresh",
    "۱ تا ۲ سال": "1-2",
    "۲ تا ۵ سال": "2-5",
    "بیش از ۵ سال": "5+",
  };

  // Map education level from Persian/form to API format
  const educationLevelMap = {
    diploma: "diploma",
    associate: "associate",
    bachelor: "bachelor",
    master: "master",
    phd: "phd",
    دیپلم: "diploma",
    کاردانی: "associate",
    کارشناسی: "bachelor",
    "کارشناسی ارشد": "master",
    دکتری: "phd",
  };

  // Map military service status
  const militaryServiceMap = {
    completed: "completed",
    exempt: "exempt",
    "not-required": "not-required",
    "پایان خدمت": "completed",
    معافیت: "exempt",
    "مشمول نیست": "not-required",
  };

  // Map insurance status
  const insuranceStatusMap = {
    full: "full",
    basic: "basic",
    none: "none",
    "بیمه کامل": "full",
    "بیمه پایه": "basic",
    "بدون بیمه": "none",
  };

  // Map gender preference
  const genderMap = {
    both: "both",
    male: "male",
    female: "female",
    "هر دو": "both",
    مرد: "male",
    زن: "female",
  };

  // Get company data from form data or default
  // Note: localStorage is not available in server actions
  let companyId = formData.company_id || null;

  // If no company_id provided, try to extract from company name or use default
  if (!companyId && formData.company) {
    // For now, use a default company ID - this should be passed from the client
    console.warn(
      "No company_id provided, using default. Company name:",
      formData.company
    );
    companyId = 1; // Default company ID - should be replaced with actual logic
  }

  // Map activity field based on category
  const categoryToActivityFieldMap = {
    "فناوری اطلاعات": 1,
    "بانکداری و مالی": 2,
    مهندسی: 3,
    "پزشکی و درمان": 4,
    آموزش: 5,
    "بازاریابی و فروش": 6,
    "منابع انسانی": 7,
    حقوقی: 8,
    "طراحی و گرافیک": 9,
    "ساخت و تولید": 10,
  };

  // Parse salary - handle both numeric and "توافقی" cases
  let salaryValue = null;
  if (formData.salary && formData.salary !== "توافقی") {
    // Remove any non-numeric characters and convert to number
    const numericSalary = parseInt(
      formData.salary.toString().replace(/[^\d]/g, "")
    );
    if (!isNaN(numericSalary) && numericSalary > 0) {
      salaryValue = numericSalary;
    }
  }

  // Calculate expiration date (default to 30 days from now)
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 30);

  const apiData = {
    // Required fields
    title: formData.title || "",
    description: formData.description || "",
    requirements: formData.requirements || "",

    // Company and activity field
    ...(companyId && { company_id: companyId }),
    expert_activity_field_id:
      categoryToActivityFieldMap[formData.category] || 1,

    // Contract and salary
    contract_type: contractTypeMap[formData.type] || "full-time",
    ...(salaryValue && { salary: salaryValue }),

    // Location
    location_text: formData.location || "",

    // Job requirements and preferences
    gender_preference: genderMap[formData.gender] || "both",
    min_education_level: educationLevelMap[formData.education] || "bachelor",
    experience_level: experienceLevelMap[formData.experience] || "fresh",
    military_service_status:
      militaryServiceMap[formData.militaryService] || "completed",

    // Work conditions
    working_hours: formData.workHours || "9 تا 17",
    insurance_status: insuranceStatusMap[formData.insurance] || "full",
    probation_period: formData.probationPeriod || "3 ماه",

    // Benefits and skills
    benefits: Array.isArray(formData.benefits)
      ? formData.benefits.filter((b) => b && b.trim())
      : [],
    required_skills: Array.isArray(formData.required_skills)
      ? formData.required_skills.filter((s) => s && s.trim())
      : [],

    // Boolean flags
    is_remote_possible: Boolean(formData.remoteWork),
    travel_required: Boolean(formData.travelRequired),
    is_urgent: Boolean(formData.urgent),

    // Expiration date
    expires_at: expirationDate.toISOString().split("T")[0], // YYYY-MM-DD format

    // Additional responsibilities if provided
    ...(formData.responsibilities && {
      responsibilities: formData.responsibilities,
    }),
  };

  console.log("✅ Transformed API data:", apiData);
  return apiData;
}

// Test authentication token with client token
export async function testAuthToken(clientToken = null) {
  try {
    console.log("🧪 Testing authentication token...");

    const token = getAuthToken(clientToken);
    console.log(
      "🔑 Retrieved token:",
      token ? `${token.substring(0, 20)}...` : "null"
    );

    if (!token) {
      return {
        success: false,
        error: "هیچ توکن احراز هویتی یافت نشد",
        details: "لطفاً مجدداً وارد حساب کاربری خود شوید",
      };
    }

    // Test authenticated endpoint
    const headers = getHeaders(true, clientToken);
    const response = await fetch(`${API_BASE_URL}?per_page=1`, {
      method: "GET",
      headers,
      mode: "cors",
    });

    console.log("📊 Auth test response:", {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
    });

    if (response.status === 401) {
      return {
        success: false,
        error: "توکن احراز هویت نامعتبر است",
        details: "لطفاً مجدداً وارد حساب کاربری خود شوید",
      };
    }

    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        error: `خطا در تست احراز هویت: ${response.status}`,
        details: errorText,
      };
    }

    const result = await response.json();

    return {
      success: true,
      message: "احراز هویت موفق بود",
      token: token ? `${token.substring(0, 20)}...` : null,
      data: result,
    };
  } catch (error) {
    console.error("❌ Auth test failed:", error);
    return {
      success: false,
      error: `خطا در تست احراز هویت: ${error.message}`,
      details: error,
    };
  }
}

// Test API connectivity
export async function testAPIConnection() {
  try {
    console.log("🧪 Testing API connection...");

    const headers = getHeaders(false); // No auth required for public endpoint
    console.log("🔑 Test headers:", headers);

    // Test with a simple GET request to public endpoint
    const response = await fetch(`${API_BASE_URL}?per_page=1`, {
      method: "GET",
      headers,
      mode: "cors",
    });

    console.log("📊 Test response:", {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
      headers: Object.fromEntries(response.headers.entries()),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log("❌ Test response body:", errorText);

      return {
        success: false,
        error: `API Test Failed: ${response.status} ${response.statusText}`,
        details: errorText,
      };
    }

    const result = await response.json();
    console.log("✅ API connection test successful:", result);

    return {
      success: true,
      message: "اتصال به API موفق بود",
      data: result,
    };
  } catch (error) {
    console.error("❌ API connection test failed:", error);
    return {
      success: false,
      error: `خطا در اتصال: ${error.message}`,
      details: error,
    };
  }
}

// Get all active vacancies with filtering
export async function getActiveVacancies(params = {}) {
  try {
    console.log("🚀 Getting active vacancies with params:", params);

    const headers = await getHeaders(false); // Public endpoint

    // Build query string
    const queryParams = new URLSearchParams();

    if (params.search) queryParams.append("search", params.search);
    if (params.company_id) queryParams.append("company_id", params.company_id);
    if (params.expert_activity_field_id)
      queryParams.append(
        "expert_activity_field_id",
        params.expert_activity_field_id
      );
    if (params.contract_type)
      queryParams.append("contract_type", params.contract_type);
    if (params.experience_level)
      queryParams.append("experience_level", params.experience_level);
    if (typeof params.is_remote === "boolean")
      queryParams.append("is_remote", params.is_remote);
    if (typeof params.is_urgent === "boolean")
      queryParams.append("is_urgent", params.is_urgent);
    if (params.salary_min) queryParams.append("salary_min", params.salary_min);
    if (params.salary_max) queryParams.append("salary_max", params.salary_max);
    if (params.sort_by) queryParams.append("sort_by", params.sort_by);
    if (params.sort_order) queryParams.append("sort_order", params.sort_order);

    const perPage = Math.min(Math.max(1, params.per_page || 20), 50);
    const page = Math.max(1, params.page || 1);
    queryParams.append("per_page", perPage);
    queryParams.append("page", page);

    const url = `${API_BASE_URL}${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;

    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `خطا در ارتباط با سرور (${response.status})`
      );
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

    const headers = await getHeaders(false); // Public endpoint
    const response = await fetch(`${API_BASE_URL}/urgent`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `خطا در ارتباط با سرور (${response.status})`
      );
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

    const headers = await getHeaders(false); // Public endpoint
    const response = await fetch(`${API_BASE_URL}/remote`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `خطا در ارتباط با سرور (${response.status})`
      );
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
