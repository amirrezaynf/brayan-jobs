"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Redirect /employer to /employer/dashboard
export default function EmployerRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/employer/dashboard");
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
        <p className="text-gray-400">در حال انتقال به داشبورد...</p>
      </div>
    </div>
  );
}
