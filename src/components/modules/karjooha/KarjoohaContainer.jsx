"use client";

import React, { useState } from "react";
import KarjoohaFilters from "./KarjoohaFilters";
import KarjoohaContent from "./KarjoohaContent";
import { jobSeekers } from "@/constants/karjoohaData";

export default function KarjoohaContainer() {
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
  const totalPages = Math.ceil(filteredJobSeekers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentJobSeekers = filteredJobSeekers.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // اسکرول به بالای صفحه
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  const filterProps = {
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
    filteredCount: filteredJobSeekers.length,
  };

  const contentProps = {
    currentJobSeekers,
    filteredJobSeekers,
    currentPage,
    totalPages,
    handlePageChange,
  };

  return (
    <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* فیلترهای پیشرفته - سمت راست */}
        <KarjoohaFilters {...filterProps} />

        {/* محتوای اصلی - سمت چپ */}
        <KarjoohaContent {...contentProps} />
      </div>
    </div>
  );
}
