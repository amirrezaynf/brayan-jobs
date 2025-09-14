"use client";

import React, { useState, useEffect, useRef } from 'react';

// Data for provinces and cities of Iran
const iranianProvinces = {
  "تهران": ["تهران", "شهریار", "اسلامشهر", "قدس", "ملارد"],
  "خراسان رضوی": ["مشهد", "سبزوار", "نیشابور", "تربت حیدریه"],
  "اصفهان": ["اصفهان", "کاشان", "خمینی شهر", "نجف آباد"],
  "فارس": ["شیراز", "کازرون", "جهرم", "مرودشت"],
  "آذربایجان شرقی": ["تبریز", "مراغه", "مرند", "میانه"],
  "البرز": ["کرج", "فردیس", "کمال‌شهر", "نظرآباد"],
};

// Data for job categories
const jobCategories = [
  "فناوری اطلاعات و نرم‌افزار",
  "فروش و بازاریابی",
  "مالی و حسابداری",
  "مهندسی",
  "منابع انسانی",
  "هنر و رسانه"
];

// Mock data for job cards
const jobListings = [
    { id: 1, title: 'کارشناس ارشد فروش', company: 'دیجی‌کالا', logo: 'D', location: 'تهران', type: 'تمام وقت', description: 'مسلط به فنون مذاکره و فروش سازمانی. دارای حداقل ۳ سال سابقه کار مرتبط.', salary: 'توافقی' },
    { id: 2, title: 'توسعه‌دهنده Backend (Node.js)', company: 'کافه‌بازار', logo: 'CB', location: 'تهران (دورکاری)', type: 'تمام وقت', description: 'تجربه کار با میکروسرویس‌ها، دیتابیس‌های SQL و NoSQL. آشنایی با Docker مزیت محسوب می‌شود.', salary: '۴۰ - ۵۰ میلیون' },
    { id: 3, title: 'طراح UI/UX', company: 'اسنپ', logo: 'S', location: 'اصفهان', type: 'پاره‌وقت', description: 'مسلط به Figma و Adobe XD. توانایی طراحی پروتوتایپ‌های تعاملی و User Flow.', salary: 'توافقی' },
    { id: 4, title: 'مدیر محصول', company: 'همراه اول', logo: 'MCI', location: 'شیراز', type: 'تمام وقت', description: 'توانایی تعریف Roadmap محصول و مدیریت بک‌لاگ. تجربه کار در محیط Agile.', salary: '۵۰ میلیون به بالا' },
    { id: 5, title: 'کارشناس دیجیتال مارکتینگ', company: 'بانک پاسارگاد', logo: 'BP', location: 'مشهد', type: 'پروژه‌ای', description: 'مسلط به SEO، Google Ads و کمپین‌های شبکه‌های اجتماعی. توانایی تحلیل داده و گزارش‌دهی.', salary: 'توافقی' },
    { id: 6, title: 'مهندس DevOps', company: 'یکتانت', logo: 'Y', location: 'تهران', type: 'تمام وقت', description: 'تجربه کار با ابزارهای CI/CD، Kubernetes و سیستم‌های مانیتورینگ مانند Prometheus.', salary: '۶۰ میلیون به بالا' },
];

// Helper component for Icons
const LocationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
const ChevronDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>;
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const LogoIcon = () => <svg className="w-10 h-10 gold-text" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>;
const MenuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;


