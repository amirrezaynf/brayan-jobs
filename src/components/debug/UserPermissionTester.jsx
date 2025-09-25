"use client";

import { useState } from "react";

export default function UserPermissionTester() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const testUserPermissions = async () => {
    setIsLoading(true);
    setResult(null);
    
    try {
      const token = localStorage.getItem("auth_token") || localStorage.getItem("authToken");
      if (!token) {
        setResult({
          success: false,
          error: "هیچ توکن احراز هویتی یافت نشد"
        });
        return;
      }

      console.log("🧪 Testing user permissions and profile...");

      // Test user profile
      const profileResponse = await fetch("https://imocc.iracode.com/api/v1/user/profile", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      });

      console.log("📡 Profile response:", profileResponse.status);

      let profileData = null;
      if (profileResponse.ok) {
        profileData = await profileResponse.json();
        console.log("✅ Profile data:", profileData);
      } else {
        const errorText = await profileResponse.text();
        console.log("❌ Profile error:", errorText);
      }

      // Test user companies
      const companiesResponse = await fetch("https://imocc.iracode.com/api/v1/companies", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      });

      console.log("📡 Companies response:", companiesResponse.status);

      let companiesData = null;
      if (companiesResponse.ok) {
        companiesData = await companiesResponse.json();
        console.log("✅ Companies data:", companiesData);
      } else {
        const errorText = await companiesResponse.text();
        console.log("❌ Companies error:", errorText);
      }

      setResult({
        success: true,
        message: "تست مجوزهای کاربر کامل شد",
        profile: {
          success: profileResponse.ok,
          status: profileResponse.status,
          data: profileData,
          userRole: profileData?.data?.role || profileData?.role,
          userId: profileData?.data?.id || profileData?.id
        },
        companies: {
          success: companiesResponse.ok,
          status: companiesResponse.status,
          data: companiesData,
          count: companiesData?.data?.length || 0,
          userCompanies: companiesData?.data || []
        }
      });

    } catch (error) {
      console.error("❌ Permission test failed:", error);
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
    <div className="bg-orange-900 p-4 rounded-lg border border-orange-700 mb-4">
      <h3 className="text-white font-bold mb-3">👤 User Permission Tester</h3>
      
      <div className="bg-orange-800 border border-orange-600 p-3 rounded mb-4">
        <p className="text-orange-200 text-sm">
          <strong>تست مجوزها:</strong> این ابزار مجوزهای کاربر و دسترسی به شرکت‌ها را بررسی می‌کند.
        </p>
      </div>

      <button
        onClick={testUserPermissions}
        disabled={isLoading}
        className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed font-bold"
      >
        {isLoading ? "در حال تست..." : "👤 تست مجوزهای کاربر"}
      </button>

      {result && (
        <div className="mt-4">
          <div className={`p-3 rounded-lg ${result.success ? 'bg-green-900 border border-green-700' : 'bg-red-900 border border-red-700'}`}>
            <h4 className={`font-bold ${result.success ? 'text-green-300' : 'text-red-300'}`}>
              {result.success ? '✅ تست کامل شد' : '❌ تست ناموفق'}
            </h4>
            
            <p className="text-white mt-2">
              {result.success ? result.message : result.error}
            </p>

            {result.success && (
              <div className="mt-3 space-y-3">
                <div className={`p-2 rounded ${result.profile.success ? 'bg-green-800' : 'bg-red-800'}`}>
                  <p className="text-white text-sm">
                    <strong>پروفایل کاربر:</strong> 
                    <span className={result.profile.success ? 'text-green-300' : 'text-red-300'}>
                      {result.profile.success ? ' موفق' : ' ناموفق'}
                    </span>
                    <span className="text-gray-300"> (Status: {result.profile.status})</span>
                  </p>
                  {result.profile.userRole && (
                    <p className="text-gray-300 text-xs">نقش: {result.profile.userRole}</p>
                  )}
                  {result.profile.userId && (
                    <p className="text-gray-300 text-xs">User ID: {result.profile.userId}</p>
                  )}
                </div>
                
                <div className={`p-2 rounded ${result.companies.success ? 'bg-green-800' : 'bg-red-800'}`}>
                  <p className="text-white text-sm">
                    <strong>شرکت‌های کاربر:</strong> 
                    <span className={result.companies.success ? 'text-green-300' : 'text-red-300'}>
                      {result.companies.success ? ' موفق' : ' ناموفق'}
                    </span>
                    <span className="text-gray-300"> (Status: {result.companies.status})</span>
                  </p>
                  <p className="text-gray-300 text-xs">تعداد شرکت‌ها: {result.companies.count}</p>
                  
                  {result.companies.userCompanies.length > 0 && (
                    <div className="mt-1">
                      <p className="text-gray-300 text-xs">شرکت‌ها:</p>
                      <ul className="list-disc list-inside text-xs text-gray-400">
                        {result.companies.userCompanies.map((company, index) => (
                          <li key={index}>
                            ID: {company.id} - {company.name || company.display_name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
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
          <li>پروفایل کاربر را از API می‌گیرد</li>
          <li>نقش کاربر (employer/jobseeker) را بررسی می‌کند</li>
          <li>لیست شرکت‌های کاربر را دریافت می‌کند</li>
          <li>مشخص می‌کند که آیا کاربر مجوز ایجاد شرکت دارد</li>
        </ul>
      </div>
    </div>
  );
}
