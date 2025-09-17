"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { COMPANY_DATA } from "@/constants/companyData";

// Function to get all company data from constants
const getCompanyData = () => {
  const data = { ...COMPANY_DATA };

  // Calculate employee count from company size
  let employeeCount = "کمتر از 50 نفر";
  if (data.companySize === "1-10") employeeCount = "1-10 نفر";
  else if (data.companySize === "11-50") employeeCount = "11-50 نفر";
  else if (data.companySize === "51-100") employeeCount = "51-100 نفر";
  else if (data.companySize === "101-500") employeeCount = "101-500 نفر";
  else if (data.companySize === "500+") employeeCount = "بیش از 500 نفر";

  // Map industry type to Persian
  const industryMap = {
    technology: "فناوری اطلاعات",
    manufacturing: "تولیدی",
    service: "خدماتی",
    finance: "مالی و بانکی",
    healthcare: "بهداشت و درمان",
    education: "آموزشی",
    retail: "خرده فروشی",
    construction: "ساخت و ساز",
  };

  return {
    id: 9, // Company ID for employer listing
    ...data,
    name: data.companyName,
    companyName: data.companyName,
    logo: "DB",
    industry: industryMap[data.industryType] || "فناوری اطلاعات",
    location: data.city,
    description: data.description,
    employeeCount,
    openPositions: 3,
    website: data.website,
    foundedYear: parseInt(data.establishedYear),
    rating: 4.9,
    reviews: 215,
    benefits: data.benefits,
    isVerified: true,
    address: data.address,
    phone: data.phone,
    mobile: data.mobile,
    email: data.email,
    linkedin: data.linkedin,
    instagram: data.instagram,
  };
};

// Employer data from company profile
const employers = [getCompanyData()];

const industries = [
  "همه حوزه‌ها",
  "فناوری اطلاعات",
  "فروشگاهی",
  "بانکی و مالی",
  "آموزشی",
  "بهداشتی",
  "ساختمانی",
  "تولیدی",
  "خدمات",
];

const locations = [
  "همه شهرها",
  "تهران",
  "اصفهان",
  "مشهد",
  "شیراز",
  "تبریز",
  "کرج",
];

// Helper components
const StarIcon = ({ filled = false }) => (
  <svg
    className={`w-4 h-4 ${filled ? "text-yellow-400" : "text-gray-600"}`}
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    />
  </svg>
);

const VerifiedIcon = () => (
  <svg
    className="w-5 h-5 text-blue-400"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const LocationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="ml-1"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const BuildingIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="ml-1"
  >
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
    <rect x="9" y="22" width="6" height="0"></rect>
    <line x1="9" y1="22" x2="9" y2="18"></line>
    <line x1="15" y1="22" x2="15" y2="18"></line>
    <line x1="10" y1="6" x2="14" y2="6"></line>
    <line x1="10" y1="10" x2="14" y2="10"></line>
    <line x1="10" y1="14" x2="14" y2="14"></line>
  </svg>
);

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="ml-1"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const BriefcaseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="ml-1"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
  </svg>
);

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const FilterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
  </svg>
);

