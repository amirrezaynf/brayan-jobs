"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Import Select Components
import CustomSelect from "@/components/ui/select/CustomSelect";

// Import components as needed
import SalaryRangeSlider from "@/components/ui/range/SalaryRangeInput";

// Sample advertisement data (normally would come from API)
const sampleAdvertisements = [
  {
    id: 1,
    title: "آگهی استخدام توسعه‌دهنده React",
    company: "شرکت فناوری اطلاعات پارامکس",
    location: "تهران",
    description: "جستجوی توسعه‌دهنده React باتجربه برای پروژه‌های بزرگ",
    category: "فناوری اطلاعات",
    specialization: "برنامه‌نویسی وب",
    type: "تمام وقت",
    salary: "۱۵,۰۰۰,۰۰۰ تومان",
    applicants: 12,
    date: "۱۴۰۳/۰۶/۲۰",
    urgent: true,
  },
  {
    id: 2,
    title: "طراح UI/UX برای اپلیکیشن موبایل",
    company: "استارتاپ تهیکس",
    location: "اصفهان",
    description: "طراحی رابط کاربری جذاب برای اپلیکیشن‌های موبایل",
    category: "طراحی و گرافیک",
    specialization: "طراحی UI/UX",
    type: "پاره وقت",
    salary: "۸,۰۰۰,۰۰۰ تومان",
    applicants: 8,
    date: "۱۴۰۳/۰۶/۱۹",
    urgent: false,
  },
  {
    id: 3,
    title: "مدیر محصول دیجیتال",
    company: "شرکت بازرگانی پارسه",
    location: "مشهد",
    description: "مدیریت محصول برای پلتفرم‌های دیجیتال B2B",
    category: "مدیریت پروژه",
    specialization: "مدیریت محصول",
    type: "تمام وقت",
    salary: "۱۸,۰۰۰,۰۰۰ تومان",
    applicants: 5,
    date: "۱۴۰۳/۰۶/۱۸",
    urgent: true,
  },
  {
    id: 4,
    title: "کارشناس سئو و بازاریابی دیجیتال",
    company: "آژانس تبلیغات مدیا",
    location: "شیراز",
    description:
      "بهینه‌سازی وب‌سایت‌ها و پیاده‌سازی استراتژی‌های بازاریابی دیجیتال",
    category: "بازاریابی و فروش",
    specialization: "SEO/SEM",
    type: "تمام وقت",
    salary: "۱۲,۰۰۰,۰۰۰ تومان",
    applicants: 15,
    date: "۱۴۰۳/۰۶/۱۷",
    urgent: false,
  },
  {
    id: 5,
    title: "توسعه‌دهنده Node.js - Backend",
    company: "شرکت نرم‌افزاری آپادانا",
    location: "کرج",
    description: "توسعه سرویس‌های سمت سرور با استفاده از Node.js",
    category: "فناوری اطلاعات",
    specialization: "پایگاه داده",
    type: "تمام وقت",
    salary: "۱۶,۰۰۰,۰۰۰ تومان",
    applicants: 9,
    date: "۱۴۰۳/۰۶/۱۶",
    urgent: false,
  },
  {
    id: 6,
    title: "کارشناس منابع انسانی",
    company: "شرکت صنعتی بهین",
    location: "تبریز",
    description: "مدیریت فرآیندهای استخدامی و روابط کارکنان",
    category: "منابع انسانی",
    specialization: "استخدام و گزینش",
    type: "تمام وقت",
    salary: "۱۱,۰۰۰,۰۰۰ تومان",
    applicants: 22,
    date: "۱۴۰۳/۰۶/۱۵",
    urgent: true,
  },
];

