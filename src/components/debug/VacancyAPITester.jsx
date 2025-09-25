"use client";

import { useState } from "react";
import { createVacancy } from "@/app/actions/vacancy";

export default function VacancyAPITester() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const testVacancyCreation = async () => {
    setIsLoading(true);
    setResult(null);
    setError(null);

    // Sample vacancy data matching the form structure
    const testVacancyData = {
      company: "شرکت تست",
      title: "برنامه‌نویس React",
      category: "فناوری اطلاعات",
      type: "تمام وقت",
      salary: "15000000",
      location: "تهران، ایران",
      description: "جستجوی برنامه‌نویس React با تجربه برای پیوستن به تیم فنی ما. فرصت عالی برای رشد و یادگیری تکنولوژی‌های جدید.",
      requirements: "حداقل 2 سال تجربه در React، آشنایی با JavaScript ES6+، تجربه کار با Git",
      gender: "هر دو",
      education: "کارشناسی",
      experience: "۲ تا ۵ سال",
      militaryService: "پایان خدمت",
      benefits: ["بیمه تکمیلی", "پاداش عملکرد", "محیط کار دوستانه"],
      workHours: "۹ صبح تا ۶ عصر",
      probationPeriod: "۳ ماه",
      insurance: "full",
      remoteWork: false,
      travelRequired: false,
      urgent: false
    };

    try {
      console.log("🧪 Testing vacancy creation with data:", testVacancyData);
      const response = await createVacancy(testVacancyData);
      
      if (response.success) {
        setResult(response);
        console.log("✅ Test successful:", response);
      } else {
        setError(response.error);
        console.error("❌ Test failed:", response.error);
      }
    } catch (err) {
      setError(err.message);
      console.error("❌ Test error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const checkCompanyId = () => {
    if (typeof window !== 'undefined') {
      const companyId = localStorage.getItem('company_id');
      console.log("📋 Current company_id in localStorage:", companyId);
      alert(`Company ID: ${companyId || 'Not found'}`);
    }
  };

  const setTestCompanyId = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('company_id', '999');
      console.log("📋 Set test company_id to 999");
      alert('Test company ID (999) has been set');
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold text-white mb-4">🧪 Vacancy API Tester</h2>
      
      <div className="space-y-4">
        {/* Company ID Management */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-2">Company ID Management</h3>
          <div className="flex gap-2">
            <button
              onClick={checkCompanyId}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Check Company ID
            </button>
            <button
              onClick={setTestCompanyId}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
            >
              Set Test Company ID
            </button>
          </div>
        </div>

        {/* Test Vacancy Creation */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-2">Test Vacancy Creation</h3>
          <button
            onClick={testVacancyCreation}
            disabled={isLoading}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Testing...
              </>
            ) : (
              "🚀 Test Vacancy Creation"
            )}
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="bg-green-900 border border-green-600 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-green-100 mb-2">✅ Success!</h3>
            <pre className="text-green-200 text-sm overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        {error && (
          <div className="bg-red-900 border border-red-600 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-red-100 mb-2">❌ Error</h3>
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-2">📋 Instructions</h3>
          <ol className="text-gray-300 text-sm space-y-1 list-decimal list-inside">
            <li>First, check if you have a company_id in localStorage</li>
            <li>If not, set a test company ID or create a real company profile</li>
            <li>Then test the vacancy creation</li>
            <li>Check the browser console for detailed logs</li>
            <li>If you get "کاربر به هیچ شرکتی متصل نیست" error, you need to create a company first</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
