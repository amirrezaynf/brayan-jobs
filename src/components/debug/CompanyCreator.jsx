"use client";

import { useState } from "react";

export default function CompanyCreator() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const createRealCompany = async () => {
    setIsLoading(true);
    setResult(null);
    
    try {
      // Get auth token
      const token = localStorage.getItem("auth_token") || localStorage.getItem("authToken");
      if (!token) {
        setResult({
          success: false,
          error: "هیچ توکن احراز هویتی یافت نشد"
        });
        return;
      }

      console.log("🏢 Creating real company for user...");

      // Create company data based on API documentation
      const companyData = {
        name: "شرکت کاربر سیستم",
        display_name: "شرکت کاربر",
        name_en: "User System Company",
        code: "USC" + Date.now().toString().slice(-6),
        size: 2, // 1-6 range according to API docs
        founded_year: 2024,
        introduction: "شرکت فعال در زمینه فناوری اطلاعات",
        vision: "پیشرو در ارائه خدمات فناوری",
        mission: "ارائه بهترین خدمات به مشتریان",
        work_environment: "محیط کاری دوستانه و پویا",
        address: "تهران، ایران",
        email: "info@usercompany.com",
        website: "https://usercompany.com",
        mobile: "09123456789",
        phone: "02112345678",
        // Add other fields as needed
      };

      console.log("📡 Sending company creation request...");

      const response = await fetch("https://imocc.iracode.com/api/v1/companies", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(companyData)
      });

      console.log("📡 Company creation response:", {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log("❌ Error response:", errorText);
        
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText };
        }
        
        setResult({
          success: false,
          error: `خطای ${response.status}: ${errorData.message || errorText}`,
          details: { status: response.status, response: errorData }
        });
        return;
      }

      const data = await response.json();
      console.log("✅ Company created successfully:", data);

      // Update localStorage with new company data
      if (data.data && data.data.id) {
        const companyDataForStorage = {
          id: data.data.id,
          name: data.data.name,
          display_name: data.data.display_name,
          user_id: 29, // Your user ID
          ...data.data
        };
        localStorage.setItem("companyData", JSON.stringify(companyDataForStorage));
        console.log("✅ Company data saved to localStorage with ID:", data.data.id);
      }

      setResult({
        success: true,
        message: `شرکت با موفقیت ایجاد شد! حالا می‌توانید آگهی ثبت کنید.`,
        data: data,
        newCompanyId: data.data?.id,
        companyName: data.data?.name
      });

    } catch (error) {
      console.error("❌ Error creating company:", error);
      setResult({
        success: false,
        error: error.message,
        details: error
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testVacancyAfterCompany = async () => {
    if (!result?.success || !result?.newCompanyId) {
      setResult({
        ...result,
        testError: "ابتدا شرکت را ایجاد کنید"
      });
      return;
    }

    try {
      const token = localStorage.getItem("auth_token") || localStorage.getItem("authToken");
      
      const testVacancyData = {
        title: "تست آگهی پس از ایجاد شرکت",
        description: "این آگهی پس از ایجاد شرکت تست می‌شود",
        contract_type: "full-time",
        location_text: "تهران",
        gender_preference: "both",
        min_education_level: "diploma",
        experience_level: "fresh",
        is_remote_possible: false,
        travel_required: false,
        is_urgent: false,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      };

      const response = await fetch("https://imocc.iracode.com/api/v1/job-advertisements", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(testVacancyData)
      });

      console.log("📡 Test vacancy response:", response.status);

      if (response.ok) {
        const vacancyData = await response.json();
        setResult({
          ...result,
          testSuccess: true,
          testMessage: "✅ آگهی تست با موفقیت ایجاد شد!",
          vacancyId: vacancyData.data?.id
        });
      } else {
        const errorText = await response.text();
        setResult({
          ...result,
          testSuccess: false,
          testError: `❌ خطا در تست آگهی: ${errorText}`
        });
      }
    } catch (error) {
      setResult({
        ...result,
        testSuccess: false,
        testError: `❌ خطا در تست: ${error.message}`
      });
    }
  };

  return (
    <div className="bg-emerald-900 p-4 rounded-lg border border-emerald-700 mb-4">
      <h3 className="text-white font-bold mb-3">🏢 Company Creator (راه‌حل نهایی)</h3>
      
      <div className="bg-emerald-800 border border-emerald-600 p-3 rounded mb-4">
        <p className="text-emerald-200 text-sm">
          <strong>راه‌حل نهایی:</strong> ایجاد شرکت واقعی در سرور که به کاربر شما متصل می‌شود. 
          این مشکل "کاربر به هیچ شرکتی متصل نیست" را کاملاً حل می‌کند.
        </p>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <button
          onClick={createRealCompany}
          disabled={isLoading}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed font-bold"
        >
          {isLoading ? "در حال ایجاد شرکت..." : "🏢 ایجاد شرکت واقعی"}
        </button>
        
        {result?.success && (
          <button
            onClick={testVacancyAfterCompany}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
          >
            🧪 تست آگهی پس از ایجاد شرکت
          </button>
        )}
      </div>

      {result && (
        <div className="mt-4">
          <div className={`p-3 rounded-lg ${result.success ? 'bg-green-900 border border-green-700' : 'bg-red-900 border border-red-700'}`}>
            <h4 className={`font-bold ${result.success ? 'text-green-300' : 'text-red-300'}`}>
              {result.success ? '✅ موفق' : '❌ ناموفق'}
            </h4>
            
            <p className="text-white mt-2">
              {result.success ? result.message : result.error}
            </p>

            {result.success && (
              <div className="mt-2 space-y-1">
                <p className="text-green-400">
                  <strong>Company ID جدید:</strong> {result.newCompanyId}
                </p>
                <p className="text-green-400">
                  <strong>نام شرکت:</strong> {result.companyName}
                </p>
              </div>
            )}

            {result.testSuccess !== undefined && (
              <div className={`mt-3 p-2 rounded ${result.testSuccess ? 'bg-green-800' : 'bg-red-800'}`}>
                <p className="text-white text-sm">
                  <strong>تست آگهی:</strong> {result.testMessage || result.testError}
                </p>
                {result.vacancyId && (
                  <p className="text-green-300 text-xs">Vacancy ID: {result.vacancyId}</p>
                )}
              </div>
            )}

            {result.details && (
              <details className="mt-2">
                <summary className="text-gray-300 cursor-pointer">جزئیات تکنیکی</summary>
                <pre className="text-xs text-gray-400 mt-2 bg-gray-900 p-2 rounded overflow-auto">
                  {JSON.stringify(result.details, null, 2)}
                </pre>
              </details>
            )}
          </div>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-400">
        <p><strong>این ابزار:</strong></p>
        <ul className="list-disc list-inside space-y-1">
          <li>شرکت واقعی در سرور ایجاد می‌کند</li>
          <li>شرکت خودکار به کاربر شما متصل می‌شود</li>
          <li>Company ID را در localStorage ذخیره می‌کند</li>
          <li>امکان تست فوری آگهی پس از ایجاد شرکت</li>
        </ul>
      </div>
    </div>
  );
}
