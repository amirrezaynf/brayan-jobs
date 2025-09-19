"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function AdvertisementSingleClient({ adId }) {
  const router = useRouter();
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load ad data from localStorage
    if (typeof window !== "undefined") {
      try {
        // Load from allJobs localStorage
        const savedJobs = JSON.parse(localStorage.getItem("allJobs") || "[]");
        const foundAd = savedJobs.find((job) => job.id === adId);

        if (foundAd) {
          setAd(foundAd);
        } else {
          // Fallback to search in postedJobs
          const postedJobs = JSON.parse(
            localStorage.getItem("postedJobs") || "[]"
          );
          const postedAd = postedJobs.find((job) => job.id === adId);
          if (postedAd) {
            setAd(postedAd);
          } else {
            // If still no ad found, create mock ads for demo purposes
            const demoAds = {
              1: {
                id: 1,
                title: "آگهی استخدام توسعه‌دهنده React",
                company: "شرکت فناوری اطلاعات پارامکس",
                location: "تهران",
                province: "تهران",
                description:
                  "جستجوی توسعه‌دهنده React باتجربه برای پروژه‌های بزرگ",
                category: "فناوری اطلاعات",
                specialization: "برنامه‌نویسی وب",
                type: "full-time",
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
                requirements:
                  "آشنایی کامل با React و Hooks، تجربه با TypeScript، دانش HTML/CSS پیشرفته، تجربه کار با Git، آشنایی با RESTful APIs",
                skills: "React.js, TypeScript, HTML/CSS, Git, REST APIs",
                benefits: [
                  "بیمه درمانی کامل",
                  "تسهیلات ورزشی",
                  "دوره‌های آموزشی",
                  "کیفیت کار برتر",
                ],
                responsibilities:
                  "توسعه و پیادهسازی کامپوننت‌های React، بهینه‌سازی عملکرد، همکاری با تیم طراحی UX/UI، نوشتن تست‌های واحد و یکپارچه، استقرار و نگهداری برنامه‌ها",
              },
              2: {
                id: 2,
                title: "طراح UI/UX برای اپلیکیشن موبایل",
                company: "استارتاپ تهیکس",
                location: "اصفهان",
                province: "اصفهان",
                description: "طراحی رابط کاربری جذاب برای اپلیکیشن‌های موبایل",
                category: "طراحی و گرافیک",
                specialization: "طراحی UI/UX",
                type: "part-time",
                salary: "۸,۰۰۰,۰۰۰ تومان",
                applicants: 8,
                date: "2024-09-10",
                urgent: false,
                gender: "both",
                education: "associate",
                experience: "2-5",
                militaryService: "not-required",
                workHours: "۹ صبح تا ۶ عصر",
                insurance: "full",
                probationPeriod: "۲ ماه",
                remoteWork: false,
                travelRequired: false,
                requirements:
                  "مهارت بالا در Figma، دانش اصول UX design، تجربه طراحی هم‌رسان، توانایی هماهنگی با توسعه‌دهندگان",
                skills: "Figma, Adobe XD, Sketch, Prototyping, Mobile Design",
                benefits: [
                  "دسترسی به ابزارهای پیشرفته",
                  "تجربه کاری در استارتاپ",
                  "کیفیت کار پویا",
                ],
                responsibilities:
                  "طراحی رابط کاربری برای اپلیکیشن‌های موبایل، ایجاد پروتوتیپ‌های تعاملی، همکاری با تیم توسعه برای پیاده‌سازی طراحی، انجام تست‌های کاربری، و بهبود تجربه کاربری بر اساس بازخوردها",
              },
              3: {
                id: 3,
                title: "مدیر محصول دیجیتال",
                company: "شرکت بازرگانی پارسه",
                location: "مشهد",
                province: "خراسان رضوی",
                description: "مدیریت محصول برای پلتفرم‌های دیجیتال B2B",
                category: "مدیریت پروژه",
                specialization: "مدیریت محصول",
                type: "full-time",
                salary: "۱۸,۰۰۰,۰۰۰ تومان",
                applicants: 5,
                date: "2024-09-09",
                urgent: true,
                gender: "both",
                education: "master",
                experience: "5+",
                militaryService: "completed",
                workHours: "۸ صبح تا ۵ عصر",
                insurance: "full",
                probationPeriod: "۳ ماه",
                remoteWork: false,
                travelRequired: true,
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
                responsibilities:
                  "تحقیق و تحلیل市场需求، تعریف استراتژی محصول، مدیریت محصول پیشرفته، همکاری با تیم‌های فنی، نظارت بر توسعه محصول، تحلیل عملکرد محصول از طریق داده‌ها",
              },
              4: {
                id: 4,
                title: "کارشناس سئو و بازاریابی دیجیتال",
                company: "آژانس تبلیغات مدیا",
                location: "شیراز",
                province: "فارس",
                description:
                  "بهینه‌سازی وب‌سایت‌ها و پیاده‌سازی استراتژی‌های بازاریابی دیجیتال",
                category: "بازاریابی و فروش",
                specialization: "SEO/SEM",
                type: "full-time",
                salary: "۱۲,۰۰۰,۰۰۰ تومان",
                applicants: 15,
                date: "2024-09-08",
                urgent: false,
                gender: "both",
                education: "bachelor",
                experience: "2-5",
                militaryService: "exempted",
                workHours: "۹ صبح تا ۶ عصر",
                insurance: "full",
                probationPeriod: "۲ ماه",
                remoteWork: true,
                travelRequired: false,
                requirements:
                  "مهارت‌های SEO پیشرفته، تجربه تبلیغات گوگل، توانمند در گوگل آنالیتیکس، درک دیجیتال مارکهای، مهارت تولید محتوا",
                skills:
                  "SEO, Google Ads, Google Analytics, Content Marketing, SEM",
                benefits: [
                  "آموزش‌های مستمر",
                  "کیفیت پروژه‌های متنوع",
                  "کیفیت همکاری مناسب",
                  "زمان انعطاف‌پذیر",
                ],
                responsibilities:
                  "اجرای استراتژی‌های SEO، اجرای تبلیغات گوگل، مدیریت کمپین‌های دیجیتال، تحلیل عملکرد محتوا، تولید گزارش‌های تحلیلی، بهینه‌سازی نرخ تبدیل",
              },
              5: {
                id: 5,
                title: "توسعه‌دهنده Node.js - Backend",
                company: "شرکت نرم‌افزاری آپادانا",
                location: "کرج",
                province: "البرز",
                description: "توسعه سرویس‌های سمت سرور با استفاده از Node.js",
                category: "فناوری اطلاعات",
                specialization: "پایگاه داده",
                type: "full-time",
                salary: "۱۶,۰۰۰,۰۰۰ تومان",
                applicants: 9,
                date: "2024-09-07",
                urgent: false,
                gender: "male",
                education: "bachelor",
                experience: "2-5",
                militaryService: "completed",
                workHours: "۹ صبح تا ۶ عصر",
                insurance: "full",
                probationPeriod: "۳ ماه",
                remoteWork: false,
                travelRequired: false,
                requirements:
                  "تسلط کامل به Node.js، تجربه ادغام فرهنگستان حداقل ۲ سال، مهارت پایگاه داده‌های SQL/NoSQL، دانش اصول RESTful API",
                skills:
                  "Node.js, Express.js, MongoDB, PostgreSQL, Docker, REST API",
                benefits: [
                  "محیط کاری پویا",
                  "کیفیت پروژه‌های پیشرفته",
                  "دسترسی به تکنولوژی‌های نوین",
                  "کیفیت همکاری خوب",
                ],
                responsibilities:
                  "طراحی و توسعه میکروسرویس‌ها، پیادهسازی APIهای RESTful، ادغام با انواع پایگاه داده‌ها، بهینه‌سازی عملکرد سرور، تست و عیب‌یابی سیستم‌ها",
              },
              6: {
                id: 6,
                title: "کارشناس منابع انسانی",
                company: "شرکت صنعتی بهین",
                location: "تبریز",
                province: "آذربایجان شرقی",
                description: "مدیریت فرآیندهای استخدامی و روابط کارکنان",
                category: "منابع انسانی",
                specialization: "استخدام و گزینش",
                type: "full-time",
                salary: "۱۱,۰۰۰,۰۰۰ تومان",
                applicants: 22,
                date: "2024-09-06",
                urgent: true,
                gender: "female",
                education: "bachelor",
                experience: "2-5",
                militaryService: "not-required",
                workHours: "۸ صبح تا ۵ عصر",
                insurance: "full",
                probationPeriod: "۲ ماه",
                remoteWork: false,
                travelRequired: false,
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
                responsibilities:
                  "جذب و گزینش کارکنان، برگزاری مصاحبه‌ها، مدیریت ارتباطات کاری، اجرای برنامه‌های انگیزشی، پیگیری امور اداری کارکنان",
              },
              7: {
                id: 7,
                title: "برنامه‌نویس Full Stack",
                company: "استارتاپ فن‌دون",
                location: "اصفهان",
                province: "اصفهان",
                description: "توسعه پروژه‌های بزرگ با تکنولوژی‌های مدرن",
                category: "فناوری اطلاعات",
                specialization: "برنامه‌نویسی وب",
                type: "full-time",
                salary: "توافقی",
                applicants: 7,
                date: "2024-09-05",
                urgent: false,
                gender: "both",
                education: "bachelor",
                experience: "2-5",
                militaryService: "completed",
                workHours: "۹ صبح تا ۶ عصر",
                insurance: "full",
                probationPeriod: "۳ ماه",
                remoteWork: true,
                travelRequired: false,
                requirements:
                  "تجربه در React/Node.js، آشنایی با MongoDB، تجربه Docker، مهارت Git، درک معماری MVC",
                skills:
                  "React.js, Node.js, MongoDB, Docker, Git, Full Stack Development",
                benefits: [
                  "محیط پویا و نوآورانه",
                  "یادگیری تکنولوژی‌های جدید",
                  "کیفیت کار متناسب با سن",
                  "تسهیلات مناسب",
                ],
                responsibilities:
                  "توسعه کامل برنامه‌های وب، کار با فریمورک‌های مدرن، پیاده‌سازی فوی Frontend و Backend، بهینه‌سازی عملکرد، همکاری تیمی",
              },
              8: {
                id: 8,
                title: "مدیر بازاریابی دیجیتال",
                company: "آژانس تبلیغاتی راهکار",
                location: "تهران",
                province: "تهران",
                description: "مدیریت استراتژی بازاریابی دیجیتال و فروش آنلاین",
                category: "بازاریابی و فروش",
                specialization: "بازاریابی دیجیتال",
                type: "full-time",
                salary: "توافقی",
                applicants: 14,
                date: "2024-09-04",
                urgent: false,
                gender: "both",
                education: "master",
                experience: "5+",
                militaryService: "completed",
                workHours: "۸ صبح تا ۵ عصر",
                insurance: "full",
                probationPeriod: "۴ ماه",
                remoteWork: false,
                travelRequired: true,
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
                responsibilities:
                  "مدیریت استراتژی بازاریابی دیجیتال، اجرای کمپین‌های تبلیغاتی، تحلیل رده‌ها و داده‌های فروش، توسعه استراتژی‌های جدید، رهبری تیم بازاریابی، گزارش‌دهی به مدیریت ارشد",
              },
              9: {
                id: 9,
                title: "کارشناس حسابداری",
                company: "شرکت بازرگانی رازی",
                location: "رشت",
                province: "گیلان",
                description: "مدیریت حسابداری و امور مالی شرکت",
                category: "مالی و حسابداری",
                specialization: "حسابداری",
                type: "remote",
                salary: "۱۴,۰۰۰,۰۰۰ تومان",
                applicants: 6,
                date: "2024-09-03",
                urgent: false,
                gender: "both",
                education: "bachelor",
                experience: "2-5",
                militaryService: "both",
                workHours: "۸ صبح تا ۵ عصر",
                insurance: "basic",
                probationPeriod: null,
                remoteWork: true,
                travelRequired: false,
                requirements:
                  "تجربه در حسابداری حداقل ۲ سال، آشنا با قوانین مالیاتی، مهارت کار با نرم‌افزارهای حسابداری",
                skills: "حسابداری، مالیات، نرم‌افزارهای حسابداری",
                benefits: ["دورکاری", "پایه ثابت", "بیمه کامل"],
                responsibilities:
                  "مدیریت حسابداری، تهیه گزارش‌های مالی، کنترل بودجه، رسیدگی به امور مالیاتی",
              },
              10: {
                id: 10,
                title: "نماینده فروش",
                company: "شرکت پتروشیمی دلتا",
                location: "اهواز",
                province: "خوزستان",
                description: "فروش محصولات پتروشیمی و ارتباط با مشتریان",
                category: "بازاریابی و فروش",
                specialization: "فروش مستقیم",
                type: "contract",
                salary: "۱۳,۰۰۰,۰۰۰ تومان",
                applicants: 11,
                date: "2024-09-02",
                urgent: false,
                gender: "male",
                education: "associate",
                experience: "1-2",
                militaryService: "completed",
                workHours: "۸ صبح تا ۵ عصر",
                insurance: "full",
                probationPeriod: "۲ ماه",
                remoteWork: false,
                travelRequired: true,
                requirements:
                  "تجربه فروش، توانمند در ارتباطات، آشنا با حوزه پتروشیمی",
                skills: "فروش، ارتباطات، مشتری‌مداری",
                benefits: ["پورسانت فروش", "بیمه درمانی", "وسیله نقلیه شرکت"],
                responsibilities:
                  "فروش محصولات شرکت، ارتباط با مشتریان، پیگیری سفارشات، گزارش‌گیری فروش",
              },
            };

            if (demoAds[adId]) {
              setAd(demoAds[adId]);
            } else {
              setAd(null);
            }
          }
        }
      } catch (error) {
        console.error("Error loading ad:", error);
        setAd(null);
      } finally {
        setLoading(false);
      }
    }
  }, [adId]);

  if (loading) {
    return (
      <div className='min-h-screen dark-bg py-8 flex items-center justify-center'>
        <div className='text-white'>در حال بارگذاری آگهی...</div>
      </div>
    );
  }

  if (!ad) {
    return (
      <div className='min-h-screen dark-bg py-8' dir='rtl'>
        <div className='container mx-auto px-6'>
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
            <h3 className='text-2xl font-bold text-gray-300 mb-2'>
              آگهی یافت نشد
            </h3>
            <p className='text-gray-500 mb-6'>
              آگهی مورد نظر وجود ندارد یا غیرقابل دسترس است.
            </p>
            <button
              onClick={() => router.push("/advertisements")}
              className='bg-yellow-500 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-medium transition-colors duration-200'>
              بازگشت به آگهی‌ها
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Format benefits array for display
  const formatBenefits = (benefits) => {
    if (!benefits) return "";
    if (Array.isArray(benefits)) {
      return benefits.join(" • ");
    }
    if (typeof benefits === "string") {
      return benefits
        .split("\n")
        .filter((b) => b.trim())
        .join(" • ");
    }
    return benefits;
  };

  // Convert type values to Persian
  const getTypeText = (type) => {
    switch (type) {
      case "full-time":
        return "تمام وقت";
      case "part-time":
        return "پاره وقت";
      case "contract":
        return "قراردادی";
      case "freelance":
        return "فریلنسری";
      case "remote":
        return "دورکاری";
      default:
        return type;
    }
  };

  // Convert education values to Persian
  const getEducationText = (education) => {
    switch (education) {
      case "diploma":
        return "دیپلم";
      case "associate":
        return "کاردانی";
      case "bachelor":
        return "کارشناسی";
      case "master":
        return "کارشناسی ارشد";
      case "phd":
        return "دکتری";
      default:
        return education;
    }
  };

  // Convert experience values to Persian
  const getExperienceText = (experience) => {
    switch (experience) {
      case "fresh":
        return "تازه‌کار";
      case "1-2":
        return "۱-۲ سال";
      case "2-5":
        return "۲-۵ سال";
      case "5+":
        return "بیش از ۵ سال";
      default:
        return experience;
    }
  };

  // Convert military service values to Persian
  const getMilitaryText = (military) => {
    switch (military) {
      case "completed":
        return "پایان خدمت";
      case "exempt":
        return "معاف";
      case "not-required":
        return "نیازی نیست";
      default:
        return military;
    }
  };

  // Convert gender values to Persian
  const getGenderText = (gender) => {
    switch (gender) {
      case "male":
        return "آقا";
      case "female":
        return "خانم";
      case "both":
        return "آقا و خانم";
      default:
        return gender;
    }
  };

  // Convert insurance values to Persian
  const getInsuranceText = (insurance) => {
    switch (insurance) {
      case "full":
        return "بیمه کامل";
      case "basic":
        return "بیمه پایه";
      case "none":
        return "بدون بیمه";
      default:
        return insurance;
    }
  };

  return (
    <div
      className='min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f] relative overflow-hidden'
      dir='rtl'>
      {/* Background Elements */}
      <div className='absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-blue-500/5'></div>
      <div className='absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-yellow-400/10 to-transparent rounded-full blur-3xl'></div>
      <div className='absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-400/10 to-transparent rounded-full blur-3xl'></div>

      <div className='relative z-10 py-8'>
        <div className='container mx-auto px-6'>
          {/* Hero Section */}
          <div className='relative bg-gradient-to-br from-[#2a2a2a]/80 to-[#1a1a1a]/80 backdrop-blur-xl rounded-3xl p-8 mb-12 border border-gray-700/50 shadow-2xl overflow-hidden'>
            {/* Decorative elements */}
            <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-full blur-2xl'></div>
            <div className='absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/20 to-transparent rounded-full blur-2xl'></div>

            <div className='relative z-10'>
              {ad.urgent && (
                <div className='inline-flex items-center bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-yellow-500/30 backdrop-blur-sm'>
                  <svg
                    className='w-4 h-4 ml-2 animate-pulse'
                    fill='currentColor'
                    viewBox='0 0 20 20'>
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                      clipRule='evenodd'
                    />
                  </svg>
                  آگهی فوری
                </div>
              )}

              <div className='flex items-start justify-between mb-8'>
                <div className='flex-1'>
                  <h1 className='text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-4 leading-tight'>
                    {ad.title}
                  </h1>
                  <div className='flex flex-wrap items-center gap-6 text-gray-400 mb-6'>
                    <div className='flex items-center gap-2 bg-gray-800/50 px-3 py-2 rounded-lg backdrop-blur-sm'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='18'
                        height='18'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        className='text-yellow-400'>
                        <path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'></path>
                        <circle cx='12' cy='10' r='3'></circle>
                      </svg>
                      <span className='font-medium'>
                        {ad.location} {ad.province && `- ${ad.province}`}
                      </span>
                    </div>
                    <div className='flex items-center gap-2 bg-gray-800/50 px-3 py-2 rounded-lg backdrop-blur-sm'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='18'
                        height='18'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        className='text-blue-400'>
                        <rect
                          x='3'
                          y='4'
                          width='18'
                          height='18'
                          rx='2'
                          ry='2'></rect>
                        <line x1='16' y1='2' x2='16' y2='6'></line>
                        <line x1='8' y1='2' x2='8' y2='6'></line>
                        <line x1='3' y1='10' x2='21' y2='10'></line>
                      </svg>
                      <span className='font-medium'>{ad.date}</span>
                    </div>
                  </div>
                  <div className='flex flex-wrap gap-3'>
                    <span className='inline-block bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-medium border border-yellow-500/30'>
                      {ad.category}
                    </span>
                    {ad.specialization && (
                      <span className='inline-block bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium border border-blue-500/30'>
                        {ad.specialization}
                      </span>
                    )}
                    <span className='inline-block bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium border border-green-500/30'>
                      {getTypeText(ad.type)}
                    </span>
                  </div>
                </div>
                <div className='text-left bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50'>
                  <div className='text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent mb-3'>
                    {ad.salary}
                  </div>
                  <div className='text-sm text-gray-400 flex items-center gap-2'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      className='text-green-400'>
                      <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'></path>
                      <circle cx='12' cy='7' r='4'></circle>
                    </svg>
                    <span className='font-medium'>
                      {ad.applicants || 0} نفر متقاضی
                    </span>
                  </div>
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                  <button
                    onClick={() => router.push("/advertisements")}
                    className='flex items-center gap-2 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='18'
                      height='18'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'>
                      <path d='M15 18l-6-6 6-6' />
                    </svg>
                    بازگشت به آگهی‌ها
                  </button>
                </div>
                <div className='flex items-center gap-4'>
                  <button
                    onClick={() => router.push("/karjoo/resume")}
                    className='bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black px-8 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25 flex items-center gap-3'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='18'
                      height='18'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'>
                      <path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' />
                      <polyline points='14,2 14,8 20,8' />
                      <line x1='16' y1='13' x2='8' y2='13' />
                      <line x1='16' y1='17' x2='8' y2='17' />
                      <polyline points='10,9 9,9 8,9' />
                    </svg>
                    ارسال رزومه
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Company Information */}
          <div className='bg-gradient-to-br from-[#2a2a2a]/80 to-[#1a1a1a]/80 backdrop-blur-xl rounded-2xl p-8 mb-12 border border-gray-700/50 shadow-xl'>
            <h2 className='text-2xl font-bold text-white mb-6 flex items-center gap-3'>
              <div className='w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center border border-blue-500/30'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  className='text-blue-400'>
                  <path d='M9 5H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2' />
                </svg>
              </div>
              اطلاعات شرکت
            </h2>
            <div className='bg-gradient-to-r from-gray-800/30 to-gray-900/30 rounded-xl p-6 border border-gray-700/30'>
              <p className='text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'>
                {ad.company}
              </p>
            </div>
            <div className='mt-6 text-center'>
              <button
                onClick={() => router.push(`/employers/${adId}`)}
                className='bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 flex items-center gap-3 mx-auto'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='18'
                  height='18'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'>
                  <path d='M9 5H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2' />
                </svg>
                مشاهده اطلاعات شرکت
              </button>
            </div>
          </div>

          {/* Job Details Grid */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12'>
            {/* Left Column */}
            <div className='space-y-8'>
              {/* شرح شغلی */}
              <div className='bg-gradient-to-br from-[#2a2a2a]/80 to-[#1a1a1a]/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 group'>
                <h3 className='text-xl font-bold text-white mb-6 flex items-center gap-3'>
                  <div className='w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center border border-purple-500/30 group-hover:scale-110 transition-transform duration-300'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20'
                      height='20'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      className='text-purple-400'>
                      <path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' />
                      <polyline points='14,2 14,8 20,8' />
                      <line x1='16' y1='13' x2='8' y2='13' />
                      <line x1='16' y1='17' x2='8' y2='17' />
                      <polyline points='10,9 9,9 8,9' />
                    </svg>
                  </div>
                  شرح شغلی
                </h3>
                <div className='text-gray-300 whitespace-pre-line leading-relaxed bg-gradient-to-r from-gray-800/20 to-gray-900/20 rounded-xl p-6 border border-gray-700/30'>
                  {ad.description}
                </div>
              </div>

              {/* شرایط و الزامات */}
              <div className='bg-gradient-to-br from-[#2a2a2a]/80 to-[#1a1a1a]/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 group'>
                <h3 className='text-xl font-bold text-white mb-6 flex items-center gap-3'>
                  <div className='w-10 h-10 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl flex items-center justify-center border border-red-500/30 group-hover:scale-110 transition-transform duration-300'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20'
                      height='20'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      className='text-red-400'>
                      <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m0 0v4H9a3 3 0 0 1 0-6h3.98a3 3 0 0 1 2.62 1.5L15 6a3 3 0 0 1 .5 1.5V12a2 2 0 0 1-2 2H10l-2.5-2L7 9l2.5-2L9 7.5V3z' />
                      <path d='M17 7V6a3 3 0 0 1 3-3' />
                    </svg>
                  </div>
                  شرایط و الزامات
                </h3>
                <div className='text-gray-300 whitespace-pre-line leading-relaxed bg-gradient-to-r from-gray-800/20 to-gray-900/20 rounded-xl p-6 border border-gray-700/30'>
                  {ad.requirements}
                </div>
              </div>

              {/* اطلاعات شخصی */}
              <div className='bg-gradient-to-br from-[#2a2a2a]/80 to-[#1a1a1a]/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 group'>
                <h3 className='text-xl font-bold text-white mb-6 flex items-center gap-3'>
                  <div className='w-10 h-10 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-xl flex items-center justify-center border border-green-500/30 group-hover:scale-110 transition-transform duration-300'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20'
                      height='20'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      className='text-green-400'>
                      <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' />
                      <circle cx='12' cy='7' r='4' />
                    </svg>
                  </div>
                  شرایط شخصی
                </h3>
                <div className='space-y-4'>
                  <div className='flex justify-between items-center p-4 bg-gradient-to-r from-gray-800/30 to-gray-900/30 rounded-xl border border-gray-700/30'>
                    <span className='text-gray-400 font-medium'>جنسیت:</span>
                    <span className='text-white font-semibold'>
                      {getGenderText(ad.gender)}
                    </span>
                  </div>
                  <div className='flex justify-between items-center p-4 bg-gradient-to-r from-gray-800/30 to-gray-900/30 rounded-xl border border-gray-700/30'>
                    <span className='text-gray-400 font-medium'>تحصیلات:</span>
                    <span className='text-white font-semibold'>
                      {getEducationText(ad.education)}
                    </span>
                  </div>
                  <div className='flex justify-between items-center p-4 bg-gradient-to-r from-gray-800/30 to-gray-900/30 rounded-xl border border-gray-700/30'>
                    <span className='text-gray-400 font-medium'>
                      سابقه کاری:
                    </span>
                    <span className='text-white font-semibold'>
                      {getExperienceText(ad.experience)}
                    </span>
                  </div>
                  <div className='flex justify-between items-center p-4 bg-gradient-to-r from-gray-800/30 to-gray-900/30 rounded-xl border border-gray-700/30'>
                    <span className='text-gray-400 font-medium'>
                      وضعیت سربازی:
                    </span>
                    <span className='text-white font-semibold'>
                      {getMilitaryText(ad.militaryService)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className='space-y-8'>
              {/* شرایط استخدامی */}
              <div className='bg-gradient-to-br from-[#2a2a2a]/80 to-[#1a1a1a]/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 group'>
                <h3 className='text-xl font-bold text-white mb-6 flex items-center gap-3'>
                  <div className='w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center border border-cyan-500/30 group-hover:scale-110 transition-transform duration-300'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20'
                      height='20'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      className='text-cyan-400'>
                      <rect x='3' y='4' width='18' height='18' rx='2' ry='2' />
                      <line x1='16' y1='2' x2='16' y2='6' />
                      <line x1='8' y1='2' x2='8' y2='6' />
                      <line x1='3' y1='10' x2='21' y2='10' />
                    </svg>
                  </div>
                  شرایط استخدامی
                </h3>
                <div className='space-y-4'>
                  <div className='flex justify-between items-center p-4 bg-gradient-to-r from-gray-800/30 to-gray-900/30 rounded-xl border border-gray-700/30'>
                    <span className='text-gray-400 font-medium'>
                      نوع همکاری:
                    </span>
                    <span className='text-white font-semibold'>
                      {getTypeText(ad.type)}
                    </span>
                  </div>
                  <div className='flex justify-between items-center p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-500/30'>
                    <span className='text-gray-400 font-medium'>حقوق:</span>
                    <span className='text-yellow-400 font-bold text-lg'>
                      {ad.salary}
                    </span>
                  </div>
                  <div className='flex justify-between items-center p-4 bg-gradient-to-r from-gray-800/30 to-gray-900/30 rounded-xl border border-gray-700/30'>
                    <span className='text-gray-400 font-medium'>محل کار:</span>
                    <span className='text-white font-semibold'>
                      {ad.location}
                    </span>
                  </div>
                  {ad.workHours && (
                    <div className='flex justify-between items-center p-4 bg-gradient-to-r from-gray-800/30 to-gray-900/30 rounded-xl border border-gray-700/30'>
                      <span className='text-gray-400 font-medium'>
                        ساعت کاری:
                      </span>
                      <span className='text-white font-semibold'>
                        {ad.workHours}
                      </span>
                    </div>
                  )}
                  {ad.insurance && (
                    <div className='flex justify-between items-center p-4 bg-gradient-to-r from-gray-800/30 to-gray-900/30 rounded-xl border border-gray-700/30'>
                      <span className='text-gray-400 font-medium'>بیمه:</span>
                      <span className='text-white font-semibold'>
                        {getInsuranceText(ad.insurance)}
                      </span>
                    </div>
                  )}
                  {ad.probationPeriod && (
                    <div className='flex justify-between items-center p-4 bg-gradient-to-r from-gray-800/30 to-gray-900/30 rounded-xl border border-gray-700/30'>
                      <span className='text-gray-400 font-medium'>
                        دوره آزمایشی:
                      </span>
                      <span className='text-white font-semibold'>
                        {ad.probationPeriod}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* مزایا و تسهیلات */}
              {formatBenefits(ad.benefits) && (
                <div className='bg-gradient-to-br from-[#2a2a2a]/80 to-[#1a1a1a]/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 group'>
                  <h3 className='text-xl font-bold text-white mb-6 flex items-center gap-3'>
                    <div className='w-10 h-10 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-xl flex items-center justify-center border border-emerald-500/30 group-hover:scale-110 transition-transform duration-300'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='20'
                        height='20'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        className='text-emerald-400'>
                        <polyline points='9 11 12 14 22 4' />
                        <path d='M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11' />
                      </svg>
                    </div>
                    مزایا و تسهیلات
                  </h3>
                  <div className='flex flex-wrap gap-3'>
                    {formatBenefits(ad.benefits)
                      .split(" • ")
                      .map(
                        (benefit, index) =>
                          benefit.trim() && (
                            <span
                              key={index}
                              className='inline-block bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium border border-green-500/30 hover:scale-105 transition-transform duration-200'>
                              {benefit.trim()}
                            </span>
                          )
                      )}
                  </div>
                </div>
              )}

              {/* مسئولیت‌ها */}
              {ad.responsibilities && (
                <div className='bg-gradient-to-br from-[#2a2a2a]/80 to-[#1a1a1a]/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 group'>
                  <h3 className='text-xl font-bold text-white mb-6 flex items-center gap-3'>
                    <div className='w-10 h-10 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl flex items-center justify-center border border-indigo-500/30 group-hover:scale-110 transition-transform duration-300'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='20'
                        height='20'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        className='text-indigo-400'>
                        <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
                      </svg>
                    </div>
                    مسئولیت‌ها
                  </h3>
                  <div className='text-gray-300 whitespace-pre-line leading-relaxed bg-gradient-to-r from-gray-800/20 to-gray-900/20 rounded-xl p-6 border border-gray-700/30'>
                    {ad.responsibilities}
                  </div>
                </div>
              )}

              {/* مهارت‌های مورد نیاز */}
              {ad.skills && (
                <div className='bg-gradient-to-br from-[#2a2a2a]/80 to-[#1a1a1a]/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 group'>
                  <h3 className='text-xl font-bold text-white mb-6 flex items-center gap-3'>
                    <div className='w-10 h-10 bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-xl flex items-center justify-center border border-pink-500/30 group-hover:scale-110 transition-transform duration-300'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='20'
                        height='20'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        className='text-pink-400'>
                        <path d='M14.7 6.3a1 1 0 0 0-1.4 0L9 10.6L6.3 7.9a1 1 0 0 0-1.4 1.4l3.5 3.5a1 1 0 0 0 1.4 0l6-6a1 1 0 0 0 0-1.4z' />
                        <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
                      </svg>
                    </div>
                    مهارت‌های مورد نیاز
                  </h3>
                  <div className='text-gray-300 whitespace-pre-line leading-relaxed bg-gradient-to-r from-gray-800/20 to-gray-900/20 rounded-xl p-6 border border-gray-700/30 mb-6'>
                    {ad.skills}
                  </div>
                  <div className='flex flex-wrap gap-3'>
                    {ad.skills.split(/[,،]/).map((skill, index) => {
                      const trimmedSkill = skill.trim();
                      if (trimmedSkill) {
                        return (
                          <span
                            key={index}
                            className='inline-block bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium border border-blue-500/30 hover:scale-105 transition-transform duration-200'>
                            {trimmedSkill}
                          </span>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              )}

              {/* گزینه‌های ویژه */}
              <div className='bg-gradient-to-br from-[#2a2a2a]/80 to-[#1a1a1a]/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 group'>
                <h3 className='text-xl font-bold text-white mb-6 flex items-center gap-3'>
                  <div className='w-10 h-10 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-xl flex items-center justify-center border border-violet-500/30 group-hover:scale-110 transition-transform duration-300'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20'
                      height='20'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      className='text-violet-400'>
                      <circle cx='12' cy='12' r='10' />
                      <path d='M9 12l2 2 4-4' />
                    </svg>
                  </div>
                  گزینه‌های ویژه
                </h3>
                <div className='space-y-4'>
                  {ad.remoteWork && (
                    <div className='flex items-center gap-3 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/30'>
                      <svg
                        className='w-5 h-5 text-green-400'
                        fill='currentColor'
                        viewBox='0 0 20 20'>
                        <path
                          fillRule='evenodd'
                          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                      <span className='text-white font-medium'>
                        امکان دورکاری
                      </span>
                    </div>
                  )}
                  {ad.travelRequired && (
                    <div className='flex items-center gap-3 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/30'>
                      <svg
                        className='w-5 h-5 text-blue-400'
                        fill='currentColor'
                        viewBox='0 0 20 20'>
                        <path
                          fillRule='evenodd'
                          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                      <span className='text-white font-medium'>
                        نیاز به سفر
                      </span>
                    </div>
                  )}
                  {ad.urgent && (
                    <div className='flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-500/30'>
                      <svg
                        className='w-5 h-5 text-yellow-400'
                        fill='currentColor'
                        viewBox='0 0 20 20'>
                        <path
                          fillRule='evenodd'
                          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                      <span className='text-white font-medium'>آگهی فوری</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
