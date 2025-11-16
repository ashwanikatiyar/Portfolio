"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const profiles = [
  {
    name: "The Talent Scout",
    image: "/Profiles/netflix-profile-pictures-5yup5hd2i60x7ew3.jpg",
    locked: false,
    path: "/Home",
    description:
      "For recruiters and HR professionals actively seeking candidates",
  },
  {
    name: "The Visionary Architect",
    image:
      "/Profiles/netflix-profile-pictures-1000-x-1000-62wgyitks6f4l79m.jpg",
    locked: false,
    path: "/Home",
    description:
      "For hiring managers or founders looking to build a team or a new product",
  },
  {
    name: "The Collaboration Seeker",
    image:
      "/Profiles/netflix-profile-pictures-1000-x-1000-88wkdmjrorckekha.jpg",
    locked: false,
    path: "/Home",
    description:
      "For team leads or fellow developers interested in joint projects",
  },
  {
    name: "The Opportunity Navigator",
    image:
      "/Profiles/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg",
    isChildren: false,
    path: "/Home",
    description: "For anyone exploring new possibilities or partnerships",
  },
];

export default function SecondSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const router = useRouter();
  const [popupAlignment, setPopupAlignment] = useState<
    "left" | "center" | "right"
  >("center");
  const profileRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleProfileClick = (profile: any) => {
    router.push(profile.path);
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const togglePopup = (index: number) => {
    if (isMobile) {
      setActiveIndex(activeIndex === index ? null : index);
      return;
    }

    const el = profileRefs.current[index];
    if (el) {
      const rect = el.getBoundingClientRect();
      const vw = window.innerWidth;

      if (rect.left < 100) {
        setPopupAlignment("left");
      } else if (vw - rect.right < 100) {
        setPopupAlignment("right");
      } else {
        setPopupAlignment("center");
      }

      setActiveIndex(activeIndex === index ? null : index);
    }
  };

  return (
    <div className="w-full min-h-[60vh] bg-black text-white font-[Alata] px-4 py-8 sm:py-12 transition-opacity duration-700 relative">
      {activeIndex !== null && (
        <div className="absolute inset-0 backdrop-blur-lg bg-black/30 z-0 transition duration-300" />
      )}

      <div className="max-w-screen-xl mx-auto flex flex-col items-center text-center px-4 relative z-10">
        <h1 className="text-3xl font-[Alata] sm:text-4xl md:text-5xl font-bold mb-12">
          Who's watching?
        </h1>

        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 relative">
          {profiles.map((profile, index) => {
            const isBlurred = activeIndex !== null && activeIndex !== index;
            const isActive = activeIndex === index;

            return (
              <div
                key={index}
                ref={(el) => {
                  profileRefs.current[index] = el;
                }}
                className="relative w-[45%] sm:w-auto min-h-[180px] flex justify-center"
                onMouseEnter={() => {
                  if (!isMobile) {
                    togglePopup(index); // updated to use position
                  }
                }}
                onMouseLeave={() => !isMobile && setActiveIndex(null)}
                onClick={() => togglePopup(index)}
              >
                <button
                  onClick={() => !isMobile && handleProfileClick(profile)}
                  className={`flex flex-col items-center transition-all duration-300 focus:outline-none ${
                    isBlurred ? "blur-sm opacity-60 scale-[0.95]" : ""
                  }`}
                >
                  <div
                    className={`w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-md overflow-hidden 
  border-2 ${isActive ? "border-white" : "border-transparent"} shadow-lg
  bg-black transform transition-transform duration-300 hover:scale-105`}
                  >
                    <img
                      src={profile.image}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="mt-2 text-sm sm:text-base">{profile.name}</p>

                  {profile.locked && (
                    <svg
                      className="w-4 h-4 mt-1 text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a4 4 0 00-4 4v2H5a2 2 0 00-2 2v7a2 2 0 
                        002 2h10a2 2 0 002-2v-7a2 2 0 00-2-2h-1V6a4 
                        4 0 00-4-4zM8 6a2 2 0 114 0v2H8V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>

                {/* Pop-up window under profile */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className={`z-50
  ${
    isMobile
      ? `fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] text-sm leading-snug p-4 whitespace-normal break-words`
      : `absolute top-full mt-3 w-[85vw] sm:w-80 text-sm leading-relaxed p-4
      ${
        popupAlignment === "left"
          ? "left-0 translate-x-0"
          : popupAlignment === "right"
          ? "right-0 translate-x-0"
          : "left-1/2 -translate-x-1/2"
      }`
  }
  bg-[#e50914] border border-black text-white rounded-xl shadow-xl`}
                    >
                      {isMobile && (
                        <button
                          onClick={() => setActiveIndex(null)}
                          className="absolute top-2 right-3 text-white text-xl font-bold"
                        >
                          ×
                        </button>
                      )}
                      <div className="flex flex-col items-center text-center">
                        <strong>{profile.name}:</strong> {profile.description}
                        {/* ---- Mobile Only: "Let's Go" button ---- */}
                        {isMobile && (
                          <button
                            className="mt-4 bg-black text-white px-6 py-2 rounded-full font-semibold text-sm shadow-lg hover:bg-gray-900 transition"
                            onClick={() => {
                              // console.log("Let's Go clicked");
                              // You can add router.push() later
                              
                              handleProfileClick(profile)
                            }}
                          >
                            Let's Go
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <button className="relative overflow-hidden mt-12 border border-gray-400 px-4 py-2 text-sm rounded hover:text-white hover:border-transparent group transition-colors">
          <span className="absolute inset-0 bg-[#e50914] transform scale-0 group-hover:scale-150 origin-center rounded-full transition-transform duration-500 ease-out"></span>

          <span className="relative z-10">Contact Me</span>
        </button>
      </div>
    </div>
  );
}
