"use client";

import React, { useState } from "react";
import {
  Search,
  MapPin,
  Phone,
  Mail,
  Briefcase,
  Calendar,
  Star,
  Award,
  Languages,
  FileText,
  ExternalLink,
  Heart,
  Eye,
  Filter,
  Users,
  TrendingUp,
  Clock,
  DollarSign,
  User,
  ChevronDown,
  MessageCircle,
  Bookmark,
} from "lucide-react";
import CustomSelect from "@/components/ui/select/CustomSelect";
import Pagination from "@/components/ui/pagination/Pagination";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import JobSeekerCard from "@/components/ui/card/JobSeekerCard";
import { useRouter } from "next/navigation";
import KarjoohaFilters from "@/components/ui/filter/KarjoohaFilters";
import KarjoohaHeader from "@/components/layout/header/KarjoohaHeader";
import {
  categories,
  jobSeekers,
  provinces,
  locations,
  sortOptions,
} from "@/constants/karjoohaData";
import KarjoohaList from "@/components/modules/karjooha/KarjoohaList";
export default function JobSeekersLandingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProvince, setSelectedProvince] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // تعداد کارجو در هر صفحه
  const router = useRouter();

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

  return (
    <>
      {/* Header */}
      <KarjoohaHeader />

      {/* فیلترها و جستجو */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <KarjoohaFilters />

        {/* لیست کارجوها */}
        <KarjoohaList list={currentJobSeekers} />

        {/* پیام خالی بودن نتایج */}
        {filteredJobSeekers.length === 0 && (
          <div className='text-center py-16'>
            <Users className='w-16 h-16 text-gray-600 mx-auto mb-4' />
            <h3 className='text-xl font-semibold text-gray-400 mb-2'>
              کارجویی پیدا نشد
            </h3>
            <p className='text-gray-500'>لطفاً فیلترهای جستجو را تغییر دهید</p>
          </div>
        )}

        {/* Pagination */}
        {filteredJobSeekers.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            className='mt-12'
          />
        )}
      </div>
    </>
  );
}
