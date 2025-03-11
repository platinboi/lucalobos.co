"use client";

import { useState, useEffect } from "react";
import { VoiceAssistant } from "@/components/voice-assistant";

export function VoiceAssistantWrapper() {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  
  // ElevenLabs agent ID
  const agentId = "7NSUdhtcq1J4ZU1507Bi";
  
  useEffect(() => {
    // Initialize mounting state
    setIsMounted(true);
    
    // Wait for loading to complete before showing voice assistant
    const checkLoading = () => {
      if (typeof window !== 'undefined') {
        if (window.isLoadingComplete) {
          // Add a longer delay for smoother transition after loader
          setTimeout(() => {
            setIsLoadingComplete(true);
          }, 500); // Increased from 200ms to 500ms for better timing
        } else {
          // Keep checking until loading is complete
          const checkInterval = setInterval(() => {
            if (window.isLoadingComplete) {
              clearInterval(checkInterval);
              setTimeout(() => {
                setIsLoadingComplete(true);
              }, 500); // Same increased delay here
            }
          }, 100);
          
          // Clean up interval on unmount
          return () => clearInterval(checkInterval);
        }
      }
    };
    
    // Start checking loading state
    checkLoading();
  }, []);
  
  // Only render on client-side to prevent hydration errors
  // And only after loading is complete
  if (!isMounted || !isLoadingComplete) {
    return null;
  }
  
  return <VoiceAssistant agentId={agentId} />;
} 