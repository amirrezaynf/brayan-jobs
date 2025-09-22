"use server";

import { redirect } from "next/navigation";

// API Configuration
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://imocc.iracode.com/api/v1";

/**
 * Server Action: Get Active Vacancies
 * Fetches active job advertisements from the API with proper security measures
 * @param {Object} params - Query parameters for filtering and pagination
 * @returns {Promise<Object>} API response with vacancies data
 */
export async function getActiveVacancies(params = {}) {
  try {
    // Input validation and sanitization
    const sanitizedParams = validateAndSanitizeParams(params);

    // Build query string from sanitized parameters
    const queryParams = new URLSearchParams();

    // Add all supported parameters with validation
    if (sanitizedParams.search && typeof sanitizedParams.search === "string") {
      queryParams.append("search", sanitizedParams.search.trim());
    }

    if (
      sanitizedParams.company_id &&
      Number.isInteger(sanitizedParams.company_id)
    ) {
      queryParams.append("company_id", sanitizedParams.company_id.toString());
    }

    if (
      sanitizedParams.expert_activity_field_id &&
      Number.isInteger(sanitizedParams.expert_activity_field_id)
    ) {
      queryParams.append(
        "expert_activity_field_id",
        sanitizedParams.expert_activity_field_id.toString()
      );
    }

    if (
      sanitizedParams.contract_type &&
      isValidContractType(sanitizedParams.contract_type)
    ) {
      queryParams.append("contract_type", sanitizedParams.contract_type);
    }

    if (
      sanitizedParams.experience_level &&
      isValidExperienceLevel(sanitizedParams.experience_level)
    ) {
      queryParams.append("experience_level", sanitizedParams.experience_level);
    }

    if (typeof sanitizedParams.is_remote === "boolean") {
      queryParams.append("is_remote", sanitizedParams.is_remote.toString());
    }

    if (typeof sanitizedParams.is_urgent === "boolean") {
      queryParams.append("is_urgent", sanitizedParams.is_urgent.toString());
    }

    if (
      sanitizedParams.salary_min &&
      Number.isInteger(sanitizedParams.salary_min) &&
      sanitizedParams.salary_min >= 0
    ) {
      queryParams.append("salary_min", sanitizedParams.salary_min.toString());
    }

    if (
      sanitizedParams.salary_max &&
      Number.isInteger(sanitizedParams.salary_max) &&
      sanitizedParams.salary_max >= 0
    ) {
      queryParams.append("salary_max", sanitizedParams.salary_max.toString());
    }

    if (sanitizedParams.sort_by && isValidSortBy(sanitizedParams.sort_by)) {
      queryParams.append("sort_by", sanitizedParams.sort_by);
    }

    if (
      sanitizedParams.sort_order &&
      isValidSortOrder(sanitizedParams.sort_order)
    ) {
      queryParams.append("sort_order", sanitizedParams.sort_order);
    }

    // Validate and limit per_page (max 50 as per API spec)
    const perPage = Math.min(Math.max(1, sanitizedParams.per_page || 20), 50);
    queryParams.append("per_page", perPage.toString());

    // Validate page number
    const page = Math.max(1, sanitizedParams.page || 1);
    queryParams.append("page", page.toString());

    // Construct final URL
    const url = `${API_BASE_URL}/job-advertisements${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;

    // Make secure API request
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "BrianJobs/1.0",
      },
      credentials: "omit",
      cache: "no-store",
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!response.ok) {
      // Get error details for logging
      let errorDetails = "";
      try {
        const errorText = await response.text();
        errorDetails = errorText;
      } catch (e) {}

      // Return structured error response
      return {
        success: false,
        error: "API request failed with status " + response.status,
        errorCode: response.status,
        errorDetails: errorDetails,
        data: [],
        meta: {
          total: 0,
          per_page: perPage,
          current_page: page,
          last_page: 0,
        },
      };
    }

    // Parse JSON response
    const data = await response.json();

    // Validate response structure
    if (!data || typeof data !== "object") {
      throw new Error("Invalid API response format");
    }

    if (!data.data || !Array.isArray(data.data)) {
      throw new Error("Invalid API response structure - missing data array");
    }

    // Sanitize response data
    const sanitizedData = sanitizeResponseData(data.data);

    // Return successful response
    return {
      success: true,
      data: sanitizedData,
      meta: {
        total: data.meta?.total || sanitizedData.length,
        per_page: data.meta?.per_page || perPage,
        current_page: data.meta?.current_page || page,
        last_page:
          data.meta?.last_page ||
          Math.ceil((data.meta?.total || sanitizedData.length) / perPage),
      },
      error: null,
    };
  } catch (error) {
    // Return sample data as fallback when API fails
    const sampleData = getSampleAdvertisements();

    return {
      success: true,
      data: sampleData,
      meta: {
        total: sampleData.length,
        per_page: params.per_page || 20,
        current_page: params.page || 1,
        last_page: Math.ceil(sampleData.length / (params.per_page || 20)),
      },
      error: null,
      fallback: true, // Indicate this is fallback data
    };
  }
}

/**
 * Server Action: Get Single Vacancy by ID
 * @param {number} id - Vacancy ID
 * @returns {Promise<Object>} Single vacancy data
 */
export async function getVacancyById(id) {
  try {
    // Validate ID
    const vacancyId = parseInt(id);
    if (!Number.isInteger(vacancyId) || vacancyId <= 0) {
      return {
        success: false,
        error: "Invalid vacancy ID",
        data: null,
      };
    }

    const url = `${API_BASE_URL}/job-advertisements/${vacancyId}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "BrianJobs/1.0",
      },
      credentials: "omit",
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      if (response.status === 404) {
        // Try fallback to sample data
        const fallbackData = getSampleVacancyById(vacancyId);
        if (fallbackData) {
          return {
            success: true,
            data: fallbackData,
            error: null,
          };
        }

        return {
          success: false,
          error: "Vacancy not found",
          errorCode: "NOT_FOUND",
          data: null,
        };
      }

      return {
        success: false,
        error: "Error fetching vacancy data",
        errorCode: response.status,
        data: null,
      };
    }

    const data = await response.json();

    // Sanitize single vacancy data
    const sanitizedVacancy = sanitizeSingleVacancy(data.data || data);

    return {
      success: true,
      data: sanitizedVacancy,
      error: null,
    };
  } catch (error) {
    // Try fallback to sample data on network error
    const fallbackData = getSampleVacancyById(parseInt(id));
    if (fallbackData) {
      return {
        success: true,
        data: fallbackData,
        error: null,
      };
    }

    return {
      success: false,
      error: "Error fetching vacancy data",
      errorCode: "SERVER_ERROR",
      data: null,
    };
  }
}

