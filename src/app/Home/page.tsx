"use client"

import { useState, useRef, useEffect, useCallback, useMemo } from "react"
import { Play, Info, VolumeX, Volume2, Github, ExternalLink, Star, Zap, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Project {
  id: string
  title: string
  description: string
  year: string
  duration: string
  rating: string
  category: string
  thumbnail: string
  video?: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
  color: string
}

const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution built with Next.js, featuring real-time inventory management, secure payment processing, and advanced analytics dashboard with AI-powered recommendations.",
    year: "2024",
    duration: "3 months",
    rating: "95% Match",
    category: "Web Development",
    thumbnail: "/placeholder.svg?height=400&width=700",
    // Using a reliable video source that works in browsers
    video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "AI/ML"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
    color: "#ff6b6b",
  },
  {
    id: "2",
    title: "AI-Powered Chat App",
    description:
      "Real-time messaging application with AI-powered features including smart replies, sentiment analysis, automated moderation, and voice-to-text capabilities.",
    year: "2024",
    duration: "2 months",
    rating: "88% Match",
    category: "AI/ML",
    thumbnail: "/placeholder.svg?height=400&width=700",
    technologies: ["React", "Node.js", "OpenAI", "Socket.io", "WebRTC"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    color: "#4ecdc4",
  },
  {
    id: "3",
    title: "3D Portfolio Experience",
    description:
      "An immersive 3D portfolio website showcasing creative projects with interactive animations, physics simulations, and WebGL-powered visual effects.",
    year: "2024",
    duration: "1 month",
    rating: "92% Match",
    category: "3D/Animation",
    thumbnail: "/placeholder.svg?height=400&width=700",
    technologies: ["Three.js", "React", "GSAP", "Blender", "WebGL"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    color: "#a8e6cf",
  },
  {
    id: "4",
    title: "Mobile Fitness App",
    description:
      "Cross-platform fitness tracking application with workout plans, nutrition tracking, social features, and AR-powered form correction.",
    year: "2023",
    duration: "4 months",
    rating: "90% Match",
    category: "Mobile Development",
    thumbnail: "/placeholder.svg?height=400&width=700",
    technologies: ["React Native", "Firebase", "Redux", "Node.js", "AR"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    color: "#ffd93d",
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
    thumbnail: "/placeholder.svg?height=400&width=700",
    technologies: ["D3.js", "Python", "FastAPI", "PostgreSQL", "ML"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    color: "#ff8a80",
  },
]

const popularProjects = projects.slice(0, 3)
const personalProjects = projects.slice(2, 5)
const featuredProject = projects[0]

// Optimized particle system
const useParticleSystem = (isEnabled: boolean) => {
  const particlesRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const particlesArrayRef = useRef<any[]>([])

  useEffect(() => {
    if (!isEnabled) return

    const canvas = particlesRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()

    // Optimize particle count based on device performance
    const isMobile = window.innerWidth < 768
    const particleCount = isMobile ? 20 : 50

    // Initialize particles only once
    if (particlesArrayRef.current.length === 0) {
      for (let i = 0; i < particleCount; i++) {
        particlesArrayRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
          color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`,
        })
      }
    }

    let lastTime = 0
    const animate = (currentTime: number) => {
      if (currentTime - lastTime < 16) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }
      lastTime = currentTime

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesArrayRef.current.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.opacity
        ctx.fill()

        // Optimized connection drawing - only check nearby particles
        if (index % 3 === 0) {
          particlesArrayRef.current.slice(index + 1, index + 4).forEach((otherParticle) => {
            const dx = particle.x - otherParticle.x
            const dy = particle.y - otherParticle.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 80) {
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(otherParticle.x, otherParticle.y)
              ctx.strokeStyle = particle.color
              ctx.globalAlpha = 0.1
              ctx.stroke()
            }
          })
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    const handleResize = () => {
      resizeCanvas()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", handleResize)
    }
  }, [isEnabled])

  return particlesRef
}

// Debounced mouse tracking
const useMouseTracking = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }, [])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    const debouncedMouseMove = (e: MouseEvent) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => handleMouseMove(e), 10)
    }

    window.addEventListener("mousemove", debouncedMouseMove)
    return () => {
      window.removeEventListener("mousemove", debouncedMouseMove)
      clearTimeout(timeoutId)
    }
  }, [handleMouseMove])

  return mousePosition
}

// Optimized scroll tracking
const useScrollTracking = () => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return scrollY
}

export default function NetflixPortfolio() {
  const [isMuted, setIsMuted] = useState(true)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [videoError, setVideoError] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  // Optimized hooks
  const mousePosition = useMouseTracking()
  const scrollY = useScrollTracking()
  const particlesRef = useParticleSystem(!reducedMotion && isLoaded)

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Enhanced video functionality with better error handling
  useEffect(() => {
    const video = videoRef.current
    if (!video || !featuredProject.video) return

    console.log("Setting up video with URL:", featuredProject.video)

    const handleLoadedMetadata = () => {
      console.log("Video metadata loaded")
      setIsVideoLoaded(true)
    }

    const handleCanPlay = () => {
      console.log("Video can play")
      setIsVideoLoaded(true)

      // Try to play the video
      const playVideo = async () => {
        try {
          await video.play()
          console.log("Video started playing successfully")
        } catch (error) {
          console.warn("Autoplay failed, trying muted:", error)
          // If autoplay fails, ensure it's muted and try again
          video.muted = true
          setIsMuted(true)
          try {
            await video.play()
            console.log("Video started playing muted")
          } catch (mutedError) {
            console.error("Video failed to play even when muted:", mutedError)
            setVideoError(true)
          }
        }
      }

      playVideo()
    }

    const handleError = (e: any) => {
      console.error("Video error:", e)
      console.error("Video error details:", video.error)
      setVideoError(true)
      setIsVideoLoaded(false)
    }

    const handleLoadStart = () => {
      console.log("Video loading started")
      setVideoError(false)
    }

    const handleProgress = () => {
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1)
        const duration = video.duration
        if (duration > 0) {
          console.log(`Video buffered: ${((bufferedEnd / duration) * 100).toFixed(1)}%`)
        }
      }
    }

    // Set video properties
    video.muted = isMuted
    video.playsInline = true
    video.loop = true
    video.preload = "metadata"
    video.crossOrigin = "anonymous"

    // Add event listeners
    video.addEventListener("loadedmetadata", handleLoadedMetadata)
    video.addEventListener("canplay", handleCanPlay)
    video.addEventListener("error", handleError)
    video.addEventListener("loadstart", handleLoadStart)
    video.addEventListener("progress", handleProgress)

    // Set the video source and load
    video.src = featuredProject.video
    video.load()

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
      video.removeEventListener("canplay", handleCanPlay)
      video.removeEventListener("error", handleError)
      video.removeEventListener("loadstart", handleLoadStart)
      video.removeEventListener("progress", handleProgress)
    }
  }, [featuredProject.video])

  // Handle mute state changes
  useEffect(() => {
    const video = videoRef.current
    if (video && isVideoLoaded && !videoError) {
      video.muted = isMuted
      console.log("Video muted state changed to:", isMuted)
    }
  }, [isMuted, isVideoLoaded, videoError])

  const toggleMute = useCallback(async () => {
    const video = videoRef.current
    if (!video || videoError) {
      console.warn("Cannot toggle mute: video not available or error occurred")
      return
    }

    const newMutedState = !isMuted
    console.log("Toggling mute to:", newMutedState)

    try {
      video.muted = newMutedState
      setIsMuted(newMutedState)

      // If unmuting and video is paused, try to play
      if (!newMutedState && video.paused) {
        await video.play()
        console.log("Video resumed after unmuting")
      }
    } catch (error) {
      console.error("Error toggling mute:", error)
    }
  }, [isMuted, videoError])

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev)
  }, [])

  // Memoized navigation items
  const navigationItems = useMemo(
    () => [
      { name: "Home", href: "#home" },
      { name: "Projects", href: "#projects" },
      { name: "About", href: "#about" },
      { name: "Skills", href: "#skills" },
      { name: "Contact", href: "#contact" },
    ],
    [],
  )

  // Smooth scroll function
  const handleNavClick = useCallback((href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }, [])

  // Manual play function for testing
  const handleManualPlay = useCallback(async () => {
    const video = videoRef.current
    if (!video) return

    try {
      if (video.paused) {
        await video.play()
        console.log("Manual play successful")
      } else {
        video.pause()
        console.log("Video paused")
      }
    } catch (error) {
      console.error("Manual play failed:", error)
    }
  }, [])

  return (
    <div className={`netflix-portfolio min-h-screen bg-black text-white overflow-x-hidden ${isLoaded ? "loaded" : ""}`}>
      {/* Debug Info - Remove in production */}
      <div className="fixed top-20 left-4 z-50 bg-black/80 text-white p-2 rounded text-xs">
        <div>Video Loaded: {isVideoLoaded ? "✅" : "❌"}</div>
        <div>Video Error: {videoError ? "❌" : "✅"}</div>
        <div>Muted: {isMuted ? "🔇" : "🔊"}</div>
        <button onClick={handleManualPlay} className="bg-red-600 px-2 py-1 rounded mt-1">
          Manual Play/Pause
        </button>
      </div>

      {/* Optimized Particle Canvas */}
      {!reducedMotion && (
        <canvas
          ref={particlesRef}
          className="fixed inset-0 pointer-events-none z-0"
          style={{ opacity: 0.3 }}
          aria-hidden="true"
        />
      )}

      {/* Optimized Floating Cursor - Desktop Only */}
      {!reducedMotion && (
        <div
          className="fixed w-4 h-4 bg-red-500 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-100 ease-out hidden lg:block"
          style={{
            left: mousePosition.x - 8,
            top: mousePosition.y - 8,
            transform: hoveredCard ? "scale(2)" : "scale(1)",
          }}
          aria-hidden="true"
        />
      )}

      {/* Header */}
      <header className="fixed top-0 w-full z-40 transition-all duration-500 ease-out">
        <div
          className="absolute inset-0 backdrop-blur-xl bg-black/20"
          style={{
            opacity: Math.min(scrollY / 100, 0.95),
          }}
        />
        <nav className="relative flex items-center justify-between px-4 md:px-8 lg:px-16 py-4">
          <div className="flex items-center space-x-8">
            <h1 className="text-red-500 text-2xl font-bold tracking-wider animate-glow">PORTFOLIO</h1>
            <ul className="hidden md:flex space-x-6">
              {navigationItems.map((item, index) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className="relative hover:text-red-400 transition-all duration-300 group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:inline-flex hover:bg-red-500/20 transition-all duration-300"
              onClick={() => handleNavClick("#contact")}
            >
              <Star className="w-4 h-4 mr-2" />
              Hire Me
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>

            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse-glow">
                <span className="text-sm font-bold">JD</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping" />
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-t border-gray-800 transition-all duration-300 ${
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
              <Button className="w-full bg-red-600 hover:bg-red-700" onClick={() => handleNavClick("#contact")}>
                <Star className="w-4 h-4 mr-2" />
                Hire Me
              </Button>
            </li>
          </ul>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" ref={heroRef} className="relative h-screen flex items-center overflow-hidden">
        {/* 3D Background Elements - Desktop Only */}
        {!reducedMotion && (
          <div className="absolute inset-0 z-0 hidden lg:block">
            <div className="floating-shapes">
              <div className="shape shape-1" />
              <div className="shape shape-2" />
              <div className="shape shape-3" />
            </div>
          </div>
        )}

        {/* Hero Background with Video */}
        <div className="absolute inset-0 z-10">
          <div className="relative w-full h-full overflow-hidden">
            {/* Video Background */}
            {featuredProject.video && !videoError && (
              <video
                ref={videoRef}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  isVideoLoaded ? "opacity-100" : "opacity-0"
                }`}
                muted={isMuted}
                playsInline
                loop
                style={{
                  transform: !reducedMotion ? `scale(${1 + scrollY * 0.0005}) translateY(${scrollY * 0.5}px)` : "none",
                }}
              >
                <source src={featuredProject.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}

            {/* Fallback Image */}
            <div
              className={`absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-1000 ${
                isVideoLoaded && !videoError ? "opacity-0" : "opacity-100"
              }`}
              style={{
                backgroundImage: `url(${featuredProject.thumbnail})`,
                transform: !reducedMotion ? `scale(${1 + scrollY * 0.0005}) translateY(${scrollY * 0.5}px)` : "none",
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 px-4 md:px-8 lg:px-16 max-w-4xl">
          <div className="space-y-6 hero-content">
            <div className="flex items-center space-x-3 text-sm">
              <div className="flex items-center space-x-2 bg-red-600/20 backdrop-blur-sm px-3 py-2 rounded-full border border-red-500/30">
                <Zap className="w-4 h-4 text-red-400 animate-pulse" />
                <span className="text-red-400 font-semibold">FEATURED PROJECT</span>
              </div>
              <span className="text-gray-300 uppercase tracking-wider">{featuredProject.category}</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-8xl font-black leading-none tracking-tight">
              <span className="inline-block animate-slide-up" style={{ animationDelay: "0.2s" }}>
                {featuredProject.title.split(" ")[0]}
              </span>
              <br />
              <span
                className="inline-block animate-slide-up text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500"
                style={{ animationDelay: "0.4s" }}
              >
                {featuredProject.title.split(" ").slice(1).join(" ")}
              </span>
            </h1>

            <div className="flex items-center space-x-6 text-sm animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-400 font-bold">{featuredProject.rating}</span>
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

            <p
              className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl animate-fade-in"
              style={{ animationDelay: "0.8s" }}
            >
              {featuredProject.description}
            </p>

            <div className="flex flex-wrap gap-2 animate-fade-in" style={{ animationDelay: "1s" }}>
              {featuredProject.technologies.map((tech, index) => (
                <span
                  key={tech}
                  className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm px-3 py-2 rounded-full text-sm border border-gray-600/30 hover:border-red-500/50 transition-all duration-300"
                  style={{ animationDelay: `${1.2 + index * 0.1}s` }}
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center space-x-4 pt-6 animate-fade-in" style={{ animationDelay: "1.4s" }}>
              <Button
                className="bg-white text-black hover:bg-gray-200 px-8 py-4 text-lg font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                onClick={() => window.open(featuredProject.liveUrl, "_blank")}
              >
                <Play className="w-6 h-6 mr-3 fill-current" />
                View Project
              </Button>
              <Button
                variant="secondary"
                className="bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/50 border border-gray-600 px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105"
                onClick={() => handleNavClick("#projects")}
              >
                <Info className="w-6 h-6 mr-3" />
                More Info
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 rounded-full border border-gray-600 hover:border-red-500 transition-all duration-300 hover:scale-110"
                onClick={() => window.open(featuredProject.githubUrl, "_blank")}
                aria-label="View on GitHub"
              >
                <Github className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Action Buttons */}
        <div className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-30 space-y-4">
          <Button
            onClick={toggleMute}
            variant="ghost"
            size="icon"
            className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/30 backdrop-blur-sm border border-gray-600 hover:border-red-500 transition-all duration-300 hover:scale-110 group"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
            disabled={videoError}
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
            className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/30 backdrop-blur-sm border border-gray-600 hover:border-red-500 transition-all duration-300 hover:scale-110 group"
            onClick={() => window.open(featuredProject.liveUrl, "_blank")}
            aria-label="Open project in new tab"
          >
            <ExternalLink className="w-5 h-5 md:w-6 md:h-6 group-hover:text-red-400 transition-colors" />
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
          <div className="flex flex-col items-center space-y-2 animate-bounce">
            <span className="text-sm text-gray-400 uppercase tracking-wider">Scroll</span>
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Projects Section */}
      <section id="projects" className="relative px-4 md:px-8 lg:px-16 py-20 z-20">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2 animate-slide-up">Popular Projects</h2>
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
              onHover={() => setHoveredCard(project.id)}
              onLeave={() => setHoveredCard(null)}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </section>

      {/* Personal Projects Section */}
      <section className="relative px-4 md:px-8 lg:px-16 py-20 z-20">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2 animate-slide-up">Personal Projects</h2>
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
              onHover={() => setHoveredCard(project.id)}
              onLeave={() => setHoveredCard(null)}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section id="about" className="relative px-4 md:px-8 lg:px-16 py-20 z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: "50+", label: "Projects Completed" },
            { number: "100K+", label: "Lines of Code" },
            { number: "25+", label: "Technologies" },
            { number: "99%", label: "Client Satisfaction" },
          ].map((stat, index) => (
            <div key={index} className="space-y-2 animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="text-3xl md:text-4xl font-bold text-red-400">{stat.number}</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative px-4 md:px-8 lg:px-16 py-20 z-20">
        <div className="text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">Let's Work Together</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's discuss your next project and create something amazing together.
          </p>
          <Button
            size="lg"
            className="bg-red-600 hover:bg-red-700 px-8 py-4 text-lg font-bold rounded-full transition-all duration-300 hover:scale-105"
          >
            Get In Touch
          </Button>
        </div>
      </section>
    </div>
  )
}

interface ProjectCardProps {
  project: Project
  index: number
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
  reducedMotion: boolean
}

function ProjectCard({ project, index, isHovered, onHover, onLeave, reducedMotion }: ProjectCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div
      className="relative group cursor-pointer animate-fade-in"
      style={{ animationDelay: `${index * 0.2}s` }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div
        className={`relative overflow-hidden rounded-2xl transition-all duration-500 project-card h-full flex flex-col ${
          !reducedMotion ? "transform group-hover:scale-105 group-hover:z-10" : ""
        }`}
      >
        {/* Card Background */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
          style={{ backgroundColor: project.color }}
        />

        {/* Image - Fixed Height */}
        <div className="relative overflow-hidden h-56 md:h-64 flex-shrink-0">
          <img
            src={project.thumbnail || "/placeholder.svg"}
            alt={project.title}
            className={`w-full h-full object-cover transition-all duration-700 ${
              !reducedMotion ? "group-hover:scale-110" : ""
            } ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          {!imageLoaded && <div className="absolute inset-0 bg-gray-800 animate-pulse" />}
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
              <span className="text-green-400 text-xs font-bold">{project.rating.split("%")[0]}%</span>
            </div>
          </div>
        </div>

        {/* Content - Flexible Height with Fixed Structure */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Title and Meta - Fixed Height */}
            <div className="space-y-2 min-h-[4rem]">
              <h3 className="text-xl font-bold group-hover:text-red-400 transition-colors duration-300 line-clamp-2">
                {project.title}
              </h3>
              <div className="flex items-center space-x-3 text-sm text-gray-400">
                <span>{project.year}</span>
                <span>•</span>
                <span>{project.duration}</span>
              </div>
            </div>

            {/* Description - Fixed Height */}
            <div className="min-h-[4.5rem]">
              <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">{project.description}</p>
            </div>
          </div>

          {/* Technologies - Fixed Height */}
          <div className="flex flex-wrap gap-2 mt-4 min-h-[2rem]">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="bg-gray-800/50 px-2 py-1 rounded text-xs border border-gray-700 hover:border-red-500/50 transition-colors duration-300"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-gray-400 text-xs self-center">+{project.technologies.length - 3} more</span>
            )}
          </div>
        </div>

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 bg-black/90 backdrop-blur-sm flex flex-col justify-center items-center p-6 transition-all duration-500 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
          }`}
        >
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">{project.title}</h3>
              <p className="text-gray-300 text-sm line-clamp-4">{project.description}</p>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="bg-gray-700/50 px-3 py-1 rounded-full text-xs border border-gray-600">
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex space-x-3 pt-4">
              <Button
                size="sm"
                className="bg-red-600 hover:bg-red-700 transition-all duration-300 hover:scale-105"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation()
                  if (project.liveUrl) {
                    window.open(project.liveUrl, "_blank")
                  }
                }}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="bg-gray-700 hover:bg-gray-600 transition-all duration-300 hover:scale-105"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation()
                  
                  if (project.githubUrl) {
                    window.open(project.githubUrl, "_blank")
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
  )
}
