import React from "react";

export default function KarjooHeader() {
  return (
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
          <div className="text-right block">
            <h1 className="text-lg lg:text-xl font-bold text-white">
              داشبورد <span className="text-yellow-400">کارجو</span>
            </h1>
            <p className="text-xs text-gray-200">پلتفرم کار آزاد</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 lg:space-x-6">
          <button className="relative text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:border border-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50">
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

          <div
            className="flex items-center gap-3 space-x-2 lg:space-x-4 hover:border border-gray-800 rounded-lg px-2 lg:px-3 py-2 transition-colors duration-200"
            style={{ direction: "rtl" }}
          >
            <span className="text-white text-sm lg:text-base font-medium hidden sm:block">
              علی احمدی
            </span>
            <div className="h-8 w-8 lg:h-10 lg:w-10 bg-yellow-400 rounded-full flex items-center justify-center text-gray-900 font-bold text-sm lg:text-lg">
              ع
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