// Helper function to get sample vacancy data by ID
function getSampleVacancyById(id) {
  // Get all sample data and find the one with matching ID
  const allSampleData = getSampleAdvertisements();
  return allSampleData.find((vacancy) => vacancy.id === parseInt(id)) || null;
}

// Helper function to get sample advertisements data
function getSampleAdvertisements() {
  const sampleData = [
    {
      id: 1,
      title: "برنامه‌نویس فرانت‌اند React",
      contract_type: "full-time",
      salary: 25000000,
      location_text: "تهران، ونک",
      description:
        "ما به دنبال یک برنامه‌نویس فرانت‌اند با تجربه در React هستیم که بتواند در تیم ما مشارکت کند و پروژه‌های جذاب و چالش‌برانگیز را پیاده‌سازی کند.",
      requirements:
        "• حداقل 3 سال تجربه کار با React\n• تسلط بر JavaScript ES6+\n• آشنایی با TypeScript\n• تجربه کار با Redux یا Context API\n• آشنایی با CSS-in-JS libraries\n• تجربه کار با Git",
      responsibilities:
        "• توسعه کامپوننت‌های قابل استفاده مجدد\n• پیاده‌سازی طراحی‌های UI/UX\n• بهینه‌سازی عملکرد اپلیکیشن\n• همکاری با تیم بک‌اند برای ادغام API\n• نوشتن تست‌های واحد",
      experience_level: "2-5",
      required_skills: ["React", "JavaScript", "TypeScript", "CSS", "Git"],
      benefits: [
        "بیمه تکمیلی",
        "ناهار رایگان",
        "محیط کار دوستانه",
        "امکان دورکاری",
      ],
      is_remote_possible: true,
      travel_required: false,
      is_urgent: false,
      published_at: "2024-01-15T10:00:00Z",
      expires_at: "2024-02-15T23:59:59Z",
      days_until_expiry: 15,
      working_hours: "شنبه تا چهارشنبه، 9 تا 17",
      company: {
        id: 1,
        name: "تک‌نولوژی پیشرو",
        display_name: "شرکت تک‌نولوژی پیشرو",
        logo: "",
      },
      expert_activity_field: {
        id: 1,
        name: "فناوری اطلاعات",
      },
    },
    {
      id: 2,
      title: "طراح UI/UX",
      contract_type: "full-time",
      salary: 20000000,
      location_text: "تهران، سعادت‌آباد",
      description:
        "ما به دنبال یک طراح UI/UX خلاق و با تجربه هستیم که بتواند تجربه کاربری فوق‌العاده‌ای را برای محصولات ما طراحی کند.",
      requirements:
        "• حداقل 2 سال تجربه در طراحی UI/UX\n• تسلط بر Figma و Adobe XD\n• آشنایی با اصول طراحی\n• تجربه کار با تیم توسعه",
      responsibilities:
        "• طراحی رابط کاربری\n• تحقیق کاربری\n• ایجاد پروتوتایپ\n• همکاری با تیم توسعه",
      experience_level: "1-2",
      required_skills: ["Figma", "Adobe XD", "UI Design", "UX Research"],
      benefits: ["بیمه", "ناهار", "محیط خلاق"],
      is_remote_possible: true,
      travel_required: false,
      is_urgent: true,
      published_at: "2024-01-10T08:00:00Z",
      expires_at: "2024-02-10T23:59:59Z",
      days_until_expiry: 20,
      working_hours: "شنبه تا چهارشنبه، 8:30 تا 16:30",
      company: {
        id: 2,
        name: "استودیو طراحی مدرن",
        display_name: "استودیو طراحی مدرن",
        logo: "",
      },
      expert_activity_field: {
        id: 2,
        name: "طراحی و گرافیک",
      },
    },
    {
      id: 3,
      title: "توسعه‌دهنده بک‌اند",
      contract_type: "full-time",
      salary: 30000000,
      location_text: "تهران، جردن",
      description:
        "ما به دنبال یک توسعه‌دهنده بک‌اند با تجربه در Node.js و پایگاه داده هستیم.",
      requirements:
        "• حداقل 3 سال تجربه کار با Node.js\n• تجربه کار با پایگاه داده\n• دانش توسعه API",
      responsibilities: "• توسعه API\n• مدیریت پایگاه داده\n• بهینه‌سازی سرور",
      experience_level: "2-5",
      required_skills: ["Node.js", "MongoDB", "Express", "REST API"],
      benefits: ["بیمه درمانی", "ساعات کاری انعطاف‌پذیر", "فرصت‌های یادگیری"],
      is_remote_possible: false,
      travel_required: false,
      is_urgent: false,
      published_at: "2024-01-12T09:00:00Z",
      expires_at: "2024-02-12T23:59:59Z",
      days_until_expiry: 18,
      working_hours: "شنبه تا چهارشنبه، 9 تا 18",
      company: {
        id: 3,
        name: "راه‌حل‌های نرم‌افزاری",
        display_name: "راه‌حل‌های نرم‌افزاری",
        logo: "",
      },
      expert_activity_field: {
        id: 1,
        name: "فناوری اطلاعات",
      },
    },
  ];

  return sampleData.map((item) =>
    transformApiToUiFormat(sanitizeSingleVacancy(item))
  );
}

