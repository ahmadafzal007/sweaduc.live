"use client"

import type React from "react"
import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Mail, Phone, MapPin, Send, User, AtSign, MessageSquare } from "lucide-react"

const Contact: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      // Reset form after submission
      setTimeout(() => {
        setIsSubmitted(false)
        if (formRef.current) {
          formRef.current.reset()
          setFormState({
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
          })
        }
      }, 3000)
    }, 1500)
  }

  const contactInfo = [
    {
      icon: <Mail size={22} />,
      title: "Email Us",
      details: "info@sweaduc.com",
      link: "mailto:info@sweaduc.com",
    },
    {
      icon: <Phone size={22} />,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
    {
      icon: <MapPin size={22} />,
      title: "Visit Us",
      details: "123 Tech Avenue, San Francisco, CA",
      link: "https://maps.google.com",
    },
  ]

  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-navy-500/5 blur-3xl"></div>
        <div className="absolute bottom-1/3 left-0 w-64 h-64 rounded-full bg-navy-500/10 blur-3xl"></div>
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
            <span className="inline-block py-1 px-3 rounded-sm bg-navy-500/20 text-navy-400 text-sm font-medium">
              Get In Touch
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Let's Build Something Amazing Together
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400"
          >
            Have a project in mind? We'd love to hear about it. Drop us a message, and we'll get back to you as soon as
            possible.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {contactInfo.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-black/40 backdrop-blur-sm rounded-sm p-6 border border-white/10 hover:border-navy-500/50 transition-all duration-300 group flex items-center"
              whileHover={{ y: -5 }}
            >
              <div className="w-12 h-12 rounded-sm bg-navy-500/20 flex items-center justify-center mr-4 text-navy-400 group-hover:bg-navy-500 group-hover:text-white transition-all duration-300">
                {item.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1 group-hover:text-navy-400 transition-colors">{item.title}</h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{item.details}</p>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-black/40 backdrop-blur-sm rounded-md p-8 border border-white/10"
        >
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-10"
            >
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="#10B981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
              <p className="text-gray-400 text-center max-w-md">
                Thank you for reaching out. We'll get back to you as soon as possible.
              </p>
            </motion.div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <User size={14} className="text-navy-500" />
                  <span>Full Name</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm focus:outline-none focus:ring-2 focus:ring-navy-500/50 focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <div
                      className={`w-1 h-6 transition-colors duration-300 ${formState.name ? "bg-navy-500" : "bg-white/10"}`}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <AtSign size={14} className="text-navy-500" />
                  <span>Email Address</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm focus:outline-none focus:ring-2 focus:ring-navy-500/50 focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <div
                      className={`w-1 h-6 transition-colors duration-300 ${formState.email ? "bg-navy-500" : "bg-white/10"}`}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Phone size={14} className="text-navy-500" />
                  <span>Phone Number</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    id="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm focus:outline-none focus:ring-2 focus:ring-navy-500/50 focus:border-transparent transition-all"
                    placeholder="+1 (555) 123-4567"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <div
                      className={`w-1 h-6 transition-colors duration-300 ${formState.phone ? "bg-navy-500" : "bg-white/10"}`}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <MessageSquare size={14} className="text-navy-500" />
                  <span>Subject</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm focus:outline-none focus:ring-2 focus:ring-navy-500/50 focus:border-transparent transition-all"
                    placeholder="Project Inquiry"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <div
                      className={`w-1 h-6 transition-colors duration-300 ${formState.subject ? "bg-navy-500" : "bg-white/10"}`}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <MessageSquare size={14} className="text-navy-500" />
                  <span>Message</span>
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm focus:outline-none focus:ring-2 focus:ring-navy-500/50 focus:border-transparent transition-all resize-none"
                    placeholder="Tell us about your project..."
                  ></textarea>
                  <div className="absolute top-3 right-0 pr-3 flex items-start pointer-events-none">
                    <div
                      className={`w-1 h-6 transition-colors duration-300 ${formState.message ? "bg-navy-500" : "bg-white/10"}`}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-navy-600 hover:bg-navy-700 text-white font-medium rounded-md transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-navy-500/25 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={16} className="ml-1" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
