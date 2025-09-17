// Unified company data for the entire platform
// This ensures consistency across all sections

export const COMPANY_DATA = {
  // Basic Information
  companyName: "دکتر برایان اعتماد",
  companyNameEn: "Dr. Brian Etmad",
  establishedYear: "1395",
  companyType: "private",
  industryType: "technology",
  companySize: "50-100",

  // Contact Information
  phone: "021-88776655",
  mobile: "09123456789",
  email: "info@brian-etmad.com",
  website: "https://brian-etmad.com",

  // Address Information
  country: "ایران",
  province: "تهران",
  city: "تهران",
  address: "خیابان ولیعصر، زعفرانیه، پلاک 123",
  postalCode: "1234567890",

  // Company Description
  description:
    "پلتفرم استخدامی دکتر برایان اعتماد با بهره‌گیری از هوش مصنوعی و تحلیل داده، استعدادهای ایرانی را به بهترین فرصت‌های شغلی متصل می‌کند.",
  vision:
    "تبدیل شدن به پیشروترین پلتفرم استخدامی در منطقه با استفاده از فناوری‌های نوین",
  mission:
    "کمک به سازمان‌ها برای جذب بهترین نیروی کار و کمک به متخصصان برای یافتن فرصت‌های شغلی مناسب",

  // Services & Specialties
  services: [
    "استخدام متخصصان IT",
    "ارزیابی فنی",
    "مشاوره منابع انسانی",
    "آموزش و توسعه",
  ],
  specialties: [
    "React",
    "Node.js",
    "Python",
    "DevOps",
    "AI/ML",
    "Data Science",
  ],

  // Social Media & Links
  linkedin: "https://linkedin.com/company/brian-etmad",
  instagram: "@brian_etmad",
  telegram: "@brian_etmad_channel",

  // Images
  companyLogo: null,
  companyCover: null,

  // Company Culture
  benefits: [
    "بیمه تکمیلی جامع",
    "ساعت کاری منعطف",
    "امکان کار از راه دور",
    "آموزش‌های تخصصی مداوم",
    "محیط کاری مدرن و پویا",
    "پکیج حقوق رقابتی",
  ],
  workEnvironment:
    "محیط کاری حرفه‌ای با تیم جوان و متخصص، فرهنگ سازمانی مبتنی بر نوآوری و یادگیری مداوم",

  // Dashboard Stats (for demo purposes)
  dashboardStats: {
    activeVacancies: 3,
    totalApplicants: 247,
    performanceScore: 92,
    walletBalance: 2500000,
  },
};

// Function to update company data (for future persistence)
export const updateCompanyData = (newData) => {
  Object.assign(COMPANY_DATA, newData);
  // Here you would typically save to localStorage, database, or API
  if (typeof window !== "undefined") {
    localStorage.setItem("companyData", JSON.stringify(COMPANY_DATA));
    // Dispatch custom event to notify all components of data change
    // Use setTimeout to ensure event is dispatched after current execution
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("companyDataChanged", {
          detail: { ...COMPANY_DATA },
        })
      );
    }, 0);
  }
};

// Function to load company data from storage
export const loadCompanyData = () => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("companyData");
    if (saved) {
      Object.assign(COMPANY_DATA, JSON.parse(saved));
    }
  }
  return COMPANY_DATA;
};
