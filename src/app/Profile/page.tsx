//portfolio/src/app/Profile/page.tsx

"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import SecondSection from "../Components/LandingPage/SecondSection";
import Footer from "../Components/Footer/Footer1";

const profiles = [
  {
    name: "The Talent Scout",
    image: "/Profiles/netflix-profile-pictures-5yup5hd2i60x7ew3.jpg",
    locked: false,
    path: "/hiring-manager",
    description:
      "For recruiters and HR professionals actively seeking candidates",
  },
  {
    name: "The Visionary Architect",
    image:
      "/Profiles/netflix-profile-pictures-1000-x-1000-62wgyitks6f4l79m.jpg",
    locked: false,
    path: "/team-lead",
    description:
      "For hiring managers or founders looking to build a team or a new product",
  },
  {
    name: "The Collaboration Seeker",
    image:
      "/Profiles/netflix-profile-pictures-1000-x-1000-88wkdmjrorckekha.jpg",
    locked: false,
    path: "/recruiter",
    description:
      "For team leads or fellow developers interested in joint projects",
  },
  {
    name: "The Opportunity Navigator",
    image:
      "/Profiles/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg",
    isChildren: false,
    path: "/hr-panel",
    description: "For anyone exploring new possibilities or partnerships",
  },
];

const ProfileSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const router = useRouter();

  const handleProfileClick = (profile: any) => {
    router.push(profile.path);
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const togglePopup = (index: number) => {
    // On mobile, toggle on tap
    if (isMobile) {
      setActiveIndex(activeIndex === index ? null : index);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-[Alata]">
      <div className="flex-grow">
        <SecondSection />
      </div>
      <Footer />
    </div>
  );
};

export default ProfileSection;
