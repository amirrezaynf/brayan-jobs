"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { COMPANY_DATA } from "@/constants/companyData";
import EmployersSidebar from "@/components/ui/filter/EmployersSidebar";

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
    id: 13, // Company ID for employer listing
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

// Additional mock employer data
const mockEmployers = [
  {
    id: 1,
    name: "دیجی‌کالا",
    companyName: "دیجی‌کالا",
    logo: "DK",
    industry: "فناوری اطلاعات",
    location: "تهران",
    description: "بزرگترین فروشگاه آنلاین ایران با بیش از 10 میلیون کاربر فعال و ارائه خدمات تجارت الکترونیک پیشرفته.",
    employeeCount: "بیش از 500 نفر",
    openPositions: 25,
    website: "https://digikala.com",
    foundedYear: 1385,
    rating: 4.8,
    reviews: 1250,
    benefits: ["بیمه تکمیلی", "ساعت کاری منعطف", "بونس عملکرد", "آموزش‌های تخصصی"],
    isVerified: true,
    address: "تهران، خیابان آفریقا",
    phone: "021-91000000",
    mobile: "09120000000",
    email: "careers@digikala.com",
    linkedin: "https://linkedin.com/company/digikala",
    instagram: "@digikala"
  },
  {
    id: 2,
    name: "اسنپ",
    companyName: "اسنپ",
    logo: "SN",
    industry: "فناوری اطلاعات",
    location: "تهران",
    description: "سوپراپ ایرانی ارائه‌دهنده خدمات حمل‌ونقل، سفارش غذا، پرداخت و خدمات شهری با بیش از 5 میلیون کاربر.",
    employeeCount: "101-500 نفر",
    openPositions: 18,
    website: "https://snapp.ir",
    foundedYear: 1393,
    rating: 4.6,
    reviews: 890,
    benefits: ["محیط کاری نوآورانه", "پکیج رقابتی", "کار از راه دور", "رشد حرفه‌ای"],
    isVerified: true,
    address: "تهران، خیابان کارگر شمالی",
    phone: "021-88000000",
    mobile: "09121111111",
    email: "jobs@snapp.ir",
    linkedin: "https://linkedin.com/company/snapp",
    instagram: "@snapp.ir"
  },
  {
    id: 3,
    name: "بانک پاسارگاد",
    companyName: "بانک پاسارگاد",
    logo: "BP",
    industry: "مالی و بانکی",
    location: "تهران",
    description: "یکی از بانک‌های خصوصی پیشرو در ایران با ارائه خدمات بانکی دیجیتال و سنتی به بیش از 3 میلیون مشتری.",
    employeeCount: "بیش از 500 نفر",
    openPositions: 12,
    website: "https://bpi.ir",
    foundedYear: 1384,
    rating: 4.4,
    reviews: 650,
    benefits: ["بیمه کامل", "وام کارکنان", "پاداش سالانه", "آموزش مداوم"],
    isVerified: true,
    address: "تهران، خیابان فردوسی",
    phone: "021-88220000",
    mobile: "09122222222",
    email: "hr@bpi.ir",
    linkedin: "https://linkedin.com/company/bank-pasargad",
    instagram: "@bank_pasargad"
  },
  {
    id: 4,
    name: "ایران خودرو",
    companyName: "ایران خودرو",
    logo: "IK",
    industry: "تولیدی",
    location: "تهران",
    description: "بزرگترین خودروساز ایران با بیش از 50 سال تجربه در تولید و عرضه انواع خودروهای سواری و تجاری.",
    employeeCount: "بیش از 500 نفر",
    openPositions: 8,
    website: "https://ikco.ir",
    foundedYear: 1341,
    rating: 4.2,
    reviews: 420,
    benefits: ["بیمه اجتماعی", "سرویس رایگان", "وعده غذایی", "امکانات ورزشی"],
    isVerified: true,
    address: "تهران، اتوبان کرج",
    phone: "021-44000000",
    mobile: "09123333333",
    email: "career@ikco.ir",
    linkedin: "https://linkedin.com/company/iran-khodro",
    instagram: "@ikco_official"
  },
  {
    id: 5,
    name: "شرکت ملی نفت ایران",
    companyName: "شرکت ملی نفت ایران",
    logo: "NI",
    industry: "انرژی",
    location: "تهران",
    description: "شرکت ملی نفت ایران مسئول اکتشاف، تولید و تصفیه نفت و گاز طبیعی در سراسر کشور.",
    employeeCount: "بیش از 500 نفر",
    openPositions: 15,
    website: "https://nioc.ir",
    foundedYear: 1330,
    rating: 4.5,
    reviews: 780,
    benefits: ["حقوق بالا", "بیمه کامل", "مسکن کارکنان", "بازنشستگی مطلوب"],
    isVerified: true,
    address: "تهران، خیابان طالقانی",
    phone: "021-61000000",
    mobile: "09124444444",
    email: "jobs@nioc.ir",
    linkedin: "https://linkedin.com/company/nioc",
    instagram: "@nioc_official"
  },
  {
    id: 6,
    name: "تپسی",
    companyName: "تپسی",
    logo: "TP",
    industry: "فناوری اطلاعات",
    location: "مشهد",
    description: "اپلیکیشن درخواست خودرو با پوشش سراسری در ایران، ارائه‌دهنده خدمات حمل‌ونقل هوشمند و مطمئن.",
    employeeCount: "51-100 نفر",
    openPositions: 22,
    website: "https://tapsi.ir",
    foundedYear: 1395,
    rating: 4.7,
    reviews: 560,
    benefits: ["محیط جوان", "فرصت رشد", "کار چالش‌برانگیز", "تیم‌سازی"],
    isVerified: true,
    address: "مشهد، بلوار وکیل‌آباد",
    phone: "051-38000000",
    mobile: "09155555555",
    email: "careers@tapsi.ir",
    linkedin: "https://linkedin.com/company/tapsi",
    instagram: "@tapsi_ir"
  },
  {
    id: 7,
    name: "کافه بازار",
    companyName: "کافه بازار",
    logo: "CB",
    industry: "فناوری اطلاعات",
    location: "تهران",
    description: "اولین و بزرگترین مارکت اپلیکیشن ایرانی با بیش از 40 میلیون کاربر و میزبان هزاران اپلیکیشن و بازی.",
    employeeCount: "101-500 نفر",
    openPositions: 14,
    website: "https://cafebazaar.ir",
    foundedYear: 1389,
    rating: 4.6,
    reviews: 720,
    benefits: ["کتابخانه فنی", "ناهار رایگان", "فضای کاری مدرن", "ساعت انعطاف‌پذیر"],
    isVerified: true,
    address: "تهران، خیابان آزادی",
    phone: "021-88500000",
    mobile: "09126666666",
    email: "jobs@cafebazaar.ir",
    linkedin: "https://linkedin.com/company/cafebazaar",
    instagram: "@cafebazaar"
  },
  {
    id: 8,
    name: "همراه اول",
    companyName: "همراه اول",
    logo: "HO",
    industry: "ارتباطات",
    location: "تهران",
    description: "اولین و بزرگترین اپراتور تلفن همراه ایران با ارائه خدمات پیشرفته مخابراتی و دیجیتال به بیش از 60 میلیون مشترک.",
    employeeCount: "بیش از 500 نفر",
    openPositions: 9,
    website: "https://mci.ir",
    foundedYear: 1373,
    rating: 4.3,
    reviews: 890,
    benefits: ["بیمه تکمیلی", "تخفیف خدمات", "آموزش تخصصی", "محیط پایدار"],
    isVerified: true,
    address: "تهران، میدان انقلاب",
    phone: "021-88100000",
    mobile: "09127777777",
    email: "hr@mci.ir",
    linkedin: "https://linkedin.com/company/mci-iran",
    instagram: "@hamrah_e_avval"
  },
  {
    id: 9,
    name: "ایرانسل",
    companyName: "ایرانسل",
    logo: "IS",
    industry: "ارتباطات",
    location: "تهران",
    description: "دومین اپراتور بزرگ تلفن همراه ایران با ارائه خدمات نوین ارتباطی و اینترنت پرسرعت به میلیون‌ها کاربر.",
    employeeCount: "101-500 نفر",
    openPositions: 16,
    website: "https://irancell.ir",
    foundedYear: 1384,
    rating: 4.1,
    reviews: 650,
    benefits: ["بیمه درمانی", "بونس عملکرد", "آموزش مداوم", "امکانات رفاهی"],
    isVerified: true,
    address: "تهران، خیابان ولیعصر",
    phone: "021-90000000",
    mobile: "09190000000",
    email: "careers@irancell.ir",
    linkedin: "https://linkedin.com/company/irancell",
    instagram: "@irancell_official"
  },
  {
    id: 10,
    name: "پارس آنلاین",
    companyName: "پارس آنلاین",
    logo: "PO",
    industry: "فناوری اطلاعات",
    location: "تهران",
    description: "شرکت پیشرو در زمینه خدمات اینترنت و هاستینگ با بیش از 15 سال تجربه در ارائه خدمات زیرساخت IT.",
    employeeCount: "51-100 نفر",
    openPositions: 8,
    website: "https://parsonline.com",
    foundedYear: 1384,
    rating: 4.4,
    reviews: 320,
    benefits: ["محیط کاری دوستانه", "پروژه‌های چالش‌برانگیز", "رشد حرفه‌ای", "ساعت کاری منعطف"],
    isVerified: true,
    address: "تهران، خیابان کریمخان",
    phone: "021-88880000",
    mobile: "09128888888",
    email: "jobs@parsonline.com",
    linkedin: "https://linkedin.com/company/parsonline",
    instagram: "@parsonline_ir"
  },
  {
    id: 11,
    name: "فولاد مبارکه",
    companyName: "فولاد مبارکه",
    logo: "FM",
    industry: "تولیدی",
    location: "اصفهان",
    description: "بزرگترین تولیدکننده فولاد خاورمیانه با ظرفیت تولید بالا و استانداردهای بین‌المللی کیفیت.",
    employeeCount: "بیش از 500 نفر",
    openPositions: 12,
    website: "https://msc.ir",
    foundedYear: 1350,
    rating: 4.2,
    reviews: 580,
    benefits: ["حقوق رقابتی", "بیمه کامل", "مسکن کارکنان", "امکانات ورزشی"],
    isVerified: true,
    address: "اصفهان، شهرک صنعتی",
    phone: "031-52000000",
    mobile: "09139999999",
    email: "hr@msc.ir",
    linkedin: "https://linkedin.com/company/msc",
    instagram: "@mobarakeh_steel"
  },
  {
    id: 12,
    name: "گروه صنعتی ایران خودرو",
    companyName: "گروه صنعتی ایران خودرو",
    logo: "GI",
    industry: "تولیدی",
    location: "تهران",
    description: "هلدینگ بزرگ خودروسازی ایران شامل شرکت‌های تابعه متعدد در زمینه تولید، قطعه‌سازی و خدمات پس از فروش.",
    employeeCount: "بیش از 500 نفر",
    openPositions: 20,
    website: "https://ikco.ir",
    foundedYear: 1341,
    rating: 4.0,
    reviews: 750,
    benefits: ["بیمه اجتماعی", "سرویس ایاب و ذهاب", "وعده غذایی", "تسهیلات خرید خودرو"],
    isVerified: true,
    address: "تهران، اتوبان کرج",
    phone: "021-44500000",
    mobile: "09121010101",
    email: "recruitment@ikco.ir",
    linkedin: "https://linkedin.com/company/ikco-group",
    instagram: "@ikco_group"
  }
];

