"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Target, Award, MessageSquare, ArrowRight, Brain, TimerReset, Trophy } from "lucide-react"

interface CoreValue {
  icon: React.ReactNode
  title: string
  description: string
}

interface Achievement {
  title: string
  description: string
}

const coreValues: CoreValue[] = [
  {
    icon: <Target className="h-5 w-5 text-primary" />,
    title: "Results First. Everything Else is Secondary",
    description: "I don't care about the conventional process-as long as the result is achieved efficiently and in style. In today's fast-paced world, there's no room for slow, ugly, or overpriced solutions. If you want pixel-perfect execution with minimal fuss and maximum impact, I'm your guy."
  },
  {
    icon: <Award className="h-5 w-5 text-primary" />,
    title: "MVPs Are Dead. Long Live MLPs",
    description: "Forget Minimum Viable Products-no one loves them. I build Minimum Lovable Products because first impressions matter. If your product doesn't turn heads on day one, it's already dead."
  },
  {
    icon: <MessageSquare className="h-5 w-5 text-primary" />,
    title: "Overcommunicate or Get Ignored",
    description: "I don't do half-baked outreach or vague conversations. I dive deep to fully understand the client's situation, pain points, and goals. In both sales and project work, clarity wins-and I always choose to invest time in overcommunicating."
  },
  {
    icon: <ArrowRight className="h-5 w-5 text-primary" />,
    title: "Embrace Rejection: 1-6% Success is Still Success",
    description: "In sales, losing 94-99% of the time is the norm-and that's still a win. Every 'no' refines my approach, and when that 1-6% conversion happens, it proves that persistence and resilience are the true keys to success."
  },
  {
    icon: <Brain className="h-5 w-5 text-primary" />,
    title: "Generalists Will Rule the Future",
    description: "AI has made niche expertise overrated. The future belongs to those who are curious enough to learn how to leverage AI to replace themselves-transforming repetitive tasks into automated systems. The smartest move? Automate yourself before someone else does."
  },
  {
    icon: <TimerReset className="h-5 w-5 text-primary" />,
    title: "Forget the Old, Embrace the New",
    description: "I never learned the conventional, now outdated methods found in traditional coding degrees. In the real world, there are no theoretical tests-only real challenges that demand practical solutions. I focus on gathering exactly what I need to achieve results. This agile, self-taught approach gives me a decisive edge in creating breakthrough solutions for today's dynamic environment."
  }
]

const achievements: Achievement[] = [
  {
    title: "Bootstrapped SaaS Success",
    description: "In my very first software venture, just two people (myself and one developer) built a product that secured 86 paying customers within the first month, reaching a six figure valuation in just 4 months. No external funding, no big marketing spend-just pure execution and relentless drive."
  },
  {
    title: "E-Commerce Profitability With Zero Ad Spend",
    description: "I built a quarter million euro revenue stream using only organic traffic generation-without spending a single cent on ads. With just 2-6 hours of work per week over two years, this achievement proves that creativity and strategy beats capital every time."
  },
  {
    title: "Securing a Multi-Million-Euro Enterprise Deal",
    description: "I played a key role in securing a major deal for the European Central Bank's database licensing. This wasn't about cold calls or gimmicks-it was about deeply understanding the client's needs before they even knew it themselves."
  },
  {
    title: "From Scratch to Self-Made Innovator",
    description: "I didn't follow the conventional path. Without a coding degree or formal training in marketing or design, I built my solutions entirely on my own. I developed, marketed, and designed innovative products by trusting my instincts and learning through hands-on experience. My journey proves that breakthrough results come from passion, creativity, curiosity and relentless determination-not from textbooks."
  }
]

export default function CoreValues() {
  const [activeTab, setActiveTab] = useState<'values' | 'achievements'>('values')
  
  return (
    <section id="values" className="py-20 lg:py-32 relative">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="space-y-5 mb-16 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <h2 className="text-editorial-title font-serif font-light text-foreground">
          Core Values <span className="text-primary font-normal">&</span> Achievements
        </h2>
        <p className="text-editorial-body text-secondary max-w-3xl mx-auto">
          The principles that guide my work and the milestones that define my journey.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 gap-2 h-auto p-1 bg-muted/30 rounded-xl mb-16 max-w-md mx-auto">
            <TabsTrigger
              value="values"
              className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg py-3 px-6 font-medium transition-all duration-200"
            >
              Core Values
            </TabsTrigger>
            <TabsTrigger
              value="achievements"
              className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg py-3 px-6 font-medium transition-all duration-200"
            >
              Achievements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="values" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {coreValues.map((value, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10 mt-1">
                      {value.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-editorial-subheading font-serif font-normal text-foreground mb-4">
                        {value.title}
                      </h3>
                      <p className="text-editorial-body text-secondary leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {achievements.map((achievement, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10 mt-1">
                      <Trophy className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-editorial-subheading font-serif font-normal text-foreground mb-4">
                        {achievement.title}
                      </h3>
                      <p className="text-editorial-body text-secondary leading-relaxed">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}