
import SalaryRangeSlider from "@/components/SalaryRangeInput";
import AdCard from "../ui/AdCard";

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

// Helper component for Icons
const LocationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="ml-1"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);
const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="ml-1"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);
const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);
const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
  </svg>
);



export default function TodayAd() {

  return (
    <section className="container mx-auto px-6 py-16">
      <div>
      <h2 className="text-3xl font-bold text-center mb-10 gold-text">
آگهی های مهم امروز        </h2>
      
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        
        
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobListings.map((job) => (
              <AdCard key={job.id} job={job} />
            ))}
          </div>
          <div className="flex justify-center mt-12">
            {/* <nav className="flex items-center space-x-2 space-x-reverse">
              <a
                href="#"
                className="px-4 py-2 rounded-lg text-gray-400 dark-card hover:bg-[#3a3a3a]"
              >
                قبلی
              </a>
              <a
                href="#"
                className="px-4 py-2 rounded-lg text-black gold-bg font-bold"
              >
                1
              </a>
              <a
                href="#"
                className="px-4 py-2 rounded-lg text-gray-400 dark-card hover:bg-[#3a3a3a]"
              >
                2
              </a>
              <a
                href="#"
                className="px-4 py-2 rounded-lg text-gray-400 dark-card hover:bg-[#3a3a3a]"
              >
                3
              </a>
              <a
                href="#"
                className="px-4 py-2 rounded-lg text-gray-400 dark-card hover:bg-[#3a3a3a]"
              >
                بعدی
              </a>
            </nav> */}
          </div>
        </div>
      </div>
    </section>
  );
}
