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
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, index }) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-orange-500/50 transition-all duration-300 group hover:bg-gradient-to-b hover:from-orange-500/10 hover:to-transparent"
    >
      <div className="w-14 h-14 rounded-xl bg-orange-500/20 flex items-center justify-center mb-6 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 group-hover:text-orange-500 transition-colors">{title}</h3>
      <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{description}</p>
    </motion.div>
  )
}

const Services: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const services = [
    {
      icon: <Code size={24} />,
      title: "Full Stack Development",
      description: "End-to-end web and mobile application development with cutting-edge technologies and frameworks.",
    },
    {
      icon: <Database size={24} />,
      title: "AI SaaS Solutions",
      description: "Custom AI-powered software-as-a-service platforms tailored to your business needs.",
    },
    {
      icon: <Server size={24} />,
      title: "Enterprise Solutions",
      description: "Scalable, secure, and robust software solutions for large-scale enterprise operations.",
    },
    {
      icon: <Cpu size={24} />,
      title: "ML & AI Integration",
      description:
        "Advanced machine learning and artificial intelligence solutions to automate and optimize processes.",
    },
    {
      icon: <Cloud size={24} />,
      title: "DevOps & Cloud",
      description: "Streamlined development operations and cloud infrastructure management for optimal performance.",
    },
    {
      icon: <FileText size={24} />,
      title: "Software Documentation",
      description: "Comprehensive technical documentation and knowledge bases for your software products.",
    },
  ]

  return (
    <section id="services" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-orange-500/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-orange-500/10 blur-3xl"></div>
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
              Our Expertise
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Comprehensive Tech Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400"
          >
            We offer a wide range of technology services to help businesses innovate, scale, and succeed in the digital
            landscape.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
