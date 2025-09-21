import React, { Suspense } from "react";
import AdvertisementsContainer from "@/components/modules/advertisements/AdvertisementsContainer";

// Loading component for suspense
function AdvertisementsLoading() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
        <p className="text-gray-400">در حال بارگذاری آگهی‌ها...</p>
      </div>
    </div>
  );
}

export default function AdvertisementsPage() {
  return (
    <Suspense fallback={<AdvertisementsLoading />}>
      <AdvertisementsContainer />
    </Suspense>
  );
}
