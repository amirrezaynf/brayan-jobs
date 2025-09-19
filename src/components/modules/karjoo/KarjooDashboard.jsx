"use client";

import { useState } from "react";
import MobileMenu from "@/components/layout/header/KarjooMobileMenu";
import { ClipboardIcon, HomeIcon, SendIcon, UserIcon } from "lucide-react";

export default function KarjooDashboard() {
  const [activeTab, setActiveTab] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    {
      id: "home",
      label: "داشبورد",
      icon: <HomeIcon />,
    },
    {
      id: "my-resume",
      label: "رزومه من",
      icon: <ClipboardIcon />,
      link: "/karjoo/resume",
    },
    {
      id: "sent-resumes",
      label: "رزومه‌های ارسالی",
      icon: <SendIcon />,
      link: "/karjoo/reveived-resumes",
    },
    {
      id: "profile",
      label: "پروفایل من",
      icon: <UserIcon />,

     
      link:"/karjoo/1",
    },
  ];

  return (
    <MobileMenu
      isMobileMenuOpen={isMobileMenuOpen}
      setIsMobileMenuOpen={setIsMobileMenuOpen}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      menuItems={menuItems}
    />
  );
}
