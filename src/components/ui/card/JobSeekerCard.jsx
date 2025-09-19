"use client";

import { useState } from "react";
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
import Tag from "../tags/Tag";
import Link from "next/link";

// کامپوننت کارت کارجو
const JobSeekerCard = ({ jobSeeker, onViewProfile, onContact, onBookmark }) => {
  const [isBookmarked, setIsBookmarked] = useState(
    jobSeeker.isBookmarked || false
  );

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark(jobSeeker.id, !isBookmarked);
  };

  return (
    <div className='bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-yellow-400/30 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-400/10'>
      {/* Header کارت */}
      <div className='flex items-start justify-between mb-4'>
        <div className='flex items-center gap-4'>
          <div className='relative'>
            <img
              src={jobSeeker.profileImage}
              alt={`${jobSeeker.firstName} ${jobSeeker.lastName}`}
              className='w-16 h-16 rounded-full object-cover border-2 border-yellow-400/20'
            />
            <div className='absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-gray-900 flex items-center justify-center'>
              <div className='w-2 h-2 bg-white rounded-full'></div>
            </div>
          </div>

          <div>
            <h3 className='text-lg font-bold text-white'>
              {jobSeeker.firstName} {jobSeeker.lastName}
            </h3>
            <p className='text-yellow-400 font-medium'>{jobSeeker.jobTitle}</p>
            <div className='flex items-center gap-2 mt-1 text-sm text-gray-400'>
              <MapPin className='w-3 h-3' />
              <span>
                {jobSeeker.city}، {jobSeeker.province}
              </span>
            </div>
          </div>
        </div>

        <div className='flex items-center gap-2'>
         
          <div className='flex items-center gap-1 text-xs text-gray-400'>
            <Eye className='w-3 h-3 mb-1' />
            <span>{jobSeeker.profileViews}</span>
          </div>
        </div>
      </div>

      {/* اطلاعات اصلی */}
      <div className='space-y-4'>
        {/* تجربه کاری */}
        <div>
          <div className='flex items-center gap-2 mb-2'>
            <Briefcase className='w-4 h-4 text-blue-400' />
            <span className='text-sm font-medium text-gray-300'>
              تجربه کاری
            </span>
          </div>
          <p className='text-sm text-gray-400 leading-relaxed'>
            {jobSeeker.lastExperience}
          </p>
        </div>

        {/* مهارت‌های کلیدی */}
        <div>
          <div className='flex items-center gap-2 mb-2'>
            <Star className='w-4 h-4 text-yellow-400' />
            <span className='text-sm font-medium text-gray-300'>
              مهارت‌های کلیدی
            </span>
          </div>
          <div className='flex flex-wrap gap-1'>
            {jobSeeker.topSkills.slice(0, 4).map((skill, index) => (
              <Tag key={index} color='blue' size='xs'>
                {skill}
              </Tag>
            ))}
            {jobSeeker.topSkills.length > 4 && (
              <Tag color='purple' size='xs'>
                +{jobSeeker.topSkills.length - 4}
              </Tag>
            )}
          </div>
        </div>

        {/* زبان‌ها */}
        {jobSeeker.languages.length > 0 && (
          <div>
            <div className='flex items-center gap-2 mb-2'>
              <Languages className='w-4 h-4 text-purple-400' />
              <span className='text-sm font-medium text-gray-300'>زبان‌ها</span>
            </div>
            <div className='flex flex-wrap gap-1'>
              {jobSeeker.languages.map((lang, index) => (
                <Tag key={index} color='purple' size='xs'>
                  {lang.language} - {lang.proficiency}
                </Tag>
              ))}
            </div>
          </div>
        )}

        {/* حقوق مورد انتظار */}
        {jobSeeker.expectedSalary && (
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <DollarSign className='w-4 h-4 text-green-400' />
              <span className='text-sm font-medium text-gray-300'>
                حقوق مورد انتظار
              </span>
            </div>
            <Tag color='green' size='sm'>
              {parseInt(jobSeeker.expectedSalary).toLocaleString("fa-IR")} تومان
            </Tag>
          </div>
        )}

        {/* آخرین فعالیت */}
        <div className='flex items-center justify-between text-xs text-gray-500'>
          <div className='flex items-center gap-1'>
            <Clock className='w-3 h-3' />
            <span>آخرین بروزرسانی: {jobSeeker.lastUpdate}</span>
          </div>
          
        </div>
      </div>

      {/* دکمه‌های اقدام */}
      <div className='flex gap-2 mt-6 pt-4 border-t border-gray-700/50'>
        <Link href={`/karjooha/${jobSeeker.id}`}
          className='flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg transition-colors font-medium text-sm'>
          <User className='w-4 h-4' />
          مشاهده رزومه
        </Link>
        
      </div>
    </div>
  );
};

export default JobSeekerCard;
