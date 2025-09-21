export default function HeroSection() {
  return (
    <section className="relative h-[60vh] flex items-center justify-center text-center text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
      <img
        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto-format&fit=crop"
        className="absolute inset-0 w-full h-full object-cover"
        alt="تیم حرفه‌ای"
      />
      <div className="relative z-20 container mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
          پلتفرم استخدامی دکتر برایان اعتماد
        </h2>
        <h3 className="text-2xl md:text-4xl font-bold gold-text mt-4 mb-8">
          پلتفرمی برای یاری و حمایت هموطنان در یافتن شغل دلخواه و ایده‌ال
        </h3>
        <p className="max-w-3xl mx-auto text-gray-300 text-lg">
          ایرانیان در هر نقطه از جهان می‌توانند به شبکه‌ای گسترده از فرصت‌های
          شغلی دسترسی داشته باشند و شغلی هم‌تراز با توانایی‌ها و آرزوهایشان را
          بیابند. این بستر راهی مطمئن برای پیوند استعدادها با بهترین موقعیت‌های
          کاری است
        </p>
      </div>
    </section>
  );
}
