"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, Users, Code, BarChart, ChevronRight, Bot, Phone, Building2 } from "lucide-react"

interface Project {
  name: string
  overview: string
  features: string[]
  development: string[]
  link: string
  icon: React.ReactNode
}

const projects: Project[] = [
  {
    name: "relogicai.com",
    overview: "German AI automation agency specializing in intelligent business systems that work around the clock. With over 7 years of experience, we eliminate missed opportunities through GDPR-compliant, SOC 2 certified AI solutions that handle routine tasks while businesses focus on strategic growth.",
    features: ["AI Chat Assistants", "AI Call Agents", "Process Automation", "Content Creation"],
    development: ["B2B Agency", "GDPR Compliant", "SOC 2 Certified", "German Market"],
    link: "https://relogicai.com",
    icon: <Bot className="h-5 w-5 text-primary" />,
  },
  {
    name: "logoscrm.com",
    overview: "AI-enhanced customer relationship management platform that streamlines sales processes through intelligent lead scoring, automated workflows, and smart analytics. Built for sales teams seeking to optimize their customer relationships with artificial intelligence.",
    features: ["AI Lead Management", "Sales Automation", "Smart Analytics", "Integration Ready"],
    development: ["React", "TypeScript", "Responsive Design", "AI-Powered"],
    link: "https://logoscrm.com",
    icon: <Building2 className="h-5 w-5 text-primary" />,
  },
  {
    name: "sophiacalls.com",
    overview: "AI phone assistant platform that handles calls, books appointments, and qualifies leads with natural conversation capabilities. Features 24/7 availability with smart scheduling and conflict-free booking, ensuring businesses never miss a customer opportunity.",
    features: ["Outbound Calling", "Inbound Handling", "Smart Scheduling", "Lead Qualification"],
    development: ["React Native", "TypeScript", "LiveKit SDK", "iOS Development"],
    link: "https://sophiacalls.com",
    icon: <Phone className="h-5 w-5 text-primary" />,
  },
  {
    name: "smaio.ai",
    overview: "Comprehensive social media management platform designed for agencies and businesses managing multiple channels. Features intelligent content scheduling, team collaboration tools, and detailed performance analytics to streamline social media operations and maximize engagement.",
    features: ["Multi-channel scheduling", "Team collaboration", "Performance analytics", "RSS feed auto-publishing"],
    development: ["PHP", "Meta Ads", "Bootstrapped", "Exited"],
    link: "https://demo.lucalobos.co/smaioai",
    icon: <Users className="h-5 w-5 text-primary" />,
  },
  {
    name: "proovy.io",
    overview: "Conversion optimization toolkit that leverages social proof psychology to increase website conversions. Easy-to-implement popup system with customizable widgets and professional templates, helping businesses build trust and drive more sales through proven social validation techniques.",
    features: ["One-line installation", "Customizable widgets", "Pre-designed templates", "Social proof popups"],
    development: ["PHP", "AppSumo Deal", "Bootstrapped", "SaaS Platform"],
    link: "https://demo.lucalobos.co/proovyio",
    icon: <Code className="h-5 w-5 text-primary" />,
  },
  {
    name: "heetview.com",
    overview: "Advanced website analytics platform that goes beyond traditional metrics by combining session replays, dynamic heatmaps, and real-time visitor tracking. Provides deep insights into user behavior patterns, helping businesses optimize their websites for better user experience and conversion rates.",
    features: ["Lightweight tracking", "Dynamic heatmaps", "Session replays", "Real-time analytics"],
    development: ["PHP", "Meta Ads", "Bootstrapped", "Analytics Platform"],
    link: "https://demo.lucalobos.co/heetview",
    icon: <BarChart className="h-5 w-5 text-primary" />,
  }
]

export default function FeaturedProjects() {
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set())

  const toggleExpanded = (projectName: string) => {
    setExpandedProjects(prev => {
      const newSet = new Set(prev)
      if (newSet.has(projectName)) {
        newSet.delete(projectName)
      } else {
        newSet.add(projectName)
      }
      return newSet
    })
  }

  return (
    <section id="featured-projects" className="py-20 lg:py-32">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="space-y-5 mb-16 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <h2 className="text-editorial-title font-serif font-light text-foreground">Featured Projects</h2>
        <p className="text-editorial-body text-secondary max-w-3xl mx-auto">
          A selection of SaaS products I've built, demonstrating my approach to solving real business problems through thoughtful design and technical innovation.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {projects.map((project, index) => {
            const isExpanded = expandedProjects.has(project.name)
            
            return (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div 
                  className="border-l-2 border-border hover:border-primary/30 pl-8 ml-4 transition-colors duration-300 cursor-pointer"
                  onClick={() => toggleExpanded(project.name)}
                >
                  <div className="relative">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          {project.icon}
                        </div>
                        <div>
                          <h3 className="text-editorial-subheading font-serif font-normal text-foreground">
                            {project.name}
                          </h3>
                        </div>
                      </div>
                      <ChevronRight 
                        className={`h-5 w-5 text-secondary transition-transform duration-200 mt-3 ${
                          isExpanded ? 'rotate-90' : ''
                        }`} 
                      />
                    </div>

                    {/* Content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="text-editorial-body text-secondary mb-6 pr-8">
                            {project.overview}
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                              <h4 className="text-sm font-medium text-foreground mb-3">Key Features</h4>
                              <div className="flex flex-wrap gap-2">
                                {project.features.map((feature, idx) => (
                                  <Badge 
                                    key={idx} 
                                    variant="default" 
                                    className="text-sm hover:bg-primary/90 transition-colors duration-200"
                                  >
                                    {feature}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium text-foreground mb-3">Development</h4>
                              <div className="flex flex-wrap gap-2">
                                {project.development.map((item, idx) => (
                                  <Badge 
                                    key={idx} 
                                    variant="outline" 
                                    className="text-sm border-border hover:border-primary/30 transition-colors duration-200"
                                  >
                                    {item}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-start">
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors duration-200"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span className="text-lg font-medium">View Project</span>
                              <ArrowUpRight className="h-5 w-5" />
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}