"use client";

import { useState } from "react";
import { getActiveVacancies, getUserActiveVacancies } from "@/app/actions/vacancy";

export default function APIDebugger() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleTest = async (testType = 'connection') => {
    setIsLoading(true);
    setResult(null);
    
    try {
      let testResult;
      if (testType === 'auth') {
        // Get token from localStorage and pass it to server action
        const authToken = localStorage.getItem("authToken") || localStorage.getItem("auth_token");
        console.log("🔑 Client: Token from localStorage:", authToken ? "Found" : "Not found");
        
        if (!authToken) {
          setResult({
            success: false,
            error: "هیچ توکن احراز هویتی در localStorage یافت نشد",
            details: "لطفاً مجدداً وارد حساب کاربری خود شوید"
          });
          return;
        }
        
        // Test auth by trying to get user's active vacancies (requires authentication)
        testResult = await getUserActiveVacancies();
        
        // Add token info to result for debugging
        if (testResult.success) {
          testResult.details = {
            ...testResult.details,
            tokenFound: true,
            tokenLength: authToken.length
          };
        }
      } else {
        // Test basic API connection by getting public active vacancies
        testResult = await getActiveVacancies({ per_page: 1 });
      }
      setResult(testResult);
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
      <h3 className="text-white font-bold mb-3">🔧 API Connection Debugger</h3>
      
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => handleTest('connection')}
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "در حال تست..." : "تست اتصال API"}
        </button>
        
        <button
          onClick={() => handleTest('auth')}
          disabled={isLoading}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "در حال تست..." : "تست احراز هویت"}
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
        <p><strong>API URL:</strong> https://imocc.iracode.com/api/v1/job-advertisements</p>
        <p><strong>Fallback URL:</strong> https://api.iracode.com/api/v1/job-advertisements</p>
      </div>
    </div>
  );
}
