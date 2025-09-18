"use client";

// components/employers/CompanyProfileTab.jsx
import { useState, useEffect, useMemo } from "react";
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
            <img
              src={currentImage}
              alt="Company"
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
  const [companyData, setCompanyData] = useState({ ...COMPANY_DATA });
  const [companyLogo, setCompanyLogo] = useState(null);
  const [displayNamePreference, setDisplayNamePreference] = useState("persian");
  const [savedDisplayNamePreference, setSavedDisplayNamePreference] =
    useState("persian");

  // Load company data on component mount
  useEffect(() => {
    const loadedData = loadCompanyData();
    setCompanyData({ ...loadedData });
    // Load images from saved data
    setCompanyLogo(loadedData.companyLogo);
    const savedPreference = loadedData.displayNamePreference || "persian";
    setDisplayNamePreference(savedPreference);
    setSavedDisplayNamePreference(savedPreference);
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

  const handleSave = () => {
    // Update the saved preference
    setSavedDisplayNamePreference(displayNamePreference);

    // Include images in the data to be saved
    const dataToSave = {
      ...companyData,
      companyLogo,
      displayNamePreference,
    };

    // Update the global company data
    updateCompanyData(dataToSave);

    // Show success message
    const successMessage = document.createElement("div");
    successMessage.className =
      "fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50";
    successMessage.textContent = "اطلاعات ذخیره شد!";
    document.body.appendChild(successMessage);

    // Remove the message after 3 seconds
    setTimeout(() => {
      if (document.body.contains(successMessage)) {
        document.body.removeChild(successMessage);
      }
    }, 3000);
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
          className="flex items-center gap-2 bg-yellow-500 text-black font-medium px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
        >
          <Save size={16} />
          ذخیره اطلاعات
        </button>
      </div>

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
                کمک می‌کند. از تصاویر با وضوح بالا و کنتراست مناسب استفاده کنید.
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
              onChange={(e) => handleInputChange("companyName", e.target.value)}
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
              onChange={(e) => handleInputChange("companyType", e.target.value)}
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
              onChange={(e) => handleInputChange("companySize", e.target.value)}
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
              onChange={(e) => handleInputChange("postalCode", e.target.value)}
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
                        handleArrayChange("specialties", index, e.target.value)
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
    </div>
  );
}
