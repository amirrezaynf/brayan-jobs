import React from "react";

export default function AdvertisementsPagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  const renderPaginationButtons = () => {
    const buttons = [];
    const maxButtons = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    if (currentPage > 1) {
      buttons.push(
        <button
          key="prev"
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-2 bg-[#2a2a2a] text-white rounded-lg hover:bg-yellow-500/20 hover:text-yellow-400 transition-colors duration-200 border border-gray-700"
        >
          قبلی
        </button>
      );
    }

    if (startPage > 1) {
      buttons.push(
        <button
          key={1}
          onClick={() => onPageChange(1)}
          className="px-3 py-2 bg-[#2a2a2a] text-white rounded-lg hover:bg-yellow-500/20 hover:text-yellow-400 transition-colors duration-200 border border-gray-700"
        >
          ۱
        </button>
      );
      if (startPage > 2) {
        buttons.push(
          <span key="ellipsis-start" className="px-2 py-2 text-gray-500">
            ...
          </span>
        );
      }
    }

    for (let page = startPage; page <= endPage; page++) {
      buttons.push(
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 rounded-lg border transition-colors duration-200 ${
            currentPage === page
              ? "bg-yellow-500 text-black border-yellow-500"
              : "bg-[#2a2a2a] text-white hover:bg-yellow-500/20 hover:text-yellow-400 border-gray-700"
          }`}
        >
          {page}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="ellipsis-end" className="px-2 py-2 text-gray-500">
            ...
          </span>
        );
      }
      buttons.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className="px-3 py-2 bg-[#2a2a2a] text-white rounded-lg hover:bg-yellow-500/20 hover:text-yellow-400 transition-colors duration-200 border border-gray-700"
        >
          {totalPages}
        </button>
      );
    }

    if (currentPage < totalPages) {
      buttons.push(
        <button
          key="next"
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-2 bg-[#2a2a2a] text-white rounded-lg hover:bg-yellow-500/20 hover:text-yellow-400 transition-colors duration-200 border border-gray-700"
        >
          بعدی
        </button>
      );
    }

    return buttons;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="mt-12 flex flex-col items-center gap-4">
      <div className="text-sm text-gray-400 mb-2">
        صفحه {currentPage} از {totalPages}
      </div>

      <div className="flex items-center justify-center gap-1">
        {renderPaginationButtons()}
      </div>

      {totalPages > 5 && (
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm text-gray-500">رفتن به صفحه:</span>
          <input
            type="number"
            min={1}
            max={totalPages}
            onChange={(e) => onPageChange(Number(e.target.value))}
            className="w-20 px-2 py-1 bg-[#2a2a2a] border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder={String(currentPage)}
          />
        </div>
      )}
    </div>
  );
}
