import React from "react";
import { getActiveVacancies } from "@/app/actions/advertisements";
import AdvertisementsContainer from "@/components/modules/advertisements/AdvertisementsContainer";

// Loading component for suspense
function AdvertisementsLoading() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
        <p className="text-gray-400">در حال بارگذاری آگهی‌ها...</p>
      </div>
    </div>
  );
}




// Server-side function to fetch advertisements using server actions
async function fetchAdvertisements(searchParams) {
  try {
    // Map search params to API parameters
    const apiParams = {
      search: searchParams.search || undefined,
      expert_activity_field_id: searchParams.jobCategory
        ? parseInt(searchParams.jobCategory)
        : undefined,
      contract_type: searchParams.employmentType || undefined,
      salary_min: searchParams.salaryMin
        ? parseInt(searchParams.salaryMin)
        : undefined,
      salary_max: searchParams.salaryMax
        ? parseInt(searchParams.salaryMax)
        : undefined,
      sort_by:
        searchParams.sortBy === "newest"
          ? "published_at"
          : searchParams.sortBy === "oldest"
          ? "published_at"
          : searchParams.sortBy === "most-applied"
          ? "applicants_count"
          : "published_at",
      sort_order: searchParams.sortBy === "oldest" ? "asc" : "desc",
      per_page: 20,
      page: parseInt(searchParams.page) || 1,
    };

    const result = await getActiveVacancies(apiParams);

    if (result.success) {
      return {
        ads: result.data || [],
        meta: result.meta || {
          total: 0,
          per_page: 20,
          current_page: 1,
          last_page: 0,
        },
        error: null,
      };
    } else {
      console.error("API Error:", result.error);
      return {
        ads: [],
        meta: { total: 0, per_page: 20, current_page: 1, last_page: 0 },
        error: result.error,
      };
    }
  } catch (error) {
    console.error("Fetch Error:", error);
    return {
      ads: [],
      meta: { total: 0, per_page: 20, current_page: 1, last_page: 0 },
      error: "خطا در دریافت اطلاعات از سرور",
    };
  }
}

export default async function AdvertisementsPage({ searchParams }) {
  // Await searchParams to fix Next.js warning
  const params = (await searchParams) || {};

  // Fetch advertisements data
  const { ads, meta, error } = await fetchAdvertisements(params);

  return (
    <AdvertisementsContainer
      initialAds={advertisements}
      initialMeta={meta}
      apiError={error}
      searchParams={searchParams}
    />
  );
}
