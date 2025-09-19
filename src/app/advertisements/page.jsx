import dynamic from "next/dynamic";

const AdvertisementPageClient = dynamic(
  () => import("./components/AdventurePageClient"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen dark-bg py-8 flex items-center justify-center">
        <div className="text-white">در حال بارگذاری...</div>
      </div>
    ),
  }
);

export default function AdvertisementsPage() {
  return <AdvertisementPageClient />;
}
