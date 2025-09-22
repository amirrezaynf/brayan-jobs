import React from "react";
import { COMPANY_DATA } from "@/constants/companyData";
import DashboardContent from "@/components/modules/employer/dashboard/DashboardContent";

// ======================================================================
// صفحه داشبورد کارفرمایان - SSR
// ======================================================================

// Server-side data fetching
async function getCompanyData() {
  // در حالت واقعی، اینجا از API یا دیتابیس داده می‌گیریم
  return COMPANY_DATA;
}

export default async function EmployerDashboardPage() {
  // Server-side data loading
  const companyData = await getCompanyData();

  return <DashboardContent companyData={companyData} />;
}
