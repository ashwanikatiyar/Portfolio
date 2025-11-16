"use client";

import type React from "react";
import { useState, useRef, useEffect, useCallback, memo } from "react";
import {
  Play,
  Info,
  VolumeX,
  Volume2,
  Github,
  ExternalLink,
  Star,
  Zap,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "../Components/Footer/Footer1";
import { Router } from "react-router-dom";

interface Project {
  id: string;
  title: string;
  description: string;
  year: string;
  duration: string;
  rating: string;
  category: string;
  thumbnail: string;
  video?: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  color: string;
}

const projects: Project[] = [
  {
    id: "1",
    title: "Flight Booking Platform",
    description:
      "A full-stack e-commerce solution built with Next.js, featuring real-time inventory management, secure payment processing, and advanced analytics dashboard with AI-powered recommendations.",
    year: "2024",
    duration: "3 months",
    rating: "95% Match",
    category: "Web Development",
    thumbnail: "/Project/Front-Flights.png",
    video:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "AI/ML"],
    liveUrl: "https://www.tripclap.com/partner/frontflights-llc",
    githubUrl: "https://github.com/ashwanikatiyar/Digixito_Projects",
    featured: true,
    color: "#ff6b6b",
  },
  {
    id: "2",
    title: "Visitor Management System",
    description:
      "Real-time messaging application with AI-powered features including smart replies, sentiment analysis, automated moderation, and voice-to-text capabilities.",
    year: "2024",
    duration: "2 months",
    rating: "88% Match",
    category: "Web Development",
    thumbnail: "/Project/Visitormagement1.png",
    technologies: ["React", "Node.js", "OpenAI", "Socket.io", "MongoDB"],
    liveUrl: "https://github.com/ashwanikatiyar/Visitor-Management-",
    githubUrl: "https://github.com/ashwanikatiyar/Visitor-Management-",
    color: "#4ecdc4",
  },
  {
    id: "3",
    title: "ValleyAI Landing Page",
    description:
      "Cross-platform fitness tracking application with workout plans, nutrition tracking, social features, and AR-powered form correction.",
    year: "2023",
    duration: "4 months",
    rating: "90% Match",
    category: "Web Development",
    thumbnail: "/Project/ValleyAI.png",
    technologies: ["NextJS", "React", "Redux", "Node.js"],
    liveUrl: "https://valleyai.io/",
    githubUrl: "https://valleyai.io/",
    color: "#ffd93d",
  },
  {
    id: "4",
    title: "3D Portfolio Experience",
    description:
      "An immersive 3D portfolio website showcasing creative projects with interactive animations, physics simulations, and WebGL-powered visual effects.",
    year: "2024",
    duration: "1 month",
    rating: "92% Match",
    category: "3D/Animation",
    thumbnail: "/Project/Portfolio.png",
    technologies: ["Three.js", "React", "GSAP", "Blender", "WebGL"],
    liveUrl: "https://ashwanis-portfolio.onrender.com",
    githubUrl: "https://ashwanis-portfolio.onrender.com",
    color: "#a8e6cf",
  },

  {
    id: "5",
    title: "Data Visualization Dashboard",
    description:
      "Interactive dashboard for complex data visualization with real-time updates, customizable charts, and machine learning insights.",
    year: "2023",
    duration: "2 months",
    rating: "87% Match",
    category: "Data Science",
    thumbnail: "/Project/VAIdashboard.png",
    technologies: ["D3.js", "Python", "FastAPI", "PostgreSQL", "ML"],
    liveUrl: "https://valleyai.io/",
    githubUrl: "https://valleyai.io/",
    color: "#ff8a80",
  },
];

