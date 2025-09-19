import React from "react";
import KarjooHeader from "@/components/layout/header/KarjooHeader";
import KarjooDashboard from "@/components/modules/karjoo/KarjooDashboard";

// Server-side rendered page
export default function KarjooPage() {
  return (
    <div className="flex min-h-screen bg-black/10 text-gray-200">
      <KarjooDashboard />

      {/* Main Content Area */}
      <div className="bg-black/90  flex-1 lg:mr-64">
        {/* Header */}
        <KarjooHeader />

        {/* Main Content */}
        <main className="p-4 lg:p-6">
          <div className="space-y-6 lg:space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-xl p-4 lg:p-6 text-gray-900">
              <h2 className="text-xl lg:text-2xl font-bold mb-2 text-right">
                خوش آمدید علی عزیز!
              </h2>
              <p className="text-sm lg:text-base text-right">
                آماده برای پیدا کردن پروژه‌های جدید هستید؟
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              <div className=" rounded-xl p-4 lg:p-6 shadow-lg border border-gray-800">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-blue-400 bg-blue-400/10 rounded-full p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    رزومه‌های ارسالی
                  </h3>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-blue-400 mb-1">۱۲</p>
                  <p className="text-sm text-gray-400">این ماه</p>
                </div>
              </div>

              <div className=" rounded-xl p-4 lg:p-6 shadow-lg border border-gray-800">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-yellow-400 bg-yellow-400/10 rounded-full p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    نرخ موفقیت
                  </h3>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-yellow-400 mb-1">۲۵%</p>
                  <p className="text-sm text-gray-400">میانگین</p>
                </div>
              </div>

              <div className=" rounded-xl p-4 lg:p-6 shadow-lg border border-gray-800">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-purple-400 bg-purple-400/10 rounded-full p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    بازدید پروفایل
                  </h3>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-purple-400 mb-1">۱۵۶</p>
                  <p className="text-sm text-gray-400">این هفته</p>
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
              <div className=" rounded-xl p-4 lg:p-6 shadow-lg border border-gray-800">
                <h3 className="text-xl font-bold mb-4 text-white text-right">
                  فعالیت‌های اخیر
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      action: "ارسال رزومه",
                      company: "شرکت فناوری آریا",
                      time: "۲ ساعت پیش",
                      status: "success",
                    },
                    {
                      action: "دعوت به مصاحبه",
                      company: "استودیو طراحی نوین",
                      time: "۱ روز پیش",
                      status: "info",
                    },
                    {
                      action: "بروزرسانی پروفایل",
                      company: "",
                      time: "۳ روز پیش",
                      status: "warning",
                    },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border border-gray-800 rounded-lg"
                    >
                      <div className="text-right flex-1">
                        <p className="text-white font-medium">
                          {activity.action}
                        </p>
                        {activity.company && (
                          <p className="text-gray-400 text-sm">
                            {activity.company}
                          </p>
                        )}
                      </div>
                      <div className="text-left">
                        <p className="text-gray-400 text-sm">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className=" rounded-xl p-4 lg:p-6 shadow-lg border border-gray-800">
                <h3 className="text-xl font-bold mb-4 text-white text-right">
                  پیشنهادات شغلی
                </h3>
                <div className="space-y-4 ">
                  {[
                    {
                      title: "توسعه‌دهنده React",
                      company: "تک‌نولوژی پارس",
                      salary: "۱۵-۲۰ میلیون",
                      type: "تمام وقت",
                    },
                    {
                      title: "طراح UI/UX",
                      company: "استودیو کریتیو",
                      salary: "۱۰-۱۵ میلیون",
                      type: "پاره وقت",
                    },
                    {
                      title: "برنامه‌نویس Python",
                      company: "داده‌کاوان",
                      salary: "۱۸-۲۵ میلیون",
                      type: "دورکاری",
                    },
                  ].map((job, index) => (
                    <div
                      key={index}
                      className="p-4 border border-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
                    >
                      <div className="text-right">
                        <h4 className="text-white font-semibold">
                          {job.title}
                        </h4>
                        <p className="text-gray-400 text-sm">{job.company}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-yellow-400 text-sm">
                            {job.type}
                          </span>
                          <span className="text-green-400 text-sm">
                            {job.salary} تومان
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
