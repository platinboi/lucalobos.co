"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Check, Send, AlertCircle } from "lucide-react"

export default function ContactForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    interest: "ai-automation",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: string) => {
    setFormState((prev) => ({ ...prev, interest: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    // Simple validation
    if (!formState.name.trim()) {
      setError('Please enter your name')
      setIsSubmitting(false)
      return
    }

    if (!formState.email.trim()) {
      setError('Please enter your email address')
      setIsSubmitting(false)
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formState.email)) {
      setError('Please enter a valid email address')
      setIsSubmitting(false)
      return
    }

    if (!formState.message.trim()) {
      setError('Please enter a message')
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.error || 'Failed to send message';
        console.error('Form submission error:', errorMessage);
        throw new Error(errorMessage);
      }

      // Show success message
      setIsSubmitted(true);

      // Reset form after showing success message (but leave it visible longer)
      setTimeout(() => {
        setIsSubmitted(false);
        setFormState({
          name: "",
          email: "",
          interest: "ai-automation",
          message: "",
        });
      }, 8000);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-20 lg:py-32">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="space-y-5 mb-16 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <h2 className="text-editorial-title font-serif font-light text-foreground">Let's Build Together</h2>
        <p className="text-editorial-body text-secondary max-w-3xl mx-auto">
          Ready to automate your business processes or build something amazing? Drop me a line and let's discuss how we
          can make your digital dreams a reality. I promise I don't bite.
        </p>
      </motion.div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-background/90 backdrop-blur-sm border border-border rounded-2xl shadow-sm p-8 md:p-10 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent dark:from-primary/[0.05] pointer-events-none" aria-hidden="true"></div>
          <div className="relative z-10">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                  <Check className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-serif font-normal mb-2 text-foreground">Message Sent!</h3>
                <p className="text-secondary mb-4">
                  Thanks for reaching out. I'll get back to you faster than you can say "the singularity is close."
                </p>
                <p className="text-xs text-muted-foreground">
                  Your message has been sent successfully.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {error && (
                  <div className="p-4 mb-6 text-sm border border-destructive/50 text-destructive rounded-lg flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}
                
                <div className="space-y-6">
                  <div className="relative">
                    <div className="text-foreground text-sm font-medium block mb-2">Name</div>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      value={formState.name}
                      onChange={handleChange}
                      className="focus-visible:ring-primary/70 transition-all duration-200 w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="text-foreground text-sm font-medium block mb-2">Email</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="focus-visible:ring-primary/70 transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="text-foreground text-sm font-medium block mb-3">What are you interested in?</label>
                    <RadioGroup value={formState.interest} onValueChange={handleRadioChange} className="mt-2 space-y-3">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="ai-automation" id="ai-automation" className="border-muted text-primary focus:ring-primary/70" />
                        <label htmlFor="ai-automation" className="cursor-pointer text-foreground">
                          AI & Business Automation
                        </label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="custom-development" id="custom-development" className="border-muted text-primary focus:ring-primary/70" />
                        <label htmlFor="custom-development" className="cursor-pointer text-foreground">
                          Custom App Development
                        </label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="web-development" id="web-development" className="border-muted text-primary focus:ring-primary/70" />
                        <label htmlFor="web-development" className="cursor-pointer text-foreground">
                          Web Development
                        </label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="lead-generation" id="lead-generation" className="border-muted text-primary focus:ring-primary/70" />
                        <label htmlFor="lead-generation" className="cursor-pointer text-foreground">
                          Lead Generation
                        </label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <label htmlFor="message" className="text-foreground text-sm font-medium block mb-2">Message</label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project or idea..."
                      value={formState.message}
                      onChange={handleChange}
                      required
                      className="min-h-[120px] focus-visible:ring-primary/70 transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full py-4 text-base font-medium shadow-sm transition-all duration-200 hover:shadow-md flex items-center justify-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin mr-2 h-5 w-5 border-2 border-b-transparent border-white rounded-full"></div>
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

