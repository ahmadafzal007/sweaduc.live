"use client"

import type React from "react"
import { useRef } from "react"
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { ChevronRight, ArrowDown } from "lucide-react"

const Hero: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  // Create transform functions at the top level
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const gridOpacity = useTransform(scrollYProgress, [0, 0.8], [0.7, 0])
  const gridPointsScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.5])

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = (clientX - left) / width - 0.5
    const y = (clientY - top) / height - 0.5

    mouseX.set(x)
    mouseY.set(y)
  }

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10])

  const springConfig = { damping: 15, stiffness: 150 }
  const rotateXSpring = useSpring(rotateX, springConfig)
  const rotateYSpring = useSpring(rotateY, springConfig)

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Visible Grid Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[#050510]"></div>

        {/* Animated Grid Pattern */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            y: gridY,
            opacity: gridOpacity,
          }}
        >
          <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]">
            {/* Grid Highlight Points */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 rounded-full"
                style={{
                  left: `${15 + i * 15}%`,
                  top: `${20 + (i % 3) * 20}%`,
                  background:
                    i % 2 === 0
                      ? "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0) 70%)"
                      : "radial-gradient(circle, rgba(30, 58, 138, 0.3) 0%, rgba(30, 58, 138, 0) 70%)",
                  scale: gridPointsScale,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Animated gradient orbs with reduced opacity */}
        <motion.div style={{ y, opacity }} className="absolute top-0 left-0 w-full h-full">
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-navy-500/5 blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -40, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute top-1/2 right-1/3 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 12,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <motion.div
              className="inline-block py-1.5 px-4 rounded-full bg-gradient-to-r from-blue-500/10 to-navy-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4"
              animate={{
                boxShadow: [
                  "0 0 0 rgba(59, 130, 246, 0)",
                  "0 0 20px rgba(59, 130, 246, 0.3)",
                  "0 0 0 rgba(59, 130, 246, 0)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <span className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
                Innovative Tech Solutions
              </span>
            </motion.div>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              We Build{" "}
              <span className="relative inline-block">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-navy-500 relative z-10">
                  Digital Products
                  <motion.svg
                    className="absolute -bottom-2 left-0 w-full h-3 text-blue-500/30"
                    viewBox="0 0 200 8"
                    xmlns="http://www.w3.org/2000/svg"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                  >
                    <motion.path
                      d="M1 5.5C32.3333 1.16667 63.6667 -0.5 95 0.5C126.333 1.5 157.667 4.16667 189 8.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                  </motion.svg>
                </span>
                <motion.span
                  className="absolute -inset-1 bg-blue-500/10 rounded-sm -z-10"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                />
              </span>{" "}
              That Drive Growth
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto"
          >
            We're a team of expert engineers and designers building cutting-edge software solutions that transform
            businesses and elevate user experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
              href="#contact"
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-navy-600 text-white font-medium rounded-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 w-full sm:w-auto text-center overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="absolute inset-0 w-0 bg-white/20"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 flex items-center justify-center">
                Start a Project
                <ChevronRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.a>

            <motion.a
              href="#services"
              className="group relative px-8 py-4 bg-white/5 backdrop-blur-sm text-white font-medium rounded-sm transition-all duration-300 border border-white/10 hover:border-blue-500/30 w-full sm:w-auto text-center"
              whileHover={{
                scale: 1.05,
                borderColor: "rgba(59, 130, 246, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="absolute inset-0 rounded-sm opacity-0 bg-blue-500/5"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">Explore Services</span>
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* 3D Tilting Card */}
      <motion.div
        className="absolute bottom-32 right-10 hidden lg:block"
        style={{
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          transformPerspective: 1000,
        }}
      >
        <motion.div
          className="w-64 h-64 rounded-sm bg-gradient-to-br from-navy-500/20 to-blue-500/10 backdrop-blur-sm p-5 border border-white/10"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="w-full h-full flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-sm bg-blue-500/30 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 16L6 10H18L12 16Z" fill="#60A5FA" />
                </svg>
              </div>
              <div className="flex space-x-1">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-1 h-1 rounded-full bg-white/50" />
                ))}
              </div>
            </div>
            <div>
              <div className="w-3/4 h-2 bg-white/20 rounded-sm mb-2" />
              <div className="w-1/2 h-2 bg-white/20 rounded-sm" />
            </div>
            <div className="flex justify-between items-center">
              <div className="w-10 h-10 rounded-sm bg-white/10" />
              <div className="w-20 h-8 rounded-sm bg-blue-500/30" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center">
          <motion.span
            className="text-sm text-gray-400 mb-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            Scroll to explore
          </motion.span>
          <motion.div
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          >
            <ArrowDown size={16} className="text-blue-400" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
