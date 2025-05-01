"use client"

import type React from "react"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface TeamMemberProps {
  image: string
  name: string
  role: string
  index: number
}

const TeamMember: React.FC<TeamMemberProps> = ({ image, name, role, index }) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[3/4] bg-gradient-to-b from-orange-500/20 to-black/20">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute bottom-0 left-0 w-full p-6 z-20">
          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-orange-500 transition-colors">{name}</h3>
          <p className="text-gray-300 text-sm">{role}</p>
        </div>
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange-500/50 rounded-2xl transition-all duration-300 z-20 pointer-events-none"></div>
      </div>
    </motion.div>
  )
}

const Team: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const teamMembers = [
    {
      image: "/placeholder.svg?height=400&width=300",
      name: "Alex Morgan",
      role: "Chief Technology Officer",
    },
    {
      image: "/placeholder.svg?height=400&width=300",
      name: "Sarah Chen",
      role: "Lead Software Architect",
    },
    {
      image: "/placeholder.svg?height=400&width=300",
      name: "Michael Rodriguez",
      role: "AI Research Lead",
    },
    {
      image: "/placeholder.svg?height=400&width=300",
      name: "Jessica Kim",
      role: "Frontend Engineer",
    },
    {
      image: "/placeholder.svg?height=400&width=300",
      name: "David Patel",
      role: "Backend Developer",
    },
    {
      image: "/placeholder.svg?height=400&width=300",
      name: "Emma Wilson",
      role: "UX/UI Designer",
    },
    {
      image: "/placeholder.svg?height=400&width=300",
      name: "James Lee",
      role: "DevOps Engineer",
    },
    {
      image: "/placeholder.svg?height=400&width=300",
      name: "Olivia Martinez",
      role: "Data Scientist",
    },
    {
      image: "/placeholder.svg?height=400&width=300",
      name: "Robert Johnson",
      role: "Mobile Developer",
    },
    {
      image: "/placeholder.svg?height=400&width=300",
      name: "Sophia Williams",
      role: "Product Manager",
    },
  ]

  return (
    <section id="team" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-orange-500/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-orange-500/10 blur-3xl"></div>
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
              Our Team
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Meet Our Expert Engineers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400"
          >
            Our diverse team of talented professionals brings together expertise across various domains of software
            engineering and design.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} image={member.image} name={member.name} role={member.role} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Team
