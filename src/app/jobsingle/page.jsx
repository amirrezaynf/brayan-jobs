"use client"
import React, { useState } from 'react';
import { Briefcase, MapPin, Calendar, FileText, GraduationCap, DollarSign, User, Award, ShieldCheck, Mail, Phone, UploadCloud, ChevronsRight, Trash, Trash2 } from 'lucide-react';

// A custom component for detail items to avoid repetition
const DetailItem = ({ icon: Icon, label, value }) => (
  <div className="flex flex-col items-center justify-center text-center p-4  rounded-xl border border-gray-700 h-full">
    <div className="flex items-center justify-center w-12 h-12 mb-3 bg-yellow-400/10 text-yellow-400 rounded-full">
      <Icon size={24} />
    </div>
    <p className="text-sm text-gray-400 mb-1">{label}</p>
    <p className="font-semibold text-white">{value}</p>
  </div>
);

// A custom component for form input fields
const FormInput = ({ id, label, type = 'text', placeholder, required = true }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2 text-right">
      {label} {required && <span className="text-yellow-400">*</span>}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      placeholder={placeholder}
      className="w-full  border border-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 placeholder-gray-500"
      required={required}
    />
  </div>
);

// Custom File Upload Component
const FileUpload = ({ id, label, multiple = false }) => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(file => file.name);
      if (multiple) {
        // Add new files to existing ones
        setFiles(prevFiles => [...prevFiles, ...newFiles]);
      } else {
        // Replace existing file
        setFiles(newFiles);
      }
    }
  };

  const handleClick = () => {
    document.getElementById(id).click();
  };

  const removeFile = (indexToRemove) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };

  const clearAllFiles = () => {
    setFiles([]);
    // Reset the input value
    const input = document.getElementById(id);
    if (input) input.value = '';
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2 text-right">
        {label} <span className="text-yellow-400">*</span>
      </label>
      <div
        onClick={handleClick}
        className="relative flex flex-col items-center justify-center w-full h-32 px-4 transition border-2 border-gray-700 border-dashed rounded-lg cursor-pointer hover:border-yellow-400"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <UploadCloud className="w-8 h-8 mb-4 text-gray-500" />
          <p className="mb-2 text-sm text-gray-400">
            <span className="font-semibold text-yellow-400">برای آپلود کلیک کنید</span> یا فایل‌ها را بکشید و رها کنید
          </p>
          <p className="text-xs text-gray-500">
            {multiple ? ' فایل های خود را انتخاب کنید- SVG, PNG, JPG or PDF' : 'SVG, PNG, JPG or PDF'}
          </p>
        </div>
        <input id={id} type="file" className="hidden" multiple={multiple} onChange={handleFileChange} />
      </div>
      {files.length > 0 && (
        <div className="mt-2 text-xs text-gray-400 text-right">
          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold">فایل‌های انتخاب شده: ({files.length})</p>
            {multiple && files.length > 1 && (
              <button
                type="button"
                onClick={clearAllFiles}
                className="text-red-400 hover:text-red-300 text-xs underline"
              >
                حذف همه
              </button>
            )}
          </div>
          <ul className="space-y-1">
            {files.map((file, index) => (
              <li key={index} className="flex items-center justify-between  rounded px-3 py-2">
                <span className="truncate flex-1">{file}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="text-red-400 hover:text-red-300 text-sm font-bold ml-2 flex-shrink-0"
                >
                  <Trash2 className='w-4'/>
                </button>
              </li>
            ))}
          </ul>
          
        </div>
      )}
    </div>
  );
};


