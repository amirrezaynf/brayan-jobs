import React from "react";
import { FileCheck } from "lucide-react";
import FileUploadZone from "@/components/ui/upload/FileUploadZone";

export default function ResumeDocuments({ documents, setDocuments }) {
  return (
    <section className="border-b border-gray-800 pb-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-100 flex items-center">
          <FileCheck className="w-6 h-6 ml-2 text-yellow-500" />
          مدارک و گواهینامه‌ها
        </h2>
       
      </div>

      <div className="space-y-4">
        {/* منطقه آپلود فایل */}
        <FileUploadZone
          label="آپلود مدارک"
          files={documents}
          setFiles={setDocuments}
          multiple={true}
        />

        {/* راهنمای فرمت فایل */}
        <div className=" border border-gray-800 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-300 mb-2">
            راهنمای آپلود فایل:
          </h4>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>• فرمت‌های مجاز: PDF, DOC, DOCX, JPG, PNG</li>
            <li>• حداکثر حجم هر فایل: 5 مگابایت</li>
            <li>• می‌توانید چندین فایل را همزمان آپلود کنید</li>
            <li>• نام فایل‌ها باید به زبان انگلیسی یا فارسی باشد</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
