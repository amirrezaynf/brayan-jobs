import SalaryRangeSlider from "@/components/ui/range/SalaryRangeInput";
import AdCard from "../../ui/card/AdCard";

// Data for job categories
const jobCategories = [
  "فناوری اطلاعات و نرم‌افزار",
  "فروش و بازاریابی",
  "مالی و حسابداری",
  "مهندسی",
  "منابع انسانی",
  "هنر و رسانه",
];

// Mock data for job cards
const jobListings = [
  {
    id: 1,
    title: "کارشناس ارشد فروش",
    company: "دیجی‌کالا",
    logo: "D",
    location: "تهران",
    type: "تمام وقت",
    description:
      "مسلط به فنون مذاکره و فروش سازمانی. دارای حداقل ۳ سال سابقه کار مرتبط.",
    salary: "توافقی",
    isVip: true,
  },
  {
    id: 2,
    title: "توسعه‌دهنده Backend (Node.js)",
    company: "کافه‌بازار",
    logo: "CB",
    location: "تهران (دورکاری)",
    type: "تمام وقت",
    description:
      "تجربه کار با میکروسرویس‌ها، دیتابیس‌های SQL و NoSQL. آشنایی با Docker مزیت محسوب می‌شود.",
    salary: "۴۰ - ۵۰ میلیون",
    isVip: false,
  },
  {
    id: 3,
    title: "طراح UI/UX",
    company: "اسنپ",
    logo: "S",
    location: "اصفهان",
    type: "پاره‌وقت",
    description:
      "مسلط به Figma و Adobe XD. توانایی طراحی پروتوتایپ‌های تعاملی و User Flow.",
    salary: "توافقی",
    isVip: true,
  },
  {
    id: 4,
    title: "مدیر محصول",
    company: "همراه اول",
    logo: "MCI",
    location: "شیراز",
    type: "تمام وقت",
    description:
      "توانایی تعریف Roadmap محصول و مدیریت بک‌لاگ. تجربه کار در محیط Agile.",
    salary: "۵۰ میلیون به بالا",
    isVip: true,
  },
  {
    id: 5,
    title: "کارشناس دیجیتال مارکتینگ",
    company: "بانک پاسارگاد",
    logo: "BP",
    location: "مشهد",
    type: "پروژه‌ای",
    description:
      "مسلط به SEO، Google Ads و کمپین‌های شبکه‌های اجتماعی. توانایی تحلیل داده و گزارش‌دهی.",
    salary: "توافقی",
    isVip: false,
  },
  {
    id: 6,
    title: "مهندس DevOps",
    company: "یکتانت",
    logo: "Y",
    location: "تهران",
    type: "تمام وقت",
    description:
      "تجربه کار با ابزارهای CI/CD، Kubernetes و سیستم‌های مانیتورینگ مانند Prometheus.",
    salary: "۶۰ میلیون به بالا",
    isVip: true,
  },
];

export default function TodayAd() {
  return (
    <section className="container mx-auto px-6 py-16">
      <div>
        <h2 className="text-3xl font-bold text-center mb-10 gold-text">
          آگهی های مهم امروز
        </h2>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {jobListings.map((job) => (
            <AdCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
}
