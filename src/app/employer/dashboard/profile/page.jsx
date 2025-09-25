"use client";

// components/employers/CompanyProfileTab.jsx
import { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Users,
  Calendar,
  Upload,
  Save,
  Camera,
  Star,
  Award,
  Trash2,
} from "lucide-react";
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

const FormSection = ({ title, icon: Icon, children }) => (
  <div className="border border-gray-700 rounded-lg p-6 mb-6">
    <div className="flex items-center gap-3 mb-4">
      <Icon className="text-yellow-400" size={20} />
      <h3 className="text-lg font-semibold text-white">{title}</h3>
    </div>
    {children}
  </div>
);

const FormField = ({ label, children, description, required }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-300 mb-2">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    {children}
    {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
  </div>
);

const ImageUpload = ({ label, currentImage, onImageChange, inputId }) => {
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageChange(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <div className="flex items-center gap-4">
        <div className="w-20 h-20  border border-gray-600 rounded-lg flex items-center justify-center overflow-hidden">
          {currentImage ? (
            <Image
              src={currentImage}
              alt="Company"
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          ) : (
            <Camera className="text-gray-400" size={24} />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="file"
            id={inputId}
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => document.getElementById(inputId).click()}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-colors"
          >
            <Upload size={16} />
            انتخاب تصویر
          </button>
          {currentImage && (
            <button
              type="button"
              onClick={() => onImageChange(null)}
              className="w-fit flex items-center gap-2 px-2 py-2 bg-red-600 text-white rounded-lg transition-colors text-sm"
            >
              <Trash2 size={16} />
              حذف تصویر
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default function ProfilePage() {
  // Removed console logs to prevent spam during typing

  // Empty company data template to avoid localStorage pre-loading (memoized to prevent re-renders)
  const EMPTY_COMPANY_DATA = useMemo(
    () => ({
      companyName: "",
      companyNameEn: "",
      displayName: "",
      companyCode: "",
      establishedYear: new Date().getFullYear(),
      companySize: "1-10",
      companyType: "سهامی خاص",
      industryType: "technology",
      email: "",
      website: "",
      mobile: "",
      phone: "",
      fax: "",
      country: "ایران",
      province: "تهران",
      city: "تهران",
      address: "",
      postalCode: "",
      linkedin: "",
      instagram: "",
      telegram: "",
      description: "",
      vision: "",
      mission: "",
      workEnvironment: "",
      services: [],
      specialties: [],
      benefits: [],
      companyLogo: null,
      companyCover: null,
    }),
    []
  );

  const [companyData, setCompanyData] = useState(EMPTY_COMPANY_DATA);
  const [companyLogo, setCompanyLogo] = useState(null);
  const [displayNamePreference, setDisplayNamePreference] = useState("persian");
  const [savedDisplayNamePreference, setSavedDisplayNamePreference] =
    useState("persian");

  // API related states
  const [isLoading, setIsLoading] = useState(true); // Start with loading true
  const [isSaving, setIsSaving] = useState(false);
  const [companyId, setCompanyId] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Load company data from API
  const loadCompanyFromAPI = async () => {
    try {
      console.log("🔄 ===== LOADING COMPANY DATA FROM API =====");
      console.log("🔄 ProfilePage: Starting API call to getCompany('my')...");

      // Get token from localStorage to pass to server
      const clientToken = localStorage.getItem("authToken");
      console.log(
        "🔐 ProfilePage: Passing token to server:",
        clientToken ? `${clientToken.substring(0, 20)}...` : "null"
      );

      const startTime = Date.now();
      const result = await getCompany("my", clientToken);
      const endTime = Date.now();

      console.log(
        `📡 ProfilePage: API call completed in ${endTime - startTime}ms`
      );
      console.log("📡 ProfilePage: Full API result:", result);
      console.log("📡 ProfilePage: Result success:", result?.success);
      console.log("📡 ProfilePage: Result data exists:", !!result?.data);
      console.log("📡 ProfilePage: Result rawData exists:", !!result?.rawData);

      if (result?.rawData) {
        console.log(
          "📦 ProfilePage: Raw API data from server:",
          result.rawData
        );
        console.log(
          "📦 ProfilePage: Company ID in raw data:",
          result.rawData.id
        );
      }

      if (result?.data) {
        console.log("🔄 ProfilePage: Mapped form data:", result.data);
        console.log(
          "🔄 ProfilePage: Company name mapped:",
          result.data.companyName
        );
      }

      if (result.success && result.data) {
        console.log(
          "✅ ProfilePage: Company data loaded successfully from API"
        );
        return {
          success: true,
          data: result.data,
          rawData: result.rawData,
        };
      } else {
        console.warn("⚠️ ProfilePage: API returned no data:", result?.error);
        return {
          success: false,
          error: result?.error || "خطا در دریافت اطلاعات",
        };
      }
    } catch (error) {
      console.error("❌ ProfilePage: Exception in loadCompanyFromAPI:", error);
      return {
        success: false,
        error: `خطا در ارتباط با سرور: ${error.message}`,
      };
    }
  };

  // Load company data on component mount - SIMPLIFIED to prevent infinite loop
  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      if (!mounted) return;

      console.log("🔄 ProfilePage: Starting data load...");
      setIsLoading(true);

      try {
        const clientToken = localStorage.getItem("authToken");
        const result = await getCompany("my", clientToken);

        if (!mounted) return;

        if (result?.success && result?.data) {
          console.log("✅ ProfilePage: Successfully loaded from API");
          setCompanyData(result.data);
          if (result.rawData?.id) {
            setCompanyId(result.rawData.id);
          }
        }
      } catch (error) {
        console.error("❌ ProfilePage: Error loading data:", error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, []);

  const handleInputChange = useCallback((field, value) => {
    setCompanyData((prev) => ({ ...prev, [field]: value }));
  }, []);

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

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setMessage({ type: "", text: "" });

      // Update the saved preference
      setSavedDisplayNamePreference(displayNamePreference);

      // Include images in the data to be saved
      const dataToSave = {
        ...companyData,
        companyLogo,
        displayNamePreference,
      };

      // Get token from localStorage to pass to Server Action
      const token = localStorage.getItem("authToken");
      const oldToken = localStorage.getItem("auth_token");

      // Check cookies for tokens
      const authCookie = document.cookie
        .split(";")
        .find((c) => c.trim().startsWith("authToken="));
      const oldAuthCookie = document.cookie
        .split(";")
        .find((c) => c.trim().startsWith("auth_token="));

      if (!token && !oldToken && !authCookie && !oldAuthCookie) {
        throw new Error(
          "لطفاً ابتدا وارد شوید. هیچ authentication token یافت نشد."
        );
      }

      // Use token from localStorage or extract from cookie
      const finalToken =
        token ||
        oldToken ||
        (authCookie ? authCookie.split("=")[1].trim() : null) ||
        (oldAuthCookie ? oldAuthCookie.split("=")[1].trim() : null);

      // Add token to data
      const dataWithToken = {
        ...dataToSave,
        _token: finalToken,
      };

      // Try API first
      let apiResult;

      try {
        if (companyId) {
          apiResult = await updateCompany(companyId, dataWithToken);
        } else {
          apiResult = await createCompany(dataWithToken);
        }

        if (apiResult && apiResult.success) {
          // Update company ID if returned
          if (apiResult.data && apiResult.data.id) {
            setCompanyId(apiResult.data.id);
          }

          // Show success message
          setMessage({
            type: "success",
            text: "اطلاعات شرکت با موفقیت ذخیره شد",
          });

          // Don't auto-reload to prevent infinite loop
          // User can manually refresh if needed
        } else {
          throw new Error(apiResult?.error || "خطا در ذخیره اطلاعات");
        }
      } catch (apiError) {
        // Fallback to localStorage
        updateCompanyData(dataToSave);
        setMessage({
          type: "warning",
          text: `اطلاعات در حافظه محلی ذخیره شد. خطا API: ${
            apiError.message || "نامشخص"
          }`,
        });
      }
    } catch (error) {
      // Emergency fallback to localStorage
      const dataToSave = {
        ...companyData,
        companyLogo,
        displayNamePreference,
      };
      updateCompanyData(dataToSave);

      setMessage({
        type: "error",
        text: "خطا در ارتباط با سرور. اطلاعات در حافظه محلی ذخیره شد.",
      });
    } finally {
      setIsSaving(false);

      // Clear message after 5 seconds
      setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 5000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Building2 className="text-yellow-400" size={28} />
          <h2 className="text-2xl font-bold text-white">{displayName}</h2>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-yellow-500 text-black font-medium px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
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
      {/* Loading Display */}
      {isLoading && (
        <div className="mb-6 p-6 rounded-lg bg-slate-800/50 border border-slate-600 text-slate-300 flex items-center justify-center gap-3">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-400"></div>
          <span className="text-base font-medium">بارگذاری اطلاعات...</span>
        </div>
      )}
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
      {/* Main Content - Disabled during loading */}
      <div className={isLoading ? "opacity-50 pointer-events-none" : ""}>
        {/* Company Images */}
        <FormSection title="تصاویر شرکت" icon={Camera}>
          <div className="space-y-6">
            <ImageUpload
              label="لوگو شرکت"
              currentImage={companyLogo}
              onImageChange={setCompanyLogo}
              inputId="company-logo"
            />

            <div className="border-t border-gray-600 pt-6">
              <h4 className="text-lg font-medium text-white mb-3">
                راهنمایی آپلود تصویر
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
                <div>
                  <h5 className="font-medium text-yellow-400 mb-2">
                    فرمت‌های پشتیبانی شده:
                  </h5>
                  <ul className="space-y-1">
                    <li>• PNG (با پس‌زمینه شفاف)</li>
                    <li>• JPG/JPEG</li>
                    <li>• SVG (وکتور)</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-yellow-400 mb-2">
                    سایز پیشنهادی:
                  </h5>
                  <ul className="space-y-1">
                    <li>• حداقل: 200x200 پیکسل</li>
                    <li>• حداکثر: 2000x2000 پیکسل</li>
                    <li>• حجم فایل: حداکثر 5MB</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                <p className="text-blue-300 text-sm">
                  <strong>نکته:</strong> لوگو با کیفیت بالا به برندینگ شرکت شما
                  کمک می‌کند. از تصاویر با وضوح بالا و کنتراست مناسب استفاده
                  کنید.
                </p>
              </div>
            </div>
          </div>
        </FormSection>

        {/* Basic Information */}
        <FormSection title="اطلاعات پایه" icon={Building2}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="نام شرکت (فارسی)" required>
              <input
                type="text"
                value={companyData.companyName}
                onChange={(e) =>
                  handleInputChange("companyName", e.target.value)
                }
                className="w-full  border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </FormField>

            <FormField label="نام شرکت (انگلیسی)">
              <input
                type="text"
                value={companyData.companyNameEn}
                onChange={(e) =>
                  handleInputChange("companyNameEn", e.target.value)
                }
                className="w-full  border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </FormField>

            <FormField label="سال تأسیس">
              <input
                type="text"
                value={companyData.establishedYear}
                onChange={(e) =>
                  handleInputChange("establishedYear", e.target.value)
                }
                className="w-full  border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="مثال: 1395"
              />
            </FormField>

            <FormField label="نوع شرکت">
              <select
                value={companyData.companyType}
                onChange={(e) =>
                  handleInputChange("companyType", e.target.value)
                }
                className="w-full  border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="private">خصوصی</option>
                <option value="public">دولتی</option>
                <option value="semi-public">نیمه دولتی</option>
                <option value="cooperative">تعاونی</option>
              </select>
            </FormField>

            <FormField label="حوزه فعالیت">
              <select
                value={companyData.industryType}
                onChange={(e) =>
                  handleInputChange("industryType", e.target.value)
                }
                className="w-full  border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="technology">فناوری اطلاعات</option>
                <option value="manufacturing">تولیدی</option>
                <option value="service">خدماتی</option>
                <option value="finance">مالی و بانکی</option>
                <option value="healthcare">بهداشت و درمان</option>
                <option value="education">آموزشی</option>
                <option value="retail">خرده فروشی</option>
                <option value="construction">ساخت و ساز</option>
              </select>
            </FormField>

            <FormField label="اندازه شرکت">
              <select
                value={companyData.companySize}
                onChange={(e) =>
                  handleInputChange("companySize", e.target.value)
                }
                className="w-full  border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="1-10">1-10 نفر</option>
                <option value="11-50">11-50 نفر</option>
                <option value="51-100">51-100 نفر</option>
                <option value="101-500">101-500 نفر</option>
                <option value="500+">بیش از 500 نفر</option>
              </select>
            </FormField>
          </div>

          <FormField
            label="نام نمایشی شرکت"
            description="انتخاب کنید کدام نام شرکت در پروفایل شما نمایش داده شود"
          >
            <select
              value={displayNamePreference}
              onChange={(e) => setDisplayNamePreference(e.target.value)}
              className="w-full md:w-1/2 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="persian">نام فارسی</option>
              <option value="english">نام انگلیسی</option>
            </select>
          </FormField>
        </FormSection>

        {/* Contact Information */}
        <FormSection title="اطلاعات تماس" icon={Phone}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="تلفن ثابت" required>
              <input
                type="tel"
                value={companyData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="w-full  border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </FormField>

            <FormField label="تلفن همراه">
              <input
                type="tel"
                value={companyData.mobile}
                onChange={(e) => handleInputChange("mobile", e.target.value)}
                className="w-full  border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </FormField>

            <FormField label="ایمیل" required>
              <input
                type="email"
                value={companyData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full  border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </FormField>

            <FormField label="وب‌سایت">
              <input
                type="url"
                value={companyData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                className="w-full  border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </FormField>
          </div>
        </FormSection>

        {/* Address Information */}
        <FormSection title="آدرس شرکت" icon={MapPin}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="کشور" required>
              <select
                value={companyData.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
                className="w-full  border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="ایران">ایران</option>
                <option value="آمریکا">آمریکا</option>
                <option value="کانادا">کانادا</option>
                <option value="انگلستان">انگلستان</option>
                <option value="آلمان">آلمان</option>
                <option value="فرانسه">فرانسه</option>
                <option value="امارات متحده عربی">امارات متحده عربی</option>
                <option value="ترکیه">ترکیه</option>
                <option value="سوئد">سوئد</option>
                <option value="هلند">هلند</option>
              </select>
            </FormField>

            <FormField label="استان" required>
              <input
                type="text"
                value={companyData.province}
                onChange={(e) => handleInputChange("province", e.target.value)}
                className="w-full  border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </FormField>

            <FormField label="شهر" required>
              <input
                type="text"
                value={companyData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className="w-full  border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </FormField>

            <FormField label="کد پستی">
              <input
                type="text"
                value={companyData.postalCode}
                onChange={(e) =>
                  handleInputChange("postalCode", e.target.value)
                }
                className="w-full  border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </FormField>
          </div>

          <FormField label="آدرس کامل" required>
            <textarea
              value={companyData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              rows={3}
              className="w-full  border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </FormField>
        </FormSection>

        {/* Company Description */}
        <FormSection title="درباره شرکت" icon={Award}>
          <FormField
            label="معرفی شرکت"
            required
            description="توضیح کاملی از فعالیت‌های شرکت ارائه دهید"
          >
            <textarea
              value={companyData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={4}
              className="w-full  border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="چشم‌انداز شرکت">
              <textarea
                value={companyData.vision}
                onChange={(e) => handleInputChange("vision", e.target.value)}
                rows={3}
                className="w-full  border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </FormField>

            <FormField label="ماموریت شرکت">
              <textarea
                value={companyData.mission}
                onChange={(e) => handleInputChange("mission", e.target.value)}
                rows={3}
                className="w-full  border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </FormField>
          </div>
        </FormSection>

        {/* Services & Specialties */}
        <FormSection title="خدمات و تخصص‌ها" icon={Star}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <FormField label="خدمات شرکت">
                <div className="space-y-2">
                  {companyData.services.map((service, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={service}
                        onChange={(e) =>
                          handleArrayChange("services", index, e.target.value)
                        }
                        className="flex-1  border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        placeholder="نام خدمت"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem("services", index)}
                        className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        حذف
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem("services")}
                    className="w-full py-2 border-2 border-dashed border-gray-600 text-gray-400 rounded-lg hover:border-yellow-500 hover:text-yellow-400 transition-colors"
                  >
                    + افزودن خدمت
                  </button>
                </div>
              </FormField>
            </div>

            <div>
              <FormField label="تخصص‌های فنی">
                <div className="space-y-2">
                  {companyData.specialties.map((specialty, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={specialty}
                        onChange={(e) =>
                          handleArrayChange(
                            "specialties",
                            index,
                            e.target.value
                          )
                        }
                        className="flex-1  border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        placeholder="نام تخصص"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem("specialties", index)}
                        className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        حذف
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem("specialties")}
                    className="w-full py-2 border-2 border-dashed border-gray-600 text-gray-400 rounded-lg hover:border-yellow-500 hover:text-yellow-400 transition-colors"
                  >
                    + افزودن تخصص
                  </button>
                </div>
              </FormField>
            </div>
          </div>
        </FormSection>

        {/* Social Media */}
        <FormSection title="شبکه‌های اجتماعی" icon={Globe}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="لینکدین">
              <input
                type="url"
                value={companyData.linkedin}
                onChange={(e) => handleInputChange("linkedin", e.target.value)}
                className="w-full  border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </FormField>

            <FormField label="اینستاگرام">
              <input
                type="text"
                value={companyData.instagram}
                onChange={(e) => handleInputChange("instagram", e.target.value)}
                className="w-full  border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="@username"
              />
            </FormField>

            <FormField label="تلگرام">
              <input
                type="text"
                value={companyData.telegram}
                onChange={(e) => handleInputChange("telegram", e.target.value)}
                className="w-full  border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="@channel"
              />
            </FormField>
          </div>
        </FormSection>

        {/* Company Culture */}
        <FormSection title="فرهنگ سازمانی" icon={Users}>
          <FormField label="مزایا و تسهیلات">
            <div className="space-y-2">
              {companyData.benefits.map((benefit, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={benefit}
                    onChange={(e) =>
                      handleArrayChange("benefits", index, e.target.value)
                    }
                    className="flex-1  border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="نام مزیت"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem("benefits", index)}
                    className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    حذف
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem("benefits")}
                className="w-full py-2 border-2 border-dashed border-gray-600 text-gray-400 rounded-lg hover:border-yellow-500 hover:text-yellow-400 transition-colors"
              >
                + افزودن مزیت
              </button>
            </div>
          </FormField>

          <FormField label="محیط کاری">
            <textarea
              value={companyData.workEnvironment}
              onChange={(e) =>
                handleInputChange("workEnvironment", e.target.value)
              }
              rows={3}
              className="w-full  border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="توضیح محیط کاری و فرهنگ سازمانی"
            />
          </FormField>
        </FormSection>
      </div>{" "}
      {/* End of Main Content wrapper */}
    </div>
  );
}
