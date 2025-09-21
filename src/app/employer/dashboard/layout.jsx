"use client";

import React, { useState } from "react";
import EmployerHeader from "@/components/layout/header/EmployerHeader";
import EmployerMobileMenu from "@/components/modules/employer/EmployerMobileMenu";
import EmployerSidebar from "@/components/modules/employer/EmployerSidebar";
import GlobalStyles from "@/components/modules/employer/GlobalStyles";

export default function DashboardLayout({ children }) {
  const [activeTab, setActiveTab] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <GlobalStyles />
      <div className="flex min-h-screen bg-gray-950 text-gray-200">
        <EmployerSidebar />
        <div className="flex-1 lg:mr-75">
          <EmployerHeader
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
          <main className="p-3 sm:p-4 lg:p-6">{children}</main>
        </div>

        {/* Mobile Menu */}
        <EmployerMobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
    </>
  );
}