// Custom Select Component Logic encapsulated within the main page
const CustomSelect = ({ options, value, onChange, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [ref]);

    const handleSelect = (optionValue) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    return (
        <div className="custom-select-container" ref={ref}>
            <div className="custom-select-value p-3 rounded-lg flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <span className={value ? 'text-gray-200' : 'text-gray-500'}>{value || placeholder}</span>
                <ChevronDownIcon />
            </div>
            {isOpen && (
                <ul className="custom-select-options mt-2 rounded-lg">
                    <li className="custom-select-option p-3 cursor-pointer" onClick={() => handleSelect('')}>{placeholder}</li>
                    {options.map((opt) => (
                        <li key={opt} className="custom-select-option p-3 cursor-pointer" onClick={() => handleSelect(opt)}>
                            {opt}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};


export default function HomePage() {
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [salary, setSalary] = useState(15000000);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const cities = selectedProvince ? iranianProvinces[selectedProvince] : [];
    
    useEffect(() => {
        setSelectedCity(''); // Reset city when province changes
    }, [selectedProvince]);

    return (
        <>
            {/* All styles are self-contained in this component */}
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700&display=swap');
                
                body {
                    font-family: 'Vazirmatn', sans-serif;
                    background-color: #121212;
                    color: #E0E0E0;
                    direction: rtl;
                }
                .gold-text { color: #FBBF24; }
                .gold-bg { background-color: #FBBF24; }
                .gold-border { border-color: #FBBF24; }
                .dark-bg { background-color: #1E1E1E; }
                .dark-card { background-color: #181818; }
                .header-link {
                    position: relative;
                    transition: color 0.3s ease;
                }
                .header-link:hover { color: #FBBF24; }
                .header-link::after {
                    content: '';
                    position: absolute;
                    width: 0;
                    height: 2px;
                    bottom: -4px;
                    right: 0;
                    background-color: #FBBF24;
                    transition: width 0.3s ease;
                }
                .header-link:hover::after { width: 100%; }
                .btn-primary {
                    background: linear-gradient(145deg, #fbbf24, #f59e0b);
                    color: #121212;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(251, 191, 36, 0.25);
                }
                .btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(251, 191, 36, 0.3);
                }
                .custom-select-container { position: relative; }
                .custom-select-value {
                    background-color: #2a2a2a;
                    border: 1px solid #444;
                    transition: border-color 0.3s;
                }
                .custom-select-value:hover { border-color: #FBBF24; }
                .custom-select-options {
                    display: block;
                    position: absolute;
                    top: 100%;
                    right: 0;
                    left: 0;
                    background-color: #2a2a2a;
                    border: 1px solid #FBBF24;
                    z-index: 50;
                    max-height: 200px;
                    overflow-y: auto;
                    animation: fadeIn 0.2s ease-out;
                }
                 @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
                .custom-select-option { transition: background-color 0.2s; }
                .custom-select-option:hover { background-color: #3a3a3a; }
                .job-card {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    border: 1px solid #333;
                }
                .job-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.2), 0 0 15px rgba(251, 191, 36, 0.3);
                    border-color: #FBBF24;
                }
                input[type=range] {
                    -webkit-appearance: none;
                    width: 100%;
                    background: transparent;
                }
                input[type=range]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    height: 18px;
                    width: 18px;
                    border-radius: 50%;
                    background: #FBBF24;
                    cursor: pointer;
                    margin-top: -6px;
                    box-shadow: 0 0 5px #FBBF24;
                }
                input[type=range]::-webkit-slider-runnable-track {
                    width: 100%;
                    height: 6px;
                    cursor: pointer;
                    background: #444;
                    border-radius: 3px;
                }
                .logos {
                    overflow: hidden;
                    padding: 40px 0;
                    white-space: nowrap;
                    position: relative;
                }
                .logos:before, .logos:after {
                    position: absolute;
                    top: 0;
                    width: 150px;
                    height: 100%;
                    content: "";
                    z-index: 2;
                }
                .logos:before { right: 0; background: linear-gradient(to right, rgba(18, 18, 18, 1), rgba(18, 18, 18, 0)); }
                .logos:after { left: 0; background: linear-gradient(to left, rgba(18, 18, 18, 1), rgba(18, 18, 18, 0)); }
                .logos-slide {
                    display: inline-block;
                    animation: 35s slide infinite linear;
                }
                .logos:hover .logos-slide { animation-play-state: paused; }
                .logos-slide span {
                    display: inline-block;
                    height: 50px;
                    margin: 0 40px;
                    vertical-align: middle;
                }
                .logos-slide img {
                    height: 100%;
                    max-width: 150px;
                    filter: grayscale(100%) brightness(1.5);
                    transition: filter 0.3s ease;
                    cursor: pointer;
                }
                .logos-slide span:hover img { filter: grayscale(0%) brightness(1); }
                @keyframes slide {
                    from { transform: translateX(0); }
                    to { transform: translateX(-100%); }
                }
                [data-tooltip] { position: relative; cursor: pointer; }
                [data-tooltip]::after {
                    content: attr(data-tooltip);
                    position: absolute;
                    bottom: 110%;
                    left: 50%;
                    transform: translateX(-50%);
                    background-color: #FBBF24;
                    color: #121212;
                    padding: 5px 10px;
                    border-radius: 5px;
                    font-size: 0.8rem;
                    white-space: nowrap;
                    opacity: 0;
                    visibility: hidden;
                    transition: opacity 0.3s, visibility 0.3s;
                }
                [data-tooltip]:hover::after { opacity: 1; visibility: visible; }
                .mobile-menu { animation: slideInRTL 0.3s ease-out forwards; }
                @keyframes slideInRTL { from { transform: translateX(100%); } to { transform: translateX(0); } }
            `}</style>
            
            <div className="bg-[#121212]">
                <header className="dark-bg shadow-lg shadow-black/20 sticky top-0 z-40">
                    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                        <div className="flex items-center space-x-4 space-x-reverse">
                            <LogoIcon />
                            <h1 className="text-xl font-bold text-white">پلتفرم استخدامی <span className="gold-text">دکتر برایان اعتماد</span></h1>
                        </div>

                        <nav className="hidden lg:flex items-center space-x-8 space-x-reverse font-semibold">
                                <a href="/resume" className="header-link text-gray-300">ثبت رزومه</a>
                                <a href="#" className="header-link text-gray-300">بهترین آگهی‌ها</a>
                                <a href="#" className="header-link text-gray-300">جستجوی آگهی</a>
                            </nav>

                        <div className="hidden lg:flex items-center space-x-4 space-x-reverse">
                           
                            <div className="flex items-center space-x-4 space-x-reverse">
                                <a href="/employers" className="text-gray-300 hover:gold-text transition">بخش کارفرمایان</a>
                                <a href="/auth" className="px-5 py-2 rounded-lg gold-bg text-black font-semibold hover:opacity-90 transition duration-300">ورود / ثبت نام</a>
                            </div>
                        </div>
                        
                        {/* Mobile Menu Button */}
                        <div className="lg:hidden">
                            <button onClick={() => setIsMenuOpen(true)}>
                                <MenuIcon />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Mobile Menu Panel */}
                {isMenuOpen && (
                    <div className="fixed inset-0 z-50 lg   :hidden" onClick={() => setIsMenuOpen(false)}>
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                        <div className="mobile-menu absolute top-0 right-0 h-full w-2/3 max-w-xs dark-bg shadow-lg p-6" onClick={(e) => e.stopPropagation()}>
                            <div className="flex justify-between items-center mb-10">
                                <h2 className="text-lg font-bold gold-text">منو</h2>
                                <button onClick={() => setIsMenuOpen(false)}>
                                    <XIcon />
                                </button>
                            </div>
                            <nav className="flex flex-col space-y-6 text-lg items-start">
                                <a href="#" className="header-link text-gray-300 w-full pb-2">ثبت رزومه</a>
                                <a href="#" className="header-link text-gray-300 w-full pb-2">بهترین آگهی‌ها</a>
                                <a href="#" className="header-link text-gray-300 w-full pb-2">جستجوی آگهی</a>
                                <a href="#" className="header-link text-gray-300 w-full pb-2">بخش کارفرمایان</a>
                                <a href="#" className="mt-4 w-full text-center px-5 py-2 rounded-lg gold-bg text-black font-semibold hover:opacity-90 transition duration-300">ورود / ثبت نام</a>
                            </nav>
                        </div>
                    </div>
                )}


                <main>
                    <section className="relative h-[60vh] flex items-center justify-center text-center text-white overflow-hidden">
                        <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
                        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto-format&fit=crop" className="absolute inset-0 w-full h-full object-cover" alt="تیم حرفه‌ای" />
                        <div className="relative z-20 container mx-auto px-6">
                            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">مسیر شغلی ایده‌آل شما</h2>
                            <h3 className="text-2xl md:text-4xl font-bold gold-text mt-4 mb-8">از اینجا شروع می‌شود</h3>
                            <p className="max-w-3xl mx-auto text-gray-300 text-lg">
                                با پلتفرم دکتر برایان اعتماد، به تخصصی‌ترین فرصت‌های شغلی دسترسی پیدا کنید. ما با بهره‌گیری از هوش مصنوعی و تحلیل داده، شما را به بهترین شرکت‌ها و موقعیت‌های متناسب با توانمندی‌هایتان متصل می‌کنیم.
                            </p>
                        </div>
                    </section>

                    <section className="dark-bg py-10 -mt-16 relative z-30">
                        <div className="container mx-auto px-6">
                            <div className="dark-card p-6 rounded-xl shadow-2xl shadow-black/30 grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                                <div className="md:col-span-2">
                                    <label htmlFor="search-job" className="block mb-2 text-sm font-medium text-gray-400">عنوان شغلی، شرکت یا...</label>
                                    <div className="relative">
                                        <input type="text" id="search-job" className="w-full p-3 pl-10 rounded-lg bg-[#2a2a2a] border border-[#444] focus:border-yellow-500 focus:ring-yellow-500 transition placeholder:text-gray-400" placeholder="مثلا: توسعه‌دهنده React" />
                                        <span className="absolute left-3 top-4 text-gray-500"><SearchIcon /></span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-400">استان</label>
                                    <CustomSelect options={Object.keys(iranianProvinces)} value={selectedProvince} onChange={setSelectedProvince} placeholder="همه استان‌ها"/>
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-400">شهر</label>
                                    <CustomSelect options={cities} value={selectedCity} onChange={setSelectedCity} placeholder="همه شهرها" />
                                </div>
                                <button className="btn-primary w-full p-3 rounded-lg font-bold text-lg">جستجو</button>
                            </div>
                        </div>
                    </section>

                    <section className="container mx-auto px-6 py-16">
                        <div className="flex flex-col lg:flex-row gap-8">
                            <aside className="lg:w-1/4">
                                <div className="dark-card p-6 rounded-xl sticky top-28">
                                    <h3 className="text-xl font-bold mb-6 border-b-2 border-gray-700 pb-3">فیلترهای پیشرفته</h3>
                                    <div>
                                        <label htmlFor="salary-range" className="block mb-4 text-md font-medium text-gray-300">محدوده حقوق (تومان)</label>
                                        <input type="range" id="salary-range" min="0" max="100000000" step="1000000" value={salary} onChange={(e) => setSalary(Number(e.target.value))} className="w-full h-2 rounded-lg appearance-none cursor-pointer" />
                                        <div className="flex justify-between text-sm text-gray-400 mt-2">
                                            <span>۰</span>
                                            <span id="salary-value" className="font-bold gold-text">{salary.toLocaleString('fa-IR')}</span>
                                            <span>۱۰۰م+</span>
                                        </div>
                                    </div>
                                    <div className="border-t border-gray-700 my-6"></div>
                                    <div>
                                        <label className="block mb-4 text-md font-medium text-gray-300">حوزه کاری</label>
                                        <CustomSelect options={jobCategories} value={selectedCategory} onChange={setSelectedCategory} placeholder="همه حوزه‌ها"/>
                                    </div>
                                    <div className="border-t border-gray-700 my-6"></div>
                                    <div>
                                        <h4 className="text-md font-medium text-gray-300 mb-4">سایر گزینه‌ها</h4>
                                        <div className="space-y-3">
                                            <label className="flex items-center"><input type="checkbox" className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-yellow-500 focus:ring-yellow-600" /><span className="mr-3 text-gray-300">دارای مزایا</span></label>
                                            <label className="flex items-center"><input type="checkbox" className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-yellow-500 focus:ring-yellow-600" /><span className="mr-3 text-gray-300">امریه سربازی</span></label>
                                            <label className="flex items-center"><input type="checkbox" className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-yellow-500 focus:ring-yellow-600" /><span className="mr-3 text-gray-300">امکان دورکاری</span></label>
                                        </div>
                                    </div>
                                </div>
                            </aside>

                            <div className="lg:w-3/4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {jobListings.map(job => (
                                        <div key={job.id} className="job-card dark-card rounded-xl p-6 flex flex-col">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h4 className="text-xl font-bold text-white">{job.title}</h4>
                                                    <p className="text-gray-400 mt-1">{job.company}</p>
                                                </div>
                                                <img src={`https://placehold.co/50x50/FBBF24/121212?text=${job.logo}`} alt={`${job.company} Logo`} className="rounded-full" />
                                            </div>
                                            <div className="flex items-center text-gray-400 text-sm space-x-3 space-x-reverse my-4">
                                                <span className="flex items-center"><LocationIcon />{job.location}</span>
                                                <span className="flex items-center"><ClockIcon />{job.type}</span>
                                            </div>
                                            <p className="text-gray-400 text-sm flex-grow">{job.description}</p>
                                            <div className="border-t border-gray-700 mt-4 pt-4 flex justify-between items-center">
                                                <span className="text-lg font-semibold gold-text">{job.salary}</span>
                                                <a href="/jobsingle" className="text-sm px-4 py-2 rounded-lg bg-yellow-500 text-black hover:bg-yellow-500 hover:text-black transition">ارسال رزومه</a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-center mt-12">
                                    <nav className="flex items-center space-x-2 space-x-reverse">
                                        <a href="#" className="px-4 py-2 rounded-lg text-gray-400 dark-card hover:bg-[#3a3a3a]">قبلی</a>
                                        <a href="#" className="px-4 py-2 rounded-lg text-black gold-bg font-bold">1</a>
                                        <a href="#" className="px-4 py-2 rounded-lg text-gray-400 dark-card hover:bg-[#3a3a3a]">2</a>
                                        <a href="#" className="px-4 py-2 rounded-lg text-gray-400 dark-card hover:bg-[#3a3a3a]">3</a>
                                        <a href="#" className="px-4 py-2 rounded-lg text-gray-400 dark-card hover:bg-[#3a3a3a]">بعدی</a>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    <section className="py-16">
                        <div className="container mx-auto px-6 text-center">
                            <h3 className="text-3xl font-bold mb-4 gold-text">به ما اعتماد کرده‌اند</h3>
                            <p className="text-gray-400 mb-12 max-w-2xl mx-auto">برترین شرکت‌های ایران برای جذب استعدادهای برتر از پلتفرم ما استفاده می‌کنند.</p>
                        </div>
                        <div className="logos">
                            <div className="logos-slide">
                                <span data-tooltip="دیجی‌کالا"><img src="https://placehold.co/150x60/transparent/fafafa?text=Digikala" alt="Digikala"/></span>
                                <span data-tooltip="اسنپ"><img src="https://placehold.co/150x60/transparent/fafafa?text=Snapp" alt="Snapp"/></span>
                                <span data-tooltip="کافه‌بازار"><img src="https://placehold.co/150x60/transparent/fafafa?text=Cafe+Bazaar" alt="Cafe Bazaar"/></span>
                                <span data-tooltip="تپسی"><img src="https://placehold.co/150x60/transparent/fafafa?text=Tapsi" alt="Tapsi"/></span>
                                <span data-tooltip="دیوار"><img src="https://placehold.co/150x60/transparent/fafafa?text=Divar" alt="Divar"/></span>
                                <span data-tooltip="علی‌بابا"><img src="https://placehold.co/150x60/transparent/fafafa?text=Alibaba" alt="Alibaba"/></span>
                                <span data-tooltip="یکتانت"><img src="https://placehold.co/150x60/transparent/fafafa?text=Yektanet" alt="Yektanet"/></span>
                                <span data-tooltip="همراه اول"><img src="https://placehold.co/150x60/transparent/fafafa?text=MCI" alt="MCI"/></span>
                            </div>
                            <div className="logos-slide">
                                <span data-tooltip="دیجی‌کالا"><img src="https://placehold.co/150x60/transparent/fafafa?text=Digikala" alt="Digikala"/></span>
                                <span data-tooltip="اسنپ"><img src="https://placehold.co/150x60/transparent/fafafa?text=Snapp" alt="Snapp"/></span>
                                <span data-tooltip="کافه‌بازار"><img src="https://placehold.co/150x60/transparent/fafafa?text=Cafe+Bazaar" alt="Cafe Bazaar"/></span>
                                <span data-tooltip="تپسی"><img src="https://placehold.co/150x60/transparent/fafafa?text=Tapsi" alt="Tapsi"/></span>
                                <span data-tooltip="دیوار"><img src="https://placehold.co/150x60/transparent/fafafa?text=Divar" alt="Divar"/></span>
                                <span data-tooltip="علی‌بابا"><img src="https://placehold.co/150x60/transparent/fafafa?text=Alibaba" alt="Alibaba"/></span>
                                <span data-tooltip="یکتانت"><img src="https://placehold.co/150x60/transparent/fafafa?text=Yektanet" alt="Yektanet"/></span>
                                <span data-tooltip="همراه اول"><img src="https://placehold.co/150x60/transparent/fafafa?text=MCI" alt="MCI"/></span>
                            </div>
                        </div>
                    </section>
                </main>

                <footer className="dark-bg border-t border-gray-800 mt-16">
                    <div className="container mx-auto px-6 py-8 text-center text-gray-400">
                        <p>&copy; {new Date().getFullYear()} پلتفرم استخدامی دکتر برایان اعتماد. تمام حقوق محفوظ است.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}

