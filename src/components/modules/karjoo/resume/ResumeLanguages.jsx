import React from "react";
import { Languages, Plus, Trash2 } from "lucide-react";
import CustomSelect from "@/components/ui/select/CustomSelect";

export default function ResumeLanguages({
  languages,
  addItem,
  removeItem,
  updateItem,
  setLanguages,
}) {
  const proficiencyLevels = ["مبتدی", "متوسط", "پیشرفته", "حرفه‌ای"];
  const foreignLanguages = [
    "انگلیسی",
    "عربی",
    "فرانسوی",
    "آلمانی",
    "اسپانیایی",
    "ترکی",
    "روسی",
  ];

  return (
    <section className="border-b border-gray-800 pb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-100 flex items-center">
          <Languages className="w-6 h-6 ml-2 text-yellow-500" />
          زبان‌های خارجی
        </h2>
        <button
          type="button"
          onClick={() =>
            addItem(setLanguages, {
              language: "",
              proficiency: "",
            })
          }
          className="flex items-center px-3 py-2 bg-yellow-500/80 text-gray-900 rounded-lg hover:bg-yellow-500 transition text-sm font-bold"
        >
          <Plus className="w-4 h-4 ml-1" />
          افزودن زبان
        </button>
      </div>
      {languages.map((lang, index) => (
        <div
          key={index}
          className="mb-4 p-4 border border-gray-700 rounded-lg relative"
        >
          {languages.length > 1 && (
            <button
              type="button"
              onClick={() => removeItem(setLanguages, index)}
              className="absolute top-2 left-2 text-red-500 hover:bg-red-500/20 p-1 rounded-full"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                زبان
              </label>
              <CustomSelect
                options={foreignLanguages}
                value={lang.language}
                onChange={(value) =>
                  updateItem(setLanguages, index, "language", value)
                }
                placeholder="انتخاب زبان"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                سطح تسلط
              </label>
              <CustomSelect
                options={proficiencyLevels}
                value={lang.proficiency}
                onChange={(value) =>
                  updateItem(setLanguages, index, "proficiency", value)
                }
                placeholder="انتخاب سطح تسلط"
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
