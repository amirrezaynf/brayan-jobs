"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

const sampleAdvertisements = [
  {
    id: 1,
    title: "آگهی استخدام توسعه‌دهنده React",
    company: "شرکت فناوری اطلاعات پارامکس",
    location: "تهران",
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

export default function AdvertisementDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [ad, setAd] = useState(null);

  useEffect(() => {
    const adId = parseInt(params.id);
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
            آگهی مورد نظر شما پیدا نشد یا دیگر موجود نیست.
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
    <div className="bg-[#121212] min-h-screen text-white font-sans" dir="rtl">
      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* --- Header Section --- */}
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500">
            {`استخدام ${ad.title}`}
          </h1>
          <div className="flex items-center justify-center gap-x-6 text-gray-400 text-lg">
            <div className="flex items-center gap-x-2">
              <span>{ad.company}</span>
            </div>
            <div className="flex items-center gap-x-2">
              <span>{ad.location}</span>
            </div>
          </div>
          {ad.urgent && (
            <div className="mt-4 inline-flex items-center gap-2 px-6 py-2 bg-red-500 text-white rounded-full text-sm font-bold">
              در حال استخدام فوری
            </div>
          )}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Description Section */}
            <div className="bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] rounded-xl border border-yellow-500/30 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
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
                </div>
                <h3 className="text-xl font-bold text-white">
                  شرح موقعیت شغلی
                </h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                {ad.description}
              </p>
              <div className="text-sm text-gray-400">
                دسته‌بندی: {ad.category} • تخصص: {ad.specialization}
              </div>
            </div>

            {/* Requirements Section */}
            <div className="bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] rounded-xl border border-yellow-500/30 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
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
                </div>
                <h3 className="text-xl font-bold text-white">
                  الزامات و شرایط
                </h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                {ad.requirements}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {(ad.skills || "").split(", ").map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-300 text-xs px-3 py-1 rounded-full border border-yellow-500/30"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* Responsibilities Section */}
            <div className="bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] rounded-xl border border-yellow-500/30 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
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
                <h3 className="text-xl font-bold text-white">
                  مسئولیت‌ها و وظایف
                </h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                {ad.responsibilities}
              </p>
            </div>
          </div>

          {/* Sidebar - Right Column */}
          <div className="space-y-6">
            {/* Company Info */}
            <div className="bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] rounded-xl border border-yellow-500/30 p-6 sticky top-6">
              <h3 className="text-xl font-bold mb-6 text-center text-white">
                اطلاعات شرکت
              </h3>
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    ></path>
                  </svg>
                </div>
                <h4 className="font-bold text-lg text-white">{ad.company}</h4>
                <p className="text-gray-400 text-sm">{ad.location}</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                  <span className="text-gray-400 text-sm">جنسیت:</span>
                  <span className="text-white font-semibold">
                    {ad.gender === "male"
                      ? "آقا"
                      : ad.gender === "female"
                      ? "خانم"
                      : "آقا و خانم"}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                  <span className="text-gray-400 text-sm">سابقه کاری:</span>
                  <span className="text-white font-semibold">
                    {ad.experience === "0-1"
                      ? "کمتر از یک سال"
                      : ad.experience === "1-2"
                      ? "1 تا 2 سال"
                      : ad.experience === "2-5"
                      ? "2 تا 5 سال"
                      : ad.experience === "5+"
                      ? "بیشتر از 5 سال"
                      : ad.experience}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                  <span className="text-gray-400 text-sm">حقوق:</span>
                  <span
                    className={`font-semibold ${
                      ad.salary.toLowerCase().includes("توافقی")
                        ? "text-green-400"
                        : "text-yellow-300"
                    }`}
                  >
                    {ad.salary}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                  <span className="text-gray-400 text-sm">نوع همکاری:</span>
                  <span className="text-white font-semibold">{ad.type}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                  <span className="text-gray-400 text-sm">تحصیلات:</span>
                  <span className="text-white font-semibold">
                    {ad.education === "bachelor"
                      ? "کارشناسی"
                      : ad.education === "master"
                      ? "کارشناسی ارشد"
                      : ad.education === "associate"
                      ? "کاردانی"
                      : "سایر"}
                  </span>
                </div>
              </div>

              {/* Benefits Section in Sidebar */}
              {ad.benefits && ad.benefits.length > 0 && (
                <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 rounded-lg p-4 border border-yellow-600 mb-6">
                  <h4 className="text-sm font-semibold text-yellow-300 mb-3 flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
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
                    مزایای کلیدی
                  </h4>
                  <div className="space-y-2">
                    {ad.benefits.slice(0, 4).map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <svg
                          className="w-3 h-3 text-yellow-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        <span className="text-gray-300 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Application CTA */}
              <div className="mt-6 pt-6 border-t border-gray-600">
                <button
                  onClick={() => router.push("/karjoo/resume")}
                  className="w-full py-3 px-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold rounded-lg transition-all duration-300 transform hover:scale-105 mb-3"
                >
                  ارسال رزومه
                </button>
                <p className="text-center text-xs text-gray-400">
                  برای درخواست این موقعیت لطفا وارد حساب کاربری خود شوید
                </p>
                <button
                  onClick={() => router.push("/auth?mode=register")}
                  className="w-full mt-2 py-2 px-4 border border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black font-semibold rounded-lg transition-all duration-300"
                >
                  ثبت نام کنید
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
