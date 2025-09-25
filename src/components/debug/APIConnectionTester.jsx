"use client";

import { useState } from "react";

export default function APIConnectionTester() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const testAPIConnection = async () => {
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

      console.log("🧪 Testing API connection with real endpoint...");

      // Test 1: Get active vacancies (public endpoint)
      console.log("📡 Test 1: Getting active vacancies...");
      const publicResponse = await fetch("https://imocc.iracode.com/api/v1/job-advertisements", {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      });

      console.log("📡 Public API response:", {
        status: publicResponse.status,
        statusText: publicResponse.statusText,
        ok: publicResponse.ok
      });

      let publicData = null;
      if (publicResponse.ok) {
        publicData = await publicResponse.json();
        console.log("✅ Public API works:", publicData);
      }

      // Test 2: Try to create vacancy with minimal data
      console.log("📡 Test 2: Testing vacancy creation...");
      
      const testVacancyData = {
        title: "تست آگهی API",
        description: "این یک آگهی تستی است",
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

      const createResponse = await fetch("https://imocc.iracode.com/api/v1/job-advertisements", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(testVacancyData)
      });

      console.log("📡 Create API response:", {
        status: createResponse.status,
        statusText: createResponse.statusText,
        ok: createResponse.ok
      });

      let createError = null;
      let createData = null;

      if (!createResponse.ok) {
        const errorText = await createResponse.text();
        console.log("❌ Create error response:", errorText);
        try {
          createError = JSON.parse(errorText);
        } catch {
          createError = { message: errorText };
        }
      } else {
        createData = await createResponse.json();
        console.log("✅ Create API works:", createData);
      }

      setResult({
        success: true,
        message: "تست API کامل شد",
        tests: {
          publicAPI: {
            success: publicResponse.ok,
            status: publicResponse.status,
            data: publicData ? `${publicData.data?.length || 0} آگهی یافت شد` : null
          },
          createAPI: {
            success: createResponse.ok,
            status: createResponse.status,
            error: createError,
            data: createData
          }
        }
      });

    } catch (error) {
      console.error("❌ API test failed:", error);
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
    <div className="bg-blue-900 p-4 rounded-lg border border-blue-700 mb-4">
      <h3 className="text-white font-bold mb-3">🔗 API Connection Tester</h3>
      
      <div className="bg-blue-800 border border-blue-600 p-3 rounded mb-4">
        <p className="text-blue-200 text-sm">
          <strong>تست کامل API:</strong> این ابزار اتصال به API واقعی را تست می‌کند و مشکلات احتمالی را شناسایی می‌کند.
        </p>
      </div>

      <button
        onClick={testAPIConnection}
        disabled={isLoading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed font-bold"
      >
        {isLoading ? "در حال تست..." : "🔗 تست کامل API"}
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

            {result.success && result.tests && (
              <div className="mt-3 space-y-3">
                <div className="bg-gray-800 p-3 rounded">
                  <h5 className="text-white font-bold">📊 نتایج تست‌ها:</h5>
                  
                  <div className="mt-2 space-y-2">
                    <div className={`p-2 rounded ${result.tests.publicAPI.success ? 'bg-green-800' : 'bg-red-800'}`}>
                      <p className="text-white text-sm">
                        <strong>تست عمومی API:</strong> 
                        <span className={result.tests.publicAPI.success ? 'text-green-300' : 'text-red-300'}>
                          {result.tests.publicAPI.success ? ' موفق' : ' ناموفق'}
                        </span>
                        <span className="text-gray-300"> (Status: {result.tests.publicAPI.status})</span>
                      </p>
                      {result.tests.publicAPI.data && (
                        <p className="text-gray-300 text-xs">{result.tests.publicAPI.data}</p>
                      )}
                    </div>
                    
                    <div className={`p-2 rounded ${result.tests.createAPI.success ? 'bg-green-800' : 'bg-red-800'}`}>
                      <p className="text-white text-sm">
                        <strong>تست ایجاد آگهی:</strong> 
                        <span className={result.tests.createAPI.success ? 'text-green-300' : 'text-red-300'}>
                          {result.tests.createAPI.success ? ' موفق' : ' ناموفق'}
                        </span>
                        <span className="text-gray-300"> (Status: {result.tests.createAPI.status})</span>
                      </p>
                      {result.tests.createAPI.error && (
                        <p className="text-red-300 text-xs mt-1">
                          خطا: {result.tests.createAPI.error.message || JSON.stringify(result.tests.createAPI.error)}
                        </p>
                      )}
                    </div>
                  </div>
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
        <p><strong>این تست شامل:</strong></p>
        <ul className="list-disc list-inside space-y-1">
          <li>تست اتصال به API عمومی (GET /job-advertisements)</li>
          <li>تست ایجاد آگهی با داده‌های حداقلی</li>
          <li>بررسی خطاهای احتمالی و نمایش دقیق آن‌ها</li>
          <li>شناسایی مشکلات احراز هویت یا Company ID</li>
        </ul>
      </div>
    </div>
  );
}
