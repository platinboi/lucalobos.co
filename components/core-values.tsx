"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Award, ArrowRight, MessageSquare, Zap, Brain, Trophy, TimerReset } from "lucide-react"

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
    icon: <Target className="h-8 w-8 text-primary" />,
    title: "Results First. Everything Else is Secondary",
    description: "I don't care about the conventional process—as long as the result is achieved efficiently and in style. In today's fast-paced world, there's no room for slow, ugly, or overpriced solutions. If you want pixel-perfect execution with minimal fuss and maximum impact, I'm your guy."
  },
  {
    icon: <Award className="h-8 w-8 text-primary" />,
    title: "MVPs Are Dead. Long Live MLPs",
    description: "Forget Minimum Viable Products—no one loves them. I build Minimum Lovable Products because first impressions matter. If your product doesn't turn heads on day one, it's already dead."
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-primary" />,
    title: "Overcommunicate or Get Ignored",
    description: "I don't do half-baked outreach or vague conversations. I dive deep to fully understand the client's situation, pain points, and goals. In both sales and project work, clarity wins—and I always choose to invest time in overcommunicating."
  },
  {
    icon: <ArrowRight className="h-8 w-8 text-primary" />,
    title: "Embrace Rejection: 1-6% Success is Still Success",
    description: "In sales, losing 94-99% of the time is the norm—and that's still a win. Every 'no' refines my approach, and when that 1-6% conversion happens, it proves that persistence and resilience are the true keys to success.",
  },
  {
    icon: <Brain className="h-8 w-8 text-primary" />,
    title: "Generalists Will Rule the Future",
    description: "AI has made niche expertise overrated. The future belongs to those who are curious enough to learn how to leverage AI to replace themselves—transforming repetitive tasks into automated systems. The smartest move? Automate yourself before someone else does."
  },
  {
    icon: <TimerReset className="h-8 w-8 text-primary" />,
    title: "Forget the Old, Embrace the New",
    description: "I never learned the conventional, now outdated methods found in traditional coding degrees. In the real world, there are no theoretical tests—only real challenges that demand practical solutions. I focus on gathering exactly what I need to achieve results. This agile, self-taught approach gives me a decisive edge in creating breakthrough solutions for today's dynamic environment."
  }
]

const achievements: Achievement[] = [
  {
    title: "Bootstrapped SaaS Success",
    description: "In my very first software venture, just two people (myself and one developer) built a product that secured 86 paying customers within the first month, reaching a six figure valuation in just 6 months. No external funding, no big marketing spend—just pure execution and relentless drive."
  },
  {
    title: "E-Commerce Profitability With Zero Ad Spend",
    description: "I built a quarter million euro revenue stream using only organic traffic generation—without spending a single cent on ads. With just 2–6 hours of work per week over two years, this achievement proves that creativity and strategy beats capital every time."
  },
  {
    title: "Securing a Multi-Million-Euro Enterprise Deal",
    description: "I played a key role in securing a major deal for the European Central Bank's database licensing. This wasn't about cold calls or gimmicks—it was about deeply understanding the client's needs before they even knew it themselves."
  },
  {
    title: "From Scratch to Self-Made Innovator",
    description: "I didn't follow the conventional path. Without a coding degree or formal training in marketing or design, I built my solutions entirely on my own. I developed, marketed, and designed innovative products by trusting my instincts and learning through hands-on experience. My journey proves that breakthrough results come from passion, creativity, curiosity and relentless determination—not from textbooks.",
  }
]

export default function CoreValues() {
  const [activeTab, setActiveTab] = useState<'values' | 'achievements'>('values')
  
  return (
    <section id="values" className="py-16 md:py-20 relative">
      <div className="absolute top-0 left-0 right-0 flex justify-center">
        <div className="h-px w-1/3 bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="space-y-4 md:space-y-5 mb-10 md:mb-16 text-center mx-auto px-4 sm:px-6 lg:px-8"
      >
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground">
          Core Values <span className="text-primary">&</span> Milestones
        </h2>
        <p className="text-secondary text-base md:text-lg lg:text-xl max-w-3xl mx-auto">
          The principles that guide my work and the achievements that define my journey.
        </p>
      </motion.div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-8 md:mb-12">
          <div className="inline-flex p-1 rounded-lg bg-muted w-full max-w-xs md:max-w-md">
            <button
              onClick={() => setActiveTab('values')}
              className={`flex-1 px-3 sm:px-6 py-2 sm:py-2.5 rounded-md text-xs sm:text-sm font-medium transition-all touch-manipulation ${
                activeTab === 'values' 
                  ? 'bg-background text-foreground shadow-sm' 
                  : 'text-secondary hover:text-foreground'
              }`}
            >
              Core Values
            </button>
            <button
              onClick={() => setActiveTab('achievements')}
              className={`flex-1 px-3 sm:px-6 py-2 sm:py-2.5 rounded-md text-xs sm:text-sm font-medium transition-all touch-manipulation ${
                activeTab === 'achievements' 
                  ? 'bg-background text-foreground shadow-sm' 
                  : 'text-secondary hover:text-foreground'
              }`}
            >
              Achievements
            </button>
          </div>
        </div>

        {activeTab === 'values' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {coreValues.map((value, index) => (
              <motion.div
                key={`value-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full overflow-hidden border border-border hover:border-primary/20 transition-all duration-300 relative group">
                  <CardContent className="p-4 md:p-6 flex flex-col">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4 mb-3 md:mb-4">
                      <div className="bg-gradient-to-br from-primary/5 to-primary/20 border border-primary/10 rounded-md p-2 md:p-3 overflow-hidden aspect-square w-12 h-12 md:w-16 md:h-16 flex items-center justify-center shrink-0">
                        {value.icon}
                      </div>
                      <h3 className="font-bold text-lg md:text-xl text-foreground leading-tight">{value.title}</h3>
                    </div>
                    <p className="text-secondary text-sm md:text-base leading-relaxed">{value.description}</p>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="grid grid-cols-1 gap-4 md:gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={`achievement-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden border border-border hover:border-primary/20 transition-all duration-300 relative group">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                      <div className="bg-gradient-to-br from-primary/5 to-primary/20 border border-primary/10 rounded-md p-2 md:p-3 overflow-hidden aspect-square w-12 h-12 md:w-16 md:h-16 flex items-center justify-center shrink-0">
                        <Trophy className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                      </div>
                      <h3 className="font-bold text-xl md:text-2xl text-foreground leading-tight">{achievement.title}</h3>
                    </div>
                    <p className="text-secondary text-sm md:text-base leading-relaxed pl-0 md:pl-0 ml-0">{achievement.description}</p>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
} 