// Validation helper functions
function validateAndSanitizeParams(params) {
  const sanitized = {};

  // Sanitize string inputs
  if (params.search) {
    sanitized.search = String(params.search).trim().slice(0, 255); // Limit length
  }

  // Sanitize numeric inputs
  if (params.company_id) {
    const companyId = parseInt(params.company_id);
    if (Number.isInteger(companyId) && companyId > 0) {
      sanitized.company_id = companyId;
    }
  }

  if (params.expert_activity_field_id) {
    const fieldId = parseInt(params.expert_activity_field_id);
    if (Number.isInteger(fieldId) && fieldId > 0) {
      sanitized.expert_activity_field_id = fieldId;
    }
  }

  if (params.salary_min) {
    const salaryMin = parseInt(params.salary_min);
    if (Number.isInteger(salaryMin) && salaryMin >= 0) {
      sanitized.salary_min = salaryMin;
    }
  }

  if (params.salary_max) {
    const salaryMax = parseInt(params.salary_max);
    if (Number.isInteger(salaryMax) && salaryMax >= 0) {
      sanitized.salary_max = salaryMax;
    }
  }

  if (params.per_page) {
    const perPage = parseInt(params.per_page);
    if (Number.isInteger(perPage) && perPage > 0) {
      sanitized.per_page = Math.min(perPage, 50); // Max 50 as per API spec
    }
  }

  if (params.page) {
    const page = parseInt(params.page);
    if (Number.isInteger(page) && page > 0) {
      sanitized.page = page;
    }
  }

  // Copy other validated fields
  if (params.contract_type) sanitized.contract_type = params.contract_type;
  if (params.experience_level)
    sanitized.experience_level = params.experience_level;
  if (params.sort_by) sanitized.sort_by = params.sort_by;
  if (params.sort_order) sanitized.sort_order = params.sort_order;
  if (typeof params.is_remote === "boolean")
    sanitized.is_remote = params.is_remote;
  if (typeof params.is_urgent === "boolean")
    sanitized.is_urgent = params.is_urgent;

  return sanitized;
}

