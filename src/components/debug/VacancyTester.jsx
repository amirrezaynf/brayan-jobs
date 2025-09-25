"use client";

import { useState } from "react";
import { createVacancy } from "@/utils/vacancyAPI";

export default function VacancyTester() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const testVacancyCreation = async () => {
    setIsLoading(true);
    setResult(null);
    
    try {
      // Test data
      const testData = {
        title: "تست آگهی استخدام",
        description: "این یک آگهی تستی است",
        type: "full-time",
        location: "تهران",
        requirements: "تجربه کار با React",
        gender: "both",
        education: "bachelor",
        experience: "fresh",
        remoteWork: false,
        travelRequired: false,
        urgent: false
      };
      
      console.log("🧪 Testing vacancy creation with data:", testData);
      const response = await createVacancy(testData);
      setResult(response);
    } catch (error) {
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
      <h3 className="text-white font-bold mb-3">🧪 Vacancy Creation Tester</h3>
      
      <button
        onClick={testVacancyCreation}
        disabled={isLoading}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "در حال تست..." : "تست ایجاد آگهی"}
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
          <li>داده‌های تستی ساده ایجاد می‌کند</li>
          <li>Company ID را از localStorage می‌گیرد</li>
          <li>درخواست POST به API ارسال می‌کند</li>
          <li>پاسخ دقیق سرور را نمایش می‌دهد</li>
        </ul>
      </div>
    </div>
  );
}
