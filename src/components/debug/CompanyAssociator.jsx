"use client";

import { useState } from "react";

export default function CompanyAssociator() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const associateCompanyToUser = async () => {
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

      console.log("🔗 Associating company 33 to user...");

      // Try to update company 33 to associate it with current user
      const updateData = {
        user_id: 29, // Your user ID from the database
        // Add minimal required fields to ensure update works
        name: "شرکت کاربر",
        display_name: "شرکت کاربر"
      };

      const response = await fetch("https://imocc.iracode.com/api/v1/companies/33", {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updateData)
      });

      console.log("📡 Company association response:", {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log("❌ Error response:", errorText);
        
        setResult({
          success: false,
          error: `خطای ${response.status}: ${errorText}`,
          details: { status: response.status, response: errorText }
        });
        return;
      }

      const data = await response.json();
      console.log("✅ Company association successful:", data);

      setResult({
        success: true,
        message: "شرکت با موفقیت به کاربر متصل شد",
        data: data
      });

    } catch (error) {
      console.error("❌ Error associating company:", error);
      setResult({
        success: false,
        error: error.message,
        details: error
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createNewCompany = async () => {
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

      console.log("🏢 Creating new company for user...");

      // Create a new company that will be automatically associated with current user
      const companyData = {
        name: "شرکت جدید کاربر",
        display_name: "شرکت جدید کاربر",
        name_en: "User New Company",
        code: "UNC" + Date.now().toString().slice(-6),
        size: 1,
        founded_year: 2024,
        // Add other required fields as needed
      };

      const response = await fetch("https://imocc.iracode.com/api/v1/companies", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(companyData)
      });

      console.log("📡 New company creation response:", {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log("❌ Error response:", errorText);
        
        setResult({
          success: false,
          error: `خطای ${response.status}: ${errorText}`,
          details: { status: response.status, response: errorText }
        });
        return;
      }

      const data = await response.json();
      console.log("✅ New company created:", data);

      // Update localStorage with new company data
      if (data.data && data.data.id) {
        const companyDataForStorage = {
          id: data.data.id,
          name: data.data.name,
          display_name: data.data.display_name,
          ...data.data
        };
        localStorage.setItem("companyData", JSON.stringify(companyDataForStorage));
        console.log("✅ Company data saved to localStorage");
      }

      setResult({
        success: true,
        message: `شرکت جدید با موفقیت ایجاد شد (ID: ${data.data?.id})`,
        data: data,
        newCompanyId: data.data?.id
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

  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 mb-4">
      <h3 className="text-white font-bold mb-3">🔗 Company Association Fixer</h3>
      
      <div className="bg-red-900 border border-red-700 p-3 rounded mb-4">
        <p className="text-red-200 text-sm">
          <strong>خطای 404:</strong> شرکت با ID=33 وجود ندارد یا قابل دسترسی نیست. 
          بهترین راه‌حل ایجاد شرکت جدید است.
        </p>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <button
          onClick={createNewCompany}
          disabled={isLoading}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed font-bold"
        >
          {isLoading ? "در حال ایجاد..." : "✅ ایجاد شرکت جدید (توصیه می‌شود)"}
        </button>
        
        <button
          onClick={associateCompanyToUser}
          disabled={isLoading}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          {isLoading ? "در حال اتصال..." : "🔧 اتصال شرکت 33 (ممکن است کار نکند)"}
        </button>
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

            {result.success && result.newCompanyId && (
              <p className="text-green-400 mt-2">
                <strong>Company ID جدید:</strong> {result.newCompanyId}
              </p>
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
        <p><strong>گزینه‌ها:</strong></p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>اتصال شرکت 33:</strong> شرکت موجود را به کاربر شما متصل می‌کند</li>
          <li><strong>ایجاد شرکت جدید:</strong> شرکت جدیدی ایجاد می‌کند که خودکار به شما متصل می‌شود</li>
        </ul>
      </div>
    </div>
  );
}
