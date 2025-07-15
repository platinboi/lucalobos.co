import type { Metadata } from "next"
import Hero from "@/components/hero"
import Timeline from "@/components/timeline"
import ToolsGrid from "@/components/tools-grid"
import FeaturedProjects from "@/components/featured-projects"
import ContactForm from "@/components/contact-form"
import CoreValues from "@/components/core-values"

export const metadata: Metadata = {
  title: "Luca Lo Bosco | Innovative Business Automation & AI Development",
  description: "Innovative business automation, AI, and custom app development by Luca Lo Bosco.",
  keywords: "Luca Lo Bosco, AI consulting, business automation, custom app development",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="space-y-0">
        <Hero />
        <Timeline />
        <FeaturedProjects />
        <ToolsGrid />
        <CoreValues />
        <ContactForm />
      </div>
    </main>
  )
}

