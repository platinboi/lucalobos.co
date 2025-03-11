"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Timeline as AceternityTimeline } from "@/components/ui/timeline"
import Image from "next/image"
import { Code, Database, Cloud, BarChart, ShoppingBag, ChevronDown, LucidePhone, CodeSquare, LucideGamepad, BabyIcon, Gamepad2, Code2, PhoneCallIcon, PhoneIcon, Code2Icon, GraduationCap } from 'lucide-react'

interface TimelineItem {
  year: string
  title: string
  description: string
  technologies: string[]
  tags: string[]
  icon?: React.ReactNode
}

const timelineData: TimelineItem[] = [
  {
    year: "2013 – 2016",
    title: "Early Beginnings",
    description:
      "Developed my first app, a Minecraft hack client. Yes, I was that kid. This rebellious experiment laid the foundation for my coding passion and innovative spirit.",
    technologies: ["C#", "JavaScript", "VisualBasic"],
    tags: ["App Development", "Gaming"],
    icon: <BabyIcon className="h-8 w-8 text-primary" />
  },
  {
    year: "2013 – 2016",
    title: "Game Programming Student at SAE Institute Germany",
    description:
      "During this period, I learned how to create interactive gaming experiences using industry-standard tools and techniques.",
    technologies: ["Unity", "C++"],
    tags: ["Game Development", "Education"],
    icon: <Gamepad2 className="h-8 w-8 text-primary" />
  },
  {
    year: "2016 – 2019",
    title: "E-commerce Ventures",
    description:
      "Built and scaled multiple online stores on platforms like Shopify and eBay, spanning niches such as jewelry, fashion, supplements, and digital products. Gained invaluable insights into performance marketing and customer engagement.",
    technologies: ["Shopify", "Meta Ads", "Google Ads"],
    tags: ["E-commerce", "Performance Marketing"],
    icon: <ShoppingBag className="h-8 w-8 text-primary" />
  },
  {
    year: "2016 – 2019",
    title: "Wholesale & Foreign Trade Merchant at 1&1",
    description:
      "During my apprenticeship at 1&1, a leading German telecommunications company, I set up Meta ad campaigns and created engaging visuals and copy. I also managed returns and coordinated various logistical tasks, gaining hands-on experience in digital marketing, project coordination, and trade operations.",
    technologies: ["Meta Ads", "CRM Systems", "Microsoft Office", "Google Ads"],
    tags: ["Digital Marketing", "Ad Campaigns", "Creative Copy", "Trade Operations", "Logistics", "SEO"],
    icon: <GraduationCap className="h-8 w-8 text-primary" />
  },
  {
    year: "2019 – 2021",
    title: "SaaS Development",
    description:
      "Developed custom SaaS solutions aimed at automating workflows and increasing conversion rates for businesses. These bootstrapped ventures honed my ability to blend technical innovation with effective business strategies.",
    technologies: ["PHP", "React", "PostgreSQL"],
    tags: ["SaaS", "Business Automation"],
    icon: <Code2Icon className="h-8 w-8 text-primary" />
  },
  {
    year: "2019 – 2021",
    title: "Marketing Manager at S. Capital",
    description:
      "Led online marketing strategies and executed lead generation campaigns for sectors such as solar energy, hospitality, and real estate in Munich. This role sharpened my skills in campaign development and digital strategy.",
    technologies: ["Wordpress", "CRM Systems", "Meta Ads", "Google Ads"],
    tags: ["Marketing", "Lead Gen", "SEO"],
    icon: <BarChart className="h-8 w-8 text-primary" />
  },
  {
    year: "2021 – 2022",
    title: "Business Development Representative for Oracle DBA",
    description:
      "Managed outbound lead generation for Oracle Database Appliances in the DACH region, refining my sales and prospecting techniques and integrating technical insights with effective communication.",
    technologies: ["CRM Systems", "Sales Automation Tools"],
    tags: ["Sales", "Business Development", "Lead Gen"],
    icon: <PhoneIcon className="h-8 w-8 text-primary" />
  },
  {
    year: "2021 – 2022",
    title: "Business Development Representative for Siemens GTS",
    description:
      "Engaged in outbound lead generation for Siemens Global Translation Services, further solidifying my expertise in large-scale business development.",
    technologies: ["CRM Systems", "Sales Automation Tools"],
    tags: ["Sales", "Business Development", "Lead Gen"],
    icon: <PhoneIcon className="h-8 w-8 text-primary" />
  },
  {
    year: "2021 – 2022",
    title: "Account Development Representative at Samsara Inc.",
    description:
      "Handled outbound lead generation for the DACH region. This experience reinforced the importance of combining technical know-how with a personal touch in sales.",
    technologies: ["Salesforce", "Sales Automation Tools"],
    tags: ["Sales", "Business Development", "Lead Gen"],
    icon: <PhoneIcon className="h-8 w-8 text-primary" />
  },
  {
    year: "2023 – Present",
    title: "AI Development",
    description:
      "Deliver AI consulting and custom development services to help businesses automate workflows, build chatbots, and implement innovative AI & Web3 solutions that drive growth.",
    technologies: ["Next.js", "React", "Tailwind CSS", "PostgreSQL", "Swift", "AI APIs"],
    tags: ["AI Automation", "Custom Development", "Web3"],
    icon: <Code2 className="h-8 w-8 text-primary" />
  }
]

