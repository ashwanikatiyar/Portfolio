"use client"
import { useState, useEffect } from "react"
import {
  ArrowLeft,
  MapPin,
  Calendar,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Phone,
  Download,
  Award,
  Code,
  Briefcase,
  GraduationCap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Footer from "../Components/Footer/Footer1"


export default function AboutPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

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

  const experiences = [
    {
      title: "Software Development Engineer 1 (SDE 1)",
      company: "MyTreks.ai",
      location: "Dallas, Texas | Remote",
      period: "Jul 2025 - Present",
      description: [
        "Building and maintaining scalable backend systems using NestJS and user-centric web applications using Next.js and TypeScript",
        "Collaborating with cross-functional teams across time zones to deliver reliable, high-performance solutions",
        "Supporting agile practices through sprint planning, code reviews, and participation in technical architecture discussions",
      ],
      color: "#ff6b6b",
    },
    {
      title: "Full-Stack Developer Intern",
      company: "ValleyAI",
      location: "Boston, MA | Remote",
      period: "Mar 2025 - Present",
      description: [
        "Developed a full-stack web platform using Next.js, Nest.js, PostgreSQL, and Prisma for AI-driven solutions",
        "Implemented authentication with AWS Cognito and serverless architecture using AWS Lambda & Fargate",
        "Optimized database queries with PostgreSQL & Prisma, improving performance for large-scale data operations",
      ],
      color: "#4ecdc4",
    },
    {
      title: "Software Development Engineer (SDE) Intern",
      company: "Digixito Media Pvt Ltd.",
      location: "Noida, UP | On-Site",
      period: "Aug 2023 - Dec 2023",
      description: [
        "Optimized RESTful APIs using Node.js, Nest.js, reducing API latency by 40% (from 150ms to 90ms)",
        "Integrated Redis caching, improving backend performance for 500K+ daily requests",
        "Automated deployment pipelines, reducing release cycles by 20%",
      ],
      color: "#a8e6cf",
    },
  ]

  const projects = [
    {
      title: "Front-Flights",
      category: "Web Development",
      description:
        "Developed a flight booking platform using Nest.js, MongoDB & AWS, processing 1M+ queries/month with 77+ RESTful APIs. Optimized JSON handling, reducing query response time by 35%.",
      technologies: ["Nest.js", "MongoDB", "AWS", "RESTful APIs"],
      url: "#",
    },
    {
      title: "Visitor Management System",
      category: "Machine Learning & Web Development",
      description:
        "Built a secure visitor tracking system with React, Express.js, and MongoDB, integrating OTP authentication, QR check-in, and facial recognition. Automated SMS alerts, reducing manual tracking by 60%.",
      technologies: ["React", "Express.js", "MongoDB", "ML", "QR Code"],
      url: "#",
    },
    {
      title: "Stress Detection",
      category: "NLP, Deep Learning & Web Development",
      description:
        "Developing a speech-based stress detection platform using React.js, Express.js, and MongoDB. Integrated NLP-powered emotion classification into 28 categories with stress estimation.",
      technologies: ["React.js", "Express.js", "MongoDB", "NLP", "Deep Learning"],
      url: "#",
    },
    {
      title: "Fall Detection Alert System",
      category: "Full-Stack Web",
      description:
        "Building a full-stack hospital safety platform using Next.js, Nest.js, PostgreSQL, and AWS to detect patient falls via ML-based camera input. Backend triggers SMS, automated calls, and web alerts for caregivers.",
      technologies: ["Next.js", "Nest.js", "PostgreSQL", "AWS", "ML"],
      url: "#",
    },
  ]

  const skills = {
    "Backend Development": [
      "Nest.js",
      "Express.js",
      "RESTful API",
      "Microservices",
      "WebSockets",
    ],
    "Frontend & UI": ["Next.js", "React.js", "TypeScript", "JavaScript", "HTML", "CSS", "Figma"],
    "AI & Machine Learning": ["Natural Language Processing (NLP)", "Deep Learning", "TensorFlow", "OpenAI APIs"],
    "Cloud & DevOps ( LEARNING STAGE )": [
      "AWS (EC2, S3)",
      "Docker",
      "Kubernetes",
      "CI/CD Pipelines",
      "Git",
      "GitHub Actions",
    ],
    "Database Management": ["PostgreSQL", "MySQL", "MongoDB", "Firebase"],
    "Programming Languages": ["TypeScript","JavaScript", "Java", "Python", "C# and C++"],
    "Game Development ( LEARNING STAGE )" : ["C#" , "Unity 3D" , "Unity 2D" , "Blender3D" , "Physics"]
  }

  return (
    <div className={`netflix-portfolio min-h-screen bg-black text-white overflow-x-hidden ${isLoaded ? "loaded" : ""}`}>
      {/* Header */}
      <header className="fixed top-0 w-full z-40 transition-all duration-300 ease-out ">
        <div
          className="absolute inset-0 backdrop-blur-xl bg-black/20"
          style={{
            opacity: Math.min(scrollY / 100, 0.95),
          }}
        />
        <nav className="relative flex items-center justify-between px-4 md:px-8 lg:px-16 py-4">
          <div className="flex items-center space-x-8">
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-red-500/20 hover:text-pink-600 transition-colors duration-200"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-red-500 text-2xl font-[ITC] font-extrabold tracking-wider">ABOUT</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center font-[ITC]">
                <span className="text-sm font-bold">ASH</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full" />
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden pt-80 sm:pt-0 ">
        <div className="absolute inset-0 z-10 ">
          <div className="relative w-full h-full overflow-hidden">
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(/placeholder.svg?height=1080&width=1920)`,
                transform: `scale(${1 + scrollY * 0.0002}) translateY(${scrollY * 0.3}px)`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </div>
        </div>

        <div className="relative z-20 px-4 md:px-8 lg:px-16 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Profile */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-sm">
                <div className="flex items-center space-x-2 bg-red-600/20 backdrop-blur-sm px-3 py-2 rounded-full border border-red-500/30">
                  <Code className="w-4 h-4 text-red-400" />
                  <span className="text-red-400 font-semibold">SOFTWARE DEVELOPMENT ENGINEER - 1 (SDE)</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black font-[ITC] leading-none tracking-tight">
                <span className="inline-block">ASHWANI</span>
                <br />
                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">
                  KUMAR SINGH 
                </span>
                <span className="inline-block">KATIYAR</span>

              </h1>

              <p className="text-lg md:text-xl text-gray-200 leading-relaxed font-[alata] max-w-2xl">
                Software Engineer specializing in scalable full-stack development using Next.js, Nest.js, and
                TypeScript. Passionate about building robust, user-centric applications and AI-driven solutions.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  className="bg-white text-black font-[alata] hover:bg-gray-200 px-6 py-3 font-bold rounded-full transition-all duration-200 hover:scale-105"
                  onClick={() => window.open("mailto:ashwanikats@gmail.com")}
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Me
                </Button>
                <Button
                  variant="secondary"
                  className="bg-white backdrop-blur-sm font-[alata] font-bold hover:bg-gray-700/50 borde hover:text-emerald-500 border-gray-600 px-6 py-3 rounded-full transition-all duration-200 hover:scale-105"
                  onClick={() => window.open("https://drive.google.com/file/d/1u6MCS5p12JZ5DX_kQkiP7NTh_6MP-111/view?usp=sharing")}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download CV
                </Button>
              </div>

              <div className="flex space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-12 h-12 rounded-full border border-gray-600 hover:border-red-500 transition-all duration-200 hover:scale-110"
                  onClick={() => window.open("https://www.linkedin.com/in/ashwani-sde", "_blank")}
                >
                  <Linkedin className="w-6 h-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-12 h-12 rounded-full border border-gray-600 hover:border-red-500 transition-all duration-200 hover:scale-110"
                  onClick={() => window.open("https://github.com/ashwanikatiyar", "_blank")}
                >
                  <Github className="w-6 h-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-12 h-12 rounded-full border border-gray-600 hover:border-red-500 transition-all duration-200 hover:scale-110"
                  onClick={() => window.open("tel:85XXXXXXXX")}
                >
                  <Phone className="w-6 h-6" />
                </Button>
              </div>
            </div>

            {/* Right Side - Quick Info */}
            <div className="space-y-6">
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4 text-red-400">Quick Info</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span>Noida, India</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <GraduationCap className="w-5 h-5 text-gray-400" />
                    <span>B.Tech in CS with AI & ML</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="w-5 h-5 text-gray-400" />
                    <span>CGPA: 8.00/10.0</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Briefcase className="w-5 h-5 text-gray-400" />
                    <span>1+ Year Experience</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-4 text-center">
                  <div className="text-2xl font-bold text-red-400">50+</div>
                  <div className="text-sm text-gray-400">Projects</div>
                </div>
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-4 text-center">
                  <div className="text-2xl font-bold text-red-400">100K+</div>
                  <div className="text-sm text-gray-400">Lines of Code</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Experience Section */}
      <section className="relative px-4 md:px-8 lg:px-16 py-20 z-20 font-[alata]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Work Experience</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              My professional journey in software development, building scalable solutions and working with cutting-edge
              technologies.
            </p>
          </div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="relative">
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-red-500/30 transition-all duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{exp.title}</h3>
                      <div className="flex items-center space-x-4 text-gray-400 mb-2">
                        <span className="font-semibold text-red-400">{exp.company}</span>
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {exp.location}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Calendar className="w-4 h-4 mr-2" />
                        {exp.period}
                      </div>
                    </div>
                    <div className="w-4 h-4 rounded-full mt-2 lg:mt-0" style={{ backgroundColor: exp.color }} />
                  </div>

                  <ul className="space-y-3">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-300 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="relative px-4 md:px-8 lg:px-16 py-20 z-20 bg-gray-900/20 font-[alata]" id="skills">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Technologies and tools I use to build robust, scalable applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, skillList], index) => (
              <div key={index} className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-red-400 mb-4">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-800/50 px-3 py-1 rounded-full text-sm border border-gray-700 hover:border-red-500/50 transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="relative px-4 md:px-8 lg:px-16 py-20 z-20 font-[alata]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Some of my notable projects that showcase my technical expertise and problem-solving abilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-red-500/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <span className="bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-sm font-semibold">
                      {project.category}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-10 h-10 rounded-full border border-gray-600 hover:border-red-500 transition-all duration-200"
                    onClick={() => window.open(project.url, "_blank")}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>

                <p className="text-gray-300 leading-relaxed mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="bg-gray-800/50 px-2 py-1 rounded text-xs border border-gray-700">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="relative px-4 md:px-8 lg:px-16 py-20 z-20 bg-gray-900/20 font-[alata]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Education</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              My academic background and achievements in computer science and artificial intelligence.
            </p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">
                  B.Tech in Computer Science with Specialization in AI & ML
                </h3>
                <div className="flex items-center space-x-4 text-gray-400 mb-4">
                  <span className="font-semibold text-red-400">Vellore Institute of Technology (VIT), Chennai</span>
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Sep 2021 - Jul 2025
                  </span>
                </div>
                <div className="flex items-center text-gray-400 mb-4">
                  <Award className="w-4 h-4 mr-2" />
                  <span>CGPA: 8.00/10.0</span>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-300">
                    <strong>Key Coursework:</strong> Data Structures & Algorithms, Object-Oriented Programming, Machine
                    Learning, Cloud Computing, Database Management Systems, Distributed Systems
                  </p>
                  <p className="text-gray-300">
                    <strong>Activities:</strong> Participated in 24-hour hackathons focused on web development &
                    AI-driven applications. Held the position of Design Head at Udeshya Club, leading creative
                    initiatives & technical workshops.
                  </p>
                </div>
              </div>
              <div className="mt-6 lg:mt-0 lg:ml-8">
                <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative px-4 md:px-8 lg:px-16 py-20 z-20 font-[ITC]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Work Together</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            I'm always interested in new opportunities and exciting projects. Let's discuss how we can build something
            amazing together.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button
              className="bg-red-600 hover:bg-red-700 px-8 py-4 text-lg font-bold rounded-full transition-all duration-200 hover:scale-105"
              onClick={() => window.open("mailto:ashwanikats@gmail.com")}
            >
              <Mail className="w-5 h-5 mr-2" />
              Get In Touch
            </Button>
            <Button
              variant="secondary"
              className="bg-white backdrop-blur-sm hover:bg-gray-700/50 hover:text-blue-700 border border-gray-600 px-8 py-4 text-lg rounded-full transition-all duration-200 hover:scale-105"
              onClick={() => window.open("https://www.linkedin.com/in/ashwani-sde", "_blank")}
            >
              <Linkedin className="w-5 h-5 mr-2" />
              LinkedIn
            </Button>
          </div>

          <div className="flex justify-center space-x-8 text-gray-400">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>ashwanikats@gmail.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>+91 85XXXXXXXX</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
