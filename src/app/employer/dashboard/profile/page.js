"use client";
import React, { useState } from "react";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    companyName: "اسم سازمان",
    website: "https://example.com",
    description: "توضیحاتی در مورد فعالیت‌ها، فرهنگ و چشم‌انداز سازمان شما.",
    logo: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-gray-900 rounded-xl p-8 shadow-lg border border-gray-800 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-8">پروفایل سازمان</h1>

      <form className="space-y-6 text-right">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            نام سازمان
          </label>
          <input
            type="text"
            name="companyName"
            value={profile.companyName}
            onChange={handleInputChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            وبسایت
          </label>
          <input
            type="url"
            name="website"
            value={profile.website}
            onChange={handleInputChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white"
            style={{ direction: "ltr", textAlign: "left" }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            توضیحات سازمان
          </label>
          <textarea
            name="description"
            rows="5"
            value={profile.description}
            onChange={handleInputChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            لوگو سازمان
          </label>
          <div className="mt-1 flex items-center">
            <span className="inline-block h-16 w-16 rounded-full overflow-hidden bg-gray-800 border border-gray-700">
              {/* Placeholder for logo */}
              <svg
                className="h-full w-full text-gray-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 20.993V24H0v-2.997A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </span>
            <button
              type="button"
              className="mr-5 bg-gray-800 py-2 px-3 border border-gray-700 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700"
            >
              تغییر
            </button>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-yellow-400 text-gray-900 font-bold px-6 py-3 rounded-lg hover:bg-yellow-300"
            >
              ذخیره تغییرات
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
