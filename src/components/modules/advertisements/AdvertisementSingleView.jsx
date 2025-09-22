import React from "react";
import Link from "next/link";
import {
  MapPin,
  Building2,
  Clock,
  DollarSign,
  Users,
  Calendar,
  CheckCircle,
  Star,
  ArrowLeft,
  Share2,
  Bookmark,
  Send,
} from "lucide-react";

export default function AdvertisementSingleView({ advertisement }) {
  // Helper function to convert Gregorian date to Jalali
  const toJalali = (gregorianDate) => {
    if (!gregorianDate) return "نامشخص";
    const gDate = new Date(gregorianDate);
    return gDate.toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Helper function to format salary
  const formatSalary = (salary) => {
    if (!salary || salary === 0) return "توافقی";
    return new Intl.NumberFormat("fa-IR").format(salary) + " تومان";
  };

  // Helper function to get contract type in Persian
  const getContractTypePersian = (contractType) => {
    const types = {
      "full-time": "تمام وقت",
      "part-time": "پاره وقت",
      contract: "قراردادی",
      freelance: "فریلنسری",
      internship: "کارآموزی",
    };
    return types[contractType] || contractType;
  };

  // Helper function to get experience level in Persian
  const getExperienceLevelPersian = (level) => {
    const levels = {
      fresh: "تازه کار",
      "1-2": "۱-۲ سال",
      "2-5": "۲-۵ سال",
      "5+": "بیش از ۵ سال",
    };
    return levels[level] || level;
  };

  if (!advertisement) {
    return (
      <div className="min-h-screen bg-black py-8">
        <div className="container mx-auto px-6">
          <div className="text-center text-white">
            <h1 className="text-2xl font-bold mb-4">آگهی یافت نشد</h1>
            <Link
              href="/advertisements"
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              بازگشت به لیست آگهی‌ها
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  py-8">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header with back button */}
        <div className="mb-8">
          <Link
            href="/advertisements"
            className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors duration-200 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            بازگشت به لیست آگهی‌ها
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Header */}
            <div className="bg-gradient-to-br  backdrop-blur-sm rounded-xl p-8 border border-gray-700">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    {advertisement.is_urgent && (
                      <span className="bg-yellow-500/20 text-yellow-400 text-xs px-3 py-1 rounded-full font-medium">
                        فوری
                      </span>
                    )}
                    <span className=" text-blue-400 text-xs px-3 py-1 rounded-full font-medium">
                      {getContractTypePersian(advertisement.contract_type)}
                    </span>
                  </div>

                  <h1 className="text-3xl font-bold text-white mb-4">
                    {advertisement.title}
                  </h1>

                  <div className="flex items-center gap-6 text-gray-300 mb-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-yellow-400" />
                      <span>
                        {advertisement.company?.display_name ||
                          advertisement.company?.name ||
                          "نامشخص"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-yellow-400" />
                      <span>{advertisement.location_text || "نامشخص"}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-yellow-400" />
                      <span>{toJalali(advertisement.published_at)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>
                      سطح تجربه:{" "}
                      {getExperienceLevelPersian(
                        advertisement.experience_level
                      )}
                    </span>
                    {advertisement.days_until_expiry > 0 && (
                      <span>مهلت: {advertisement.days_until_expiry} روز</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button className="p-3  rounded-lg transition-colors duration-200">
                    <Share2 className="w-5 h-5 text-gray-300" />
                  </button>
                  <button className="p-3  rounded-lg transition-colors duration-200">
                    <Bookmark className="w-5 h-5 text-gray-300" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-700">
                <div className="text-2xl font-bold text-yellow-400">
                  {formatSalary(advertisement.salary)}
                </div>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  ارسال رزومه
                </button>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-gradient-to-br  rounded-xl p-8 border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-6">شرح شغل</h2>
              <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                {advertisement.description || "شرح شغل ارائه نشده است."}
              </div>
            </div>

            {/* Requirements */}
            {advertisement.requirements && (
              <div className="bg-gradient-to-br  rounded-xl p-8 border border-gray-700">
                <h2 className="text-xl font-bold text-white mb-6">
                  الزامات شغل
                </h2>
                <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {advertisement.requirements}
                </div>
              </div>
            )}

            {/* Responsibilities */}
            {advertisement.responsibilities && (
              <div className="bg-gradient-to-br  rounded-xl p-8 border border-gray-700">
                <h2 className="text-xl font-bold text-white mb-6">
                  مسئولیت‌های شغل
                </h2>
                <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {advertisement.responsibilities}
                </div>
              </div>
            )}

            {/* Required Skills */}
            {advertisement.required_skills &&
              advertisement.required_skills.length > 0 && (
                <div className="bg-gradient-to-br  rounded-xl p-8 border border-gray-700">
                  <h2 className="text-xl font-bold text-white mb-6">
                    مهارت‌های مورد نیاز
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {advertisement.required_skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-lg text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            {/* Benefits */}
            {advertisement.benefits && advertisement.benefits.length > 0 && (
              <div className="bg-gradient-to-br  rounded-xl p-8 border border-gray-700">
                <h2 className="text-xl font-bold text-white mb-6">
                  مزایا و تسهیلات
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {advertisement.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Info */}
            {advertisement.company && (
              <div className="bg-gradient-to-br  rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">
                  درباره شرکت
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <div className="font-medium text-white">
                        {advertisement.company.display_name ||
                          advertisement.company.name}
                      </div>
                      <div className="text-sm text-gray-400">شرکت</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Job Details */}
            <div className="bg-gradient-to-br  rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4">جزئیات شغل</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">نوع همکاری</span>
                  <span className="text-white font-medium">
                    {getContractTypePersian(advertisement.contract_type)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400">سطح تجربه</span>
                  <span className="text-white font-medium">
                    {getExperienceLevelPersian(advertisement.experience_level)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400">حقوق</span>
                  <span className="text-white font-medium">
                    {formatSalary(advertisement.salary)}
                  </span>
                </div>

                {advertisement.working_hours && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">ساعات کاری</span>
                    <span className="text-white font-medium">
                      {advertisement.working_hours}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-gray-400">دورکاری</span>
                  <span className="text-white font-medium">
                    {advertisement.is_remote_possible
                      ? "امکان‌پذیر"
                      : "غیرممکن"}
                  </span>
                </div>

                {advertisement.travel_required !== undefined && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">سفرهای کاری</span>
                    <span className="text-white font-medium">
                      {advertisement.travel_required ? "دارد" : "ندارد"}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Apply Button (Mobile) */}
            <div className="lg:hidden">
              <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2">
                <Send className="w-5 h-5" />
                ارسال رزومه
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
