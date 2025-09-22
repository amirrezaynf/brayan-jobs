import React from "react";
export default function AdvertisementCard({ ad, onViewAd }) {
  const toJalali = (gregorianDate) => {
    const gDate = new Date(gregorianDate);
    return gDate.toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-gradient-to-br from-black/50 to-black/10 backdrop-blur-sm rounded-xl p-4 border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 relative overflow-hidden shadow-lg min-h-[240px] flex flex-col">
      {ad.urgent && (
        <span className="absolute top-2 left-2 bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded-full whitespace-nowrap z-10">
          فوری
        </span>
      )}

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="text-yellow-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-bold text-white truncate mb-1">
              {ad.title}
            </h3>

            <div className="flex items-center gap-3 text-sm text-gray-400 mb-2">
              <span className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                {ad.location}
              </span>

              <span className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                {ad.applicants}
              </span>
            </div>

            <p className="text-xs md:text-sm text-gray-300 line-clamp-2 mb-3">
              {ad.description}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">{ad.company}</span>
              <span className="text-sm text-gray-500">{toJalali(ad.date)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
        <div className="flex items-center gap-2">
          <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded-full font-medium">
            {ad.category}
          </span>
          <span className="text-sm text-gray-400">{ad.type}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-yellow-400 font-bold">{ad.salary}</span>
          <button
            onClick={() => onViewAd(ad.id)}
            className="bg-yellow-500 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-sm"
          >
            مشاهده
          </button>
        </div>
      </div>
    </div>
  );
}
