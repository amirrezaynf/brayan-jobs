"use client";

// Helper functions for company management

// Get company ID from localStorage
export function getCompanyId() {
  try {
    // Try to get company data from localStorage
    const companyData = localStorage.getItem("companyData");
    if (companyData) {
      const parsedData = JSON.parse(companyData);
      console.log("🏢 Company data from localStorage:", parsedData);
      
      if (parsedData.id) {
        console.log("🏢 Found company ID:", parsedData.id);
        return parsedData.id;
      }
    }
    
    // Fallback: try to get from user profile
    const userProfile = localStorage.getItem("userProfile");
    if (userProfile) {
      const parsedProfile = JSON.parse(userProfile);
      if (parsedProfile.company_id) {
        console.log("🏢 Found company ID from user profile:", parsedProfile.company_id);
        return parsedProfile.company_id;
      }
    }
    
    console.log("⚠️ No company ID found in localStorage");
    return null;
  } catch (error) {
    console.error("❌ Error getting company ID:", error);
    return null;
  }
}

// Check if user has a valid company
export function validateCompany() {
  const companyId = getCompanyId();
  if (!companyId) {
    throw new Error(`❌ مشکل در ارتباط با شرکت!

🔍 احتمالات:
1️⃣ شرکت هنوز ثبت نشده
2️⃣ شرکت ثبت شده اما تأیید نشده  
3️⃣ مشکل در ارتباط کاربر با شرکت

💡 راه حل:
- به بخش 'پروفایل شرکت' بروید
- اطلاعات کامل شرکت را وارد کنید
- شرکت را ذخیره و تأیید کنید
- سپس دوباره آگهی ثبت کنید`);
  }
  return companyId;
}

// Get company data from localStorage
export function getCompanyData() {
  try {
    const companyData = localStorage.getItem("companyData");
    if (companyData) {
      return JSON.parse(companyData);
    }
    return null;
  } catch (error) {
    console.error("❌ Error getting company data:", error);
    return null;
  }
}

// Check if company is properly saved
export function isCompanySaved() {
  const companyData = getCompanyData();
  return companyData && companyData.id;
}
