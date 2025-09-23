
import Footer from "@/components/layout/footer/Footer";
import AdsAndFilters from "@/components/modules/home/TodayAd";
import JobSearch from "@/components/modules/home/JobSearch";
import BenefitsSection from "@/components/modules/home/BenefitsSection";
import HeroSection from "@/components/ui/hero/HomePageHeroSection";
import ImportantBrands from "@/components/modules/home/ImportantBrands";
import Header from "@/components/layout/header/Header";

export default function HomePage() {
  return (
    <>
      <>
        {/* Mobile Menu Panel */}

        <main>
          <HeroSection />
          <JobSearch />

          <AdsAndFilters />

          <BenefitsSection />
          <ImportantBrands />
        </main>
      </>
    </>
  );
}
