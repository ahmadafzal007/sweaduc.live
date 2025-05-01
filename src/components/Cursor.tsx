"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const Cursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const mouseMoveHandler = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY })

      const target = event.target as HTMLElement
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
          target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.closest("a") !== null ||
          target.closest("button") !== null,
      )
    }

    const mouseDownHandler = () => setIsActive(true)
    const mouseUpHandler = () => setIsActive(false)
    const mouseEnterHandler = () => setIsVisible(true)
    const mouseLeaveHandler = () => setIsVisible(false)

    document.addEventListener("mousemove", mouseMoveHandler)
    document.addEventListener("mousedown", mouseDownHandler)
    document.addEventListener("mouseup", mouseUpHandler)
    document.addEventListener("mouseenter", mouseEnterHandler)
    document.addEventListener("mouseleave", mouseLeaveHandler)

    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler)
      document.removeEventListener("mousedown", mouseDownHandler)
      document.removeEventListener("mouseup", mouseUpHandler)
      document.removeEventListener("mouseenter", mouseEnterHandler)
      document.removeEventListener("mouseleave", mouseLeaveHandler)
    }
  }, [])

  // Hide on mobile/touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-orange-500 pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isPointer ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-orange-500 pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: isActive ? 2 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 1000,
          damping: 35,
          mass: 0.2,
        }}
      />
    </>
  )
}

export default Cursor
