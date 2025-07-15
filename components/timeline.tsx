"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight, BabyIcon, Gamepad2, ShoppingBag, GraduationCap, Code2Icon, BarChart, PhoneIcon, Code2 } from 'lucide-react'

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
    year: "2013 - 2016",
    title: "Early Beginnings",
    description:
      "Developed my first app, a Minecraft hack client. Yes, I was that kid. This rebellious experiment laid the foundation for my coding passion and innovative spirit.",
    technologies: ["C#", "JavaScript", "VisualBasic"],
    tags: ["App Development", "Gaming"],
    icon: <BabyIcon className="h-5 w-5 text-primary" />
  },
  {
    year: "2013 - 2016",
    title: "Game Programming Student at SAE Institute Germany",
    description:
      "During this period, I learned how to create interactive gaming experiences using industry-standard tools and techniques.",
    technologies: ["Unity", "C++"],
    tags: ["Game Development", "Education"],
    icon: <Gamepad2 className="h-5 w-5 text-primary" />
  },
  {
    year: "2016 - 2019",
    title: "E-commerce Ventures",
    description:
      "Built and scaled multiple online stores on platforms like Shopify and eBay, spanning niches such as jewelry, fashion, supplements, and digital products. Gained invaluable insights into performance marketing and customer engagement.",
    technologies: ["Shopify", "Meta Ads", "Google Ads"],
    tags: ["E-commerce", "Performance Marketing"],
    icon: <ShoppingBag className="h-5 w-5 text-primary" />
  },
  {
    year: "2016 - 2019",
    title: "Wholesale & Foreign Trade Merchant at 1&1",
    description:
      "During my apprenticeship at 1&1, a leading German telecommunications company, I set up Meta ad campaigns and created engaging visuals and copy. I also managed returns and coordinated various logistical tasks, gaining hands-on experience in digital marketing, project coordination, and trade operations.",
    technologies: ["Meta Ads", "CRM Systems", "Microsoft Office", "Google Ads"],
    tags: ["Digital Marketing", "Ad Campaigns", "Creative Copy", "Trade Operations", "Logistics", "SEO"],
    icon: <GraduationCap className="h-5 w-5 text-primary" />
  },
  {
    year: "2019 - 2021",
    title: "SaaS Development",
    description:
      "Developed custom SaaS solutions aimed at automating workflows and increasing conversion rates for businesses. These bootstrapped ventures honed my ability to blend technical innovation with effective business strategies.",
    technologies: ["PHP", "React", "PostgreSQL"],
    tags: ["SaaS", "Business Automation"],
    icon: <Code2Icon className="h-5 w-5 text-primary" />
  },
  {
    year: "2019 - 2021",
    title: "Marketing Manager at S. Capital",
    description:
      "Led online marketing strategies and executed lead generation campaigns for sectors such as solar energy, hospitality, and real estate in Munich. This role sharpened my skills in campaign development and digital strategy.",
    technologies: ["Wordpress", "CRM Systems", "Meta Ads", "Google Ads"],
    tags: ["Marketing", "Lead Gen", "SEO"],
    icon: <BarChart className="h-5 w-5 text-primary" />
  },
  {
    year: "2021 - 2022",
    title: "Business Development Representative for Oracle DBA",
    description:
      "Managed outbound lead generation for Oracle Database Appliances in the DACH region, refining my sales and prospecting techniques and integrating technical insights with effective communication.",
    technologies: ["CRM Systems", "Sales Automation Tools"],
    tags: ["Sales", "Business Development", "Lead Gen"],
    icon: <PhoneIcon className="h-5 w-5 text-primary" />
  },
  {
    year: "2021 - 2022",
    title: "Business Development Representative for Siemens GTS",
    description:
      "Engaged in outbound lead generation for Siemens Global Translation Services, further solidifying my expertise in large-scale business development.",
    technologies: ["CRM Systems", "Sales Automation Tools"],
    tags: ["Sales", "Business Development", "Lead Gen"],
    icon: <PhoneIcon className="h-5 w-5 text-primary" />
  },
  {
    year: "2021 - 2022",
    title: "Account Development Representative at Samsara Inc.",
    description:
      "Handled outbound lead generation for the DACH region. This experience reinforced the importance of combining technical know-how with a personal touch in sales.",
    technologies: ["Salesforce", "Sales Automation Tools"],
    tags: ["Sales", "Business Development", "Lead Gen"],
    icon: <PhoneIcon className="h-5 w-5 text-primary" />
  },
  {
    year: "2023 - Present",
    title: "AI Development",
    description:
      "Deliver AI consulting and custom development services to help businesses automate workflows, build chatbots, and implement innovative AI & Web3 solutions that drive growth.",
    technologies: ["Next.js", "React", "Tailwind CSS", "PostgreSQL", "Swift", "AI APIs"],
    tags: ["AI Automation", "Custom Development", "Web3"],
    icon: <Code2 className="h-5 w-5 text-primary" />
  },
  {
    year: "2023 - Present",
    title: "E-commerce Brand Building",
    description:
      "Building and scaling e-commerce brands through strategic product development, marketing automation, and data-driven growth strategies. Focus on creating sustainable, profitable online businesses with strong brand identity and customer loyalty.",
    technologies: ["Shopify", "Meta Ads", "Google Ads", "Analytics", "Email Marketing"],
    tags: ["E-commerce", "Brand Building", "Marketing Automation", "Growth Strategy"],
    icon: <ShoppingBag className="h-5 w-5 text-primary" />
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

// Create period mappings for better tab organization
const periodTabs = [
  { value: "2013-2016", label: "2013-2016", years: ["2013 - 2016"] },
  { value: "2016-2019", label: "2016-2019", years: ["2016 - 2019"] },
  { value: "2019-2021", label: "2019-2021", years: ["2019 - 2021"] },
  { value: "2021-2022", label: "2021-2022", years: ["2021 - 2022"] },
  { value: "2023-present", label: "2023-Present", years: ["2023 - Present"] }
];

export default function Timeline() {
  const [activeTab, setActiveTab] = useState("2023-present")
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const toggleExpanded = (itemKey: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(itemKey)) {
        newSet.delete(itemKey)
      } else {
        newSet.add(itemKey)
      }
      return newSet
    })
  }

  return (
    <section id="experience" className="py-20 lg:py-32">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="space-y-5 mb-16 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <h2 className="text-editorial-title font-serif font-light text-foreground">Experience Timeline</h2>
        <p className="text-editorial-body text-secondary max-w-3xl mx-auto">
          A chronological journey through my professional experiences and projects. Each milestone represents a step in
          my evolution as a developer and entrepreneur.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 h-auto p-1 bg-muted/30 rounded-xl mb-12">
            {periodTabs.map(tab => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg py-3 px-4 font-medium transition-all duration-200"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {periodTabs.map(tab => (
            <TabsContent key={tab.value} value={tab.value} className="mt-0 space-y-8">
              <AnimatePresence>
                {tab.years.map(year => 
                  groupedTimelineData[year]?.map((item, idx) => {
                    const itemKey = `${year}-${idx}`
                    const isExpanded = expandedItems.has(itemKey)
                    
                    return (
                      <motion.div
                        key={itemKey}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: idx * 0.1 }}
                      >
                        <div 
                          className="pl-4 transition-colors duration-300 cursor-pointer hover:bg-muted/20 rounded-lg p-4 -m-4"
                          onClick={() => toggleExpanded(itemKey)}
                        >
                          <div className="relative">
                            
                            {/* Header */}
                            <div className="flex items-start justify-between gap-4 mb-4">
                              <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-primary/10">
                                  {item.icon}
                                </div>
                                <div>
                                  <h3 className="text-editorial-subheading font-serif font-normal text-foreground">
                                    {item.title}
                                  </h3>
                                  <p className="text-sm text-secondary mt-1">{item.year}</p>
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
                                    {item.description}
                                  </p>
                                  
                                  <div className="space-y-4 mb-6">
                                    <div>
                                      <h4 className="text-sm font-medium text-foreground mb-3">Tools & Technologies</h4>
                                      <div className="flex flex-wrap gap-2">
                                        {item.technologies.map((tech, techIndex) => (
                                          <Badge 
                                            key={techIndex} 
                                            variant="outline" 
                                            className="text-sm bg-background/50 border-border hover:border-primary/30 transition-colors duration-200"
                                          >
                                            {tech}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                    
                                    <div>
                                      <h4 className="text-sm font-medium text-foreground mb-3">Focus Areas</h4>
                                      <div className="flex flex-wrap gap-2">
                                        {item.tags.map((tag, tagIndex) => (
                                          <Badge 
                                            key={tagIndex} 
                                            className="text-sm hover:bg-primary/90 transition-colors duration-200"
                                          >
                                            {tag}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })
                )}
              </AnimatePresence>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}