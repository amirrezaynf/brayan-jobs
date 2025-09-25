import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black/90">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-70 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2070&auto-format&fit=crop"
          className="absolute inset-0 w-full h-full object-cover"
          alt="درباره ما - تیم حرفه‌ای"
        />
        <div className="relative z-20 container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            درباره <span className="gold-text">پلتفرم استخدامی دکتر برایان اعتماد</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            جایی که استعداد ایرانی شکوفا می‌شود و آینده‌ای روشن برای همه رقم می‌خورد
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 bg-[#121212]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="dark-card p-8 rounded-lg border border-gray-700">
                <div className="flex items-center mb-4">
                  <svg className="w-8 h-8 gold-text ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                  <h2 className="text-2xl font-bold gold-text">ماموریت ما</h2>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  ما متعهد هستیم تا پلی میان استعدادهای ایرانی و فرصت‌های شغلی مناسب باشیم. 
                  هدف ما ایجاد محیطی است که در آن هر فرد بتواند بهترین نسخه از خود را در مسیر شغلی پیدا کند 
                  و کارفرمایان نیز به بهترین نیروی کار دسترسی داشته باشند.
                </p>
              </div>

              <div className="dark-card p-8 rounded-lg border border-gray-700">
                <div className="flex items-center mb-4">
                  <svg className="w-8 h-8 gold-text ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                  <h2 className="text-2xl font-bold gold-text">چشم‌انداز ما</h2>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  تبدیل شدن به بزرگ‌ترین و معتبرترین پلتفرم استخدامی ایران که نه تنها در داخل کشور 
                  بلکه برای ایرانیان مقیم سراسر جهان، مرجع اصلی یافتن شغل و استخدام باشد. 
                  ما آینده‌ای می‌سازیم که در آن هیچ استعدادی نادیده گرفته نشود.
                </p>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto-format&fit=crop"
                alt="تیم ما"
                className="rounded-lg shadow-2xl w-full h-auto object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-yellow-400 to-yellow-600 p-6 rounded-lg shadow-xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-black">+10,000</div>
                  <div className="text-sm text-black">کاربر فعال</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-black/90">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold gold-text mb-4">داستان ما</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              از ایده‌ای ساده تا پلتفرمی که زندگی هزاران نفر را تغییر داده است
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="dark-card p-8 rounded-lg border border-gray-700">
              <p className="text-gray-300 leading-relaxed mb-6">
                پلتفرم استخدامی دکتر برایان اعتماد از ایده‌ای ساده آغاز شد: ایجاد فضایی که در آن 
                استعدادهای ایرانی بتوانند بدون محدودیت جغرافیایی و با اعتماد کامل، بهترین فرصت‌های شغلی را پیدا کنند.
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                ما درک کردیم که بازار کار ایران نیاز به پلتفرمی دارد که نه تنها شفاف و قابل اعتماد باشد، 
                بلکه ابزارهای پیشرفته‌ای برای تطبیق دقیق مهارت‌ها با نیازهای کارفرمایان ارائه دهد.
              </p>
              <p className="text-gray-300 leading-relaxed">
                امروز، با افتخار می‌توانیم بگوییم که هزاران نفر از طریق پلتفرم ما شغل مناسب خود را پیدا کرده‌اند 
                و صدها شرکت، تیم‌های خود را با بهترین استعدادها تکمیل کرده‌اند.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 bg-[#121212]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold gold-text mb-4">ویژگی‌های کلیدی پلتفرم</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              چرا پلتفرم ما انتخاب اول کارجویان و کارفرمایان است؟
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="dark-card p-6 rounded-lg border border-gray-700 hover:border-yellow-500 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">جستجوی هوشمند</h3>
              <p className="text-gray-400">
                الگوریتم پیشرفته ما بهترین تطبیق بین مهارت‌های شما و نیازهای کارفرمایان را پیدا می‌کند.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="dark-card p-6 rounded-lg border border-gray-700 hover:border-yellow-500 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">امنیت و اعتماد</h3>
              <p className="text-gray-400">
                تمام شرکت‌ها و آگهی‌ها توسط تیم ما بررسی و تأیید می‌شوند تا از کیفیت اطمینان حاصل کنید.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="dark-card p-6 rounded-lg border border-gray-700 hover:border-yellow-500 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">سرعت بالا</h3>
              <p className="text-gray-400">
                فرآیند درخواست و پاسخ‌دهی سریع که زمان شما را صرفه‌جویی می‌کند و نتایج بهتری ارائه می‌دهد.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="dark-card p-6 rounded-lg border border-gray-700 hover:border-yellow-500 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">شبکه‌سازی</h3>
              <p className="text-gray-400">
                امکان ارتباط مستقیم با متخصصان صنعت و گسترش شبکه حرفه‌ای خود.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="dark-card p-6 rounded-lg border border-gray-700 hover:border-yellow-500 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">آمار و گزارش</h3>
              <p className="text-gray-400">
                ابزارهای تحلیلی پیشرفته برای ردیابی عملکرد و بهبود استراتژی‌های شغلی.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="dark-card p-6 rounded-lg border border-gray-700 hover:border-yellow-500 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">پشتیبانی 24/7</h3>
              <p className="text-gray-400">
                تیم پشتیبانی مجرب ما همیشه آماده کمک و راهنمایی شما در تمام مراحل است.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-black/90">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold gold-text mb-4">آمار و ارقام</h2>
            <p className="text-gray-400">نگاهی به دستاوردهای ما</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold gold-text mb-2">+15,000</div>
              <div className="text-gray-400">کاربر ثبت‌نام شده</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gold-text mb-2">+2,500</div>
              <div className="text-gray-400">شرکت فعال</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gold-text mb-2">+8,000</div>
              <div className="text-gray-400">آگهی شغلی</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gold-text mb-2">95%</div>
              <div className="text-gray-400">رضایت کاربران</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-[#121212]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold gold-text mb-4">تیم ما</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              متخصصانی که با تجربه و تعهد، روزانه برای بهبود تجربه شما تلاش می‌کنند
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="dark-card p-6 rounded-lg border border-gray-700 text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">تیم فنی</h3>
              <p className="text-yellow-500 mb-3">توسعه‌دهندگان و طراحان</p>
              <p className="text-gray-400 text-sm">
                متخصصان فناوری که پلتفرم را به‌روزرسانی و بهبود می‌دهند
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="dark-card p-6 rounded-lg border border-gray-700 text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">تیم پشتیبانی</h3>
              <p className="text-yellow-500 mb-3">مشاوران و راهنمایان</p>
              <p className="text-gray-400 text-sm">
                کارشناسان مجرب که همیشه آماده کمک به شما هستند
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="dark-card p-6 rounded-lg border border-gray-700 text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">تیم تحلیل</h3>
              <p className="text-yellow-500 mb-3">تحلیلگران بازار کار</p>
              <p className="text-gray-400 text-sm">
                متخصصان بازار کار که روندها و فرصت‌ها را بررسی می‌کنند
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 bg-black/90">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold gold-text mb-4">آماده شروع هستید؟</h2>
            <p className="text-gray-400 mb-8 text-lg">
              همین امروز به جمع هزاران کاربر راضی ما بپیوندید و مسیر شغلی خود را تغییر دهید
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/auth"
                className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105"
              >
                ثبت‌نام رایگان
              </a>
              <a
                href="/employers"
                className="px-8 py-3 border-2 border-yellow-500 text-yellow-500 font-bold rounded-lg hover:bg-yellow-500 hover:text-black transition-all duration-300"
              >
                مشاهده آگهی‌ها
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
