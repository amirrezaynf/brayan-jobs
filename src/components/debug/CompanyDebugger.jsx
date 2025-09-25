"use client";

import { useState } from "react";
// import { getCompanyId, getCompanyData, isCompanySaved } from "@/utils/companyHelper"; // Removed - functions moved to vacancyAPI

export default function CompanyDebugger() {
  const [debugInfo, setDebugInfo] = useState(null);

  const fixCompanyId = () => {
    try {
      // Get current company data
      const companyData = JSON.parse(localStorage.getItem("companyData") || "{}");
      if (companyData && Object.keys(companyData).length > 0) {
        // Update the ID to the correct one
        companyData.id = 33;
        localStorage.setItem("companyData", JSON.stringify(companyData));
        console.log("✅ Company ID fixed to 33");
        
        // Refresh debug info
        checkCompanyStatus();
      } else {
        console.log("❌ No company data found to fix");
      }
    } catch (error) {
      console.error("❌ Error fixing company ID:", error);
    }
  };

  const checkCompanyStatus = () => {
    try {
      // Simple localStorage check without helper functions
      const companyData = JSON.parse(localStorage.getItem("companyData") || "{}");
      const userProfile = JSON.parse(localStorage.getItem("userProfile") || "{}");
      const companyId = companyData.id || userProfile.company_id;
      const isSaved = !!companyId;
      
      // Check all possible localStorage keys
      const allPossibleKeys = [
        "companyData",
        "userProfile", 
        "company",
        "user",
        "profile",
        "auth_user",
        "userData"
      ];
      
      const allStorageData = {};
      allPossibleKeys.forEach(key => {
        const data = localStorage.getItem(key);
        if (data) {
          try {
            allStorageData[key] = JSON.parse(data);
          } catch {
            allStorageData[key] = data;
          }
        }
      });
      
      const info = {
        companyId,
        companyData,
        isSaved,
        hasLocalStorage: !!localStorage.getItem("companyData"),
        localStorageContent: localStorage.getItem("companyData"),
        allStorageData,
        expectedCompanyId: 33, // Your actual company ID
        idMismatch: companyId !== 33
      };
      
      setDebugInfo(info);
    } catch (error) {
      setDebugInfo({ error: error.message });
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 mb-4">
      <h3 className="text-white font-bold mb-3">🏢 Company Status Debugger</h3>
      
      <div className="flex gap-2 mb-4">
        <button
          onClick={checkCompanyStatus}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          بررسی وضعیت شرکت
        </button>
        
        <button
          onClick={fixCompanyId}
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg"
        >
          تصحیح Company ID به 33
        </button>
      </div>

      {debugInfo && (
        <div className="mt-4">
          <div className={`p-3 rounded-lg ${debugInfo.error ? 'bg-red-900 border border-red-700' : 'bg-green-900 border border-green-700'}`}>
            <h4 className={`font-bold ${debugInfo.error ? 'text-red-300' : 'text-green-300'}`}>
              {debugInfo.error ? '❌ خطا' : '✅ اطلاعات شرکت'}
            </h4>
            
            {debugInfo.error ? (
              <p className="text-white mt-2">{debugInfo.error}</p>
            ) : (
              <div className="text-white mt-2 space-y-2">
                <p><strong>Company ID Found:</strong> <span className={debugInfo.idMismatch ? 'text-red-400' : 'text-green-400'}>{debugInfo.companyId || 'یافت نشد'}</span></p>
                <p><strong>Expected Company ID:</strong> <span className="text-yellow-400">{debugInfo.expectedCompanyId}</span></p>
                <p><strong>ID Mismatch:</strong> <span className={debugInfo.idMismatch ? 'text-red-400' : 'text-green-400'}>{debugInfo.idMismatch ? 'بله - مشکل!' : 'خیر - درست'}</span></p>
                <p><strong>Is Saved:</strong> {debugInfo.isSaved ? 'بله' : 'خیر'}</p>
                <p><strong>Has localStorage:</strong> {debugInfo.hasLocalStorage ? 'بله' : 'خیر'}</p>
                
                {debugInfo.companyData && (
                  <details className="mt-2">
                    <summary className="text-gray-300 cursor-pointer">اطلاعات کامل شرکت</summary>
                    <pre className="text-xs text-gray-400 mt-2 bg-gray-900 p-2 rounded overflow-auto">
                      {JSON.stringify(debugInfo.companyData, null, 2)}
                    </pre>
                  </details>
                )}
                
                <details className="mt-2">
                  <summary className="text-gray-300 cursor-pointer">محتوای خام localStorage</summary>
                  <pre className="text-xs text-gray-400 mt-2 bg-gray-900 p-2 rounded overflow-auto">
                    {debugInfo.localStorageContent || 'خالی'}
                  </pre>
                </details>
                
                <details className="mt-2">
                  <summary className="text-gray-300 cursor-pointer">تمام داده‌های localStorage</summary>
                  <pre className="text-xs text-gray-400 mt-2 bg-gray-900 p-2 rounded overflow-auto">
                    {JSON.stringify(debugInfo.allStorageData, null, 2)}
                  </pre>
                </details>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-400">
        <p><strong>راهنمایی:</strong></p>
        <ul className="list-disc list-inside space-y-1">
          <li>اگر Company ID یافت نشد، ابتدا به بخش "پروفایل شرکت" بروید</li>
          <li>اطلاعات کامل شرکت را وارد کنید و ذخیره کنید</li>
          <li>مطمئن شوید که پیام موفقیت نمایش داده شود</li>
          <li>سپس دوباره آگهی ثبت کنید</li>
        </ul>
      </div>
    </div>
  );
}
