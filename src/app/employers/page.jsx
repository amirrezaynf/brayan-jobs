// app/employers/page.js
"use client";

import { useState } from "react";
import DashboardTab from "@/components/employers/DashboardTab";
import PostJobTab from "@/components/employers/PostJobTab";
import ResumesTab from "@/components/employers/ResumesTab";
import CompanyProfileTab from "@/components/employers/CompanyProfileTab";
import {
  LayoutDashboard,
  FilePlus2,
  FileText,
  Users,
  BarChart3,
  MessageCircle,
  Settings,
  CreditCard,
  Building2,
  ArrowRight,
} from "lucide-react";

export default function EmployersPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const tabs = [
    { id: "dashboard", label: "پیشخوان", icon: <LayoutDashboard size={20} /> },
    { id: "post-job", label: "ثبت آگهی جدید", icon: <FilePlus2 size={20} /> },
    { id: "resumes", label: "مدیریت رزومه‌ها", icon: <Users size={20} /> },
    { id: "company-profile", label: "پروفایل شرکت", icon: <Building2 size={20} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardTab />;
      case "post-job":
        return <PostJobTab />;
      case "my-jobs":
        return <MyJobsTab />;
      case "resumes":
        return <ResumesTab />;
      case "company-profile":
        return <CompanyProfileTab />;
      default:
        return <DashboardTab />;
    }
  };

  return (
    <div className="bg-black/90 min-h-screen text-white p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-yellow-400">
                پنل کارفرمایان
              </h1>
              <p className="text-gray-400 mt-2">
                آگهی‌های خود را مدیریت کرده و بهترین متخصصان را استخدام کنید.
              </p>
            </div>
            <a
              href="/"
              className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black rounded-lg  transition-colors"
            >
              <ArrowRight size={16} />
              بازگشت به صفحه اصلی
            </a>
          </div>
        </header>

        <div className="border-b border-gray-700 mb-8">
          <nav
            className="-mb-px flex flex-wrap gap-2 md:gap-5 overflow-x-auto scrollbar-hide"
            aria-label="Tabs"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? "border-yellow-400 text-yellow-400"
                    : "border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500"
                } flex items-center gap-1 md:gap-2 whitespace-nowrap py-3 md:py-4 px-2 md:px-3 border-b-2 font-medium text-xs md:text-sm transition-all duration-200 focus:outline-none min-w-fit`}
              >
                <span className="flex-shrink-0">{tab.icon}</span>
                <span className="text-xs sm:text-sm">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <main>{renderContent()}</main>
      </div>
    </div>
  );
}
