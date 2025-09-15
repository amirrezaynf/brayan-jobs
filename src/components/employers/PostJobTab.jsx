// components/employers/PostJobTab.js
import { Briefcase } from "lucide-react";

const FormInput = ({ id, label, type = "text", placeholder }) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-300 mb-2"
    >
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      className="w-full  border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2  transition"
      placeholder={placeholder}
    />
  </div>
);

const FormSelect = ({ id, label, children }) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-300 mb-2"
    >
      {label}
    </label>
    <select
      id={id}
      name={id}
      className="w-full  border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2  transition"
    >
      {children}
    </select>
  </div>
);

const FormTextarea = ({ id, label, placeholder, rows = 4 }) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-300 mb-2"
    >
      {label}
    </label>
    <textarea
      id={id}
      name={id}
      rows={rows}
      className="w-full  border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2  transition"
      placeholder={placeholder}
    ></textarea>
  </div>
);

export default function PostJobTab() {
  return (
    <div className="border border-gray-500 p-6 sm:p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-yellow-400 flex items-center gap-3">
        <Briefcase />
        فرم ثبت آگهی استخدام
      </h2>
      <form className="space-y-8">
        <div className="border-b border-gray-700  pb-8">
          <h3 className="text-lg font-semibold mb-4">اطلاعات اصلی آگهی</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              id="job-title"
              label="عنوان شغلی"
              placeholder="مثال: توسعه‌دهنده Front-End"
            />
            <FormSelect id="contract-type" label="نوع قرارداد">
              <option className="bg-black/90">تمام وقت</option>
              <option className="bg-black/90">پاره وقت</option>
              <option className="bg-black/90">پروژه‌ای</option>
            </FormSelect>
            <FormInput
              id="work-hours"
              label="ساعات کاری"
              placeholder="مثال: شنبه تا چهارشنبه ۹ الی ۱۷"
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:col-span-2">
              <FormInput id="country" label="کشور" placeholder="ایران" />
              <FormInput id="province" label="استان" placeholder="تهران" />
              <FormInput id="city" label="شهرستان" placeholder="تهران" />
            </div>
            <div className="md:col-span-2">
              <FormTextarea
                id="company-description"
                label="توضیحات موسسه و آگهی"
                placeholder="درباره شرکت خود و موقعیت شغلی توضیح دهید..."
              />
            </div>
          </div>
        </div>
        <div className="border-b border-gray-700 pb-8">
          <h3 className="text-lg font-semibold mb-4">شرایط احراز</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormSelect id="gender" label="جنسیت">
              <option className="bg-black/90">خانم</option>
              <option className="bg-black/90">آقا</option>
              <option className="bg-black/90">هردو</option>
            </FormSelect>
            <FormInput
              id="experience"
              label="سابقه کار"
              placeholder="مثال: حداقل ۳ سال"
            />
            <div className="md:col-span-2">
              <FormTextarea
                id="requirements-details"
                label="توضیحات تکمیلی شرایط"
                placeholder="مهارت‌های نرم و سخت مورد نیاز..."
                rows={5}
              />
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">حقوق و مزایا</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              id="salary-range"
              label="محدوده حقوق (تومان)"
              placeholder="مثال: از ۲۰,۰۰۰,۰۰۰ تا ۲۵,۰۰۰,۰۰۰"
            />
            <FormInput
              id="benefits"
              label="تسهیلات و مزایا"
              placeholder="بیمه تکمیلی، پاداش، ساعت کاری منعطف و..."
            />
          </div>
        </div>
        <div className="pt-6 text-left">
          <button
            type="submit"
            className="bg-yellow-400 text-black font-bold py-3 px-8 rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-yellow-400 transition-all duration-300"
          >
            ثبت و انتشار آگهی
          </button>
        </div>
      </form>
    </div>
  );
}
