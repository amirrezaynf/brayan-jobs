// app/employers/page.js
"use client";

import { useState } from 'react';
import DashboardTab from '@/components/employers/DashboardTab';
import PostJobTab from '@/components/employers/PostJobTab';
import MyJobsTab from '@/components/employers/MyJobsTab';
import ResumesTab from '@/components/employers/ResumesTab';
import { LayoutDashboard, FilePlus2, FileText, Users } from 'lucide-react';

export default function EmployersPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'پیشخوان', icon: <LayoutDashboard size={20} /> },
    { id: 'post-job', label: 'ثبت آگهی جدید', icon: <FilePlus2 size={20} /> },
    { id: 'my-jobs', label: 'آگهی‌های من', icon: <FileText size={20} /> },
    { id: 'resumes', label: 'مدیریت رزومه‌ها', icon: <Users size={20} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab />;
      case 'post-job':
        return <PostJobTab />;
      case 'my-jobs':
        return <MyJobsTab />;
      case 'resumes':
        return <ResumesTab />;
      default:
        return <DashboardTab />;
    }
  };

  return (
    <div className="bg-black/90 min-h-screen text-white p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-400">پنل کارفرمایان</h1>
          <p className="text-gray-400 mt-2">آگهی‌های خود را مدیریت کرده و بهترین متخصصان را استخدام کنید.</p>
        </header>

        <div className="border-b border-gray-700 mb-8">
          <nav className="-mb-px flex gap-5 space-x-4 rtl:space-x-reverse" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'border-yellow-400 text-yellow-400'
                    : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'
                } flex items-center gap-2 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 focus:outline-none`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <main>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}