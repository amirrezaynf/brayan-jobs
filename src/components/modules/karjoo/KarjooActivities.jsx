import React from "react";

export default function KarjooActivities() {
  const activities = [
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
  ];

  return (
    <div className="rounded-xl p-4 lg:p-6 shadow-lg border border-gray-800">
      <h3 className="text-xl font-bold mb-4 text-white text-right">
        فعالیت‌های اخیر
      </h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 border border-gray-800 rounded-lg"
          >
            <div className="text-right flex-1">
              <p className="text-white font-medium">{activity.action}</p>
              {activity.company && (
                <p className="text-gray-400 text-sm">{activity.company}</p>
              )}
            </div>
            <div className="text-left">
              <p className="text-gray-400 text-sm">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
