import React from "react";
import { Gift } from "lucide-react";
import CustomInput from "@/components/ui/input/CustomInput";
import CustomSelect from "@/components/ui/select/CustomSelect";

export default function VacancyBenefits({
  benefits,
  workConditions,
  handleBenefitsChange,
  handleWorkConditionsChange,
}) {
  const addBenefit = () => {
    const updatedBenefits = [...benefits, ""];
    handleBenefitsChange("benefits", updatedBenefits);
  };

  const removeBenefit = (index) => {
    const updatedBenefits = benefits.filter((_, i) => i !== index);
    handleBenefitsChange("benefits", updatedBenefits);
  };

  const updateBenefit = (index, value) => {
    const updatedBenefits = benefits.map((benefit, i) =>
      i === index ? value : benefit
    );
    handleBenefitsChange("benefits", updatedBenefits);
  };

  return (
    <section className="border-b border-gray-800 pb-6">
      <h2 className="text-xl font-semibold text-gray-100 mb-4 flex items-center">
        <Gift className="w-6 h-6 ml-2 text-yellow-500" />
        مزایا و شرایط کاری
      </h2>

      <div className="space-y-6">
        {/* مزایا */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-3">
            مزایا و تسهیلات
          </label>
          <div className="space-y-2">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex gap-2">
                <CustomInput
                  value={benefit}
                  onChange={(e) => updateBenefit(index, e.target.value)}
                  placeholder="نام مزیت یا تسهیلات"
                  className="flex-1"
                />
                <button
                  type="button"
                  onClick={() => removeBenefit(index)}
                  className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  حذف
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addBenefit}
              className="w-full py-3 border-2 border-dashed border-gray-600 text-gray-400 rounded-lg hover:border-yellow-500 hover:text-yellow-400 transition-colors"
            >
              + افزودن مزیت
            </button>
          </div>
        </div>

        {/* شرایط کاری */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              ساعات کاری
            </label>
            <CustomInput
              value={workConditions.workHours}
              onChange={(e) =>
                handleWorkConditionsChange("workHours", e.target.value)
              }
              placeholder="مثال: ۹ صبح تا ۶ عصر"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              دوره آزمایشی
            </label>
            <CustomInput
              value={workConditions.probationPeriod}
              onChange={(e) =>
                handleWorkConditionsChange("probationPeriod", e.target.value)
              }
              placeholder="مثال: ۳ ماه"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              نوع بیمه
            </label>
            <CustomSelect
              value={workConditions.insurance}
              onChange={(value) =>
                handleWorkConditionsChange("insurance", value)
              }
              placeholder="انتخاب نوع بیمه"
              options={[
                { value: "full", label: "بیمه کامل" },
                { value: "basic", label: "بیمه پایه" },
                { value: "none", label: "بدون بیمه" },
              ]}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              امکان دورکاری
            </label>
            <CustomSelect
              value={workConditions.remoteWork ? "yes" : "no"}
              onChange={(value) =>
                handleWorkConditionsChange("remoteWork", value === "yes")
              }
              placeholder="انتخاب کنید"
              options={[
                { value: "no", label: "خیر" },
                { value: "yes", label: "بله" },
              ]}
            />
          </div>
        </div>

        {/* چک‌باکس‌های اضافی */}
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center space-x-2 space-x-reverse cursor-pointer">
            <input
              type="checkbox"
              checked={workConditions.travelRequired}
              onChange={(e) =>
                handleWorkConditionsChange("travelRequired", e.target.checked)
              }
              className="w-4 h-4 text-yellow-500 bg-[#2a2a2a] border-[#444] rounded focus:ring-yellow-500 focus:ring-2 accent-yellow-500"
            />
            <span className="text-gray-300 mr-2">سفرهای کاری</span>
          </label>
          <label className="flex items-center space-x-2 space-x-reverse cursor-pointer">
            <input
              type="checkbox"
              checked={workConditions.urgent}
              onChange={(e) =>
                handleWorkConditionsChange("urgent", e.target.checked)
              }
              className="w-4 h-4 text-yellow-500 bg-[#2a2a2a] border-[#444] rounded focus:ring-yellow-500 focus:ring-2 accent-yellow-500"
            />
            <span className="text-gray-300 mr-2">فوری</span>
          </label>
        </div>
      </div>
    </section>
  );
}
