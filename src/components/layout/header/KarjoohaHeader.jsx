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
    <div className="relative">
      {/* Banner Image */}
      <div className="w-full h-64 md:h-80 lg:h-96 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
          alt="استعدادهای برتر ایران"
          className="w-full h-full object-cover"
        />

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/10"></div>

        {/* Optional text overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
              استعدادهای برتر ایران
            </h1>
            <p className="text-xl md:text-2xl drop-shadow-md">
              بهترین کارجوها و متخصصان را پیدا کنید
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KarjoohaHeader;