// Employer data from company profile + mock data
const employers = [getCompanyData(), ...mockEmployers];

const industries = [
  "همه حوزه‌ها",
  "فناوری اطلاعات",
  "مالی و بانکی",
  "تولیدی",
  "انرژی",
  "ارتباطات",
  "بهداشت و درمان",
  "آموزشی",
  "خرده فروشی",
  "ساخت و ساز",
  "خدماتی",
];

const countries = [
  "همه کشورها",
  "ایران",
  "آلمان",
  "کانادا",
  "استرالیا",
];

const provinces = [
  "همه استان‌ها",
  "تهران",
  "اصفهان",
  "خراسان رضوی",
  "فارس",
  "آذربایجان شرقی",
  "البرز",
];

const cities = [
  "همه شهرها",
  "تهران",
  "اصفهان",
  "مشهد",
  "شیراز",
  "تبریز",
  "کرج",
];

const companySizes = [
  "همه اندازه‌ها",
  "1-10 نفر",
  "11-50 نفر",
  "51-100 نفر",
  "101-500 نفر",
  "بیش از 500 نفر",
];

const companyTypes = [
  "همه انواع",
  "خصوصی",
  "دولتی",
  "نیمه دولتی",
  "استارتاپ",
  "شرکت بین‌المللی",
];

