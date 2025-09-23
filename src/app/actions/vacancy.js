"use server";

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
    return null;
  }
}

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
    };
  }
}

// Update existing vacancy
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
    };
  }
}

// Delete vacancy
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
    };
  }
}

// Get vacancy details
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
    };
  }
}
