"use client";

import JobSeekerCard from "@/components/ui/card/JobSeekerCard";
import { useRouter } from "next/navigation";

function KarjoohaList({ list }) {
  const router = useRouter();
  const handleViewProfile = (id) => {
    router.push(`/karjoo/${id}`);
  };

  const handleContact = (jobSeeker) => {
    // اینجا می‌توانید modal یا صفحه تماس را باز کنید
    console.log("Contact:", jobSeeker);
  };

  const handleBookmark = (id, isBookmarked) => {
    console.log(`Bookmark ${id}:`, isBookmarked);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {list.map((jobSeeker) => (
        <JobSeekerCard
          key={jobSeeker.id}
          jobSeeker={jobSeeker}
          onViewProfile={handleViewProfile}
          onContact={handleContact}
          onBookmark={handleBookmark}
        />
      ))}
    </div>
  );
}

export default KarjoohaList;
