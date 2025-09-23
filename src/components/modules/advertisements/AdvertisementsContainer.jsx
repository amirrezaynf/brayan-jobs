"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AdvertisementsHeader from "./AdvertisementsHeader";
import AdvertisementsFilters from "./AdvertisementsFilters";
import AdvertisementsList from "./AdvertisementsList";
import AdvertisementsEmptyState from "./AdvertisementsEmptyState";
import AdvertisementsPagination from "./AdvertisementsPagination";

export default function AdvertisementsContainer({
  initialAds = [],
  initialMeta = { total: 0, per_page: 20, current_page: 1, last_page: 0 },
  apiError = null,
  searchParams = {},
}) {
  const router = useRouter();
  const urlSearchParams = useSearchParams();

  // Initialize state with server-side API data only
  const [ads, setAds] = useState(initialAds);
  const [meta, setMeta] = useState(initialMeta);
  const [filteredAds, setFilteredAds] = useState(initialAds);
  const [searchFilter, setSearchFilter] = useState(searchParams.search || "");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.jobCategory || ""
  );
  const [sortBy, setSortBy] = useState(searchParams.sortBy || "newest");
  const [salaryRange, setSalaryRange] = useState([
    parseInt(searchParams.salaryMin) || 5000000,
    parseInt(searchParams.salaryMax) || 50000000,
  ]);
  const [showNegotiable, setShowNegotiable] = useState(false);
  const [showNoLimit, setShowNoLimit] = useState(false);
  const [showRangeFilter, setShowRangeFilter] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState(
    searchParams.province || ""
  );
  const [selectedCity, setSelectedCity] = useState(searchParams.city || "");
  const [selectedEmploymentType, setSelectedEmploymentType] = useState(
    searchParams.employmentType || ""
  );
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.page) || 1
  );
  const [itemsPerPage] = useState(12);

  const userType = urlSearchParams.get("userType");
  const jobCategory = urlSearchParams.get("jobCategory");
  const specialization = urlSearchParams.get("specialization");

  // Show API error if exists
  useEffect(() => {
    if (apiError) {
    }
  }, [apiError]);

  // Load advertisements data
  useEffect(() => {
    let allAds = [...initialAds];
    if (typeof window !== "undefined") {
      if (userType === "employer") {
        const savedJobs = localStorage.getItem("allJobs");
        if (savedJobs) {
          const employerJobs = JSON.parse(savedJobs).filter(
            (job) => job.userType === "employer"
          );
          allAds = [...allAds, ...employerJobs];
        }

        const postedJobs = localStorage.getItem("postedJobs");
        if (postedJobs) {
          const parsedPostedJobs = JSON.parse(postedJobs);
          const newPostedJobs = parsedPostedJobs.filter(
            (job) => !allAds.some((ad) => ad.id === job.id)
          );
          allAds = [...allAds, ...newPostedJobs];
        }
      } else {
        const savedJobs = localStorage.getItem("allJobs");
        if (savedJobs) {
          const parsedJobs = JSON.parse(savedJobs);
          allAds = [...allAds, ...parsedJobs];
        }

        const postedJobs = localStorage.getItem("postedJobs");
        if (postedJobs) {
          const parsedPostedJobs = JSON.parse(postedJobs);
          const newPostedJobs = parsedPostedJobs.filter(
            (job) => !allAds.some((ad) => ad.id === job.id)
          );
          allAds = [...allAds, ...newPostedJobs];
        }
      }
    }

    let filtered = [...allAds];
    if (jobCategory) {
      filtered = filtered.filter((ad) => ad.category === jobCategory);
    }

    if (specialization) {
      filtered = filtered.filter((ad) => ad.specialization === specialization);
    }

    setFilteredAds(filtered);
    setAds(filtered);
  }, [jobCategory, specialization, userType]);

  // Apply filters
  useEffect(() => {
    let result = [...filteredAds];

    if (searchFilter) {
      result = result.filter(
        (ad) =>
          ad.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
          ad.company.toLowerCase().includes(searchFilter.toLowerCase()) ||
          ad.description.toLowerCase().includes(searchFilter.toLowerCase())
      );
    }

    const activeCategory =
      jobCategory ||
      (selectedCategory && selectedCategory !== "همه"
        ? selectedCategory
        : null);
    if (activeCategory) {
      result = result.filter((ad) => ad.category === activeCategory);
    }

    if (selectedProvince && selectedProvince !== "همه") {
      result = result.filter((ad) => ad.province === selectedProvince);
    }

    if (selectedEmploymentType && selectedEmploymentType !== "همه") {
      result = result.filter((ad) => ad.type === selectedEmploymentType);
    }

    if (selectedCity && selectedCity !== "همه") {
      result = result.filter((ad) => ad.location === selectedCity);
    }

    // Helper function to safely handle salary filtering
    const getSalaryInfo = (salary) => {
      // If salary is null or undefined, treat as negotiable
      if (!salary && salary !== 0) {
        return { isNegotiable: true, numericValue: 0 };
      }

      // If salary is already a number, use it directly
      if (typeof salary === "number") {
        return { isNegotiable: false, numericValue: salary };
      }

      // If salary is a string, process it
      if (typeof salary === "string") {
        const salaryStr = salary.trim();

        // Check if it's negotiable salary
        if (salaryStr.toLowerCase().includes("توافقی")) {
          return { isNegotiable: true, numericValue: 0 };
        }

        // Try to extract numeric value from Persian digits
        const persianDigits = salaryStr.match(/[\u06F0-\u06F9]/g);
        if (persianDigits) {
          const englishDigits = persianDigits
            .map((digit) => {
              const charCode = digit.charCodeAt(0);
              return String(charCode - "\u06F0".charCodeAt(0));
            })
            .join("");
          return {
            isNegotiable: false,
            numericValue: parseInt(englishDigits, 10) || 0,
          };
        }

        // Try to extract numeric value from regular digits
        const regularDigits = salaryStr.match(/\d+/g);
        if (regularDigits) {
          const numericValue = parseInt(regularDigits.join(""), 10);
          return { isNegotiable: false, numericValue: numericValue || 0 };
        }
      }

      // If we can't parse it, treat as 0
      return { isNegotiable: false, numericValue: 0 };
    };

    // Salary filtering logic
    result = result.filter((ad) => {
      const salaryInfo = getSalaryInfo(ad.salary);

      if (showNoLimit) return true;
      if (showNegotiable) return salaryInfo.isNegotiable;

      if (showRangeFilter) {
        if (salaryInfo.isNegotiable) return false;
        return (
          salaryInfo.numericValue >= salaryRange[0] &&
          salaryInfo.numericValue <= salaryRange[1]
        );
      }

      // Default behavior: show both negotiable and within range
      if (salaryInfo.isNegotiable) return true;
      return (
        salaryInfo.numericValue >= salaryRange[0] &&
        salaryInfo.numericValue <= salaryRange[1]
      );
    });

    // Sorting logic
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
    selectedProvince,
    selectedEmploymentType,
    sortBy,
    salaryRange,
    showNegotiable,
    showNoLimit,
    showRangeFilter,
    jobCategory,
  ]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchFilter,
    selectedCategory,
    selectedProvince,
    selectedEmploymentType,
    sortBy,
    salaryRange,
    showNegotiable,
    showNoLimit,
    showRangeFilter,
  ]);

  // Reset city when province changes
  useEffect(() => {
    setSelectedCity("");
  }, [selectedProvince]);

  // Pagination calculations
  const totalItems = ads.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAds = ads.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const filterProps = {
    searchFilter,
    setSearchFilter,
    sortBy,
    setSortBy,
    selectedCategory,
    setSelectedCategory,
    selectedProvince,
    setSelectedProvince,
    selectedCity,
    setSelectedCity,
    selectedEmploymentType,
    setSelectedEmploymentType,
    salaryRange,
    setSalaryRange,
    showNegotiable,
    setShowNegotiable,
    showNoLimit,
    setShowNoLimit,
    showRangeFilter,
    setShowRangeFilter,
  };

  return (
    <div className="flex gap-10 max-w-10xl mx-auto px-6 py-8">
      {/* Left Sidebar - Fixed Filters */}
      <AdvertisementsFilters {...filterProps} />

      {/* Main Content */}
      <div className="flex-1 py-0">
        <div className="container mx-auto px-6 lg:px-0">
          {/* Header */}
          <AdvertisementsHeader
            totalAds={ads.length}
            jobCategory={jobCategory}
          />

          {/* Results */}
          <div className="w-full">
            {totalItems > 0 ? (
              <div>
                <AdvertisementsList ads={currentAds} />

                <AdvertisementsPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            ) : (
              <AdvertisementsEmptyState onGoHome={() => router.push("/")} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
