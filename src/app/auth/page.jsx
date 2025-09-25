import Image from "next/image";
import AuthForms from "@/components/modules/auth/AuthForms";

export default function AuthPage() {
  return (
    <div className="min-h-screen text-gray-200 grid grid-cols-1 lg:grid-cols-2">
      {/* Right Side - Form */}
      <AuthForms />

      {/* Left Side - Image */}
      <div className="relative hidden lg:block">
        <Image
          alt="محیط کاری مدرن"
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1887&auto=format&fit=crop"
          fill
          className="absolute inset-0 object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#1e1e1e]/75"></div>
        <div className="relative flex flex-col items-center justify-center h-full p-12 text-center">
          <h2 className="text-3xl font-bold text-white tracking-wider">
            آینده شغلی خود را بسازید
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            به بزرگترین جامعه متخصصین و کارفرمایان بپیوندید و موقعیت‌های شغلی یا
            نیروی متخصص متناسب با نیاز خود را پیدا کنید.
          </p>
        </div>
      </div>
    </div>
  );
}
