"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import NotificationModal from "@/components/ui/modals/NotificationModal";
import { COMPANY_DATA, loadCompanyData } from "@/constants/companyData";

export default function EmployerHeader({
  activeTab,
  setActiveTab,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) {
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [companyData, setCompanyData] = useState(COMPANY_DATA);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const loadedData = loadCompanyData();
    setCompanyData(loadedData);

    // Listen for company data changes
    const handleDataChange = (event) => {
      setCompanyData(event.detail);
    };

    window.addEventListener("companyDataChanged", handleDataChange);

    return () => {
      window.removeEventListener("companyDataChanged", handleDataChange);
    };
  }, []);

  // Use default data for server-side rendering to avoid hydration mismatch
  const displayData = isClient ? companyData : COMPANY_DATA;

  // Get the display name based on user preference
  const displayName = isClient
    ? displayData.displayNamePreference === "english" &&
      displayData.companyNameEn &&
      displayData.companyNameEn.trim()
      ? displayData.companyNameEn
      : displayData.companyName || "پروفایل شرکت"
    : COMPANY_DATA.companyName;

  const handleNotificationClick = () => {
    setIsNotificationModalOpen(true);
  };

  const handleCloseNotificationModal = () => {
    setIsNotificationModalOpen(false);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen && setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="backdrop-blur-sm shadow-md shadow-black/50 sticky top-0 z-30 bg-black/80">
        <div className="container mx-auto px-4 lg:px-6 py-4 flex justify-between items-center">
          {/* Left side - Logo and Title */}
          <div className="flex items-center space-x-4">
            <svg
              className="w-8 h-8 lg:w-10 lg:h-10 text-yellow-400"
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
            <div className="text-right block md:mr-0 mr-5">
              <h1 className="text-lg lg:text-xl font-bold text-white">
                داشبورد <span className="text-yellow-400">کارفرما</span>
              </h1>
              <p className="text-xs text-gray-200">پلتفرم استخدام</p>
            </div>
          </div>

          {/* Right side - Actions and Profile */}
          <div className="flex items-center space-x-4 lg:space-x-6">
            {/* Mobile Menu Button */}
            <button
              onClick={handleMobileMenuToggle}
              className="lg:hidden text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-gray-800"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Create Job Button */}
            <button
              onClick={() => {
                // Navigate to vacancies page and trigger form
                if (typeof window !== "undefined") {
                  window.location.href = "/employer/dashboard/vacancies?create=true";
                }
              }}
              className="hidden md:flex bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-300 transition duration-300 font-bold items-center text-sm lg:text-base"
            >
              <span className="ml-2">ثبت آگهی</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 lg:h-5 lg:w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Notifications */}
            <button
              onClick={handleNotificationClick}
              className="relative text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:border border-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 lg:h-6 lg:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute -top-1 -right-1 block h-3 w-3 rounded-full bg-red-500 ring-2 ring-gray-900 animate-pulse"></span>
            </button>

            {/* Company Profile */}
            <button
              onClick={() => setActiveTab && setActiveTab("profile")}
              className="flex items-center hover:bg-gray-800 rounded-lg px-3 py-2 transition-colors duration-200"
              style={{ direction: "rtl" }}
            >
              <span className="text-white pl-2 lg:pl-4 font-medium text-sm lg:text-base hidden sm:block">
                {displayName}
              </span>
              <div className="h-8 w-8 lg:h-10 lg:w-10 bg-yellow-400 rounded-full flex items-center justify-center text-gray-900 font-bold text-sm lg:text-lg overflow-hidden">
                {displayData.companyLogo ? (
                  <Image
                    src={displayData.companyLogo}
                    alt="Company Logo"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  displayName.charAt(0)
                )}
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Notification Modal */}
      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={handleCloseNotificationModal}
      />
    </>
  );
}
