import React from "react";
import { Briefcase } from "lucide-react";
import CustomInput from "@/components/ui/input/CustomInput";

export default function ResumeJobInfo({ jobInfo, handleJobInfoChange }) {
  return (
    <section className="border-b border-gray-800 pb-6">
      <h2 className="text-xl font-semibold text-gray-100 mb-4 flex items-center">
        <Briefcase className="w-6 h-6 ml-2 text-yellow-500" />
        اطلاعات شغلی
      </h2>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-400 mb-2">
          عنوان شغلی
        </label>
        <CustomInput
          placeholder="مثال: توسعه‌دهنده فرانت‌اند"
          value={jobInfo.jobTitle}
          onChange={(e) => handleJobInfoChange("jobTitle", e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={jobInfo.showSalary}
            onChange={(e) =>
              handleJobInfoChange("showSalary", e.target.checked)
            }
            className="sr-only peer"
          />
          <div className="relative w-12 h-6 rounded-full bg-gray-600 peer-checked:bg-yellow-500 transition-colors">
            <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
          </div>
          <span className="mr-3 text-gray-300">نمایش حقوق درخواستی</span>
        </label>
      </div>

      {jobInfo.showSalary && (
        <div className="space-y-4 p-4 border-gray-800 border rounded-lg">
          <div className="flex gap-6">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="salaryType"
                value="agreement"
                checked={jobInfo.salaryType === "agreement"}
                onChange={(e) =>
                  handleJobInfoChange("salaryType", e.target.value)
                }
                className="w-4 h-4 text-yellow-500 border-gray-600 focus:ring-yellow-500"
              />
              <span className="mr-2 text-gray-300">توافقی</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="salaryType"
                value="amount"
                checked={jobInfo.salaryType === "amount"}
                onChange={(e) =>
                  handleJobInfoChange("salaryType", e.target.value)
                }
                className="w-4 h-4 text-yellow-500 border-gray-600 focus:ring-yellow-500"
              />
              <span className="mr-2 text-gray-300">درج مبلغ</span>
            </label>
          </div>
          {jobInfo.salaryType === "amount" && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                مبلغ حقوق درخواستی (تومان)
              </label>
              <CustomInput
                placeholder="مثال: 15000000"
                value={jobInfo.salaryAmount}
                onChange={(e) =>
                  handleJobInfoChange("salaryAmount", e.target.value)
                }
              />
            </div>
          )}
        </div>
      )}
    </section>
  );
}
