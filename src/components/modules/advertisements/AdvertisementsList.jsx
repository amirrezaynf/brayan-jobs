import React from "react";
import AdvertisementCard from "./AdvertisementCard";

export default function AdvertisementsList({ ads }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
      {ads.map((ad) => (
        <AdvertisementCard key={ad.id} ad={ad} />
      ))}
    </div>
  );
}
