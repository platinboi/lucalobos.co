"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }

    const handleScroll = () => {
      if (!hasScrolled && window.scrollY > 100) {
        setHasScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref, hasScrolled]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 25%", "end 75%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Determine which section is most visible based on scroll position
    const sectionIndex = Math.min(
      Math.floor(latest * data.length),
      data.length - 1
    );
    if (sectionIndex >= 0) {
      setActiveIndex(sectionIndex);
    }
  });

  return (
    <div
      className="w-full bg-background font-sans relative"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto pt-4 pb-8 px-4 sm:px-6 lg:px-8">
        {/* Section header is handled by the parent component */}
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-6 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-30 items-center top-28 md:top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <motion.div 
                className="h-12 absolute left-3 md:left-3 w-12 rounded-full bg-background flex items-center justify-center shadow-md border border-muted"
                initial={{ borderColor: 'hsl(var(--muted))' }}
                animate={{
                  scale: activeIndex === index ? 1.15 : 1,
                  borderColor: activeIndex === index ? 'hsl(var(--primary))' : 'hsl(var(--muted))',
                  transition: { duration: 0.4, ease: "easeInOut" }
                }}
                aria-hidden="true"
              >
                <motion.div 
                  className={`h-6 w-6 rounded-full ${activeIndex === index ? 'bg-primary/30' : 'bg-primary/20'} border ${activeIndex === index ? 'border-primary' : 'border-primary/50'} p-2`}
                  animate={{
                    scale: activeIndex === index ? 1.2 : 1,
                    transition: { duration: 0.5, ease: "easeInOut" }
                  }}
                />
              </motion.div>
              <motion.h3 
                className="hidden md:block text-xl md:pl-20 md:text-4xl font-bold"
                initial={{ opacity: 0.7 }}
                animate={{
                  color: activeIndex === index ? 'hsl(var(--foreground))' : 'hsl(var(--secondary))',
                  opacity: activeIndex === index ? 1 : 0.6,
                  transition: { duration: 0.4 }
                }}
              >
                {item.title}
              </motion.h3>
            </div>

            <div className="relative pl-16 sm:pl-20 pr-4 md:pl-6 w-full">
              <motion.h3 
                className="md:hidden block text-xl mb-4 text-left font-bold"
                animate={{
                  color: activeIndex === index ? 'hsl(var(--foreground))' : 'hsl(var(--secondary))',
                  opacity: activeIndex === index ? 1 : 0.7,
                  transition: { duration: 0.3 }
                }}
              >
                {item.title}
              </motion.h3>
              <motion.div
                initial={{ opacity: 0.5, y: 20 }}
                animate={{ 
                  opacity: activeIndex === index ? 1 : 0.6,
                  y: activeIndex === index ? 0 : 10,
                  transition: { duration: 0.5, ease: "easeOut" }
                }}
                className="min-h-[250px] md:min-h-[450px] pb-10 md:pb-20"
              >
                {item.content}
              </motion.div>
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[3px] bg-gradient-to-b from-transparent via-muted/40 to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
          aria-hidden="true"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[3px] bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.5)]"
          />
        </div>
      </div>
    </div>
  );
};
