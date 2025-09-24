"use client";

// Debug utility to check vacancy submission data
export function debugVacancyData() {
  console.log("🔍 ===== DEBUGGING VACANCY SUBMISSION =====");
  
  // Check localStorage data
  console.log("📦 localStorage contents:");
  
  try {
    const userProfile = JSON.parse(localStorage.getItem("userProfile") || "{}");
    console.log("👤 userProfile:", userProfile);
  } catch (e) {
    console.log("❌ Error parsing userProfile:", e);
  }
  
  try {
    const companyData = JSON.parse(localStorage.getItem("companyData") || "{}");
    console.log("🏢 companyData:", companyData);
  } catch (e) {
    console.log("❌ Error parsing companyData:", e);
  }
  
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    console.log("👤 user:", user);
  } catch (e) {
    console.log("❌ Error parsing user:", e);
  }
  
  try {
    const authToken = localStorage.getItem("authToken") || localStorage.getItem("auth_token");
    console.log("🔑 authToken:", authToken ? `${authToken.substring(0, 20)}...` : "null");
  } catch (e) {
    console.log("❌ Error getting authToken:", e);
  }
  
  console.log("🔍 ===== END DEBUG =====");
}

// Test function to create a minimal valid vacancy
export function createTestVacancy() {
  return {
    company_id: 1, // We'll set this manually for testing
    expert_activity_field_id: 1, // IT field
    title: "تست آگهی",
    contract_type: "full-time",
    location_text: "تهران",
    description: "این یک آگهی تست است",
    requirements: "بدون نیاز به مهارت خاص",
    gender_preference: "both",
    min_education_level: "bachelor",
    experience_level: "fresh",
    military_service_status: "not-required",
    working_hours: "9 تا 17",
    insurance_status: "full",
    probation_period: "3 ماه",
    benefits: [],
    required_skills: [],
    is_remote_possible: false,
    travel_required: false,
    is_urgent: false,
    expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  };
}

// Function to test API directly
export async function testVacancyAPI() {
  console.log("🧪 ===== TESTING VACANCY API DIRECTLY =====");
  
  const testData = createTestVacancy();
  console.log("📦 Test data:", testData);
  
  const authToken = localStorage.getItem("authToken") || localStorage.getItem("auth_token");
  
  console.log("🔑 Auth token check:");
  console.log("  - authToken:", localStorage.getItem("authToken") ? "EXISTS" : "NULL");
  console.log("  - auth_token:", localStorage.getItem("auth_token") ? "EXISTS" : "NULL");
  console.log("  - Final token:", authToken ? `${authToken.substring(0, 20)}...` : "NULL");
  
  if (!authToken) {
    console.log("❌ No auth token found!");
    return { success: false, error: "هیچ توکن احراز هویتی یافت نشد. لطفاً وارد شوید." };
  }
  
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${authToken}`
  };
  
  console.log("🔑 Headers:", headers);
  console.log("🌐 API URL: https://imocc.iracode.com/api/v1/job-advertisements");
  
  try {
    console.log("📡 Starting API request...");
    
    // Use local proxy to avoid CORS issues
    const proxyUrl = "/api/proxy/job-advertisements";
    console.log("🔄 Using proxy URL:", proxyUrl);
    
    const response = await fetch(proxyUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(testData),
    });
    
    console.log("📡 Response received:");
    console.log("  - Status:", response.status);
    console.log("  - Status Text:", response.statusText);
    console.log("  - OK:", response.ok);
    console.log("  - Headers:", Object.fromEntries(response.headers.entries()));
    
    const responseText = await response.text();
    console.log("📡 Raw response text:", responseText);
    
    if (!response.ok) {
      console.log(`❌ API returned error status: ${response.status}`);
      
      try {
        const errorData = JSON.parse(responseText);
        console.log("📡 Parsed error data:", errorData);
        
        if (response.status === 400 && errorData.errors) {
          const validationErrors = Object.values(errorData.errors).flat();
          console.log("❌ Validation errors:", validationErrors);
          return { 
            success: false, 
            error: `خطاهای اعتبارسنجی: ${validationErrors.join(", ")}`,
            details: errorData
          };
        }
        
        return { 
          success: false, 
          error: errorData.message || `خطای سرور: ${response.status}`,
          details: errorData
        };
      } catch (parseError) {
        console.log("❌ Could not parse error response as JSON:", parseError);
        return { 
          success: false, 
          error: `خطای سرور ${response.status}: ${responseText}` 
        };
      }
    }
    
    try {
      const responseData = JSON.parse(responseText);
      console.log("✅ Success! Parsed response:", responseData);
      return { success: true, data: responseData };
    } catch (parseError) {
      console.log("❌ Could not parse success response as JSON:", parseError);
      return { 
        success: false, 
        error: "پاسخ سرور قابل تفسیر نیست",
        rawResponse: responseText 
      };
    }
    
  } catch (error) {
    console.error("❌ Network/Fetch error:", error);
    console.error("❌ Error details:", {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return { 
        success: false, 
        error: "خطا در اتصال به سرور. لطفاً اتصال اینترنت را بررسی کنید." 
      };
    }
    
    return { 
      success: false, 
      error: error.message || "خطای نامشخص در درخواست API" 
    };
  }
}

// Function to create a company first
export async function createTestCompany() {
  console.log("🏢 ===== CREATING TEST COMPANY =====");
  
  const authToken = localStorage.getItem("authToken") || localStorage.getItem("auth_token");
  
  if (!authToken) {
    console.log("❌ No auth token found!");
    return { success: false, error: "هیچ توکن احراز هویتی یافت نشد." };
  }
  
  const companyData = {
    name: "دکتر برایان اعتماد",
    name_en: "Dr. Brian Etmad", 
    display_name: "دکتر برایان اعتماد",
    code: "BRIAN001",
    expert_activity_field_id: 2, // Try ID 2 (Banking/Finance) - commonly available
    size: 3, // 51-200 employees
    founded_year: 2016,
    introduction: "پلتفرم استخدامی پیشرفته با استفاده از هوش مصنوعی",
    vision: "تبدیل شدن به پیشروترین پلتفرم استخدامی در منطقه",
    mission: "کمک به سازمان‌ها برای جذب بهترین نیروی کار",
    email: "info@brian-etmad.com",
    website: "https://brian-etmad.com",
    phone: "02188776655",
    mobile: "09123456789",
    address: "تهران، خیابان ولیعصر، زعفرانیه",
    postal_code: "1234567890",
    city_id: 1, // Tehran
    province_id: 1, // Tehran Province
    services: ["استخدام متخصصان IT", "ارزیابی فنی", "مشاوره منابع انسانی"],
    technical_specialties: ["React", "Node.js", "Python", "DevOps"],
    benefits: ["بیمه تکمیلی", "ساعت کاری منعطف", "امکان کار از راه دور"],
    work_environment: "محیط کاری حرفه‌ای با تیم جوان و متخصص"
  };
  
  console.log("📦 Company data:", companyData);
  
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${authToken}`
  };
  
  try {
    const response = await fetch("/api/proxy/companies", {
      method: "PUT", // API requires PUT method for company creation
      headers,
      body: JSON.stringify(companyData),
    });
    
    console.log("📡 Company creation response status:", response.status);
    
    const responseText = await response.text();
    console.log("📡 Company creation response:", responseText);
    
    if (!response.ok) {
      try {
        const errorData = JSON.parse(responseText);
        return { 
          success: false, 
          error: errorData.message || `خطای سرور: ${response.status}`,
          details: errorData
        };
      } catch (e) {
        return { 
          success: false, 
          error: `خطای سرور ${response.status}: ${responseText}` 
        };
      }
    }
    
    try {
      const responseData = JSON.parse(responseText);
      console.log("✅ Company created successfully:", responseData);
      
      // Save company data to localStorage
      if (responseData.data) {
        localStorage.setItem("companyData", JSON.stringify(responseData.data));
        console.log("💾 Company data saved to localStorage");
      }
      
      return { success: true, data: responseData };
    } catch (e) {
      return { 
        success: false, 
        error: "پاسخ سرور قابل تفسیر نیست",
        rawResponse: responseText 
      };
    }
    
  } catch (error) {
    console.error("❌ Company creation error:", error);
    return { 
      success: false, 
      error: error.message || "خطا در ایجاد شرکت" 
    };
  }
}

