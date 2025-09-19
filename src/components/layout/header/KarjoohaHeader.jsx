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

function KarjoohaHeader() {
  return (
    <div className=' backdrop-blur-md border-b border-gray-800'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold text-white mb-4'>
            استعدادهای برتر ایران
          </h1>
          <p className='text-xl text-gray-300 mb-8'>
            بهترین کارجوها و متخصصان را پیدا کنید
          </p>

          {/* آمار کلی */}
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8'>
            <div className='bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 rounded-xl p-4 border border-yellow-400/20'>
              <div className='flex items-center justify-center gap-2 mb-2'>
                <Users className='w-6 h-6 text-yellow-400' />
                <span className='text-2xl font-bold text-white'>۱,۲۳۴</span>
              </div>
              <p className='text-gray-400'>کارجوی فعال</p>
            </div>

            <div className='bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-xl p-4 border border-blue-400/20'>
              <div className='flex items-center justify-center gap-2 mb-2'>
                <Briefcase className='w-6 h-6 text-blue-400' />
                <span className='text-2xl font-bold text-white'>۸۹</span>
              </div>
              <p className='text-gray-400'>تخصص مختلف</p>
            </div>

            <div className='bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-xl p-4 border border-green-400/20'>
              <div className='flex items-center justify-center gap-2 mb-2'>
                <TrendingUp className='w-6 h-6 text-green-400' />
                <span className='text-2xl font-bold text-white'>۹۲%</span>
              </div>
              <p className='text-gray-400'>نرخ موفقیت</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KarjoohaHeader;
