"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import CustomSelect from "@/components/ui/select/CustomSelect";
import {
  categories,
  jobSeekers,
  provinces,
  locations,
  sortOptions,
} from "@/constants/karjoohaData";
import SearchInput from "../input/SearchInput";

function KarjoohaFilters() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProvince, setSelectedProvince] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // تعداد کارجو در هر صفحه

  // فیلتر کردن کارجوها
  const filteredJobSeekers = jobSeekers.filter((jobSeeker) => {
    const matchesSearch =
      searchQuery === "" ||
      jobSeeker.firstName.includes(searchQuery) ||
      jobSeeker.lastName.includes(searchQuery) ||
      jobSeeker.jobTitle.includes(searchQuery) ||
      jobSeeker.topSkills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesProvince =
      selectedProvince === "all" || jobSeeker.province === selectedProvince;

    const matchesLocation =
      selectedLocation === "all" || jobSeeker.city === selectedLocation;

    return matchesSearch && matchesProvince && matchesLocation;
  });

  // محاسبه pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // ریست کردن صفحه وقتی فیلترها تغییر می‌کند
  React.useEffect(() => {
    setCurrentPage(1);
  }, [
    searchQuery,
    selectedCategory,
    selectedProvince,
    selectedLocation,
    sortBy,
  ]);

  return (
    <div className='bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 mb-8'>
      <div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
        {/* جستجو */}
        <SearchInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* دسته‌بندی */}
        <div>
          <CustomSelect
            options={categories.map((cat) => cat.label)}
            value={
              categories.find((cat) => cat.value === selectedCategory)?.label ||
              "همه دسته‌ها"
            }
            onChange={(label) => {
              const category = categories.find((cat) => cat.label === label);
              setSelectedCategory(category ? category.value : "all");
            }}
            placeholder='همه دسته‌ها'
          />
        </div>

        {/* استان */}
        <div>
          <CustomSelect
            options={provinces.map((prov) => prov.label)}
            value={
              provinces.find((prov) => prov.value === selectedProvince)
                ?.label || "همه استان‌ها"
            }
            onChange={(label) => {
              const province = provinces.find((prov) => prov.label === label);
              setSelectedProvince(province ? province.value : "all");
              setSelectedLocation("all"); // ریست کردن شهر وقتی استان تغییر می‌کند
            }}
            placeholder='همه استان‌ها'
          />
        </div>

        {/* شهر */}
        <div>
          <CustomSelect
            options={locations.map((loc) => loc.label)}
            value={
              locations.find((loc) => loc.value === selectedLocation)?.label ||
              "همه شهرها"
            }
            onChange={(label) => {
              const location = locations.find((loc) => loc.label === label);
              setSelectedLocation(location ? location.value : "all");
            }}
            placeholder='همه شهرها'
          />
        </div>
      </div>

      {/* نتایج و مرتب‌سازی */}
      <div className='flex items-center justify-between mt-6 pt-6 border-t border-gray-700/50'>
        <p className='text-gray-400'>
          <span className='text-white font-medium'>
            {filteredJobSeekers.length}
          </span>{" "}
          کارجو پیدا شد
        </p>

        <div className='flex items-center gap-2'>
          <span className='text-gray-400 text-sm'>مرتب‌سازی:</span>
          <div className='w-40'>
            <CustomSelect
              options={sortOptions.map((opt) => opt.label)}
              value={
                sortOptions.find((opt) => opt.value === sortBy)?.label ||
                "جدیدترین"
              }
              onChange={(label) => {
                const option = sortOptions.find((opt) => opt.label === label);
                setSortBy(option ? option.value : "recent");
              }}
              placeholder='جدیدترین'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default KarjoohaFilters;
