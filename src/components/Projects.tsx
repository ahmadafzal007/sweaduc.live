"use client"

import type React from "react"
import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Globe, Youtube, ArrowRight } from "lucide-react"

interface ProjectProps {
  image: string
  title: string
  description: string
  category: string
  index: number
  url?: string
  videoUrl?: string
  technologies?: string[]
}

const Project: React.FC<ProjectProps> = ({
  image,
  title,
  description,
  category,
  index,
  url,
  videoUrl,
  technologies,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-full bg-black/40 backdrop-blur-sm border-t border-l border-r border-white/10 transition-all duration-300 hover:border-orange-500/20 flex flex-col">
        {/* Image Container */}
        <div className="relative overflow-hidden aspect-[16/9]">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 opacity-80"></div>

          {/* Category Tag */}
          <div className="absolute top-0 left-0 z-20">
            <span className="inline-block py-1 px-3 bg-orange-500 text-white text-[10px] uppercase tracking-wider font-medium">
              {category}
            </span>
          </div>

          {/* Project Links */}
          <div className="absolute top-0 right-0 z-20 p-3 flex items-center gap-2">
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Visit website"
              >
                <Globe size={12} className="text-white" />
              </a>
            )}
            {videoUrl && (
              <a
                href={videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Watch video"
              >
                <Youtube size={12} className="text-white" />
              </a>
            )}
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
            <h3 className="text-lg font-bold text-white group-hover:text-orange-500 transition-colors duration-300 line-clamp-1">
              {title}
            </h3>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-4 flex flex-col flex-grow border-b border-white/10 group-hover:border-orange-500/20 transition-colors duration-300">
          <p className="text-gray-400 text-sm line-clamp-3 mb-4">{description}</p>

          {/* Technologies */}
          {technologies && technologies.length > 0 && (
            <div className="mt-auto">
              <div className="flex flex-wrap gap-1.5">
                {technologies.slice(0, 4).map((tech, i) => (
                  <span
                    key={i}
                    className="text-[10px] py-0.5 px-1.5 bg-white/5 text-gray-400 border-l border-orange-500/30"
                  >
                    {tech}
                  </span>
                ))}
                {technologies.length > 4 && (
                  <span className="text-[10px] py-0.5 px-1.5 bg-white/5 text-gray-400 border-l border-orange-500/30">
                    +{technologies.length - 4}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* View Project Button */}
          <motion.div
            className="mt-4 self-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <a href={url || videoUrl || "#"} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs text-orange-500 group/link">
              <span className="mr-2">View Project</span>
              <span className="w-5 h-5 flex items-center justify-center bg-orange-500/10 group-hover/link:bg-orange-500 group-hover/link:text-white transition-all duration-300">
                <ArrowRight size={10} />
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

const FeaturedProject: React.FC<ProjectProps> = ({
  image,
  title,
  description,
  category,
  url,
  videoUrl,
  technologies,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 hover:border-orange-500/20 transition-all duration-500">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative overflow-hidden">
            <motion.img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.03 : 1 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/90 hidden lg:block"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 lg:hidden"></div>

            {/* Category Tag */}
            <div className="absolute top-0 left-0 z-20">
              <span className="inline-block py-1 px-3 bg-orange-500 text-white text-xs uppercase tracking-wider font-medium">
                {category}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 lg:p-8 flex flex-col justify-between relative">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-white">{title}</h2>
              <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
            </div>

            <div className="mt-8">
              {technologies && technologies.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-xs uppercase tracking-wider mb-3 text-white/50">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs py-0.5 px-2 bg-white/5 text-gray-300 border-l border-orange-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-4 mt-4">
                {url && (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-white hover:text-orange-500 transition-colors group/btn"
                  >
                    <div className="w-8 h-8 bg-white/5 flex items-center justify-center group-hover/btn:bg-orange-500/20 transition-colors">
                      <Globe size={14} className="group-hover/btn:text-orange-500 transition-colors" />
                    </div>
                    <span>Visit Website</span>
                  </a>
                )}
                {videoUrl && (
                  <a
                    href={videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-white hover:text-orange-500 transition-colors group/btn"
                  >
                    <div className="w-8 h-8 bg-white/5 flex items-center justify-center group-hover/btn:bg-orange-500/20 transition-colors">
                      <Youtube size={14} className="group-hover/btn:text-orange-500 transition-colors" />
                    </div>
                    <span>Watch Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const Projects: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [activeCategory, setActiveCategory] = useState("All")
  const [currentSlide, setCurrentSlide] = useState(0)

  // Removed Healthcare category and added Mobile instead
  const categories = ["All", "AI", "E-commerce", "Web", "Mobile"]

  const featuredProjects = [
    {
      image: "/projects/dcm thumbnail.jpg",
      title: "AI-Based DICOM Viewer",
      description: "A powerful 2D and 3D DICOM viewer that integrates AI-based diagnostics for CXR, mammograms, CT scans, and brain MRIs. It leverages a fine-tuned visual language model to assist healthcare specialists with intelligent, query-based diagnostic support.",
      category: "AI", // Changed from Healthcare to AI
      url: "https://midl.comsats.edu.pk/",
      technologies: ["React", "TensorFlow", "Python", "WebGL", "AI Vision Models", "Speech Recognition"],
    },
    {
      image: "/projects/medtalk thumbnail.png",
      title: "MedTalk",
      description: "An innovative AI platform revolutionizing diagnosis through generative AI. Features intelligent disease-focused modules that detect conditions related to lungs, kidneys, and heart using visual prompting with sophisticated image recognition to enhance analysis of X-rays, ECGs, and other medical scans.",
      category: "AI", // Changed from Healthcare to AI
      videoUrl: "https://www.youtube.com/watch?v=ZIXDtovuW0o",
      technologies: ["React", "TensorFlow.js", "Node.js", "MongoDB", "AI/ML", "Computer Vision"],
    },
    {
      image: "/projects/ntuc thumbnail.png",
      title: "NTUC LearningHub 3D Avatar Chatbot",
      description: "A cutting-edge 3D avatar-based custom chatbot that offers an engaging and interactive user experience. The system features advanced speech-to-speech and text-to-speech communication capabilities to facilitate natural conversations with users.",
      category: "AI",
      url: "https://ntuclearninghub.vercel.app/",
      technologies: ["Next.js", "Three.js", "WebGL", "Speech Recognition", "OpenAI", "3D Modeling"],
    },
    {
      image: "/projects/nawalah thumbnail.png",
      title: "Nawalah Platform",
      description: "An innovative web platform addressing food wastage by connecting restaurants, grocery stores, welfare organizations, and customers. The ecosystem promotes sustainability by ensuring quality food and goods reach communities in need through a streamlined and efficient process.",
      category: "E-commerce",
      url: "https://nawalah.com/",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe", "GIS Mapping"],
    },
    {
      image: "/projects/meta thumbnail.png",
      title: "Meta Platform",
      description: "A feature-rich marketplace application built for an Australia-based client, enabling users to buy, sell, or rent properties, vehicles, electronics, and home décor. The platform supports in-app chat, advanced search and filtering, and admin-controlled ad featuring.",
      category: "E-commerce",
      url: "http://metaplatform.com.au/",
      technologies: ["React Native", "Node.js", "MongoDB", "Firebase", "AWS", "Payment Gateway"],
    },
    {
      image: "/projects/eft thumbnail.png",
      title: "EFT Therapist",
      description: "A Large Language Model (LLM)-powered Retrieval-Augmented Generation (RAG) application developed for a UK-based organization to support individuals coping with anxiety and depression. The chatbot guides users through emotional freedom techniques (tapping therapy).",
      category: "AI",
      url: "https://efttherapistai.vercel.app/",
      technologies: ["Next.js", "OpenAI", "RAG", "Vector Search", "Vercel AI SDK", "TailwindCSS"],
    },
    {
      image: "/projects/fsd thumbnail.png",
      title: "Five Star Auto Detailing",
      description: "A sleek, modern portfolio website developed for an Australian auto detailing business to boost its digital presence. The site showcases the client's services with clean UI/UX design following contemporary web development standards for a professional online identity.",
      category: "Web",
      url: "https://five-star-autodetailing.vercel.app/",
      technologies: ["Next.js", "TailwindCSS", "Framer Motion", "Responsive Design", "SEO Optimization"],
    }
  ]

  // Filter featured projects based on active category
  const filteredFeaturedProjects =
    activeCategory === "All"
      ? featuredProjects
      : featuredProjects.filter((project) => project.category === activeCategory)

  // Dynamically adjust projects per page based on screen size
  const projectsPerPage = 6
  const totalPages = Math.max(1, Math.ceil((filteredFeaturedProjects.length - 1) / projectsPerPage)) // Subtract 1 for featured project

  // Get projects for current page, excluding the featured project
  const currentPageProjects = filteredFeaturedProjects.length > 1 
    ? filteredFeaturedProjects
        .slice(1)
        .slice(currentSlide * projectsPerPage, currentSlide * projectsPerPage + projectsPerPage)
    : []

  const nextSlide = () => {
    if (currentSlide < totalPages - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      setCurrentSlide(0)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    } else {
      setCurrentSlide(totalPages - 1)
    }
  }

  return (
    <section id="projects" className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 left-0 w-96 h-96 rounded-full bg-orange-500/5 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-64 h-64 rounded-full bg-orange-500/10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <span className="inline-block py-1 px-3 bg-orange-500/10 border-l-2 border-orange-500 text-orange-500 text-xs uppercase tracking-wider font-medium">
              Our Work
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-sm md:text-base"
          >
            We've successfully delivered innovative solutions across various industries. Here's a showcase of our most
            impactful work.
          </motion.p>
        </div>

        {/* Category Filter - Scrollable on mobile */}
        <div className="flex justify-center mb-10 md:mb-12 overflow-x-auto pb-2 hide-scrollbar">
          <motion.div
            className="inline-flex bg-black/40 backdrop-blur-sm border border-white/10 p-1"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category)
                  setCurrentSlide(0)
                }}
                className={`px-3 sm:px-4 py-2 text-xs whitespace-nowrap font-medium transition-all duration-300 ${
                  activeCategory === category ? "bg-orange-500 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Spotlight Project - Always show the first filtered project in large format */}
        {filteredFeaturedProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-10 md:mb-16"
          >
            <FeaturedProject
              image={filteredFeaturedProjects[0].image}
              title={filteredFeaturedProjects[0].title}
              description={filteredFeaturedProjects[0].description}
              category={filteredFeaturedProjects[0].category}
              index={0}
              url={filteredFeaturedProjects[0].url}
              videoUrl={filteredFeaturedProjects[0].videoUrl}
              technologies={filteredFeaturedProjects[0].technologies}
            />
          </motion.div>
        )}

        {/* Project Grid - Show remaining projects in a grid */}
        {filteredFeaturedProjects.length > 1 && (
          <div className="relative mb-12 md:mb-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
              >
                {currentPageProjects.map((project, index) => (
                  <Project
                    key={`${project.title}-${index}`}
                    image={project.image}
                    title={project.title}
                    description={project.description}
                    category={project.category}
                    index={index}
                    url={project.url}
                    videoUrl={project.videoUrl}
                    technologies={project.technologies}
                  />
                ))}
              </motion.div>
            </AnimatePresence>

            {totalPages > 1 && (
              <div className="flex justify-center mt-10 md:mt-12 gap-4 md:gap-6">
                <button
                  onClick={prevSlide}
                  className="w-8 h-8 md:w-10 md:h-10 border border-white/10 flex items-center justify-center hover:border-orange-500/50 hover:text-orange-500 transition-colors"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={16} className="md:size-18" />
                </button>

                <div className="flex items-center gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`w-2 h-2 transition-all duration-300 ${
                        currentSlide === i ? "bg-orange-500 w-6" : "bg-white/20"
                      }`}
                      aria-label={`Go to page ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextSlide}
                  className="w-8 h-8 md:w-10 md:h-10 border border-white/10 flex items-center justify-center hover:border-orange-500/50 hover:text-orange-500 transition-colors"
                  aria-label="Next page"
                >
                  <ChevronRight size={16} className="md:size-18" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Call to Action */}
        <div className="flex justify-center mt-10 md:mt-16">
          <a
            href="#contact"
            className="group relative overflow-hidden px-6 sm:px-8 py-3 bg-black border border-orange-500/30 hover:border-orange-500 text-white font-medium transition-all duration-300 text-sm md:text-base"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Your Project
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
              >
                <ArrowRight size={16} />
              </motion.span>
            </span>
            <motion.span
              className="absolute inset-0 bg-orange-500 z-0"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </a>
        </div>
      </div>

      {/* CSS for hiding scrollbar but allowing scroll */}
      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;  /* Chrome, Safari, Opera */
        }
      `}</style>
    </section>
  )
}

export default Projects
