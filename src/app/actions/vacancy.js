"use server";

const BASE_URL = "https://imocc.iracode.com/api/v1";

// Helper function to handle API responses
async function handleApiResponse(response) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "خطا در ارتباط با سرور");
  }

  return data;
}

// Helper function to get authentication token from cookies or localStorage
function getAuthToken() {
  // In server-side context, try to get from cookies
  if (typeof window === "undefined") {
    try {
      const { cookies } = require("next/headers");
      const cookieStore = cookies();
      return cookieStore.get("auth_token")?.value;
    } catch (error) {
      console.warn("Could not access cookies in server context:", error);
      return null;
    }
  }

  // In client-side context, get from localStorage
  try {
    return localStorage.getItem("auth_token");
  } catch (error) {
    console.warn("Could not access localStorage:", error);
    return null;
  }
}

// Map form data to API format
function mapFormDataToAPI(formData) {
  // Map contract type
  const contractTypeMap = {
    "full-time": "full-time",
    "part-time": "part-time",
    contract: "contract",
    freelance: "freelance",
    remote: "remote",
  };

  // Map gender preference
  const genderMap = {
    both: "both",
    male: "male",
    female: "female",
  };

  // Map education level
  const educationMap = {
    دیپلم: "diploma",
    کاردانی: "associate",
    کارشناسی: "bachelor",
    "کارشناسی ارشد": "master",
    دکتری: "phd",
  };

  // Map experience level
  const experienceMap = {
    "بدون تجربه": "0-1",
    "۱ تا ۲ سال": "1-2",
    "۲ تا ۵ سال": "2-5",
    "۵ تا ۱۰ سال": "5-10",
    "بیش از ۱۰ سال": "10+",
  };

  // Map military service status
  const militaryServiceMap = {
    معاف: "exempt",
    "پایان خدمت": "completed",
    "در حال خدمت": "serving",
    مشمول: "eligible",
  };

  // Map insurance status
  const insuranceMap = {
    full: "full",
    partial: "partial",
    none: "none",
  };

  // Extract skills from requirements text (simple implementation)
  const extractSkills = (requirementsText) => {
    const commonSkills = [
      "Laravel",
      "PHP",
      "MySQL",
      "JavaScript",
      "React",
      "Vue.js",
      "Node.js",
      "Python",
      "Django",
      "HTML",
      "CSS",
      "Bootstrap",
      "Tailwind",
      "Git",
      "Docker",
      "Redis",
      "PostgreSQL",
      "MongoDB",
      "REST API",
      "GraphQL",
    ];

    const foundSkills = commonSkills.filter((skill) =>
      requirementsText.toLowerCase().includes(skill.toLowerCase())
    );

    return foundSkills.length > 0 ? foundSkills : ["برنامه‌نویسی"];
  };

  return {
    company_id: 1, // This should be dynamic based on authenticated user's company
    expert_activity_field_id: 1, // This should be mapped from category
    title: formData.title,
    contract_type: contractTypeMap[formData.type] || "full-time",
    salary: formData.salary
      ? parseInt(formData.salary.replace(/,/g, ""))
      : null,
    location_text: formData.location,
    description: formData.description,
    requirements: formData.requirements,
    responsibilities: formData.description, // Using description as responsibilities for now
    gender_preference: genderMap[formData.gender] || "both",
    min_education_level: educationMap[formData.education] || "bachelor",
    experience_level: experienceMap[formData.experience] || "1-2",
    military_service_status:
      militaryServiceMap[formData.militaryService] || "completed",
    working_hours: formData.workHours || "9 تا 17",
    insurance_status: insuranceMap[formData.insurance] || "full",
    probation_period: formData.probationPeriod || "3 ماه",
    benefits: Array.isArray(formData.benefits)
      ? formData.benefits
      : [formData.benefits].filter(Boolean),
    required_skills: extractSkills(formData.requirements || ""),
    is_remote_possible: formData.remoteWork || false,
    travel_required: formData.travelRequired || false,
    is_urgent: formData.urgent || false,
    expires_at:
      formData.expiresAt ||
      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0], // 30 days from now
  };
}

// Create new vacancy
export async function createVacancy(formData) {
  try {
    const token = getAuthToken();

    if (!token) {
      return {
        success: false,
        error: "برای ثبت آگهی باید وارد حساب کاربری خود شوید",
      };
    }

    const apiData = mapFormDataToAPI(formData);

    const response = await fetch(`${BASE_URL}/vacancies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(apiData),
    });

    const result = await handleApiResponse(response);

    return {
      success: true,
      data: result.data,
      message: result.message || "آگهی با موفقیت ثبت شد",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

// Get user's vacancies
export async function getUserVacancies() {
  try {
    const token = getAuthToken();

    if (!token) {
      return {
        success: false,
        error: "برای مشاهده آگهی‌ها باید وارد حساب کاربری خود شوید",
      };
    }

    const response = await fetch(`${BASE_URL}/vacancies/my`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await handleApiResponse(response);

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

// Update existing vacancy
export async function updateVacancy(vacancyId, formData) {
  try {
    const token = getAuthToken();

    if (!token) {
      return {
        success: false,
        error: "برای ویرایش آگهی باید وارد حساب کاربری خود شوید",
      };
    }

    const apiData = mapFormDataToAPI(formData);

    const response = await fetch(`${BASE_URL}/vacancies/${vacancyId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(apiData),
    });

    const result = await handleApiResponse(response);

    return {
      success: true,
      data: result.data,
      message: result.message || "آگهی با موفقیت به‌روزرسانی شد",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

// Delete vacancy
export async function deleteVacancy(vacancyId) {
  try {
    const token = getAuthToken();

    if (!token) {
      return {
        success: false,
        error: "برای حذف آگهی باید وارد حساب کاربری خود شوید",
      };
    }

    const response = await fetch(`${BASE_URL}/vacancies/${vacancyId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await handleApiResponse(response);

    return {
      success: true,
      data: result.data,
      message: result.message || "آگهی با موفقیت حذف شد",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

// Get vacancy details
export async function getVacancyDetails(vacancyId) {
  try {
    const token = getAuthToken();

    if (!token) {
      return {
        success: false,
        error: "برای مشاهده جزئیات آگهی باید وارد حساب کاربری خود شوید",
      };
    }

    const response = await fetch(`${BASE_URL}/vacancies/${vacancyId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await handleApiResponse(response);

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}
