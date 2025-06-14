"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";


const profiles = [
  {
    name: "Hiring Manager",
    image: "/Profiles/netflix-profile-pictures-5yup5hd2i60x7ew3.jpg",
    locked: true,
    path: "/hiring-manager",
  },
  {
    name: "Team Lead",
    image: "/Profiles/netflix-profile-pictures-1000-x-1000-62wgyitks6f4l79m.jpg",
    locked: true,
    path: "/team-lead",
  },
  {
    name: "Recruiter",
    image: "/Profiles/netflix-profile-pictures-1000-x-1000-88wkdmjrorckekha.jpg",
    locked: false,
    path: "/recruiter",
  },
  {
    name: "HR Panel",
    image: "/Profiles/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg",
    isChildren: true,
    path: "/hr-panel",
  },
];

const ProfileSection = () => {

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
      const router = useRouter();
    
      const handleTap = (index: number) => {
        setHoveredIndex((prev) => (prev === index ? null : index));
      };
    
      const handleProfileClick = (profile: any) => {
        router.push(profile.path);
      };



  return (
    <div>
      <div className="w-full min-h-screen bg-black text-white px-4 py-12">
      <div className="max-w-screen-xl mx-auto flex flex-col items-center text-center px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-[Alata] font-extrabold my-20">
          Who's watching?
        </h1>

        <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
          {profiles.map((profile, index) => {
            const isBlurred = hoveredIndex !== null && hoveredIndex !== index;
            const isActive = hoveredIndex === index;

            return (
              <button
                key={index}
                onClick={() => handleProfileClick(profile)}
                className={`flex flex-col items-center transform-gpu transition-all duration-300 focus:outline-none ${
                  isBlurred ? "blur-md scale-[0.95] opacity-60" : ""
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onTouchStart={() => handleTap(index)}
                aria-label={`Select ${profile.name} profile`}
              >
                <div
                  className={`w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-md overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105
                  border-2 ${isActive ? "border-white" : "border-transparent"}
                  shadow-[0_0_12px_rgba(255,255,255,0.7)] hover:shadow-[0_0_25px_rgba(255,255,255,1)] bg-black`}
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
                      d="M10 2a4 4 0 00-4 4v2H5a2 2 0 00-2 2v7a2 2 0 002 
                      2h10a2 2 0 002-2v-7a2 2 0 00-2-2h-1V6a4 4 0 
                      00-4-4zM8 6a2 2 0 114 0v2H8V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            );
          })}
        </div>

        <button className="mt-12 border border-gray-400 px-4 py-2 text-sm rounded hover:bg-white hover:text-black transition-colors">
          Manage Profiles
        </button>
      </div>
    </div>
    </div>
  )
}

export default ProfileSection


/*✅ Routing Setup
Make sure you have matching route folders and pages like:

bash
Copy
Edit
/app
  └── hiring-manager
        └── page.tsx
  └── team-lead
        └── page.tsx
  └── recruiter
        └── page.tsx
  └── hr-panel
        └── page.tsx
Each page.tsx can be a placeholder like:

tsx
Copy
Edit
export default function Page() {
  return <div className="text-white p-10">Welcome, Hiring Manager</div>;
}*/ 