"use client";

import { useState } from "react";
import ResumeHeader from "./ResumeHeader";
import ResumeBasicInfo from "./ResumeBasicInfo";
import ResumeResidence from "./ResumeResidence";
import ResumeJobInfo from "./ResumeJobInfo";
import ResumeWorkExperience from "./ResumeWorkExperience";
import ResumeSkills from "./ResumeSkills";
import ResumeLanguages from "./ResumeLanguages";
import { Send } from "lucide-react";

export default function ResumeContainer() {
  // اطلاعات پایه
  const [basicInfo, setBasicInfo] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
  });
  const [profileImage, setProfileImage] = useState([]);

  // محل سکونت
  const [residence, setResidence] = useState({
    province: "",
    city: "",
    address: "",
  });

  // اطلاعات شغلی
  const [jobInfo, setJobInfo] = useState({
    jobTitle: "",
    showSalary: false,
    salaryType: "agreement", // "agreement" or "amount"
    salaryAmount: "",
  });

  // سوابق کاری
  const [workExperiences, setWorkExperiences] = useState([
    {
      companyName: "",
      position: "",
      startDate: "",
      endDate: "",
      currentJob: false,
      responsibilities: "",
    },
  ]);

  // مهارت‌ها
  const [skills, setSkills] = useState([{ skillName: "", proficiency: "" }]);

  // زبان‌های خارجی
  const [languages, setLanguages] = useState([
    { language: "", proficiency: "" },
  ]);

  // مدارک و گواهینامه‌ها
  const [certificates, setCertificates] = useState([
    {
      title: "",
      issuer: "",
      certificateNumber: "",
      link: "",
      issueDate: "",
      expiryDate: "",
      noExpiry: false,
      description: "",
    },
  ]);

  // نمونه کار
  const [portfolioFiles, setPortfolioFiles] = useState([]);
  const [portfolioLink, setPortfolioLink] = useState("");

  // هندلرها
  const handleBasicInfoChange = (field, value) => {
    setBasicInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleResidenceChange = (field, value) => {
    setResidence((prev) => ({ ...prev, [field]: value }));
    if (field === "province") {
      setResidence((prev) => ({ ...prev, city: "" }));
    }
  };

  const handleJobInfoChange = (field, value) => {
    setJobInfo((prev) => ({ ...prev, [field]: value }));
  };

  // توابع عمومی برای مدیریت آرایه‌ها
  const addItem = (setter, newItem) => setter((prev) => [...prev, newItem]);
  const removeItem = (setter, index) =>
    setter((prev) => prev.filter((_, i) => i !== index));
  const updateItem = (setter, index, field, value) => {
    setter((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      // منطق‌های خاص برای چک‌باکس‌ها
      if (field === "currentJob" && value) updated[index].endDate = "";
      if (field === "noExpiry" && value) updated[index].expiryDate = "";
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const resumeData = {
      basicInfo,
      profileImage,
      residence,
      jobInfo,
      workExperiences,
      skills,
      languages,
      certificates,
      portfolioFiles,
      portfolioLink,
    };
    console.log("Resume Data:", resumeData);
    alert("رزومه شما با موفقیت ارسال شد! (اطلاعات در کنسول نمایش داده شده)");
  };

  return (
    <div className="text-gray-200 font-['Vazirmatn'] min-h-screen" dir="rtl">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto border border-gray-700 rounded-xl shadow-lg shadow-yellow-500/10 overflow-hidden">
          <div className="px-6 py-8 sm:px-10">
            {/* Header */}
            <ResumeHeader />

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* اطلاعات پایه */}
              <ResumeBasicInfo
                basicInfo={basicInfo}
                profileImage={profileImage}
                handleBasicInfoChange={handleBasicInfoChange}
                setProfileImage={setProfileImage}
              />

              {/* محل سکونت */}
              <ResumeResidence
                residence={residence}
                handleResidenceChange={handleResidenceChange}
              />

              {/* اطلاعات شغلی */}
              <ResumeJobInfo
                jobInfo={jobInfo}
                handleJobInfoChange={handleJobInfoChange}
              />

              {/* سوابق کاری */}
              <ResumeWorkExperience
                workExperiences={workExperiences}
                addItem={addItem}
                removeItem={removeItem}
                updateItem={updateItem}
                setWorkExperiences={setWorkExperiences}
              />

              {/* مهارت‌ها */}
              <ResumeSkills
                skills={skills}
                addItem={addItem}
                removeItem={removeItem}
                updateItem={updateItem}
                setSkills={setSkills}
              />

              {/* زبان‌های خارجی */}
              <ResumeLanguages
                languages={languages}
                addItem={addItem}
                removeItem={removeItem}
                updateItem={updateItem}
                setLanguages={setLanguages}
              />

              {/* دکمه ارسال */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full flex justify-center items-center bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-yellow-400 transition-transform transform hover:scale-105"
                >
                  <Send className="w-5 h-5 ml-2" />
                  ارسال رزومه
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
