import AdvertisementPageClient from "@/components/modules/advertisements/AdventurePageClient";
import { Suspense } from "react";
export default function AdvertisementsPage() {
  return (
    <Suspense
      fallback={
        <div className='min-h-screen dark-bg py-8 flex items-center justify-center'>
          <div className='text-white'>در حال بارگذاری...</div>
        </div>
      }>
      <AdvertisementPageClient />
    </Suspense>
  );
}
