import React from "react";
import { FileText } from "lucide-react";

export default function ResumeAdditionalInfo({
  additionalInfo,
  handleAdditionalInfoChange,
}) {
  return (
    <section className="border-b border-gray-800 pb-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-100 flex items-center">
          <FileText className="w-6 h-6 ml-2 text-yellow-500" />
          توضیحات تکمیلی
        </h2>
      
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          توضیحات
        </label>
        <textarea
          value={additionalInfo}
          onChange={(e) => handleAdditionalInfoChange(e.target.value)}
          placeholder="مثال: علاقه‌مندی‌ها، فعالیت‌های داوطلبانه، جوایز و افتخارات، پروژه‌های شخصی و..."
          className="w-full p-3 rounded-lg bg-[#2a2a2a] border border-[#444] focus:border-yellow-500 focus:ring-yellow-500 transition placeholder:text-gray-400 text-white resize-vertical min-h-[120px]"
          rows={5}
        />
      </div>
    </section>
  );
}