export default function NetflixPortfolio() {
  const [isMuted, setIsMuted] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Memoized arrays to prevent unnecessary re-renders
  const popularProjects = projects.slice(0, 3);
  const personalProjects = projects.slice(2, 5);
  const featuredProject = projects[0];

  // Optimized scroll handler with throttling
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Optimized video functionality
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !featuredProject.video) return;

    const handleLoadedMetadata = () => {
      setIsVideoLoaded(true);
    };

    const handleCanPlay = async () => {
      setIsVideoLoaded(true);
      try {
        await video.play();
      } catch (error) {
        video.muted = true;
        setIsMuted(true);
        try {
          await video.play();
        } catch (mutedError) {
          console.warn("Video autoplay failed");
        }
      }
    };

    const handleError = () => {
      setIsVideoLoaded(false);
    };

    video.muted = isMuted;
    video.playsInline = true;
    video.loop = true;
    video.preload = "metadata";

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("error", handleError);

    video.src = featuredProject.video;
    video.load();

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("error", handleError);
    };
  }, [featuredProject.video]);

  useEffect(() => {
    const video = videoRef.current;
    if (video && isVideoLoaded) {
      video.muted = isMuted;
    }
  }, [isMuted, isVideoLoaded]);

  const toggleMute = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    const newMutedState = !isMuted;
    try {
      video.muted = newMutedState;
      setIsMuted(newMutedState);
      if (!newMutedState && video.paused) {
        await video.play();
      }
    } catch (error) {
      console.error("Error toggling mute:", error);
    }
  }, [isMuted]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const navigationItems = [
    { name: "Home", href: "#home" },
    { name: "Projects", href: "#projects" },
    { name: "About", href: "/about" }, // Changed to route to about page
    { name: "Skills", href: "/about/#skills" },
    { name: "Contact", href: "#contact" },
  ];

  const handleNavClick = useCallback((href: string) => {
    if (href.startsWith("/")) {
      // Navigate to different page
      window.location.href = href;
    } else {
      // Scroll to section
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  }, []);

  // Optimized hover handlers
  const handleCardHover = useCallback((id: string) => {
    setHoveredCard(id);
  }, []);

  const handleCardLeave = useCallback(() => {
    setHoveredCard(null);
  }, []);

  return (
    <div
      className={`netflix-portfolio min-h-screen  bg-black text-white overflow-x-hidden ${
        isLoaded ? "loaded" : ""
      }`}
    >
      {/* Header */}
      <header className="fixed top-0 w-full z-40 transition-all duration-300 ease-out font-[alata]">
        <div
          className="absolute inset-0 backdrop-blur-xl bg-black/20"
          style={{
            opacity: Math.min(scrollY / 100, 0.95),
          }}
        />
        <nav className="relative flex items-center justify-between px-4 md:px-8 lg:px-16 py-4">
          <div className="flex items-center space-x-8">
            <h1 className="text-red-500 text-2xl font-bold tracking-wider">
              PORTFOLIO
            </h1>
            <ul className="hidden md:flex space-x-6">
              {navigationItems.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className="relative hover:text-red-400 transition-colors duration-200 group"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-200 group-hover:w-full" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:inline-flex hover:bg-red-500/20 transition-colors duration-200"
              onClick={() => handleNavClick("#contact")}
            >
              <Star className="w-4 h-4 mr-2" />
              Hire Me
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>

            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center font-[ITC]">
                <span className="text-sm font-bold">ASH</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full" />
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-t border-gray-800 transition-all duration-200 ${
            isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <ul className="px-4 py-6 space-y-4">
            {navigationItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => handleNavClick(item.href)}
                  className="block w-full text-left py-2 hover:text-red-400 transition-colors"
                >
                  {item.name}
                </button>
              </li>
            ))}
            <li className="pt-4 border-t border-gray-800">
              <Button
                className="w-full bg-red-600 hover:bg-red-700"
                onClick={() => handleNavClick("#contact")}
              >
                <Star className="w-4 h-4 mr-2" />
                Hire Me
              </Button>
            </li>
          </ul>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        ref={heroRef}
        className="relative h-screen flex items-center overflow-hidden pt-30 sm:pt-0"
      >
        {/* Hero Background with Video */}
        <div className="absolute inset-0 z-10">
          <div className="relative w-full h-full overflow-hidden">
            {/* Video Background */}
            {featuredProject.video && (
              <video
                ref={videoRef}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  isVideoLoaded ? "opacity-100" : "opacity-0"
                }`}
                muted={isMuted}
                playsInline
                loop
                style={{
                  transform: `scale(${1 + scrollY * 0.0002}) translateY(${
                    scrollY * 0.3
                  }px)`,
                }}
              >
                <source src={featuredProject.video} type="video/mp4" />
              </video>
            )}

            {/* Fallback Image */}
            <div
              className={`absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-500 ${
                isVideoLoaded ? "opacity-0" : "opacity-100"
              }`}
              style={{
                backgroundImage: `url(${featuredProject.thumbnail})`,
                transform: `scale(${1 + scrollY * 0.0002}) translateY(${
                  scrollY * 0.3
                }px)`,
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 px-4 md:px-8 lg:px-16 max-w-4xl">
          <div className="space-y-6 hero-content">
            <div className="flex items-center space-x-3 text-sm font-[alata]">
              <div className="flex items-center space-x-2 bg-red-600/20 backdrop-blur-sm px-3 py-2 rounded-full border border-red-500/30">
                <Zap className="w-4 h-4 text-red-400" />
                <span className="text-red-400 font-semibold">
                  FEATURED PROJECT
                </span>
              </div>
              <span className="text-gray-300 uppercase tracking-wider">
                {featuredProject.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-8xl font-black font-[ITC] leading-none tracking-tight">
              <span className="inline-block">
                {featuredProject.title.split(" ")[0]}
              </span>
              <br />
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">
                {featuredProject.title.split(" ").slice(1).join(" ")}
              </span>
            </h1>

            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-green-400 font-bold">
                  {featuredProject.rating}
                </span>
              </div>
              <span className="text-gray-300">{featuredProject.year}</span>
              <span className="text-gray-300">{featuredProject.duration}</span>
              <div className="flex space-x-2">
                <span className="bg-gray-800/50 backdrop-blur-sm border border-gray-600 px-3 py-1 rounded text-xs font-mono">
                  4K
                </span>
                <span className="bg-gray-800/50 backdrop-blur-sm border border-gray-600 px-3 py-1 rounded text-xs font-mono">
                  HD
                </span>
              </div>
            </div>

            <p className="text-lg md:text-xl text-gray-200 leading-relaxed font-[alata] max-w-2xl">
              {featuredProject.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {featuredProject.technologies.map((tech) => (
                <span
                  key={tech}
                  className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm px-3 py-2 rounded-full text-sm border border-gray-600/30 hover:border-red-500/50 transition-colors duration-200"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center space-x-4 py-6">
              <Button
                className="bg-white text-black hover:bg-gray-200 px-8 py-4 text-lg font-bold rounded-full transition-all duration-200 hover:scale-105"
                onClick={() => window.open(featuredProject.liveUrl, "_blank")}
              >
                <Play className="w-6 h-6 mr-3 fill-current" />
                View Project
              </Button>
              <Button
                variant="secondary"
                className="bg-red-200 backdrop-blur-sm hover:bg-gray-700/50 border border-gray-600 px-8 py-4 text-lg font-extrabold text-red-500 rounded-full transition-all duration-200 hover:scale-105"
                onClick={() => handleNavClick("#projects")}
              >
                <Info className="w-6 h-6 mr-3" />
                More Info
              </Button>
              {!isMobile && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-12 h-12 rounded-full border border-gray-600 hover:border-red-500 transition-all duration-200 hover:scale-110"
                  onClick={() =>
                    window.open(featuredProject.githubUrl, "_blank")
                  }
                  aria-label="View on GitHub"
                >
                  <Github className="w-6 h-6" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Floating Action Buttons */}
        <div className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-30 space-y-4">
          <Button
            onClick={toggleMute}
            variant="ghost"
            size="icon"
            className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/30 backdrop-blur-sm border border-gray-600 hover:border-red-500 transition-all duration-200 hover:scale-110 group"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 md:w-6 md:h-6 group-hover:text-red-400 transition-colors" />
            ) : (
              <Volume2 className="w-5 h-5 md:w-6 md:h-6 group-hover:text-red-400 transition-colors" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/30 backdrop-blur-sm border border-gray-600 hover:border-red-500 transition-all duration-200 hover:scale-110 group"
            onClick={() => window.open(featuredProject.liveUrl, "_blank")}
            aria-label="Open project in new tab"
          >
            <ExternalLink className="w-5 h-5 md:w-6 md:h-6 group-hover:text-red-400 transition-colors" />
          </Button>
        </div>
      </section>

      {/* Popular Projects Section - Optimized */}
      <section
        id="projects"
        className="relative px-4 md:px-8 lg:px-16 py-20 z-20 font-[alata]"
      >
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Popular Projects
            </h2>
            <p className="text-gray-400">Trending in my portfolio</p>
          </div>
          <Button
            variant="ghost"
            className="text-red-400 hover:text-red-300"
            onClick={() => handleNavClick("#contact")}
          >
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isHovered={hoveredCard === project.id}
              onHover={() => handleCardHover(project.id)}
              onLeave={handleCardLeave}
            />
          ))}
        </div>
      </section>

      {/* Personal Projects Section - Optimized */}
      <section className="relative px-4 md:px-8 lg:px-16 py-20 z-20 font-[alata]">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Personal Projects
            </h2>
            <p className="text-gray-400">Passion projects and experiments</p>
          </div>
          <Button
            variant="ghost"
            className="text-red-400 hover:text-red-300"
            onClick={() => handleNavClick("#contact")}
          >
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {personalProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isHovered={hoveredCard === project.id}
              onHover={() => handleCardHover(project.id)}
              onLeave={handleCardLeave}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section
        id="about"
        className="relative px-4 md:px-8 lg:px-16 py-20 z-20 font-[alata]"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: "50+", label: "Projects Completed" },
            { number: "100K+", label: "Lines of Code" },
            { number: "25+", label: "Technologies" },
            { number: "99%", label: "Client Satisfaction" },
          ].map((stat, index) => (
            <div key={index} className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-red-400">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="relative px-4 md:px-8 lg:px-16 py-20 z-20 font-[ITC]"
      >
        <div className="text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            Let's Work Together
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's discuss your next project
            and create something amazing together.
          </p>
          {/* <Button
            size="lg"
            className="bg-red-600 hover:bg-red-200 hover:text-red-500  px-8 py-4 text-lg font-bold rounded-full transition-all duration-200 hover:scale-105 active:bg-red-200 active:text-red-500"
            onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLScwe_5KT-YFdUsZzZAQromTQpdjl-fKfkLK2qq8a23OeL_oMg/viewform?usp=header")}
          >
            Get In Touch
          </Button> */}

          <Button
            size="lg"
            className="bg-red-600 hover:bg-red-200 hover:text-red-500 px-8 py-4 text-lg font-bold rounded-full transition-all duration-200 hover:scale-105 active:bg-red-200 active:text-red-500 
             animate-bubble"
            onClick={() =>
              window.open(
                "https://docs.google.com/forms/d/e/1FAIpQLScwe_5KT-YFdUsZzZAQromTQpdjl-fKfkLK2qq8a23OeL_oMg/viewform?usp=header"
              )
            }
          >
            Get In Touch
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

// Optimized ProjectCard with reduced animations
const ProjectCard = memo(function ProjectCard({
  project,
  index,
  isHovered,
  onHover,
  onLeave,
}: ProjectCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoaded(true);
  }, []);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
    setImageError(false);
  }, []);

  return (
    <div
      className="relative group"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="relative overflow-hidden rounded-2xl project-card h-full flex flex-col transform transition-transform duration-200 hover:scale-102">
        {/* Card Background */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-200"
          style={{ backgroundColor: project.color }}
        />

        {/* Image - Fixed Height */}
        <div className="relative overflow-hidden h-56 md:h-64 flex-shrink-0">
          <img
            src={
              imageError
                ? "/placeholder.svg?height=400&width=700"
                : project.thumbnail
            }
            alt={project.title}
            className={`w-full h-full object-cover transition-transform duration-200 group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
          {!imageLoaded && <div className="absolute inset-0 bg-gray-800" />}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold border border-gray-600">
              {project.category}
            </span>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-4 right-4">
            <div className="flex items-center space-x-1 bg-green-500/20 backdrop-blur-sm px-2 py-1 rounded-full border border-green-500/30">
              <Star className="w-3 h-3 text-green-400 fill-current" />
              <span className="text-green-400 text-xs font-bold">
                {project.rating.split("%")[0]}%
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="space-y-2 min-h-[4rem]">
              <h3 className="text-xl font-bold group-hover:text-red-400 transition-colors duration-200 line-clamp-2">
                {project.title}
              </h3>
              <div className="flex items-center space-x-3 text-sm text-gray-400">
                <span>{project.year}</span>
                <span>•</span>
                <span>{project.duration}</span>
              </div>
            </div>

            <div className="min-h-[4.5rem]">
              <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                {project.description}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4 min-h-[2rem]">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="bg-gray-800/50 px-2 py-1 rounded text-xs border border-gray-700 hover:border-red-500/50 transition-colors duration-200"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-gray-400 text-xs self-center">
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Simplified Hover Overlay */}
        <div
          className={`absolute inset-0 bg-black/90 backdrop-blur-sm flex flex-col justify-center items-center p-6 transition-all duration-200 ${
            isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">{project.title}</h3>
              <p className="text-gray-300 text-sm line-clamp-4">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="bg-gray-700/50 px-3 py-1 rounded-full text-xs border border-gray-600"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex space-x-3 pt-4">
              <Button
                size="sm"
                className="bg-red-600 hover:bg-red-700 transition-all duration-200"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  if (project.liveUrl) {
                    window.open(project.liveUrl, "_blank");
                  }
                }}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="bg-gray-700 hover:bg-gray-600 transition-all duration-200"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  if (project.githubUrl) {
                    window.open(project.githubUrl, "_blank");
                  }
                }}
              >
                <Github className="w-4 h-4 mr-2" />
                Code
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
