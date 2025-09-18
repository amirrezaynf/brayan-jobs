"use client";

import React, { useState, useEffect, useRef } from "react";
import CustomSelect from "../../ui/CustomSelect";
import CustomInput from "../../ui/CustomInput";

// Data for countries
const countries = {
  ایران: {
    تهران: ["تهران", "شهریار", "اسلامشهر", "قدس", "ملارد"],
    "خراسان رضوی": ["مشهد", "سبزوار", "نیشابور", "تربت حیدریه"],
    اصفهان: ["اصفهان", "کاشان", "خمینی شهر", "نجف آباد"],
    فارس: ["شیراز", "کازرون", "جهرم", "مرودشت"],
    "آذربایجان شرقی": ["تبریز", "مراغه", "مرند", "میانه"],
    البرز: ["کرج", "فردیس", "کمال‌شهر", "نظرآباد"],
  },
  آلمان: {
    برلین: ["برلین", "پوتسدام"],
    بایرن: ["مونیخ", "نورنبرگ", "آگسبورگ"],
    هامبورگ: ["هامبورگ"],
  },
  کانادا: {
    انتاریو: ["تورنتو", "اتاوا", "هامیلتون"],
    "بریتیش کلمبیا": ["ونکوور", "ویکتوریا"],
    کبک: ["مونترال", "کبک سیتی"],
  },
  استرالیا: {
    "نیو ساوت ولز": ["سیدنی", "نیوکاسل"],
    ویکتوریا: ["ملبورن", "جیلانگ"],
    کوئینزلند: ["بریزبن", "گلد کوست"],
  },
};

// Job categories and their related specializations
const jobCategoriesWithSpecializations = {
  "فناوری اطلاعات": [
    "برنامه‌نویسی وب",
    "امنیت سایبری",
    "مدیریت شبکه",
    "پایگاه داده",
    "DevOps",
    "Cloud Computing",
  ],
  "مهندسی نرم‌افزار": [
    "توسعه موبایل",
    "توسعه وب",
    "مهندسی سیستم",
    "تست نرم‌افزار",
    "معماری نرم‌افزار",
    "Agile/Scrum",
  ],
  "طراحی و گرافیک": [
    "طراحی UI/UX",
    "طراحی گرافیک",
    "موشن گرافیک",
    "طراحی وب",
    "برندینگ",
    "عکاسی",
  ],
  "بازاریابی و فروش": [
    "بازاریابی دیجیتال",
    "SEO/SEM",
    "شبکه‌های اجتماعی",
    "فروش B2B",
    "فروش B2C",
    "تحلیل بازار",
  ],
  "مالی و حسابداری": [
    "حسابداری مالی",
    "حسابرسی",
    "مالیات",
    "تحلیل مالی",
    "بودجه‌ریزی",
    "کنترل مالی",
  ],
  "منابع انسانی": [
    "استخدام و گزینش",
    "آموزش و توسعه",
    "روابط کار",
    "جبران خدمات",
    "ارزیابی عملکرد",
    "HR Analytics",
  ],
  "مدیریت پروژه": [
    "PMP",
    "Agile Project Management",
    "Scrum Master",
    "مدیریت ریسک",
    "برنامه‌ریزی پروژه",
    "کنترل کیفیت",
  ],
  "پزشکی و سلامت": [
    "پزشک عمومی",
    "پزشک متخصص",
    "پرستاری",
    "داروسازی",
    "فیزیوتراپی",
    "تغذیه",
  ],
  "آموزش و تدریس": [
    "آموزش ابتدایی",
    "آموزش متوسطه",
    "آموزش عالی",
    "آموزش زبان",
    "آموزش آنلاین",
    "طراحی آموزشی",
  ],
  "حقوقی و قضایی": [
    "وکالت",
    "مشاوره حقوقی",
    "قراردادها",
    "حقوق تجاری",
    "حقوق کار",
    "دادرسی",
  ],
  "مهندسی عمران": [
    "طراحی سازه",
    "مدیریت پروژه عمرانی",
    "نقشه‌برداری",
    "مهندسی راه",
    "مهندسی آب",
    "مدیریت ساخت",
  ],
  "مهندسی مکانیک": [
    "طراحی مکانیکی",
    "تولید و ساخت",
    "تعمیر و نگهداری",
    "سیستم‌های حرارتی",
    "اتوماسیون صنعتی",
    "کنترل کیفیت",
  ],
  "مهندسی برق": [
    "قدرت و انرژی",
    "الکترونیک",
    "مخابرات",
    "کنترل و ابزاردقیق",
    "سیستم‌های قدرت",
    "انرژی‌های تجدیدپذیر",
  ],
  "معماری و شهرسازی": [
    "طراحی معماری",
    "شهرسازی",
    "طراحی داخلی",
    "مدیریت پروژه معماری",
    "BIM",
    "معماری سبز",
  ],
  "ترجمه و زبان": [
    "ترجمه انگلیسی",
    "ترجمه عربی",
    "ترجمه آلمانی",
    "ترجمه فرانسوی",
    "ویرایش متن",
    "تدریس زبان",
  ],
  "رسانه و ارتباطات": [
    "روزنامه‌نگاری",
    "تولید محتوا",
    "روابط عمومی",
    "رادیو و تلویزیون",
    "شبکه‌های اجتماعی",
    "عکاسی خبری",
  ],
  "گردشگری و هتلداری": [
    "مدیریت هتل",
    "راهنمای تور",
    "رزرواسیون",
    "خدمات مسافرتی",
    "تشریفات",
    "اکوتوریسم",
  ],
  "کشاورزی و دامپروری": [
    "کشت و زرع",
    "باغبانی",
    "دامپروری",
    "کشاورزی ارگانیک",
    "مدیریت مزرعه",
    "تغذیه دام",
  ],
  "صنایع غذایی": [
    "تولید مواد غذایی",
    "کنترل کیفیت غذا",
    "بسته‌بندی",
    "R&D غذایی",
    "ایمنی غذا",
    "تغذیه صنعتی",
  ],
  "نفت و گاز": [
    "اکتشاف",
    "حفاری",
    "پالایش",
    "مهندسی مخزن",
    "ایمنی HSE",
    "پتروشیمی",
  ],
  "حمل و نقل": [
    "لجستیک",
    "مدیریت انبار",
    "حمل و نقل جاده‌ای",
    "حمل و نقل دریایی",
    "مدیریت زنجیره تأمین",
    "ترخیص کالا",
  ],
  "بیمه و بانکداری": [
    "بانکداری خرد",
    "بانکداری شرکتی",
    "بیمه زندگی",
    "بیمه اموال",
    "سرمایه‌گذاری",
    "ریسک منجمنت",
  ],
};

