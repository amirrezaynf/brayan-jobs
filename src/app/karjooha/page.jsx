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
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-yellow-400/30 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-400/10">
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
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <div className="bg-black/80 backdrop-blur-md border-b border-gray-800">
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
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 mb-8">
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
                  className="w-full pr-12 pl-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
            </div>

            {/* دسته‌بندی */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* استان */}
            <div>
              <select
                value={selectedProvince}
                onChange={(e) => {
                  setSelectedProvince(e.target.value);
                  setSelectedLocation("all"); // ریست کردن شهر وقتی استان تغییر می‌کند
                }}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              >
                {provinces.map((province) => (
                  <option key={province.value} value={province.value}>
                    {province.label}
                  </option>
                ))}
              </select>
            </div>

            {/* شهر */}
            <div>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              >
                {locations.map((location) => (
                  <option key={location.value} value={location.value}>
                    {location.label}
                  </option>
                ))}
              </select>
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
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option value="recent">جدیدترین</option>
                <option value="popular">محبوب‌ترین</option>
                <option value="experience">بیشترین تجربه</option>
                <option value="salary">حقوق</option>
              </select>
            </div>
          </div>
        </div>

        {/* لیست کارجوها */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredJobSeekers.map((jobSeeker) => (
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
          <div className="flex justify-center mt-12">
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors">
                قبلی
              </button>
              <button className="px-4 py-2 bg-yellow-500 text-black rounded-lg font-medium">
                ۱
              </button>
              <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors">
                ۲
              </button>
              <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors">
                ۳
              </button>
              <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors">
                بعدی
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