export default function AdvertisementsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [ads, setAds] = useState([]);
  const [filteredAds, setFilteredAds] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [salaryRange, setSalaryRange] = useState([5000000, 50000000]); // Default salary range

  // Get search parameters
  const userType = searchParams.get("userType");
  const jobCategory = searchParams.get("jobCategory");
  const specialization = searchParams.get("specialization");
  const country = searchParams.get("country");
  const province = searchParams.get("province");
  const city = searchParams.get("city");

  useEffect(() => {
    // In a real app, this would be an API call with the search parameters
    // For now, we'll use the sample data
    let filtered = [...sampleAdvertisements];

    // Filter by category if specified
    if (jobCategory) {
      filtered = filtered.filter((ad) => ad.category === jobCategory);
    }

    // Filter by specialization if specified
    if (specialization) {
      filtered = filtered.filter((ad) => ad.specialization === specialization);
    }

    setFilteredAds(filtered);
  }, [jobCategory, specialization]);

  // Apply basic filters
  useEffect(() => {
    let result = [...filteredAds];

    // Text search
    if (searchFilter) {
      result = result.filter(
        (ad) =>
          ad.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
          ad.company.toLowerCase().includes(searchFilter.toLowerCase()) ||
          ad.description.toLowerCase().includes(searchFilter.toLowerCase())
      );
    }

    // Category filter
    const activeCategory =
      jobCategory ||
      (selectedCategory && selectedCategory !== "همه"
        ? selectedCategory
        : null);
    if (activeCategory) {
      result = result.filter((ad) => ad.category === activeCategory);
    }

    // Salary range filter
    result = result.filter((ad) => {
      // Parse the Persian salary string to numbers
      // Extract only Persian digits (۱۲۳۴۵۶۷۸۹۰)
      const persianDigits = ad.salary.match(/[\u06F0-\u06F9]/g);
      if (!persianDigits) return salaryRange[0] <= 0; // Show all if no digits found

      // Convert Persian digits to English digits
      const englishDigits = persianDigits
        .map((digit) => {
          const charCode = digit.charCodeAt(0);
          const baseCharCode = "\u06F0".charCodeAt(0);
          return String(charCode - baseCharCode);
        })
        .join("");

      const salaryNum = parseInt(englishDigits, 10);

      return salaryNum >= salaryRange[0] && salaryNum <= salaryRange[1];
    });

    // Sort
    if (sortBy === "newest") {
      result.sort((a, b) => {
        if (a.urgent && !b.urgent) return -1;
        if (!a.urgent && b.urgent) return 1;
        return new Date(b.date) - new Date(a.date);
      });
    } else if (sortBy === "oldest") {
      result.sort((a, b) => {
        if (a.urgent && !b.urgent) return -1;
        if (!a.urgent && b.urgent) return 1;
        return new Date(a.date) - new Date(b.date);
      });
    } else if (sortBy === "most-applied") {
      result.sort((a, b) => {
        if (a.urgent && !b.urgent) return -1;
        if (!a.urgent && b.urgent) return 1;
        return b.applicants - a.applicants;
      });
    }

    setAds(result);
  }, [
    filteredAds,
    searchFilter,
    selectedCategory,
    sortBy,
    salaryRange,
    jobCategory,
  ]);

  const handleViewAd = (adId) => {
    router.push(`/ad/${adId}`);
  };

  const categories = [
    "همه",
    "فناوری اطلاعات",
    "طراحی و گرافیک",
    "بازاریابی و فروش",
    "مدیریت پروژه",
    "منابع انسانی",
  ];

  return (
    <div className="min-h-screen dark-bg py-8" dir="rtl">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            نتایج جستجو آگهی‌ها
          </h1>
          <p className="text-gray-400">
            {ads.length} آگهی پیدا شد
            {jobCategory && ` در دسته ${jobCategory}`}
          </p>
        </div>

        {/* Search and Sort Bar */}
        <div className="bg-[#2a2a2a] rounded-xl p-6 mb-8 border border-gray-700">
          <div>
            {/* Main Search Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <input
                  type="text"
                  placeholder="جستجو در عنوان، شرکت یا توضیحات..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="flex-1 bg-[#2a2a2a] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="newest">جدیدترین</option>
                  <option value="oldest">قدیمی‌ترین</option>
                  <option value="most-applied">بیشترین متقاضی</option>
                </select>
                <button
                  onClick={() => {
                    setSearchFilter("");
                    setSelectedCategory("");
                    setSortBy("newest");
                    setSalaryRange([5000000, 50000000]);
                  }}
                  className="bg-[#2a2a2a] hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition-colors duration-200 border border-gray-600"
                >
                  پاک کردن
                </button>
              </div>
            </div>

            {/* Salary Range Slider - Now Below */}
            <div className="border-t border-gray-600 pt-6">
              <SalaryRangeSlider
                value={salaryRange}
                onChange={setSalaryRange}
                min={1000000}
                max={100000000}
              />
            </div>
          </div>
        </div>

        {/* Main Content - Results */}
        <div className="w-full">
          {ads.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ads.map((ad) => (
                <div
                  key={ad.id}
                  className="bg-[#2a2a2a] rounded-xl p-4 border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 relative overflow-hidden shadow-lg min-h-[240px] flex flex-col"
                >
                  {ad.urgent && (
                    <span className="absolute top-2 left-2 bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded-full whitespace-nowrap z-10">
                      فوری
                    </span>
                  )}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          className="text-yellow-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                          />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-bold text-white truncate mb-1">
                          {ad.title}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-gray-400 mb-2">
                          <span className="flex items-center gap-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                              <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            {ad.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                              <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            {ad.applicants}
                          </span>
                        </div>
                        <p className="text-xs md:text-sm text-gray-300 line-clamp-2 mb-3">
                          {ad.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">
                            {ad.company}
                          </span>
                          <span className="text-sm text-gray-500">
                            {ad.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
                    <div className="flex items-center gap-2">
                      <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded-full font-medium">
                        {ad.category}
                      </span>
                      <span className="text-sm text-gray-400">{ad.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400 font-bold">
                        {ad.salary}
                      </span>
                      <button
                        onClick={() => handleViewAd(ad.id)}
                        className="bg-yellow-500 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-sm"
                      >
                        مشاهده
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <svg
                className="w-16 h-16 text-gray-600 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                هیچ آگهی‌ای یافت نشد
              </h3>
              <p className="text-gray-500 mb-6">
                هیچ آگهی‌ای با معیارهای جستجوی شما مطابقت ندارد. فیلترها را
                تغییر دهید.
              </p>
              <button
                onClick={() => router.push("/")}
                className="bg-yellow-500 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                بازگشت به صفحه اصلی
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
