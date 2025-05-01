"use client"

import type React from "react"
import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ProjectProps {
  image: string
  title: string
  category: string
  index: number
}

const Project: React.FC<ProjectProps> = ({ image, title, category, index }) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-2xl mb-4 aspect-video">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange-500/50 rounded-2xl transition-all duration-300 z-20"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <span className="inline-block py-1 px-3 rounded-full bg-orange-500/20 text-orange-500 text-xs font-medium mb-2">
            {category}
          </span>
          <h3 className="text-xl font-bold text-white">{title}</h3>
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

  const categories = ["All", "Web", "Mobile", "AI", "Enterprise", "UI/UX"]

  const projects = [
    {
      image: "/placeholder.svg?height=300&width=500",
      title: "E-commerce Platform",
      category: "Web",
    },
    {
      image: "/placeholder.svg?height=300&width=500",
      title: "Healthcare Management System",
      category: "Enterprise",
    },
    {
      image: "/placeholder.svg?height=300&width=500",
      title: "AI-Powered Analytics Dashboard",
      category: "AI",
    },
    {
      image: "/placeholder.svg?height=300&width=500",
      title: "Mobile Banking App",
      category: "Mobile",
    },
    {
      image: "/placeholder.svg?height=300&width=500",
      title: "Real Estate Marketplace",
      category: "Web",
    },
    {
      image: "/placeholder.svg?height=300&width=500",
      title: "Fitness Tracking Platform",
      category: "Mobile",
    },
    {
      image: "/placeholder.svg?height=300&width=500",
      title: "Smart Home Control System",
      category: "IoT",
    },
    {
      image: "/placeholder.svg?height=300&width=500",
      title: "Educational Learning Platform",
      category: "Web",
    },
    {
      image: "/placeholder.svg?height=300&width=500",
      title: "Supply Chain Management",
      category: "Enterprise",
    },
    {
      image: "/placeholder.svg?height=300&width=500",
      title: "Predictive Maintenance Tool",
      category: "AI",
    },
  ]

  const filteredProjects =
    activeCategory === "All" ? projects : projects.filter((project) => project.category === activeCategory)

  const nextSlide = () => {
    if (currentSlide < Math.ceil(filteredProjects.length / 3) - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      setCurrentSlide(0)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    } else {
      setCurrentSlide(Math.ceil(filteredProjects.length / 3) - 1)
    }
  }

  return (
    <section id="projects" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 left-0 w-96 h-96 rounded-full bg-orange-500/5 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-64 h-64 rounded-full bg-orange-500/10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-orange-500/20 text-orange-500 text-sm font-medium">
              Our Work
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400"
          >
            We've successfully delivered over 50+ projects for clients across various industries. Here's a selection of
            our recent work.
          </motion.p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category)
                  setCurrentSlide(0)
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-orange-500 text-white"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              animate={{
                x: `-${currentSlide * 100}%`,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex"
            >
              {filteredProjects.map((project, index) => (
                <div key={index} className="min-w-full md:min-w-[33.333%] px-2">
                  <Project image={project.image} title={project.title} category={project.category} index={index} />
                </div>
              ))}
            </motion.div>
          </div>

          {filteredProjects.length > 3 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-orange-500 transition-colors z-20"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-orange-500 transition-colors z-20"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>

        <div className="flex justify-center mt-10">
          <a
            href="#contact"
            className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-medium rounded-full transition-all duration-300 border border-white/10 hover:border-orange-500/50"
          >
            Start Your Project
          </a>
        </div>
      </div>
    </section>
  )
}

export default Projects
