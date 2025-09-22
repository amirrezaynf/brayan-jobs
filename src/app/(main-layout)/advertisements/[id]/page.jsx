import { getVacancyById } from "@/app/action/advertisements";
import AdvertisementSingleView from "@/components/modules/advertisements/AdvertisementSingleView";
import { notFound } from "next/navigation";

export default async function SingleAdPage({ params }) {
  // Await params to fix Next.js warning
  const { id } = await params;

  // Validate ID format
  if (!id || isNaN(parseInt(id))) {
    notFound();
  }

  // Fetch advertisement data using server action
  const result = await getVacancyById(id);

  // Handle NOT_FOUND error outside try-catch
  if (!result.success && result.errorCode === "NOT_FOUND") {
    notFound();
  }

  // Handle other API errors
  if (!result.success) {
    return (
      <div className="min-h-screen  py-8">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-br from-red-500/10 to-red-900/10 backdrop-blur-sm rounded-xl p-8 border border-red-500/20 text-center">
            <h1 className="text-2xl font-bold text-red-400 mb-4">
              خطا در بارگذاری آگهی
            </h1>
            <p className="text-gray-300 mb-6">
              {result.error || "مشکلی در دریافت اطلاعات آگهی رخ داده است."}
            </p>
            <a
              href="/advertisements"
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              بازگشت به لیست آگهی‌ها
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Check if data exists
  if (!result.data) {
    notFound();
  }

  // Render the advertisement
  return <AdvertisementSingleView advertisement={result.data} />;
}
