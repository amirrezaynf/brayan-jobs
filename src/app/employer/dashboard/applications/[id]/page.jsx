"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

// داده‌های نمونه رزومه کامل - در واقعیت از API دریافت می‌شود
const getResumeData = (id) => {
  const resumes = {
    1: {
      id: 1,
      name: "سارا احمدی",
      position: "توسعه‌دهنده React",
      email: "sara.ahmdi@example.com",
      phone: "+۹۸ ۹۱۲ ۳۴۵ ۶۷۸۹",
      location: "تهران، ایران",
      appliedDate: "۲ ساعت پیش",
      experienceYears: "۴",
      education: "کارشناسی مهندسی نرم‌افزار",
      status: "new",
      score: 92,
      isPro: true,
      profileImage: null, // در واقعیت URL تصویر پروفایل
      summary:
        "توسعه‌دهنده Front-End با تجربه ۴ ساله در React، Next.js و TypeScript. متخصص در ساخت رابط کاربری مدرن و responsive با تمرکز بر تجربه کاربری عالی.",
      skills: [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "Git",
        "Node.js",
        "Express.js",
        "MongoDB",
        "REST APIs",
      ],
      experience: [
        {
          id: 1,
          title: "توسعه‌دهنده Front-End Senior",
          company: "شرکت فناوری اطلاعات سپهر",
          location: "تهران",
          startDate: "۱۳۹۹/۰۱",
          endDate: "اکنون",
          description:
            "طراحی و توسعه رابط کاربری وب اپلیکیشن‌های بزرگ با استفاده از React و Next.js. همکاری با تیم طراحی برای بهبود UX و پیاده‌سازی کامپوننت‌های reusable.",
          achievements: [
            "افزایش سرعت بارگذاری صفحات تا ۴۰%",
            "پیاده‌سازی سیستم طراحی یکپارچه",
            "آموزش ۳ توسعه‌دهنده junior",
          ],
        },
        {
          id: 2,
          title: "توسعه‌دهنده Front-End",
          company: "استارتاپ نوین",
          location: "تهران",
          startDate: "۱۳۹۷/۰۶",
          endDate: "۱۳۹۸/۱۲",
          description:
            "توسعه اپلیکیشن‌های موبایل و وب با React Native و React. کار با تیم‌های کوچک و چابک برای تحویل سریع پروژه‌ها.",
          achievements: [
            "انتشار ۲ اپلیکیشن در App Store و Google Play",
            "بهبود عملکرد اپلیکیشن تا ۳۰%",
          ],
        },
      ],
      education: [
        {
          id: 1,
          degree: "کارشناسی مهندسی نرم‌افزار",
          institution: "دانشگاه تهران",
          location: "تهران",
          graduationYear: "۱۳۹۷",
          gpa: "۱۷.۵ از ۲۰",
        },
        {
          id: 2,
          degree: "دیپلم ریاضی فیزیک",
          institution: "دبیرستان علامه حلی",
          location: "تهران",
          graduationYear: "۱۳۹۳",
          gpa: "۱۹ از ۲۰",
        },
      ],
      certifications: [
        {
          id: 1,
          name: "گواهی React Developer",
          issuer: "Meta (Facebook)",
          issueDate: "۱۴۰۱/۰۳",
          credentialId: "META-REACT-2022-001",
        },
        {
          id: 2,
          name: "گواهی Next.js",
          issuer: "Vercel",
          issueDate: "۱۴۰۱/۰۶",
          credentialId: "VERCEL-NEXT-2022-045",
        },
      ],
      languages: [
        { name: "فارسی", level: "زبان مادری" },
        { name: "انگلیسی", level: "خوب" },
      ],
      portfolio: [
        {
          name: "پروژه فروشگاه آنلاین",
          url: "https://example.com/portfolio/shop",
        },
        {
          name: "اپلیکیشن مدیریت وظایف",
          url: "https://example.com/portfolio/todo",
        },
      ],
    },
    2: {
      id: 2,
      name: "امیرحسین رضایی",
      position: "طراح UX/UI",
      email: "amir.rezaei@example.com",
      phone: "+۹۸ ۹۲۱ ۵۵۶ ۷۸۹۰",
      location: "اصفهان، ایران",
      appliedDate: "۴ ساعت پیش",
      experienceYears: "۳",
      education: "کارشناسی طراحی گرافیک",
      status: "new",
      score: 88,
      isPro: false,
      summary:
        "طراح UX/UI با تجربه ۳ ساله در طراحی رابط کاربری موبایل و وب. متخصص در طراحی تجربه کاربری و رابط کاربری مدرن با تمرکز بر usability و accessibility.",
      skills: [
        "Figma",
        "Adobe XD",
        "Sketch",
        "Photoshop",
        "Illustrator",
        "InVision",
        "Principle",
        "User Research",
        "Wireframing",
        "Prototyping",
      ],
      experience: [
        {
          id: 1,
          title: "طراح UX/UI Senior",
          company: "شرکت طراحی دیجیتال نوین",
          location: "اصفهان",
          startDate: "۱۳۹۹/۰۳",
          endDate: "اکنون",
          description:
            "طراحی رابط کاربری اپلیکیشن‌های موبایل و وب برای مشتریان بزرگ. انجام تحقیقات کاربر و تست usability برای بهبود تجربه کاربری.",
          achievements: [
            "طراحی رابط کاربری ۵ اپلیکیشن موبایل موفق",
            "افزایش نرخ تبدیل تا ۲۵%",
            "برنده جایزه طراحی دیجیتال اصفهان",
          ],
        },
        {
          id: 2,
          title: "طراح UI",
          company: "آژانس تبلیغات دیجیتال",
          location: "اصفهان",
          startDate: "۱۳۹۸/۰۶",
          endDate: "۱۳۹۹/۰۲",
          description:
            "طراحی رابط کاربری وب‌سایت‌ها و اپلیکیشن‌های موبایل. همکاری با تیم توسعه برای پیاده‌سازی طراحی‌ها.",
          achievements: [
            "طراحی ۲۰ وب‌سایت responsive",
            "بهبود زمان بارگذاری صفحات",
          ],
        },
      ],
      education: [
        {
          id: 1,
          degree: "کارشناسی طراحی گرافیک",
          institution: "دانشگاه هنر اصفهان",
          location: "اصفهان",
          graduationYear: "۱۳۹۸",
          gpa: "۱۶.۸ از ۲۰",
        },
      ],
      certifications: [
        {
          id: 1,
          name: "گواهی UX Design",
          issuer: "Google",
          issueDate: "۱۴۰۱/۰۵",
          credentialId: "GOOGLE-UX-2022-123",
        },
      ],
      languages: [
        { name: "فارسی", level: "زبان مادری" },
        { name: "انگلیسی", level: "متوسط" },
      ],
      portfolio: [
        {
          name: "طراحی اپلیکیشن بانکی",
          url: "https://example.com/portfolio/bank-app",
        },
        {
          name: "وب‌سایت فروشگاه آنلاین",
          url: "https://example.com/portfolio/ecommerce",
        },
      ],
    },
    3: {
      id: 3,
      name: "مریم کرمی",
      position: "توسعه‌دهنده Node.js",
      email: "maryam.karami@example.com",
      phone: "+۹۸ ۹۱۱ ۲۲۳ ۴۴۵۵",
      location: "شیراز، ایران",
      appliedDate: "۶ ساعت پیش",
      experienceYears: "۵",
      education: "کارشناسی کامپیوتر",
      status: "reviewed",
      score: 85,
      isPro: true,
      summary:
        "توسعه‌دهنده Back-End با تجربه ۵ ساله در Node.js، Express و MongoDB. متخصص در ساخت APIهای RESTful و معماری میکروسرویس‌ها.",
      skills: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "PostgreSQL",
        "Redis",
        "Docker",
        "Kubernetes",
        "REST APIs",
        "GraphQL",
        "JWT",
        "Socket.io",
      ],
      experience: [
        {
          id: 1,
          title: "توسعه‌دهنده Back-End Senior",
          company: "شرکت فناوری اطلاعات شیراز",
          location: "شیراز",
          startDate: "۱۳۹۸/۰۹",
          endDate: "اکنون",
          description:
            "توسعه و نگهداری APIهای RESTful برای اپلیکیشن‌های بزرگ. طراحی معماری میکروسرویس‌ها و بهینه‌سازی عملکرد دیتابیس.",
          achievements: [
            "کاهش زمان پاسخ API تا ۵۰%",
            "پیاده‌سازی سیستم caching پیشرفته",
            "مدیریت تیم ۴ نفره توسعه‌دهندگان",
          ],
        },
        {
          id: 2,
          title: "توسعه‌دهنده Back-End",
          company: "استارتاپ فناوری",
          location: "شیراز",
          startDate: "۱۳۹۷/۰۳",
          endDate: "۱۳۹۸/۰۸",
          description:
            "توسعه APIهای RESTful و GraphQL. کار با MongoDB و PostgreSQL برای ذخیره‌سازی داده‌ها.",
          achievements: ["ساخت ۱۰ API مختلف", "بهبود امنیت اپلیکیشن"],
        },
      ],
      education: [
        {
          id: 1,
          degree: "کارشناسی مهندسی کامپیوتر",
          institution: "دانشگاه شیراز",
          location: "شیراز",
          graduationYear: "۱۳۹۷",
          gpa: "۱۷.۲ از ۲۰",
        },
      ],
      certifications: [
        {
          id: 1,
          name: "گواهی Node.js Developer",
          issuer: "Microsoft",
          issueDate: "۱۴۰۰/۱۱",
          credentialId: "MS-NODE-2021-456",
        },
      ],
      languages: [
        { name: "فارسی", level: "زبان مادری" },
        { name: "انگلیسی", level: "خوب" },
      ],
      portfolio: [
        {
          name: "API پلتفرم آموزشی",
          url: "https://example.com/portfolio/api-platform",
        },
      ],
    },
    4: {
      id: 4,
      name: "علیرضا محمدی",
      position: "مدیر محصول دیجیتال",
      email: "alireza.mohammadi@example.com",
      phone: "+۹۸ ۹۰۵ ۶۶۶ ۷۷۷۸",
      location: "مشهد، ایران",
      appliedDate: "۱ روز پیش",
      experienceYears: "۶",
      education: "کارشناسی MBA",
      status: "shortlisted",
      score: 95,
      isPro: false,
      summary:
        "مدیر محصول دیجیتال با تجربه ۶ ساله در مدیریت محصول، استراتژی دیجیتال و تحلیل داده‌ها. متخصص در رشد محصول و بهینه‌سازی تجربه کاربری.",
      skills: [
        "Product Management",
        "Agile/Scrum",
        "Data Analysis",
        "A/B Testing",
        "User Research",
        "SQL",
        "Google Analytics",
        "Mixpanel",
        "Roadmapping",
        "Stakeholder Management",
      ],
      experience: [
        {
          id: 1,
          title: "مدیر محصول دیجیتال",
          company: "شرکت تجارت الکترونیک مشهد",
          location: "مشهد",
          startDate: "۱۳۹۹/۰۶",
          endDate: "اکنون",
          description:
            "مدیریت محصول پلتفرم تجارت الکترونیک. تعریف استراتژی محصول، تحلیل داده‌ها و همکاری با تیم‌های فنی و طراحی.",
          achievements: [
            "افزایش درآمد ماهانه تا ۳۰۰%",
            "کاهش نرخ ریزش کاربران تا ۴۰%",
            "راه‌اندازی ۵ محصول جدید موفق",
          ],
        },
        {
          id: 2,
          title: "مدیر محصول",
          company: "اپلیکیشن موبایل آموزشی",
          location: "مشهد",
          startDate: "۱۳۹۷/۱۱",
          endDate: "۱۳۹۹/۰۵",
          description:
            "مدیریت محصول اپلیکیشن آموزشی موبایل. انجام تحقیقات بازار و تحلیل رقبا.",
          achievements: [
            "افزایش دانلود اپلیکیشن تا ۱۰۰ هزار",
            "بهبود امتیاز اپلیکیشن در استور",
          ],
        },
      ],
      education: [
        {
          id: 1,
          degree: "کارشناسی ارشد MBA",
          institution: "دانشگاه فردوسی مشهد",
          location: "مشهد",
          graduationYear: "۱۳۹۷",
          gpa: "۱۷.۸ از ۲۰",
        },
      ],
      certifications: [
        {
          id: 1,
          name: "گواهی Product Management",
          issuer: "Pragmatic Institute",
          issueDate: "۱۴۰۰/۰۸",
          credentialId: "PRAGMATIC-PM-2021-789",
        },
      ],
      languages: [
        { name: "فارسی", level: "زبان مادری" },
        { name: "انگلیسی", level: "خیلی خوب" },
      ],
      portfolio: [
        {
          name: "مطالعات موردی محصول",
          url: "https://example.com/portfolio/product-cases",
        },
      ],
    },
    5: {
      id: 5,
      name: "فاطمه زمانی",
      position: "تحلیلگر داده",
      email: "fateme.zamani@example.com",
      phone: "+۹۸ ۹۱۳ ۸۸۸ ۹۹۹۰",
      location: "کرج، ایران",
      appliedDate: "۲ روز پیش",
      experienceYears: "۴",
      education: "کارشناسی آمار و احتمال",
      status: "reviewed",
      score: 82,
      isPro: true,
      summary:
        "تحلیلگر داده با تجربه ۴ ساله در تحلیل داده‌ها، ساخت داشبوردهای تحلیلی و مدل‌سازی آماری. متخصص در Python، SQL و ابزارهای BI.",
      skills: [
        "Python",
        "SQL",
        "Tableau",
        "Power BI",
        "Excel",
        "Pandas",
        "NumPy",
        "Scikit-learn",
        "Statistical Analysis",
        "Data Visualization",
      ],
      experience: [
        {
          id: 1,
          title: "تحلیلگر داده Senior",
          company: "شرکت داده‌پردازان کرج",
          location: "کرج",
          startDate: "۱۳۹۹/۰۲",
          endDate: "اکنون",
          description:
            "تحلیل داده‌های بزرگ مشتریان، ساخت مدل‌های پیش‌بینی و گزارش‌گیری مدیریتی. همکاری با تیم‌های مختلف برای تصمیم‌گیری مبتنی بر داده.",
          achievements: [
            "ساخت ۱۵ داشبورد تحلیلی",
            "بهبود دقت پیش‌بینی تا ۸۵%",
            "کاهش هزینه‌ها تا ۲۰%",
          ],
        },
        {
          id: 2,
          title: "تحلیلگر داده",
          company: "مرکز تحقیقات بازار",
          location: "کرج",
          startDate: "۱۳۹۸/۰۴",
          endDate: "۱۳۹۹/۰۱",
          description:
            "تحلیل داده‌های بازار و ساخت گزارش‌های تحلیلی. کار با ابزارهای BI و زبان برنامه‌نویسی Python.",
          achievements: [
            "تحلیل داده‌های ۵۰ شرکت مختلف",
            "ساخت مدل‌های آماری پیشرفته",
          ],
        },
      ],
      education: [
        {
          id: 1,
          degree: "کارشناسی آمار و احتمال",
          institution: "دانشگاه الزهرا",
          location: "تهران",
          graduationYear: "۱۳۹۸",
          gpa: "۱۷.۳ از ۲۰",
        },
      ],
      certifications: [
        {
          id: 1,
          name: "گواهی Data Analysis",
          issuer: "Google",
          issueDate: "۱۴۰۱/۰۲",
          credentialId: "GOOGLE-DA-2022-234",
        },
      ],
      languages: [
        { name: "فارسی", level: "زبان مادری" },
        { name: "انگلیسی", level: "خوب" },
      ],
      portfolio: [
        {
          name: "نمونه داشبوردها",
          url: "https://example.com/portfolio/dashboards",
        },
      ],
    },
    6: {
      id: 6,
      name: "حسین علوی",
      position: "توسعه‌دهنده React Native",
      email: "hossein.alavi@example.com",
      phone: "+۹۸ ۹۲۲ ۱۱۱ ۲۲۲۳",
      location: "تبریز، ایران",
      appliedDate: "۳ روز پیش",
      experienceYears: "۳",
      education: "کارشناسی مهندسی برق",
      status: "reviewed",
      score: 79,
      isPro: false,
      summary:
        "توسعه‌دهنده React Native با تجربه ۳ ساله در ساخت اپلیکیشن‌های موبایل cross-platform. متخصص در React Native، Redux و Firebase.",
      skills: [
        "React Native",
        "JavaScript",
        "TypeScript",
        "Redux",
        "Firebase",
        "Expo",
        "Android Studio",
        "Xcode",
        "REST APIs",
        "Git",
      ],
      experience: [
        {
          id: 1,
          title: "توسعه‌دهنده Mobile",
          company: "شرکت اپلیکیشن‌های موبایل تبریز",
          location: "تبریز",
          startDate: "۱۳۹۹/۰۷",
          endDate: "اکنون",
          description:
            "توسعه اپلیکیشن‌های موبایل با React Native برای iOS و Android. پیاده‌سازی ویژگی‌های جدید و رفع باگ‌ها.",
          achievements: [
            "انتشار ۸ اپلیکیشن در استورها",
            "افزایش امتیاز اپلیکیشن‌ها",
            "بهبود عملکرد اپلیکیشن‌ها",
          ],
        },
        {
          id: 2,
          title: "توسعه‌دهنده Front-End",
          company: "آژانس دیجیتال تبریز",
          location: "تبریز",
          startDate: "۱۳۹۸/۱۰",
          endDate: "۱۳۹۹/۰۶",
          description:
            "توسعه وب‌سایت‌های responsive با React و Next.js. کار با تیم طراحی برای پیاده‌سازی UI/UX.",
          achievements: ["توسعه ۱۲ وب‌سایت مختلف", "بهبود سرعت بارگذاری صفحات"],
        },
      ],
      education: [
        {
          id: 1,
          degree: "کارشناسی مهندسی برق",
          institution: "دانشگاه تبریز",
          location: "تبریز",
          graduationYear: "۱۳۹۸",
          gpa: "۱۶.۵ از ۲۰",
        },
      ],
      certifications: [
        {
          id: 1,
          name: "گواهی React Native",
          issuer: "Meta",
          issueDate: "۱۴۰۰/۱۲",
          credentialId: "META-RN-2021-567",
        },
      ],
      languages: [
        { name: "فارسی", level: "زبان مادری" },
        { name: "انگلیسی", level: "متوسط" },
        { name: "ترکی آذربایجانی", level: "زبان مادری" },
      ],
      portfolio: [
        {
          name: "اپلیکیشن فروشگاه آنلاین",
          url: "https://example.com/portfolio/mobile-shop",
        },
      ],
    },
    7: {
      id: 7,
      name: "نازنین حسینی",
      position: "کارشناس DevOps",
      email: "naznin.hosseini@example.com",
      phone: "+۹۸ ۹۱۴ ۳۳۳ ۴۴۴۵",
      location: "اهواز، ایران",
      appliedDate: "۴ روز پیش",
      experienceYears: "۵",
      education: "کارشناسی مهندسی کامپیوتر",
      status: "shortlisted",
      score: 91,
      isPro: true,
      summary:
        "کارشناس DevOps با تجربه ۵ ساله در اتوماسیون، CI/CD و مدیریت زیرساخت ابری. متخصص در AWS، Docker و Kubernetes.",
      skills: [
        "AWS",
        "Docker",
        "Kubernetes",
        "Jenkins",
        "GitLab CI",
        "Terraform",
        "Ansible",
        "Linux",
        "Python",
        "Bash",
      ],
      experience: [
        {
          id: 1,
          title: "کارشناس DevOps Senior",
          company: "شرکت فناوری ابری اهواز",
          location: "اهواز",
          startDate: "۱۳۹۸/۱۲",
          endDate: "اکنون",
          description:
            "مدیریت زیرساخت ابری AWS، اتوماسیون فرآیندهای CI/CD و نگهداری سیستم‌های production. همکاری با تیم توسعه برای بهبود DevOps practices.",
          achievements: [
            "کاهش downtime تا ۹۹.۹%",
            "اتوماسیون ۸۰% فرآیندهای manual",
            "کاهش هزینه‌های ابری تا ۳۰%",
          ],
        },
        {
          id: 2,
          title: "کارشناس DevOps",
          company: "استارتاپ فناوری",
          location: "اهواز",
          startDate: "۱۳۹۷/۰۸",
          endDate: "۱۳۹۸/۱۱",
          description:
            "پیاده‌سازی pipelineهای CI/CD، مدیریت سرورهای Linux و کار با Docker containers.",
          achievements: [
            "راه‌اندازی سیستم monitoring پیشرفته",
            "بهبود امنیت زیرساخت",
          ],
        },
      ],
      education: [
        {
          id: 1,
          degree: "کارشناسی مهندسی کامپیوتر",
          institution: "دانشگاه شهید چمران اهواز",
          location: "اهوaz",
          graduationYear: "۱۳۹۷",
          gpa: "۱۷.۱ از ۲۰",
        },
      ],
      certifications: [
        {
          id: 1,
          name: "AWS Certified DevOps Engineer",
          issuer: "Amazon Web Services",
          issueDate: "۱۴۰۱/۰۱",
          credentialId: "AWS-DOE-2022-890",
        },
        {
          id: 2,
          name: "Certified Kubernetes Administrator",
          issuer: "CNCF",
          issueDate: "۱۴۰۰/۰۹",
          credentialId: "CNCF-CKA-2021-123",
        },
      ],
      languages: [
        { name: "فارسی", level: "زبان مادری" },
        { name: "انگلیسی", level: "خوب" },
      ],
      portfolio: [
        {
          name: "پروژه‌های DevOps",
          url: "https://example.com/portfolio/devops",
        },
      ],
    },
    8: {
      id: 8,
      name: "رضا شریفی",
      position: "توسعه‌دهنده Python",
      email: "reza.sharifi@example.com",
      phone: "+۹۸ ۹۱۵ ۵۵۵ ۶۶۶۷",
      location: "قم، ایران",
      appliedDate: "۵ روز پیش",
      experienceYears: "۴",
      education: "کارشناسی علوم کامپیوتر",
      status: "new",
      score: 87,
      isPro: false,
      summary:
        "توسعه‌دهنده Python با تجربه ۴ ساله در Django، Flask و FastAPI. متخصص در توسعه وب اپلیکیشن‌ها و APIهای RESTful.",
      skills: [
        "Python",
        "Django",
        "Flask",
        "FastAPI",
        "PostgreSQL",
        "Redis",
        "Celery",
        "Docker",
        "Git",
        "Linux",
      ],
      experience: [
        {
          id: 1,
          title: "توسعه‌دهنده Back-End Senior",
          company: "شرکت نرم‌افزاری قم",
          location: "قم",
          startDate: "۱۳۹۹/۰۴",
          endDate: "اکنون",
          description:
            "توسعه وب اپلیکیشن‌های بزرگ با Django و FastAPI. طراحی و پیاده‌سازی APIهای RESTful و GraphQL.",
          achievements: [
            "توسعه ۶ وب اپلیکیشن بزرگ",
            "بهبود عملکرد APIها تا ۶۰%",
            "مدیریت تیم ۳ نفره",
          ],
        },
        {
          id: 2,
          title: "توسعه‌دهنده Python",
          company: "آژانس دیجیتال قم",
          location: "قم",
          startDate: "۱۳۹۸/۰۷",
          endDate: "۱۳۹۹/۰۳",
          description:
            "توسعه وب‌سایت‌ها و APIهای RESTful با Flask و Django. کار با PostgreSQL و Redis.",
          achievements: ["ساخت ۱۰ API مختلف", "بهینه‌سازی queryهای دیتابیس"],
        },
      ],
      education: [
        {
          id: 1,
          degree: "کارشناسی علوم کامپیوتر",
          institution: "دانشگاه قم",
          location: "قم",
          graduationYear: "۱۳۹۸",
          gpa: "۱۶.۹ از ۲۰",
        },
      ],
      certifications: [
        {
          id: 1,
          name: "گواهی Python Developer",
          issuer: "Python Institute",
          issueDate: "۱۴۰۰/۱۰",
          credentialId: "PYTHON-PCPP-2021-456",
        },
      ],
      languages: [
        { name: "فارسی", level: "زبان مادری" },
        { name: "انگلیسی", level: "متوسط" },
      ],
      portfolio: [
        {
          name: "وب اپلیکیشن مدیریت پروژه",
          url: "https://example.com/portfolio/project-manager",
        },
      ],
    },
    9: {
      id: 9,
      name: "محمد علیزاده",
      position: "توسعه‌دهنده Vue.js",
      email: "mohammad.alizadeh@example.com",
      phone: "+۹۸ ۹۱۶ ۷۷۷ ۸۸۸۹",
      location: "رشت، ایران",
      appliedDate: "۲ ساعت پیش",
      experienceYears: "۲",
      education: "کارشناسی مهندسی نرم‌افزار",
      status: "new",
      score: 78,
      isPro: false,
      summary:
        "توسعه‌دهنده Front-End با تمرکز بر Vue.js و Nuxt.js. تجربه در ساخت اپلیکیشن‌های تک صفحه‌ای و SSR.",
      skills: [
        "Vue.js",
        "Nuxt.js",
        "JavaScript",
        "TypeScript",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "Vuex",
        "Pinia",
        "Git",
      ],
      experience: [
        {
          id: 1,
          title: "توسعه‌دهنده Front-End",
          company: "استارتاپ فناوری رشت",
          location: "رشت",
          startDate: "۱۴۰۰/۰۶",
          endDate: "اکنون",
          description:
            "توسعه رابط کاربری اپلیکیشن‌های Vue.js و Nuxt.js. همکاری با تیم طراحی برای پیاده‌سازی کامپوننت‌های responsive.",
          achievements: [
            "توسعه ۵ اپلیکیشن Vue.js",
            "بهبود سرعت بارگذاری تا ۴۰%",
          ],
        },
      ],
      education: [
        {
          id: 1,
          degree: "کارشناسی مهندسی نرم‌افزار",
          institution: "دانشگاه گیلان",
          location: "رشت",
          graduationYear: "۱۴۰۰",
          gpa: "۱۷.۲ از ۲۰",
        },
      ],
      languages: [
        { name: "فارسی", level: "زبان مادری" },
        { name: "انگلیسی", level: "خوب" },
      ],
      portfolio: [
        {
          name: "اپلیکیشن فروشگاه آنلاین",
          url: "https://example.com/portfolio/vue-shop",
        },
      ],
    },
    10: {
      id: 10,
      name: "زهرا کریمی",
      position: "توسعه‌دهنده PHP",
      email: "zahra.karimi@example.com",
      phone: "+۹۸ ۹۱۷ ۹۹۹ ۰۰۰۱",
      location: "زاهدان، ایران",
      appliedDate: "۶ ساعت پیش",
      experienceYears: "۳",
      education: "کارشناسی کامپیوتر",
      status: "reviewed",
      score: 81,
      isPro: false,
      summary:
        "توسعه‌دهنده PHP با تجربه در Laravel و CodeIgniter. متخصص در توسعه وب اپلیکیشن‌های MVC و RESTful APIs.",
      skills: [
        "PHP",
        "Laravel",
        "CodeIgniter",
        "MySQL",
        "JavaScript",
        "jQuery",
        "HTML5",
        "CSS3",
        "Git",
        "Composer",
      ],
      experience: [
        {
          id: 1,
          title: "توسعه‌دهنده PHP",
          company: "شرکت نرم‌افزاری زاهدان",
          location: "زاهدان",
          startDate: "۱۳۹۹/۰۹",
          endDate: "اکنون",
          description:
            "توسعه وب اپلیکیشن‌های PHP با استفاده از Laravel. پیاده‌سازی APIهای RESTful و کار با MySQL.",
          achievements: ["توسعه ۸ وب اپلیکیشن", "بهبود امنیت اپلیکیشن‌ها"],
        },
      ],
      education: [
        {
          id: 1,
          degree: "کارشناسی کامپیوتر",
          institution: "دانشگاه سیستان و بلوچستان",
          location: "زاهدان",
          graduationYear: "۱۳۹۹",
          gpa: "۱۶.۸ از ۲۰",
        },
      ],
      languages: [
        { name: "فارسی", level: "زبان مادری" },
        { name: "انگلیسی", level: "متوسط" },
      ],
      portfolio: [
        {
          name: "سیستم مدیریت محتوا",
          url: "https://example.com/portfolio/php-cms",
        },
      ],
    },
    11: {
      id: 11,
      name: "احمد رضایی",
      position: "طراح گرافیک",
      email: "ahmad.rezaei@example.com",
      phone: "+۹۸ ۹۱۸ ۱۱۱ ۲۲۲۳",
      location: "بندرعباس، ایران",
      appliedDate: "۱ روز پیش",
      experienceYears: "۴",
      education: "کارشناسی هنر",
      status: "new",
      score: 76,
      isPro: false,
      summary:
        "طراح گرافیک با تجربه در طراحی لوگو، پوستر و رابط کاربری. متخصص در Adobe Creative Suite و Figma.",
      skills: [
        "Photoshop",
        "Illustrator",
        "InDesign",
        "Figma",
        "Sketch",
        "After Effects",
        "Premiere Pro",
        "Typography",
        "Branding",
        "UI Design",
      ],
      experience: [
        {
          id: 1,
          title: "طراح گرافیک Senior",
          company: "آژانس تبلیغات بندرعباس",
          location: "بندرعباس",
          startDate: "۱۳۹۹/۰۳",
          endDate: "اکنون",
          description:
            "طراحی گرافیک برای برندهای مختلف، لوگو، پوستر و رابط کاربری اپلیکیشن‌ها و وب‌سایت‌ها.",
          achievements: ["طراحی ۱۰۰+ لوگو", "برنده ۵ جایزه طراحی"],
        },
      ],
      education: [
        {
          id: 1,
          degree: "کارشناسی هنر",
          institution: "دانشگاه هنر شیراز",
          location: "شیراز",
          graduationYear: "۱۳۹۹",
          gpa: "۱۷.۵ از ۲۰",
        },
      ],
      languages: [
        { name: "فارسی", level: "زبان مادری" },
        { name: "انگلیسی", level: "خوب" },
      ],
      portfolio: [
        {
          name: "نمونه کار طراحی",
          url: "https://example.com/portfolio/graphic-design",
        },
      ],
    },
    12: {
      id: 12,
      name: "مائده جعفری",
      position: "کارشناس امنیت",
      email: "maedeh.jafari@example.com",
      phone: "+۹۸ ۹۱۹ ۳۳۳ ۴۴۴۵",
      location: "کرمان، ایران",
      appliedDate: "۲ روز پیش",
      experienceYears: "۵",
      education: "کارشناسی امنیت اطلاعات",
      status: "shortlisted",
      score: 89,
      isPro: true,
      summary:
        "کارشناس امنیت سایبری با تجربه در penetration testing، امنیت وب و شبکه. متخصص در ابزارهای امنیتی و استانداردهای امنیتی.",
      skills: [
        "Penetration Testing",
        "Web Security",
        "Network Security",
        "Kali Linux",
        "Metasploit",
        "Burp Suite",
        "OWASP",
        "Firewalls",
        "SIEM",
        "Python",
      ],
      experience: [
        {
          id: 1,
          title: "کارشناس امنیت Senior",
          company: "شرکت امنیت سایبری کرمان",
          location: "کرمان",
          startDate: "۱۳۹۸/۱۱",
          endDate: "اکنون",
          description:
            "انجام penetration testing، ارزیابی امنیت وب اپلیکیشن‌ها و شبکه‌ها، آموزش امنیت به تیم‌های توسعه.",
          achievements: [
            "شناسایی ۲۰۰+ آسیب‌پذیری امنیتی",
            "بهبود امنیت ۵۰ شرکت",
            "آموزش ۱۰۰+ توسعه‌دهنده",
          ],
        },
      ],
      education: [
        {
          id: 1,
          degree: "کارشناسی امنیت اطلاعات",
          institution: "دانشگاه شهید باهنر کرمان",
          location: "کرمان",
          graduationYear: "۱۳۹۸",
          gpa: "۱۸.۲ از ۲۰",
        },
      ],
      certifications: [
        {
          id: 1,
          name: "CEH (Certified Ethical Hacker)",
          issuer: "EC-Council",
          issueDate: "۱۴۰۰/۰۵",
          credentialId: "CEH-2021-789",
        },
        {
          id: 2,
          name: "OSCP (Offensive Security Certified Professional)",
          issuer: "Offensive Security",
          issueDate: "۱۴۰۱/۰۳",
          credentialId: "OSCP-2022-456",
        },
      ],
      languages: [
        { name: "فارسی", level: "زبان مادری" },
        { name: "انگلیسی", level: "خیلی خوب" },
      ],
      portfolio: [
        {
          name: "گزارش‌های امنیتی",
          url: "https://example.com/portfolio/security-reports",
        },
      ],
    },
    13: {
      id: 13,
      name: "پارسا محمدی",
      position: "توسعه‌دهنده React",
      email: "parsa.mohammadi@example.com",
      phone: "+۹۸ ۹۲۰ ۵۵۵ ۶۶۶۷",
      location: "همدان، ایران",
      appliedDate: "۴ ساعت پیش",
      experienceYears: "۱",
      education: "کارشناسی مهندسی نرم‌افزار",
      status: "new",
      score: 74,
      isPro: false,
      summary:
        "توسعه‌دهنده Front-End جونیور با تمرکز بر React و JavaScript. علاقه‌مند به یادگیری و توسعه مهارت‌ها.",
      skills: [
        "React",
        "JavaScript",
        "HTML5",
        "CSS3",
        "Git",
        "Node.js",
        "Express.js",
        "MongoDB",
      ],
      experience: [
        {
          id: 1,
          title: "توسعه‌دهنده Front-End Junior",
          company: "شرکت فناوری همدان",
          location: "همدان",
          startDate: "۱۴۰۱/۰۳",
          endDate: "اکنون",
          description:
            "توسعه کامپوننت‌های React، کار با APIها و پیاده‌سازی رابط کاربری responsive.",
          achievements: [
            "توسعه ۳ اپلیکیشن React",
            "یادگیری سریع تکنولوژی‌های جدید",
          ],
        },
      ],
      education: [
        {
          id: 1,
          degree: "کارشناسی مهندسی نرم‌افزار",
          institution: "دانشگاه بوعلی سینا",
          location: "همدان",
          graduationYear: "۱۴۰۱",
          gpa: "۱۶.۵ از ۲۰",
        },
      ],
      languages: [
        { name: "فارسی", level: "زبان مادری" },
        { name: "انگلیسی", level: "متوسط" },
      ],
      portfolio: [
        {
          name: "پروژه‌های شخصی",
          url: "https://example.com/portfolio/personal-projects",
        },
      ],
    },
    14: {
      id: 14,
      name: "یاسمن احمدی",
      position: "تحلیلگر داده",
      email: "yasmin.ahmadi@example.com",
      phone: "+۹۸ ۹۲۱ ۷۷۷ ۸۸۸۹",
      location: "سنندج، ایران",
      appliedDate: "۳ روز پیش",
      experienceYears: "۶",
      education: "کارشناسی آمار و احتمال",
      status: "reviewed",
      score: 93,
      isPro: true,
      summary:
        "تحلیلگر داده Senior با تجربه گسترده در تحلیل داده‌های بزرگ، مدل‌سازی آماری و هوش مصنوعی. متخصص در Python و R.",
      skills: [
        "Python",
        "R",
        "SQL",
        "Tableau",
        "Power BI",
        "Machine Learning",
        "Deep Learning",
        "Pandas",
        "NumPy",
        "Scikit-learn",
        "TensorFlow",
      ],
      experience: [
        {
          id: 1,
          title: "تحلیلگر داده Senior",
          company: "شرکت داده‌کاوی سنندج",
          location: "سنندج",
          startDate: "۱۳۹۸/۰۵",
          endDate: "اکنون",
          description:
            "تحلیل داده‌های بزرگ مشتریان، ساخت مدل‌های پیش‌بینی و گزارش‌های مدیریتی. پیاده‌سازی مدل‌های یادگیری ماشین.",
          achievements: [
            "ساخت ۵۰ مدل پیش‌بینی",
            "افزایش دقت پیش‌بینی تا ۹۵%",
            "کاهش هزینه‌ها تا ۴۰%",
          ],
        },
      ],
      education: [
        {
          id: 1,
          degree: "کارشناسی آمار و احتمال",
          institution: "دانشگاه کردستان",
          location: "سنندج",
          graduationYear: "۱۳۹۸",
          gpa: "۱۸.۵ از ۲۰",
        },
        {
          id: 2,
          degree: "کارشناسی ارشد آمار",
          institution: "دانشگاه تربیت مدرس",
          location: "تهران",
          graduationYear: "۱۴۰۰",
          gpa: "۱۹ از ۲۰",
        },
      ],
      certifications: [
        {
          id: 1,
          name: "TensorFlow Developer Certificate",
          issuer: "Google",
          issueDate: "۱۴۰۱/۰۷",
          credentialId: "TF-DEV-2022-123",
        },
      ],
      languages: [
        { name: "فارسی", level: "زبان مادری" },
        { name: "انگلیسی", level: "خیلی خوب" },
        { name: "کردی", level: "زبان مادری" },
      ],
      portfolio: [
        {
          name: "پروژه‌های تحلیل داده",
          url: "https://example.com/portfolio/data-analysis",
        },
      ],
    },
    15: {
      id: 15,
      name: "کیانوش رضایی",
      position: "مدیر محصول دیجیتال",
      email: "kianoush.rezaei@example.com",
      phone: "+۹۸ ۹۲۲ ۹۹۹ ۰۰۰۱",
      location: "یزد، ایران",
      appliedDate: "۱ روز پیش",
      experienceYears: "۷",
      education: "کارشناسی MBA",
      status: "shortlisted",
      score: 96,
      isPro: true,
      summary:
        "مدیر محصول دیجیتال با تجربه ۷ ساله در مدیریت محصول، استراتژی دیجیتال و رهبری تیم‌های محصول. متخصص در رشد محصول و تجربه کاربری.",
      skills: [
        "Product Management",
        "Product Strategy",
        "Agile/Scrum",
        "User Research",
        "Data Analysis",
        "A/B Testing",
        "Roadmapping",
        "Stakeholder Management",
        "SQL",
        "Google Analytics",
      ],
      experience: [
        {
          id: 1,
          title: "مدیر محصول دیجیتال Senior",
          company: "شرکت تجارت الکترونیک یزد",
          location: "یزد",
          startDate: "۱۳۹۸/۰۲",
          endDate: "اکنون",
          description:
            "مدیریت محصول پلتفرم‌های دیجیتال بزرگ، تعریف استراتژی محصول و رهبری تیم‌های چندگانه توسعه و طراحی.",
          achievements: [
            "افزایش درآمد تا ۵۰۰%",
            "راه‌اندازی ۱۰ محصول جدید موفق",
            "مدیریت تیم ۵۰ نفره",
          ],
        },
      ],
      education: [
        {
          id: 1,
          degree: "کارشناسی ارشد MBA",
          institution: "دانشگاه یزد",
          location: "یزد",
          graduationYear: "۱۳۹۸",
          gpa: "۱۸.۸ از ۲۰",
        },
      ],
      certifications: [
        {
          id: 1,
          name: "Certified Scrum Product Owner",
          issuer: "Scrum Alliance",
          issueDate: "۱۴۰۰/۰۹",
          credentialId: "CSPO-2021-789",
        },
        {
          id: 2,
          name: "Product Management Professional",
          issuer: "Pragmatic Institute",
          issueDate: "۱۴۰۱/۱۱",
          credentialId: "PMP-2022-456",
        },
      ],
      languages: [
        { name: "فارسی", level: "زبان مادری" },
        { name: "انگلیسی", level: "خیلی خوب" },
      ],
      portfolio: [
        {
          name: "مطالعات موردی محصول",
          url: "https://example.com/portfolio/product-cases",
        },
      ],
    },
    16: {
      id: 16,
      name: "نیلوفر کرمی",
      position: "طراح UX/UI",
      email: "niloufar.karami@example.com",
      phone: "+۹۸ ۹۲۳ ۱۱۱ ۲۲۲۳",
      location: "اردبیل، ایران",
      appliedDate: "۵ روز پیش",
      experienceYears: "۲",
      education: "کارشناسی طراحی گرافیک",
      status: "new",
      score: 77,
      isPro: false,
      summary:
        "طراح UX/UI جونیور با تمرکز بر طراحی تجربه کاربری و رابط کاربری مدرن. علاقه‌مند به یادگیری و بهبود مهارت‌های طراحی.",
      skills: [
        "Figma",
        "Adobe XD",
        "Sketch",
        "Photoshop",
        "User Research",
        "Wireframing",
        "Prototyping",
        "Usability Testing",
      ],
      experience: [
        {
          id: 1,
          title: "طراح UX/UI",
          company: "آژانس دیجیتال اردبیل",
          location: "اردبیل",
          startDate: "۱۴۰۰/۰۹",
          endDate: "اکنون",
          description:
            "طراحی رابط کاربری وب‌سایت‌ها و اپلیکیشن‌های موبایل. انجام تحقیقات کاربر و تست قابلیت استفاده.",
          achievements: ["طراحی ۲۰ رابط کاربری", "بهبود نرخ تبدیل تا ۲۵%"],
        },
      ],
      education: [
        {
          id: 1,
          degree: "کارشناسی طراحی گرافیک",
          institution: "دانشگاه محقق اردبیلی",
          location: "اردبیل",
          graduationYear: "۱۴۰۰",
          gpa: "۱۷.۰ از ۲۰",
        },
      ],
      languages: [
        { name: "فارسی", level: "زبان مادری" },
        { name: "انگلیسی", level: "متوسط" },
      ],
      portfolio: [
        {
          name: "نمونه کار طراحی UI/UX",
          url: "https://example.com/portfolio/uiux-design",
        },
      ],
    },
    17: {
      id: 17,
      name: "امیر محمدزاده",
      position: "توسعه‌دهنده Node.js",
      email: "amir.mohammadzadeh@example.com",
      phone: "+۹۸ ۹۲۴ ۳۳۳ ۴۴۴۵",
      location: "بوشهر، ایران",
      appliedDate: "۲ ساعت پیش",
      experienceYears: "۴",
      education: "کارشناسی کامپیوتر",
      status: "reviewed",
      score: 84,
      isPro: false,
      summary:
        "توسعه‌دهنده Back-End با تجربه در Node.js، Express و MongoDB. متخصص در ساخت APIهای scalable و میکروسرویس‌ها.",
      skills: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "PostgreSQL",
        "Redis",
        "Docker",
        "REST APIs",
        "GraphQL",
        "Socket.io",
        "JWT",
      ],
      experience: [
        {
          id: 1,
          title: "توسعه‌دهنده Back-End",
          company: "شرکت فناوری بوشهر",
          location: "بوشهر",
          startDate: "۱۳۹۹/۰۷",
          endDate: "اکنون",
          description:
            "توسعه APIهای RESTful و GraphQL با Node.js. کار با MongoDB و PostgreSQL برای ذخیره‌سازی داده‌ها.",
          achievements: ["توسعه ۱۵ API مختلف", "بهبود عملکرد تا ۵۰%"],
        },
      ],
      education: [
        {
          id: 1,
          degree: "کارشناسی کامپیوتر",
          institution: "دانشگاه خلیج فارس",
          location: "بوشهر",
          graduationYear: "۱۳۹۹",
          gpa: "۱۷.۳ از ۲۰",
        },
      ],
      languages: [
        { name: "فارسی", level: "زبان مادری" },
        { name: "انگلیسی", level: "خوب" },
      ],
      portfolio: [
        {
          name: "API پلتفرم آموزشی",
          url: "https://example.com/portfolio/node-api",
        },
      ],
    },
    18: {
      id: 18,
      name: "سپیده زمانی",
      position: "کارشناس DevOps",
      email: "sepideh.zamani@example.com",
      phone: "+۹۸ ۹۲۵ ۵۵۵ ۶۶۶۷",
      location: "ایلام، ایران",
      appliedDate: "۴ روز پیش",
      experienceYears: "۳",
      education: "کارشناسی مهندسی کامپیوتر",
      status: "shortlisted",
      score: 88,
      isPro: false,
      summary:
        "کارشناس DevOps با تجربه در اتوماسیون، CI/CD و مدیریت زیرساخت ابری. متخصص در AWS و Docker.",
      skills: [
        "AWS",
        "Docker",
        "Kubernetes",
        "Jenkins",
        "GitLab CI",
        "Terraform",
        "Linux",
        "Python",
        "Bash",
        "Monitoring",
      ],
      experience: [
        {
          id: 1,
          title: "کارشناس DevOps",
          company: "شرکت ابری ایلام",
          location: "ایلام",
          startDate: "۱۳۹۹/۱۰",
          endDate: "اکنون",
          description:
            "مدیریت زیرساخت AWS، پیاده‌سازی pipelineهای CI/CD و اتوماسیون فرآیندهای DevOps.",
          achievements: [
            "کاهش deployment time تا ۸۰%",
            "افزایش uptime تا ۹۹.۹%",
          ],
        },
      ],
      education: [
        {
          id: 1,
          degree: "کارشناسی مهندسی کامپیوتر",
          institution: "دانشگاه ایلام",
          location: "ایلام",
          graduationYear: "۱۳۹۹",
          gpa: "۱۷.۱ از ۲۰",
        },
      ],
      certifications: [
        {
          id: 1,
          name: "AWS Developer Associate",
          issuer: "Amazon Web Services",
          issueDate: "۱۴۰۱/۰۴",
          credentialId: "AWS-DA-2022-789",
        },
      ],
      languages: [
        { name: "فارسی", level: "زبان مادری" },
        { name: "انگلیسی", level: "خوب" },
      ],
      portfolio: [
        {
          name: "پروژه‌های DevOps",
          url: "https://example.com/portfolio/devops-projects",
        },
      ],
    },
    19: {
      id: 19,
      name: "بهرام علوی",
      position: "توسعه‌دهنده Python",
      email: "bahram.alavi@example.com",
      phone: "+۹۸ ۹۲۶ ۷۷۷ ۸۸۸۹",
      location: "زنجان، ایران",
      appliedDate: "۱ روز پیش",
      experienceYears: "۵",
      education: "کارشناسی علوم کامپیوتر",
      status: "reviewed",
      score: 86,
      isPro: true,
      summary:
        "توسعه‌دهنده Python Senior با تجربه در Django، Flask و Data Science. متخصص در توسعه وب و تحلیل داده.",
      skills: [
        "Python",
        "Django",
        "Flask",
        "FastAPI",
        "PostgreSQL",
        "Redis",
        "Pandas",
        "NumPy",
        "Machine Learning",
        "Docker",
      ],
      experience: [
        {
          id: 1,
          title: "توسعه‌دهنده Python Senior",
          company: "شرکت نرم‌افزاری زنجان",
          location: "زنجان",
          startDate: "۱۳۹۸/۰۸",
          endDate: "اکنون",
          description:
            "توسعه وب اپلیکیشن‌های پیچیده با Django و FastAPI. پیاده‌سازی مدل‌های یادگیری ماشین و تحلیل داده.",
          achievements: [
            "توسعه ۲۰ وب اپلیکیشن",
            "پیاده‌سازی ۱۰ مدل ML",
            "مدیریت تیم ۴ نفره",
          ],
        },
      ],
      education: [
        {
          id: 1,
          degree: "کارشناسی علوم کامپیوتر",
          institution: "دانشگاه زنجان",
          location: "زنجان",
          graduationYear: "۱۳۹۸",
          gpa: "۱۷.۹ از ۲۰",
        },
      ],
      certifications: [
        {
          id: 1,
          name: "Python Data Science Certificate",
          issuer: "IBM",
          issueDate: "۱۴۰۰/۱۲",
          credentialId: "IBM-DS-2021-456",
        },
      ],
      languages: [
        { name: "فارسی", level: "زبان مادری" },
        { name: "انگلیسی", level: "خوب" },
      ],
      portfolio: [
        {
          name: "پروژه‌های Python",
          url: "https://example.com/portfolio/python-projects",
        },
      ],
    },
    20: {
      id: 20,
      name: "ملیکا حسینی",
      position: "توسعه‌دهنده React Native",
      email: "melika.hosseini@example.com",
      phone: "+۹۸ ۹۲۷ ۹۹۹ ۰۰۰۱",
      location: "قزوین، ایران",
      appliedDate: "۳ روز پیش",
      experienceYears: "۲",
      education: "کارشناسی مهندسی برق",
      status: "new",
      score: 75,
      isPro: false,
      summary:
        "توسعه‌دهنده React Native با تجربه در ساخت اپلیکیشن‌های موبایل cross-platform. متخصص در React Native و Firebase.",
      skills: [
        "React Native",
        "JavaScript",
        "TypeScript",
        "Firebase",
        "Expo",
        "Redux",
        "Android Studio",
        "Xcode",
        "REST APIs",
      ],
      experience: [
        {
          id: 1,
          title: "توسعه‌دهنده Mobile",
          company: "استارتاپ قزوین",
          location: "قزوین",
          startDate: "۱۴۰۰/۱۱",
          endDate: "اکنون",
          description:
            "توسعه اپلیکیشن‌های موبایل با React Native برای iOS و Android. پیاده‌سازی ویژگی‌های جدید و رفع باگ‌ها.",
          achievements: ["انتشار ۳ اپلیکیشن", "افزایش امتیاز استور"],
        },
      ],
      education: [
        {
          id: 1,
          degree: "کارشناسی مهندسی برق",
          institution: "دانشگاه بابل",
          location: "بابل",
          graduationYear: "۱۴۰۰",
          gpa: "۱۶.۷ از ۲۰",
        },
      ],
      languages: [
        { name: "فارسی", level: "زبان مادری" },
        { name: "انگلیسی", level: "متوسط" },
      ],
      portfolio: [
        {
          name: "اپلیکیشن موبایل",
          url: "https://example.com/portfolio/mobile-app",
        },
      ],
    },
    21: {
      id: 21,
      name: "فرهاد شریفی",
      position: "توسعه‌دهنده React",
      email: "farhad.sharifi@example.com",
      phone: "+۹۸ ۹۲۸ ۱۱۱ ۲۲۲۳",
      location: "ساری، ایران",
      appliedDate: "۶ ساعت پیش",
      experienceYears: "۳",
      education: "کارشناسی مهندسی نرم‌افزار",
      status: "reviewed",
      score: 83,
      isPro: false,
      summary:
        "توسعه‌دهنده Front-End با تجربه در React، Next.js و TypeScript. متخصص در ساخت رابط کاربری مدرن و responsive.",
      skills: [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "Redux",
        "Git",
        "Node.js",
      ],
      experience: [
        {
          id: 1,
          title: "توسعه‌دهنده Front-End",
          company: "شرکت دیجیتال ساری",
          location: "ساری",
          startDate: "۱۳۹۹/۱۲",
          endDate: "اکنون",
          description:
            "توسعه رابط کاربری وب اپلیکیشن‌ها با React و Next.js. همکاری با تیم طراحی برای بهبود UX.",
          achievements: ["توسعه ۱۰ وب اپلیکیشن", "بهبود عملکرد تا ۴۰%"],
        },
      ],
      education: [
        {
          id: 1,
          degree: "کارشناسی مهندسی نرم‌افزار",
          institution: "دانشگاه مازندران",
          location: "بابلسر",
          graduationYear: "۱۳۹۹",
          gpa: "۱۷.۴ از ۲۰",
        },
      ],
      languages: [
        { name: "فارسی", level: "زبان مادری" },
        { name: "انگلیسی", level: "خوب" },
      ],
      portfolio: [
        {
          name: "پروژه‌های React",
          url: "https://example.com/portfolio/react-projects",
        },
      ],
    },
    22: {
      id: 22,
      name: "شادی علیزاده",
      position: "طراح UX/UI",
      email: "shadi.alizadeh@example.com",
      phone: "+۹۸ ۹۲۹ ۳۳۳ ۴۴۴۵",
      location: "گرگان، ایران",
      appliedDate: "۲ روز پیش",
      experienceYears: "۴",
      education: "کارشناسی طراحی گرافیک",
      status: "shortlisted",
      score: 90,
      isPro: true,
      summary:
        "طراح UX/UI با تجربه در طراحی رابط کاربری موبایل و وب. متخصص در تحقیقات کاربر و تست قابلیت استفاده.",
      skills: [
        "Figma",
        "Adobe XD",
        "Sketch",
        "Photoshop",
        "Illustrator",
        "User Research",
        "Usability Testing",
        "Wireframing",
        "Prototyping",
        "Design Systems",
      ],
      experience: [
        {
          id: 1,
          title: "طراح UX/UI Senior",
          company: "آژانس دیجیتال گرگان",
          location: "گرگان",
          startDate: "۱۳۹۹/۰۱",
          endDate: "اکنون",
          description:
            "طراحی تجربه کاربری و رابط کاربری برای اپلیکیشن‌ها و وب‌سایت‌های بزرگ. انجام تحقیقات کاربر و تست قابلیت استفاده.",
          achievements: [
            "طراحی ۳۰ رابط کاربری",
            "افزایش نرخ تبدیل تا ۳۵%",
            "برنده ۳ جایزه طراحی",
          ],
        },
      ],
      education: [
        {
          id: 1,
          degree: "کارشناسی طراحی گرافیک",
          institution: "دانشگاه گلستان",
          location: "گرگان",
          graduationYear: "۱۳۹۹",
          gpa: "۱۷.۶ از ۲۰",
        },
      ],
      certifications: [
        {
          id: 1,
          name: "Google UX Design Certificate",
          issuer: "Google",
          issueDate: "۱۴۰۱/۰۶",
          credentialId: "GOOGLE-UX-2022-789",
        },
      ],
      languages: [
        { name: "فارسی", level: "زبان مادری" },
        { name: "انگلیسی", level: "خوب" },
      ],
      portfolio: [
        {
          name: "نمونه کار طراحی",
          url: "https://example.com/portfolio/design-portfolio",
        },
      ],
    },
    23: {
      id: 23,
      name: "رامین کریمی",
      position: "تحلیلگر داده",
      email: "ramin.karimi@example.com",
      phone: "+۹۸ ۹۳۰ ۵۵۵ ۶۶۶۷",
      location: "نوشهر، ایران",
      appliedDate: "۴ روز پیش",
      experienceYears: "۶",
      education: "کارشناسی آمار و احتمال",
      status: "reviewed",
      score: 91,
      isPro: true,
      summary:
        "تحلیلگر داده Senior با تخصص در تحلیل داده‌های بزرگ، مدل‌سازی آماری و BI. متخصص در SQL، Python و Tableau.",
      skills: [
        "SQL",
        "Python",
        "Tableau",
        "Power BI",
        "Excel",
        "Statistical Analysis",
        "Data Visualization",
        "Pandas",
        "NumPy",
        "Machine Learning",
      ],
      experience: [
        {
          id: 1,
          title: "تحلیلگر داده Senior",
          company: "شرکت داده‌پرداز نوشهر",
          location: "نوشهر",
          startDate: "۱۳۹۸/۰۴",
          endDate: "اکنون",
          description:
            "تحلیل داده‌های مشتریان بزرگ، ساخت داشبوردهای تحلیلی و گزارش‌های مدیریتی. پیاده‌سازی مدل‌های پیش‌بینی.",
          achievements: [
            "ساخت ۴۰ داشبورد",
            "افزایش بهره‌وری تا ۶۰%",
            "کاهش هزینه‌ها تا ۲۵%",
          ],
        },
      ],
      education: [
        {
          id: 1,
          degree: "کارشناسی آمار و احتمال",
          institution: "دانشگاه مازندران",
          location: "بابلسر",
          graduationYear: "۱۳۹۸",
          gpa: "۱۸.۱ از ۲۰",
        },
      ],
      certifications: [
        {
          id: 1,
          name: "Tableau Desktop Specialist",
          issuer: "Tableau",
          issueDate: "۱۴۰۰/۱۱",
          credentialId: "TABLEAU-DS-2021-123",
        },
      ],
      languages: [
        { name: "فارسی", level: "زبان مادری" },
        { name: "انگلیسی", level: "خیلی خوب" },
      ],
      portfolio: [
        {
          name: "نمونه داشبوردها",
          url: "https://example.com/portfolio/dashboards",
        },
      ],
    },
    24: {
      id: 24,
      name: "نسیم رضایی",
      position: "مدیر محصول دیجیتال",
      email: "nasim.rezaei@example.com",
      phone: "+۹۸ ۹۳۱ ۷۷۷ ۸۸۸۹",
      location: "آمل، ایران",
      appliedDate: "۱ روز پیش",
      experienceYears: "۵",
      education: "کارشناسی MBA",
      status: "new",
      score: 87,
      isPro: false,
      summary:
        "مدیر محصول دیجیتال با تجربه در استراتژی محصول، تحلیل داده‌ها و رهبری تیم‌های توسعه. متخصص در محصول‌های SaaS.",
      skills: [
        "Product Management",
        "Product Strategy",
        "Agile",
        "Data Analysis",
        "User Research",
        "SQL",
        "Google Analytics",
        "A/B Testing",
        "Roadmapping",
        "Stakeholder Management",
      ],
      experience: [
        {
          id: 1,
          title: "مدیر محصول دیجیتال",
          company: "پلتفرم SaaS آمل",
          location: "آمل",
          startDate: "۱۳۹۹/۰۶",
          endDate: "اکنون",
          description:
            "مدیریت محصول پلتفرم SaaS، تعریف استراتژی محصول و همکاری با تیم‌های فنی و بازاریابی.",
          achievements: [
            "افزایش MRR تا ۲۰۰%",
            "راه‌اندازی ۸ محصول جدید",
            "کاهش churn rate تا ۵۰%",
          ],
        },
      ],
      education: [
        {
          id: 1,
          degree: "کارشناسی ارشد MBA",
          institution: "دانشگاه تهران",
          location: "تهران",
          graduationYear: "۱۳۹۹",
          gpa: "۱۷.۹ از ۲۰",
        },
      ],
      languages: [
        { name: "فارسی", level: "زبان مادری" },
        { name: "انگلیسی", level: "خوب" },
      ],
      portfolio: [
        {
          name: "مطالعات موردی محصول",
          url: "https://example.com/portfolio/product-management",
        },
      ],
    },
    25: {
      id: 25,
      name: "سامان جعفری",
      position: "کارشناس DevOps",
      email: "saman.jafari@example.com",
      phone: "+۹۸ ۹۳۲ ۹۹۹ ۰۰۰۱",
      location: "بهشهر، ایران",
      appliedDate: "۳ روز پیش",
      experienceYears: "۴",
      education: "کارشناسی مهندسی کامپیوتر",
      status: "shortlisted",
      score: 89,
      isPro: true,
      summary:
        "کارشناس DevOps با تجربه در اتوماسیون، containerization و cloud computing. متخصص در AWS، Docker و Kubernetes.",
      skills: [
        "AWS",
        "Docker",
        "Kubernetes",
        "Jenkins",
        "GitLab CI",
        "Terraform",
        "Ansible",
        "Linux",
        "Python",
        "Bash",
        "Monitoring",
      ],
      experience: [
        {
          id: 1,
          title: "کارشناس DevOps Senior",
          company: "شرکت فناوری بهشهر",
          location: "بهشهر",
          startDate: "۱۳۹۹/۰۹",
          endDate: "اکنون",
          description:
            "مدیریت زیرساخت ابری AWS، پیاده‌سازی CI/CD pipelines و اتوماسیون فرآیندهای DevOps. نگهداری سیستم‌های production.",
          achievements: [
            "کاهش deployment time تا ۹۰%",
            "افزایش availability تا ۹۹.۹%",
            "کاهش هزینه‌های ابری تا ۴۰%",
          ],
        },
      ],
      education: [
        {
          id: 1,
          degree: "کارشناسی مهندسی کامپیوتر",
          institution: "دانشگاه مازندران",
          location: "بابلسر",
          graduationYear: "۱۳۹۹",
          gpa: "۱۷.۷ از ۲۰",
        },
      ],
      certifications: [
        {
          id: 1,
          name: "AWS Solutions Architect Associate",
          issuer: "Amazon Web Services",
          issueDate: "۱۴۰۱/۰۲",
          credentialId: "AWS-SAA-2022-456",
        },
        {
          id: 2,
          name: "Certified Kubernetes Administrator",
          issuer: "CNCF",
          issueDate: "۱۴۰۰/۱۰",
          credentialId: "CNCF-CKA-2021-789",
        },
      ],
      languages: [
        { name: "فارسی", level: "زبان مادری" },
        { name: "انگلیسی", level: "خوب" },
      ],
      portfolio: [
        {
          name: "پروژه‌های DevOps",
          url: "https://example.com/portfolio/devops-projects",
        },
      ],
    },
    26: {
      id: 26,
      name: "الهام محمدی",
      position: "توسعه‌دهنده Vue.js",
      email: "elham.mohammadi@example.com",
      phone: "+۹۸ ۹۳۳ ۱۱۱ ۲۲۲۳",
      location: "کرمانشاه، ایران",
      appliedDate: "۵ روز پیش",
      experienceYears: "۲",
      education: "کارشناسی مهندسی نرم‌افزار",
      status: "new",
      score: 73,
      isPro: false,
      summary:
        "توسعه‌دهنده Front-End با تمرکز بر Vue.js و Nuxt.js. علاقه‌مند به یادگیری و توسعه مهارت‌ها در زمینه توسعه وب مدرن.",
      skills: [
        "Vue.js",
        "Nuxt.js",
        "JavaScript",
        "TypeScript",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "Vuex",
        "Pinia",
        "Git",
      ],
      experience: [
        {
          id: 1,
          title: "توسعه‌دهنده Front-End Junior",
          company: "شرکت فناوری کرمانشاه",
          location: "کرمانشاه",
          startDate: "۱۴۰۱/۰۵",
          endDate: "اکنون",
          description:
            "توسعه رابط کاربری اپلیکیشن‌های Vue.js و پیاده‌سازی کامپوننت‌های responsive. همکاری با تیم طراحی.",
          achievements: [
            "توسعه ۴ اپلیکیشن Vue.js",
            "یادگیری سریع تکنولوژی‌های جدید",
          ],
        },
      ],
      education: [
        {
          id: 1,
          degree: "کارشناسی مهندسی نرم‌افزار",
          institution: "دانشگاه رازی کرمانشاه",
          location: "کرمانشاه",
          graduationYear: "۱۴۰۱",
          gpa: "۱۶.۵ از ۲۰",
        },
      ],
      languages: [
        { name: "فارسی", level: "زبان مادری" },
        { name: "انگلیسی", level: "متوسط" },
      ],
      portfolio: [
        {
          name: "پروژه‌های شخصی",
          url: "https://example.com/portfolio/personal-vue",
        },
      ],
    },
    27: {
      id: 27,
      name: "آرمان احمدی",
      position: "توسعه‌دهنده PHP",
      email: "arman.ahmadi@example.com",
      phone: "+۹۸ ۹۳۴ ۳۳۳ ۴۴۴۵",
      location: "همدان، ایران",
      appliedDate: "۲ ساعت پیش",
      experienceYears: "۳",
      education: "کارشناسی کامپیوتر",
      status: "reviewed",
      score: 80,
      isPro: false,
      summary:
        "توسعه‌دهنده PHP با تجربه در Laravel و توسعه وب اپلیکیشن‌های MVC. متخصص در توسعه back-end و APIهای RESTful.",
      skills: [
        "PHP",
        "Laravel",
        "CodeIgniter",
        "MySQL",
        "JavaScript",
        "jQuery",
        "HTML5",
        "CSS3",
        "Git",
        "Composer",
      ],
      experience: [
        {
          id: 1,
          title: "توسعه‌دهنده PHP",
          company: "آژانس دیجیتال همدان",
          location: "همدان",
          startDate: "۱۳۹۹/۰۹",
          endDate: "اکنون",
          description:
            "توسعه وب اپلیکیشن‌های PHP با استفاده از Laravel. پیاده‌سازی APIهای RESTful و کار با MySQL.",
          achievements: ["توسعه ۶ وب اپلیکیشن", "بهبود امنیت اپلیکیشن‌ها"],
        },
      ],
      education: [
        {
          id: 1,
          degree: "کارشناسی کامپیوتر",
          institution: "دانشگاه بوعلی سینا",
          location: "همدان",
          graduationYear: "۱۳۹۹",
          gpa: "۱۷.۴ از ۲۰",
        },
      ],
      languages: [
        { name: "فارسی", level: "زبان مادری" },
        { name: "انگلیسی", level: "خوب" },
      ],
      portfolio: [
        {
          name: "سیستم مدیریت محتوا",
          url: "https://example.com/portfolio/php-cms-2",
        },
      ],
    },
    28: {
      id: 28,
      name: "مژگان رضایی",
      position: "طراح گرافیک",
      email: "mojgan.rezaei@example.com",
      phone: "+۹۸ ۹۳۵ ۵۵۵ ۶۶۶۷",
      location: "زنجان، ایران",
      appliedDate: "۴ ساعت پیش",
      experienceYears: "۵",
      education: "کارشناسی هنر",
      status: "new",
      score: 79,
      isPro: false,
      summary:
        "طراح گرافیک با تجربه در برندینگ، طراحی لوگو و رابط کاربری. متخصص در Adobe Creative Suite و ابزارهای طراحی مدرن.",
      skills: [
        "Photoshop",
        "Illustrator",
        "InDesign",
        "Figma",
        "Sketch",
        "After Effects",
        "Premiere Pro",
        "Typography",
        "Branding",
        "UI Design",
      ],
      experience: [
        {
          id: 1,
          title: "طراح گرافیک Senior",
          company: "آژانس تبلیغات زنجان",
          location: "زنجان",
          startDate: "۱۳۹۹/۰۳",
          endDate: "اکنون",
          description:
            "طراحی گرافیک برای برندهای مختلف، لوگو، پوستر و رابط کاربری اپلیکیشن‌ها و وب‌سایت‌ها.",
          achievements: ["طراحی ۸۰+ لوگو", "برنده ۴ جایزه طراحی"],
        },
      ],
      education: [
        {
          id: 1,
          degree: "کارشناسی هنر",
          institution: "دانشگاه زنجان",
          location: "زنجان",
          graduationYear: "۱۳۹۹",
          gpa: "۱۷.۶ از ۲۰",
        },
      ],
      languages: [
        { name: "فارسی", level: "زبان مادری" },
        { name: "انگلیسی", level: "خوب" },
      ],
      portfolio: [
        {
          name: "نمونه کار طراحی گرافیک",
          url: "https://example.com/portfolio/graphic-design-2",
        },
      ],
    },
    29: {
      id: 29,
      name: "پویا کرمی",
      position: "کارشناس امنیت",
      email: "pouya.karami@example.com",
      phone: "+۹۸ ۹۳۶ ۷۷۷ ۸۸۸۹",
      location: "قزوین، ایران",
      appliedDate: "۱ روز پیش",
      experienceYears: "۶",
      education: "کارشناسی امنیت اطلاعات",
      status: "shortlisted",
      score: 92,
      isPro: true,
      summary:
        "کارشناس امنیت سایبری با تجربه گسترده در penetration testing، امنیت وب و شبکه. متخصص در ابزارهای امنیتی پیشرفته.",
      skills: [
        "Penetration Testing",
        "Web Security",
        "Network Security",
        "Kali Linux",
        "Metasploit",
        "Burp Suite",
        "OWASP",
        "Firewalls",
        "SIEM",
        "Python",
      ],
      experience: [
        {
          id: 1,
          title: "کارشناس امنیت Senior",
          company: "شرکت امنیت سایبری قزوین",
          location: "قزوین",
          startDate: "۱۳۹۸/۱۱",
          endDate: "اکنون",
          description:
            "انجام penetration testing، ارزیابی امنیت وب اپلیکیشن‌ها و شبکه‌ها، آموزش امنیت به تیم‌های توسعه.",
          achievements: [
            "شناسایی ۱۵۰+ آسیب‌پذیری امنیتی",
            "بهبود امنیت ۴۰ شرکت",
            "آموزش ۸۰+ توسعه‌دهنده",
          ],
        },
      ],
      education: [
        {
          id: 1,
          degree: "کارشناسی امنیت اطلاعات",
          institution: "دانشگاه بابل",
          location: "بابل",
          graduationYear: "۱۳۹۸",
          gpa: "۱۸.۳ از ۲۰",
        },
      ],
      certifications: [
        {
          id: 1,
          name: "CEH (Certified Ethical Hacker)",
          issuer: "EC-Council",
          issueDate: "۱۴۰۰/۰۵",
          credentialId: "CEH-2021-890",
        },
        {
          id: 2,
          name: "OSCP (Offensive Security Certified Professional)",
          issuer: "Offensive Security",
          issueDate: "۱۴۰۱/۰۳",
          credentialId: "OSCP-2022-567",
        },
      ],
      languages: [
        { name: "فارسی", level: "زبان مادری" },
        { name: "انگلیسی", level: "خیلی خوب" },
      ],
      portfolio: [
        {
          name: "گزارش‌های امنیتی پیشرفته",
          url: "https://example.com/portfolio/security-reports-2",
        },
      ],
    },
    30: {
      id: 30,
      name: "آزاده زمانی",
      position: "توسعه‌دهنده React",
      email: "azadeh.zamani@example.com",
      phone: "+۹۸ ۹۳۷ ۹۹۹ ۰۰۰۱",
      location: "ساری، ایران",
      appliedDate: "۲ روز پیش",
      experienceYears: "۱",
      education: "کارشناسی مهندسی نرم‌افزار",
      status: "new",
      score: 72,
      isPro: false,
      summary:
        "توسعه‌دهنده Front-End جونیور با تمرکز بر React و JavaScript. علاقه‌مند به یادگیری و رشد در زمینه توسعه وب.",
      skills: [
        "React",
        "JavaScript",
        "HTML5",
        "CSS3",
        "Git",
        "Node.js",
        "Express.js",
        "MongoDB",
      ],
      experience: [
        {
          id: 1,
          title: "توسعه‌دهنده Front-End Junior",
          company: "استارتاپ فناوری ساری",
          location: "ساری",
          startDate: "۱۴۰۱/۰۳",
          endDate: "اکنون",
          description:
            "توسعه کامپوننت‌های React، کار با APIها و پیاده‌سازی رابط کاربری responsive.",
          achievements: [
            "توسعه ۲ اپلیکیشن React",
            "یادگیری سریع تکنولوژی‌های جدید",
          ],
        },
      ],
      education: [
        {
          id: 1,
          degree: "کارشناسی مهندسی نرم‌افزار",
          institution: "دانشگاه مازندران",
          location: "بابلسر",
          graduationYear: "۱۴۰۱",
          gpa: "۱۶.۲ از ۲۰",
        },
      ],
      languages: [
        { name: "فارسی", level: "زبان مادری" },
        { name: "انگلیسی", level: "متوسط" },
      ],
      portfolio: [
        {
          name: "پروژه‌های شخصی React",
          url: "https://example.com/portfolio/personal-react",
        },
      ],
    },
    31: {
      id: 31,
      name: "بهنام علوی",
      position: "تحلیلگر داده",
      email: "behnam.alavi@example.com",
      phone: "+۹۸ ۹۳۸ ۱۱۱ ۲۲۲۳",
      location: "گرگان، ایران",
      appliedDate: "۳ روز پیش",
      experienceYears: "۴",
      education: "کارشناسی آمار و احتمال",
      status: "reviewed",
      score: 85,
      isPro: false,
      summary:
        "تحلیلگر داده با تجربه در تحلیل داده‌ها، ساخت مدل‌های آماری و گزارش‌گیری مدیریتی. متخصص در Python و SQL.",
      skills: [
        "Python",
        "SQL",
        "Tableau",
        "Power BI",
        "Excel",
        "Pandas",
        "NumPy",
        "Scikit-learn",
        "Statistical Analysis",
        "Data Visualization",
      ],
      experience: [
        {
          id: 1,
          title: "تحلیلگر داده",
          company: "شرکت داده‌پرداز گرگان",
          location: "گرگان",
          startDate: "۱۳۹۹/۰۲",
          endDate: "اکنون",
          description:
            "تحلیل داده‌های مشتریان، ساخت مدل‌های پیش‌بینی و گزارش‌های مدیریتی. همکاری با تیم‌های مختلف.",
          achievements: [
            "ساخت ۱۰ داشبورد تحلیلی",
            "بهبود دقت پیش‌بینی تا ۸۰%",
            "کاهش هزینه‌ها تا ۱۸%",
          ],
        },
      ],
      education: [
        {
          id: 1,
          degree: "کارشناسی آمار و احتمال",
          institution: "دانشگاه گلستان",
          location: "گرگان",
          graduationYear: "۱۳۹۹",
          gpa: "۱۷.۱ از ۲۰",
        },
      ],
      languages: [
        { name: "فارسی", level: "زبان مادری" },
        { name: "انگلیسی", level: "خوب" },
      ],
      portfolio: [
        {
          name: "نمونه داشبوردها",
          url: "https://example.com/portfolio/dashboards-2",
        },
      ],
    },
    32: {
      id: 32,
      name: "مینا حسینی",
      position: "مدیر محصول دیجیتال",
      email: "mina.hosseini@example.com",
      phone: "+۹۸ ۹۳۹ ۳۳۳ ۴۴۴۵",
      location: "نوشهر، ایران",
      appliedDate: "۵ روز پیش",
      experienceYears: "۷",
      education: "کارشناسی MBA",
      status: "shortlisted",
      score: 94,
      isPro: true,
      summary:
        "مدیر محصول دیجیتال با تجربه ۷ ساله در مدیریت محصول، استراتژی دیجیتال و رهبری تیم‌ها. متخصص در محصول‌های B2B.",
      skills: [
        "Product Management",
        "Product Strategy",
        "Agile/Scrum",
        "User Research",
        "Data Analysis",
        "A/B Testing",
        "Roadmapping",
        "Stakeholder Management",
        "SQL",
        "Google Analytics",
      ],
      experience: [
        {
          id: 1,
          title: "مدیر محصول دیجیتال Senior",
          company: "پلتفرم B2B نوشهر",
          location: "نوشهر",
          startDate: "۱۳۹۸/۰۲",
          endDate: "اکنون",
          description:
            "مدیریت محصول پلتفرم‌های B2B بزرگ، تعریف استراتژی محصول و رهبری تیم‌های چندگانه توسعه و طراحی.",
          achievements: [
            "افزایش MRR تا ۴۰۰%",
            "راه‌اندازی ۶ محصول جدید موفق",
            "مدیریت تیم ۴۰ نفره",
          ],
        },
      ],
      education: [
        {
          id: 1,
          degree: "کارشناسی ارشد MBA",
          institution: "دانشگاه تهران",
          location: "تهران",
          graduationYear: "۱۳۹۸",
          gpa: "۱۸.۹ از ۲۰",
        },
      ],
      certifications: [
        {
          id: 1,
          name: "Certified Scrum Product Owner",
          issuer: "Scrum Alliance",
          issueDate: "۱۴۰۰/۰۹",
          credentialId: "CSPO-2021-890",
        },
        {
          id: 2,
          name: "Product Management Professional",
          issuer: "Pragmatic Institute",
          issueDate: "۱۴۰۱/۱۱",
          credentialId: "PMP-2022-567",
        },
      ],
      languages: [
        { name: "فارسی", level: "زبان مادری" },
        { name: "انگلیسی", level: "خیلی خوب" },
      ],
      portfolio: [
        {
          name: "مطالعات موردی محصول B2B",
          url: "https://example.com/portfolio/product-b2b",
        },
      ],
    },
    33: {
      id: 33,
      name: "آرین شریفی",
      position: "توسعه‌دهنده Node.js",
      email: "arin.sharifi@example.com",
      phone: "+۹۸ ۹۴۰ ۵۵۵ ۶۶۶۷",
      location: "آمل، ایران",
      appliedDate: "۲ ساعت پیش",
      experienceYears: "۳",
      education: "کارشناسی کامپیوتر",
      status: "new",
      score: 81,
      isPro: false,
      summary:
        "توسعه‌دهنده Back-End با تجربه در Node.js، Express و MongoDB. متخصص در ساخت APIهای scalable و میکروسرویس‌ها.",
      skills: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "PostgreSQL",
        "Redis",
        "Docker",
        "REST APIs",
        "GraphQL",
        "Socket.io",
        "JWT",
      ],
      experience: [
        {
          id: 1,
          title: "توسعه‌دهنده Back-End",
          company: "شرکت فناوری آمل",
          location: "آمل",
          startDate: "۱۳۹۹/۰۷",
          endDate: "اکنون",
          description:
            "توسعه APIهای RESTful و GraphQL با Node.js. کار با MongoDB و PostgreSQL برای ذخیره‌سازی داده‌ها.",
          achievements: ["توسعه ۱۲ API مختلف", "بهبود عملکرد تا ۴۵%"],
        },
      ],
      education: [
        {
          id: 1,
          degree: "کارشناسی کامپیوتر",
          institution: "دانشگاه مازندران",
          location: "بابلسر",
          graduationYear: "۱۳۹۹",
          gpa: "۱۷.۲ از ۲۰",
        },
      ],
      languages: [
        { name: "فارسی", level: "زبان مادری" },
        { name: "انگلیسی", level: "خوب" },
      ],
      portfolio: [
        {
          name: "API پلتفرم آموزشی",
          url: "https://example.com/portfolio/node-api-2",
        },
      ],
    },
    34: {
      id: 34,
      name: "سوگل علیزاده",
      position: "طراح UX/UI",
      email: "soogol.alizadeh@example.com",
      phone: "+۹۸ ۹۴۱ ۷۷۷ ۸۸۸۹",
      location: "بهشهر، ایران",
      appliedDate: "۶ ساعت پیش",
      experienceYears: "۲",
      education: "کارشناسی طراحی گرافیک",
      status: "reviewed",
      score: 76,
      isPro: false,
      summary:
        "طراح UX/UI جونیور با تمرکز بر طراحی تجربه کاربری و رابط کاربری مدرن. علاقه‌مند به یادگیری و بهبود مهارت‌های طراحی.",
      skills: [
        "Figma",
        "Adobe XD",
        "Sketch",
        "Photoshop",
        "User Research",
        "Wireframing",
        "Prototyping",
        "Usability Testing",
      ],
      experience: [
        {
          id: 1,
          title: "طراح UX/UI",
          company: "آژانس دیجیتال بهشهر",
          location: "بهشهر",
          startDate: "۱۴۰۰/۰۹",
          endDate: "اکنون",
          description:
            "طراحی رابط کاربری وب‌سایت‌ها و اپلیکیشن‌های موبایل. انجام تحقیقات کاربر و تست قابلیت استفاده.",
          achievements: ["طراحی ۱۵ رابط کاربری", "بهبود نرخ تبدیل تا ۲۰%"],
        },
      ],
      education: [
        {
          id: 1,
          degree: "کارشناسی طراحی گرافیک",
          institution: "دانشگاه مازندران",
          location: "بابلسر",
          graduationYear: "۱۴۰۰",
          gpa: "۱۶.۸ از ۲۰",
        },
      ],
      languages: [
        { name: "فارسی", level: "زبان مادری" },
        { name: "انگلیسی", level: "متوسط" },
      ],
      portfolio: [
        {
          name: "نمونه کار طراحی UI/UX",
          url: "https://example.com/portfolio/uiux-design-2",
        },
      ],
    },
    35: {
      id: 35,
      name: "رامتین کریمی",
      position: "کارشناس DevOps",
      email: "ramtin.karimi@example.com",
      phone: "+۹۸ ۹۴۲ ۹۹۹ ۰۰۰۱",
      location: "آمل، ایران",
      appliedDate: "۱ روز پیش",
      experienceYears: "۵",
      education: "کارشناسی مهندسی کامپیوتر",
      status: "shortlisted",
      score: 90,
      isPro: true,
      summary:
        "کارشناس DevOps با تجربه در اتوماسیون، containerization و cloud computing. متخصص در AWS، Docker و Kubernetes.",
      skills: [
        "AWS",
        "Docker",
        "Kubernetes",
        "Jenkins",
        "GitLab CI",
        "Terraform",
        "Ansible",
        "Linux",
        "Python",
        "Bash",
        "Monitoring",
      ],
      experience: [
        {
          id: 1,
          title: "کارشناس DevOps Senior",
          company: "شرکت فناوری آمل",
          location: "آمل",
          startDate: "۱۳۹۹/۰۹",
          endDate: "اکنون",
          description:
            "مدیریت زیرساخت ابری AWS، پیاده‌سازی CI/CD pipelines و اتوماسیون فرآیندهای DevOps. نگهداری سیستم‌های production.",
          achievements: [
            "کاهش deployment time تا ۸۵%",
            "افزایش availability تا ۹۹.۹%",
            "کاهش هزینه‌های ابری تا ۳۵%",
          ],
        },
      ],
      education: [
        {
          id: 1,
          degree: "کارشناسی مهندسی کامپیوتر",
          institution: "دانشگاه مازندران",
          location: "بابلسر",
          graduationYear: "۱۳۹۹",
          gpa: "۱۷.۵ از ۲۰",
        },
      ],
      certifications: [
        {
          id: 1,
          name: "AWS Solutions Architect Associate",
          issuer: "Amazon Web Services",
          issueDate: "۱۴۰۱/۰۲",
          credentialId: "AWS-SAA-2022-678",
        },
        {
          id: 2,
          name: "Certified Kubernetes Administrator",
          issuer: "CNCF",
          issueDate: "۱۴۰۰/۱۰",
          credentialId: "CNCF-CKA-2021-890",
        },
      ],
      languages: [
        { name: "فارسی", level: "زبان مادری" },
        { name: "انگلیسی", level: "خوب" },
      ],
      portfolio: [
        {
          name: "پروژه‌های DevOps پیشرفته",
          url: "https://example.com/portfolio/devops-advanced",
        },
      ],
    },
    36: {
      id: 36,
      name: "مونا رضایی",
      position: "توسعه‌دهنده Python",
      email: "mona.rezaei@example.com",
      phone: "+۹۸ ۹۴۳ ۱۱۱ ۲۲۲۳",
      location: "نوشهر، ایران",
      appliedDate: "۲ روز پیش",
      experienceYears: "۴",
      education: "کارشناسی علوم کامپیوتر",
      status: "new",
      score: 84,
      isPro: false,
      summary:
        "توسعه‌دهنده Python با تجربه در Django، Flask و FastAPI. متخصص در توسعه وب اپلیکیشن‌ها و APIهای RESTful.",
      skills: [
        "Python",
        "Django",
        "Flask",
        "FastAPI",
        "PostgreSQL",
        "Redis",
        "Celery",
        "Docker",
        "Git",
        "Linux",
      ],
      experience: [
        {
          id: 1,
          title: "توسعه‌دهنده Back-End Senior",
          company: "شرکت نرم‌افزاری نوشهر",
          location: "نوشهر",
          startDate: "۱۳۹۹/۰۴",
          endDate: "اکنون",
          description:
            "توسعه وب اپلیکیشن‌های بزرگ با Django و FastAPI. طراحی و پیاده‌سازی APIهای RESTful و GraphQL.",
          achievements: [
            "توسعه ۵ وب اپلیکیشن بزرگ",
            "بهبود عملکرد APIها تا ۵۵%",
            "مدیریت تیم ۲ نفره",
          ],
        },
      ],
      education: [
        {
          id: 1,
          degree: "کارشناسی علوم کامپیوتر",
          institution: "دانشگاه مازندران",
          location: "بابلسر",
          graduationYear: "۱۳۹۹",
          gpa: "۱۶.۷ از ۲۰",
        },
      ],
      certifications: [
        {
          id: 1,
          name: "Python Data Science Certificate",
          issuer: "IBM",
          issueDate: "۱۴۰۰/۱۲",
          credentialId: "IBM-DS-2021-567",
        },
      ],
      languages: [
        { name: "فارسی", level: "زبان مادری" },
        { name: "انگلیسی", level: "متوسط" },
      ],
      portfolio: [
        {
          name: "وب اپلیکیشن مدیریت پروژه",
          url: "https://example.com/portfolio/python-project",
        },
      ],
    },
    37: {
      id: 37,
      name: "آرش جعفری",
      position: "توسعه‌دهنده React Native",
      email: "arash.jafari@example.com",
      phone: "+۹۸ ۹۴۴ ۳۳۳ ۴۴۴۵",
      location: "گرگان، ایران",
      appliedDate: "۴ روز پیش",
      experienceYears: "۳",
      education: "کارشناسی مهندسی برق",
      status: "reviewed",
      score: 82,
      isPro: false,
      summary:
        "توسعه‌دهنده React Native با تجربه در ساخت اپلیکیشن‌های موبایل cross-platform. متخصص در React Native و Firebase.",
      skills: [
        "React Native",
        "JavaScript",
        "TypeScript",
        "Firebase",
        "Expo",
        "Redux",
        "Android Studio",
        "Xcode",
        "REST APIs",
        "Git",
      ],
      experience: [
        {
          id: 1,
          title: "توسعه‌دهنده Mobile",
          company: "شرکت اپلیکیشن‌های موبایل گرگان",
          location: "گرگان",
          startDate: "۱۳۹۹/۰۷",
          endDate: "اکنون",
          description:
            "توسعه اپلیکیشن‌های موبایل با React Native برای iOS و Android. پیاده‌سازی ویژگی‌های جدید و رفع باگ‌ها.",
          achievements: [
            "انتشار ۶ اپلیکیشن در استورها",
            "افزایش امتیاز اپلیکیشن‌ها",
            "بهبود عملکرد اپلیکیشن‌ها",
          ],
        },
      ],
      education: [
        {
          id: 1,
          degree: "کارشناسی مهندسی برق",
          institution: "دانشگاه گلستان",
          location: "گرگان",
          graduationYear: "۱۳۹۹",
          gpa: "۱۶.۴ از ۲۰",
        },
      ],
      certifications: [
        {
          id: 1,
          name: "گواهی React Native",
          issuer: "Meta",
          issueDate: "۱۴۰۰/۱۲",
          credentialId: "META-RN-2021-678",
        },
      ],
      languages: [
        { name: "فارسی", level: "زبان مادری" },
        { name: "انگلیسی", level: "متوسط" },
      ],
      portfolio: [
        {
          name: "اپلیکیشن فروشگاه آنلاین",
          url: "https://example.com/portfolio/mobile-shop-2",
        },
      ],
    },
    38: {
      id: 38,
      name: "نرگس محمدی",
      position: "توسعه‌دهنده Vue.js",
      email: "narges.mohammadi@example.com",
      phone: "+۹۸ ۹۴۵ ۵۵۵ ۶۶۶۷",
      location: "ساری، ایران",
      appliedDate: "۳ روز پیش",
      experienceYears: "۲",
      education: "کارشناسی مهندسی نرم‌افزار",
      status: "new",
      score: 75,
      isPro: false,
      summary:
        "توسعه‌دهنده Front-End با تمرکز بر Vue.js و Nuxt.js. تجربه در ساخت اپلیکیشن‌های تک صفحه‌ای و SSR.",
      skills: [
        "Vue.js",
        "Nuxt.js",
        "JavaScript",
        "TypeScript",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "Vuex",
        "Pinia",
        "Git",
      ],
      experience: [
        {
          id: 1,
          title: "توسعه‌دهنده Front-End",
          company: "استارتاپ فناوری ساری",
          location: "ساری",
          startDate: "۱۴۰۰/۰۶",
          endDate: "اکنون",
          description:
            "توسعه رابط کاربری اپلیکیشن‌های Vue.js و Nuxt.js. همکاری با تیم طراحی برای پیاده‌سازی کامپوننت‌های responsive.",
          achievements: [
            "توسعه ۳ اپلیکیشن Vue.js",
            "بهبود سرعت بارگذاری تا ۳۵%",
          ],
        },
      ],
      education: [
        {
          id: 1,
          degree: "کارشناسی مهندسی نرم‌افزار",
          institution: "دانشگاه مازندران",
          location: "بابلسر",
          graduationYear: "۱۴۰۰",
          gpa: "۱۶.۹ از ۲۰",
        },
      ],
      languages: [
        { name: "فارسی", level: "زبان مادری" },
        { name: "انگلیسی", level: "خوب" },
      ],
      portfolio: [
        {
          name: "اپلیکیشن فروشگاه آنلاین Vue",
          url: "https://example.com/portfolio/vue-shop-2",
        },
      ],
    },
    39: {
      id: 39,
      name: "پرهام احمدی",
      position: "توسعه‌دهنده PHP",
      email: "peyman.ahmadi@example.com",
      phone: "+۹۸ ۹۴۶ ۷۷۷ ۸۸۸۹",
      location: "آمل، ایران",
      appliedDate: "۵ روز پیش",
      experienceYears: "۴",
      education: "کارشناسی کامپیوتر",
      status: "reviewed",
      score: 83,
      isPro: false,
      summary:
        "توسعه‌دهنده PHP با تجربه در Laravel و CodeIgniter. متخصص در توسعه وب اپلیکیشن‌های MVC و RESTful APIs.",
      skills: [
        "PHP",
        "Laravel",
        "CodeIgniter",
        "MySQL",
        "JavaScript",
        "jQuery",
        "HTML5",
        "CSS3",
        "Git",
        "Composer",
      ],
      experience: [
        {
          id: 1,
          title: "توسعه‌دهنده PHP Senior",
          company: "شرکت نرم‌افزاری آمل",
          location: "آمل",
          startDate: "۱۳۹۹/۰۹",
          endDate: "اکنون",
          description:
            "توسعه وب اپلیکیشن‌های PHP با استفاده از Laravel. پیاده‌سازی APIهای RESTful و کار با MySQL.",
          achievements: [
            "توسعه ۷ وب اپلیکیشن",
            "بهبود امنیت اپلیکیشن‌ها",
            "بهینه‌سازی queryهای دیتابیس",
          ],
        },
      ],
      education: [
        {
          id: 1,
          degree: "کارشناسی کامپیوتر",
          institution: "دانشگاه مازندران",
          location: "بابلسر",
          graduationYear: "۱۳۹۹",
          gpa: "۱۷.۱ از ۲۰",
        },
      ],
      languages: [
        { name: "فارسی", level: "زبان مادری" },
        { name: "انگلیسی", level: "خوب" },
      ],
      portfolio: [
        {
          name: "سیستم مدیریت محتوا پیشرفته",
          url: "https://example.com/portfolio/php-cms-advanced",
        },
      ],
    },
    40: {
      id: 40,
      name: "لیلا رضایی",
      position: "طراح گرافیک",
      email: "leila.rezaei@example.com",
      phone: "+۹۸ ۹۴۷ ۹۹۹ ۰۰۰۱",
      location: "نوشهر، ایران",
      appliedDate: "۲ ساعت پیش",
      experienceYears: "۳",
      education: "کارشناسی هنر",
      status: "shortlisted",
      score: 78,
      isPro: false,
      summary:
        "طراح گرافیک با تجربه در برندینگ، طراحی لوگو و رابط کاربری. متخصص در Adobe Creative Suite و Figma.",
      skills: [
        "Photoshop",
        "Illustrator",
        "InDesign",
        "Figma",
        "Sketch",
        "After Effects",
        "Premiere Pro",
        "Typography",
        "Branding",
        "UI Design",
      ],
      experience: [
        {
          id: 1,
          title: "طراح گرافیک",
          company: "آژانس تبلیغات نوشهر",
          location: "نوشهر",
          startDate: "۱۳۹۹/۰۳",
          endDate: "اکنون",
          description:
            "طراحی گرافیک برای برندهای مختلف، لوگو، پوستر و رابط کاربری اپلیکیشن‌ها و وب‌سایت‌ها.",
          achievements: ["طراحی ۶۰+ لوگو", "برنده ۲ جایزه طراحی"],
        },
      ],
      education: [
        {
          id: 1,
          degree: "کارشناسی هنر",
          institution: "دانشگاه مازندران",
          location: "بابلسر",
          graduationYear: "۱۳۹۹",
          gpa: "۱۷.۳ از ۲۰",
        },
      ],
      languages: [
        { name: "فارسی", level: "زبان مادری" },
        { name: "انگلیسی", level: "خوب" },
      ],
      portfolio: [
        {
          name: "نمونه کار طراحی گرافیک",
          url: "https://example.com/portfolio/graphic-design-3",
        },
      ],
    },
    41: {
      id: 41,
      name: "سجاد کرمی",
      position: "کارشناس امنیت",
      email: "sajjad.karami@example.com",
      phone: "+۹۸ ۹۴۸ ۱۱۱ ۲۲۲۳",
      location: "بهشهر، ایران",
      appliedDate: "۴ ساعت پیش",
      experienceYears: "۶",
      education: "کارشناسی امنیت اطلاعات",
      status: "new",
      score: 91,
      isPro: true,
      summary:
        "کارشناس امنیت سایبری با تجربه گسترده در penetration testing، امنیت وب و شبکه. متخصص در ابزارهای امنیتی پیشرفته.",
      skills: [
        "Penetration Testing",
        "Web Security",
        "Network Security",
        "Kali Linux",
        "Metasploit",
        "Burp Suite",
        "OWASP",
        "Firewalls",
        "SIEM",
        "Python",
      ],
      experience: [
        {
          id: 1,
          title: "کارشناس امنیت Senior",
          company: "شرکت امنیت سایبری بهشهر",
          location: "بهشهر",
          startDate: "۱۳۹۸/۱۱",
          endDate: "اکنون",
          description:
            "انجام penetration testing، ارزیابی امنیت وب اپلیکیشن‌ها و شبکه‌ها، آموزش امنیت به تیم‌های توسعه.",
          achievements: [
            "شناسایی ۱۸۰+ آسیب‌پذیری امنیتی",
            "بهبود امنیت ۴۵ شرکت",
            "آموزش ۹۰+ توسعه‌دهنده",
          ],
        },
      ],
      education: [
        {
          id: 1,
          degree: "کارشناسی امنیت اطلاعات",
          institution: "دانشگاه مازندران",
          location: "بابلسر",
          graduationYear: "۱۳۹۸",
          gpa: "۱۸.۴ از ۲۰",
        },
      ],
      certifications: [
        {
          id: 1,
          name: "CEH (Certified Ethical Hacker)",
          issuer: "EC-Council",
          issueDate: "۱۴۰۰/۰۵",
          credentialId: "CEH-2021-999",
        },
        {
          id: 2,
          name: "OSCP (Offensive Security Certified Professional)",
          issuer: "Offensive Security",
          issueDate: "۱۴۰۱/۰۳",
          credentialId: "OSCP-2022-678",
        },
      ],
      languages: [
        { name: "فارسی", level: "زبان مادری" },
        { name: "انگلیسی", level: "خیلی خوب" },
      ],
      portfolio: [
        {
          name: "گزارش‌های امنیتی پیشرفته",
          url: "https://example.com/portfolio/security-reports-3",
        },
      ],
    },
    42: {
      id: 42,
      name: "مریم زمانی",
      position: "توسعه‌دهنده React",
      email: "maryam.zamani@example.com",
      phone: "+۹۸ ۹۴۹ ۳۳۳ ۴۴۴۵",
      location: "گرگان، ایران",
      appliedDate: "۶ ساعت پیش",
      experienceYears: "۱",
      education: "کارشناسی مهندسی نرم‌افزار",
      status: "reviewed",
      score: 71,
      isPro: false,
      summary:
        "توسعه‌دهنده Front-End جونیور با تمرکز بر React و JavaScript. علاقه‌مند به یادگیری و رشد در زمینه توسعه وب.",
      skills: [
        "React",
        "JavaScript",
        "HTML5",
        "CSS3",
        "Git",
        "Node.js",
        "Express.js",
        "MongoDB",
      ],
      experience: [
        {
          id: 1,
          title: "توسعه‌دهنده Front-End Junior",
          company: "شرکت فناوری گرگان",
          location: "گرگان",
          startDate: "۱۴۰۱/۰۳",
          endDate: "اکنون",
          description:
            "توسعه کامپوننت‌های React، کار با APIها و پیاده‌سازی رابط کاربری responsive.",
          achievements: [
            "توسعه ۲ اپلیکیشن React",
            "یادگیری سریع تکنولوژی‌های جدید",
          ],
        },
      ],
      education: [
        {
          id: 1,
          degree: "کارشناسی مهندسی نرم‌افزار",
          institution: "دانشگاه گلستان",
          location: "گرگان",
          graduationYear: "۱۴۰۱",
          gpa: "۱۶.۱ از ۲۰",
        },
      ],
      languages: [
        { name: "فارسی", level: "زبان مادری" },
        { name: "انگلیسی", level: "متوسط" },
      ],
      portfolio: [
        {
          name: "پروژه‌های شخصی React",
          url: "https://example.com/portfolio/personal-react-2",
        },
      ],
    },
    43: {
      id: 43,
      name: "علی علوی",
      position: "تحلیلگر داده",
      email: "ali.alavi@example.com",
      phone: "+۹۸ ۹۵۰ ۵۵۵ ۶۶۶۷",
      location: "ساری، ایران",
      appliedDate: "۱ روز پیش",
      experienceYears: "۵",
      education: "کارشناسی آمار و احتمال",
      status: "shortlisted",
      score: 88,
      isPro: true,
      summary:
        "تحلیلگر داده Senior با تخصص در تحلیل داده‌های بزرگ، مدل‌سازی آماری و BI. متخصص در SQL، Python و Tableau.",
      skills: [
        "SQL",
        "Python",
        "Tableau",
        "Power BI",
        "Excel",
        "Statistical Analysis",
        "Data Visualization",
        "Pandas",
        "NumPy",
        "Machine Learning",
      ],
      experience: [
        {
          id: 1,
          title: "تحلیلگر داده Senior",
          company: "شرکت داده‌پرداز ساری",
          location: "ساری",
          startDate: "۱۳۹۸/۰۴",
          endDate: "اکنون",
          description:
            "تحلیل داده‌های مشتریان بزرگ، ساخت داشبوردهای تحلیلی و گزارش‌های مدیریتی. پیاده‌سازی مدل‌های پیش‌بینی.",
          achievements: [
            "ساخت ۳۵ داشبورد",
            "افزایش بهره‌وری تا ۵۵%",
            "کاهش هزینه‌ها تا ۲۲%",
          ],
        },
      ],
      education: [
        {
          id: 1,
          degree: "کارشناسی آمار و احتمال",
          institution: "دانشگاه مازندران",
          location: "بابلسر",
          graduationYear: "۱۳۹۸",
          gpa: "۱۷.۸ از ۲۰",
        },
      ],
      certifications: [
        {
          id: 1,
          name: "Tableau Desktop Specialist",
          issuer: "Tableau",
          issueDate: "۱۴۰۰/۱۱",
          credentialId: "TABLEAU-DS-2021-234",
        },
      ],
      languages: [
        { name: "فارسی", level: "زبان مادری" },
        { name: "انگلیسی", level: "خیلی خوب" },
      ],
      portfolio: [
        {
          name: "نمونه داشبوردها پیشرفته",
          url: "https://example.com/portfolio/dashboards-3",
        },
      ],
    },
    44: {
      id: 44,
      name: "فاطمه حسینی",
      position: "مدیر محصول دیجیتال",
      email: "fateme.hosseini@example.com",
      phone: "+۹۸ ۹۵۱ ۷۷۷ ۸۸۸۹",
      location: "آمل، ایران",
      appliedDate: "۲ روز پیش",
      experienceYears: "۶",
      education: "کارشناسی MBA",
      status: "new",
      score: 89,
      isPro: false,
      summary:
        "مدیر محصول دیجیتال با تجربه در استراتژی محصول، تحلیل داده‌ها و رهبری تیم‌های توسعه. متخصص در محصول‌های SaaS.",
      skills: [
        "Product Management",
        "Product Strategy",
        "Agile",
        "Data Analysis",
        "User Research",
        "SQL",
        "Google Analytics",
        "A/B Testing",
        "Roadmapping",
        "Stakeholder Management",
      ],
      experience: [
        {
          id: 1,
          title: "مدیر محصول دیجیتال",
          company: "پلتفرم SaaS آمل",
          location: "آمل",
          startDate: "۱۳۹۹/۰۶",
          endDate: "اکنون",
          description:
            "مدیریت محصول پلتفرم SaaS، تعریف استراتژی محصول و همکاری با تیم‌های فنی و بازاریابی.",
          achievements: [
            "افزایش MRR تا ۱۸۰%",
            "راه‌اندازی ۶ محصول جدید",
            "کاهش churn rate تا ۴۵%",
          ],
        },
      ],
      education: [
        {
          id: 1,
          degree: "کارشناسی ارشد MBA",
          institution: "دانشگاه تهران",
          location: "تهران",
          graduationYear: "۱۳۹۹",
          gpa: "۱۷.۶ از ۲۰",
        },
      ],
      languages: [
        { name: "فارسی", level: "زبان مادری" },
        { name: "انگلیسی", level: "خوب" },
      ],
      portfolio: [
        {
          name: "مطالعات موردی محصول SaaS",
          url: "https://example.com/portfolio/product-saas",
        },
      ],
    },
    45: {
      id: 45,
      name: "حسن شریفی",
      position: "کارشناس DevOps",
      email: "hasan.sharifi@example.com",
      phone: "+۹۸ ۹۵۲ ۹۹۹ ۰۰۰۱",
      location: "نوشهر، ایران",
      appliedDate: "۳ روز پیش",
      experienceYears: "۴",
      education: "کارشناسی مهندسی کامپیوتر",
      status: "reviewed",
      score: 87,
      isPro: false,
      summary:
        "کارشناس DevOps با تجربه در اتوماسیون، CI/CD و مدیریت زیرساخت ابری. متخصص در AWS و Docker.",
      skills: [
        "AWS",
        "Docker",
        "Kubernetes",
        "Jenkins",
        "GitLab CI",
        "Terraform",
        "Linux",
        "Python",
        "Bash",
        "Monitoring",
      ],
      experience: [
        {
          id: 1,
          title: "کارشناس DevOps",
          company: "شرکت ابری نوشهر",
          location: "نوشهر",
          startDate: "۱۳۹۹/۱۰",
          endDate: "اکنون",
          description:
            "مدیریت زیرساخت AWS، پیاده‌سازی pipelineهای CI/CD و اتوماسیون فرآیندهای DevOps.",
          achievements: [
            "کاهش deployment time تا ۷۵%",
            "افزایش uptime تا ۹۹.۹%",
          ],
        },
      ],
      languages: [
        { name: "فارسی", level: "زبان مادری" },
        { name: "انگلیسی", level: "خوب" },
      ],
      portfolio: [
        {
          name: "پروژه‌های DevOps پیشرفته",
          url: "https://example.com/portfolio/devops-advanced",
        },
      ],
    },
  };
  return resumes[id] || null;
};

