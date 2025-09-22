"use client";

// Server Actions برای مدیریت شرکت‌ها
// Base URL: https://api.iracode.com/api/v1/companies

const BASE_URL = "https://api.iracode.com/api/v1/companies";

// Helper function برای دریافت token
function getAuthToken() {
  if (typeof window !== "undefined") {
    // Client-side: localStorage و cookies
    const localToken = localStorage.getItem("auth_token");
    if (localToken) return localToken;

    // Fallback to cookies in client-side
    const cookies = document.cookie.split(";");
    const authCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("auth_token=")
    );
    return authCookie ? authCookie.split("=")[1] : null;
  } else {
    // Server-side: cookies
    try {
      const { cookies } = require("next/headers");
      const cookieStore = cookies();
      return cookieStore.get("auth_token")?.value;
    } catch (error) {
      console.error("Error accessing cookies in server-side:", error);
      return null;
    }
  }
}

// Helper function برای headers
function getHeaders(includeAuth = true) {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  return headers;
}

// Data mapping functions
function mapFormDataToAPI(formData) {
  return {
    name: formData.companyName || "",
    name_en: formData.companyNameEn || "",
    display_name: formData.companyName || "",
    code: formData.companyCode || "",
    founded_year: parseInt(formData.establishedYear) || null,
    size: mapCompanySize(formData.companySize),
    type: formData.companyType || "",
    email: formData.email || "",
    website: formData.website || "",
    mobile: formData.mobile || "",
    phone: formData.phone || "",
    linkedin_url: formData.linkedin || "",
    instagram_url: formData.instagram || "",
    telegram_url: formData.telegram || "",
    introduction: formData.description || "",
    vision: formData.vision || "",
    mission: formData.mission || "",
    services: Array.isArray(formData.services)
      ? formData.services.filter((s) => s.trim())
      : [],
    technical_specialties: Array.isArray(formData.specialties)
      ? formData.specialties.filter((s) => s.trim())
      : [],
    benefits: Array.isArray(formData.benefits)
      ? formData.benefits.filter((b) => b.trim())
      : [],
    work_environment: formData.workEnvironment || "",
    expert_activity_field_id: mapIndustryToFieldId(formData.industryType),
    location: {
      country_id: 1, // Default Iran - باید از API countries دریافت شود
      province_id: 1, // باید از API provinces دریافت شود
      city_id: 1, // باید از API cities دریافت شود
      address: formData.address || "",
      postal_code: formData.postalCode || "",
    },
  };
}

// Map company size to API values
function mapCompanySize(size) {
  const sizeMap = {
    "1-10": 1,
    "11-50": 2,
    "51-100": 3,
    "101-500": 4,
    "501-1000": 5,
    "500+": 6,
    "بیش از 500 نفر": 6,
  };
  return sizeMap[size] || 1;
}

// Map industry type to activity field ID
function mapIndustryToFieldId(industryType) {
  const industryMap = {
    technology: 1,
    manufacturing: 2,
    service: 3,
    finance: 4,
    healthcare: 5,
    education: 6,
    retail: 7,
    construction: 8,
  };
  return industryMap[industryType] || 1;
}

// Map API response to form data
function mapAPIToFormData(apiData) {
  return {
    companyName: apiData.name || "",
    companyNameEn: apiData.name_en || "",
    companyCode: apiData.code || "",
    establishedYear: apiData.founded_year?.toString() || "",
    companySize: mapAPISizeToForm(apiData.size),
    companyType: apiData.type || "private",
    email: apiData.email || "",
    website: apiData.website || "",
    mobile: apiData.mobile || "",
    phone: apiData.phone || "",
    linkedin: apiData.social_media?.linkedin || "",
    instagram: apiData.social_media?.instagram || "",
    telegram: apiData.social_media?.telegram || "",
    description: apiData.introduction || "",
    vision: apiData.vision || "",
    mission: apiData.mission || "",
    services: apiData.services || [],
    specialties: apiData.technical_specialties || [],
    benefits: apiData.benefits || [],
    workEnvironment: apiData.work_environment || "",
    industryType: mapFieldIdToIndustry(apiData.expert_activity_field?.id),
    country: apiData.locations?.[0]?.country?.name || "ایران",
    province: apiData.locations?.[0]?.province?.name || "",
    city: apiData.locations?.[0]?.city?.name || "",
    address: apiData.locations?.[0]?.address || "",
    postalCode: apiData.locations?.[0]?.postal_code || "",
  };
}

