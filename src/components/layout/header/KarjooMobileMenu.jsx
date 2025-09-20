import React from "react";
import Link from "next/link";

export default function KarjooMobileMenu({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  activeTab,
  setActiveTab,
  menuItems,
}) {
  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 right-4 z-[60] lg:hidden hover:bg-yellow-400 hover:text-gray-900 bg-[#2a2a2a] text-white p-3 rounded-lg border border-gray-700 transition-colors duration-200"
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
            d={
              isMobileMenuOpen
                ? "M6 18L18 6M6 6l12 12"
                : "M4 6h16M4 12h16M4 18h16"
            }
          />
        </svg>
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed right-0 top-0 h-full w-64 bg-black/20 backdrop-blur-sm border-l border-gray-800 shadow-2xl p-6 flex flex-col items-center z-50 transform transition-transform duration-300 ease-in-out lg:transform-none lg:bg-transparent lg:backdrop-blur-none ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "translate-x-full lg:translate-x-0"
        }`}
      >
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
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </Link>
        </div>

        <nav className=" space-y-4 flex flex-col items-center w-full">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`flex items-center w-full px-4 py-3 rounded-lg text-right transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 ${
                activeTab === item.id
                  ? "bg-yellow-400 text-gray-900 shadow-md"
                  : "text-gray-400 hover:border border-gray-800 hover:text-white"
              }`}
            >
              <Link href={item.link ? item.link : "/karjoo"} className=" flex gap-3">
              {item.icon}
                {item.label}
              </Link>
            </button>
          ))}
        </nav>

        {/* Contact Support */}
        <div className="mt-auto w-full text-center">
          <button className="flex items-center justify-center w-full px-4 py-3 rounded-lg border border-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50">
            <span className="ml-2">پشتیبانی</span>
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
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
      </aside>
    </>
  );
}
