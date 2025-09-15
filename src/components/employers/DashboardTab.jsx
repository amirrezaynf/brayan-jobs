// components/employers/DashboardTab.js
import { Wallet, Star, FileText, ArrowLeft, Users, Eye, TrendingUp, Calendar, Bell, MessageSquare, FilePlus2 } from 'lucide-react';
import Link from 'next/link';

const StatCard = ({ icon, title, value, buttonText, buttonLink }) => (
  <div className=" border !border-yellow-500 rounded-lg p-6 flex flex-col justify-between shadow-lg  hover:translate-y-2 transition-all duration-300">
    <div>
      <div className="flex items-center gap-4">
        <div className=" p-3 rounded-full">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-300">{title}</h3>
      </div>
      <p className="text-4xl font-bold text-yellow-400 mt-4">{value}</p>
    </div>
    <Link href={buttonLink}>
      <button className="mt-6 w-full flex items-center justify-center gap-2 border bg-yellow-400 text-black hover:text-black font-semibold py-2 px-4 rounded-lg transition-all duration-300">
        <span>{buttonText}</span>
        <ArrowLeft size={18} />
      </button>
    </Link>
  </div>
);

const QuickActionCard = ({ icon, title, description, action }) => (
  <div className="border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-all duration-300 ">
    <div className="flex items-center gap-3 mb-2">
      {icon}
      <h4 className="font-semibold text-white">{title}</h4>
    </div>
    <p className="text-gray-400 text-sm mb-3">{description}</p>
    <button className="text-yellow-400 hover:text-yellow-300 text-sm font-medium transition-colors">
      {action}
    </button>
  </div>
);

const RecentActivity = ({ activities }) => (
  <div className="border border-gray-700 rounded-lg p-6 ">
    <h3 className="text-lg font-semibold text-white mb-4">فعالیت‌های اخیر</h3>
    <div className="space-y-3">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-center gap-3 p-3 border border-gray-700 rounded-lg">
          <div className="text-yellow-400">{activity.icon}</div>
          <div className="flex-1">
            <p className="text-white text-sm">{activity.description}</p>
            <p className="text-gray-400 text-xs">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function DashboardTab() {
  const recentActivities = [
    {
      icon: <Users size={16} />,
      description: "رزومه جدید برای موقعیت توسعه‌دهنده React دریافت شد",
      time: "۲ ساعت پیش"
    },
    {
      icon: <Eye size={16} />,
      description: "آگهی طراح UI/UX شما ۱۵ بازدید جدید داشته است",
      time: "۴ ساعت پیش"
    },
    {
      icon: <MessageSquare size={16} />,
      description: "پیام جدید از متقاضی علی احمدی",
      time: "۶ ساعت پیش"
    },
    {
      icon: <Star size={16} />,
      description: "بازخورد جدید از کارمند قبلی دریافت شد",
      time: "۱ روز پیش"
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">خلاصه فعالیت شما</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            icon={<Wallet className="text-yellow-400" size={24} />}
            title="موجودی کیف پول"
            value="۱,۲۵۰,۰۰۰ تومان"
            buttonText="مشاهده تراکنش‌ها"
            buttonLink="/employers/wallet"
          />
          <StatCard
            icon={<Star className="text-yellow-400" size={24} />}
            title="امتیاز کارفرما"
            value="۴.۸"
            buttonText="مشاهده بازخوردها"
            buttonLink="/employers/reviews"
          />
          <StatCard
            icon={<FileText className="text-yellow-400" size={24} />}
            title="آگهی‌های فعال"
            value="۳"
            buttonText="مدیریت آگهی‌ها"
            buttonLink="/employers/jobs"
          />
          <StatCard
            icon={<Users className="text-yellow-400" size={24} />}
            title="رزومه‌های دریافتی"
            value="۱۲"
            buttonText="مشاهده رزومه‌ها"
            buttonLink="/employers/resumes"
          />
          <StatCard
            icon={<Eye className="text-yellow-400" size={24} />}
            title="بازدید آگهی‌ها"
            value="۲,۳۴۵"
            buttonText="آمار تفصیلی"
            buttonLink="/employers/analytics"
          />
          <StatCard
            icon={<TrendingUp className="text-yellow-400" size={24} />}
            title="نرخ تبدیل"
            value="۱۸%"
            buttonText="بهبود آگهی‌ها"
            buttonLink="/employers/optimization"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">اقدامات سریع</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <QuickActionCard
              icon={<FilePlus2 className="text-yellow-400" size={20} />}
              title="ثبت آگهی جدید"
              description="آگهی استخدام جدید خود را منتشر کنید"
              action="شروع کنید →"
            />
            <QuickActionCard
              icon={<Users className="text-green-400" size={20} />}
              title="بررسی رزومه‌ها"
              description="۴ رزومه در انتظار بررسی شما"
              action="مشاهده →"
            />
            <QuickActionCard
              icon={<Bell className="text-blue-400" size={20} />}
              title="اعلان‌ها"
              description="۳ اعلان جدید دارید"
              action="مشاهده →"
            />
            <QuickActionCard
              icon={<Calendar className="text-purple-400" size={20} />}
              title="مصاحبه‌ها"
              description="۲ مصاحبه برای امروز برنامه‌ریزی شده"
              action="تقویم →"
            />
          </div>
        </div>

        <RecentActivity activities={recentActivities} />
      </div>

      <div className="border border-gray-700 rounded-lg p-6 ">
        <h3 className="text-xl font-semibold text-white mb-4">آمار این ماه</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">۸۵</div>
            <div className="text-sm text-gray-400">رزومه دریافتی</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">۲۳</div>
            <div className="text-sm text-gray-400">مصاحبه انجام شده</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">۷</div>
            <div className="text-sm text-gray-400">استخدام موفق</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">۹۲%</div>
            <div className="text-sm text-gray-400">رضایت متقاضیان</div>
          </div>
        </div>
      </div>
    </div>
  );
}