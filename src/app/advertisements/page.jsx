import { Suspense } from "react";
import AdvertisementPageClient from "./components/AdventurePageClient";

export default function AdvertisementsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen dark-bg py-8 flex items-center justify-center">
          <div className="text-white">در حال بارگذاری...</div>
        </div>
      }
    >
      <AdvertisementPageClient />
    </Suspense>
  );
}
