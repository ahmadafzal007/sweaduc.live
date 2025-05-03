// Completely redesign the cursor to have a spider web/glow effect

"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"

const Cursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number>(0)
  const prevPosition = useRef({ x: 0, y: 0 })
  const webPoints = useRef<Array<{ x: number; y: number; angle: number; distance: number }>>([])

  // Initialize web points
  useEffect(() => {
    const points = []
    const count = 8 // Number of web points

    for (let i = 0; i < count; i++) {
      points.push({
        x: 0,
        y: 0,
        angle: (Math.PI * 2 * i) / count,
        distance: Math.random() * 30 + 20,
      })
    }

    webPoints.current = points
  }, [])

  useEffect(() => {
    const mouseMoveHandler = (event: MouseEvent) => {
      const { clientX, clientY } = event
      setPosition({ x: clientX, y: clientY })

      // Calculate velocity for web effect
      const dx = clientX - prevPosition.current.x
      const dy = clientY - prevPosition.current.y

      // Update web points positions
      webPoints.current = webPoints.current.map((point) => {
        // Add some movement based on mouse velocity
        const newAngle = point.angle + (Math.abs(dx) + Math.abs(dy)) * 0.001

        return {
          ...point,
          angle: newAngle,
          distance: Math.max(20, Math.min(50, point.distance + (Math.random() - 0.5) * 2)),
        }
      })

      prevPosition.current = { x: clientX, y: clientY }

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

  // Draw web effect on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (isVisible) {
        // Draw web effect
        ctx.beginPath()

        // Draw center glow
        const gradient = ctx.createRadialGradient(
          position.x,
          position.y,
          0,
          position.x,
          position.y,
          isPointer ? 40 : 30,
        )
        gradient.addColorStop(0, `rgba(30, 58, 120, ${isActive ? 0.4 : 0.2})`)
        gradient.addColorStop(1, "rgba(30, 58, 120, 0)")

        ctx.fillStyle = gradient
        ctx.arc(position.x, position.y, isPointer ? 40 : 30, 0, Math.PI * 2)
        ctx.fill()

        // Draw web lines
        webPoints.current.forEach((point, i) => {
          const nextPoint = webPoints.current[(i + 1) % webPoints.current.length]

          const x1 = position.x + Math.cos(point.angle) * point.distance
          const y1 = position.y + Math.sin(point.angle) * point.distance

          const x2 = position.x + Math.cos(nextPoint.angle) * nextPoint.distance
          const y2 = position.y + Math.sin(nextPoint.angle) * nextPoint.distance

          // Draw line from center to point
          ctx.beginPath()
          ctx.moveTo(position.x, position.y)
          ctx.lineTo(x1, y1)
          ctx.strokeStyle = `rgba(59, 130, 246, ${isActive ? 0.6 : 0.3})`
          ctx.lineWidth = isActive ? 1.5 : 0.8
          ctx.stroke()

          // Draw connection between points
          ctx.beginPath()
          ctx.moveTo(x1, y1)
          ctx.lineTo(x2, y2)
          ctx.strokeStyle = `rgba(59, 130, 246, ${isActive ? 0.4 : 0.2})`
          ctx.lineWidth = isActive ? 1 : 0.5
          ctx.stroke()

          // Draw point
          ctx.beginPath()
          ctx.arc(x1, y1, isActive ? 2 : 1.5, 0, Math.PI * 2)
          ctx.fillStyle = isPointer ? "#3B82F6" : "#1E3A78"
          ctx.fill()
        })

        // Draw cursor dot
        ctx.beginPath()
        ctx.arc(position.x, position.y, isActive ? 4 : 3, 0, Math.PI * 2)
        ctx.fillStyle = isPointer ? "#3B82F6" : "#1E3A78"
        ctx.fill()
      }

      requestRef.current = requestAnimationFrame(animate)
    }

    requestRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [isVisible, position, isActive, isPointer])

  // Hide on mobile/touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null
  }

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-50" />
}

export default Cursor
