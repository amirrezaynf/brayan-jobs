import SalaryRangeSlider from "@/components/ui/range/SalaryRangeInput";
import CustomSelect from "@/components/ui/select/CustomSelect";

export default function AdvancedFilters({
  selectedCategory,
  setSelectedCategory,
  hasBenefits,
  setHasBenefits,
  militaryService,
  setMilitaryService,
  remoteWork,
  setRemoteWork,
}) {
  const jobCategoriesList = [
    "فناوری اطلاعات",
    "طراحی و گرافیک",
    "بازاریابی و فروش",
    "مدیریت پروژه",
    "بازاریابی دیجیتال",
    "مالی و حسابداری",
    "منابع انسانی",
    "تکنولوژی‌های نو",
    "توسعه نرم‌افزار",
    "دیجیتال مارکتینگ",
    "سایر",
  ];

  return (
    <aside className="lg:w-1/4">
      <div className="dark-card p-6 rounded-xl sticky top-28">
        <h3 className="text-xl font-bold mb-6 border-b-2 border-gray-700 pb-3">
          فیلترهای پیشرفته
        </h3>

        <SalaryRangeSlider />
        <div className="border-t border-gray-700 my-6"></div>
        <div>
          <label className="block mb-4 text-md font-medium text-gray-300">
            حوزه کاری
          </label>
          <CustomSelect
            options={jobCategoriesList}
            value={selectedCategory}
            onChange={setSelectedCategory}
            placeholder="همه حوزه‌ها"
          />
        </div>
        <div className="border-t border-gray-700 my-6"></div>
        <div>
          <h4 className="text-md font-medium text-gray-300 mb-4">
            سایر گزینه‌ها
          </h4>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={hasBenefits}
                onChange={(e) => setHasBenefits(e.target.checked)}
                className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-yellow-500 focus:ring-yellow-600"
              />
              <span className="mr-3 text-gray-300">دارای مزایا</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={militaryService}
                onChange={(e) => setMilitaryService(e.target.checked)}
                className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-yellow-500 focus:ring-yellow-600"
              />
              <span className="mr-3 text-gray-300">امریه سربازی</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={remoteWork}
                onChange={(e) => setRemoteWork(e.target.checked)}
                className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-yellow-500 focus:ring-yellow-600"
              />
              <span className="mr-3 text-gray-300">امکان دورکاری</span>
            </label>
          </div>
        </div>
      </div>
    </aside>
  );
}