// Job categories list
const jobCategories = Object.keys(jobCategoriesWithSpecializations);

// User types
const userTypes = [
  { value: "job_seeker", label: "کارجو" },
  { value: "employer", label: "کارفرما" },
];

// Helper component for Icons
const SearchIcon = () => (
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
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const UserIcon = () => (
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
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const CategoryIcon = () => (
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
  >
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

const SpecializationIcon = () => (
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
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
  </svg>
);

export default function JobSearch() {
  const [userType, setUserType] = useState("");
  const [jobCategory, setJobCategory] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const provinces = selectedCountry
    ? Object.keys(countries[selectedCountry])
    : [];
  const cities =
    selectedCountry && selectedProvince
      ? countries[selectedCountry][selectedProvince]
      : [];

  const specializations = jobCategory
    ? jobCategoriesWithSpecializations[jobCategory]
    : [];

  useEffect(() => {
    setSelectedProvince(""); // Reset province when country changes
    setSelectedCity(""); // Reset city when country changes
  }, [selectedCountry]);

  useEffect(() => {
    setSelectedCity(""); // Reset city when province changes
  }, [selectedProvince]);

  useEffect(() => {
    setSpecialization(""); // Reset specialization when job category changes
  }, [jobCategory]);

  return (
    <section className="dark-bg py-10 -mt-16 relative z-30">
      <div className="container mx-auto px-6">
        <div className="dark-card p-6 rounded-xl shadow-2xl shadow-black/30">
          {/* First Row - Job Search, Job Category, Specialization, User Type */}
          <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Job Search Input */}
            <div>
              <label
                htmlFor="search-job"
                className="block mb-2 text-sm font-medium text-gray-400"
              >
                عنوان شغلی، شرکت یا...
              </label>
              <div className="relative">
                <CustomInput placeholder="مثلا: توسعه‌دهنده React" />
                <span className="absolute left-3 top-4 text-gray-500">
                  <SearchIcon />
                </span>
              </div>
            </div>

            {/* Job Category */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-400 flex items-center gap-2">
                <CategoryIcon />
                دسته‌بندی شغلی
              </label>
              <CustomSelect
                options={jobCategories}
                value={jobCategory}
                onChange={setJobCategory}
                placeholder="انتخاب دسته‌بندی"
              />
            </div>

            {/* Specialization */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-400 flex items-center gap-2">
                <SpecializationIcon />
                تخصص
              </label>
              <CustomSelect
                options={specializations}
                value={specialization}
                onChange={setSpecialization}
                placeholder={
                  jobCategory ? "انتخاب تخصص" : "ابتدا دسته‌بندی را انتخاب کنید"
                }
                disabled={!jobCategory}
              />
            </div>

            {/* User Type - Radio Buttons */}
            <div className="flex items-center gap-5 md:mt-5">
              <label className="text-sm font-medium text-gray-400 flex items-center  gap-2">
                <UserIcon />
                جستجو در
              </label>
              <div className="flex gap-4">
                {userTypes.map((type) => (
                  <label
                    key={type.value}
                    className="flex items-center cursor-pointer group"
                  >
                    <input
                      type="radio"
                      name="userType"
                      value={type.value}
                      checked={userType === type.value}
                      onChange={(e) => setUserType(e.target.value)}
                      className="sr-only"
                    />
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                        userType === type.value
                          ? "border-yellow-500 bg-yellow-500"
                          : "border-gray-500 group-hover:border-yellow-400"
                      }`}
                    >
                      {userType === type.value && (
                        <div className="w-2 h-2 rounded-full bg-black"></div>
                      )}
                    </div>
                    <span
                      className={`mr-2 text-sm transition-colors duration-200 ${
                        userType === type.value
                          ? "text-yellow-400"
                          : "text-gray-300 group-hover:text-white"
                      }`}
                    >
                      {type.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Second Row - Location Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-400">
                کشور
              </label>
              <CustomSelect
                options={Object.keys(countries)}
                value={selectedCountry}
                onChange={setSelectedCountry}
                placeholder="همه کشورها"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-400">
                استان
              </label>
              <CustomSelect
                options={provinces}
                value={selectedProvince}
                onChange={setSelectedProvince}
                placeholder="همه استان‌ها"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-400">
                شهر
              </label>
              <CustomSelect
                options={cities}
                value={selectedCity}
                onChange={setSelectedCity}
                placeholder="همه شهرها"
              />
            </div>
            <button className="btn-primary w-full p-3 rounded-lg font-bold text-lg hover:bg-yellow-600 transition-colors duration-300">
              جستجو
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