// Helper components
const StarIcon = ({ filled = false }) => (
  <svg
    className={`w-4 h-4 ${filled ? "text-yellow-400" : "text-gray-600"}`}
    fill={filled ? "currentColor" : "none"}
    stroke='currentColor'
    viewBox='0 0 24 24'>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
    />
  </svg>
);

const VerifiedIcon = () => (
  <svg
    className='w-5 h-5 text-blue-400'
    fill='currentColor'
    viewBox='0 0 24 24'>
    <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
  </svg>
);

const LocationIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='16'
    height='16'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className='ml-1'>
    <path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'></path>
    <circle cx='12' cy='10' r='3'></circle>
  </svg>
);

const BuildingIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='16'
    height='16'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className='ml-1'>
    <rect x='4' y='2' width='16' height='20' rx='2' ry='2'></rect>
    <rect x='9' y='22' width='6' height='0'></rect>
    <line x1='9' y1='22' x2='9' y2='18'></line>
    <line x1='15' y1='22' x2='15' y2='18'></line>
    <line x1='10' y1='6' x2='14' y2='6'></line>
    <line x1='10' y1='10' x2='14' y2='10'></line>
    <line x1='10' y1='14' x2='14' y2='14'></line>
  </svg>
);

const UserIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='16'
    height='16'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className='ml-1'>
    <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'></path>
    <circle cx='12' cy='7' r='4'></circle>
  </svg>
);

const BriefcaseIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='16'
    height='16'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className='ml-1'>
    <rect x='2' y='7' width='20' height='14' rx='2' ry='2'></rect>
    <path d='M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16'></path>
  </svg>
);

const SearchIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='20'
    height='20'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'>
    <circle cx='11' cy='11' r='8'></circle>
    <line x1='21' y1='21' x2='16.65' y2='16.65'></line>
  </svg>
);

const FilterIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='20'
    height='20'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'>
    <polygon points='22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3'></polygon>
  </svg>
);

export default function EmployersPage() {
  const [currentEmployers, setCurrentEmployers] = useState(employers);
  const [filteredEmployers, setFilteredEmployers] = useState(employers);
  
  // Filter States
  const [searchFilter, setSearchFilter] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCompanySize, setSelectedCompanySize] = useState("");
  const [selectedCompanyType, setSelectedCompanyType] = useState("");
  
  // Available cities based on selected province
  const availableCities = selectedProvince && selectedProvince !== "" 
    ? cities.filter(city => city === "همه شهرها" || city !== "همه شهرها")
    : cities;

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(filteredEmployers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEmployersPage = filteredEmployers.slice(startIndex, endIndex);

  useEffect(() => {
    filterEmployers();
  }, [searchFilter, selectedIndustry, selectedCountry, selectedProvince, selectedCity, selectedCompanySize, selectedCompanyType, sortBy]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchFilter, selectedIndustry, selectedCountry, selectedProvince, selectedCity, selectedCompanySize, selectedCompanyType, sortBy]);

  const filterEmployers = () => {
    let filtered = [...currentEmployers];

    // Search filter
    if (searchFilter.trim()) {
      filtered = filtered.filter(
        (employer) =>
          employer.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
          employer.industry.toLowerCase().includes(searchFilter.toLowerCase()) ||
          employer.description.toLowerCase().includes(searchFilter.toLowerCase())
      );
    }

    // Industry filter
    if (selectedIndustry && selectedIndustry !== "") {
      filtered = filtered.filter((employer) =>
        employer.industry.includes(selectedIndustry)
      );
    }

    // Country filter (assuming all are in Iran for now)
    if (selectedCountry && selectedCountry !== "") {
      // Add country filtering logic here if needed
    }

    // Province filter (using location field)
    if (selectedProvince && selectedProvince !== "") {
      filtered = filtered.filter((employer) =>
        employer.location.includes(selectedProvince)
      );
    }

    // City filter
    if (selectedCity && selectedCity !== "") {
      filtered = filtered.filter((employer) =>
        employer.location === selectedCity
      );
    }

    // Company size filter
    if (selectedCompanySize && selectedCompanySize !== "") {
      filtered = filtered.filter((employer) =>
        employer.employeeCount === selectedCompanySize
      );
    }

    // Company type filter (add this field to employer data if needed)
    if (selectedCompanyType && selectedCompanyType !== "") {
      // Add company type filtering logic here
    }

    // Sort employers
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return a.foundedYear - b.foundedYear;
        case "most-positions":
          return b.openPositions - a.openPositions;
        case "highest-rating":
          return b.rating - a.rating;
        case "most-employees":
          return b.employeeCount.localeCompare(a.employeeCount);
        case "newest":
        default:
          return b.foundedYear - a.foundedYear;
      }
    });

    setFilteredEmployers(filtered);
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
    <>
      {/* Header */}

      {/* Hero Section */}
      <section className='relative h-[60vh] flex items-center justify-center text-center overflow-hidden'>
        {/* Background Image */}
        <div 
          className='absolute inset-0 bg-cover bg-center bg-no-repeat'
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")'
          }}
        ></div>
        <div className='absolute inset-0 bg-black/30'></div>
        
        <div className='relative z-20 container mx-auto px-6'>
          <h1 className='text-4xl md:text-6xl font-extrabold mb-6 text-white' style={{textShadow: '4px 4px 8px rgba(0,0,0,0.8), 2px 2px 4px rgba(0,0,0,0.9)'}}>
            کارفرمایان برتر ایران
          </h1>
          <p className='max-w-3xl mx-auto text-xl text-gray-200 leading-relaxed' style={{textShadow: '3px 3px 6px rgba(0,0,0,0.8), 1px 1px 3px rgba(0,0,0,0.9)'}}>
            با بزرگترین شرکت‌ها و سازمان‌های پیشرو کشور آشنا شوید و در محیطی حرفه‌ای و پویا کار کنید
          </p>
          
          {/* آمار سریع */}
          <div className='mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
            <div className='bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20'>
              <div className='flex items-center justify-center mb-3'>
                <BuildingIcon className='w-8 h-8 text-yellow-400' />
              </div>
              <div className='text-3xl font-bold text-white mb-1'>
                {currentEmployers.length}+
              </div>
              <div className='text-gray-200 text-sm'>برند معتبر</div>
            </div>
            
            <div className='bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20'>
              <div className='flex items-center justify-center mb-3'>
                <BriefcaseIcon className='w-8 h-8 text-yellow-400' />
              </div>
              <div className='text-3xl font-bold text-white mb-1'>
                {currentEmployers.reduce((acc, emp) => acc + emp.openPositions, 0)}+
              </div>
              <div className='text-gray-200 text-sm'>موقعیت باز</div>
            </div>
            
            <div className='bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20'>
              <div className='flex items-center justify-center mb-3'>
                <UserIcon className='w-8 h-8 text-yellow-400' />
              </div>
              <div className='text-3xl font-bold text-white mb-1'>
                {Math.round(currentEmployers.reduce((acc, emp) => acc + emp.rating, 0) / currentEmployers.length * 10) / 10}
              </div>
              <div className='text-gray-200 text-sm'>امتیاز کیفیت</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <section className='py-12 bg-[#1a1a1a] min-h-screen'>
        <div className='container mx-auto px-6'>
          <div className='flex gap-8'>
            {/* Sidebar */}
            <EmployersSidebar
              searchFilter={searchFilter}
              setSearchFilter={setSearchFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
              selectedIndustry={selectedIndustry}
              setSelectedIndustry={setSelectedIndustry}
              industries={industries}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              countries={countries}
              selectedProvince={selectedProvince}
              setSelectedProvince={setSelectedProvince}
              provinces={provinces}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              availableCities={availableCities}
              selectedCompanySize={selectedCompanySize}
              setSelectedCompanySize={setSelectedCompanySize}
              companySizes={companySizes}
              selectedCompanyType={selectedCompanyType}
              setSelectedCompanyType={setSelectedCompanyType}
              companyTypes={companyTypes}
            />

            {/* Main Content */}
            <div className='flex-1'>
              {/* Results Count */}
              <div className='flex items-center justify-between mb-6'>
                <p className='text-gray-400'>
                  نمایش {startIndex + 1}-{Math.min(endIndex, filteredEmployers.length)} از {filteredEmployers.length} شرکت
                  {totalPages > 1 && (
                    <span className='text-gray-500 text-sm mr-2'>
                      (صفحه {currentPage} از {totalPages})
                    </span>
                  )}
                </p>
              </div>

              {/* Employers Grid */}
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {currentEmployersPage.map((employer) => (
                <div
                  key={employer.id}
                  className='group cursor-pointer bg-gradient-to-br from-black/50 to-black/10 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/hover:border-yellow-400/30 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-400/10'>
                  {/* Header */}
                  <div className='flex items-start justify-between mb-4'>
                    <div className='flex items-center gap-4'>
                      <div className='w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-yellow-600/30 rounded-xl flex items-center justify-center text-yellow-400 font-bold text-xl border border-yellow-400/30'>
                        {employer.logo}
                      </div>
                      <div>
                        <h3 className='text-xl font-bold text-white group-hover:text-yellow-400 transition-colors'>
                          {employer.name}
                        </h3>
                        <p className='text-sm text-gray-400'>
                          {employer.industry}
                        </p>
                      </div>
                    </div>
                    {employer.isVerified && <VerifiedIcon />}
                  </div>

                  {/* Location & Stats */}
                  <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center text-gray-400 text-sm'>
                      <LocationIcon />
                      <span>{employer.location}</span>
                    </div>
                    <div className='flex items-center gap-3'>
                      <div className='flex items-center text-gray-400 text-sm'>
                        <UserIcon />
                        <span>{employer.employeeCount}</span>
                      </div>
                      <div className='flex items-center text-gray-400 text-sm'>
                        <BriefcaseIcon />
                        <span>{employer.openPositions} موقعیت</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className='flex items-center gap-2 mb-4'>
                    <div className='flex items-center gap-1'>
                      {renderStars(employer.rating)}
                    </div>
                    <span className='text-yellow-400 font-semibold'>
                      {employer.rating}
                    </span>
                    <span className='text-gray-400 text-sm'>
                      ({employer.reviews.toLocaleString()} نظر)
                    </span>
                  </div>

                  {/* Description */}
                  <p className='text-gray-400 text-sm mb-4 line-clamp-3'>
                    {employer.description}
                  </p>

                  {/* Benefits Preview */}
                  <div className='mb-6'>
                    <p className='text-sm text-gray-400 mb-2'>مزایای کلیدی:</p>
                    <div className='flex flex-wrap gap-1'>
                      {employer.benefits.slice(0, 2).map((benefit, index) => (
                        <span
                          key={index}
                          className='bg-yellow-400/10 text-yellow-300 text-xs px-2 py-1 rounded-full'>
                          {benefit}
                        </span>
                      ))}
                      {employer.benefits.length > 2 && (
                        <span className='text-gray-500 text-xs px-2 py-1'>
                          +{employer.benefits.length - 2} امتیاز دیگر
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className='flex gap-2'>
                    <Link
                      href={`/employers/${employer.id}`}
                      className='flex-1 bg-yellow-400 text-black py-2 px-4 rounded-lg font-semibold hover:bg-yellow-300 transition-colors text-center'>
                      مشاهده شرکت
                    </Link>
                    <Link
                      href={`/jobs?company=${employer.id}`}
                      className='bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors'>
                      موقعیت‌های شغلی ({employer.openPositions})
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredEmployers.length === 0 && (
              <div className='text-center py-16'>
                <div className='text-gray-400 text-lg mb-4'>
                  هیچ شرکتی یافت نشد
                </div>
                <p className='text-gray-500'>
                  با تغییر فیلترها یا کاهش محدودیت‌های جستجو، شرکت‌های بیشتری را
                  پیدا کنید.
                </p>
              </div>
            )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className='flex justify-center items-center mt-12 gap-2'>
                  {/* Previous Button */}
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      currentPage === 1
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-700 text-white hover:bg-gray-600'
                    }`}
                  >
                    قبلی
                  </button>

                  {/* Page Numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-yellow-500 text-black'
                          : 'bg-gray-700 text-white hover:bg-gray-600'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  {/* Next Button */}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      currentPage === totalPages
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-700 text-white hover:bg-gray-600'
                    }`}
                  >
                    بعدی
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
