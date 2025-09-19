"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Import Select Components
import CustomSelect from "@/components/ui/select/CustomSelect";

// Import components as needed
import SalaryRangeSlider from "@/components/ui/range/SalaryRangeInput";
import Footer from "@/components/layout/footer/Footer";
import AdvertisementSidebar from "@/components/ui/filter/AdvertisementSidebar";

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

export default function AdvertisementLandingClient() {
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

  const toJalali = (gregorianDate) => {
    const gDate = new Date(gregorianDate);
    return gDate.toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleViewAd = (adId) => {
    router.push(`/advertisements/${adId}`);
  };

  const categories = [
    "همه",
    "فناوری اطلاعات",
    "طراحی و گرافیک",
    "بازاریابی و فروش",
    "مدیریت پروژه",
    "منابع انسانی",
    "مالی و حسابداری",
  ];

  const provinces = [
    "همه",
    "تهران",
    "خراسان رضوی",
    "اصفهان",
    "فارس",
    "آذربایجان شرقی",
    "خوزستان",
    "گیلان",
    "البرز",
  ];

  const employmentTypes = [
    "همه",
    "تمام وقت",
    "پاره وقت",
    "قراردادی",
    "دورکاری",
  ];

  const citiesByProvince = {
    تهران: [
      "همه",
      "تهران",
      "شهریار",
      "چهاردانگه",
      "دشتستان",
      "کرج",
      "ورامین",
      "شمیرانات",
      "پاکدشت",
    ],
    "خراسان رضوی": ["همه", "مشهد", "نیشابور", "سبزوار"],
    اصفهان: ["همه", "اصفهان", "کاشان", "نجف آباد"],
    فارس: ["همه", "شیراز", "جهرم", "مرودشت"],
    "آذربایجان شرقی": ["همه", "تبریز", "اهر", "مراغه"],
    خوزستان: ["همه", "اهواز", "آبادان", "خرمشهر"],
    گیلان: ["همه", "رشت", "انزلی", "لاهیجان"],
    البرز: ["همه", "کرج", "نظرآباد", "فردیس"],
    همه: [
      "همه",
      "تهران",
      "کرج",
      "مشهد",
      "اصفهان",
      "شیراز",
      "تبریز",
      "اهواز",
      "رشت",
    ],
  };

  const availableCities =
    selectedProvince && citiesByProvince[selectedProvince]
      ? citiesByProvince[selectedProvince]
      : citiesByProvince["همه"];

  useEffect(() => {
    setSelectedCity("");
  }, [selectedProvince]);

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

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxButtons = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    if (currentPage > 1) {
      buttons.push(
        <button
          key='prev'
          onClick={() => handlePageChange(currentPage - 1)}
          className='px-3 py-2 bg-[#2a2a2a] text-white rounded-lg hover:bg-yellow-500/20 hover:text-yellow-400 transition-colors duration-200 border border-gray-700'>
          قبلی
        </button>
      );
    }

    if (startPage > 1) {
      buttons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className='px-3 py-2 bg-[#2a2a2a] text-white rounded-lg hover:bg-yellow-500/20 hover:text-yellow-400 transition-colors duration-200 border border-gray-700'>
          ۱
        </button>
      );
      if (startPage > 2) {
        buttons.push(
          <span key='ellipsis-start' className='px-2 py-2 text-gray-500'>
            ...
          </span>
        );
      }
    }

    for (let page = startPage; page <= endPage; page++) {
      buttons.push(
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-3 py-2 rounded-lg border transition-colors duration-200 ${
            currentPage === page
              ? "bg-yellow-500 text-black border-yellow-500"
              : "bg-[#2a2a2a] text-white hover:bg-yellow-500/20 hover:text-yellow-400 border-gray-700"
          }`}>
          {page}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key='ellipsis-end' className='px-2 py-2 text-gray-500'>
            ...
          </span>
        );
      }
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className='px-3 py-2 bg-[#2a2a2a] text-white rounded-lg hover:bg-yellow-500/20 hover:text-yellow-400 transition-colors duration-200 border border-gray-700'>
          {totalPages}
        </button>
      );
    }

    if (currentPage < totalPages) {
      buttons.push(
        <button
          key='next'
          onClick={() => handlePageChange(currentPage + 1)}
          className='px-3 py-2 bg-[#2a2a2a] text-white rounded-lg hover:bg-yellow-500/20 hover:text-yellow-400 transition-colors duration-200 border border-gray-700'>
          بعدی
        </button>
      );
    }

    return buttons;
  };

  return (
    <>
      <div className='flex gap-10 max-w-10xl mx-auto px-6 py-8'>
        {/* Left Sidebar - Fixed Filters */}
        <AdvertisementSidebar
          searchFilter={searchFilter}
          setSearchFilter={setSearchFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
          selectedProvince={selectedProvince}
          setSelectedProvince={setSelectedProvince}
          provinces={provinces}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          availableCities={availableCities}
          selectedEmploymentType={selectedEmploymentType}
          setSelectedEmploymentType={setSelectedEmploymentType}
          employmentTypes={employmentTypes}
          salaryRange={salaryRange}
          setSalaryRange={setSalaryRange}
          showNegotiable={showNegotiable}
          setShowNegotiable={setShowNegotiable}
          showNoLimit={showNoLimit}
          setShowNoLimit={setShowNoLimit}
          showRangeFilter={showRangeFilter}
          setShowRangeFilter={setShowRangeFilter}
        />

        {/* Main Content */}
        <div className='flex-1 py-0 '>
          <div className='container mx-auto px-6 lg:px-0'>
            <div className='mb-4'>
              <h1 className='text-2xl font-bold text-white mb-2'>
                نتایج جستجو آگهی‌ها
              </h1>
              <p className='text-gray-400'>
                {ads.length} آگهی پیدا شد
                {jobCategory && ` در دسته ${jobCategory}`}
              </p>
            </div>

            {/* Results */}
            <div className='w-full '>
              {totalItems > 0 ? (
                <div>
                  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6'>
                    {currentAds.map((ad) => (
                      <div
                        key={ad.id}
                        className='bg-gradient-to-br from-black/50 to-black/10 backdrop-blur-sm rounded-xl p-4 border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 relative overflow-hidden shadow-lg min-h-[240px] flex flex-col'>
                        {ad.urgent && (
                          <span className='absolute top-2 left-2 bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded-full whitespace-nowrap z-10'>
                            فوری
                          </span>
                        )}
                        <div className='flex items-start justify-between mb-4'>
                          <div className='flex items-start gap-3 flex-1 min-w-0'>
                            <div className='w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center flex-shrink-0'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='20'
                                height='20'
                                viewBox='0 0 24 24'
                                fill='none'
                                stroke='currentColor'
                                strokeWidth={2}
                                className='text-yellow-500'>
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
                                />
                              </svg>
                            </div>
                            <div className='min-w-0 flex-1'>
                              <h3 className='text-lg font-bold text-white truncate mb-1'>
                                {ad.title}
                              </h3>
                              <div className='flex items-center gap-3 text-sm text-gray-400 mb-2'>
                                <span className='flex items-center gap-1'>
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='14'
                                    height='14'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    strokeWidth='2'>
                                    <path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'></path>
                                    <circle cx='12' cy='10' r='3'></circle>
                                  </svg>
                                  {ad.location}
                                </span>
                                <span className='flex items-center gap-1'>
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='14'
                                    height='14'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    strokeWidth='2'>
                                    <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'></path>
                                    <circle cx='12' cy='7' r='4'></circle>
                                  </svg>
                                  {ad.applicants}
                                </span>
                              </div>
                              <p className='text-xs md:text-sm text-gray-300 line-clamp-2 mb-3'>
                                {ad.description}
                              </p>
                              <div className='flex items-center justify-between'>
                                <span className='text-sm text-gray-400'>
                                  {ad.company}
                                </span>
                                <span className='text-sm text-gray-500'>
                                  {toJalali(ad.date)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className='flex items-center justify-between mt-4 pt-4 border-t border-gray-700'>
                          <div className='flex items-center gap-2'>
                            <span className='bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded-full font-medium'>
                              {ad.category}
                            </span>
                            <span className='text-sm text-gray-400'>
                              {ad.type}
                            </span>
                          </div>
                          <div className='flex items-center gap-2'>
                            <span className='text-yellow-400 font-bold'>
                              {ad.salary}
                            </span>
                            <button
                              onClick={() => handleViewAd(ad.id)}
                              className='bg-yellow-500 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-sm'>
                              مشاهده
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  <div className='mt-12 flex flex-col items-center gap-4'>
                    <div className='text-sm text-gray-400 mb-2'>
                      صفحه {currentPage} از {totalPages}
                    </div>

                    <div className='flex items-center justify-center gap-1'>
                      {renderPaginationButtons()}
                    </div>

                    {totalPages > 5 && (
                      <div className='flex items-center gap-2 mt-2'>
                        <span className='text-sm text-gray-500'>
                          رفتن به صفحه:
                        </span>
                        <input
                          type='number'
                          min={1}
                          max={totalPages}
                          onChange={(e) =>
                            handlePageChange(Number(e.target.value))
                          }
                          className='w-20 px-2 py-1 bg-[#2a2a2a] border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500'
                          placeholder={String(currentPage)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className='text-center py-16'>
                  <svg
                    className='w-16 h-16 text-gray-600 mx-auto mb-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                    />
                  </svg>
                  <h3 className='text-xl font-semibold text-gray-300 mb-2'>
                    هیچ آگهی‌ای یافت نشد
                  </h3>
                  <p className='text-gray-500 mb-6'>
                    هیچ آگهی‌ای با معیارهای جستجوی شما مطابقت ندارد. فیلترها را
                    تغییر دهید.
                  </p>
                  <button
                    onClick={() => router.push("/")}
                    className='bg-yellow-500 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-medium transition-colors duration-200'>
                    بازگشت به صفحه اصلی
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