// Group timeline items by year
const groupedTimelineData = timelineData.reduce((acc, item) => {
  if (!acc[item.year]) {
    acc[item.year] = [];
  }
  acc[item.year].push(item);
  return acc;
}, {} as Record<string, TimelineItem[]>);

// Convert grouped data to format expected by AceternityTimeline
const timelineEntries = Object.entries(groupedTimelineData).map(([year, items]) => ({
  title: year,
  content: (
    <div className="space-y-8">
      {items.map((item, idx) => (
        <div key={idx} className="pt-2 md:pt-6">
          <Card 
            className="h-full border border-border rounded-3xl transition-all duration-300 hover:border-primary/20 hover:shadow-md hover:translate-y-[-4px] bg-background/80 backdrop-blur-sm relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent pointer-events-none" aria-hidden="true"></div>
            <div className="relative z-10">
              <CardHeader className="pb-2 md:pb-3 flex md:flex-row items-start gap-4">
                <div className="hidden md:flex items-center justify-center w-16 h-16 aspect-square rounded-md bg-primary/10 shadow-sm border border-primary/20 overflow-hidden flex-shrink-0">
                  <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-primary/5 to-primary/20 p-3">
                    {item.icon}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="md:hidden flex items-center justify-center w-10 h-10 aspect-square rounded-md bg-primary/10 shadow-sm border border-primary/20 overflow-hidden flex-shrink-0">
                      <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-primary/5 to-primary/20 p-2">
                        {item.icon}
                      </div>
                    </div>
                    <CardTitle className="text-xl md:text-2xl lg:text-3xl text-foreground">{item.title}</CardTitle>
                  </div>
                  <CardDescription className="text-secondary text-base md:text-lg leading-relaxed">{item.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="space-y-4 md:space-y-5">
                  <div>
                    <div className="text-sm md:text-base font-medium text-foreground mb-2 md:mb-3">Tools & Tech</div>
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="text-xs md:text-sm bg-background/50 border-muted py-1 px-3 hover:border-primary/30 transition-colors duration-200">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm md:text-base font-medium text-foreground mb-2 md:mb-3">Tags</div>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} className="text-xs md:text-sm py-1 px-3 hover:bg-primary/90 transition-colors duration-200">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      ))}
    </div>
  ),
}));

export default function Timeline() {
  const [showScrollHint, setShowScrollHint] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollHint(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="experience" className="py-12 md:py-20 lg:py-24 relative">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="space-y-5 mb-10 md:mb-14 text-center mx-auto px-4 sm:px-6 lg:px-8"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">Experience Timeline</h2>
        <p className="text-secondary text-lg md:text-xl max-w-3xl mx-auto">
          A chronological journey through my professional experiences and projects. Each milestone represents a step in
          my evolution as a developer and entrepreneur.
        </p>
      </motion.div>

      <div className="timeline-container">
        <AceternityTimeline 
          data={timelineEntries} 
        />
        
        <AnimatePresence>
          {showScrollHint && (
            <motion.div 
              className="scroll-hint"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col items-center">
                <span className="text-sm font-medium mb-1">Scroll to explore</span>
                <ChevronDown className="h-5 w-5 animate-bounce" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