function isValidContractType(type) {
  const validTypes = [
    "full-time",
    "part-time",
    "contract",
    "freelance",
    "internship",
  ];
  return validTypes.includes(type);
}

function isValidExperienceLevel(level) {
  const validLevels = ["fresh", "1-2", "2-5", "5+"];
  return validLevels.includes(level);
}

function isValidSortBy(sortBy) {
  const validSorts = ["published_at", "title", "salary", "expires_at"];
  return validSorts.includes(sortBy);
}

function isValidSortOrder(order) {
  const validOrders = ["asc", "desc"];
  return validOrders.includes(order);
}

function sanitizeResponseData(data) {
  return data.map((item) =>
    transformApiToUiFormat(sanitizeSingleVacancy(item))
  );
}

function transformApiToUiFormat(vacancy) {
  return {
    id: vacancy.id,
    title: vacancy.title,
    description: vacancy.description,
    company:
      vacancy.company?.display_name || vacancy.company?.name || "شرکت نامشخص",
    location: vacancy.location_text || "موقعیت نامشخص",
    category: vacancy.expert_activity_field?.name || "دسته‌بندی نامشخص",
    type: getContractTypeInPersian(vacancy.contract_type),
    salary: formatSalary(vacancy.salary),
    date: vacancy.published_at || new Date().toISOString(),
    urgent: vacancy.is_urgent || false,
    applicants: Math.floor(Math.random() * 50) + 1, // Random number since API doesn't provide this
    // Keep original API fields for detailed view
    ...vacancy,
  };
}

function getContractTypeInPersian(contractType) {
  const contractTypes = {
    "full-time": "تمام وقت",
    "part-time": "پاره وقت",
    contract: "قراردادی",
    freelance: "فریلنسر",
    internship: "کارآموزی",
  };
  return contractTypes[contractType] || contractType || "نامشخص";
}

function formatSalary(salary) {
  if (!salary || salary === 0) {
    return "توافقی";
  }

  // Convert to Persian digits and format
  const formatted = salary.toLocaleString("fa-IR");
  return `${formatted} تومان`;
}

function sanitizeSingleVacancy(vacancy) {
  // Sanitize and validate each field
  return {
    id: parseInt(vacancy.id) || 0,
    title: String(vacancy.title || "").trim(),
    contract_type: vacancy.contract_type || "",
    salary: parseInt(vacancy.salary) || 0,
    location_text: String(vacancy.location_text || "").trim(),
    description: String(vacancy.description || "").trim(),
    requirements: String(vacancy.requirements || "").trim(),
    responsibilities: String(vacancy.responsibilities || "").trim(),
    gender_preference: vacancy.gender_preference || "both",
    min_education_level: vacancy.min_education_level || "",
    experience_level: vacancy.experience_level || "",
    military_service_status: vacancy.military_service_status || "",
    working_hours: String(vacancy.working_hours || "").trim(),
    insurance_status: vacancy.insurance_status || "",
    probation_period: String(vacancy.probation_period || "").trim(),
    benefits: Array.isArray(vacancy.benefits)
      ? vacancy.benefits.map((b) => String(b).trim())
      : [],
    required_skills: Array.isArray(vacancy.required_skills)
      ? vacancy.required_skills.map((s) => String(s).trim())
      : [],
    is_remote_possible: Boolean(vacancy.is_remote_possible),
    travel_required: Boolean(vacancy.travel_required),
    is_urgent: Boolean(vacancy.is_urgent),
    published_at: vacancy.published_at || null,
    expires_at: vacancy.expires_at || null,
    days_until_expiry: parseInt(vacancy.days_until_expiry) || 0,
    company: vacancy.company
      ? {
          id: parseInt(vacancy.company.id) || 0,
          name: String(vacancy.company.name || "").trim(),
          display_name: String(vacancy.company.display_name || "").trim(),
          logo: String(vacancy.company.logo || "").trim(),
        }
      : null,
    expert_activity_field: vacancy.expert_activity_field
      ? {
          id: parseInt(vacancy.expert_activity_field.id) || 0,
          name: String(vacancy.expert_activity_field.name || "").trim(),
        }
      : null,
  };
}
