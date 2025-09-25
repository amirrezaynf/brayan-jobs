"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import VacancyContainer from "@/components/modules/employer/vacancy/VacancyContainer";
import VacanciesHeader from "./VacanciesHeader";
import VacanciesFilters from "./VacanciesFilters";
import VacanciesTable from "./VacanciesTable";
import VacanciesMobileCards from "./VacanciesMobileCards";
import VacanciesEmptyState from "./VacanciesEmptyState";

export default function VacanciesContainer() {
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState("active");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [vacancies, setVacancies] = useState([]);
  const [editingJob, setEditingJob] = useState(null);

  // Load jobs from localStorage on component mount
  useEffect(() => {
    loadJobs();
  }, []);

  // Check URL parameter to open create form
  useEffect(() => {
    const createParam = searchParams.get("create");
    if (createParam === "true") {
      setShowCreateForm(true);
      setEditingJob(null);

      // Clean up URL parameter
      if (typeof window !== "undefined") {
        const url = new URL(window.location);
        url.searchParams.delete("create");
        window.history.replaceState({}, "", url);
      }
    }
  }, [searchParams]);

  const loadJobs = () => {
    const savedJobs = localStorage.getItem("employerJobs");
    if (savedJobs) {
      setVacancies(JSON.parse(savedJobs));
    } else {
      // Default sample jobs
      const sampleJobs = [
        {
          id: 1,
          title: "توسعه‌دهنده React Senior",
          company: "شرکت فناوری اطلاعات پارامکس",
          date: "۱۴۰۲/۱۲/۱۵",
          applicants: 12,
          status: "active",
        },
        {
          id: 2,
          title: "طراح UI/UX",
          company: "شرکت فناوری اطلاعات پارامکس",
          date: "۱۴۰۲/۱۲/۱۰",
          applicants: 8,
          status: "active",
        },
        {
          id: 3,
          title: "مدیر محصول",
          company: "شرکت فناوری اطلاعات پارامکس",
          date: "۱۴۰۲/۱۲/۰۵",
          applicants: 5,
          status: "draft",
        },
      ];
      setVacancies(sampleJobs);
      localStorage.setItem("employerJobs", JSON.stringify(sampleJobs));
    }
  };

  const saveJobs = (jobs) => {
    localStorage.setItem("employerJobs", JSON.stringify(jobs));
  };

  const showSuccessMessage = (message) => {
    const successMessage = document.createElement("div");
    successMessage.className =
      "fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50";
    successMessage.textContent = message;
    document.body.appendChild(successMessage);

    setTimeout(() => {
      document.body.removeChild(successMessage);
    }, 3000);
  };

  const handleSubmit = (jobData) => {
    if (editingJob) {
      // Update existing job
      const updatedJobs = vacancies.map((job) =>
        job.id === editingJob.id ? { ...jobData, id: editingJob.id } : job
      );
      setVacancies(updatedJobs);
      saveJobs(updatedJobs);
      showSuccessMessage("آگهی با موفقیت به‌روزرسانی شد!");
    } else {
      // Create new job
      const newJobWithId = {
        ...jobData,
        id: Date.now(),
        date: new Date().toLocaleDateString("fa-IR"),
        applicants: 0,
        status: "active",
      };
      const updatedJobs = [...vacancies, newJobWithId];
      setVacancies(updatedJobs);
      saveJobs(updatedJobs);
      showSuccessMessage("آگهی با موفقیت منتشر شد!");
    }

    // Close form
    setShowCreateForm(false);
    setEditingJob(null);
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
    setShowCreateForm(true);
  };

  const handleDeleteJob = (jobId) => {
    if (window.confirm("آیا از حذف این آگهی اطمینان دارید؟")) {
      const updatedJobs = vacancies.filter((job) => job.id !== jobId);
      setVacancies(updatedJobs);
      saveJobs(updatedJobs);
      showSuccessMessage("آگهی با موفقیت حذف شد!");
    }
  };

  const filteredVacancies = vacancies.filter((job) => {
    if (filter === "all") return true;
    return job.status === filter;
  });

  return (
    <div className="space-y-4 sm:space-y-6 p-4 lg:p-0 lg:pl-6">
      <VacanciesHeader />

      <VacanciesFilters
        filter={filter}
        setFilter={setFilter}
        vacancies={vacancies}
        onCreateNew={() => setShowCreateForm(true)}
      />

      {/* Create Job Posting Form */}
      {showCreateForm && (
        <VacancyContainer
          onClose={() => {
            setShowCreateForm(false);
            setEditingJob(null);
          }}
          editingJob={editingJob}
          onSubmit={handleSubmit}
        />
      )}

      {/* Desktop Table */}
      <VacanciesTable
        vacancies={filteredVacancies}
        onEdit={handleEditJob}
        onDelete={handleDeleteJob}
      />

      {/* Mobile Cards */}
      <VacanciesMobileCards
        vacancies={filteredVacancies}
        onEdit={handleEditJob}
        onDelete={handleDeleteJob}
      />

      {/* Empty State */}
      {filteredVacancies.length === 0 && (
        <VacanciesEmptyState
          filter={filter}
          onCreateNew={() => setShowCreateForm(true)}
        />
      )}
    </div>
  );
}
