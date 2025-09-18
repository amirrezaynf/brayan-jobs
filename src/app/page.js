import Footer from "@/components/layout/Footer";
import AdsAndFilters from "@/components/layout/home/TodayAd";
import JobSearch from "@/components/layout/home/JobSearch";
import HeroSection from "@/components/modules/HomePage/Hero/HomePageHeroSection";
import BenefitsSection from "@/components/modules/HomePage/BenefitsSection";
import ImportantBrands from "@/components/modules/HomePage/ImportantBrands";

export default function HomePage() {
  return (
    <>
      <div className="bg-[#121212]">
        {/* Mobile Menu Panel */}

        <main>
          <HeroSection />
          <BenefitsSection />
          <JobSearch />

          <AdsAndFilters />

          <ImportantBrands />
        </main>

        <Footer />
      </div>
    </>
  );
}