function mapAPISizeToForm(size) {
  const sizeMap = {
    1: "1-10",
    2: "11-50",
    3: "51-100",
    4: "101-500",
    5: "501-1000",
    6: "500+",
  };
  return sizeMap[size] || "1-10";
}

function mapFieldIdToIndustry(fieldId) {
  const fieldMap = {
    1: "technology",
    2: "manufacturing",
    3: "service",
    4: "finance",
    5: "healthcare",
    6: "education",
    7: "retail",
    8: "construction",
  };
  return fieldMap[fieldId] || "technology";
}

// API Functions

/**
 * ایجاد شرکت جدید
 */
export async function createCompany(formData) {
  try {
    console.log("Creating company with data:", formData);

    const apiData = mapFormDataToAPI(formData);

    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 seconds timeout

    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: getHeaders(true),
      body: JSON.stringify(apiData),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const result = await response.json();

    if (!response.ok) {
      console.error("Create company error:", result);
      throw new Error(result.message || "خطا در ایجاد شرکت");
    }

    console.log("Company created successfully:", result);
    return {
      success: true,
      data: result.data,
      message: "شرکت با موفقیت ایجاد شد",
    };
  } catch (error) {
    console.error("Create company error:", error);

    if (error.name === "AbortError") {
      return {
        success: false,
        message: "درخواست منقضی شد - لطفاً دوباره تلاش کنید",
      };
    }

    return {
      success: false,
      message: error.message || "خطا در ایجاد شرکت",
    };
  }
}

/**
 * به‌روزرسانی شرکت
 */
