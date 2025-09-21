import React from "react";
import { UserCircle2 } from "lucide-react";
import CustomInput from "@/components/ui/input/CustomInput";
import FileUploadZone from "@/components/ui/upload/FileUploadZone";

export default function ResumeBasicInfo({
  basicInfo,
  profileImage,
  handleBasicInfoChange,
  setProfileImage,
}) {
  return (
    <section className="border-b border-gray-800 pb-6">
      <h2 className="text-xl font-semibold text-gray-100 mb-4 flex items-center">
        <UserCircle2 className="w-6 h-6 ml-2 text-yellow-500" />
        اطلاعات پایه
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            نام
          </label>
          <CustomInput
            placeholder="نام خود را وارد کنید"
            value={basicInfo.firstName}
            onChange={(e) => handleBasicInfoChange("firstName", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            نام خانوادگی
          </label>
          <CustomInput
            placeholder="نام خانوادگی خود را وارد کنید"
            value={basicInfo.lastName}
            onChange={(e) => handleBasicInfoChange("lastName", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            شماره موبایل
          </label>
          <CustomInput
            placeholder="09123456789"
            value={basicInfo.mobile}
            onChange={(e) => handleBasicInfoChange("mobile", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            ایمیل
          </label>
          <CustomInput
            type="email"
            placeholder="example@email.com"
            value={basicInfo.email}
            onChange={(e) => handleBasicInfoChange("email", e.target.value)}
          />
        </div>
      </div>
      <div className="mt-6">
        <FileUploadZone
          label="آپلود عکس پروفایل"
          files={profileImage}
          setFiles={setProfileImage}
          multiple={false}
          acceptedTypes={["image/jpeg", "image/jpg", "image/png"]}
          maxFileSize={2 * 1024 * 1024} // 2MB for profile images
          showTypeHint={true}
        />
      </div>
    </section>
  );
}
