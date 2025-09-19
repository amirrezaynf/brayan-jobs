import Footer from "@/components/layout/Footer";
import AdsAndFilters from "@/components/modules/home/TodayAd";
import JobSearch from "@/components/modules/home/JobSearch";
import BenefitsSection from "@/components/modules/home/BenefitsSection";
import HeroSection from "@/components/modules/home/hero/HomePageHeroSection";
import ImportantBrands from "@/components/modules/home/ImportantBrands";
import Header from "@/components/layout/header/Header";

export default function HomePage() {
  return (
    <>
      <div className="">
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
