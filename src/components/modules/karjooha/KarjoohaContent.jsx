import React from "react";
import KarjoohaList from "./KarjoohaList";
import KarjoohaEmptyState from "./KarjoohaEmptyState";
import Pagination from "@/components/ui/pagination/Pagination";

export default function KarjoohaContent({
  currentJobSeekers,
  filteredJobSeekers,
  currentPage,
  totalPages,
  handlePageChange,
}) {
  return (
    <div className="flex-1">
      {/* لیست کارجوها */}
      {filteredJobSeekers.length > 0 ? (
        <>
          <KarjoohaList list={currentJobSeekers} />

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            className="mt-12"
          />
        </>
      ) : (
        /* پیام خالی بودن نتایج */
        <KarjoohaEmptyState />
      )}
    </div>
  );
}
