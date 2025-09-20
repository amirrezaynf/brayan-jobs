import React from "react";
import { Send, TrendingUp, Eye } from "lucide-react";

export default function KarjooStats() {
  const stats = [
    {
      title: "رزومه‌های ارسالی",
      value: "۱۲",
      subtitle: "این ماه",
      color: "blue",
      icon: Send,
    },
    {
      title: "نرخ موفقیت",
      value: "۲۵%",
      subtitle: "میانگین",
      color: "yellow",
      icon: TrendingUp,
    },
    {
      title: "بازدید پروفایل",
      value: "۱۵۶",
      subtitle: "این هفته",
      color: "purple",
      icon: Eye,
    },
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: {
        text: "text-blue-400",
        bg: "bg-blue-400/10",
      },
      yellow: {
        text: "text-yellow-400",
        bg: "bg-yellow-400/10",
      },
      purple: {
        text: "text-purple-400",
        bg: "bg-purple-400/10",
      },
    };
    return colorMap[color];
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {stats.map((stat, index) => {
        const colors = getColorClasses(stat.color);
        const IconComponent = stat.icon;

        return (
          <div
            key={index}
            className="rounded-xl p-4 lg:p-6 shadow-lg border border-gray-800"
          >
            <div className="flex justify-between items-center mb-4">
              <div className={`${colors.text} ${colors.bg} rounded-full p-2`}>
                <IconComponent className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold text-white">{stat.title}</h3>
            </div>
            <div className="text-right">
              <p className={`text-3xl font-bold ${colors.text} mb-1`}>
                {stat.value}
              </p>
              <p className="text-sm text-gray-400">{stat.subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
