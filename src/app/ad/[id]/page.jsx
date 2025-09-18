"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

// Import filtering components

import CustomSelect from "@/components/ui/select/CustomSelect";

// Job categories and filter data
const jobCategories = [
  "برنامه‌نویسی",
  "طراحی گرافیک",
  "بازاریابی",
  "مدیریت پروژه",
  "تکنولوژی اطلاعات",
  "مالی و حسابداری",
  "بازاریابی دیجیتال",
  "منابع انسانی",
  "سایر",
];

// Sample advertisement data (normally would come from API)
const sampleAdvertisements = [
  {
    id: 1,
    title: "آگهی استخدام توسعه‌دهنده React",
    company: "شرکت فناوری اطلاعات پارامکس",
    location: "تهران",
    description:
      "جستجوی توسعه‌دهنده React باتجربه برای پروژه‌های بزرگ. نیازمندی‌ها شامل تجربه عملی حداقل ۳ ساله در توسعه برنامه‌های وب با استفاده از React.js، دانش عمیق به JavaScript و TypeScript، تجربه کار با Redux یا Context API، و آشنایی با Next.js است. مسئولیت‌ها شامل توسعه کامپوننت‌های UI، بهینه‌سازی عملکرد برنامه، و همکاری با تیم بک‌اند برای پیاده‌سازی APIها می‌شود.",
    category: "فناوری اطلاعات",
    specialization: "برنامه‌نویسی وب",
    type: "تمام وقت",
    salary: "۱۵,۰۰۰,۰۰۰ تومان",
    applicants: 12,
    date: "۱۴۰۳/۰۶/۲۰",
    urgent: true,
    gender: "male",
    education: "bachelor",
    experience: "2-5",
    militaryService: "completed",
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
    description:
      "طراحی رابط کاربری جذاب برای اپلیکیشن‌های موبایل. نیازمندی‌ها شامل تجربه حداقل ۲ ساله در طراحی رابط کاربری، مهارت بالا در استفاده از Figma یا Adobe XD، درک عمیق از اصول UX design، و توانایی تولید نمونه‌های اولیه تعاملی (Prototyping) است.",
    category: "طراحی و گرافیک",
    specialization: "طراحی UI/UX",
    type: "پاره وقت",
    salary: "۸,۰۰۰,۰۰۰ تومان",
    applicants: 8,
    date: "۱۴۰۳/۰۶/۱۹",
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
    description:
      "مدیریت محصول برای پلتفرم‌های دیجیتال B2B. مسئولیت‌های کلیدی شامل تحقیقات بازار، تعریف استراتژی محصول، همکاری با تیم‌های مهندسی و طراحی، مدیریت Roadmap محصول، و تحلیل داده‌های کاربران است.",
    category: "مدیریت پروژه",
    specialization: "مدیریت محصول",
    type: "تمام وقت",
    salary: "۱۸,۰۰۰,۰۰۰ تومان",
    applicants: 5,
    date: "۱۴۰۳/۰۶/۱۸",
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
    description:
      "بهینه‌سازی وب‌سایت‌ها و پیاده‌سازی استراتژی‌های بازاریابی دیجیتال. شامل تکنیک‌های SEO پیشرفته، مدیریت تبلیغات گوگل، گوگل آنالیتیکس، و استراتژی‌های محتوایی است.",
    category: "بازاریابی و فروش",
    specialization: "SEO/SEM",
    type: "تمام وقت",
    salary: "۱۲,۰۰۰,۰۰۰ تومان",
    applicants: 15,
    date: "۱۴۰۳/۰۶/۱۷",
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
    description:
      "توسعه سرویس‌های سمت سرور با استفاده از Node.js. شامل طراحی و پیاده‌سازی میکروسرویس‌ها، توسعه RESTful APIها، و ادغام با پایگاه داده‌های مختلف است.",
    category: "فناوری اطلاعات",
    specialization: "پایگاه داده",
    type: "تمام وقت",
    salary: "۱۶,۰۰۰,۰۰۰ تومان",
    applicants: 9,
    date: "۱۴۰۳/۰۶/۱۶",
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
    description:
      "مدیریت فرآیندهای استخدامی و روابط کارکنان. شامل جذب و گزینش داریاران، مدیریت روابط کاری، اجرا برنامه‌های اداری و منابع انسانی است.",
    category: "منابع انسانی",
    specialization: "استخدام و گزینش",
    type: "تمام وقت",
    salary: "۱۱,۰۰۰,۰۰۰ تومان",
    applicants: 22,
    date: "۱۴۰۳/۰۶/۱۵",
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
];

export default function AdvertisementDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [ad, setAd] = useState(null);

  // Filter states for functionality
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [hasBenefits, setHasBenefits] = useState(false);
  const [militaryService, setMilitaryService] = useState(false);
  const [remoteWork, setRemoteWork] = useState(false);

  // Filter function (you would typically call an API here)
  const applyFilters = () => {
    console.log("Applying filters:", {
      selectedCategory,
      selectedLocation,
      hasBenefits,
      militaryService,
      remoteWork,
    });

    // You could filter the advertisements array here
    // const filteredAds = sampleAdvertisements.filter(ad => {
    //   if (selectedCategory && ad.category !== selectedCategory) return false;
    //   if (hasBenefits && !ad.benefits?.length) return false;
    //   if (militaryService && ad.militaryService === 'not-required') return false;
    //   if (remoteWork && !ad.remoteWork) return false;
    //   return true;
    // });

    // For now, just log filters
    if (selectedCategory) {
      console.log(`Filtering by category: ${selectedCategory}`);
    }
    if (hasBenefits) {
      console.log("Filtering by ads with benefits");
    }
    if (militaryService) {
      console.log("Filtering by military service options");
    }
    if (remoteWork) {
      console.log("Filtering by remote work availability");
    }
  };

  useEffect(() => {
    const adId = parseInt(params.id);

    // Find the advertisement by ID
    const foundAd = sampleAdvertisements.find((ad) => ad.id === adId);

    if (foundAd) {
      setAd(foundAd);
    }
  }, [params.id]);

  if (!ad) {
    return (
      <div
        className="min-h-screen bg-[#121212] text-white font-sans flex items-center justify-center"
        dir="rtl"
      >
        <div className="text-center">
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
          <h1 className="text-2xl font-bold text-red-400 mb-4">
            آگهی یافت نشد
          </h1>
          <p className="text-gray-400 mb-6">
            آگهی مورد نظر شما وجود ندارد یا حذف شده است.
          </p>
          <button
            onClick={() => router.back()}
            className="bg-yellow-500 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            بازگشت
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans" dir="rtl">
      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <header className="text-center mb-12 md:mb-16">
          <p className="text-yellow-300 mb-2 text-4xl font-bold">
            {ad.company}
          </p>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Job Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Title Header */}
            <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-700">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-3">{ad.title}</h2>
                  <div className="flex items-center gap-6 text-gray-400">
                    <span>{ad.location}</span>
                    <span>{ad.applicants} متقاضی</span>
                    <span>{ad.date}</span>
                  </div>
                </div>
                {ad.urgent && (
                  <span className="bg-yellow-500/20 text-yellow-400 text-sm px-3 py-1 rounded-full font-medium">
                    فوری
                  </span>
                )}
              </div>
            </div>

            {/* Ultra-Compact Card-Based Layout */}
            <div className="bg-[#1a1a1a] rounded-xl border border-gray-700 overflow-hidden">
              {/* Header Section */}
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4 border-b border-gray-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="w-10 h-10 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-yellow-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0V6a4 4 0 01-4 4H8a4 4 0 01-4-4V6"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white">
                        {ad.title}
                      </h2>
                      <div className="flex items-center space-x-4 space-x-reverse text-xs text-gray-400 mt-1">
                        <span className="flex items-center">
                          <svg
                            className="w-3 h-3 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            ></path>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            ></path>
                          </svg>
                          {ad.location}
                        </span>
                        <span className="flex items-center">
                          <svg
                            className="w-3 h-3 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-6a6 6 0 00-9-5.197m13.5-.5l-2.5 2.5"
                            ></path>
                          </svg>
                          {ad.applicants}
                        </span>
                        <span>{ad.date}</span>
                      </div>
                    </div>
                  </div>
                  {ad.urgent && (
                    <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                      <svg
                        className="w-3 h-3 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        ></path>
                      </svg>
                      فوری
                    </div>
                  )}
                </div>
              </div>

              {/* Complete Job Details Sections */}
              <div className="p-6 space-y-6">
                {/* Job Description */}
                <div className="bg-gray-800/30 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-yellow-300 mb-3 flex items-center border-b border-yellow-500/30 pb-2">
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                    شرح شغلی
                  </h4>
                  <div className="text-white text-sm leading-relaxed whitespace-pre-line">
                    {ad.description}
                  </div>
                </div>

                {/* Requirements Section */}
                {ad.requirements && (
                  <div className="bg-gray-800/30 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-yellow-300 mb-3 flex items-center border-b border-yellow-500/30 pb-2">
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      شرایط و الزامات
                    </h4>
                    <div className="text-white text-sm leading-relaxed whitespace-pre-line">
                      {ad.requirements}
                    </div>
                  </div>
                )}

                {/* Detailed Eligibility Criteria */}
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-yellow-300 mb-4 flex items-center border-b border-yellow-500/30 pb-2">
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4-4-4-2 2"
                      ></path>
                    </svg>
                    شرایط احراز دقیق
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* جنسیت */}
                    <div className="bg-gray-700/30 rounded-lg p-3 text-center">
                      <div className="text-xs text-gray-400 mb-1">جنسیت</div>
                      <div className="text-white text-sm font-medium">
                        {ad.gender === "male"
                          ? "آقا"
                          : ad.gender === "female"
                          ? "خانم"
                          : "آقا و خانم"}
                      </div>
                    </div>

                    {/* تحصیلات */}
                    <div className="bg-gray-700/30 rounded-lg p-3 text-center">
                      <div className="text-xs text-gray-400 mb-1">تحصیلات</div>
                      <div className="text-white text-sm font-medium">
                        {ad.education === "diploma"
                          ? "دیپلم"
                          : ad.education === "associate"
                          ? "کاردانی"
                          : ad.education === "bachelor"
                          ? "کارشناسی"
                          : ad.education === "master"
                          ? "کارشناسی ارشد"
                          : "دکتری"}
                      </div>
                    </div>

                    {/* سابقه کاری */}
                    <div className="bg-gray-700/30 rounded-lg p-3 text-center">
                      <div className="text-xs text-gray-400 mb-1">
                        سابقه کاری
                      </div>
                      <div className="text-white text-sm font-medium">
                        {ad.experience === "fresh"
                          ? "تازه‌کار"
                          : ad.experience === "1-2"
                          ? "۱-۲ سال"
                          : ad.experience === "2-5"
                          ? "۲-۵ سال"
                          : "بیش از ۵ سال"}
                      </div>
                    </div>

                    {/* وضعیت سربازی */}
                    <div className="bg-gray-700/30 rounded-lg p-3 text-center">
                      <div className="text-xs text-gray-400 mb-1">
                        وضعیت سربازی
                      </div>
                      <div className="text-white text-sm font-medium">
                        {ad.militaryService === "completed"
                          ? "پایان خدمت"
                          : ad.militaryService === "exempted"
                          ? "معاف"
                          : "نیازی نیست"}
                      </div>
                    </div>

                    {/* ساعت کاری */}
                    {ad.workHours && (
                      <div className="bg-gray-700/30 rounded-lg p-3 text-center">
                        <div className="text-xs text-gray-400 mb-1">
                          ساعت کاری
                        </div>
                        <div className="text-white text-sm font-medium">
                          {ad.workHours}
                        </div>
                      </div>
                    )}

                    {/* بیمه */}
                    {ad.insurance && (
                      <div className="bg-gray-700/30 rounded-lg p-3 text-center">
                        <div className="text-xs text-gray-400 mb-1">بیمه</div>
                        <div className="text-white text-sm font-medium">
                          {ad.insurance === "full"
                            ? "بیمه کامل"
                            : ad.insurance === "basic"
                            ? "بیمه پایه"
                            : "بدون بیمه"}
                        </div>
                      </div>
                    )}

                    {/* دوره آزمایشی */}
                    {ad.probationPeriod && (
                      <div className="bg-gray-700/30 rounded-lg p-3 text-center">
                        <div className="text-xs text-gray-400 mb-1">
                          دوره آزمایشی
                        </div>
                        <div className="text-white text-sm font-medium">
                          {ad.probationPeriod}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Special Options */}
                  {(ad.remoteWork || ad.travelRequired) && (
                    <div className="mt-4 p-3 bg-gray-700/50 rounded-lg">
                      <div className="text-xs text-gray-400 mb-2 text-center">
                        گزینه‌های ویژه
                      </div>
                      <div className="flex justify-center flex-wrap gap-3">
                        {ad.remoteWork && (
                          <span className="bg-blue-500/20 text-blue-300 text-xs px-3 py-1 rounded-full border border-blue-500/30">
                            امکان دورکاری
                          </span>
                        )}
                        {ad.travelRequired && (
                          <span className="bg-purple-500/20 text-purple-300 text-xs px-3 py-1 rounded-full border border-purple-500/30">
                            نیاز به سفر
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Skills & Benefits Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* مهارت‌های مورد نیاز */}
                  {ad.skills && (
                    <div className="bg-gray-800/30 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-yellow-300 mb-3 flex items-center border-b border-yellow-500/30 pb-2">
                        <svg
                          className="w-4 h-4 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                          ></path>
                        </svg>
                        مهارت‌های مورد نیاز
                      </h4>
                      <div className="text-white text-sm leading-relaxed">
                        {ad.skills}
                      </div>
                    </div>
                  )}

                  {/* مزایا و تسهیلات */}
                  {ad.benefits && ad.benefits.length > 0 && (
                    <div className="bg-gray-800/30 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-yellow-300 mb-3 flex items-center border-b border-yellow-500/30 pb-2">
                        <svg
                          className="w-4 h-4 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          ></path>
                        </svg>
                        مزایا و تسهیلات
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {ad.benefits.map((benefit, index) => (
                          <span
                            key={index}
                            className="bg-yellow-400/15 text-yellow-300 text-xs px-2 py-1 rounded border border-yellow-400/30"
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Responsibilities */}
                {ad.responsibilities && (
                  <div className="bg-gray-800/30 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-yellow-300 mb-3 flex items-center border-b border-yellow-500/30 pb-2">
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 5a2 2 0 012-2h4a2 2 0 012 2v0M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"
                        ></path>
                      </svg>
                      مسئولیت‌ها
                    </h4>
                    <div className="text-white text-sm leading-relaxed whitespace-pre-line">
                      {ad.responsibilities}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Company Info and Application */}
          <div className="space-y-6">
            {/* Company Information */}
            <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4">اطلاعات شرکت</h3>
              <div className="space-y-4">
                <div className="text-center p-4 bg-[#2a2a2a] rounded-lg">
                  <div className="w-16 h-16 bg-yellow-400/10 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-yellow-400"
                    >
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    </svg>
                  </div>
                  <h4 className="font-semibold text-lg">{ad.company}</h4>
                  <p className="text-gray-400 text-sm">{ad.location}</p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <div className="flex justify-between items-center p-2 bg-[#2a2a2a] rounded-lg">
                    <span className="text-gray-400">تحصیلات:</span>
                    <span>
                      {ad.education === "diploma"
                        ? "دیپلم"
                        : ad.education === "associate"
                        ? "کاردانی"
                        : ad.education === "bachelor"
                        ? "کارشناسی"
                        : ad.education === "master"
                        ? "کارشناسی ارشد"
                        : "دکتری"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-[#2a2a2a] rounded-lg">
                    <span className="text-gray-400">حقوق:</span>
                    <span className="text-yellow-300 font-semibold">
                      {ad.salary || "توافقی"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-[#2a2a2a] rounded-lg">
                    <span className="text-gray-400">سابقه:</span>
                    <span>
                      {ad.experience === "fresh"
                        ? "تازه‌کار"
                        : ad.experience === "1-2"
                        ? "۱-۲ سال"
                        : ad.experience === "2-5"
                        ? "۲-۵ سال"
                        : "بیش از ۵ سال"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-[#2a2a2a] rounded-lg">
                    <span className="text-gray-400">وضعیت نظام:</span>
                    <span>
                      {ad.militaryService === "completed"
                        ? "پایان خدمت"
                        : ad.militaryService === "exempted"
                        ? "معاف"
                        : "نیازی نیست"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Section */}
            <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4 text-center">
                علاقه‌مندی به این موقعیت
              </h3>
              <p className="text-gray-400 text-center mb-6 text-sm">
                برای ارسال رزومه خود روی دکمه زیر کلیک کنید
              </p>

              <div className="space-y-4">
                <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-yellow-500/20 transform hover:-translate-y-0.5 transition-all duration-300">
                  ارسال رزومه مستقیم
                </button>

                <div className="flex items-center my-4">
                  <div className="flex-grow border-t border-gray-600"></div>
                  <span className="flex-shrink mx-4 text-gray-500 text-sm">
                    یا
                  </span>
                  <div className="flex-grow border-t border-gray-600"></div>
                </div>

                <button className="w-full bg-[#2a2a2a] hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300">
                  ایجاد پروفایل کاربری
                </button>

                <button
                  onClick={() => router.back()}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300"
                >
                  بازگشت به نتایج
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
