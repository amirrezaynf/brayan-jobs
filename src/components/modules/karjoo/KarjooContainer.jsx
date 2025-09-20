import React from "react";
import KarjooWelcome from "./KarjooWelcome";
import KarjooStats from "./KarjooStats";
import KarjooActivities from "./KarjooActivities";
import KarjooJobRecommendations from "./KarjooJobRecommendations";

export default function KarjooContainer() {
  return (
    <main className="p-4 lg:p-6">
      <div className="space-y-6 lg:space-y-8">
        {/* Welcome Section */}
        <KarjooWelcome />

        {/* Stats Cards */}
        <KarjooStats />

        {/* Recent Activities and Job Recommendations */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
          <KarjooActivities />
          <KarjooJobRecommendations />
        </div>
      </div>
    </main>
  );
}
