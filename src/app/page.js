import Footer from "@/components/layout/Footer";
import AdsAndFilters from "@/components/layout/home/TodayAd";
import JobSearch from "@/components/layout/home/JobSearch";
import BenefitsSection from "@/components/modules/home/BenefitsSection";
import HeroSection from "@/components/modules/home/hero/HomePageHeroSection";
import ImportantBrands from "@/components/modules/home/ImportantBrands";
import Header from "@/components/layout/Header";

export default function HomePage() {
  return (
    <>
      <div className="bg-[#121212]">
        {/* Mobile Menu Panel */}

        <main>
          <Header />
          <HeroSection />
          <JobSearch />

          <AdsAndFilters />

          <BenefitsSection />
          <ImportantBrands />
        </main>

        <Footer />
      </div>
    </>
  );
}
