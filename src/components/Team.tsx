"use client"

import type React from "react"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Linkedin, Twitter, Mail } from "lucide-react"

interface TeamMemberProps {
  image: string
  name: string
  role: string
  bio: string
  index: number
  socialLinks: {
    linkedin?: string
    twitter?: string
    email?: string
  }
}

const TeamMember: React.FC<TeamMemberProps> = ({ image, name, role, bio, index, socialLinks }) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group h-full"
    >
      <div className="relative h-full bg-black/40 backdrop-blur-sm border border-white/10 group-hover:border-orange-500/30 transition-all duration-500 flex flex-col">
        {/* Image and gradient overlay */}
        <div className="relative overflow-hidden aspect-[4/5]">
          <img
            src={image || "/placeholder.svg"}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-80"></div>

          {/* Social links */}
          <div className="absolute top-4 right-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {socialLinks.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/10 backdrop-blur-sm flex items-center justify-center rounded-sm hover:bg-orange-500 transition-colors duration-300"
                aria-label={`${name}'s LinkedIn profile`}
              >
                <Linkedin size={14} />
              </a>
            )}
            {socialLinks.twitter && (
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/10 backdrop-blur-sm flex items-center justify-center rounded-sm hover:bg-orange-500 transition-colors duration-300"
                aria-label={`${name}'s Twitter profile`}
              >
                <Twitter size={14} />
              </a>
            )}
            {socialLinks.email && (
              <a
                href={`mailto:${socialLinks.email}`}
                className="w-8 h-8 bg-white/10 backdrop-blur-sm flex items-center justify-center rounded-sm hover:bg-orange-500 transition-colors duration-300"
                aria-label={`Email ${name}`}
              >
                <Mail size={14} />
              </a>
            )}
          </div>

          {/* Name and role */}
          <div className="absolute bottom-0 left-0 w-full p-6 z-10">
            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-orange-500 transition-colors">{name}</h3>
            <div className="flex items-center">
              <div className="w-6 h-0.5 bg-orange-500 mr-2"></div>
              <p className="text-gray-300 text-sm">{role}</p>
            </div>
          </div>
        </div>

        {/* Bio section */}
        <div className="p-6 flex-grow">
          <p className="text-gray-400 text-sm leading-relaxed">{bio}</p>
        </div>
      </div>
    </motion.div>
  )
}

const Team: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const teamMembers = [
    {
      image: "/placeholder.svg?height=500&width=400",
      name: "Alex Morgan",
      role: "Chief Technology Officer",
      bio: "With over 15 years of experience in software architecture and engineering leadership, Alex drives our technical vision and strategy, ensuring we deliver cutting-edge solutions.",
      socialLinks: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        email: "alex@sweaduc.com",
      },
    },
    {
      image: "/placeholder.svg?height=500&width=400",
      name: "Sarah Chen",
      role: "Lead Software Architect",
      bio: "Sarah specializes in designing scalable and maintainable software systems. Her expertise in cloud architecture and distributed systems has been instrumental in our success.",
      socialLinks: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        email: "sarah@sweaduc.com",
      },
    },
    {
      image: "/placeholder.svg?height=500&width=400",
      name: "Michael Rodriguez",
      role: "AI Research Lead",
      bio: "Michael leads our AI initiatives, bringing expertise in machine learning and natural language processing. He's passionate about creating AI solutions that solve real-world problems.",
      socialLinks: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        email: "michael@sweaduc.com",
      },
    },
    {
      image: "/placeholder.svg?height=500&width=400",
      name: "Jessica Kim",
      role: "Frontend Engineer",
      bio: "Jessica is an expert in creating beautiful, responsive, and accessible user interfaces. Her attention to detail and user-centric approach ensures exceptional digital experiences.",
      socialLinks: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        email: "jessica@sweaduc.com",
      },
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
            <span className="inline-block py-1 px-3 rounded-sm bg-orange-500/20 text-orange-500 text-sm font-medium">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {teamMembers.map((member, index) => (
            <TeamMember
              key={index}
              image={member.image}
              name={member.name}
              role={member.role}
              bio={member.bio}
              index={index}
              socialLinks={member.socialLinks}
            />
          ))}
        </div>

        {/* Join the team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-3 bg-black border border-orange-500/30 hover:border-orange-500 text-white font-medium transition-all duration-300 hover:bg-orange-500/10 group"
          >
            <span className="mr-2">Join Our Team</span>
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
              className="transform transition-transform duration-300 group-hover:translate-x-1"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Team
