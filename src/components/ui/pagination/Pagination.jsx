import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  showPrevNext = true,
  maxVisiblePages = 5,
  className = "",
}) => {
  // محاسبه صفحات قابل نمایش
  const getVisiblePages = () => {
    const pages = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);

    // تنظیم مجدد اگر تعداد صفحات کم است
    if (endPage - startPage + 1 < maxVisiblePages) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      } else {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // اگر فقط یک صفحه وجود دارد، pagination نمایش داده نمی‌شود
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className="flex items-center gap-2">
        {/* دکمه قبلی */}
        {showPrevNext && (
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium ${
              currentPage === 1
                ? "bg-gray-800/50 text-gray-500 cursor-not-allowed"
                : "bg-gray-800 hover:bg-gray-700 text-white"
            }`}
          >
            <ChevronRight className="w-4 h-4" />
            <span className="hidden sm:inline">قبلی</span>
          </button>
        )}

        {/* نمایش صفحه اول و ... */}
        {visiblePages[0] > 1 && (
          <>
            <button
              onClick={() => handlePageClick(1)}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium"
            >
              ۱
            </button>
            {visiblePages[0] > 2 && (
              <span className="px-2 text-gray-400">...</span>
            )}
          </>
        )}

        {/* صفحات قابل نمایش */}
        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`px-4 py-2 rounded-lg transition-colors font-medium ${
              page === currentPage
                ? "bg-yellow-500 text-black"
                : "bg-gray-800 hover:bg-gray-700 text-white"
            }`}
          >
            {page.toLocaleString("fa-IR")}
          </button>
        ))}

        {/* نمایش ... و صفحه آخر */}
        {visiblePages[visiblePages.length - 1] < totalPages && (
          <>
            {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
              <span className="px-2 text-gray-400">...</span>
            )}
            <button
              onClick={() => handlePageClick(totalPages)}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium"
            >
              {totalPages.toLocaleString("fa-IR")}
            </button>
          </>
        )}

        {/* دکمه بعدی */}
        {showPrevNext && (
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium ${
              currentPage === totalPages
                ? "bg-gray-800/50 text-gray-500 cursor-not-allowed"
                : "bg-gray-800 hover:bg-gray-700 text-white"
            }`}
          >
            <span className="hidden sm:inline">بعدی</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
