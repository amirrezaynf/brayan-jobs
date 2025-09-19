"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Import Select Components
import CustomSelect from "@/components/ui/select/CustomSelect";

// Import components as needed
import SalaryRangeSlider from "@/components/ui/range/SalaryRangeInput";

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
      "کیفیت همکاری خوب",
    ],
  },
  {
    id: 6,
    title: "کارشناس منابع انسانی",
    company: "شرکت صنعتی بهین",
    location: "تبریز",
    province: "آذربایجان شرقی",
    description: "مدیریت فرآیندهای استخدامی و روابط کارکنان",
    category: "منابع انسانی",
    specialization: "استخدام و گزینش",
    type: "تمام وقت",
    salary: "۱۱,۰۰۰,۰۰۰ تومان",
    applicants: 22,
    date: "2024-09-06",
    urgent: true,
    gender: "female",
    education: "bachelor",
    experience: "2-5",
    militaryService: "not-required",
    responsibilities:
      "جذب و گزینش کارکنان، برگزاری مصاحبه‌ها، مدیریت ارتباطات کاری، اجرای برنامه‌های انگیزشی، پیگیری امور اداری کارکنان",
    requirements:
      "تجربه حداقل ۲ سال منابع انسانی، مهارت مصاحبه و ارزیابی، توانمند در MS Office، مهارت ارتباطی بالا، درک روانشناسی سازمانی",
    skills:
      "HR Management, Recruitment, Employee Relations, MS Office, Communication",
    benefits: [
      "کیفیت همکاری مناسب",
      "زمان انعطاف‌پذیر",
      "تمام مزایای قانونی",
      "محیط کاری آرام",
    ],
  },
  {
    id: 7,
    title: "برنامه‌نویس Full Stack",
    company: "استارتاپ فن‌دون",
    location: "اصفهان",
    province: "اصفهان",
    description: "توسعه پروژه‌های بزرگ با تکنولوژی‌های مدرن",
    category: "فناوری اطلاعات",
    specialization: "برنامه‌نویسی وب",
    type: "تمام وقت",
    salary: "توافقی",
    applicants: 7,
    date: "2024-09-05",
    urgent: false,
    gender: "both",
    education: "bachelor",
    experience: "2-5",
    militaryService: "completed",
    responsibilities:
      "توسعه کامل برنامه‌های وب، کار با فریمورک‌های مدرن، پیاده‌سازی فوی Frontend و Backend، بهینه‌سازی عملکرد، همکاری تیمی",
    requirements:
      "تجربه در React/Node.js، آشنایی با MongoDB، تجربه Docker، مهارت Git، درک معماری MVC",
    skills: "React.js, Node.js, MongoDB, Docker, Git, Full Stack Development",
    benefits: [
      "محیط پویا و نوآورانه",
      "یادگیری تکنولوژی‌های جدید",
      "کیفیت کار متناسب با سن",
      "تسهیلات مناسب",
    ],
  },
  {
    id: 8,
    title: "مدیر بازاریابی دیجیتال",
    company: "آژانس تبلیغاتی راهکار",
    location: "تهران",
    province: "تهران",
    description: "مدیریت استراتژی بازاریابی دیجیتال و فروش آنلاین",
    category: "بازاریابی و فروش",
    specialization: "بازاریابی دیجیتال",
    type: "تمام وقت",
    salary: "توافقی",
    applicants: 14,
    date: "2024-09-04",
    urgent: false,
    gender: "both",
    education: "master",
    experience: "5+",
    militaryService: "completed",
    responsibilities:
      "مدیریت استراتژی بازاریابی دیجیتال، اجرای کمپین‌های تبلیغاتی، تحلیل رده‌ها و داده‌های فروش، توسعه استراتژی‌های جدید، رهبری تیم بازاریابی، گزارش‌دهی به مدیریت ارشد",
    requirements:
      "۵+ سال تجربه بازاریابی دیجیتال، مهارت پیشرفته گوگل آنالیتیکس، تجربه مدیریت تیم، درک SEO و SEM پیشرفته، مهارت ارتباطات عالی",
    skills:
      "Digital Marketing, Google Analytics, SEO/SEM, Team Leadership, Strategy Planning",
    benefits: [
      "درآمد جذاب",
      "کیفیت کار در آژانس برتر",
      "زمان کاری انعطاف‌پذیر",
      "آموزش و توسعه مداوم",
      "بیمه کامل",
    ],
  },
  {
    id: 9,
    title: "کارشناس حسابداری",
    company: "شرکت بازرگانی رازی",
    location: "رشت",
    province: "گیلان",
    description: "مدیریت حسابداری و امور مالی شرکت",
    category: "مالی و حسابداری",
    specialization: "حسابداری",
    type: "دورکاری",
    salary: "۱۴,۰۰۰,۰۰۰ تومان",
    applicants: 6,
    date: "2024-09-03",
    urgent: false,
    gender: "both",
    education: "bachelor",
    experience: "2-5",
    militaryService: "both",
    responsibilities:
      "مدیریت حسابداری، تهیه گزارش‌های مالی، کنترل بودجه، رسیدگی به امور مالیاتی",
    requirements:
      "تجربه در حسابداری حداقل ۲ سال، آشنا با قوانین مالیاتی، مهارت کار با نرم‌افزارهای حسابداری",
    skills: "حسابداری، مالیات، نرم‌افزارهای حسابداری",
    benefits: ["دورکاری", "پایه ثابت", "بیمه کامل"],
  },
  {
    id: 10,
    title: "نماینده فروش",
    company: "شرکت پتروشیمی دلتا",
    location: "اهواز",
    province: "خوزستان",
    description: "فروش محصولات پتروشیمی و ارتباط با مشتریان",
    category: "بازاریابی و فروش",
    specialization: "فروش مستقیم",
    type: "قراردادی",
    salary: "۱۳,۰۰۰,۰۰۰ تومان",
    applicants: 11,
    date: "2024-09-02",
    urgent: false,
    gender: "male",
    education: "associate",
    experience: "1-2",
    militaryService: "completed",
    responsibilities:
      "فروش محصولات شرکت، ارتباط با مشتریان، پیگیری سفارشات، گزارش‌گیری فروش",
    requirements: "تجربه فروش، توانمند در ارتباطات، آشنا با حوزه پتروشیمی",
    skills: "فروش، ارتباطات، مشتری‌مداری",
    benefits: ["پورسانت فروش", "بیمه درمانی", "وسیله نقلیه شرکت"],
  },
];

