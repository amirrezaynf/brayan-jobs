"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AdvertisementsHeader from "./AdvertisementsHeader";
import AdvertisementsFilters from "./AdvertisementsFilters";
import AdvertisementsList from "./AdvertisementsList";
import AdvertisementsEmptyState from "./AdvertisementsEmptyState";
import AdvertisementsPagination from "./AdvertisementsPagination";

// Sample advertisement data (normally would come from API)
const sampleAdvertisements = [
  {
    id: 1,
    title: "آگهی استخدام توسعه‌دهنده React",
    company: "شرکت فناوری اطلاعات پارامکس",
    location: "تهران",
    province: "تهران",
    description: "جستجوی توسعه‌دهنده React باتجربه برای پروژه‌های بزرگ",
    category: "فناوری اطلاعات",
    specialization: "برنامه‌نویسی وب",
    type: "تمام وقت",
    salary: "۱۵,۰۰۰,۰۰۰ تومان",
    applicants: 12,
    date: "2024-09-11",
    urgent: true,
    gender: "male",
    education: "bachelor",
    experience: "2-5",
    militaryService: "completed",
    workHours: "۹ صبح تا ۶ عصر",
    insurance: "full",
    probationPeriod: "۳ ماه",
    remoteWork: false,
    travelRequired: false,
    responsibilities:
      "توسعه و پیادهسازی کامپوننت‌های React، بهینه‌سازی عملکرد، همکاری با تیم طراحی UX/UI، نوشتن تست‌های واحد و یکپارچه، استقرار و نگهداری برنامه‌ها",
    requirements:
      "آشنایی کامل با React و Hooks، تجربه با TypeScript، دانش HTML/CSS پیشرفته، تجربه کار با Git، آشنایی با RESTful APIs",
    skills: "React.js, TypeScript, HTML/CSS, Git, REST APIs",
    benefits: [
      "بیمه درمانی کامل",
      "تسهیلات ورزشی",
      "دوره‌های آموزشی",
      "کیفیت کار برتر",
    ],
  },
  {
    id: 2,
    title: "طراح UI/UX برای اپلیکیشن موبایل",
    company: "استارتاپ تهیکس",
    location: "اصفهان",
    province: "اصفهان",
    description: "طراحی رابط کاربری جذاب برای اپلیکیشن‌های موبایل",
    category: "طراحی و گرافیک",
    specialization: "طراحی UI/UX",
    type: "پاره وقت",
    salary: "۸,۰۰۰,۰۰۰ تومان",
    applicants: 8,
    date: "2024-09-10",
    urgent: false,
    gender: "both",
    education: "associate",
    experience: "2-5",
    militaryService: "not-required",
    responsibilities:
      "طراحی رابط کاربری برای اپلیکیشن‌های موبایل، ایجاد پروتوتیپ‌های تعاملی، همکاری با تیم توسعه برای پیاده‌سازی طراحی، انجام تست‌های کاربری، و بهبود تجربه کاربری بر اساس بازخوردها",
    requirements:
      "مهارت بالا در Figma، دانش اصول UX design، تجربه طراحی هم‌رسان (Responsive)، درک رابط کاربری موبایل، توانایی هماهنگی با توسعه‌دهندگان",
    skills: "Figma, Adobe XD, Sketch, Prototyping, Mobile Design",
    benefits: [
      "دسترسی به ابزارهای پیشرفته",
      "تجربه کاری در استارتاپ",
      "کیفیت کار پویا",
    ],
  },
  {
    id: 3,
    title: "مدیر محصول دیجیتال",
    company: "شرکت بازرگانی پارسه",
    location: "مشهد",
    province: "خراسان رضوی",
    description: "مدیریت محصول برای پلتفرم‌های دیجیتال B2B",
    category: "مدیریت پروژه",
    specialization: "مدیریت محصول",
    type: "تمام وقت",
    salary: "۱۸,۰۰۰,۰۰۰ تومان",
    applicants: 5,
    date: "2024-09-09",
    urgent: true,
    gender: "both",
    education: "master",
    experience: "5+",
    militaryService: "completed",
    responsibilities:
      "تحقیق و تحلیل市场需求، تعریف استراتژی محصول، مدیریت محصول پیشرفته، همکاری با تیم‌های فنی، نظارت بر توسعه محصول، تحلیل عملکرد محصول از طریق داده‌ها",
    requirements:
      "تجربه مدیریت محصول بالا، دانش تحلیل داده، مهارت ارتباطی عالی، تجربه رهبری تیم، درک فناوری دیجیتال",
    skills:
      "Product Management, Data Analysis, Agile/Scrum, SQL, Analytics Tools",
    benefits: [
      "چالش‌های منحصر به فرد",
      "توسعه حرفه‌ای سریع",
      "تمام مزایای قانونی",
      "کیفیت همکاری عالی",
    ],
  },
  {
    id: 4,
    title: "کارشناس سئو و بازاریابی دیجیتال",
    company: "آژانس تبلیغات مدیا",
    location: "شیراز",
    province: "فارس",
    description:
      "بهینه‌سازی وب‌سایت‌ها و پیاده‌سازی استراتژی‌های بازاریابی دیجیتال",
    category: "بازاریابی و فروش",
    specialization: "SEO/SEM",
    type: "تمام وقت",
    salary: "۱۲,۰۰۰,۰۰۰ تومان",
    applicants: 15,
    date: "2024-09-08",
    urgent: false,
    gender: "both",
    education: "bachelor",
    experience: "2-5",
    militaryService: "exempted",
    responsibilities:
      "اجرای استراتژی‌های SEO، اجرای تبلیغات گوگل، مدیریت کمپین‌های دیجیتال، تحلیل عملکرد محتوا، تولید گزارش‌های تحلیلی، بهینه‌سازی نرخ تبدیل",
    requirements:
      "مهارت‌های SEO پیشرفته، تجربه تبلیغات گوگل، توانمند در گوگل آنالیتیکس، درک دیجیتال مارکهای، مهارت تولید محتوا",
    skills: "SEO, Google Ads, Google Analytics, Content Marketing, SEM",
    benefits: [
      "آموزش‌های مستمر",
      "کیفیت پروژه‌های متنوع",
      "کیفیت همکاری مناسب",
      "زمان انعطاف‌پذیر",
    ],
  },
  {
    id: 5,
    title: "توسعه‌دهنده Node.js - Backend",
    company: "شرکت نرم‌افزاری آپادانا",
    location: "کرج",
    province: "البرز",
    description: "توسعه سرویس‌های سمت سرور با استفاده از Node.js",
    category: "فناوری اطلاعات",
    specialization: "پایگاه داده",
    type: "تمام وقت",
    salary: "۱۶,۰۰۰,۰۰۰ تومان",
    applicants: 9,
    date: "2024-09-07",
    urgent: false,
    gender: "male",
    education: "bachelor",
    experience: "2-5",
    militaryService: "completed",
    responsibilities:
      "طراحی و توسعه میکروسرویس‌ها، پیادهسازی APIهای RESTful، ادغام با انواع پایگاه داده‌ها، بهینه‌سازی عملکرد سرور، تست و عیب‌یابی سیستم‌ها",
    requirements:
      "تسلط کامل به Node.js، تجربه ادغام فرهنگستان حداقل ۲ سال، مهارت پایگاه داده‌های SQL/NoSQL، دانش اصول RESTful API",
    skills: "Node.js, Express.js, MongoDB, PostgreSQL, Docker, REST API",
    benefits: [
      "محیط کاری پویا",
      "کیفیت پروژه‌های پیشرفته",
      "دسترسی به تکنولوژی‌های نوین",
      "کیفیت协作 خوب",
    ],
  },
];

