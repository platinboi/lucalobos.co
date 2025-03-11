"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Bot, Code, Image, Layers, Workflow, FileText, Cpu, Palette, Pencil, Terminal, Cloud } from "lucide-react"

interface Tool {
  name: string
  description: string
  icon: React.ReactNode
}

const tools: Tool[] = [
  {
    name: "ChatGPT, Claude, Grok, etc.",
    description: "Advanced AI assistants for complex problem-solving and code generation.",
    icon: <Bot className="h-8 w-8" />,
  },
  {
    name: "Salesforce",
    description: "A leading CRM platform to streamline sales, marketing, and customer service with robust analytics.",
    icon: <Cloud className="h-8 w-8" />,
  },
  {
    name: "Midjourney & FAL.ai",
    description: "AI-powered image generation and manipulation tools.",
    icon: <Image className="h-8 w-8" />,
  },
  {
    name: "Canva & Spline",
    description: "Design tools for creating stunning visuals and 3D experiences.",
    icon: <Palette className="h-8 w-8" />,
  },
  {
    name: "Cursor & v0.dev",
    description: "AI-enhanced development environments for faster coding.",
    icon: <Code className="h-8 w-8" />,
  },
  {
    name: "Obsidian",
    description: "Knowledge management system for connecting ideas and projects.",
    icon: <FileText className="h-8 w-8" />,
  },
  {
    name: "n8n & make.com",
    description: "Workflow automation platforms for business process optimization.",
    icon: <Workflow className="h-8 w-8" />,
  },
  {
    name: "Shopify & Wordpress",
    description: "Web platforms for content management and eCommerce.",
    icon: <Layers className="h-8 w-8" />,
  },
  {
    name: "Next.js & React",
    description: "Modern frameworks for building high-performance web applications.",
    icon: <Terminal className="h-8 w-8" />,
  },
  {
    name: "Tailwind CSS",
    description: "Utility-first CSS framework for rapid UI development.",
    icon: <Pencil className="h-8 w-8" />,
  },
]

export default function ToolsGrid() {
  return (
    <section id="tools" className="py-12">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="space-y-5 mb-14 text-center mx-auto px-4 sm:px-6 lg:px-8"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">My Staple Toolbox</h2>
        <p className="text-secondary text-lg md:text-xl max-w-3xl mx-auto">
          A carefully curated collection of cutting-edge tools that enable me to deliver exceptional results. These
          aren't just tools—they're extensions of my creative and technical capabilities.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {tools.map((tool, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="tool-card"
          >
            <Card className="h-full border border-border shadow-none hover:border-primary/20 hover:bg-card/80 transition-all duration-300 rounded-3xl overflow-hidden">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4 p-3 rounded-full bg-background text-foreground shadow-sm border border-muted/50">{tool.icon}</div>
                <h3 className="font-medium text-xl md:text-2xl mb-3 text-foreground">{tool.name}</h3>
                <p className="text-sm md:text-base text-secondary">{tool.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
        className="text-center text-sm text-muted-foreground italic mt-8"
      >
        ...and more.
      </motion.p>
    </section>
  )
}

