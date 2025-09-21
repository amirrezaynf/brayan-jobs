import React from "react";
import { getActiveVacancies } from "@/app/action/advertisements";
import AdvertisementsContainer from "@/components/modules/advertisements/AdvertisementsContainer";

// Server-side function to fetch advertisements using server actions
async function fetchAdvertisements(searchParams) {
  try {
    // Build API parameters from search params
    const apiParams = {
      search: searchParams.search || undefined,
      expert_activity_field_id: searchParams.jobCategory
        ? getCategoryId(searchParams.jobCategory)
        : undefined,
      contract_type: mapEmploymentType(searchParams.employmentType),
      experience_level: searchParams.experience,
      is_remote: searchParams.remote === "true" ? true : undefined,
      is_urgent: searchParams.urgent === "true" ? true : undefined,
      salary_min: searchParams.salaryMin
        ? parseInt(searchParams.salaryMin)
        : undefined,
      salary_max: searchParams.salaryMax
        ? parseInt(searchParams.salaryMax)
        : undefined,
      sort_by: mapSortBy(searchParams.sortBy),
      sort_order: searchParams.sortOrder || "desc",
      per_page: 20,
      page: parseInt(searchParams.page) || 1,
    };

    // Use server action to fetch data
    const response = await getActiveVacancies(apiParams);

    if (response.success) {
      // Transform API data to match existing format
      const transformedAds = response.data.map(transformVacancyToAdvertisement);

      return {
        advertisements: transformedAds,
        meta: response.meta,
        error: null,
      };
    } else {
      // Return fallback data on API error
      return {
        advertisements: [],
        meta: { total: 0, per_page: 20, current_page: 1, last_page: 0 },
        error: response.error || "خطا در دریافت اطلاعات",
      };
    }
  } catch (error) {
    // Return fallback data on server error
    return {
      advertisements: [],
      meta: { total: 0, per_page: 20, current_page: 1, last_page: 0 },
      error: "خطای داخلی سرور",
    };
  }
}

// Helper function to map job categories to API IDs
function getCategoryId(categoryName) {
  const categoryMapping = {
    "فناوری اطلاعات": 1,
    "طراحی و گرافیک": 2,
    "مدیریت پروژه": 3,
    "بازاریابی و فروش": 4,
    مهندسی: 5,
    "پزشکی و درمان": 6,
    آموزش: 7,
    حقوقی: 8,
    "مالی و حسابداری": 9,
    "منابع انسانی": 10,
  };

  return categoryMapping[categoryName] || undefined;
}

// Helper function to map employment types
function mapEmploymentType(type) {
  const mapping = {
    "تمام وقت": "full-time",
    "پاره وقت": "part-time",
    قراردادی: "contract",
    آزاد: "freelance",
    کارآموزی: "internship",
  };

  return mapping[type] || undefined;
}

// Helper function to map sort options
function mapSortBy(sortBy) {
  const mapping = {
    newest: "published_at",
    oldest: "published_at",
    salary: "salary",
    title: "title",
    expires: "expires_at",
  };

  return mapping[sortBy] || "published_at";
}

// Transform server action data to match existing advertisement format
function transformVacancyToAdvertisement(vacancy) {
  return {
    id: vacancy.id,
    title: vacancy.title,
    company: vacancy.company?.display_name || vacancy.company?.name || "نامشخص",
    companyId: vacancy.company?.id,
    companyLogo: vacancy.company?.logo,
    location: vacancy.location_text || "نامشخص",
    province: extractProvinceFromLocation(vacancy.location_text),
    description: vacancy.description || "",
    category: vacancy.expert_activity_field?.name || "سایر",
    specialization: vacancy.expert_activity_field?.name || "سایر",
    type: mapContractTypeToFarsi(vacancy.contract_type),
    salary: formatSalary(vacancy.salary),
    applicants: 0, // API doesn't provide this field
    date: vacancy.published_at
      ? new Date(vacancy.published_at).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    urgent: vacancy.is_urgent || false,
    gender: mapGenderPreference(vacancy.gender_preference),
    education: mapEducationLevel(vacancy.min_education_level),
    experience: vacancy.experience_level || "fresh",
    militaryService: mapMilitaryService(vacancy.military_service_status),
    workHours: vacancy.working_hours || "نامشخص",
    insurance: mapInsuranceStatus(vacancy.insurance_status),
    probationPeriod: vacancy.probation_period || "نامشخص",
    remoteWork: vacancy.is_remote_possible || false,
    travelRequired: vacancy.travel_required || false,
    responsibilities: vacancy.responsibilities || "",
    requirements: vacancy.requirements || "",
    skills: Array.isArray(vacancy.required_skills)
      ? vacancy.required_skills.join(", ")
      : "",
    benefits: Array.isArray(vacancy.benefits) ? vacancy.benefits : [],
    expiresAt: vacancy.expires_at,
    daysUntilExpiry: vacancy.days_until_expiry,
  };
}

// Helper functions for data transformation
function extractProvinceFromLocation(locationText) {
  if (!locationText) return "نامشخص";

  // Extract province from location text (assuming format: "Province, City")
  const parts = locationText.split("،");
  return parts[0]?.trim() || locationText;
}

function mapContractTypeToFarsi(contractType) {
  const mapping = {
    "full-time": "تمام وقت",
    "part-time": "پاره وقت",
    contract: "قراردادی",
    freelance: "آزاد",
    internship: "کارآموزی",
  };
  return mapping[contractType] || contractType || "نامشخص";
}

function formatSalary(salary) {
  if (!salary || salary === 0) return "توافقی";

  // Format salary with Persian digits and commas
  const formatted = salary.toLocaleString("fa-IR");
  return `${formatted} تومان`;
}

function mapGenderPreference(genderPreference) {
  const mapping = {
    male: "male",
    female: "female",
    both: "both",
    any: "both",
  };
  return mapping[genderPreference] || "both";
}

function mapEducationLevel(educationLevel) {
  const mapping = {
    diploma: "diploma",
    associate: "associate",
    bachelor: "bachelor",
    master: "master",
    phd: "phd",
  };
  return mapping[educationLevel] || "bachelor";
}

function mapMilitaryService(militaryStatus) {
  const mapping = {
    completed: "completed",
    exempted: "exempted",
    "not-required": "not-required",
    "in-progress": "in-progress",
  };
  return mapping[militaryStatus] || "not-required";
}

function mapInsuranceStatus(insuranceStatus) {
  const mapping = {
    full: "full",
    basic: "basic",
    none: "none",
  };
  return mapping[insuranceStatus] || "full";
}

export default async function AdvertisementsPage({ searchParams }) {
  // Fetch advertisements server-side using server actions
  const { advertisements, meta, error } = await fetchAdvertisements(
    searchParams
  );

  return (
    <AdvertisementsContainer
      initialAds={advertisements}
      initialMeta={meta}
      apiError={error}
      searchParams={searchParams}
    />
  );
}
