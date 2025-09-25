"use client";

import { useState } from "react";

export default function QuickFixer() {
  const [result, setResult] = useState(null);

  const quickFixCompanyId = () => {
    try {
      // Create a simple company data structure
      const quickCompanyData = {
        id: 999, // Use a unique ID that won't conflict
        name: "شرکت موقت کاربر",
        display_name: "شرکت موقت کاربر",
        user_id: 29,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Save to localStorage
      localStorage.setItem("companyData", JSON.stringify(quickCompanyData));
      
      console.log("🚀 Quick fix applied - Company ID set to 999");
      
      setResult({
        success: true,
        message: "Company ID موقت (999) تنظیم شد. آگهی‌ها به صورت محلی ذخیره می‌شوند تا مشکل سرور حل شود.",
        companyId: 999,
        note: "آگهی‌ها در localStorage ذخیره می‌شوند و بعداً به سرور منتقل خواهند شد."
      });

    } catch (error) {
      console.error("❌ Quick fix failed:", error);
      setResult({
        success: false,
        error: error.message
      });
    }
  };

  const resetLocalStorage = () => {
    try {
      localStorage.removeItem("companyData");
      localStorage.removeItem("userProfile");
      console.log("🧹 localStorage cleared");
      
      setResult({
        success: true,
        message: "localStorage پاک شد. صفحه را رفرش کنید.",
      });
    } catch (error) {
      setResult({
        success: false,
        error: error.message
      });
    }
  };

  return (
    <div className="bg-purple-900 p-4 rounded-lg border border-purple-700 mb-4">
      <h3 className="text-white font-bold mb-3">⚡ Quick Fix Tool</h3>
      
      <div className="bg-purple-800 border border-purple-600 p-3 rounded mb-4">
        <p className="text-purple-200 text-sm">
          <strong>راه‌حل سریع:</strong> اگر API کار نمی‌کند، می‌توانیم Company ID موقت تنظیم کنیم 
          تا بتوانید آگهی ثبت کنید.
        </p>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <button
          onClick={quickFixCompanyId}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-bold"
        >
          ⚡ تنظیم Company ID موقت (999)
        </button>
        
        <button
          onClick={resetLocalStorage}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
        >
          🧹 پاک کردن localStorage
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

            {result.success && result.companyId && (
              <div className="mt-2 space-y-1">
                <p className="text-green-400">
                  <strong>Company ID جدید:</strong> {result.companyId}
                </p>
                {result.note && (
                  <p className="text-yellow-400 text-sm">
                    <strong>نکته:</strong> {result.note}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-400">
        <p><strong>نکته:</strong></p>
        <ul className="list-disc list-inside space-y-1">
          <li>این یک راه‌حل موقت است تا بتوانید آگهی ثبت کنید</li>
          <li>بعداً می‌توانید شرکت واقعی ایجاد کنید</li>
          <li>Company ID موقت (999) فقط برای تست استفاده می‌شود</li>
        </ul>
      </div>
    </div>
  );
}