// Function to get valid activity fields
export async function getActivityFields() {
  console.log("🎯 ===== GETTING ACTIVITY FIELDS =====");
  
  const authToken = localStorage.getItem("authToken") || localStorage.getItem("auth_token");
  
  const headers = {
    "Accept": "application/json",
  };
  
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }
  
  try {
    const response = await fetch("/api/proxy/activity-fields", {
      method: "GET",
      headers,
    });
    
    console.log("📡 Activity fields response status:", response.status);
    
    const responseText = await response.text();
    console.log("📡 Activity fields response:", responseText);
    
    if (!response.ok) {
      return { 
        success: false, 
        error: `خطای سرور: ${response.status}` 
      };
    }
    
    try {
      const responseData = JSON.parse(responseText);
      console.log("✅ Activity fields retrieved:", responseData);
      return { success: true, data: responseData };
    } catch (e) {
      return { 
        success: false, 
        error: "پاسخ سرور قابل تفسیر نیست" 
      };
    }
    
  } catch (error) {
    console.error("❌ Activity fields error:", error);
    return { 
      success: false, 
      error: error.message || "خطا در دریافت فیلدها" 
    };
  }
}

// Function to test different activity field IDs
export async function testActivityFieldIds() {
  console.log("🧪 ===== TESTING ACTIVITY FIELD IDS =====");
  
  const authToken = localStorage.getItem("authToken") || localStorage.getItem("auth_token");
  
  if (!authToken) {
    return { success: false, error: "هیچ توکن احراز هویتی یافت نشد." };
  }
  
  // Test different IDs
  const testIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const results = [];
  
  for (const id of testIds) {
    console.log(`🧪 Testing activity field ID: ${id}`);
    
    const companyData = {
      name: `تست شرکت ${id}`,
      name_en: `Test Company ${id}`,
      display_name: `تست شرکت ${id}`,
      code: `TEST${id}`,
      expert_activity_field_id: id,
      size: 3,
      founded_year: 2016,
      introduction: "تست",
      email: `test${id}@example.com`,
      phone: "02188776655",
      address: "تهران",
      city_id: 1,
      province_id: 1
    };
    
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${authToken}`
    };
    
    try {
      const response = await fetch("/api/proxy/companies", {
        method: "PUT",
        headers,
        body: JSON.stringify(companyData),
      });
      
      const responseText = await response.text();
      
      if (response.ok) {
        console.log(`✅ ID ${id} is VALID!`);
        results.push({ id, status: 'valid', response: responseText });
        break; // Stop at first valid ID
      } else {
        console.log(`❌ ID ${id} failed:`, responseText);
        results.push({ id, status: 'invalid', error: responseText });
      }
      
    } catch (error) {
      console.log(`❌ ID ${id} error:`, error.message);
      results.push({ id, status: 'error', error: error.message });
    }
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log("🧪 Test results:", results);
  return { success: true, results };
}
