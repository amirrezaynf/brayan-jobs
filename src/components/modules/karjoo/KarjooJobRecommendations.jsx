import React from "react";

export default function KarjooJobRecommendations() {
  const jobs = [
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
  ];

  return (
    <div className="rounded-xl p-4 lg:p-6 shadow-lg border border-gray-800">
      <h3 className="text-xl font-bold mb-4 text-white text-right">
        پیشنهادات شغلی
      </h3>
      <div className="space-y-4">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="p-4 border border-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
          >
            <div className="text-right">
              <h4 className="text-white font-semibold">{job.title}</h4>
              <p className="text-gray-400 text-sm">{job.company}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-yellow-400 text-sm">{job.type}</span>
                <span className="text-green-400 text-sm">
                  {job.salary} تومان
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