// کامپوننت بخش مهارت‌ها
const SkillsSection = ({ skills }) => (
  <div className="bg-[#1e1e1e] rounded-xl p-6 border border-gray-800">
    <h3 className="text-xl font-bold text-white mb-4 text-right">مهارت‌ها</h3>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <span
          key={index}
          className="bg-blue-400/10 text-blue-400 px-3 py-1 rounded-full text-sm border border-blue-400/20"
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
);

// کامپوننت بخش تجربه کاری
const ExperienceSection = ({ experience }) => (
  <div className="bg-[#1e1e1e] rounded-xl p-6 border border-gray-800">
    <h3 className="text-xl font-bold text-white mb-6 text-right">تجربه کاری</h3>
    <div className="space-y-6">
      {experience.map((exp) => (
        <div
          key={exp.id}
          className="border-r-2 border-yellow-400 pr-6 relative"
        >
          <div className="absolute -right-2 top-0 w-4 h-4 bg-yellow-400 rounded-full"></div>
          <div className="text-right">
            <h4 className="text-lg font-semibold text-white">{exp.title}</h4>
            <p className="text-blue-400 font-medium">{exp.company}</p>
            <p className="text-gray-400 text-sm mb-3">
              {exp.location} • {exp.startDate} - {exp.endDate}
            </p>
            <p className="text-gray-300 mb-4 leading-relaxed">
              {exp.description}
            </p>
            {exp.achievements && exp.achievements.length > 0 && (
              <div>
                <h5 className="text-yellow-400 font-medium mb-2">دستاوردها:</h5>
                <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                  {exp.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// کامپوننت بخش تحصیلات
const EducationSection = ({ education }) => (
  <div className="bg-[#1e1e1e] rounded-xl p-6 border border-gray-800">
    <h3 className="text-xl font-bold text-white mb-6 text-right">تحصیلات</h3>
    <div className="space-y-4">
      {education.map((edu) => (
        <div key={edu.id} className="text-right">
          <h4 className="text-lg font-semibold text-white">{edu.degree}</h4>
          <p className="text-blue-400 font-medium">{edu.institution}</p>
          <p className="text-gray-400 text-sm">
            {edu.location} • فارغ‌التحصیل {edu.graduationYear}
          </p>
          {edu.gpa && (
            <p className="text-yellow-400 text-sm">معدل: {edu.gpa}</p>
          )}
        </div>
      ))}
    </div>
  </div>
);

// کامپوننت بخش گواهی‌نامه‌ها
const CertificationsSection = ({ certifications }) => (
  <div className="bg-[#1e1e1e] rounded-xl p-6 border border-gray-800">
    <h3 className="text-xl font-bold text-white mb-6 text-right">
      گواهی‌نامه‌ها
    </h3>
    <div className="space-y-4">
      {certifications.map((cert) => (
        <div
          key={cert.id}
          className="text-right border-b border-gray-800 pb-4 last:border-b-0"
        >
          <h4 className="text-lg font-semibold text-white">{cert.name}</h4>
          <p className="text-blue-400 font-medium">{cert.issuer}</p>
          <p className="text-gray-400 text-sm">صدور: {cert.issueDate}</p>
          <p className="text-gray-500 text-xs">کد گواهی: {cert.credentialId}</p>
        </div>
      ))}
    </div>
  </div>
);

// کامپوننت بخش زبان‌ها
const LanguagesSection = ({ languages }) => (
  <div className="bg-[#1e1e1e] rounded-xl p-6 border border-gray-800">
    <h3 className="text-xl font-bold text-white mb-4 text-right">زبان‌ها</h3>
    <div className="space-y-2">
      {languages.map((lang, index) => (
        <div key={index} className="flex justify-between items-center">
          <span className="text-yellow-400 font-medium">{lang.level}</span>
          <span className="text-white">{lang.name}</span>
        </div>
      ))}
    </div>
  </div>
);

export default function ResumeViewPage() {
  const router = useRouter();
  const params = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // شبیه‌سازی دریافت داده از API
    const fetchResume = async () => {
      setLoading(true);
      // در واقعیت اینجا API call انجام می‌شود
      setTimeout(() => {
        const resumeData = getResumeData(params.id);
        setResume(resumeData);
        setLoading(false);
      }, 500);
    };

    if (params.id) {
      fetchResume();
    }
  }, [params.id]);

  const handleStatusChange = (newStatus) => {
    if (
      window.confirm(
        `آیا مطمئن هستید که وضعیت این رزومه را به "${
          newStatus === "shortlisted" ? "انتخاب شده" : "رد شده"
        }" تغییر دهید؟`
      )
    ) {
      // ذخیره وضعیت در localStorage
      const statusUpdates = JSON.parse(
        localStorage.getItem("applicationStatusUpdates") || "{}"
      );
      statusUpdates[params.id] = newStatus;
      localStorage.setItem(
        "applicationStatusUpdates",
        JSON.stringify(statusUpdates)
      );

      // در واقعیت اینجا API call انجام می‌شود
      setResume((prev) => (prev ? { ...prev, status: newStatus } : null));
      alert(
        `وضعیت رزومه به "${
          newStatus === "shortlisted" ? "انتخاب شده" : "رد شده"
        }" تغییر یافت.`
      );
    }
  };

  const handleContact = () => {
    // در واقعیت اینجا ایمیل یا پیام ارسال می‌شود
    alert(`تماس با ${resume.name} از طریق ایمیل: ${resume.email}`);
  };

  const handleDownload = () => {
    // در واقعیت اینجا فایل PDF دانلود می‌شود
    alert("دانلود رزومه به صورت PDF");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-400">در حال بارگذاری رزومه...</p>
        </div>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <svg
            className="w-16 h-16 text-gray-600 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="text-xl font-semibold text-gray-400 mb-2">
            رزومه یافت نشد
          </h3>
          <button
            onClick={() => router.back()}
            className="mt-4 bg-yellow-400 text-gray-900 px-6 py-2 rounded-lg hover:bg-yellow-500 transition duration-200"
          >
            بازگشت
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header با ناوبری و اکشن‌ها */}
      <div className="bg-[#1e1e1e] border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <button
                onClick={() => router.back()}
                className="flex items-center text-gray-400 hover:text-white transition duration-200"
              >
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                بازگشت
              </button>
              <div className="text-sm text-gray-500">
                رزومه‌های دریافتی / {resume.name}
              </div>
            </div>

            <div className="flex items-center space-x-3 space-x-reverse">
              <button
                onClick={handleDownload}
                className="flex items-center bg-gray-800 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200 text-sm"
              >
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                دانلود PDF
              </button>

              <button
                onClick={handleContact}
                className="flex items-center bg-blue-400/10 text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-400/20 transition duration-200 text-sm"
              >
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                تماس
              </button>

              {resume.status !== "shortlisted" && (
                <button
                  onClick={() => handleStatusChange("shortlisted")}
                  className="flex items-center bg-green-400/10 text-green-400 px-4 py-2 rounded-lg hover:bg-green-400/20 transition duration-200 text-sm"
                >
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  انتخاب برای مصاحبه
                </button>
              )}

              {resume.status !== "rejected" && (
                <button
                  onClick={() => handleStatusChange("rejected")}
                  className="flex items-center bg-red-400/10 text-red-400 px-4 py-2 rounded-lg hover:bg-red-400/20 transition duration-200 text-sm"
                >
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  رد کردن
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* محتوای اصلی */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* هدر رزومه */}
        <div className="bg-[#1e1e1e] rounded-xl p-8 border border-gray-800 mb-8">
          <div className="flex items-start space-x-6 space-x-reverse">
            {/* تصویر پروفایل */}
            <div
              className={`w-24 h-24 rounded-full flex items-center justify-center border-4 flex-shrink-0 ${
                resume.isPro
                  ? "bg-gradient-to-br from-purple-500/20 to-pink-500/30 border-purple-500/50"
                  : "bg-gradient-to-br from-blue-400/20 to-blue-600/30 border-blue-400/50"
              }`}
            >
              <span
                className={`font-bold text-2xl ${
                  resume.isPro ? "text-purple-300" : "text-blue-400"
                }`}
              >
                {resume.name.charAt(0)}
              </span>
            </div>

            {/* اطلاعات اصلی */}
            <div className="flex-1 text-right">
              <div className="flex items-center space-x-3 space-x-reverse mb-2">
                <h1
                  className={`text-3xl font-bold ${
                    resume.isPro ? "text-purple-200" : "text-white"
                  }`}
                >
                  {resume.isPro && (
                    <div className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg ml-3">
                      <svg
                        className="w-3 h-3 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          clipRule="evenodd"
                        />
                      </svg>
                      pro
                    </div>
                  )}
                  {resume.name}
                </h1>
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    resume.status === "new"
                      ? "bg-green-400/10 text-green-400 border border-green-400/20"
                      : resume.status === "reviewed"
                      ? "bg-blue-400/10 text-blue-400 border border-blue-400/20"
                      : resume.status === "shortlisted"
                      ? "bg-yellow-400/10 text-yellow-400 border border-yellow-400/20"
                      : "bg-red-400/10 text-red-400 border border-red-400/20"
                  }`}
                >
                  {resume.status === "new"
                    ? "جدید"
                    : resume.status === "reviewed"
                    ? "بررسی شده"
                    : resume.status === "shortlisted"
                    ? "انتخاب شده"
                    : "رد شده"}
                </div>
              </div>

              <p className="text-xl text-blue-400 font-medium mb-4">
                {resume.position}
              </p>

              {/* اطلاعات تماس */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center text-gray-300">
                  <svg
                    className="w-5 h-5 ml-2 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  {resume.email}
                </div>
                <div className="flex items-center text-gray-300">
                  <svg
                    className="w-5 h-5 ml-2 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span dir="ltr" className="font-mono">
                    {resume.phone}
                  </span>
                </div>
                <div className="flex items-center text-gray-300">
                  <svg
                    className="w-5 h-5 ml-2 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {resume.location}
                </div>
              </div>

              {/* امتیاز و اطلاعات کلی */}
              <div className="flex items-center space-x-6 space-x-reverse text-sm">
                <div className="flex items-center text-yellow-400">
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  امتیاز: {resume.score}/100
                </div>
                <div className="text-gray-400">
                  {resume.experienceYears} سال تجربه
                </div>
                <div className="text-gray-400">
                  ارسال شده: {resume.appliedDate}
                </div>
              </div>
            </div>
          </div>

          {/* خلاصه حرفه‌ای */}
          {resume.summary && (
            <div className="mt-6 pt-6 border-t border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-3 text-right">
                خلاصه حرفه‌ای
              </h3>
              <p className="text-gray-300 leading-relaxed text-right">
                {resume.summary}
              </p>
            </div>
          )}
        </div>

        {/* بخش‌های مختلف رزومه */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ستون سمت چپ */}
          <div className="lg:col-span-2 space-y-8">
            <ExperienceSection experience={resume.experience} />
            <EducationSection education={resume.education} />
          </div>

          {/* ستون سمت راست */}
          <div className="space-y-8">
            <SkillsSection skills={resume.skills} />
            <LanguagesSection languages={resume.languages} />
            {resume.certifications && resume.certifications.length > 0 && (
              <CertificationsSection certifications={resume.certifications} />
            )}
          </div>
        </div>

        {/* پورتفولیو */}
        {resume.portfolio && resume.portfolio.length > 0 && (
          <div className="mt-8 bg-[#1e1e1e] rounded-xl p-6 border border-gray-800">
            <h3 className="text-xl font-bold text-white mb-6 text-right">
              پورتفولیو
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resume.portfolio.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition duration-200"
                >
                  <svg
                    className="w-5 h-5 ml-3 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  <div className="text-right">
                    <div className="text-white font-medium">{item.name}</div>
                    <div className="text-gray-400 text-sm">{item.url}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
