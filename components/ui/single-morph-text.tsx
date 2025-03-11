"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SingleMorphTextProps {
  fromText: string;
  toText: string;
  morphTime?: number;
  className?: string;
  textClassName?: string;
}

export function SingleMorphText({
  fromText,
  toText,
  morphTime = 1,
  className,
  textClassName
}: SingleMorphTextProps) {
  const text1Ref = React.useRef<HTMLSpanElement>(null);
  const text2Ref = React.useRef<HTMLSpanElement>(null);
  const [morphComplete, setMorphComplete] = React.useState(false);

  React.useEffect(() => {
    if (morphComplete) return;
    
    let morph = 0;
    let time = new Date();

    // Initialize text content
    if (text1Ref.current && text2Ref.current) {
      text1Ref.current.textContent = fromText;
      text2Ref.current.textContent = toText;
      text1Ref.current.style.opacity = "100%";
      text2Ref.current.style.opacity = "0%";
    }

    const setMorph = (fraction: number) => {
      if (text1Ref.current && text2Ref.current) {
        // Text 2 (target text) becomes more visible
        text2Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        text2Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

        // Text 1 (source text) becomes less visible
        const reverseFraction = 1 - fraction;
        text1Ref.current.style.filter = `blur(${Math.min(8 / reverseFraction - 8, 100)}px)`;
        text1Ref.current.style.opacity = `${Math.pow(reverseFraction, 0.4) * 100}%`;
      }
    };

    const finalizeMorph = () => {
      if (text1Ref.current && text2Ref.current) {
        text1Ref.current.style.filter = "";
        text1Ref.current.style.opacity = "0%";
        text2Ref.current.style.filter = "";
        text2Ref.current.style.opacity = "100%";
      }
      setMorphComplete(true);
    };

    function animate() {
      if (morphComplete) return;
      
      const animationId = requestAnimationFrame(animate);
      const newTime = new Date();
      const dt = (newTime.getTime() - time.getTime()) / 1000;
      time = newTime;

      morph += dt;
      let fraction = morph / morphTime;

      if (fraction >= 1) {
        fraction = 1;
        finalizeMorph();
        cancelAnimationFrame(animationId);
        return;
      }

      setMorph(fraction);
    }

    // Start animation
    const animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [fromText, toText, morphTime, morphComplete]);

  return (
    <div className={cn("relative w-full h-full flex items-center justify-center", className)}>
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id="threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      <div
        className="relative flex items-center justify-center w-full h-full"
        style={{ filter: "url(#threshold)" }}
      >
        <span
          ref={text1Ref}
          className={cn(
            "absolute select-none text-center",
            "text-foreground",
            textClassName
          )}
        />
        <span
          ref={text2Ref}
          className={cn(
            "absolute select-none text-center",
            "text-foreground",
            textClassName
          )}
        />
      </div>
    </div>
  );
} 