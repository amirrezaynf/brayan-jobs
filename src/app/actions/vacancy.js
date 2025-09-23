"use server";

<<<<<<< HEAD
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
  if (typeof window === 'undefined') {
    try {
      const { cookies } = require('next/headers');
      const cookieStore = cookies();
      return cookieStore.get('auth_token')?.value;
    } catch (error) {
      console.warn('Could not access cookies in server context:', error);
      return null;
    }
  }
  
  // In client-side context, get from localStorage
  try {
    return localStorage.getItem('auth_token');
  } catch (error) {
    console.warn('Could not access localStorage:', error);
=======
import { cookies } from "next/headers";

// API Configuration
const API_BASE_URL = "https://api.iracode.com/api/v1/job-advertisements";

// Helper function to get auth token
async function getAuthToken() {
  try {
    const cookieStore = cookies();
    const authToken = cookieStore.get("auth_token")?.value;
    return authToken;
  } catch (error) {
    console.error("Error accessing cookies:", error);
>>>>>>> d1403fdce47523412bdfbab327832ae51ccbb960
    return null;
  }
}

<<<<<<< HEAD
// Map form data to API format
function mapFormDataToAPI(formData) {
  // Map contract type
  const contractTypeMap = {
    "full-time": "full-time",
    "part-time": "part-time", 
    "contract": "contract",
    "freelance": "freelance",
    "remote": "remote"
  };

  // Map gender preference
  const genderMap = {
    "both": "both",
    "male": "male", 
    "female": "female"
  };

  // Map education level
  const educationMap = {
    "دیپلم": "diploma",
    "کاردانی": "associate",
    "کارشناسی": "bachelor",
    "کارشناسی ارشد": "master",
    "دکتری": "phd"
  };

  // Map experience level
  const experienceMap = {
    "بدون تجربه": "0-1",
    "۱ تا ۲ سال": "1-2",
    "۲ تا ۵ سال": "2-5",
    "۵ تا ۱۰ سال": "5-10",
    "بیش از ۱۰ سال": "10+"
  };

  // Map military service status
  const militaryServiceMap = {
    "معاف": "exempt",
    "پایان خدمت": "completed",
    "در حال خدمت": "serving",
    "مشمول": "eligible"
  };

  // Map insurance status
  const insuranceMap = {
    "full": "full",
    "partial": "partial",
    "none": "none"
  };

  // Extract skills from requirements text (simple implementation)
  const extractSkills = (requirementsText) => {
    const commonSkills = [
      "Laravel", "PHP", "MySQL", "JavaScript", "React", "Vue.js", "Node.js", 
      "Python", "Django", "HTML", "CSS", "Bootstrap", "Tailwind", "Git",
      "Docker", "Redis", "PostgreSQL", "MongoDB", "REST API", "GraphQL"
    ];
    
    const foundSkills = commonSkills.filter(skill => 
      requirementsText.toLowerCase().includes(skill.toLowerCase())
    );
    
    return foundSkills.length > 0 ? foundSkills : ["برنامه‌نویسی"];
  };

  return {
    company_id: 1, // This should be dynamic based on authenticated user's company
    expert_activity_field_id: 1, // This should be mapped from category
    title: formData.title,
    contract_type: contractTypeMap[formData.type] || "full-time",
    salary: formData.salary ? parseInt(formData.salary.replace(/,/g, '')) : null,
    location_text: formData.location,
    description: formData.description,
    requirements: formData.requirements,
    responsibilities: formData.description, // Using description as responsibilities for now
    gender_preference: genderMap[formData.gender] || "both",
    min_education_level: educationMap[formData.education] || "bachelor",
    experience_level: experienceMap[formData.experience] || "1-2",
    military_service_status: militaryServiceMap[formData.militaryService] || "completed",
    working_hours: formData.workHours || "9 تا 17",
    insurance_status: insuranceMap[formData.insurance] || "full",
    probation_period: formData.probationPeriod || "3 ماه",
    benefits: Array.isArray(formData.benefits) ? formData.benefits : [formData.benefits].filter(Boolean),
    required_skills: extractSkills(formData.requirements || ""),
    is_remote_possible: formData.remoteWork || false,
    travel_required: formData.travelRequired || false,
    is_urgent: formData.urgent || false,
    expires_at: formData.expiresAt || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 30 days from now
  };
}

// Create new vacancy
export async function createVacancy(formData) {
  try {
    const token = getAuthToken();
    
    if (!token) {
      return {
        success: false,
        error: "برای ثبت آگهی باید وارد حساب کاربری خود شوید"
      };
    }

    const apiData = mapFormDataToAPI(formData);

    const response = await fetch(`${BASE_URL}/vacancies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(apiData)
    });

    const result = await handleApiResponse(response);

    return {
      success: true,
      data: result.data,
      message: result.message || "آگهی با موفقیت ثبت شد"
    };

  } catch (error) {
    return {
      success: false,
      error: error.message
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
        error: "برای مشاهده آگهی‌ها باید وارد حساب کاربری خود شوید"
      };
    }

    const response = await fetch(`${BASE_URL}/vacancies/my`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    const result = await handleApiResponse(response);

    return {
      success: true,
      data: result.data,
      message: result.message
    };

  } catch (error) {
    return {
      success: false,
      error: error.message
=======
// Helper function for headers
async function getHeaders(includeAuth = true) {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (includeAuth) {
    const token = await getAuthToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  return headers;
}

// Create new vacancy
export async function createVacancy(vacancyData) {
  try {
    console.log("🚀 Creating vacancy with data:", vacancyData);
    
    const headers = await getHeaders();
    const response = await fetch(`${API_BASE_URL}`, {
      method: "POST",
      headers,
      body: JSON.stringify(vacancyData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
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
    return {
      success: false,
      error: error.message || "خطا در ایجاد آگهی",
>>>>>>> d1403fdce47523412bdfbab327832ae51ccbb960
    };
  }
}

// Update existing vacancy
<<<<<<< HEAD
export async function updateVacancy(vacancyId, formData) {
  try {
    const token = getAuthToken();
    
    if (!token) {
      return {
        success: false,
        error: "برای ویرایش آگهی باید وارد حساب کاربری خود شوید"
      };
    }

    const apiData = mapFormDataToAPI(formData);

    const response = await fetch(`${BASE_URL}/vacancies/${vacancyId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(apiData)
    });

    const result = await handleApiResponse(response);

    return {
      success: true,
      data: result.data,
      message: result.message || "آگهی با موفقیت به‌روزرسانی شد"
    };

  } catch (error) {
    return {
      success: false,
      error: error.message
=======
export async function updateVacancy(id, vacancyData) {
  try {
    console.log("🚀 Updating vacancy", id, "with data:", vacancyData);
    
    const headers = await getHeaders();
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(vacancyData),
    });

    if (!response.ok) {
      const errorData = await response.json();
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
    console.error("❌ Error updating vacancy:", error);
    return {
      success: false,
      error: error.message || "خطا در به‌روزرسانی آگهی",
>>>>>>> d1403fdce47523412bdfbab327832ae51ccbb960
    };
  }
}

// Delete vacancy
<<<<<<< HEAD
export async function deleteVacancy(vacancyId) {
  try {
    const token = getAuthToken();
    
    if (!token) {
      return {
        success: false,
        error: "برای حذف آگهی باید وارد حساب کاربری خود شوید"
      };
    }

    const response = await fetch(`${BASE_URL}/vacancies/${vacancyId}`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    const result = await handleApiResponse(response);

    return {
      success: true,
      data: result.data,
      message: result.message || "آگهی با موفقیت حذف شد"
    };

  } catch (error) {
    return {
      success: false,
      error: error.message
=======
export async function deleteVacancy(id) {
  try {
    console.log("🚀 Deleting vacancy:", id);
    
    const headers = await getHeaders();
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
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

// Get user vacancies
export async function getUserVacancies() {
  try {
    console.log("🚀 Getting user vacancies");
    
    const headers = await getHeaders();
    const response = await fetch(`${API_BASE_URL}/my/active`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
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
>>>>>>> d1403fdce47523412bdfbab327832ae51ccbb960
    };
  }
}

// Get vacancy details
<<<<<<< HEAD
export async function getVacancyDetails(vacancyId) {
  try {
    const token = getAuthToken();
    
    if (!token) {
      return {
        success: false,
        error: "برای مشاهده جزئیات آگهی باید وارد حساب کاربری خود شوید"
      };
    }

    const response = await fetch(`${BASE_URL}/vacancies/${vacancyId}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    const result = await handleApiResponse(response);

    return {
      success: true,
      data: result.data,
      message: result.message
    };

  } catch (error) {
    return {
      success: false,
      error: error.message
=======
export async function getVacancyDetails(id) {
  try {
    console.log("🚀 Getting vacancy details for:", id);
    
    const headers = await getHeaders();
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
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
>>>>>>> d1403fdce47523412bdfbab327832ae51ccbb960
    };
  }
}
