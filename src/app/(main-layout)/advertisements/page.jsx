import Header from "@/components/layout/header/Header";
import AdvertisementPageClient from "@/components/modules/advertisements/AdventurePageClient";
import { Suspense } from "react";

export default function AdvertisementsPage() {
  return (
    <div className='bg-black/90'>
      <Suspense
        fallback={
          <div className='min-h-screen dark-bg py-8 flex items-center justify-center'>
            <div className='text-white'>در حال بارگذاری...</div>
          </div>
        }>
        <AdvertisementPageClient />
      </Suspense>
    </div>
  );
}
