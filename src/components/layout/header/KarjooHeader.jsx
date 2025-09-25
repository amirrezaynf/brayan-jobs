"use client";

import React, { useState } from "react";
import NotificationModal from "@/components/ui/modals/NotificationModal";
import ProfileDropdown from "@/components/ui/dropdowns/ProfileDropdown";
import { useRouter } from "next/navigation";
import { logout } from "@/app/actions/auth";

export default function KarjooHeader() {
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const router = useRouter();

  const handleNotificationClick = () => {
    setIsNotificationModalOpen(true);
  };

  const handleCloseNotificationModal = () => {
    setIsNotificationModalOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (_) {}
    try {
      document.cookie = "auth_user=; path=/; max-age=0";
      document.cookie = "auth_token=; path=/; max-age=0";
    } catch (_) {}
    router.push("/auth");
  };

  return (
    <>
      <header className=" backdrop-blur-sm shadow-md shadow-black/50 sticky top-0 z-30">
        <div className="container mx-auto px-4 lg:px-6 py-4 flex justify-between items-center">
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
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
            <div className="text-right block md:mr-0 mr-5">
              <h1 className="text-lg lg:text-xl font-bold text-white">
                داشبورد <span className="text-yellow-400">کارجو</span>
              </h1>
              <p className="text-xs text-gray-200">پلتفرم کار آزاد</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 lg:space-x-6">
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

            <ProfileDropdown />

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="bg-red-500/80 hover:bg-red-500 text-white px-3 py-1.5 rounded-lg transition duration-300 text-sm"
            >
              خروج
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
