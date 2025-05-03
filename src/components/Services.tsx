"use client"

import type React from "react"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Code, Database, Server, Cpu, Cloud, FileText } from "lucide-react"

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  index: number
  features: string[]
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, features, index }) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
      whileHover={{ y: -5 }}
    >
      <div className="relative h-full bg-black/40 backdrop-blur-sm border border-white/5 hover:border-navy-500/20 transition-all duration-300 overflow-hidden group rounded-sm">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-navy-500"></div>

        {/* Content container */}
        <div className="relative p-6 md:p-8 h-full flex flex-col z-10">
          {/* Icon */}
          <div className="mb-6 flex items-center">
            <div className="w-10 h-10 flex items-center justify-center text-blue-400">{icon}</div>
            <div className="w-full h-[1px] ml-4 bg-navy-500/30"></div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-300 mb-6 text-sm leading-relaxed">{description}</p>

          {/* Features list - always visible */}
          <div className="mt-auto space-y-4">
            <ul className="space-y-2">
              {features.map((feature, i) => (
                <motion.li
                  key={i}
                  className="flex items-start text-sm"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 + 0.2 }}
                >
                  <div className="mr-3 mt-0.5 text-blue-400">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-400">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Learn more link */}
          <div className="mt-6 pt-4 border-t border-white/5">
            <a href="#" className="inline-flex items-center text-blue-400 text-xs font-medium group">
              <span>EXPLORE SERVICE</span>
              <svg
                className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.33337 8H12.6667"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.66663 4L12.6666 8L8.66663 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const Services: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const services = [
    {
      icon: <Code size={20} />,
      title: "Full Stack Development",
      description: "End-to-end web and mobile application development with cutting-edge technologies.",
      features: [
        "React & Next.js Expertise",
        "Custom API Development",
        "Mobile-First Design",
        "Performance Optimization",
      ],
    },
    {
      icon: <Database size={20} />,
      title: "AI SaaS Solutions",
      description: "Custom AI-powered software-as-a-service platforms tailored to your business needs.",
      features: [
        "Machine Learning Integration",
        "Natural Language Processing",
        "Predictive Analytics",
        "Custom AI Models",
      ],
    },
    {
      icon: <Server size={20} />,
      title: "Enterprise Solutions",
      description: "Scalable, secure, and robust software solutions for large-scale enterprise operations.",
      features: [
        "Legacy System Integration",
        "Microservice Architecture",
        "Enterprise-Grade Security",
        "Scalable Infrastructure",
      ],
    },
    {
      icon: <Cpu size={20} />,
      title: "ML & AI Integration",
      description: "Advanced machine learning and artificial intelligence solutions to optimize processes.",
      features: [
        "Computer Vision Systems",
        "Recommendation Engines",
        "Automated Decision Making",
        "Data Processing Pipelines",
      ],
    },
    {
      icon: <Cloud size={20} />,
      title: "DevOps & Cloud",
      description: "Streamlined development operations and cloud infrastructure management for optimal performance.",
      features: ["CI/CD Pipeline Setup", "Cloud Migration", "Infrastructure as Code", "24/7 Monitoring"],
    },
    {
      icon: <FileText size={20} />,
      title: "Software Documentation",
      description: "Comprehensive technical documentation and knowledge bases for your software products.",
      features: ["API Documentation", "User Guides", "System Architecture Docs", "Knowledge Transfer"],
    },
  ]

  return (
    <section id="services" className="py-16 sm:py-20 md:py-28 lg:py-32 relative">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16 lg:mb-20">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-block"
          >
            <span className="inline-block py-1 px-3 bg-navy-500/10 text-blue-400 text-xs sm:text-sm font-medium rounded-sm">
              Our Expertise
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6"
          >
            <span className="text-white">Comprehensive</span> <span className="text-blue-400">Tech Services</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto"
          >
            We offer a wide range of technology services to help businesses innovate, scale, and succeed in the digital
            landscape. Our team of experts will guide you through every step of your digital transformation.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
              index={index}
            />
          ))}
        </div>

        {/* View all services button */}
        <motion.div
          className="mt-12 sm:mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <a
            href="#"
            className="inline-flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 bg-black border border-navy-500/30 hover:border-navy-500 text-white font-medium transition-all duration-300 hover:bg-navy-500/10 group rounded-sm text-sm sm:text-base"
          >
            <span>View All Services</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
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

export default Services
