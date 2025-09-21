import React from "react";
import AdvertisementSidebar from "@/components/ui/filter/AdvertisementSidebar";

export default function AdvertisementsFilters(props) {
  const categories = [
    "همه",
    "فناوری اطلاعات",
    "طراحی و گرافیک",
    "بازاریابی و فروش",
    "مدیریت پروژه",
    "منابع انسانی",
    "مالی و حسابداری",
  ];

  const provinces = [
    "همه",
    "تهران",
    "خراسان رضوی",
    "اصفهان",
    "فارس",
    "آذربایجان شرقی",
    "خوزستان",
    "گیلان",
    "البرز",
  ];

  const employmentTypes = [
    "همه",
    "تمام وقت",
    "پاره وقت",
    "قراردادی",
    "دورکاری",
  ];

  const citiesByProvince = {
    تهران: [
      "همه",
      "تهران",
      "شهریار",
      "چهاردانگه",
      "دشتستان",
      "کرج",
      "ورامین",
      "شمیرانات",
      "پاکدشت",
    ],
    "خراسان رضوی": ["همه", "مشهد", "نیشابور", "سبزوار"],
    اصفهان: ["همه", "اصفهان", "کاشان", "نجف آباد"],
    فارس: ["همه", "شیراز", "جهرم", "مرودشت"],
    "آذربایجان شرقی": ["همه", "تبریز", "اهر", "مراغه"],
    خوزستان: ["همه", "اهواز", "آبادان", "خرمشهر"],
    گیلان: ["همه", "رشت", "انزلی", "لاهیجان"],
    البرز: ["همه", "کرج", "نظرآباد", "فردیس"],
    همه: [
      "همه",
      "تهران",
      "کرج",
      "مشهد",
      "اصفهان",
      "شیراز",
      "تبریز",
      "اهواز",
      "رشت",
    ],
  };

  const availableCities =
    props.selectedProvince && citiesByProvince[props.selectedProvince]
      ? citiesByProvince[props.selectedProvince]
      : citiesByProvince["همه"];

  return (
    <AdvertisementSidebar
      searchFilter={props.searchFilter}
      setSearchFilter={props.setSearchFilter}
      sortBy={props.sortBy}
      setSortBy={props.setSortBy}
      selectedCategory={props.selectedCategory}
      setSelectedCategory={props.setSelectedCategory}
      categories={categories}
      selectedProvince={props.selectedProvince}
      setSelectedProvince={props.setSelectedProvince}
      provinces={provinces}
      selectedCity={props.selectedCity}
      setSelectedCity={props.setSelectedCity}
      availableCities={availableCities}
      selectedEmploymentType={props.selectedEmploymentType}
      setSelectedEmploymentType={props.setSelectedEmploymentType}
      employmentTypes={employmentTypes}
      salaryRange={props.salaryRange}
      setSalaryRange={props.setSalaryRange}
      showNegotiable={props.showNegotiable}
      setShowNegotiable={props.setShowNegotiable}
      showNoLimit={props.showNoLimit}
      setShowNoLimit={props.setShowNoLimit}
      showRangeFilter={props.showRangeFilter}
      setShowRangeFilter={props.setShowRangeFilter}
    />
  );
}
