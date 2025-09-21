import React from "react";
import { Users } from "lucide-react";
import CustomSelect from "@/components/ui/select/CustomSelect";

export default function VacancyRequirements({
  requirements,
  handleRequirementsChange,
}) {
  return (
    <section className="border-b border-gray-800 pb-6">
      <h2 className="text-xl font-semibold text-gray-100 mb-4 flex items-center">
        <Users className="w-6 h-6 ml-2 text-yellow-500" />
        شرایط استخدام
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            جنسیت
          </label>
          <CustomSelect
            value={requirements.gender}
            onChange={(value) => handleRequirementsChange("gender", value)}
            placeholder="انتخاب جنسیت"
            options={[
              { value: "both", label: "آقا و خانم" },
              { value: "male", label: "آقا" },
              { value: "female", label: "خانم" }
            ]}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            حداقل تحصیلات
          </label>
          <CustomSelect
            value={requirements.education}
            onChange={(value) => handleRequirementsChange("education", value)}
            placeholder="انتخاب تحصیلات"
            options={[
              { value: "diploma", label: "دیپلم" },
              { value: "associate", label: "کاردانی" },
              { value: "bachelor", label: "کارشناسی" },
              { value: "master", label: "کارشناسی ارشد" },
              { value: "phd", label: "دکتری" }
            ]}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            سابقه کاری
          </label>
          <CustomSelect
            value={requirements.experience}
            onChange={(value) => handleRequirementsChange("experience", value)}
            placeholder="انتخاب سابقه کاری"
            options={[
              { value: "no-experience", label: "بدون سابقه" },
              { value: "1-2", label: "۱ تا ۲ سال" },
              { value: "3-5", label: "۳ تا ۵ سال" },
              { value: "5-10", label: "۵ تا ۱۰ سال" },
              { value: "10+", label: "بیش از ۱۰ سال" }
            ]}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            وضعیت نظام وظیفه
          </label>
          <CustomSelect
            value={requirements.militaryService}
            onChange={(value) => handleRequirementsChange("militaryService", value)}
            placeholder="انتخاب وضعیت"
            options={[
              { value: "completed", label: "پایان خدمت" },
              { value: "exempt", label: "معافیت" },
              { value: "not-applicable", label: "مشمول نمی‌شود" }
            ]}
          />
        </div>
      </div>
    </section>
  );
}
