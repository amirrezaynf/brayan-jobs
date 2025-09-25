"use client";

import { useState } from "react";

export default function UserCompanyTester() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const testUserCompanies = async () => {
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

      console.log("🧪 Testing user companies with token:", token.substring(0, 10) + "...");

      // Test companies endpoint
      const response = await fetch("https://imocc.iracode.com/api/v1/companies", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      });

      console.log("📡 Companies API response:", {
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
      console.log("✅ Companies data:", data);

      setResult({
        success: true,
        message: "دریافت اطلاعات شرکت‌ها موفق بود",
        data: data,
        userCompanies: data.data || data,
        hasCompany33: data.data ? data.data.some(company => company.id === 33) : false
      });

    } catch (error) {
      console.error("❌ Error testing user companies:", error);
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
      <h3 className="text-white font-bold mb-3">🏢 User Companies Tester</h3>
      
      <button
        onClick={testUserCompanies}
        disabled={isLoading}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "در حال تست..." : "تست شرکت‌های کاربر"}
      </button>

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
              <div className="mt-3 space-y-2">
                <p className="text-white">
                  <strong>تعداد شرکت‌ها:</strong> {result.userCompanies?.length || 0}
                </p>
                <p className="text-white">
                  <strong>شرکت با ID=33 دارد:</strong> 
                  <span className={result.hasCompany33 ? 'text-green-400' : 'text-red-400'}>
                    {result.hasCompany33 ? ' بله ✅' : ' خیر ❌'}
                  </span>
                </p>
                
                {result.userCompanies && result.userCompanies.length > 0 && (
                  <div className="mt-2">
                    <strong className="text-white">شرکت‌های کاربر:</strong>
                    <ul className="list-disc list-inside mt-1 text-gray-300">
                      {result.userCompanies.map((company, index) => (
                        <li key={index} className={company.id === 33 ? 'text-green-400 font-bold' : ''}>
                          ID: {company.id} - {company.name || company.display_name || 'نام نامشخص'}
                        </li>
                      ))}
                    </ul>
                  </div>
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
        <p><strong>این تست:</strong></p>
        <ul className="list-disc list-inside space-y-1">
          <li>لیست شرکت‌های کاربر را از API می‌گیرد</li>
          <li>بررسی می‌کند که آیا شرکت با ID=33 وجود دارد</li>
          <li>مشخص می‌کند که کاربر به چه شرکت‌هایی دسترسی دارد</li>
          <li>کمک می‌کند تا مشکل "کاربر به هیچ شرکتی متصل نیست" را حل کنیم</li>
        </ul>
      </div>
    </div>
  );
}
