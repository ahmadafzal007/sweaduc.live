"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronRight } from "lucide-react"

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isScrolledFar, setIsScrolledFar] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const { scrollYProgress, scrollY } = useScroll()
  const navOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1])

  // Header background opacity based on scroll
  const headerBgOpacity = useTransform(scrollY, [0, 100, 200], [0, 0.85, 0.95])

  useEffect(() => {
    const handleScroll = () => {
      // Set basic scroll state
      setIsScrolled(window.scrollY > 20)

      // Set far scroll state for additional effects
      setIsScrolledFar(window.scrollY > 300)

      // Update active section based on scroll position
      const sections = ["home", "services", "team", "projects", "contact"]

      // Find the current section in view
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (!element) return false

        const rect = element.getBoundingClientRect()
        // Adjust the detection area to be more accurate
        const topThreshold = 100
        const bottomThreshold = window.innerHeight / 3

        return (rect.top <= topThreshold && rect.bottom >= 0) || (rect.top > 0 && rect.top < bottomThreshold)
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    // Initial check
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Team", href: "#team" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300`}
      >
        <div className={`container mx-auto px-4 md:px-8  `}>
          <div className={`relative  ${isScrolled ? "py-6 sm:py-3.5" : "py-8 sm:py-5"}`}>
            {/* Backdrop blur effect with dynamic opacity */}
            <motion.div
              className={`absolute  inset-0 -z-10 backdrop-blur-md border-b border-white/5`}
              style={{
                backgroundColor: `rgba(5, 5, 16, ${headerBgOpacity.get()})`,
                boxShadow: isScrolledFar ? "0 4px 30px rgba(0, 0, 0, 0.1)" : "none",
              }}
            />

            <div className="flex justify-between items-center">
              {/* Logo - shrinks slightly on scroll */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center"
              >
                {/* Logo Mark */}
                <div className="mr-3 relative">
                  <motion.div
                    className={`rounded-sm bg-gradient-to-br from-blue-500 to-navy-700 flex items-center justify-center relative overflow-hidden shadow-lg shadow-blue-500/20 transition-all duration-300 ${
                      isScrolledFar ? "w-9 h-9" : "w-10 h-10"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span
                      className={`text-white font-bold transition-all duration-300 ${
                        isScrolledFar ? "text-lg" : "text-xl"
                      } relative z-10`}
                    >
                      S
                    </span>
                    {/* Animated gradient overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-tr from-blue-400/30 to-transparent"
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    />
                  </motion.div>
                </div>

                {/* Brand Name - shrinks slightly on scroll */}
                <div
                  className={`flex font-bold transition-all duration-300 ${isScrolledFar ? "text-xl sm:text-2xl" : "text-2xl"}`}
                >
                  {/* "swea" in blue */}
                  <div className="text-blue-400">swea</div>
                  {/* "duc" in white */}
                  <div className="text-white">duc</div>
                </div>
              </motion.div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center">
                <div className="flex items-center mr-4">
                  {navItems.map((item, index) => {
                    const isActive = activeSection === item.name.toLowerCase()
                    const isHovered = hoveredItem === item.name

                    return (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * index + 0.5 }}
                        className={`relative px-3 lg:px-4 py-2 font-medium transition-colors z-10 text-sm ${
                          isScrolledFar ? "py-2" : "py-2"
                        }`}
                        onMouseEnter={() => setHoveredItem(item.name)}
                        onMouseLeave={() => setHoveredItem(null)}
                        onFocus={() => setHoveredItem(item.name)}
                        onBlur={() => setHoveredItem(null)}
                      >
                        {/* Active/Hover indicator */}
                        <motion.span
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-blue-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: isActive ? "50%" : isHovered ? "30%" : 0 }}
                          transition={{ duration: 0.3 }}
                        />

                        {/* Text */}
                        <span className={`relative z-10 ${isActive ? "text-blue-400" : "text-gray-300"}`}>
                          {item.name}
                        </span>
                      </motion.a>
                    )
                  })}
                </div>

                <motion.a
                  href="#contact"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.8 }}
                  className={`px-5 py-2.5 bg-gradient-to-r from-blue-500 to-navy-600 text-white font-medium rounded-sm transition-all duration-300 flex items-center space-x-2 hover:shadow-lg hover:shadow-blue-500/25 group text-sm`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Get Started</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
                  >
                    <ChevronRight size={16} />
                  </motion.div>
                </motion.a>
              </nav>

              {/* Mobile Menu Button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-white focus:outline-none w-10 h-10 flex items-center justify-center rounded-sm bg-navy-600/20 backdrop-blur-sm"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Scroll Progress Indicator */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 via-blue-400 to-navy-600"
          style={{
            scaleX: scrollYProgress,
            transformOrigin: "0% 50%",
            opacity: navOpacity,
          }}
        />
      </motion.header>

      {/* Mobile Menu - Improved positioning and animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-[68px] left-0 w-full bg-[#050510]/95 backdrop-blur-md overflow-hidden md:hidden z-40 border-b border-white/5"
            style={{ maxHeight: "calc(100vh - 68px)", overflowY: "auto" }}
          >
            <div className="container mx-auto px-4 py-3">
              <div className="flex flex-col space-y-1">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.name.toLowerCase()

                  return (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.05 * index }}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center py-3 px-4 ${
                        isActive ? "bg-navy-600/20 text-blue-400" : "text-gray-300"
                      } rounded-sm`}
                    >
                      <span className="relative z-10">{item.name}</span>

                      {isActive && (
                        <motion.div className="ml-auto">
                          <ChevronRight size={16} className="text-blue-400" />
                        </motion.div>
                      )}
                    </motion.a>
                  )
                })}

                <motion.a
                  href="#contact"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-3 px-5 py-3 bg-gradient-to-r from-blue-500 to-navy-600 text-white font-medium rounded-sm transition-all duration-300 text-center flex items-center justify-center space-x-2"
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Get Started</span>
                  <ChevronRight size={16} />
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header
