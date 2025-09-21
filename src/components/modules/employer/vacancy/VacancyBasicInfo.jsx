import React from "react";
import { Building2 } from "lucide-react";
import CustomInput from "@/components/ui/input/CustomInput";
import CustomSelect from "@/components/ui/select/CustomSelect";

export default function VacancyBasicInfo({
  basicInfo,
  handleBasicInfoChange,
  errors = {},
}) {
  return (
    <section className="border-b border-gray-800 pb-6">
      <h2 className="text-xl font-semibold text-gray-100 mb-4 flex items-center">
        <Building2 className="w-6 h-6 ml-2 text-yellow-500" />
        اطلاعات پایه آگهی
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            نام شرکت *
          </label>
          <CustomInput
            placeholder="مثال: شرکت فناوری اطلاعات پارامکس"
            value={basicInfo.company}
            onChange={(e) => handleBasicInfoChange("company", e.target.value)}
          />
          {errors.company ? (
            <p className="text-red-400 text-sm mt-2">{errors.company}</p>
          ) : (
            <p className="text-gray-500 text-xs mt-2">
              نام کامل شرکت یا سازمان خود را وارد کنید
            </p>
          )}
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            عنوان آگهی *
          </label>
          <CustomInput
            placeholder="مثال: توسعه‌دهنده Front-End (React)"
            value={basicInfo.title}
            onChange={(e) => handleBasicInfoChange("title", e.target.value)}
          />
          {errors.title ? (
            <p className="text-red-400 text-sm mt-2">{errors.title}</p>
          ) : (
            <p className="text-gray-500 text-xs mt-2">
              عنوان شغل را به طور دقیق وارد کنید
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            دسته‌بندی شغلی *
          </label>
          <CustomSelect
            value={basicInfo.category}
            onChange={(value) => handleBasicInfoChange("category", value)}
            placeholder="انتخاب دسته‌بندی"
            options={[
              "فناوری اطلاعات",
              "طراحی و گرافیک",
              "مدیریت پروژه",
              "بازاریابی و فروش",
              "منابع انسانی",
              "مالی و حسابداری",
              "سایر",
            ]}
          />
          {errors.category ? (
            <p className="text-red-400 text-sm mt-2">{errors.category}</p>
          ) : (
            <p className="text-gray-500 text-xs mt-2">
              دسته‌بندی شغلی مناسب با آگهی خود را انتخاب کنید
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            نوع همکاری *
          </label>
          <CustomSelect
            value={basicInfo.type}
            onChange={(value) => handleBasicInfoChange("type", value)}
            placeholder="انتخاب نوع همکاری"
            options={[
              { value: "full-time", label: "تمام وقت" },
              { value: "part-time", label: "پاره وقت" },
              { value: "contract", label: "قراردادی" },
              { value: "freelance", label: "فریلنسری" },
              { value: "remote", label: "دورکاری" },
            ]}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            حقوق
          </label>
          <div className="space-y-4">
            {basicInfo.salaryType === "amount" && (
              <div>
                <CustomInput
                  placeholder="مثال: ۱۵,۰۰۰,۰۰۰"
                  value={basicInfo.salary}
                  onChange={(e) =>
                    handleBasicInfoChange("salary", e.target.value)
                  }
                />
              </div>
            )}
          </div>
          <div className="flex gap-6 mt-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="salaryType"
                value="agreement"
                checked={basicInfo.salaryType === "agreement"}
                onChange={(e) =>
                  handleBasicInfoChange("salaryType", e.target.value)
                }
                className="w-4 h-4 text-yellow-500 bg-gray-700 border-gray-600 focus:ring-yellow-500 focus:ring-2 focus:ring-offset-0 accent-yellow-500"
              />
              <span className="mr-2 text-gray-300">توافقی</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="salaryType"
                value="amount"
                checked={basicInfo.salaryType === "amount"}
                onChange={(e) =>
                  handleBasicInfoChange("salaryType", e.target.value)
                }
                className="w-4 h-4 text-yellow-500 bg-gray-700 border-gray-600 focus:ring-yellow-500 focus:ring-2 focus:ring-offset-0 accent-yellow-500"
              />
              <span className="mr-2 text-gray-300">درج مبلغ</span>
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            محل کار *
          </label>
          <CustomInput
            placeholder="مثال: تهران، میدان تجریش"
            value={basicInfo.location}
            onChange={(e) => handleBasicInfoChange("location", e.target.value)}
          />
          {errors.location ? (
            <p className="text-red-400 text-sm mt-2">{errors.location}</p>
          ) : (
            <p className="text-gray-500 text-xs mt-2">
              شهر و آدرس دقیق محل کار را وارد کنید
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
