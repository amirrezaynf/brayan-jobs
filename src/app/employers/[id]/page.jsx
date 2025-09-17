"use client";
import React from "react";
import Link from "next/link";
import { COMPANY_DATA } from "@/constants/companyData";

// Function to get all company data from constants
const getCompanyData = () => {
  const data = { ...COMPANY_DATA };

  // Calculate employee count from company size
  let employeeCount = "کمتر از 50 نفر";
  if (data.companySize === "1-10") employeeCount = "1-10 نفر";
  else if (data.companySize === "11-50") employeeCount = "11-50 نفر";
  else if (data.companySize === "51-100") employeeCount = "51-100 نفر";
  else if (data.companySize === "101-500") employeeCount = "101-500 نفر";
  else if (data.companySize === "500+") employeeCount = "بیش از 500 نفر";

  // Map industry type to Persian
  const industryMap = {
    technology: "فناوری اطلاعات",
    manufacturing: "تولیدی",
    service: "خدماتی",
    finance: "مالی و بانکی",
    healthcare: "بهداشت و درمان",
    education: "آموزشی",
    retail: "خرده فروشی",
    construction: "ساخت و ساز",
  };

  // Map company type to Persian
  const companyTypeMap = {
    private: "خصوصی",
    public: "دولتی",
    "semi-public": "نیمه دولتی",
    cooperative: "تعاونی",
  };

  return {
    id: 9, // Company ID for single employer page
    ...data,
    name: data.companyName,
    companyName: data.companyName,
    logo: "DB",
    industry: industryMap[data.industryType] || "فناوری اطلاعات",
    location: data.city,
    description: data.description,
    employeeCount,
    openPositions: 3,
    website: data.website,
    foundedYear: parseInt(data.establishedYear),
    rating: 4.9,
    reviews: 215,
    benefits: data.benefits,
    isVerified: true,
    address: data.address,
    phone: data.phone,
    mobile: data.mobile,
    email: data.email,
    linkedin: data.linkedin,
    instagram: data.instagram,
    telegram: data.telegram,
    services: data.services,
    specialties: data.specialties,
    vision: data.vision,
    mission: data.mission,
    workEnvironment: data.workEnvironment,
    companyValues: ["نوآوری و خلاقیت", "یادگیری مداوم", "تعالی کاری"],
  };
};

// Mock employer data - including our company data
const mockEmployers = [
  {
    id: 1,
    name: "دیجی‌کالا",
    logo: "D",
    industry: "فروشگاه آنلاین و فناوری",
    location: "تهران",
    description: "بزرگترین فروشگاه آنلاین ایران با بیش از ۱۰ سال تجربه.",
    employeeCount: "1000+ نفر",
    openPositions: 15,
    website: "digikala.com",
    foundedYear: 1385,
    rating: 4.8,
    reviews: 1250,
    benefits: ["بیمه تکمیلی", "غذای رایگان"],
    isVerified: true,
  },
  getCompanyData(),
];

const StarIcon = ({ filled = false }) => (
  <svg
    className={`w-4 h-4 ${filled ? "text-yellow-400" : "text-gray-600"}`}
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    />
  </svg>
);

