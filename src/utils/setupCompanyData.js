"use client";

// Temporary setup function to create company data in localStorage
export function setupTempCompanyData() {
  console.log("🏢 Setting up temporary company data...");
  
  // Create a temporary company profile
  const tempCompanyData = {
    id: 1, // Temporary company ID
    name: "دکتر برایان اعتماد",
    name_en: "Dr. Brian Etmad",
    display_name: "دکتر برایان اعتماد",
    industry_type: "technology",
    expert_activity_field_id: 1, // IT field
    size: 3, // 51-200 employees
    founded_year: 2016,
    city: "تهران",
    province: "تهران",
    address: "خیابان ولیعصر، زعفرانیه",
    phone: "021-88776655",
    email: "info@brian-etmad.com",
    website: "https://brian-etmad.com"
  };
  
  // Save to localStorage
  localStorage.setItem("companyData", JSON.stringify(tempCompanyData));
  
  // Also create user profile with company_id
  const tempUserProfile = {
    id: 1,
    name: "کاربر تست",
    email: "test@brian-etmad.com",
    role: "employer",
    company_id: 1
  };
  
  localStorage.setItem("userProfile", JSON.stringify(tempUserProfile));
  
  console.log("✅ Temporary company data created:", tempCompanyData);
  console.log("✅ Temporary user profile created:", tempUserProfile);
  
  return { companyData: tempCompanyData, userProfile: tempUserProfile };
}

// Function to check if company data exists
export function checkCompanyData() {
  console.log("🔍 Checking company data in localStorage...");
  
  const companyData = localStorage.getItem("companyData");
  const userProfile = localStorage.getItem("userProfile");
  const user = localStorage.getItem("user");
  
  console.log("🏢 companyData exists:", !!companyData);
  console.log("👤 userProfile exists:", !!userProfile);
  console.log("👤 user exists:", !!user);
  
  if (companyData) {
    try {
      const parsed = JSON.parse(companyData);
      console.log("🏢 Company ID:", parsed.id);
      return parsed.id;
    } catch (e) {
      console.error("❌ Error parsing companyData:", e);
    }
  }
  
  if (userProfile) {
    try {
      const parsed = JSON.parse(userProfile);
      console.log("👤 User company_id:", parsed.company_id);
      return parsed.company_id;
    } catch (e) {
      console.error("❌ Error parsing userProfile:", e);
    }
  }
  
  if (user) {
    try {
      const parsed = JSON.parse(user);
      console.log("👤 User company_id:", parsed.company_id);
      return parsed.company_id;
    } catch (e) {
      console.error("❌ Error parsing user:", e);
    }
  }
  
  console.log("❌ No company_id found anywhere!");
  return null;
}
