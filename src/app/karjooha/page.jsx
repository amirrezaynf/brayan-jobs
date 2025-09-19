"use client";

import React, { useState } from "react";
import {
  Search,
  MapPin,
  Phone,
  Mail,
  Briefcase,
  Calendar,
  Star,
  Award,
  Languages,
  FileText,
  ExternalLink,
  Heart,
  Eye,
  Filter,
  Users,
  TrendingUp,
  Clock,
  DollarSign,
  User,
  ChevronDown,
  MessageCircle,
  Bookmark,
} from "lucide-react";
import CustomSelect from "@/components/ui/select/CustomSelect";
import Pagination from "@/components/ui/pagination/Pagination";

// کامپوننت نمایش سطح مهارت
const SkillLevel = ({ level }) => {
  const levels = ["مبتدی", "متوسط", "پیشرفته", "حرفه‌ای"];
  const levelIndex = levels.indexOf(level);

  return (
    <div className="flex items-center gap-1">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className={`w-1.5 h-1.5 rounded-full ${
            index <= levelIndex ? "bg-yellow-400" : "bg-gray-600"
          }`}
        />
      ))}
    </div>
  );
};

// کامپوننت نمایش تگ
const Tag = ({ children, color = "yellow", size = "sm" }) => {
  const colorClasses = {
    yellow: "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
    blue: "bg-blue-400/10 text-blue-400 border-blue-400/20",
    green: "bg-green-400/10 text-green-400 border-green-400/20",
    purple: "bg-purple-400/10 text-purple-400 border-purple-400/20",
    red: "bg-red-400/10 text-red-400 border-red-400/20",
  };

  const sizeClasses = {
    xs: "px-1.5 py-0.5 text-xs",
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium border ${colorClasses[color]} ${sizeClasses[size]}`}
    >
      {children}
    </span>
  );
};

// کامپوننت کارت کارجو
const JobSeekerCard = ({ jobSeeker, onViewProfile, onContact, onBookmark }) => {
  const [isBookmarked, setIsBookmarked] = useState(
    jobSeeker.isBookmarked || false
  );

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark(jobSeeker.id, !isBookmarked);
  };

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-yellow-400/30 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-400/10">
      {/* Header کارت */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={jobSeeker.profileImage}
              alt={`${jobSeeker.firstName} ${jobSeeker.lastName}`}
              className="w-16 h-16 rounded-full object-cover border-2 border-yellow-400/20"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-gray-900 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white">
              {jobSeeker.firstName} {jobSeeker.lastName}
            </h3>
            <p className="text-yellow-400 font-medium">{jobSeeker.jobTitle}</p>
            <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
              <MapPin className="w-3 h-3" />
              <span>
                {jobSeeker.city}، {jobSeeker.province}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleBookmark}
            className={`p-2 rounded-lg transition-colors ${
              isBookmarked
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-gray-700/50 text-gray-400 hover:bg-yellow-500/20 hover:text-yellow-400"
            }`}
          >
            <Bookmark
              className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`}
            />
          </button>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Eye className="w-3 h-3" />
            <span>{jobSeeker.profileViews}</span>
          </div>
        </div>
      </div>

      {/* اطلاعات اصلی */}
      <div className="space-y-4">
        {/* تجربه کاری */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Briefcase className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-gray-300">
              تجربه کاری
            </span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            {jobSeeker.lastExperience}
          </p>
        </div>

        {/* مهارت‌های کلیدی */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-gray-300">
              مهارت‌های کلیدی
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {jobSeeker.topSkills.slice(0, 4).map((skill, index) => (
              <Tag key={index} color="blue" size="xs">
                {skill}
              </Tag>
            ))}
            {jobSeeker.topSkills.length > 4 && (
              <Tag color="purple" size="xs">
                +{jobSeeker.topSkills.length - 4}
              </Tag>
            )}
          </div>
        </div>

        {/* زبان‌ها */}
        {jobSeeker.languages.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Languages className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-gray-300">زبان‌ها</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {jobSeeker.languages.map((lang, index) => (
                <Tag key={index} color="purple" size="xs">
                  {lang.language} - {lang.proficiency}
                </Tag>
              ))}
            </div>
          </div>
        )}

        {/* حقوق مورد انتظار */}
        {jobSeeker.expectedSalary && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-gray-300">
                حقوق مورد انتظار
              </span>
            </div>
            <Tag color="green" size="sm">
              {parseInt(jobSeeker.expectedSalary).toLocaleString("fa-IR")} تومان
            </Tag>
          </div>
        )}

        {/* آخرین فعالیت */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>آخرین بروزرسانی: {jobSeeker.lastUpdate}</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>نرخ پاسخ: {jobSeeker.responseRate}%</span>
          </div>
        </div>
      </div>

      {/* دکمه‌های اقدام */}
      <div className="flex gap-2 mt-6 pt-4 border-t border-gray-700/50">
        <button
          onClick={() => onViewProfile(jobSeeker.id)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg transition-colors font-medium text-sm"
        >
          <User className="w-4 h-4" />
          مشاهده رزومه
        </button>
        <button
          onClick={() => onContact(jobSeeker)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
        >
          <MessageCircle className="w-4 h-4" />
          تماس
        </button>
      </div>
    </div>
  );
};

export default function JobSeekersLandingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProvince, setSelectedProvince] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // تعداد کارجو در هر صفحه

  // داده‌های نمونه کارجوها
  const jobSeekers = [
    {
      id: 1,
      firstName: "علی",
      lastName: "احمدی",
      jobTitle: "توسعه‌دهنده فول‌استک",
      city: "تهران",
      province: "تهران",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      lastExperience:
        "توسعه‌دهنده ارشد React در شرکت فناوری پارس با ۳ سال تجربه در پروژه‌های بزرگ",
      topSkills: [
        "React.js",
        "Node.js",
        "JavaScript",
        "TypeScript",
        "MongoDB",
        "Python",
      ],
      languages: [
        { language: "انگلیسی", proficiency: "پیشرفته" },
        { language: "عربی", proficiency: "متوسط" },
      ],
      expectedSalary: "15000000",
      profileViews: 156,
      lastUpdate: "۲ ساعت پیش",
      responseRate: 85,
      isBookmarked: false,
    },
    {
      id: 2,
      firstName: "فاطمه",
      lastName: "کریمی",
      jobTitle: "طراح UI/UX",
      city: "اصفهان",
      province: "اصفهان",
      profileImage:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      lastExperience:
        "طراح رابط کاربری در استودیو کریتیو با تخصص در طراحی اپلیکیشن‌های موبایل",
      topSkills: [
        "Figma",
        "Adobe XD",
        "Sketch",
        "Prototyping",
        "User Research",
      ],
      languages: [{ language: "انگلیسی", proficiency: "پیشرفته" }],
      expectedSalary: "12000000",
      profileViews: 89,
      lastUpdate: "۱ روز پیش",
      responseRate: 92,
      isBookmarked: true,
    },
    {
      id: 3,
      firstName: "محمد",
      lastName: "رضایی",
      jobTitle: "متخصص DevOps",
      city: "شیراز",
      province: "فارس",
      profileImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      lastExperience:
        "مهندس DevOps در شرکت داده‌کاوان با تجربه در AWS و Kubernetes",
      topSkills: [
        "Docker",
        "Kubernetes",
        "AWS",
        "Jenkins",
        "Terraform",
        "Linux",
      ],
      languages: [{ language: "انگلیسی", proficiency: "حرفه‌ای" }],
      expectedSalary: "18000000",
      profileViews: 203,
      lastUpdate: "۳ ساعت پیش",
      responseRate: 78,
      isBookmarked: false,
    },
    {
      id: 4,
      firstName: "زهرا",
      lastName: "محمدی",
      jobTitle: "تحلیلگر داده",
      city: "مشهد",
      province: "خراسان رضوی",
      profileImage:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      lastExperience:
        "تحلیلگر داده در بانک ملی با تخصص در یادگیری ماشین و تجزیه و تحلیل داده",
      topSkills: [
        "Python",
        "R",
        "SQL",
        "Machine Learning",
        "Tableau",
        "Power BI",
      ],
      languages: [
        { language: "انگلیسی", proficiency: "پیشرفته" },
        { language: "فرانسوی", proficiency: "متوسط" },
      ],
      expectedSalary: "14000000",
      profileViews: 127,
      lastUpdate: "۵ ساعت پیش",
      responseRate: 88,
      isBookmarked: false,
    },
    {
      id: 5,
      firstName: "حسین",
      lastName: "نوری",
      jobTitle: "مهندس نرم‌افزار موبایل",
      city: "تبریز",
      province: "آذربایجان شرقی",
      profileImage:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      lastExperience:
        "توسعه‌دهنده اپلیکیشن موبایل در استارتاپ تکنولوژی با تجربه Flutter و React Native",
      topSkills: [
        "Flutter",
        "React Native",
        "Dart",
        "JavaScript",
        "Firebase",
        "iOS",
      ],
      languages: [{ language: "انگلیسی", proficiency: "پیشرفته" }],
      expectedSalary: "13000000",
      profileViews: 94,
      lastUpdate: "۱ روز پیش",
      responseRate: 81,
      isBookmarked: true,
    },
    {
      id: 6,
      firstName: "مریم",
      lastName: "صادقی",
      jobTitle: "مدیر محصول",
      city: "کرج",
      province: "البرز",
      profileImage:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      lastExperience:
        "مدیر محصول در شرکت فناوری نوآوران با تجربه راه‌اندازی ۵ محصول موفق",
      topSkills: [
        "Product Management",
        "Agile",
        "Scrum",
        "User Research",
        "Analytics",
        "Strategy",
      ],
      languages: [
        { language: "انگلیسی", proficiency: "حرفه‌ای" },
        { language: "آلمانی", proficiency: "متوسط" },
      ],
      expectedSalary: "20000000",
      profileViews: 178,
      lastUpdate: "۴ ساعت پیش",
      responseRate: 95,
      isBookmarked: false,
    },
    {
      id: 7,
      firstName: "امیر",
      lastName: "حسینی",
      jobTitle: "مهندس امنیت سایبری",
      city: "تهران",
      province: "تهران",
      profileImage:
        "https://images.unsplash.com/photo-1519085360753-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      lastExperience:
        "متخصص امنیت سایبری در بانک مرکزی با تجربه در حفاظت از زیرساخت‌های حیاتی",
      topSkills: [
        "Cybersecurity",
        "Penetration Testing",
        "Network Security",
        "CISSP",
        "Ethical Hacking",
        "Firewall",
      ],
      languages: [
        { language: "انگلیسی", proficiency: "حرفه‌ای" },
        { language: "روسی", proficiency: "متوسط" },
      ],
      expectedSalary: "22000000",
      profileViews: 245,
      lastUpdate: "۱ ساعت پیش",
      responseRate: 90,
      isBookmarked: false,
    },
    {
      id: 8,
      firstName: "نگار",
      lastName: "موسوی",
      jobTitle: "مهندس یادگیری ماشین",
      city: "اصفهان",
      province: "اصفهان",
      profileImage:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      lastExperience:
        "محقق یادگیری ماشین در مرکز تحقیقات فناوری با انتشار ۱۰ مقاله علمی",
      topSkills: [
        "Machine Learning",
        "Deep Learning",
        "TensorFlow",
        "PyTorch",
        "Computer Vision",
        "NLP",
      ],
      languages: [
        { language: "انگلیسی", proficiency: "حرفه‌ای" },
        { language: "فرانسوی", proficiency: "پیشرفته" },
      ],
      expectedSalary: "25000000",
      profileViews: 312,
      lastUpdate: "۳ ساعت پیش",
      responseRate: 87,
      isBookmarked: true,
    },
    {
      id: 9,
      firstName: "رضا",
      lastName: "کاظمی",
      jobTitle: "معمار نرم‌افزار",
      city: "شیراز",
      province: "فارس",
      profileImage:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      lastExperience:
        "معمار نرم‌افزار ارشد در شرکت تکنولوژی پیشرو با طراحی سیستم‌های مقیاس‌پذیر",
      topSkills: [
        "System Architecture",
        "Microservices",
        "Cloud Computing",
        "Scalability",
        "Design Patterns",
        "API Design",
      ],
      languages: [{ language: "انگلیسی", proficiency: "حرفه‌ای" }],
      expectedSalary: "28000000",
      profileViews: 189,
      lastUpdate: "۶ ساعت پیش",
      responseRate: 93,
      isBookmarked: false,
    },
    {
      id: 10,
      firstName: "سارا",
      lastName: "جعفری",
      jobTitle: "متخصص بازاریابی دیجیتال",
      city: "مشهد",
      province: "خراسان رضوی",
      profileImage:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      lastExperience:
        "مدیر بازاریابی دیجیتال در آژانس تبلیغاتی با موفقیت در کمپین‌های ملی",
      topSkills: [
        "Digital Marketing",
        "SEO/SEM",
        "Social Media",
        "Google Analytics",
        "Content Strategy",
        "PPC",
      ],
      languages: [
        { language: "انگلیسی", proficiency: "پیشرفته" },
        { language: "ترکی", proficiency: "متوسط" },
      ],
      expectedSalary: "16000000",
      profileViews: 134,
      lastUpdate: "۴ ساعت پیش",
      responseRate: 89,
      isBookmarked: false,
    },
    {
      id: 11,
      firstName: "کامران",
      lastName: "عباسی",
      jobTitle: "مهندس بلاک‌چین",
      city: "تبریز",
      province: "آذربایجان شرقی",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      lastExperience:
        "توسعه‌دهنده بلاک‌چین در استارتاپ فین‌تک با تجربه در ارزهای دیجیتال",
      topSkills: [
        "Blockchain",
        "Solidity",
        "Ethereum",
        "Smart Contracts",
        "Web3",
        "Cryptocurrency",
      ],
      languages: [{ language: "انگلیسی", proficiency: "پیشرفته" }],
      expectedSalary: "30000000",
      profileViews: 267,
      lastUpdate: "۲ ساعت پیش",
      responseRate: 82,
      isBookmarked: true,
    },
    {
      id: 12,
      firstName: "لیلا",
      lastName: "رستمی",
      jobTitle: "مهندس کیفیت نرم‌افزار",
      city: "کرج",
      province: "البرز",
      profileImage:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      lastExperience:
        "مهندس QA ارشد در شرکت نرم‌افزاری با تخصص در تست اتوماسیون",
      topSkills: [
        "Software Testing",
        "Test Automation",
        "Selenium",
        "JIRA",
        "API Testing",
        "Performance Testing",
      ],
      languages: [{ language: "انگلیسی", proficiency: "پیشرفته" }],
      expectedSalary: "14000000",
      profileViews: 98,
      lastUpdate: "۱ روز پیش",
      responseRate: 91,
      isBookmarked: false,
    },
    {
      id: 13,
      firstName: "بهزاد",
      lastName: "قاسمی",
      jobTitle: "مهندس شبکه",
      city: "اهواز",
      province: "خوزستان",
      profileImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      lastExperience:
        "مهندس شبکه در شرکت مخابرات با تجربه در طراحی و پیاده‌سازی شبکه‌های پیچیده",
      topSkills: [
        "Network Engineering",
        "Cisco",
        "CCNP",
        "Routing & Switching",
        "Network Security",
        "MPLS",
      ],
      languages: [{ language: "انگلیسی", proficiency: "متوسط" }],
      expectedSalary: "17000000",
      profileViews: 145,
      lastUpdate: "۷ ساعت پیش",
      responseRate: 86,
      isBookmarked: false,
    },
    {
      id: 14,
      firstName: "شیدا",
      lastName: "نوروزی",
      jobTitle: "طراح گرافیک",
      city: "ساری",
      province: "مازندران",
      profileImage:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      lastExperience:
        "طراح گرافیک خلاق در آژانس تبلیغاتی با پورتفولیو قوی در برندسازی",
      topSkills: [
        "Graphic Design",
        "Adobe Creative Suite",
        "Branding",
        "Logo Design",
        "Print Design",
        "Typography",
      ],
      languages: [
        { language: "انگلیسی", proficiency: "پیشرفته" },
        { language: "ایتالیایی", proficiency: "مبتدی" },
      ],
      expectedSalary: "11000000",
      profileViews: 76,
      lastUpdate: "۵ ساعت پیش",
      responseRate: 94,
      isBookmarked: false,
    },
    {
      id: 15,
      firstName: "آرش",
      lastName: "میرزایی",
      jobTitle: "مهندس سخت‌افزار",
      city: "کرمان",
      province: "کرمان",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      lastExperience:
        "مهندس سخت‌افزار در شرکت الکترونیک با تخصص در طراحی مدارات دیجیتال",
      topSkills: [
        "Hardware Engineering",
        "PCB Design",
        "Embedded Systems",
        "FPGA",
        "Circuit Design",
        "Microcontrollers",
      ],
      languages: [{ language: "انگلیسی", proficiency: "پیشرفته" }],
      expectedSalary: "19000000",
      profileViews: 112,
      lastUpdate: "۸ ساعت پیش",
      responseRate: 88,
      isBookmarked: false,
    },
  ];

  const categories = [
    { value: "all", label: "همه دسته‌ها" },
    { value: "frontend", label: "فرانت‌اند" },
    { value: "backend", label: "بک‌اند" },
    { value: "fullstack", label: "فول‌استک" },
    { value: "mobile", label: "موبایل" },
    { value: "design", label: "طراحی" },
    { value: "data", label: "داده" },
    { value: "devops", label: "DevOps" },
    { value: "product", label: "مدیریت محصول" },
  ];

  const provinces = [
    { value: "all", label: "همه استان‌ها" },
    { value: "تهران", label: "تهران" },
    { value: "اصفهان", label: "اصفهان" },
    { value: "فارس", label: "فارس" },
    { value: "خراسان رضوی", label: "خراسان رضوی" },
    { value: "آذربایجان شرقی", label: "آذربایجان شرقی" },
    { value: "البرز", label: "البرز" },
    { value: "خوزستان", label: "خوزستان" },
    { value: "مازندران", label: "مازندران" },
  ];

  const locations = [
    { value: "all", label: "همه شهرها" },
    { value: "تهران", label: "تهران" },
    { value: "اصفهان", label: "اصفهان" },
    { value: "شیراز", label: "شیراز" },
    { value: "مشهد", label: "مشهد" },
    { value: "تبریز", label: "تبریز" },
    { value: "کرج", label: "کرج" },
  ];

  const sortOptions = [
    { value: "recent", label: "جدیدترین" },
    { value: "popular", label: "محبوب‌ترین" },
    { value: "experience", label: "بیشترین تجربه" },
    { value: "salary", label: "حقوق" },
  ];

  const handleViewProfile = (id) => {
    window.open(`/karjoo/${id}`, "_blank");
  };

  const handleContact = (jobSeeker) => {
    // اینجا می‌توانید modal یا صفحه تماس را باز کنید
    console.log("Contact:", jobSeeker);
  };

  const handleBookmark = (id, isBookmarked) => {
    console.log(`Bookmark ${id}:`, isBookmarked);
  };

  // فیلتر کردن کارجوها
  const filteredJobSeekers = jobSeekers.filter((jobSeeker) => {
    const matchesSearch =
      searchQuery === "" ||
      jobSeeker.firstName.includes(searchQuery) ||
      jobSeeker.lastName.includes(searchQuery) ||
      jobSeeker.jobTitle.includes(searchQuery) ||
      jobSeeker.topSkills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesProvince =
      selectedProvince === "all" || jobSeeker.province === selectedProvince;

    const matchesLocation =
      selectedLocation === "all" || jobSeeker.city === selectedLocation;

    return matchesSearch && matchesProvince && matchesLocation;
  });

  // محاسبه pagination
  const totalPages = Math.ceil(filteredJobSeekers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentJobSeekers = filteredJobSeekers.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // اسکرول به بالای صفحه
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ریست کردن صفحه وقتی فیلترها تغییر می‌کند
  React.useEffect(() => {
    setCurrentPage(1);
  }, [
    searchQuery,
    selectedCategory,
    selectedProvince,
    selectedLocation,
    sortBy,
  ]);

  return (
    <div className="min-h-screen bg-black/90">
      {/* Header */}
      <div className=" backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              استعدادهای برتر ایران
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              بهترین کارجوها و متخصصان را پیدا کنید
            </p>

            {/* آمار کلی */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 rounded-xl p-4 border border-yellow-400/20">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="w-6 h-6 text-yellow-400" />
                  <span className="text-2xl font-bold text-white">۱,۲۳۴</span>
                </div>
                <p className="text-gray-400">کارجوی فعال</p>
              </div>

              <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-xl p-4 border border-blue-400/20">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Briefcase className="w-6 h-6 text-blue-400" />
                  <span className="text-2xl font-bold text-white">۸۹</span>
                </div>
                <p className="text-gray-400">تخصص مختلف</p>
              </div>

              <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-xl p-4 border border-green-400/20">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                  <span className="text-2xl font-bold text-white">۹۲%</span>
                </div>
                <p className="text-gray-400">نرخ موفقیت</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* فیلترها و جستجو */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* جستجو */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="جستجو در نام، تخصص، مهارت..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-12 pl-4 py-3  border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
            </div>

            {/* دسته‌بندی */}
            <div>
              <CustomSelect
                options={categories.map((cat) => cat.label)}
                value={
                  categories.find((cat) => cat.value === selectedCategory)
                    ?.label || "همه دسته‌ها"
                }
                onChange={(label) => {
                  const category = categories.find(
                    (cat) => cat.label === label
                  );
                  setSelectedCategory(category ? category.value : "all");
                }}
                placeholder="همه دسته‌ها"
              />
            </div>

            {/* استان */}
            <div>
              <CustomSelect
                options={provinces.map((prov) => prov.label)}
                value={
                  provinces.find((prov) => prov.value === selectedProvince)
                    ?.label || "همه استان‌ها"
                }
                onChange={(label) => {
                  const province = provinces.find(
                    (prov) => prov.label === label
                  );
                  setSelectedProvince(province ? province.value : "all");
                  setSelectedLocation("all"); // ریست کردن شهر وقتی استان تغییر می‌کند
                }}
                placeholder="همه استان‌ها"
              />
            </div>

            {/* شهر */}
            <div>
              <CustomSelect
                options={locations.map((loc) => loc.label)}
                value={
                  locations.find((loc) => loc.value === selectedLocation)
                    ?.label || "همه شهرها"
                }
                onChange={(label) => {
                  const location = locations.find((loc) => loc.label === label);
                  setSelectedLocation(location ? location.value : "all");
                }}
                placeholder="همه شهرها"
              />
            </div>
          </div>

          {/* نتایج و مرتب‌سازی */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-700/50">
            <p className="text-gray-400">
              <span className="text-white font-medium">
                {filteredJobSeekers.length}
              </span>{" "}
              کارجو پیدا شد
            </p>

            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">مرتب‌سازی:</span>
              <div className="w-40">
                <CustomSelect
                  options={sortOptions.map((opt) => opt.label)}
                  value={
                    sortOptions.find((opt) => opt.value === sortBy)?.label ||
                    "جدیدترین"
                  }
                  onChange={(label) => {
                    const option = sortOptions.find(
                      (opt) => opt.label === label
                    );
                    setSortBy(option ? option.value : "recent");
                  }}
                  placeholder="جدیدترین"
                />
              </div>
            </div>
          </div>
        </div>

        {/* لیست کارجوها */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {currentJobSeekers.map((jobSeeker) => (
            <JobSeekerCard
              key={jobSeeker.id}
              jobSeeker={jobSeeker}
              onViewProfile={handleViewProfile}
              onContact={handleContact}
              onBookmark={handleBookmark}
            />
          ))}
        </div>

        {/* پیام خالی بودن نتایج */}
        {filteredJobSeekers.length === 0 && (
          <div className="text-center py-16">
            <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              کارجویی پیدا نشد
            </h3>
            <p className="text-gray-500">لطفاً فیلترهای جستجو را تغییر دهید</p>
          </div>
        )}

        {/* Pagination */}
        {filteredJobSeekers.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            className="mt-12"
          />
        )}
      </div>
    </div>
  );
}