export default function AdvertisementsContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [ads, setAds] = useState([]);
  const [filteredAds, setFilteredAds] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [salaryRange, setSalaryRange] = useState([5000000, 50000000]);
  const [showNegotiable, setShowNegotiable] = useState(false);
  const [showNoLimit, setShowNoLimit] = useState(false);
  const [showRangeFilter, setShowRangeFilter] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedEmploymentType, setSelectedEmploymentType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  const userType = searchParams.get("userType");
  const jobCategory = searchParams.get("jobCategory");
  const specialization = searchParams.get("specialization");

  // Load advertisements data
  useEffect(() => {
    let allAds = [];
    if (typeof window !== "undefined") {
      if (userType === "employer") {
        const savedJobs = localStorage.getItem("allJobs");
        if (savedJobs) {
          const employerJobs = JSON.parse(savedJobs).filter(
            (job) => job.userType === "employer"
          );
          allAds = [...employerJobs];
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
        allAds = [...sampleAdvertisements];

        const savedJobs = localStorage.getItem("allJobs");
        if (savedJobs) {
          const parsedJobs = JSON.parse(savedJobs);
          const newJobs = parsedJobs.filter((job) => {
            const exists = sampleAdvertisements.some(
              (sample) =>
                sample.title === job.title && sample.company === job.company
            );
            return !exists;
          });
          allAds = [...allAds, ...newJobs];
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

    // Salary filtering logic
    result = result.filter((ad) => {
      const isNegotiableSalary = ad.salary.toLowerCase().includes("توافقی");

      if (showNoLimit) return true;
      if (showNegotiable) return isNegotiableSalary;

      if (showRangeFilter) {
        if (isNegotiableSalary) return false;

        const persianDigits = ad.salary.match(/[\u06F0-\u06F9]/g);
        if (!persianDigits) return false;

        const englishDigits = persianDigits
          .map((digit) => {
            const charCode = digit.charCodeAt(0);
            return String(charCode - "\u06F0".charCodeAt(0));
          })
          .join("");

        const salaryNum = parseInt(englishDigits, 10);
        return salaryNum >= salaryRange[0] && salaryNum <= salaryRange[1];
      }

      if (isNegotiableSalary) return true;

      const persianDigits = ad.salary.match(/[\u06F0-\u06F9]/g);
      if (!persianDigits) return false;

      const englishDigits = persianDigits
        .map((digit) => {
          const charCode = digit.charCodeAt(0);
          return String(charCode - "\u06F0".charCodeAt(0));
        })
        .join("");

      const salaryNum = parseInt(englishDigits, 10);
      return salaryNum >= salaryRange[0] && salaryNum <= salaryRange[1];
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

  const handleViewAd = (adId) => {
    router.push(`/advertisements/${adId}`);
  };

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
                <AdvertisementsList ads={currentAds} onViewAd={handleViewAd} />

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
