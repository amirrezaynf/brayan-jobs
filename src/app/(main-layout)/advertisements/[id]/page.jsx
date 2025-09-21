import AdvertisementSingleClient from "@/components/modules/advertisements/AdvertisementSingleClient";
import { Suspense } from "react";

export default function SingleAdPage({ params }) {
  const { id } = params;

  return (
    <Suspense
      fallback={
        <div className="min-h-screen dark-bg py-8 flex items-center justify-center">
          <div className="text-white">در حال بارگذاری آگهی...</div>
        </div>
      }
    >
      <AdvertisementSingleClient adId={id} />
    </Suspense>
  );
}
