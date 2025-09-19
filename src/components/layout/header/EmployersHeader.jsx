import { BellIcon, UserIcon } from "lucide-react";
import React from "react";

export default function EmployersHeader() {
  return (
    <header className="bg-black/90 backdrop-blur-sm shadow-md shadow-black/50 sticky top-0 z-30">
      <div className="container mx-auto px-4 lg:px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4 gap-2">
          <UserIcon className="text-yellow-400 h-8 w-8 lg:w-10 lg:h-10" />
          <div className="text-right block">
            <h1 className="text-lg lg:text-xl font-bold text-white">
              صفحه <span className="text-yellow-400">کارفرمایان</span>
            </h1>
            <p className="text-xs text-gray-200">برترین شرکت‌های ایرانی</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 lg:space-x-6">
          <button className="relative text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:border  focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 border border-yellow-400">
            <BellIcon className="h-5 w-5 lg:h-6 lg:w-6" />
            <span className="absolute -top-1 -right-1 block h-3 w-3 rounded-full bg-red-500 ring-2 ring-gray-900 animate-pulse"></span>
          </button>

          <div
            className="flex items-center gap-3 space-x-2 lg:space-x-4 hover:border border-gray-800 rounded-lg px-2 lg:px-3 py-2 transition-colors duration-200"
            style={{ direction: "rtl" }}
          >
            <span className="text-white text-sm lg:text-base font-medium hidden sm:block">
              مهمان
            </span>
            <div className="h-8 w-8 lg:h-10 lg:w-10 bg-yellow-400 rounded-full flex items-center justify-center text-gray-900 font-bold text-sm lg:text-lg">
              م
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
