import React from "react";
import { MapPin } from "lucide-react";
import CustomSelect from "@/components/ui/select/CustomSelect";

export default function ResumeResidence({ residence, handleResidenceChange }) {
  const provinces = [
    "تهران",
    "اصفهان",
    "فارس",
    "خراسان رضوی",
    "آذربایجان شرقی",
    "خوزستان",
    "مازندران",
  ];

  const cities = {
    تهران: ["تهران", "ورامین", "شهریار", "ری"],
    اصفهان: ["اصفهان", "کاشان", "نجف‌آباد", "خمینی‌شهر"],
    فارس: ["شیراز", "مرودشت", "کازرون", "لار"],
  };

  return (
    <section className="border-b border-gray-800 pb-6">
      <h2 className="text-xl font-semibold text-gray-100 mb-4 flex items-center">
        <MapPin className="w-6 h-6 ml-2 text-yellow-500" />
        محل سکونت
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            استان
          </label>
          <CustomSelect
            options={provinces}
            value={residence.province}
            onChange={(value) => handleResidenceChange("province", value)}
            placeholder="انتخاب استان"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            شهرستان
          </label>
          <CustomSelect
            options={cities[residence.province] || []}
            value={residence.city}
            onChange={(value) => handleResidenceChange("city", value)}
            placeholder="انتخاب شهرستان"
          />
        </div>
      </div>
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-400 mb-2">
          آدرس
        </label>
        <textarea
          value={residence.address}
          onChange={(e) => handleResidenceChange("address", e.target.value)}
          className="w-full p-3 rounded-lg bg-[#2a2a2a] border border-[#444] focus:border-yellow-500 focus:ring-yellow-500 transition placeholder:text-gray-400 text-white"
          placeholder="آدرس کامل خود را وارد کنید"
          rows="3"
        />
      </div>
    </section>
  );
}
