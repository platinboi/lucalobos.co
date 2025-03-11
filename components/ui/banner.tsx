'use client';

import { type HTMLAttributes, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface BannerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * @defaultValue 'normal'
   */
  variant?: 'rainbow' | 'normal';
  /**
   * @defaultValue true
   */
  changeLayout?: boolean;
  /**
   * Banner message
   */
  message?: string;
  /**
   * @defaultValue '3rem'
   */
  height?: string;
}

export function Banner({
  id,
  variant = 'normal',
  changeLayout = true,
  message,
  height = '3rem',
  ...props
}: BannerProps): React.ReactElement {
  // Start with null to avoid hydration mismatch
  const [visible, setVisible] = useState<boolean | null>(null);
  // Track if component is mounted to avoid hydration issues
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Mark component as mounted
    setIsMounted(true);
    
    // Set initial state only on the client side
    setVisible(window.scrollY < 10);
    
    const handleScroll = () => {
      // Show banner only when at the top of the page (within a small threshold)
      setVisible(window.scrollY < 10);
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Use default styles before client-side hydration
  const bannerStyle = isMounted
    ? { 
        height: visible ? height : '0',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-100%)'
      }
    : { height };

  return (
    <div
      id={id}
      {...props}
      style={bannerStyle}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 flex flex-row items-center justify-center bg-secondary/20 px-4 text-center text-sm font-medium transition-all duration-300 backdrop-blur-sm border-b border-border/40 text-foreground/90 shadow-sm',
        variant === 'rainbow' && 'bg-background/50',
        props.className,
      )}
    >
      {changeLayout && isMounted && visible ? (
        <style>{`
        :root:not(.${id ?? 'banner-never'}) { --banner-height: ${height}; }
        `}</style>
      ) : null}

      {variant === 'rainbow' ? <RainbowLayer /> : null}
      {message || props.children}
    </div>
  );
}

const RainbowLayer = () => {
  return (
    <>
      <div className="absolute inset-0 z-[-1] rainbow-banner-gradient-1" />
      <div className="absolute inset-0 z-[-1] rainbow-banner-gradient-2" />
    </>
  );
};