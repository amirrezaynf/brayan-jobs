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
    <div className="min-h-screen bg-[#121212] text-white font-sans" dir="rtl">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Job Details */}
          <div className="space-y-6">
            <div className="bg-[#1a1a1a] rounded-xl border border-gray-700 overflow-hidden">
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
                        <span>{ad.location}</span>
                        <span>{ad.applicants} متقاضی</span>
                        <span>{ad.date}</span>
                      </div>
                    </div>
                  </div>
                  {ad.urgent && (
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      فوری
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6">
                <div className="bg-gray-800/30 rounded-lg p-4 mb-4">
                  <h4 className="text-sm font-semibold text-yellow-300 mb-3">
                    شرح شغلی
                  </h4>
                  <p className="text-white text-sm leading-relaxed">
                    {ad.description}
                  </p>
                </div>

                <div className="bg-gray-800/30 rounded-lg p-4 mb-4">
                  <h4 className="text-sm font-semibold text-yellow-300 mb-3">
                    الزامات
                  </h4>
                  <p className="text-white text-sm leading-relaxed">
                    {ad.requirements}
                  </p>
                </div>

                <div className="bg-gray-800/30 rounded-lg p-4 mb-4">
                  <h4 className="text-sm font-semibold text-yellow-300 mb-3">
                    مهارت‌های مورد نیاز
                  </h4>
                  <p className="text-white text-sm">{ad.skills}</p>
                </div>

                <div className="bg-gray-800/30 rounded-lg p-4 mb-4">
                  <h4 className="text-sm font-semibold text-yellow-300 mb-3">
                    مزایا و تسهیلات
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {ad.benefits.length > 0 ? (
                      ad.benefits.map((benefit, index) => (
                        <span
                          key={index}
                          className="bg-yellow-400/15 text-yellow-300 text-xs px-2 py-1 rounded border border-yellow-400/30"
                        >
                          {benefit}
                        </span>
                      ))
                    ) : (
                      <span className="text-white text-sm">
                        مزایای خاصی ذکر نشده است
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Company Info */}
          <div className="space-y-6">
            <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4">اطلاعات شرکت</h3>
              <div className="text-center mb-4">
                <h4 className="font-semibold text-lg">{ad.company}</h4>
                <p className="text-gray-400 text-sm">{ad.location}</p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div className="flex justify-between items-center p-2 bg-[#2a2a2a] rounded-lg">
                  <span className="text-gray-400">حقوق:</span>
                  <span className="text-yellow-300 font-semibold">
                    {ad.salary}
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 bg-[#2a2a2a] rounded-lg">
                  <span className="text-gray-400">نوع همکاری:</span>
                  <span>{ad.type}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-[#2a2a2a] rounded-lg">
                  <span className="text-gray-400">جنسیت:</span>
                  <span>
                    {ad.gender === "male"
                      ? "آقا"
                      : ad.gender === "female"
                      ? "خانم"
                      : "آقا و خانم"}
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 bg-[#2a2a2a] rounded-lg">
                  <span className="text-gray-400">تحصیلات:</span>
                  <span>
                    {ad.education === "bachelor"
                      ? "کارشناسی"
                      : ad.education === "master"
                      ? "کارشناسی ارشد"
                      : "سایر"}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4 text-center">
                درخواست همکاری
              </h3>
              <p className="text-gray-400 text-center text-sm mb-4">
                برای درخواست این موقعیت لطفا وارد حساب کاربری خود شوید
              </p>
              <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg transition-colors duration-200">
                🔐 ورود و درخواست همکاری
              </button>
              <div className="text-center mt-4">
                <p className="text-xs text-gray-500 mb-2">
                  حساب کاربری ندارید؟
                </p>
                <button
                  onClick={() => router.push("/auth?mode=register")}
                  className="text-sm text-yellow-400 hover:text-yellow-300 underline"
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
