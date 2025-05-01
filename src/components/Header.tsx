"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const { scrollYProgress } = useScroll()
  const navOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Update active section based on scroll position
      const sections = ["home", "services", "team", "projects", "contact"]
      const currentSection = sections.find(section => {
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
    { name: "Contact", href: "#contact" }
  ]

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  }

  const letterVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 200, damping: 10 }
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-black/80 backdrop-blur-md py-3 border-b border-white/10" 
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          <motion.div
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            className="text-2xl font-bold flex items-center"
          >
            <div className="mr-2 relative">
              <motion.div 
                className="w-8 h-8 bg-orange-500 rounded-md absolute -z-10"
                animate={{ 
                  rotate: [0, 10, 0, -10, 0],
                  scale: [1, 1.1, 1, 1.1, 1]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity,
                  repeatType: "reverse" 
                }}
              />
              <motion.div 
                className="w-8 h-8 flex items-center justify-center text-black font-bold"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                S
              </motion.div>
            </div>
            <div>
              <motion.span variants={letterVariants} className="text-orange-500">s</motion.span>
              <motion.span variants={letterVariants} className="text-orange-500">w</motion.span>
              <motion.span variants={letterVariants} className="text-orange-500">e</motion.span>
              <motion.span variants={letterVariants} className="text-orange-500">a</motion.span>
              <motion.span variants={letterVariants} className="text-white">d</motion.span>
              <motion.span variants={letterVariants} className="text-white">u</motion.span>
              <motion.span variants={letterVariants} className="text-white">c</motion.span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index + 0.5 }}
                className={`relative group ${activeSection === item.name.toLowerCase() ? 'text-orange-500' : 'text-white hover:text-orange-500'} transition-colors`}
              >
                <span className="relative z-10">{item.name}</span>
                
                {/* Animated underline */}
                <motion.span 
                  className={`absolute -bottom-1 left-0 w-full h-0.5 bg-orange-500 origin-left z-0 ${
                    activeSection === item.name.toLowerCase() ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                  initial={{ scaleX: 0 }}
                  animate={{ 
                    scaleX: activeSection === item.name.toLowerCase() ? 1 : 0 
                  }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Dot indicator */}
                {activeSection === item.name.toLowerCase() && (
                  <motion.span 
                    className="absolute -top-1 -right-2 w-1.5 h-1.5 rounded-full bg-orange-500"
                    layoutId="navIndicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.a>
            ))}
            
            <motion.a
              href="#contact"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.8 }}
              className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/25"
            >
              Get Started
            </motion.a>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col items-end space-y-1.5">
              <motion.span
                animate={isMenuOpen 
                  ? { rotate: 45, y: 8, width: "100%", backgroundColor: "#FF6B00" } 
                  : { rotate: 0, y: 0, width: "100%", backgroundColor: "#FFFFFF" }
                }
                className="block h-0.5 transition-all duration-300"
              ></motion.span>
              <motion.span
                animate={isMenuOpen 
                  ? { opacity: 0, width: "75%" } 
                  : { opacity: 1, width: "75%" }
                }
                className="block h-0.5 bg-white transition-all duration-300"
              ></motion.span>
              <motion.span
                animate={isMenuOpen 
                  ? { rotate: -45, y: -8, width: "100%", backgroundColor: "#FF6B00" } 
                  : { rotate: 0, y: 0, width: "50%", backgroundColor: "#FFFFFF" }
                }
                className="block h-0.5 transition-all duration-300"
              ></motion.span>
            </div>
          </motion.button>
        </div>
        
        {/* Scroll Progress Indicator */}
        <motion.div 
          className="absolute bottom-0 left-0 h-0.5 bg-orange-500"
          style={{ 
            scaleX: scrollYProgress,
            transformOrigin: "0% 50%",
            opacity: navOpacity
          }}
        />
      </motion.header>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isMenuOpen ? 1 : 0,
          height: isMenuOpen ? "auto" : 0,
        }}
        className={`fixed top-[${isScrolled ? '61px' : '85px'}] left-0 w-full bg-black/95 backdrop-blur-md overflow-hidden md:hidden z-40 ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.05 * index }}
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center py-3 border-b border-white/10 ${
                activeSection === item.name.toLowerCase() 
                  ? 'text-orange-500' 
                  : 'text-white'
              }`}
            >
              {activeSection === item.name.toLowerCase() && (
                <motion.span 
                  layoutId="mobileNavIndicator"
                  className="w-1 h-6 bg-orange-500 rounded-full mr-3"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className={activeSection !== item.name.toLowerCase() ? "ml-4" : ""}>{item.name}</span>
            </motion.a>
          ))}
          
          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            onClick={() => setIsMenuOpen(false)}
            className="block mt-4 px-5 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-all duration-300 text-center"
          >
            Get Started
          </motion.a>
        </div>
      </motion.div>
    </>
  )
}

export default Header