export default function EmployerSinglePage({ params }) {
  const resolvedParams = React.use(params);
  const employerId = parseInt(resolvedParams.id);
  const employer = mockEmployers.find((emp) => emp.id === employerId);

  if (!employer) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">شرکت یافت نشد</h1>
          <Link href="/employers" className="text-yellow-400 hover:underline">
            بازگشت به لیست شرکت‌ها
          </Link>
        </div>
      </div>
    );
  }

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<StarIcon key={i} filled={i < Math.floor(rating)} />);
    }
    return stars;
  };

  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white font-sans" dir="rtl">
      {/* Header */}
      <header className="bg-[#1a1a1a] shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center text-yellow-400">
              <svg
                className="w-8 h-8 ml-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
                />
              </svg>
              دکتر برایان اعتماد
            </Link>
            <Link
              href="/employers"
              className="text-white hover:text-yellow-400"
            >
              بازگشت به لیست
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-12 bg-[#1a1a1a]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-400/20 to-yellow-600/30 rounded-2xl flex items-center justify-center text-yellow-400 font-bold text-3xl mx-auto mb-6 border border-yellow-400/30">
                {employer.logo}
              </div>
              <div className="flex items-center justify-center gap-3 mb-4">
                <h1 className="text-3xl font-bold">{employer.name}</h1>
                {employer.isVerified && (
                  <svg
                    className="w-6 h-6 text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                )}
              </div>
              <p className="text-gray-400 text-lg mb-2">
                {employer.industry} • {employer.location}
              </p>
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="flex items-center gap-1">
                  {renderStars(employer.rating)}
                </div>
                <span className="text-yellow-400 font-semibold">
                  {employer.rating}
                </span>
                <span className="text-gray-400">({employer.reviews} نظر)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-[#2a2a2a] p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  {employer.employeeCount}
                </div>
                <div className="text-gray-400 text-sm">کارمندان</div>
              </div>
              <div className="bg-[#2a2a2a] p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  {employer.openPositions}
                </div>
                <div className="text-gray-400 text-sm">جایگاه‌های شغلی</div>
              </div>
              <div className="bg-[#2a2a2a] p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  {new Date().getFullYear() - employer.foundedYear} سال
                </div>
                <div className="text-gray-400 text-sm">سابقه فعالیت</div>
              </div>
              <div className="bg-[#2a2a2a] p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  سطح بالا
                </div>
                <div className="text-gray-400 text-sm">کیفیت شرکت</div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Tabs */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* About Company */}
              <div className="lg:col-span-2">
                <div className="bg-[#1a1a1a] rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-bold mb-4">درباره شرکت</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {employer.description}
                  </p>
                  {employer.vision && (
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold mb-2 text-yellow-400">
                        چشم‌انداز
                      </h4>
                      <p className="text-gray-300">{employer.vision}</p>
                    </div>
                  )}
                  {employer.mission && (
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold mb-2 text-yellow-400">
                        مأموریت
                      </h4>
                      <p className="text-gray-300">{employer.mission}</p>
                    </div>
                  )}
                </div>

                <div className="bg-[#1a1a1a] rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">مزایای همکاری</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {employer.benefits.map((benefit, index) => (
                      <div
                        key={index}
                        className="bg-[#2a2a2a] p-3 rounded-lg text-center"
                      >
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div>
                {/* Contact Info */}
                {employer.address && (
                  <div className="bg-[#1a1a1a] rounded-xl p-6 mb-6">
                    <h4 className="text-lg font-bold mb-4">اطلاعات تماس</h4>
                    <div className="space-y-3">
                      {employer.address && (
                        <p>
                          <strong>آدرس:</strong> {employer.address}
                        </p>
                      )}
                      {employer.phone && (
                        <p>
                          <strong>تلفن:</strong> {employer.phone}
                        </p>
                      )}
                      {employer.email && (
                        <p>
                          <strong>ایمیل:</strong> {employer.email}
                        </p>
                      )}
                      {employer.website && (
                        <p>
                          <strong>وب‌سایت:</strong>{" "}
                          <a
                            href={`http://${employer.website}`}
                            className="text-yellow-400 hover:underline"
                          >
                            {employer.website}
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Social Links */}
                {(employer.linkedin || employer.instagram) && (
                  <div className="bg-[#1a1a1a] rounded-xl p-6 mb-6">
                    <h4 className="text-lg font-bold mb-4">شبکه‌های اجتماعی</h4>
                    <div className="flex gap-4">
                      {employer.linkedin && (
                        <a
                          href={employer.linkedin}
                          target="_blank"
                          rel="noopener"
                          className="text-blue-400 hover:text-blue-300"
                        >
                          LinkedIn
                        </a>
                      )}
                      {employer.instagram && (
                        <a
                          href={employer.instagram}
                          target="_blank"
                          rel="noopener"
                          className="text-pink-400 hover:text-pink-300"
                        >
                          Instagram
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="bg-[#1a1a1a] rounded-xl p-6">
                  <div className="space-y-4">
                    <Link
                      href={`/jobs?company=${employer.id}`}
                      className="w-full bg-yellow-400 text-black py-3 px-6 rounded-lg font-semibold hover:bg-yellow-300 transition block text-center"
                    >
                      مشاهده موقعیت‌های شغلی ({employer.openPositions})
                    </Link>
                    <Link
                      href="/resume"
                      className="w-full bg-gray-700 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition block text-center"
                    >
                      ارسال رزومه
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] border-t border-gray-800 mt-16">
        <div className="container mx-auto px-6 py-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} پلتفرم استخدامی دکتر برایان
            اعتماد. تمام حقوق محفوظ است.
          </p>
        </div>
      </footer>
    </div>
  );
}
