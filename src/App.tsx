"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Header from "./components/Header"
import Hero from "./components/Hero"
import Services from "./components/Services"
import Team from "./components/Team"
import Projects from "./components/Projects"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import Cursor from "./components/Cursor"
import "./index.css"

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0])

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [])

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold text-orange-500"
        >
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
            swea
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="text-white"
          >
            duc
          </motion.span>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="relative bg-black text-white overflow-hidden">
      <Cursor />
      <motion.div
        style={{ opacity }}
        className="fixed top-0 left-0 w-full h-screen pointer-events-none z-10 bg-gradient-to-b from-black to-transparent"
      />
      <Header />
      <Hero />
      <Services />
      <Team />
      <Projects />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
