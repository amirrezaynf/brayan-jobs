"use client";

import React from "react";
import CustomSelect from "@/components/ui/select/CustomSelect";

const EmployersSidebar = ({
  // Search and Sort
  searchFilter,
  setSearchFilter,
  sortBy,
  setSortBy,
  
  // Industry Filter
  selectedIndustry,
  setSelectedIndustry,
  industries,
  
  // Location Filters
  selectedCountry,
  setSelectedCountry,
  countries,
  selectedProvince,
  setSelectedProvince,
  provinces,
  selectedCity,
  setSelectedCity,
  availableCities,
  
  
  // Clear Filters Function
  onClearFilters,
}) => {
  const handleClearFilters = () => {
    setSearchFilter("");
    setSelectedIndustry("");
    setSelectedCountry("");
    setSelectedProvince("");
    setSelectedCity("");
    setSortBy("newest");
    
    // Call additional clear function if provided
    if (onClearFilters) {
      onClearFilters();
    }
  };

  return (
    <div className="hidden lg:block w-80 flex-shrink-0">
      <div className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-700 sticky top-8">
        <h3 className="text-xl font-bold mb-6 border-b-2 border-gray-700 pb-3 text-white">
          جستجو و فیلترها
        </h3>

        {/* Search Input */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-300">
            جستجو در کارفرمایان
          </label>
          <input
            type="text"
            placeholder="جستجو در نام شرکت، حوزه فعالیت یا توضیحات..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>

        {/* Sort Select */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-300">
            ترتیب نمایش
          </label>
          <CustomSelect
            value={sortBy}
            onChange={(value) => {
              setSortBy(value === "" ? "newest" : value);
            }}
            options={[
              {
                value: "newest",
                label: "جدیدترین",
                key: "sort-newest",
              },
              {
                value: "oldest",
                label: "قدیمی‌ترین",
                key: "sort-oldest",
              },
              {
                value: "most-positions",
                label: "بیشترین موقعیت شغلی",
                key: "sort-most-positions",
              },
              {
                value: "highest-rating",
                label: "بالاترین امتیاز",
                key: "sort-highest-rating",
              },
              {
                value: "most-employees",
                label: "بیشترین کارمند",
                key: "sort-most-employees",
              },
            ]}
            placeholder="انتخاب ترتیب"
          />
        </div>

        {/* Industry Filter */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-300">
            حوزه فعالیت
          </label>
          <CustomSelect
            value={selectedIndustry}
            onChange={(value) =>
              setSelectedIndustry(value === "همه حوزه‌ها" ? "" : value)
            }
            options={[
              { value: "", label: "همه حوزه‌ها", key: "all-industries" },
              ...industries.slice(1).map((industry, index) => ({
                value: industry,
                label: industry,
                key: `industry-${index}`,
              })),
            ]}
            placeholder="انتخاب حوزه فعالیت"
          />
        </div>

        {/* Country Filter */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-300">
            کشور
          </label>
          <CustomSelect
            value={selectedCountry}
            onChange={(value) =>
              setSelectedCountry(value === "همه کشورها" ? "" : value)
            }
            options={[
              { value: "", label: "همه کشورها", key: "all-countries" },
              ...countries.slice(1).map((country, index) => ({
                value: country,
                label: country,
                key: `country-${index}`,
              })),
            ]}
            placeholder="انتخاب کشور"
          />
        </div>

        {/* Province Filter */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-300">
            استان
          </label>
          <CustomSelect
            value={selectedProvince}
            onChange={(value) =>
              setSelectedProvince(value === "همه استان‌ها" ? "" : value)
            }
            options={[
              { value: "", label: "همه استان‌ها", key: "all-provinces" },
              ...provinces.slice(1).map((province, index) => ({
                value: province,
                label: province,
                key: `province-${index}`,
              })),
            ]}
            placeholder="انتخاب استان"
          />
        </div>

        {/* City Filter */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-300">
            شهر
          </label>
          <CustomSelect
            value={selectedCity}
            onChange={(value) =>
              setSelectedCity(value === "همه شهرها" ? "" : value)
            }
            options={[
              { value: "", label: "همه شهرها", key: "all-cities" },
              ...(selectedProvince && selectedProvince !== "همه استان‌ها"
                ? availableCities.slice(1)
                : availableCities
              ).map((city, index) => ({
                value: city,
                label: city,
                key: `city-${index}`,
              })),
            ]}
            placeholder="انتخاب شهر"
          />
        </div>


        {/* Clear Filters Button */}
        <button
          onClick={handleClearFilters}
          className="w-full bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 px-4 py-2 rounded-lg font-medium border border-yellow-500/30 hover:border-yellow-500/50 transition-all duration-200 mb-6"
        >
          پاک کردن همه فیلترها
        </button>
      </div>
    </div>
  );
};

export default EmployersSidebar;
