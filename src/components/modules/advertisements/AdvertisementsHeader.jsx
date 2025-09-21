import React from "react";

export default function AdvertisementsHeader({ totalAds, jobCategory }) {
  return (
    <div className="mb-4">
      <h1 className="text-2xl font-bold text-white mb-2">
        نتایج جستجو آگهی‌ها
      </h1>
      <p className="text-gray-400">
        {totalAds} آگهی پیدا شد
        {jobCategory && ` در دسته ${jobCategory}`}
      </p>
    </div>
  );
}
