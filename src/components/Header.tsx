"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const { scrollYProgress } = useScroll()
  const navOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Update active section based on scroll position
      const sections = ["home", "services", "team", "projects", "contact"]
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (!element) return false

        const rect = element.getBoundingClientRect()
        return rect.top <= 100 && rect.bottom >= 100
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Team", href: "#team" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ]

  const logoVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const letterVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 200, damping: 10 },
    },
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "py-2 sm:py-3 bg-black/70 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20"
            : "py-3 sm:py-6 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          {/* Logo */}
          <motion.div variants={logoVariants} initial="hidden" animate="visible" className="flex items-center">
            {/* Animated Logo Mark */}
            <div className="mr-2 sm:mr-3 relative">
              <motion.div
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* S letter */}
                <span className="text-white font-bold text-base sm:text-xl relative z-10">S</span>

                {/* Border light effect */}
                <motion.div
                  className="absolute inset-0 rounded-md border-2 border-orange-500/0"
                  animate={{ borderColor: ["rgba(255, 107, 0, 0)", "rgba(255, 107, 0, 0.6)", "rgba(255, 107, 0, 0)"] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
                />
              </motion.div>
            </div>

            {/* Brand Name */}
            <div className="flex text-xl sm:text-2xl font-bold">
              {/* "swea" in orange */}
              <div className="flex">
                {["s", "w", "e", "a"].map((letter, i) => (
                  <motion.span key={`swea-${letter}-${i}`} variants={letterVariants} className="text-orange-500">
                    {letter}
                  </motion.span>
                ))}
              </div>

              {/* "duc" in white */}
              <div className="flex">
                {["d", "u", "c"].map((letter, i) => (
                  <motion.span key={`duc-${letter}-${i}`} variants={letterVariants} className="text-white">
                    {letter}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <div className="flex items-center rounded-md bg-white/5 backdrop-blur-lg border border-white/10 p-1">
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
                    className="relative px-3 lg:px-4 py-2 rounded-sm font-medium transition-colors z-10"
                    onMouseEnter={() => setHoveredItem(item.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                    onFocus={() => setHoveredItem(item.name)}
                    onBlur={() => setHoveredItem(null)}
                  >
                    {/* Active/Hover background pill */}
                    {(isActive || isHovered) && (
                      <motion.span
                        layoutId="navBackground"
                        className={`absolute inset-0 rounded-sm ${isActive ? "bg-orange-500" : "bg-white/10"}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}

                    {/* Text */}
                    <span className={`relative z-10 ${isActive ? "text-white" : "text-gray-300"}`}>{item.name}</span>
                  </motion.a>
                )
              })}
            </div>

            <motion.a
              href="#contact"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.8 }}
              className="ml-3 lg:ml-4 px-4 lg:px-5 py-2 lg:py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-sm transition-all duration-300 flex items-center space-x-2 hover:shadow-lg hover:shadow-orange-500/25 group text-sm lg:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Get Started</span>
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </motion.svg>
            </motion.a>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white focus:outline-none bg-white/5 backdrop-blur-sm border border-white/10 rounded-sm w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <div className="w-5 flex flex-col items-center justify-center">
              <motion.span
                animate={
                  isMenuOpen
                    ? { rotate: 45, y: 6, backgroundColor: "#FF6B00" }
                    : { rotate: 0, y: 0, backgroundColor: "#FFFFFF" }
                }
                className="block h-0.5 w-5 transition-all duration-300"
              ></motion.span>
              <motion.span
                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1, backgroundColor: "#FFFFFF" }}
                className="block h-0.5 w-5 my-1 transition-all duration-300"
              ></motion.span>
              <motion.span
                animate={
                  isMenuOpen
                    ? { rotate: -45, y: -6, backgroundColor: "#FF6B00" }
                    : { rotate: 0, y: 0, backgroundColor: "#FFFFFF" }
                }
                className="block h-0.5 w-5 transition-all duration-300"
              ></motion.span>
            </div>
          </motion.button>
        </div>

        {/* Scroll Progress Indicator */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-orange-500 to-orange-600"
          style={{
            scaleX: scrollYProgress,
            transformOrigin: "0% 50%",
            opacity: navOpacity,
          }}
        />
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-[53px] sm:top-[60px] left-0 w-full bg-black/95 backdrop-blur-xl overflow-hidden md:hidden z-40 border-b border-white/10"
          >
            <div className="container mx-auto px-4 py-5">
              <div className="flex flex-col space-y-2">
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
                      className={`flex items-center py-3 px-4 rounded-sm relative overflow-hidden ${
                        isActive ? "text-white" : "text-gray-400"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="mobileNavBackground"
                          className="absolute inset-0 bg-orange-500/10 border-l-2 border-orange-500 rounded-sm"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      <motion.span
                        className="relative z-10"
                        animate={{ x: isActive ? 10 : 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      >
                        {item.name}
                      </motion.span>

                      {isActive && (
                        <motion.svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="ml-auto text-orange-500"
                        >
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </motion.svg>
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
                  className="mt-2 px-5 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-sm transition-all duration-300 text-center flex items-center justify-center space-x-2"
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Get Started</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
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
