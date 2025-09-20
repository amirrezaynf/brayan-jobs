"use client";

import React from "react";
import CustomSelect from "@/components/ui/select/CustomSelect";
import SalaryRangeSlider from "@/components/ui/range/SalaryRangeInput";

const AdvertisementSidebar = ({
  // Search and Sort
  searchFilter,
  setSearchFilter,
  sortBy,
  setSortBy,
  
  // Category Filter
  selectedCategory,
  setSelectedCategory,
  categories,
  
  // Location Filters
  selectedProvince,
  setSelectedProvince,
  provinces,
  selectedCity,
  setSelectedCity,
  availableCities,
  
  // Employment Type
  selectedEmploymentType,
  setSelectedEmploymentType,
  employmentTypes,
  
  // Salary Range
  salaryRange,
  setSalaryRange,
  showNegotiable,
  setShowNegotiable,
  showNoLimit,
  setShowNoLimit,
  showRangeFilter,
  setShowRangeFilter,
  
  // Clear Filters Function
  onClearFilters,
}) => {
  const handleClearFilters = () => {
    setSearchFilter("");
    setSelectedCategory("");
    setSelectedProvince("");
    setSelectedCity("");
    setSelectedEmploymentType("");
    setSortBy("newest");
    setSalaryRange([5000000, 50000000]);
    setShowNegotiable(false);
    setShowNoLimit(false);
    setShowRangeFilter(false);
    
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
            جستجو در آگهی‌ها
          </label>
          <input
            type="text"
            placeholder="جستجو در عنوان، شرکت یا توضیحات..."
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
                value: "most-applied",
                label: "بیشترین متقاضی",
                key: "sort-most-applied",
              },
            ]}
            placeholder="انتخاب ترتیب"
          />
        </div>

        {/* Category Filter */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-300">
            دسته‌بندی شغلی
          </label>
          <CustomSelect
            value={selectedCategory}
            onChange={(value) =>
              setSelectedCategory(value === "همه" ? "" : value)
            }
            options={[
              { value: "", label: "همه دسته‌ها", key: "all-categories" },
              ...categories.slice(1).map((category, index) => ({
                value: category,
                label: category,
                key: `category-${index}`,
              })),
            ]}
            placeholder="انتخاب دسته‌بندی"
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
              setSelectedProvince(value === "همه" ? "" : value)
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
              setSelectedCity(value === "همه" ? "" : value)
            }
            options={[
              { value: "", label: "همه شهرها", key: "all-cities" },
              ...(selectedProvince && selectedProvince !== "همه"
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

        {/* Employment Type Filter */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-300">
            نوع همکاری
          </label>
          <CustomSelect
            value={selectedEmploymentType}
            onChange={(value) =>
              setSelectedEmploymentType(value === "همه" ? "" : value)
            }
            options={[
              { value: "", label: "همه انواع", key: "all-types" },
              ...employmentTypes.slice(1).map((type, index) => ({
                value: type,
                label: type,
                key: `employment-${index}`,
              })),
            ]}
            placeholder="انتخاب نوع همکاری"
          />
        </div>

        {/* Salary Range Filter */}
        <div className="mb-6">
          <SalaryRangeSlider
            value={salaryRange}
            onChange={setSalaryRange}
            showNegotiable={showNegotiable}
            onNegotiableChange={setShowNegotiable}
            showNoLimit={showNoLimit}
            onNoLimitChange={setShowNoLimit}
            showRangeFilter={showRangeFilter}
            onRangeFilterChange={setShowRangeFilter}
            min={1000000}
            max={100000000}
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

export default AdvertisementSidebar;