export default function JobPostingPage() {
  const jobDetails = {
    gender: 'آقا و خانم',
    contractType: 'تمام وقت',
    education: 'کارشناسی ارشد',
    experience: 'بیش از ۵ سال',
    militaryService: 'پایان خدمت یا معافیت',
    salary: 'توافقی',
    benefits: ['بیمه تکمیلی', 'ساعت کاری شناور', 'اتاق بازی', 'ناهار', 'بسته ها و هدایای مناسبتی']
  };

  return (
    <div className="bg-[#121212] min-h-screen text-white font-sans" dir="rtl">
      <div className="container mx-auto px-4 py-12 md:py-20">

        {/* --- Header Section --- */}
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500">
            استخدام توسعه‌دهنده ارشد Front-End (React)
          </h1>
          <div className="flex items-center justify-center gap-x-6 text-gray-400 text-lg">
            <div className="flex items-center gap-x-2">
              <Briefcase size={20} className="text-yellow-400" />
              <span>دکتر برایان اعتماد</span>
            </div>
            <div className="flex items-center gap-x-2">
              <MapPin size={20} className="text-yellow-400" />
              <span>تهران، زعفرانیه</span>
            </div>
          </div>
        </header>

        {/* --- Job Details Grid --- */}
        <section className="mb-12 md:mb-20">
            <h2 className="text-2xl font-bold text-right mb-6 border-r-4 border-yellow-400 pr-4">مشخصات کلی آگهی</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <DetailItem icon={User} label="جنسیت" value={jobDetails.gender} />
                <DetailItem icon={FileText} label="نوع قرارداد" value={jobDetails.contractType} />
                <DetailItem icon={GraduationCap} label="مدرک تحصیلی" value={jobDetails.education} />
                <DetailItem icon={Calendar} label="سابقه کاری" value={jobDetails.experience} />
                <DetailItem icon={ShieldCheck} label="وضعیت سربازی" value={jobDetails.militaryService} />
                <DetailItem icon={DollarSign} label="حقوق" value={jobDetails.salary} />
            </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* --- Left Column: Description & Benefits --- */}
          <div className="lg:col-span-2">
            <section className=" p-8 rounded-2xl border border-gray-800">
               <h2 className="text-2xl font-bold text-right mb-6 border-r-4 border-yellow-400 pr-4">شرح موقعیت شغلی</h2>
               <div className="prose prose-invert prose-p:text-right prose-p:leading-relaxed prose-li:text-right max-w-none text-gray-300 space-y-4">
                 <p>
                    ما در تیم دکتر برایان اعتماد به دنبال یک توسعه‌دهنده ارشد Front-End هستیم که به React.js و اکوسیستم آن تسلط کامل داشته باشد. شما مسئولیت طراحی، توسعه و نگهداری رابط‌های کاربری مدرن، واکنش‌گرا و با کارایی بالا را بر عهده خواهید داشت.
                 </p>
                 <h3 className="text-xl font-semibold text-yellow-400 pt-4 text-right">مسئولیت‌ها:</h3>
                 <ul className="pr-5">
                   <li>توسعه و پیاده‌سازی کامپوننت‌های قابل استفاده مجدد با React.js</li>
                   <li>همکاری نزدیک با تیم محصول و طراحان UI/UX برای ایجاد بهترین تجربه کاربری</li>
                   <li>بهینه‌سازی برنامه‌ها برای حداکثر سرعت و مقیاس‌پذیری</li>
                   <li>نوشتن کدهای تمیز، خوانا و قابل نگهداری</li>
                 </ul>
                 <h3 className="text-xl font-semibold text-yellow-400 pt-4 text-right">نیازمندی‌ها:</h3>
                 <ul className="pr-5">
                    <li>تسلط کامل بر JavaScript (ES6+), HTML5, CSS3</li>
                    <li>تجربه عمیق در کار با React.js و مفاهیم اصلی آن (Hooks, Context API, etc.)</li>
                    <li>آشنایی با ابزارهای مدیریت وضعیت مانند Redux یا Zustand</li>
                    <li>تجربه کار با Next.js یک مزیت بزرگ محسوب می‌شود</li>
                    <li>آشنایی با Git و فرآیندهای CI/CD</li>
                 </ul>
               </div>

                <div className="mt-10">
                    <h3 className="text-xl font-bold text-right mb-5 border-r-4 border-yellow-400 pr-4">مزایا و تسهیلات</h3>
                    <div className="flex flex-wrap gap-3">
                        {jobDetails.benefits.map((benefit, index) => (
                            <span key={index} className="bg-yellow-400/10 text-yellow-300 text-sm font-medium px-4 py-2 rounded-full">
                                {benefit}
                            </span>
                        ))}
                    </div>
                </div>
            </section>
          </div>

          {/* --- Right Column: Application Form --- */}
          <div className="lg:col-span-1">
            <div className="sticky top-8  p-8 rounded-2xl border border-gray-800 shadow-lg shadow-black/20">
                <h2 className="text-2xl font-bold text-center mb-4">ارسال رزومه</h2>
                <p className="text-gray-400 text-center mb-6">برای این موقعیت شغلی، اطلاعات خود را وارد کنید.</p>

                 <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-3 px-6 rounded-lg mb-6 hover:shadow-lg hover:shadow-yellow-500/20 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-x-2">
                    <ChevronsRight size={20} />
                    <span>ارسال مستقیم رزومه از پروفایل</span>
                </button>

                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-700"></div>
                    <span className="flex-shrink mx-4 text-gray-500 text-sm">یا</span>
                    <div className="flex-grow border-t border-gray-700"></div>
                </div>

                <form className="space-y-6">
                    <FormInput id="fullName" label="نام و نام خانوادگی" placeholder="مثال: مریم محمدی" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput id="birthDate" label="تاریخ تولد" type="text" placeholder="مثال: ۱۳۷۵/۰۵/۱۰" />
                        <FormInput id="nationalId" label="کد ملی" type="text" placeholder="کد ۱۰ رقمی" />
                    </div>
                    <FormInput id="location" label="محل سکونت" placeholder="مثال: تهران، سعادت آباد" />
                    <FormInput id="jobField" label="حوزه کاری" placeholder="مثال: توسعه نرم‌افزار" />
                    <FormInput id="experienceYears" label="سابقه کاری (سال)" type="number" placeholder="مثال: ۵" />
                    <FormInput id="educationLevel" label="تحصیلات" placeholder="مثال: کارشناسی نرم‌افزار" />
                    
                    <FileUpload id="projects" label="فایل پروژه ها" multiple />
                    <FileUpload id="certificates" label="مدارک و گواهینامه‌ها" multiple />

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2 text-right">
                            توضیحات تکمیلی
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows="4"
                            placeholder="اگر نکته‌ای دارید اینجا بنویسید..."
                            className="w-full  border border-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 placeholder-gray-500"
                        ></textarea>
                    </div>

                    <button type="submit" className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-4 px-6 rounded-lg mt-4 hover:shadow-lg hover:shadow-yellow-500/20 transform hover:-translate-y-0.5 transition-all duration-300">
                        ثبت و ارسال رزومه
                    </button>
                </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
