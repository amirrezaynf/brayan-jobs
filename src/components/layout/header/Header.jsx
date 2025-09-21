"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

// Helper component for Icons
const LogoIcon = () => (
  <svg
    className="w-10 h-10 gold-text"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    ></path>
  </svg>
);
const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6  text-gray-300"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16m-7 6h7"
    />
  </svg>
);
const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-gray-300"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="dark-bg shadow-lg shadow-black/20 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4 flex flex-row-reverse justify-end lg:flex-row lg:justify-between  items-center">
          <div className="flex  items-center space-x-4 space-x-reverse">
            <Link href="/">
              <Image src="/picture/karyabilogo.png" width={40} height={40} className="w-full h-full" />
            </Link>
            <div className="flex flex-col mr-4  items-center ">
              <h1 className="text-lg font-bold text-white">
                پلتفرم استخدامی{" "}
                <span className="gold-text">دکتر برایان اعتماد</span>
              </h1>
              <span className=" text-sm relative left-3 text-gray-300">
                جایی که استعداد ایرانی شکوفا می‌شود.
              </span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center space-x-8  font-medium">
            <Link href="#" className="header-link text-gray-300">
              بهترین آگهی‌ها
            </Link>
            <Link href="#" className="header-link text-gray-300">
              جستجوی آگهی
            </Link>
          </nav>

          <div className="hidden lg:flex items-center space-x-4 ">
            <div className="flex items-center space-x-4 ">
              <Link
                href="/employer"
                className="text-gray-300 hover:gold-text  transition"
              >
                بخش کارفرمایان
              </Link>
              <Link
                href="/auth"
                className="px-5 py-2 rounded-lg gold-bg text-black  hover:opacity-90 transition duration-300"
              >
                ورود / ثبت نام
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden ">
            <button  onClick={() => setIsMenuOpen(true)}>
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-50 lg   :hidden"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div
            className="mobile-menu absolute top-0 right-0 h-full w-2/3 max-w-xs dark-bg shadow-lg p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-lg font-bold gold-text">منو</h2>
              <button onClick={() => setIsMenuOpen(false)}>
                <XIcon />
              </button>
            </div>
            <nav className="flex flex-col space-y-6 text-lg items-start">
            
              <Link href="#" className="header-link text-gray-300 w-full pb-2">
                بهترین آگهی‌ها
              </Link>
              <Link href="#" className="header-link text-gray-300 w-full pb-2">
                جستجوی آگهی
              </Link>
              <Link href="/employer" className="header-link text-gray-300 w-full pb-2">
                بخش کارفرمایان
              </Link>
              <Link
                href="/auth"
                className="mt-4 w-full text-center px-5 py-2 rounded-lg gold-bg text-black font-semibold hover:opacity-90 transition duration-300"
              >
                ورود / ثبت نام
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
