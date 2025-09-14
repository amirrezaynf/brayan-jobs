// components/employers/DashboardTab.js
import { Wallet, Star, FileText, ArrowLeft } from 'lucide-react';
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

export default function DashboardTab() {
  return (
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
      </div>
    </div>
  );
}