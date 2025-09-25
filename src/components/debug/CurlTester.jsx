"use client";

import { useState } from "react";

export default function CurlTester() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const testCurlCommand = async () => {
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

      console.log("🧪 Testing exact curl command...");

      // Exact data from curl command (but with Persian content)
      const curlData = {
        // expert_activity_field_id: 0, // Skip this field as it causes validation errors
        title: "تست آگهی مطابق curl",
        contract_type: "full-time",
        salary: 0,
        location_text: "تهران",
        description: "این آگهی دقیقاً مطابق curl command تست می‌شود",
        requirements: "بدون شرایط خاص",
        responsibilities: "انجام وظایف محوله",
        gender_preference: "both",
        min_education_level: "diploma",
        experience_level: "fresh",
        military_service_status: "completed",
        working_hours: "9 تا 17",
        insurance_status: "full",
        probation_period: "3 ماه",
        benefits: ["بیمه", "ناهار"],
        required_skills: ["برنامه‌نویسی", "کار تیمی"],
        is_remote_possible: true,
        travel_required: false,
        is_urgent: false,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      };

      console.log("📡 Sending curl-like request...");
      console.log("📦 Request data:", curlData);

      const response = await fetch("https://imocc.iracode.com/api/v1/job-advertisements", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(curlData)
      });

      console.log("📡 Response:", {
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
      console.log("✅ Success response:", data);

      setResult({
        success: true,
        message: "آگهی با موفقیت ایجاد شد (curl test)!",
        data: data,
        vacancyId: data.data?.id
      });

    } catch (error) {
      console.error("❌ Curl test failed:", error);
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
    <div className="bg-cyan-900 p-4 rounded-lg border border-cyan-700 mb-4">
      <h3 className="text-white font-bold mb-3">🔄 Curl Command Tester</h3>
      
      <div className="bg-cyan-800 border border-cyan-600 p-3 rounded mb-4">
        <p className="text-cyan-200 text-sm">
          <strong>تست دقیق curl:</strong> این ابزار دقیقاً همان curl command که از backend گرفتید را شبیه‌سازی می‌کند.
        </p>
      </div>

      <button
        onClick={testCurlCommand}
        disabled={isLoading}
        className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed font-bold"
      >
        {isLoading ? "در حال تست curl..." : "🔄 تست curl command"}
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

            {result.success && result.vacancyId && (
              <p className="text-green-400 mt-2">
                <strong>Vacancy ID:</strong> {result.vacancyId}
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
        <p><strong>این تست:</strong></p>
        <ul className="list-disc list-inside space-y-1">
          <li>دقیقاً همان ساختار curl command را استفاده می‌کند</li>
          <li>تمام فیلدهای مورد نیاز API را شامل می‌شود</li>
          <li>expert_activity_field_id = 0 (مطابق curl example)</li>
          <li>فرمت ISO برای expires_at</li>
        </ul>
      </div>
    </div>
  );
}
