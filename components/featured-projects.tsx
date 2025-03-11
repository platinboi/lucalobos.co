"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Code, BarChart, Users, ShoppingBag, Leaf } from "lucide-react"

interface Project {
  name: string
  overview: string
  features: string[]
  development: string[]
  link: string
  icon: string
}

const projects: Project[] = [
  {
    name: "smaio.ai",
    overview: "Smart social media content scheduling tool for managing multiple channels.",
    features: ["Multi-channel scheduling", "Team collaboration", "Performance analytics", "RSS feed auto-publishing"],
    development: ["PHP", "Meta Ads", "Bootstrapped", "Exited"],
    link: "https://demo.lucalobos.co/smaioai",
    icon: "Users",
  },
  {
    name: "proovy.io",
    overview: "Conversion booster using dynamic social proof popups.",
    features: ["One-line installation", "Customizable widgets", "Pre-designed templates"],
    development: ["PHP", "AppSumo Deal", "Bootstrapped"],
    link: "https://demo.lucalobos.co/proovyio",
    icon: "Code",
  },
  {
    name: "heetview.com",
    overview: "All-in-one website analytics with session replays and heatmaps.",
    features: ["Lightweight tracking", "Dynamic heatmaps", "Session replays", "Real-time analytics"],
    development: ["PHP", "Meta Ads", "Bootstrapped"],
    link: "https://demo.lucalobos.co/heetview",
    icon: "BarChart",
  },
  {
    name: "Spirit Capital",
    overview: "Meme merchandise side project for finance and internet culture enthusiasts.",
    features: ["Memes"],
    development: ["Shopify", "Print-on-demand", "Organic Marketing"],
    link: "https://spiritcapital.online",
    icon: "ShoppingBag",
  },
  {
    name: "Gudshroom",
    overview: "Premium organic mushroom supplements for cognitive and physical wellbeing.",
    features: ["Organic & vegan", "Minimalist formulas"],
    development: ["Shopify", "Subscription model"],
    link: "https://gudshroom.com",
    icon: "Leaf",
  },
]

export default function FeaturedProjects() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Users":
        return <Users className="h-6 w-6 text-foreground" />
      case "Code":
        return <Code className="h-6 w-6 text-foreground" />
      case "BarChart":
        return <BarChart className="h-6 w-6 text-foreground" />
      case "ShoppingBag":
        return <ShoppingBag className="h-6 w-6 text-foreground" />
      case "Leaf":
        return <Leaf className="h-6 w-6 text-foreground" />
      default:
        return null
    }
  }

  return (
    <section id="featured-projects" className="py-12">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="space-y-5 mb-14 text-center mx-auto px-4 sm:px-6 lg:px-8"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">Featured Projects</h2>
        <p className="text-secondary text-lg md:text-xl max-w-3xl mx-auto">
          A diverse showcase of some of my previous work, ranging from SaaS products to e-commerce platforms. These projects represent a
          small selection of solutions I've built for myself and clients, demonstrating versatility in development and
          business acumen.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group"
            onMouseEnter={() => setHoveredProject(project.name)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            <Card className="h-full border border-border hover:border-primary/20 shadow-sm hover:shadow-md hover:translate-y-[-4px] transition-all duration-300 overflow-hidden rounded-3xl">
              <CardHeader className="relative pb-0">
                <div className="absolute top-4 right-4 bg-background rounded-full p-2 shadow-md">
                  {getIcon(project.icon)}
                </div>
                <CardTitle className="text-xl md:text-2xl lg:text-3xl mb-2 text-foreground">{project.name}</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm md:text-base text-secondary mb-4">{project.overview}</p>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm md:text-base font-semibold mb-2 text-foreground">Key Features</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.features.map((feature, idx) => (
                        <Badge key={idx} variant="default" className="text-xs md:text-sm hover:bg-primary/90 transition-colors duration-200">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm md:text-base font-semibold mb-2 text-foreground">Development & Marketing</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.development.map((item, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs md:text-sm text-secondary hover:border-primary/30 transition-colors duration-200">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <motion.div
                  className="mt-4 flex justify-end"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredProject === project.name ? 1 : 0.7 }}
                  transition={{ duration: 0.3 }}
                >
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:text-primary/80 transition-all duration-200 flex items-center"
                  >
                    View Project <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

