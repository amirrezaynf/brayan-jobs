import { Suspense } from "react";
import SingleAdClient from "./SingleAdClient";

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
      <SingleAdClient adId={id} />
    </Suspense>
  );
}
