import React from "react";
import { Briefcase, Plus, Trash2 } from "lucide-react";
import CustomInput from "@/components/ui/input/CustomInput";

export default function ResumeWorkExperience({
  workExperiences,
  addItem,
  removeItem,
  updateItem,
  setWorkExperiences,
}) {
  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-100 flex items-center">
          <Briefcase className="w-6 h-6 ml-2 text-yellow-500" />
          سوابق کاری
        </h2>
        <button
          type="button"
          onClick={() =>
            addItem(setWorkExperiences, {
              companyName: "",
              position: "",
              startDate: "",
              endDate: "",
              currentJob: false,
              responsibilities: "",
            })
          }
          className="flex items-center px-3 py-2 bg-yellow-500/80 text-gray-900 rounded-lg hover:bg-yellow-500 transition text-sm font-bold"
        >
          <Plus className="w-4 h-4 ml-1" />
          افزودن
        </button>
      </div>
      {workExperiences.map((exp, index) => (
        <div
          key={index}
          className="mb-4 p-4 border border-gray-700 rounded-lg relative"
        >
          {workExperiences.length > 1 && (
            <button
              type="button"
              onClick={() => removeItem(setWorkExperiences, index)}
              className="absolute top-2 left-2 text-red-500 hover:bg-red-500/20 p-1 rounded-full"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                نام شرکت
              </label>
              <CustomInput
                placeholder="نام شرکت"
                value={exp.companyName}
                onChange={(e) =>
                  updateItem(
                    setWorkExperiences,
                    index,
                    "companyName",
                    e.target.value
                  )
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                موقعیت شغلی
              </label>
              <CustomInput
                placeholder="عنوان شغل"
                value={exp.position}
                onChange={(e) =>
                  updateItem(
                    setWorkExperiences,
                    index,
                    "position",
                    e.target.value
                  )
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                تاریخ شروع
              </label>
              <CustomInput
                type="date"
                value={exp.startDate}
                onChange={(e) =>
                  updateItem(
                    setWorkExperiences,
                    index,
                    "startDate",
                    e.target.value
                  )
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                تاریخ اتمام
              </label>
              <CustomInput
                type="date"
                value={exp.endDate}
                onChange={(e) =>
                  updateItem(
                    setWorkExperiences,
                    index,
                    "endDate",
                    e.target.value
                  )
                }
                disabled={exp.currentJob}
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={exp.currentJob}
                onChange={(e) =>
                  updateItem(
                    setWorkExperiences,
                    index,
                    "currentJob",
                    e.target.checked
                  )
                }
                className="w-4 h-4 text-yellow-500 border-gray-600 focus:ring-yellow-500"
              />
              <span className="mr-2 text-gray-300">
                هنوز در این شرکت مشغولم
              </span>
            </label>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              شرح وظایف
            </label>
            <textarea
              value={exp.responsibilities}
              onChange={(e) =>
                updateItem(
                  setWorkExperiences,
                  index,
                  "responsibilities",
                  e.target.value
                )
              }
              className="w-full p-3 rounded-lg bg-[#2a2a2a] border border-[#444] focus:border-yellow-500 transition placeholder:text-gray-400"
              placeholder="شرح وظایف و مسئولیت‌ها..."
              rows="3"
            />
          </div>
        </div>
      ))}
    </section>
  );
}
