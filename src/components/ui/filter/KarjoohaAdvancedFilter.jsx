"use client";

import React from "react";
import CustomSelect from "@/components/ui/select/CustomSelect";
import SearchInput from "../input/SearchInput";
import {
  categories,
  provinces,
  locations,
  sortOptions,
} from "@/constants/karjoohaData";
import SalaryRangeInput from "../range/SalaryRangeInput";

export default function KarjoohaAdvancedFilter({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedProvince,
  setSelectedProvince,
  selectedLocation,
  setSelectedLocation,
  sortBy,
  setSortBy,
  filteredCount,
}) {
  return (
    <aside className="lg:w-1/4">
      <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 sticky top-28">
        <h3 className="text-xl font-bold mb-6 border-b-2 border-gray-700 pb-3 text-white">
          جستجو و فیلتر
        </h3>

        {/* جستجو */}
        <div className="mb-6">
          <label className="block mb-3 text-sm font-medium text-gray-300">
            جستجو در کارجوها
          </label>
          <SearchInput
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>

        <div className="border-t border-gray-700 my-6"></div>

        {/* دسته‌بندی */}
        <div className="mb-6">
          <label className="block mb-3 text-sm font-medium text-gray-300">
            حوزه کاری
          </label>
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
            placeholder="همه دسته‌ها"
          />
        </div>

        <div className="border-t border-gray-700 my-6"></div>

        {/* استان */}
        <div className="mb-6">
          <label className="block mb-3 text-sm font-medium text-gray-300">
            استان
          </label>
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
            placeholder="همه استان‌ها"
          />
        </div>

        {/* شهر */}
        <div className="mb-6">
          <label className="block mb-3 text-sm font-medium text-gray-300">
            شهر
          </label>
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
            placeholder="همه شهرها"
          />
        </div>

        <div className="border-t border-gray-700 my-6"></div>

        {/* مرتب‌سازی */}
        <div className="mb-6">
          <label className="block mb-3 text-sm font-medium text-gray-300">
            مرتب‌سازی بر اساس
          </label>
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
            placeholder="جدیدترین"
          />
        </div>

        <div className="border-t border-gray-700 my-6"></div>

            <div className=" my-5 border-b pb-5">
            <SalaryRangeInput />

            </div>
        {/* نتایج */}
        <div className="text-center">
          <p className="text-gray-400">
            <span className="text-white font-medium text-lg">
              {filteredCount}
            </span>{" "}
            کارجو پیدا شد
          </p>
        </div>
      </div>
    </aside>
  );
}
