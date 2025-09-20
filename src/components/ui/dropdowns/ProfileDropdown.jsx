"use client";

import React, { useState, useRef, useEffect } from "react";
import { User, LogOut, Settings, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  // بستن dropdown وقتی خارج از آن کلیک می‌شود
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    setIsOpen(false);
    router.push("/karjoo/profile");
  };

  const handleLogout = () => {
    setIsOpen(false);
    // اینجا می‌توانید logout logic اضافه کنید
    // مثال: router.push("/auth");
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-3 space-x-2 lg:space-x-4 hover:bg-gray-800/30 border border-transparent hover:border-gray-700 rounded-lg px-2 lg:px-3 py-2 transition-all duration-200 group"
        style={{ direction: "rtl" }}
      >
        <span className="text-white text-sm lg:text-base font-medium hidden sm:block">
          علی احمدی
        </span>
        <div className="h-8 w-8 lg:h-10 lg:w-10 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            alt="علی احمدی"
            className="w-full h-full object-cover"
          />
        </div>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-black/90 backdrop-blur-md rounded-xl shadow-2xl border border-gray-700/50 py-2 z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-700/50">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="علی احمدی"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-white font-medium text-sm">علی احمدی</p>
                <p className="text-gray-400 text-xs">کارجوی حرفه‌ای</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <button
              onClick={handleProfileClick}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors text-right"
            >
              <User className="w-4 h-4" />
              پروفایل من
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-right"
            >
              <LogOut className="w-4 h-4" />
              خروج از حساب کاربری
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
