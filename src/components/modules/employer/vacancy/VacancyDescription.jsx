import React from "react";
import { FileText } from "lucide-react";

export default function VacancyDescription({
  description,
  requirements,
  handleDescriptionChange,
  errors = {},
}) {
  return (
    <section className="border-b border-gray-800 pb-6">
      <h2 className="text-xl font-semibold text-gray-100 mb-4 flex items-center">
        <FileText className="w-6 h-6 ml-2 text-yellow-500" />
        شرح شغل و الزامات
      </h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            شرح شغلی *
          </label>
          <textarea
            value={description}
            onChange={(e) => handleDescriptionChange("description", e.target.value)}
            rows={4}
            className="w-full p-3 rounded-lg bg-[#2a2a2a] border border-[#444] focus:border-yellow-500 focus:ring-yellow-500 transition placeholder:text-gray-400 text-white resize-vertical"
            placeholder="شرح کامل شغلی، وظایف و مسئولیت‌ها را وارد کنید..."
          />
          {errors.description ? (
            <p className="text-red-400 text-sm mt-1">{errors.description}</p>
          ) : (
            <p className="text-gray-500 text-xs mt-1">شرح کامل شغل، وظایف و مسئولیت‌های شغلی را به تفصیل بنویسید</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            شرایط و الزامات *
          </label>
          <textarea
            value={requirements}
            onChange={(e) => handleDescriptionChange("requirements", e.target.value)}
            rows={4}
            className="w-full p-3 rounded-lg bg-[#2a2a2a] border border-[#444] focus:border-yellow-500 focus:ring-yellow-500 transition placeholder:text-gray-400 text-white resize-vertical"
            placeholder="مهارت‌ها، تجربیات و شرایط مورد نیاز را وارد کنید..."
          />
          {errors.requirements ? (
            <p className="text-red-400 text-sm mt-1">{errors.requirements}</p>
          ) : (
            <p className="text-gray-500 text-xs mt-1">مهارت‌های فنی، تجربیات و شرایط لازم برای این شغل را ذکر کنید</p>
          )}
        </div>
      </div>
    </section>
  );
}
