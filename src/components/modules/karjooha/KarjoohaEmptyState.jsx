import React from "react";
import { Users } from "lucide-react";

export default function KarjoohaEmptyState() {
  return (
    <div className="text-center py-16">
      <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-400 mb-2">
        کارجویی پیدا نشد
      </h3>
      <p className="text-gray-500">لطفاً فیلترهای جستجو را تغییر دهید</p>
    </div>
  );
}