export default function AdvertisementPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [ads, setAds] = useState([]);
  const [filteredAds, setFilteredAds] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [salaryRange, setSalaryRange] = useState([5000000, 50000000]); // Default salary range
  const [showNegotiable, setShowNegotiable] = useState(false); // Default: show all salaries (both negotiable and fixed)
  const [showNoLimit, setShowNoLimit] = useState(false); // Default: apply normal salary limits
  const [showRangeFilter, setShowRangeFilter] = useState(false); // Default: show range filter option
  const [selectedProvince, setSelectedProvince] = useState(""); // New filter for province
  const [selectedEmploymentType, setSelectedEmploymentType] = useState(""); // New filter for employment type

  // Get search parameters
  const userType = searchParams.get("userType");
  const jobCategory = searchParams.get("jobCategory");
  const specialization = searchParams.get("specialization");
  const country = searchParams.get("country");
  const province = searchParams.get("province");
  const city = searchParams.get("city");

  useEffect(() => {
    // Load both sample advertisements and user-created jobs from localStorage
    let allAds = [...sampleAdvertisements];

    // Debug: Log the current state of localStorage
    console.log("بارگذاری آگهی‌ها در صفحه advertisements");
    console.log("بررسی localStorage موجود:");

    // Load posted jobs from localStorage
    if (typeof window !== "undefined") {
      const savedJobs = localStorage.getItem("allJobs");
      if (savedJobs) {
        const parsedJobs = JSON.parse(savedJobs);
        console.log(
          "آگهی‌های ذخیره شده در localStorage 'allJobs':",
          parsedJobs
        );
        // Filter out jobs that are already in sampleAdvertisements (avoid duplicates)
        const newJobs = parsedJobs.filter(
          (job) =>
            !sampleAdvertisements.some(
              (sample) =>
                sample.title === job.title && sample.company === job.company
            )
        );
        allAds = [...allAds, ...newJobs];
      }

      // Also load from postedJobs localStorage
      const postedJobs = localStorage.getItem("postedJobs");
      if (postedJobs) {
        const parsedPostedJobs = JSON.parse(postedJobs);
        console.log(
          "آگهی‌های ذخیره شده در localStorage 'postedJobs':",
          parsedPostedJobs
        );
        const newPostedJobs = parsedPostedJobs.filter(
          (job) => !allAds.some((ad) => ad.id === job.id) // Avoid duplicates
        );
        allAds = [...allAds, ...newPostedJobs];
      }
    }

    console.log("کل آگهی‌های بارگذاری شده برای نمایش:", allAds);

    // Filter by category if specified
    let filtered = [...allAds];
    if (jobCategory) {
      filtered = filtered.filter((ad) => ad.category === jobCategory);
    }

    // Filter by specialization if specified
    if (specialization) {
      filtered = filtered.filter((ad) => ad.specialization === specialization);
    }

    setFilteredAds(filtered);
    setAds(filtered);
  }, [jobCategory, specialization]);

  // Apply basic filters
  useEffect(() => {
    let result = [...filteredAds];

    // Text search
    if (searchFilter) {
      result = result.filter(
        (ad) =>
          ad.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
          ad.company.toLowerCase().includes(searchFilter.toLowerCase()) ||
          ad.description.toLowerCase().includes(searchFilter.toLowerCase())
      );
    }

    // Category filter
    const activeCategory =
      jobCategory ||
      (selectedCategory && selectedCategory !== "همه"
        ? selectedCategory
        : null);
    if (activeCategory) {
      result = result.filter((ad) => ad.category === activeCategory);
    }

    // Province filter
    if (selectedProvince && selectedProvince !== "همه") {
      result = result.filter((ad) => ad.province === selectedProvince);
    }

    // Employment type filter
    if (selectedEmploymentType && selectedEmploymentType !== "همه") {
      result = result.filter((ad) => ad.type === selectedEmploymentType);
    }

    // Salary range and negotiable filter
    result = result.filter((ad) => {
      // Check if the salary is negotiable
      const isNegotiableSalary = ad.salary.toLowerCase().includes("توافقی");

      // If showNoLimit is enabled, show all jobs without salary filtering
      if (showNoLimit) {
        return true;
      }

      // If showNegotiable is enabled, show only negotiable jobs
      if (showNegotiable) {
        return isNegotiableSalary;
      }

      // If showRangeFilter is enabled, show only fixed salary jobs within range
      if (showRangeFilter) {
        if (isNegotiableSalary) {
          return false; // Exclude negotiable jobs when filtering by range
        }
        // Parse the Persian salary string to numbers
        const persianDigits = ad.salary.match(/[\u06F0-\u06F9]/g);
        if (!persianDigits) return false; // Exclude if no valid digits found

        // Convert Persian digits to English digits
        const englishDigits = persianDigits
          .map((digit) => {
            const charCode = digit.charCodeAt(0);
            const baseCharCode = "\u06F0".charCodeAt(0);
            return String(charCode - baseCharCode);
          })
          .join("");

        const salaryNum = parseInt(englishDigits, 10);

        return salaryNum >= salaryRange[0] && salaryNum <= salaryRange[1];
      }

      // Default case (no specific filter enabled) - show all ads
      if (isNegotiableSalary) {
        return true; // Include negotiable jobs when no specific filter is enabled
      }

      // For fixed salaries in default case, apply range filter
      // Parse the Persian salary string to numbers
      const persianDigits = ad.salary.match(/[\u06F0-\u06F9]/g);
      if (!persianDigits) return false; // Exclude if no valid digits found

      // Convert Persian digits to English digits
      const englishDigits = persianDigits
        .map((digit) => {
          const charCode = digit.charCodeAt(0);
          const baseCharCode = "\u06F0".charCodeAt(0);
          return String(charCode - baseCharCode);
        })
        .join("");

      const salaryNum = parseInt(englishDigits, 10);

      return salaryNum >= salaryRange[0] && salaryNum <= salaryRange[1];
    });

    // Sort
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
    jobCategory || "",
  ]);

  // Function to convert Gregorian to Jalali (Persian) date
  const toJalali = (gregorianDate) => {
    const gDate = new Date(gregorianDate);
    return gDate.toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleViewAd = (adId) => {
    router.push(`/ad/${adId}`);
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

  return (
    <div className="min-h-screen dark-bg py-8" dir="rtl">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            نتایج جستجو آگهی‌ها
          </h1>
          <p className="text-gray-400">
            {ads.length} آگهی پیدا شد
            {jobCategory && ` در دسته ${jobCategory}`}
          </p>
        </div>

        {/* Search and Sort Bar */}
        <div className="bg-[#2a2a2a] rounded-xl p-6 mb-8 border border-gray-700">
          <div>
            {/* Main Search Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
              <div className="md:col-span-2">
                <input
                  type="text"
                  placeholder="جستجو در عنوان، شرکت یا توضیحات..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="">انتخاب دسته شغلی</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="flex-1 bg-[#2a2a2a] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="newest">جدیدترین</option>
                  <option value="oldest">قدیمی‌ترین</option>
                  <option value="most-applied">بیشترین متقاضی</option>
                </select>
                <button
                  onClick={() => {
                    setSearchFilter("");
                    setSelectedCategory("");
                    setSelectedProvince("");
                    setSelectedEmploymentType("");
                    setSortBy("newest");
                    setSalaryRange([5000000, 50000000]);
                    setShowNegotiable(false);
                    setShowNoLimit(false);
                    setShowRangeFilter(false);
                  }}
                  className="bg-[#2a2a2a] hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition-colors duration-200 border border-gray-600"
                >
                  پاک کردن
                </button>
              </div>
            </div>

            {/* Additional Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <select
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value)}
                  className="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="">انتخاب استان</option>
                  {provinces.map((province) => (
                    <option key={province} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  value={selectedEmploymentType}
                  onChange={(e) => setSelectedEmploymentType(e.target.value)}
                  className="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="">انتخاب نوع همکاری</option>
                  {employmentTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Salary Range Slider - Now Below */}
            <div className="border-t border-gray-600 pt-4">
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
          </div>
        </div>

        {/* Main Content - Results */}
        <div className="w-full">
          {ads.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ads.map((ad) => (
                <div
                  key={ad.id}
                  className="bg-[#2a2a2a] rounded-xl p-4 border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 relative overflow-hidden shadow-lg min-h-[240px] flex flex-col"
                >
                  {ad.urgent && (
                    <span className="absolute top-2 left-2 bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded-full whitespace-nowrap z-10">
                      فوری
                    </span>
                  )}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          className="text-yellow-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                          />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-bold text-white truncate mb-1">
                          {ad.title}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-gray-400 mb-2">
                          <span className="flex items-center gap-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                              <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            {ad.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                              <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            {ad.applicants}
                          </span>
                        </div>
                        <p className="text-xs md:text-sm text-gray-300 line-clamp-2 mb-3">
                          {ad.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">
                            {ad.company}
                          </span>
                          <span className="text-sm text-gray-500">
                            {toJalali(ad.date)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
                    <div className="flex items-center gap-2">
                      <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded-full font-medium">
                        {ad.category}
                      </span>
                      <span className="text-sm text-gray-400">{ad.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400 font-bold">
                        {ad.salary}
                      </span>
                      <button
                        onClick={() => handleViewAd(ad.id)}
                        className="bg-yellow-500 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-sm"
                      >
                        مشاهده
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <svg
                className="w-16 h-16 text-gray-600 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                هیچ آگهی‌ای یافت نشد
              </h3>
              <p className="text-gray-500 mb-6">
                هیچ آگهی‌ای با معیارهای جستجوی شما مطابقت ندارد. فیلترها را
                تغییر دهید.
              </p>
              <button
                onClick={() => router.push("/")}
                className="bg-yellow-500 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                بازگشت به صفحه اصلی
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
