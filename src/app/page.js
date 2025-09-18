import Footer from "@/components/layout/Footer";
import AdsAndFilters from "@/components/layout/TodayAd";
import JobSearch from "@/components/layout/JobSearch";
import HeroSection from "@/components/modules/HomePage/Hero/HomePageHeroSection";
import BenefitsSection from "@/components/layout/BenefitsSection";
import ImportantBrands from "@/components/layout/ImportantBrands";

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