export async function updateCompany(companyId, formData) {
  try {
    console.log("Updating company:", companyId, formData);

    const apiData = mapFormDataToAPI(formData);

    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 seconds timeout

    const response = await fetch(`${BASE_URL}/${companyId}`, {
      method: "PUT",
      headers: getHeaders(true),
      body: JSON.stringify(apiData),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const result = await response.json();

    if (!response.ok) {
      console.error("Update company error:", result);
      throw new Error(result.message || "خطا در به‌روزرسانی شرکت");
    }

    console.log("Company updated successfully:", result);
    return {
      success: true,
      data: result.data,
      message: "اطلاعات شرکت با موفقیت به‌روزرسانی شد",
    };
  } catch (error) {
    console.error("Update company error:", error);

    if (error.name === "AbortError") {
      return {
        success: false,
        message: "درخواست منقضی شد - لطفاً دوباره تلاش کنید",
      };
    }

    return {
      success: false,
      message: error.message || "خطا در به‌روزرسانی شرکت",
    };
  }
}

/**
 * دریافت اطلاعات شرکت
 */
export async function getCompany(companySlug) {
  try {
    console.log("Getting company:", companySlug);

    const response = await fetch(`${BASE_URL}/${companySlug}`, {
      method: "GET",
      headers: getHeaders(false),
      next: { revalidate: 1800 }, // 30 minutes cache
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Get company error:", result);
      throw new Error(result.message || "شرکت یافت نشد");
    }

    console.log("Company retrieved successfully:", result);
    return {
      success: true,
      data: mapAPIToFormData(result.data),
    };
  } catch (error) {
    console.error("Get company error:", error);
    return {
      success: false,
      message: error.message || "خطا در دریافت اطلاعات شرکت",
    };
  }
}

/**
 * دریافت لیست شرکت‌ها
 */
export async function getCompanies(params = {}) {
  try {
    console.log("Getting companies with params:", params);

    const queryParams = new URLSearchParams();

    // Add query parameters
    if (params.search) queryParams.append("search", params.search);
    if (params.size) queryParams.append("size", params.size);
    if (params.activity_field_id)
      queryParams.append("activity_field_id", params.activity_field_id);
    if (params.verified !== undefined)
      queryParams.append("verified", params.verified);
    if (params.founded_year_from)
      queryParams.append("founded_year_from", params.founded_year_from);
    if (params.founded_year_to)
      queryParams.append("founded_year_to", params.founded_year_to);
    if (params.city_id) queryParams.append("city_id", params.city_id);
    if (params.province_id)
      queryParams.append("province_id", params.province_id);
    if (params.sort_by) queryParams.append("sort_by", params.sort_by);
    if (params.sort_direction)
      queryParams.append("sort_direction", params.sort_direction);
    if (params.per_page) queryParams.append("per_page", params.per_page);

    const url = queryParams.toString()
      ? `${BASE_URL}?${queryParams}`
      : BASE_URL;

    const response = await fetch(url, {
      method: "GET",
      headers: getHeaders(false),
      next: { revalidate: 900 }, // 15 minutes cache
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Get companies error:", result);
      throw new Error(result.message || "خطا در دریافت لیست شرکت‌ها");
    }

    console.log("Companies retrieved successfully");
    return {
      success: true,
      data: result.data,
      meta: result.meta,
      links: result.links,
    };
  } catch (error) {
    console.error("Get companies error:", error);
    return {
      success: false,
      message: error.message || "خطا در دریافت لیست شرکت‌ها",
    };
  }
}

/**
 * حذف شرکت
 */
export async function deleteCompany(companyId) {
  try {
    console.log("Deleting company:", companyId);

    const response = await fetch(`${BASE_URL}/${companyId}`, {
      method: "DELETE",
      headers: getHeaders(true),
    });

    if (!response.ok) {
      const result = await response.json();
      console.error("Delete company error:", result);
      throw new Error(result.message || "خطا در حذف شرکت");
    }

    console.log("Company deleted successfully");
    return {
      success: true,
      message: "شرکت با موفقیت حذف شد",
    };
  } catch (error) {
    console.error("Delete company error:", error);
    return {
      success: false,
      message: error.message || "خطا در حذف شرکت",
    };
  }
}

/**
 * دریافت شرکت‌های تایید شده
 */
export async function getVerifiedCompanies(params = {}) {
  try {
    console.log("Getting verified companies");

    const queryParams = new URLSearchParams();
    if (params.per_page) queryParams.append("per_page", params.per_page);
    if (params.sort_by) queryParams.append("sort_by", params.sort_by);
    if (params.sort_direction)
      queryParams.append("sort_direction", params.sort_direction);

    const url = queryParams.toString()
      ? `${BASE_URL}/verified?${queryParams}`
      : `${BASE_URL}/verified`;

    const response = await fetch(url, {
      method: "GET",
      headers: getHeaders(false),
      next: { revalidate: 1800 }, // 30 minutes cache
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Get verified companies error:", result);
      throw new Error(result.message || "خطا در دریافت شرکت‌های تایید شده");
    }

    console.log("Verified companies retrieved successfully");
    return {
      success: true,
      data: result.data,
      meta: result.meta,
    };
  } catch (error) {
    console.error("Get verified companies error:", error);
    return {
      success: false,
      message: error.message || "خطا در دریافت شرکت‌های تایید شده",
    };
  }
}

/**
 * آپلود تصویر شرکت
 */
export async function uploadCompanyImage(
  companyId,
  imageFile,
  imageType = "logo"
) {
  try {
    console.log("Uploading company image:", companyId, imageType);

    const formData = new FormData();
    formData.append(imageType, imageFile);

    const response = await fetch(`${BASE_URL}/${companyId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        // Don't set Content-Type for FormData
      },
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Upload image error:", result);
      throw new Error(result.message || "خطا در آپلود تصویر");
    }

    console.log("Image uploaded successfully:", result);
    return {
      success: true,
      data: result.data,
      message: "تصویر با موفقیت آپلود شد",
    };
  } catch (error) {
    console.error("Upload image error:", error);
    return {
      success: false,
      message: error.message || "خطا در آپلود تصویر",
    };
  }
}

// Fallback functions برای localStorage
export async function saveCompanyToLocalStorage(companyData) {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("company_profile", JSON.stringify(companyData));
      return true;
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      return false;
    }
  }
  return false;
}

export async function getCompanyFromLocalStorage() {
  if (typeof window !== "undefined") {
    try {
      const data = localStorage.getItem("company_profile");
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return null;
    }
  }
  return null;
}
