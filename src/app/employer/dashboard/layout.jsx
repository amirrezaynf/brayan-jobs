"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import EmployerHeader from "@/components/layout/header/EmployerHeader";
import EmployerMobileMenu from "@/components/modules/employer/EmployerMobileMenu";

// کامپوننت GlobalStyles را می‌توان در یک layout بالاتر یا همینجا قرار داد
const GlobalStyles = () => (
  <style jsx global>{`
    body {
      font-family: "Vazirmatn", sans-serif;
      background-color: #000000;
      color: #d1d5db;
      overflow-x: hidden;
    }
    input:focus,
    select:focus,
    textarea:focus {
      outline: none;
      border-color: #facc15;
      box-shadow: 0 0 0 1px #facc15;
    }
    select option {
      background-color: #1f2937;
      color: #d1d5db;
    }
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #1a1a1a;
    }
    ::-webkit-scrollbar-thumb {
      background: #4a4a4a;
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #6a6a6a;
    }
  `}</style>
);

const Sidebar = () => {
  const pathname = usePathname();
  const navItems = [
    {
      href: "/employer/dashboard",
      label: "داشبورد",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2 2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      href: "/employer/dashboard/applications",
      label: "رزومه های دریافتی",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      href: "/employer/dashboard/vacancies",
      label: "آگهی‌های من",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
      ),
    },
    {
      href: "/employer/dashboard/performance",
      label: "عملکرد استخدامی",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
          />
        </svg>
      ),
    },
    {
      href: "/employer/dashboard/wallet",
      label: "کیف پول",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      ),
    },
    {
      href: "/employer/dashboard/profile",
      label: "پروفایل سازمان",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
  ];

  return (
    <aside className="hidden lg:fixed lg:right-0 lg:top-0 lg:h-full lg:w-64 lg:bg-[#1e1e1e] lg:border-l lg:border-gray-800 lg:shadow-lg lg:p-6 lg:flex lg:flex-col lg:items-center lg:z-50">
      <div className="mb-10 text-center">
        <Link href="/" className="flex items-center justify-center">
          <svg
            className="w-10 h-10 text-yellow-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
            />
          </svg>
        </Link>
      </div>
      <nav className="space-y-4 flex flex-col items-center w-full">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center justify-start w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
              pathname === item.href
                ? "bg-yellow-400 text-gray-900 shadow-md"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
            style={{ direction: "rtl" }}
          >
            {item.icon}
            <span className="mr-3">{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

// Topbar component removed - now using EmployerHeader

export default function DashboardLayout({ children }) {
  const [activeTab, setActiveTab] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <GlobalStyles />
      <div className="flex min-h-screen bg-gray-950 text-gray-200">
        <Sidebar />
        <div className="flex-1 lg:mr-64">
          <EmployerHeader
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
          <main className="p-4 lg:p-6">{children}</main>
        </div>

        {/* Mobile Menu */}
        <EmployerMobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
    </>
  );
}