export default function EmployersPage() {
  const [currentEmployers, setCurrentEmployers] = useState(employers);
  const [filteredEmployers, setFilteredEmployers] = useState(employers);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("همه حوزه‌ها");
  const [selectedLocation, setSelectedLocation] = useState("همه شهرها");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    filterEmployers();
  }, [searchQuery, selectedIndustry, selectedLocation]);

  const filterEmployers = () => {
    let filtered = currentEmployers;

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (employer) =>
          employer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          employer.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
          employer.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Industry filter
    if (selectedIndustry !== "همه حوزه‌ها") {
      filtered = filtered.filter((employer) =>
        employer.industry.includes(selectedIndustry.replace("همه حوزه‌ها", ""))
      );
    }

    // Location filter
    if (selectedLocation !== "همه شهرها") {
      filtered = filtered.filter(
        (employer) => employer.location === selectedLocation
      );
    }

    setFilteredEmployers(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleIndustryChange = (e) => {
    setSelectedIndustry(e.target.value);
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<StarIcon key={i} filled={true} />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<StarIcon key={i} filled={false} />);
      } else {
        stars.push(<StarIcon key={i} filled={false} />);
      }
    }
    return stars;
  };

  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white font-sans" dir="rtl">
      {/* Header */}
      <header className="bg-[#1a1a1a] shadow-lg shadow-black/20 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4 space-x-reverse">
            <Link href="/" className="flex items-center">
              <svg
                className="w-8 h-8 text-yellow-400"
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
              <span className="text-white font-bold text-lg mr-3">
                دکتر برایان اعتماد
              </span>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center space-x-8 space-x-reverse">
            <Link href="/" className="hover:text-yellow-400 transition-colors">
              صفحه اصلی
            </Link>
            <Link
              href="/resume"
              className="hover:text-yellow-400 transition-colors"
            >
              ثبت رزومه
            </Link>
            <Link
              href="/employer"
              className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-300 transition-colors"
            >
              بخش کارفرمایان
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-blue-900/40"></div>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-20 container mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500">
            برترین کارفرمایان ایران
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-300 leading-relaxed">
            کشف کنید بهترین شرکت‌ها و سازمان‌های ایرانی را که به دنبال
            استعدادهای برتر هستند. با هزاران موقعیت شغلی در انتظار شما!
          </p>
          <div className="mt-8 flex justify-center items-center gap-4 text-gray-400">
            <div className="flex items-center gap-2">
              <BuildingIcon />
              <span>{currentEmployers.length}+ شرکت ثبت شده</span>
            </div>
            <div className="flex items-center gap-2">
              <BriefcaseIcon />
              <span>
                {currentEmployers.reduce(
                  (acc, emp) => acc + emp.openPositions,
                  0
                )}
                + موقعیت شغلی
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 bg-[#1a1a1a]">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Main Search */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="جستجوی نام شرکت، حوزه فعالیت یا..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full p-4 pr-12 bg-[#2a2a2a] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-yellow-500 transition"
                />
                <SearchIcon className="absolute right-4 top-4 text-gray-400" />
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-6 py-4 bg-[#2a2a2a] border border-gray-600 rounded-lg text-white hover:border-yellow-500 transition flex items-center gap-2"
              >
                <FilterIcon />
                فیلترها
              </button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-6 bg-[#2a2a2a] rounded-lg border border-gray-600">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    حوزه فعالیت
                  </label>
                  <select
                    value={selectedIndustry}
                    onChange={handleIndustryChange}
                    className="w-full p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:ring-yellow-500"
                  >
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    شهر
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={handleLocationChange}
                    className="w-full p-3 bg-[#1a1a1a] border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:ring-yellow-500"
                  >
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedIndustry("همه حوزه‌ها");
                      setSelectedLocation("همه شهرها");
                    }}
                    className="w-full px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition"
                  >
                    پاک کردن فیلترها
                  </button>
                </div>
              </div>
            )}

            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-400">
                نمایش {filteredEmployers.length} از {currentEmployers.length}{" "}
                شرکت
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>مرتب‌سازی:</span>
                <select className="bg-[#2a2a2a] border border-gray-600 rounded px-3 py-1 text-white">
                  <option>جدیدترین</option>
                  <option>بیشترین موقعیت شغلی</option>
                  <option>بالاترین امتیاز</option>
                  <option>حروف الفبا</option>
                </select>
              </div>
            </div>

            {/* Employers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEmployers.map((employer) => (
                <div
                  key={employer.id}
                  className="bg-[#2a2a2a] border border-gray-600 rounded-xl p-6 hover:border-yellow-500 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10 group cursor-pointer"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-yellow-600/30 rounded-xl flex items-center justify-center text-yellow-400 font-bold text-xl border border-yellow-400/30">
                        {employer.logo}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                          {employer.name}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {employer.industry}
                        </p>
                      </div>
                    </div>
                    {employer.isVerified && <VerifiedIcon />}
                  </div>

                  {/* Location & Stats */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-gray-400 text-sm">
                      <LocationIcon />
                      <span>{employer.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center text-gray-400 text-sm">
                        <UserIcon />
                        <span>{employer.employeeCount}</span>
                      </div>
                      <div className="flex items-center text-gray-400 text-sm">
                        <BriefcaseIcon />
                        <span>{employer.openPositions} موقعیت</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {renderStars(employer.rating)}
                    </div>
                    <span className="text-yellow-400 font-semibold">
                      {employer.rating}
                    </span>
                    <span className="text-gray-400 text-sm">
                      ({employer.reviews.toLocaleString()} نظر)
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {employer.description}
                  </p>

                  {/* Benefits Preview */}
                  <div className="mb-6">
                    <p className="text-sm text-gray-400 mb-2">مزایای کلیدی:</p>
                    <div className="flex flex-wrap gap-1">
                      {employer.benefits.slice(0, 2).map((benefit, index) => (
                        <span
                          key={index}
                          className="bg-yellow-400/10 text-yellow-300 text-xs px-2 py-1 rounded-full"
                        >
                          {benefit}
                        </span>
                      ))}
                      {employer.benefits.length > 2 && (
                        <span className="text-gray-500 text-xs px-2 py-1">
                          +{employer.benefits.length - 2} امتیاز دیگر
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link
                      href={`/employers/${employer.id}`}
                      className="flex-1 bg-yellow-400 text-black py-2 px-4 rounded-lg font-semibold hover:bg-yellow-300 transition-colors text-center"
                    >
                      مشاهده شرکت
                    </Link>
                    <Link
                      href={`/jobs?company=${employer.id}`}
                      className="bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      موقعیت‌های شغلی ({employer.openPositions})
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredEmployers.length === 0 && (
              <div className="text-center py-16">
                <div className="text-gray-400 text-lg mb-4">
                  هیچ شرکتی یافت نشد
                </div>
                <p className="text-gray-500">
                  با تغییر فیلترها یا کاهش محدودیت‌های جستجو، شرکت‌های بیشتری را
                  پیدا کنید.
                </p>
              </div>
            )}

            {/* Load More */}
            {filteredEmployers.length >= 12 && (
              <div className="text-center mt-12">
                <button className="bg-gray-700 text-white px-8 py-3 rounded-lg hover:bg-gray-600 transition-colors">
                  مشاهده شرکت‌های بیشتر
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] border-t border-gray-800 mt-16">
        <div className="container mx-auto px-6 py-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} پلتفرم استخدامی دکتر برایان
            اعتماد. تمام حقوق محفوظ است.
          </p>
        </div>
      </footer>
    </div>
  );
}
