import { CheckCircleGoldIcon } from "@/icons";
import Image from "next/image";

export default function BenefitsSection() {
  return (
    <section className="py-16 bg-[#121212] text-white mb-10">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-4 gold-text">
          پلتفرمی برای رشد شما و کسب‌وکارتان
        </h2>
        <p className="text-center text-gray-400 max-w-3xl mx-auto mb-16">
          چه به دنبال برداشتن گام بعدی در مسیر شغلی خود باشید و چه به دنبال جذب
          بهترین استعدادها برای تیم‌تان، ما ابزارها و فرصت‌ها را در اختیار شما
          قرار می‌دهیم.
        </p>
        <div className="flex flex-col md:flex-row items-center gap-12 h-full">
          <div className="md:w-1/2 relative h-full">
            <Image
              width={1000}
              height={1000}
              src="/picture/bg-main-1.jpg"
              alt="رشد کسب‌وکار و مسیر شغلی"
              className="rounded-lg shadow-2xl w-full h-auto object-cover"
            />
          </div>
          <div className="md:w-1/2 text-right space-y-10">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-500">
                برای کارجویان: مسیر شغلی خود را هوشمندانه بسازید
              </h3>

              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <CheckCircleGoldIcon className="w-6 h-6 text-yellow-500 ml-3 flex-shrink-0 mt-1" />
                  <span>
                    <strong className="text-white">فرصت‌های شغلی متنوع:</strong>{" "}
                    به هزاران موقعیت شغلی تمام‌وقت، پاره‌وقت و پروژه‌ای در
                    برترین شرکت‌ها دسترسی پیدا کنید.
                  </span>
                </li>

                <li className="flex items-start">
                  <CheckCircleGoldIcon className="w-6 h-6 text-yellow-500 ml-3 flex-shrink-0 mt-1" />
                  <span>
                    <strong className="text-white">مستقیماً دیده شوید:</strong>{" "}
                    با قرار گرفتن در لیست کارجویان، به کارفرمایان برتر اجازه
                    دهید شما را پیدا کنند.
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-500">
                برای کارفرمایان: تیم خود را با بهترین‌ها کامل کنید
              </h3>

              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <CheckCircleGoldIcon className="w-6 h-6 text-yellow-500 ml-3 flex-shrink-0 mt-1" />
                  <span>
                    <strong className="text-white">
                      دسترسی سریع به نیروی کار:
                    </strong>{" "}
                    در کمترین زمان به استخر عظیمی از متخصصان و فریلنسرهای آماده
                    به کار دسترسی پیدا کنید.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircleGoldIcon className="w-6 h-6 text-yellow-500 ml-3 flex-shrink-0 mt-1" />
                  <span>
                    <strong className="text-white">
                      مقایسه و استخدام حرفه‌ای‌ها:
                    </strong>{" "}
                    پیشنهادها را بررسی و مقایسه کنید و حرفه‌ای‌ترین افراد را
                    برای پروژه‌های خود استخدام نمایید.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircleGoldIcon className="w-6 h-6 text-yellow-500 ml-3 flex-shrink-0 mt-1" />
                  <span>
                    <strong className="text-white">
                      مدیریت آسان فرآیند جذب:
                    </strong>{" "}
                    از انتشار آگهی تا استخدام نهایی، تمام مراحل را به سادگی در
                    پلتفرم ما مدیریت کنید.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
