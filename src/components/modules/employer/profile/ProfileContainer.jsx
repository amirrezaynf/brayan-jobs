"use client";

import { useState, useEffect, useMemo } from "react";
import { Building2, Save, Loader2 } from "lucide-react";
import {
  COMPANY_DATA,
  updateCompanyData,
  loadCompanyData,
} from "@/constants/companyData";
// Import Server Actions
import {
  createCompany,
  updateCompany,
  getCompany,
  testServerAction,
} from "@/app/actions/companies";

// Import all profile sections
import CompanyImagesSection from "./CompanyImagesSection";
import BasicInfoSection from "./BasicInfoSection";

const ProfileContainer = () => {
  console.log("🔥 ===== PROFILE CONTAINER LOADED =====");
  console.log("🔥 ProfileContainer: Component is initializing...");

  const [companyData, setCompanyData] = useState({ ...COMPANY_DATA });
  const [companyLogo, setCompanyLogo] = useState(null);
  const [displayNamePreference, setDisplayNamePreference] = useState("persian");
  const [savedDisplayNamePreference, setSavedDisplayNamePreference] =
    useState("persian");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [companyId, setCompanyId] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });

  console.log("🔥 ProfileContainer: State initialized");

  // Load company data on component mount
  useEffect(() => {
    const loadData = async () => {
      console.log("🔄 ProfileContainer: Starting data load...");
      try {
        setIsLoading(true);

        // Try to load data from API first
        console.log(
          "🚀 ProfileContainer: Trying to load from API using Server Actions..."
        );
        const apiResult = await loadCompanyFromAPI();
        console.log("📡 ProfileContainer: API load result:", apiResult);

        if (apiResult.success && apiResult.data) {
          console.log("✅ ProfileContainer: Loading from API");
          console.log(
            "📦 ProfileContainer: API data received:",
            apiResult.data
          );

          // Data is already mapped by mapAPIDataToForm in Server Action
          setCompanyData({ ...COMPANY_DATA, ...apiResult.data });

          if (apiResult.data.companyLogo) {
            setCompanyLogo(apiResult.data.companyLogo);
          }

          const savedPreference =
            apiResult.data.displayNamePreference || "persian";
          setDisplayNamePreference(savedPreference);
          setSavedDisplayNamePreference(savedPreference);

          // Get company ID from rawData if available
          if (apiResult.rawData && apiResult.rawData.id) {
            setCompanyId(apiResult.rawData.id);
            console.log(
              "🆔 ProfileContainer: Company ID set:",
              apiResult.rawData.id
            );
          } else if (apiResult.data.id) {
            setCompanyId(apiResult.data.id);
            console.log(
              "🆔 ProfileContainer: Company ID set from data:",
              apiResult.data.id
            );
          }
        } else {
          console.warn(
            "⚠️ ProfileContainer: API failed, trying localStorage..."
          );
          console.warn("⚠️ ProfileContainer: API error:", apiResult.error);

          // Fallback to localStorage
          const localStorageResult = getCompanyFromLocalStorage();
          console.log(
            "💾 ProfileContainer: LocalStorage result:",
            localStorageResult
          );

          if (localStorageResult.success && localStorageResult.data) {
            console.log("✅ ProfileContainer: Loading from localStorage");
            setCompanyData({ ...COMPANY_DATA, ...localStorageResult.data });
            setCompanyLogo(localStorageResult.data.companyLogo);
            const savedPreference =
              localStorageResult.data.displayNamePreference || "persian";
            setDisplayNamePreference(savedPreference);
            setSavedDisplayNamePreference(savedPreference);
          } else {
            console.warn(
              "⚠️ ProfileContainer: No data in localStorage, using default data"
            );
            // Use default data
            const defaultData = loadCompanyData();
            setCompanyData({ ...COMPANY_DATA, ...defaultData });
            setCompanyLogo(defaultData.companyLogo);
            const savedPreference =
              defaultData.displayNamePreference || "persian";
            setDisplayNamePreference(savedPreference);
            setSavedDisplayNamePreference(savedPreference);
          }
        }
      } catch (error) {
        console.error(
          "❌ ProfileContainer: Error loading company data:",
          error
        );
        console.error("❌ ProfileContainer: Error stack:", error.stack);

        // Emergency fallback to default data
        const defaultData = loadCompanyData();
        setCompanyData({ ...COMPANY_DATA, ...defaultData });
        setCompanyLogo(defaultData.companyLogo);
        const savedPreference = defaultData.displayNamePreference || "persian";
        setDisplayNamePreference(savedPreference);
        setSavedDisplayNamePreference(savedPreference);
        showErrorMessage("خطا در بارگذاری اطلاعات");
      } finally {
        setIsLoading(false);
        console.log("🏁 ProfileContainer: Data load completed");
      }
    };

    loadData();
  }, []);

  const handleInputChange = (field, value) => {
    setCompanyData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field, index, value) => {
    const newArray = [...companyData[field]];
    newArray[index] = value;
    setCompanyData((prev) => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field) => {
    setCompanyData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayItem = (field, index) => {
    const newArray = companyData[field].filter((_, i) => i !== index);
    setCompanyData((prev) => ({ ...prev, [field]: newArray }));
  };

  // Get the display name based on saved user preference
  const displayName = useMemo(() => {
    if (
      savedDisplayNamePreference === "english" &&
      companyData.companyNameEn &&
      companyData.companyNameEn.trim()
    ) {
      return companyData.companyNameEn;
    }
    return companyData.companyName || "پروفایل شرکت";
  }, [
    savedDisplayNamePreference,
    companyData.companyName,
    companyData.companyNameEn,
  ]);

  const showSuccessMessage = (text) => {
    setMessage({ type: "success", text });
    setTimeout(() => setMessage({ type: "", text: "" }), 5000);
  };

  const showErrorMessage = (text) => {
    setMessage({ type: "error", text });
    setTimeout(() => setMessage({ type: "", text: "" }), 5000);
  };

  const showWarningMessage = (text) => {
    setMessage({ type: "warning", text });
    setTimeout(() => setMessage({ type: "", text: "" }), 5000);
  };

  // LocalStorage functions
  const saveCompanyToLocalStorage = (companyData) => {
    try {
      const dataToSave = {
        ...companyData,
        savedAt: new Date().toISOString(),
        source: "localStorage",
      };
      localStorage.setItem("company_profile", JSON.stringify(dataToSave));
      console.log("💾 LocalStorage: Company data saved successfully");
      return {
        success: true,
        message: "اطلاعات در حافظه محلی ذخیره شد",
      };
    } catch (error) {
      console.error("❌ LocalStorage: Error saving company data:", error);
      return {
        success: false,
        error: "خطا در ذخیره اطلاعات",
      };
    }
  };

  const getCompanyFromLocalStorage = () => {
    try {
      const savedData = localStorage.getItem("company_profile");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        console.log("💾 LocalStorage: Company data loaded successfully");
        return {
          success: true,
          data: parsedData,
          source: "localStorage",
        };
      }
      return {
        success: false,
        error: "هیچ اطلاعاتی در حافظه محلی یافت نشد",
        data: null,
      };
    } catch (error) {
      console.error("❌ LocalStorage: Error loading company data:", error);
      return {
        success: false,
        error: "خطا در بارگذاری اطلاعات",
        data: null,
      };
    }
  };

  // Load company data from API
  const loadCompanyFromAPI = async () => {
    try {
      console.log("🔄 ===== LOADING COMPANY DATA FROM API =====");
      console.log(
        "🔄 ProfileContainer: Starting API call to getCompany('my')..."
      );

      const startTime = Date.now();
      const result = await getCompany("my");
      const endTime = Date.now();

      console.log(
        `📡 ProfileContainer: API call completed in ${endTime - startTime}ms`
      );
      console.log("📡 ProfileContainer: Full API result:", result);
      console.log("📡 ProfileContainer: Result success:", result?.success);
      console.log("📡 ProfileContainer: Result data exists:", !!result?.data);
      console.log(
        "📡 ProfileContainer: Result rawData exists:",
        !!result?.rawData
      );

      if (result?.rawData) {
        console.log(
          "📦 ProfileContainer: Raw API data from server:",
          result.rawData
        );
        console.log(
          "📦 ProfileContainer: Raw data keys:",
          Object.keys(result.rawData)
        );
        console.log(
          "📦 ProfileContainer: Company ID in raw data:",
          result.rawData.id
        );
      }

      if (result?.data) {
        console.log("🔄 ProfileContainer: Mapped form data:", result.data);
        console.log(
          "🔄 ProfileContainer: Mapped data keys:",
          Object.keys(result.data)
        );
        console.log(
          "🔄 ProfileContainer: Company name mapped:",
          result.data.companyName
        );
        console.log(
          "🔄 ProfileContainer: Company size mapped:",
          result.data.companySize
        );
        console.log(
          "🔄 ProfileContainer: Industry mapped:",
          result.data.industryType
        );
        console.log("🔄 ProfileContainer: Location mapped:", {
          country: result.data.country,
          province: result.data.province,
          city: result.data.city,
        });
        console.log("🔄 ProfileContainer: Social media mapped:", {
          linkedin: result.data.linkedin,
          instagram: result.data.instagram,
          telegram: result.data.telegram,
        });
      }

      if (result.success && result.data) {
        console.log(
          "✅ ProfileContainer: Company data loaded successfully from API"
        );

        // Data is already mapped by mapAPIDataToForm in Server Action
        return {
          success: true,
          data: result.data,
          rawData: result.rawData, // Keep raw data for company ID
        };
      } else {
        console.warn("⚠️ ===== API LOAD FAILED =====");
        console.warn("⚠️ ProfileContainer: API returned no data");
        console.warn("⚠️ ProfileContainer: Error:", result?.error);
        console.warn("⚠️ ProfileContainer: Full result for debugging:", result);

        return {
          success: false,
          error: result?.error || "خطا در دریافت اطلاعات",
        };
      }
    } catch (error) {
      console.error("❌ ===== API LOAD EXCEPTION =====");
      console.error(
        "❌ ProfileContainer: Exception in loadCompanyFromAPI:",
        error
      );
      console.error("❌ ProfileContainer: Error name:", error.name);
      console.error("❌ ProfileContainer: Error message:", error.message);
      console.error("❌ ProfileContainer: Error stack:", error.stack);

      return {
        success: false,
        error: `خطا در ارتباط با سرور: ${error.message}`,
      };
    }
  };

  const handleSave = async () => {
    alert("دکمه ذخیره کلیک شد!");
    console.log("🔥 ===== SAVE BUTTON CLICKED =====");
    console.log("💾 ProfileContainer: Starting save process...");
    console.log("🚀 ProfileContainer: Using Server Actions for API calls");
    console.log("📍 ProfileContainer: Current component state:", {
      isLoading,
      isSaving,
      companyId,
      hasCompanyData: !!companyData,
      companyDataKeys: Object.keys(companyData),
    });

    // Test Server Actions connectivity
    try {
      console.log("🧪 ProfileContainer: Testing Server Actions...");
      console.log("🧪 ProfileContainer: Calling testServerAction()...");

      const testResult = await testServerAction();
      console.log(
        "🧪 ProfileContainer: Server Actions test result:",
        testResult
      );
      console.log("🧪 ProfileContainer: Test result type:", typeof testResult);
      console.log(
        "🧪 ProfileContainer: Test result keys:",
        testResult ? Object.keys(testResult) : "null"
      );

      if (testResult && testResult.success) {
        console.log("✅ ProfileContainer: Server Actions are working!");
      } else {
        console.error(
          "❌ ProfileContainer: Server Actions test failed:",
          testResult
        );
        alert("❌ Server Actions تست ناموفق: " + JSON.stringify(testResult));
      }
    } catch (testError) {
      console.error(
        "❌ ProfileContainer: Server Actions test exception:",
        testError
      );
      console.error("❌ ProfileContainer: Test error name:", testError.name);
      console.error(
        "❌ ProfileContainer: Test error message:",
        testError.message
      );
      console.error("❌ ProfileContainer: Test error stack:", testError.stack);
      alert("❌ خطا در تست Server Actions: " + testError.message);
    }

    try {
      console.log("🔄 ProfileContainer: Setting isSaving to true...");
      setIsSaving(true);
      console.log("✅ ProfileContainer: isSaving set to true");

      // Update the saved preference
      console.log("🔄 ProfileContainer: Updating display name preference...");
      setSavedDisplayNamePreference(displayNamePreference);
      console.log("✅ ProfileContainer: Display name preference updated");

      // Include images in the data to be saved
      console.log("🔄 ProfileContainer: Preparing data to save...");
      const dataToSave = {
        ...companyData,
        companyLogo,
        displayNamePreference,
      };
      console.log("📦 ProfileContainer: Data to save:", dataToSave);
      console.log(
        "📦 ProfileContainer: Data size:",
        JSON.stringify(dataToSave).length,
        "characters"
      );

      let apiResult;

      if (companyId) {
        console.log(
          "🔄 ProfileContainer: Updating existing company with ID:",
          companyId
        );
        console.log("🔄 ProfileContainer: Calling updateCompany()...");

        const startTime = Date.now();
        apiResult = await updateCompany(companyId, dataToSave);
        const endTime = Date.now();

        console.log(
          "📡 ProfileContainer: updateCompany completed in",
          endTime - startTime,
          "ms"
        );
        console.log("📡 ProfileContainer: updateCompany result:", apiResult);
      } else {
        console.log("🆕 ProfileContainer: Creating new company");
        console.log("🔄 ProfileContainer: Calling createCompany()...");

        const startTime = Date.now();
        apiResult = await createCompany(dataToSave);
        const endTime = Date.now();

        console.log(
          "📡 ProfileContainer: createCompany completed in",
          endTime - startTime,
          "ms"
        );
        console.log("📡 ProfileContainer: createCompany result:", apiResult);
      }

      console.log("📡 ProfileContainer: Server Action Result:", apiResult);
      console.log("📡 ProfileContainer: Result type:", typeof apiResult);
      console.log(
        "📡 ProfileContainer: Result keys:",
        apiResult ? Object.keys(apiResult) : "null"
      );

      if (apiResult && apiResult.success) {
        console.log("✅ ProfileContainer: Save successful!");

        // Update local state with API response
        if (apiResult.data && apiResult.data.id) {
          setCompanyId(apiResult.data.id);
          console.log(
            "🆔 ProfileContainer: Company ID updated:",
            apiResult.data.id
          );
        }

        // Also save to localStorage as backup
        const localSaveResult = saveCompanyToLocalStorage(dataToSave);
        console.log(
          "💾 ProfileContainer: LocalStorage save result:",
          localSaveResult
        );

        showSuccessMessage(apiResult.message || "اطلاعات با موفقیت ذخیره شد!");
      } else {
        console.warn(
          "⚠️ ProfileContainer: Server Action failed, using localStorage fallback"
        );
        console.error("⚠️ ProfileContainer: Server Action Error:", apiResult);

        // If API fails, save to localStorage as fallback
        const localSaveResult = saveCompanyToLocalStorage(dataToSave);
        console.log(
          "💾 ProfileContainer: Fallback save result:",
          localSaveResult
        );

        if (localSaveResult.success) {
          showWarningMessage(
            `اطلاعات در حافظه محلی ذخیره شد. خطا API: ${
              apiResult?.error || "نامشخص"
            }`
          );
        } else {
          showErrorMessage(
            `خطا در ذخیره در API و حافظه محلی. API: ${
              apiResult?.error || "نامشخص"
            }, LocalStorage: ${localSaveResult.error}`
          );
        }
      }
    } catch (error) {
      console.error("❌ ProfileContainer: Exception in save process:", error);
      console.error("❌ ProfileContainer: Error stack:", error.stack);

      // Emergency fallback to localStorage
      const dataToSave = {
        ...companyData,
        companyLogo,
        displayNamePreference,
      };
      const emergencySaveResult = saveCompanyToLocalStorage(dataToSave);
      console.log(
        "💾 ProfileContainer: Emergency save result:",
        emergencySaveResult
      );

      if (emergencySaveResult.success) {
        showErrorMessage(
          "خطا در ارتباط با سرور. اطلاعات در حافظه محلی ذخیره شد."
        );
      } else {
        showErrorMessage("خطا در ارتباط با سرور و ذخیره در حافظه محلی.");
      }
    } finally {
      setIsSaving(false);
      console.log("🏁 ProfileContainer: Save process completed");
    }
  };

  // Helper mapping functions moved to Server Actions
  // All data mapping is now handled by Server Actions in companies.js

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
        <span className="mr-3 text-gray-400">در حال بارگذاری...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Building2 className="text-yellow-400" size={28} />
          <h2 className="text-2xl font-bold text-white">{displayName}</h2>
        </div>
        <div className="flex gap-2">
          {/* Simple Test Button */}
          <button
            onClick={() => {
              console.log("🔥 SIMPLE TEST: Button clicked!");
              alert("دکمه کلیک شد!");
            }}
            className="flex items-center gap-2 bg-red-500 text-white font-medium px-3 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            تست ساده
          </button>

          {/* Test Load Button */}
          <button
            onClick={async () => {
              console.log("🔄 ===== TEST LOAD BUTTON CLICKED =====");
              console.log("🔄 Test Load: Button clicked, starting test...");
              alert("شروع تست دریافت اطلاعات...");

              // Test basic function availability
              console.log("🔄 Test Load: Checking function availability...");
              console.log("🔄 Test Load: getCompany type:", typeof getCompany);
              console.log(
                "🔄 Test Load: loadCompanyFromAPI type:",
                typeof loadCompanyFromAPI
              );

              try {
                console.log("🔄 Test Load: Starting loadCompanyFromAPI...");
                const result = await loadCompanyFromAPI();
                console.log("🔄 Test Load: Result received:", result);
                console.log("🔄 Test Load: Result type:", typeof result);
                console.log(
                  "🔄 Test Load: Result keys:",
                  result ? Object.keys(result) : "null"
                );

                if (result && result.success) {
                  console.log("✅ Test Load: Success case");
                  alert(
                    "✅ دریافت موفق!\n" +
                      `نام شرکت: ${result.data?.companyName || "نامشخص"}\n` +
                      `اندازه: ${result.data?.companySize || "نامشخص"}\n` +
                      `صنعت: ${result.data?.industryType || "نامشخص"}`
                  );
                } else {
                  console.log("❌ Test Load: Failure case");
                  alert(
                    "❌ دریافت ناموفق: " + (result?.error || "خطای نامشخص")
                  );
                }
              } catch (error) {
                console.error("❌ Test Load: Exception caught:", error);
                console.error("❌ Test Load: Error name:", error.name);
                console.error("❌ Test Load: Error message:", error.message);
                console.error("❌ Test Load: Error stack:", error.stack);
                alert("❌ خطا در تست: " + error.message);
              }
            }}
            className="flex items-center gap-2 bg-green-500 text-white font-medium px-3 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            تست دریافت اطلاعات
          </button>

          {/* Test Button */}
          <button
            onClick={async () => {
              console.log("🧪 Test Button: Clicked");
              alert("شروع تست Server Actions...");
              try {
                console.log("🧪 Test Button: Checking imports...");
                console.log(
                  "🧪 Test Button: testServerAction type:",
                  typeof testServerAction
                );
                console.log(
                  "🧪 Test Button: createCompany type:",
                  typeof createCompany
                );

                if (typeof testServerAction !== "function") {
                  throw new Error(
                    "testServerAction is not a function: " +
                      typeof testServerAction
                  );
                }

                console.log("🧪 Test Button: Calling testServerAction...");
                const result = await testServerAction();
                console.log("🧪 Test Button: Result:", result);
                alert("✅ تست موفق: " + JSON.stringify(result));
              } catch (error) {
                console.error("❌ Test Button: Error:", error);
                console.error("❌ Test Button: Error stack:", error.stack);
                alert("❌ تست ناموفق: " + error.message);
              }
            }}
            className="flex items-center gap-2 bg-blue-500 text-white font-medium px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            تست Server Actions
          </button>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-yellow-500 text-black font-medium px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                در حال ذخیره...
              </>
            ) : (
              <>
                <Save size={16} />
                ذخیره اطلاعات
              </>
            )}
          </button>
        </div>
      </div>

      {/* Message Display */}
      {message.text && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-500/20 border border-green-500/50 text-green-400"
              : message.type === "error"
              ? "bg-red-500/20 border border-red-500/50 text-red-400"
              : message.type === "warning"
              ? "bg-yellow-500/20 border border-yellow-500/50 text-yellow-400"
              : "bg-blue-500/20 border border-blue-500/50 text-blue-400"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Profile Sections */}
      <div className="space-y-6">
        <CompanyImagesSection
          companyLogo={companyLogo}
          setCompanyLogo={setCompanyLogo}
        />

        <BasicInfoSection
          companyData={companyData}
          handleInputChange={handleInputChange}
          displayNamePreference={displayNamePreference}
          setDisplayNamePreference={setDisplayNamePreference}
        />

        {/* Other sections temporarily removed for debugging */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-white text-lg font-medium mb-4">
            🚧 سایر بخش‌ها موقتاً حذف شده
          </h3>
          <p className="text-gray-400">
            برای debugging مشکل API، سایر sections موقتاً حذف شدند.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileContainer;
