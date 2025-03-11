"use client";

import { useState, useEffect, useRef } from "react";
import { Mic, MicOff, X, Volume2, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "../hooks/use-media-query";
import { useConversation } from "@11labs/react";

interface VoiceAssistantProps {
  agentId: string;
}

interface ConversationMessage {
  text: string;
  isUser: boolean;
}

export function VoiceAssistant({ agentId }: VoiceAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);
  const [lastActivityTimestamp, setLastActivityTimestamp] = useState<number>(Date.now());
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const [lastReconnectTimestamp, setLastReconnectTimestamp] = useState(0);
  const [isMicPermissionPending, setIsMicPermissionPending] = useState(false);
  const [isBrowserCompatible, setIsBrowserCompatible] = useState(true);
  const [isRetrying, setIsRetrying] = useState(false);
  const [browserInfo, setBrowserInfo] = useState<{
    isIOS: boolean;
    isSafari: boolean;
    hasMediaDevices: boolean;
    hasGetUserMedia: boolean;
    userAgent: string;
    isLocalhost: boolean;
  } | null>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // Check browser information when mounted but don't display to users
  useEffect(() => {
    if (isMounted) {
      const ua = navigator.userAgent;
      const isIOS = /iPad|iPhone|iPod/.test(ua);
      const isSafari = /WebKit/.test(ua) && !/(Chrome|Chromium|EdgiOS|CriOS|FxiOS|OPiOS|mercury)/.test(ua);
      const hasMediaDevices = !!navigator.mediaDevices;
      const hasGetUserMedia = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
      const isLocalhost = window.location.hostname === 'localhost' || 
                          window.location.hostname === '127.0.0.1' ||
                          window.location.hostname.includes('.local');
      
      setBrowserInfo({
        isIOS,
        isSafari,
        hasMediaDevices,
        hasGetUserMedia,
        userAgent: ua,
        isLocalhost
      });
    }
  }, [isMounted]);

  // Helper function to log debug information - keep for backend logs but don't show to users
  const logDebug = (message: string) => {
    console.log(`[VoiceAssistant] ${message}`);
    // Don't update the debug info for users
    // setDebugInfo(prev => [...prev.slice(-9), message]);
    // Update last activity timestamp
    setLastActivityTimestamp(Date.now());
  };

  // Initialize the ElevenLabs conversation hook
  const conversation = useConversation({
    onConnect: () => {
      logDebug('Connected to ElevenLabs');
      setError(null);
      setLastActivityTimestamp(Date.now());
      // Reset reconnect attempts on successful connection
      setReconnectAttempts(0);
    },
    onDisconnect: () => {
      logDebug('Disconnected from ElevenLabs');
      
      // DISABLE automatic reconnection on disconnect
      // Only reconnect when the user explicitly requests it
      /*
      // If the conversation was disconnected but the assistant is still open,
      // attempt to reconnect with backoff strategy
      if (isOpen) {
        const currentTime = Date.now();
        const timeSinceLastReconnect = currentTime - lastReconnectTimestamp;
        
        // Only attempt to reconnect if it's been at least 3 seconds since the last attempt
        // and we haven't exceeded the maximum number of attempts (5)
        if (timeSinceLastReconnect > 3000 && reconnectAttempts < 5) {
          const delay = Math.min(1000 * Math.pow(2, reconnectAttempts), 10000); // Exponential backoff with max 10s
          
          logDebug(`Scheduling reconnect attempt ${reconnectAttempts + 1}/5 in ${delay/1000}s`);
          
          setTimeout(() => {
            if (isOpen && conversation.status !== 'connected') {
              logDebug(`Attempting to reconnect (attempt ${reconnectAttempts + 1}/5)...`);
              setReconnectAttempts(prev => prev + 1);
              setLastReconnectTimestamp(Date.now());
              startConversation();
            }
          }, delay);
        } else if (reconnectAttempts >= 5) {
          logDebug('Maximum reconnection attempts reached. Please try again manually.');
          setError('Connection lost. Maximum reconnection attempts reached. Please try again manually.');
        }
      }
      */
    },
    onMessage: (message: ConversationMessage) => {
      // Update activity timestamp on any message
      setLastActivityTimestamp(Date.now());
      
      // Safely log the message, checking if text exists
      logDebug(`Message received: ${message.isUser ? 'User' : 'AI'} - ${message.text ? message.text.substring(0, 30) + '...' : '[No text]'}`);
      
      // Only add messages with actual text content
      if (message.text && message.text.trim() !== '') {
        setMessages(prev => [...prev, { text: message.text, isUser: message.isUser }]);
        
        // If this is a user message, set isUserSpeaking to true
        if (message.isUser) {
          setIsUserSpeaking(true);
          // Reset after a short delay
          setTimeout(() => setIsUserSpeaking(false), 1000);
        }
      }
    },
    onError: (err: Error) => {
      logDebug(`ElevenLabs error: ${err.message}`);
      setError("Error connecting to voice service. Please try again.");
    },
  });

  useEffect(() => {
    setIsMounted(true);
    
    // Clean up function - only run when component is actually unmounting
    return () => {
      // Ensure we properly clean up the conversation when component unmounts
      if (conversation.status === 'connected') {
        try {
          logDebug('Cleaning up conversation on component unmount');
          conversation.endSession();
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : String(err);
          logDebug(`Error ending conversation on unmount: ${errorMessage}`);
        }
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array so cleanup only runs on unmount

  // Add a new effect to monitor conversation status
  useEffect(() => {
    // DISABLE automatic reconnection on disconnect
    return;
    
    /*
    // Only monitor when the assistant is open
    if (!isOpen) return;

    // Check if the conversation is disconnected unexpectedly
    if (conversation.status === 'disconnected' && messages.length > 0) {
      logDebug('Conversation disconnected unexpectedly, attempting to reconnect...');
      // Add a small delay before reconnecting
      const reconnectTimer = setTimeout(() => {
        startConversation();
      }, 1000);

      return () => clearTimeout(reconnectTimer);
    }
    */
  }, [isOpen, conversation.status, messages.length]);

  // Handle clicks outside the widget to close it
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        // Check if the button is already disabled to prevent multiple triggers
        if (isButtonDisabled) return;
        
        logDebug('Clicked outside widget, closing UI but keeping conversation active');
        setIsButtonDisabled(true); // Disable button temporarily
        setIsOpen(false);
        
        // Re-enable the button after a short delay
        setTimeout(() => {
          setIsButtonDisabled(false);
        }, 300);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, isButtonDisabled]); // Add isButtonDisabled to dependencies

  // Add a new effect to monitor conversation inactivity
  useEffect(() => {
    // DISABLE inactivity monitor to prevent automatic reconnections
    return;
    
    /*
    // Only monitor when the assistant is open and connected
    if (!isOpen || conversation.status !== 'connected') return;

    // Check for inactivity every 10 seconds
    const inactivityCheckInterval = setInterval(() => {
      const currentTime = Date.now();
      const inactivityDuration = currentTime - lastActivityTimestamp;
      const timeSinceLastReconnect = currentTime - lastReconnectTimestamp;
      
      // If inactive for more than 30 seconds and we haven't recently tried to reconnect,
      // and we haven't exceeded the maximum number of attempts
      if (inactivityDuration > 30000 && timeSinceLastReconnect > 5000 && reconnectAttempts < 5) {
        logDebug(`Conversation inactive for ${Math.floor(inactivityDuration / 1000)}s, reconnecting...`);
        setReconnectAttempts(prev => prev + 1);
        setLastReconnectTimestamp(currentTime);
        reconnectConversation();
      }
    }, 10000);

    return () => clearInterval(inactivityCheckInterval);
    */
  }, [isOpen, conversation.status, lastActivityTimestamp, lastReconnectTimestamp, reconnectAttempts]);

  // Add a heartbeat effect to keep the connection alive
  useEffect(() => {
    // DISABLE heartbeat to prevent unnecessary activity
    return;
    
    /*
    // Only run when the conversation is connected
    if (conversation.status !== 'connected') return;

    // Send a heartbeat every 15 seconds to keep the connection alive
    const heartbeatInterval = setInterval(() => {
      // We can't directly ping the WebSocket, but we can update our activity timestamp
      // which will prevent the inactivity check from reconnecting unnecessarily
      logDebug('Heartbeat: connection still active');
      setLastActivityTimestamp(Date.now());
    }, 15000);

    return () => clearInterval(heartbeatInterval);
    */
  }, [conversation.status]);

  // Check browser compatibility for audio API - make this less aggressive
  useEffect(() => {
    if (isMounted) {
      // We don't run this check immediately to avoid false negatives
      // Just log that we'll check compatibility when needed
      logDebug('Browser compatibility will be checked when starting conversation');
    }
  }, [isMounted]);

  const toggleAssistant = async () => {
    // Prevent multiple rapid clicks
    if (isButtonDisabled) return;
    
    // Disable the button temporarily to prevent multiple clicks
    setIsButtonDisabled(true);
    
    if (!isOpen) {
      setIsOpen(true);
      // Don't reset messages when reopening
      // This allows the conversation to continue
    } else {
      // Just close the UI without ending the session
      // This allows the conversation to continue in the background
      logDebug('Closing assistant UI, keeping conversation active');
      setIsOpen(false);
    }
    
    // Re-enable the button after a short delay
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 300);
  };

  const startOptimizedConversation = async () => {
    try {
      logDebug('Starting optimized conversation');
      setError(null);
      setIsMicPermissionPending(true);
      
      // Just let the SDK handle everything
      await conversation.startSession({
        agentId: agentId,
      });
      
      logDebug('Conversation started successfully');
      setError(null);
      setIsMicPermissionPending(false);
    } catch (err) {
      setIsMicPermissionPending(false);
      const errorMessage = err instanceof Error ? err.message : String(err);
      logDebug(`Failed to start conversation: ${errorMessage}`);
      
      // Simplified user-friendly error message
      setError("Unable to start voice assistant. Please check your microphone permissions.");
    }
  };

  const startConversation = async () => {
    try {
      // If we're already connecting or connected, don't try to start again
      if (conversation.status === 'connecting') {
        logDebug('Already connecting, ignoring duplicate start request');
        return;
      }
      
      if (conversation.status === 'connected') {
        logDebug('Already connected, ignoring duplicate start request');
        return;
      }
      
      // Log user agent for debugging
      logDebug(`User Agent: ${navigator.userAgent}`);
      
      // Check if we're on mobile
      if (isMobile) {
        logDebug('Mobile device detected - using optimized approach');
        await startOptimizedConversation();
        return;
      }
      
      // For desktop: normal flow
      setIsMicPermissionPending(true);
      logDebug('Requesting microphone permission...');
      
      // Request microphone permission
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        logDebug('Microphone permission granted');
      } catch (micError) {
        logDebug(`Microphone permission denied: ${micError instanceof Error ? micError.message : String(micError)}`);
        setError("Microphone access was denied. Please check your browser settings.");
        setIsMicPermissionPending(false);
        return;
      }
      
      setIsMicPermissionPending(false);
      
      logDebug('Starting conversation session with agent ID: ' + agentId);
      
      // Start the conversation with the agent ID
      await conversation.startSession({
        agentId: agentId,
      });
      
      logDebug('Conversation session started successfully');
      setError(null);
      
    } catch (err) {
      setIsMicPermissionPending(false);
      const errorMessage = err instanceof Error ? err.message : String(err);
      logDebug(`Failed to start conversation: ${errorMessage}`);
      
      // More user-friendly error message
      setError("Unable to start voice assistant. Please try again.");
    }
  };

  const stopConversation = async () => {
    try {
      // Only try to end the session if we're actually connected
      if (conversation.status !== 'connected') {
        logDebug(`Not ending session because status is ${conversation.status}`);
        return;
      }
      
      logDebug('Ending conversation session...');
      await conversation.endSession();
      logDebug('Conversation session ended');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      logDebug(`Failed to stop conversation: ${errorMessage}`);
      
      // Even if there was an error, consider the conversation ended
      // This prevents getting stuck in a bad state
      setError("Failed to end conversation cleanly. Please try again.");
    }
  };

  const resetError = () => {
    setError(null);
  };

  const resetConversation = async () => {
    logDebug('Completely resetting conversation state...');
    
    // End the current session if connected
    if (conversation.status === 'connected') {
      try {
        await conversation.endSession();
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        logDebug(`Error ending session during reset: ${errorMessage}`);
        // Continue with reset even if ending session fails
      }
    }
    
    // Reset all state
    setMessages([]);
    setError(null);
    setReconnectAttempts(0);
    setLastReconnectTimestamp(0);
    setLastActivityTimestamp(Date.now());
    setDebugInfo(prev => [...prev, 'Conversation state reset']);
    
    // Don't automatically start a new session
    // Let the user explicitly start it
    logDebug('Reset complete. User can now start a new conversation.');
  };

  const reconnectConversation = async () => {
    const currentTime = Date.now();
    const timeSinceLastReconnect = currentTime - lastReconnectTimestamp;
    
    // Enforce a minimum delay between manual reconnection attempts
    if (timeSinceLastReconnect < 3000) {
      logDebug(`Please wait ${Math.ceil((3000 - timeSinceLastReconnect) / 1000)}s before reconnecting again`);
      return;
    }
    
    logDebug('Manually reconnecting conversation...');
    setLastReconnectTimestamp(currentTime);
    
    if (conversation.status === 'connected') {
      logDebug('Ending current session before reconnecting');
      await stopConversation();
    }
    
    // Reset reconnect attempts for manual reconnection
    setReconnectAttempts(0);
    
    // Short delay before reconnecting
    setTimeout(async () => {
      await startConversation();
    }, 500);
  };

  // Add a function to check and log the current status
  const checkStatus = () => {
    logDebug(`Current status: ${conversation.status}`);
    logDebug(`Speaking: ${conversation.isSpeaking ? 'Yes' : 'No'}`);
    logDebug(`Messages: ${messages.length}`);
    logDebug(`Reconnect attempts: ${reconnectAttempts}/5`);
  };

  if (!isMounted) return null;

  return (
    <>
      {/* Widget Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          onClick={toggleAssistant}
          className={`h-14 w-14 md:h-16 md:w-16 rounded-full ${
            isOpen 
              ? "bg-primary text-primary-foreground shadow-md" 
              : "bg-primary/90 hover:bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow"
          } ${isButtonDisabled ? 'opacity-70 cursor-not-allowed' : ''}`}
          aria-label="Voice Assistant"
          disabled={isButtonDisabled}
        >
          {isOpen ? (
            <X className="h-6 w-6 md:h-7 md:w-7" />
          ) : (
            <Volume2 className="h-6 w-6 md:h-7 md:w-7" />
          )}
        </Button>
      </motion.div>

      {/* Assistant Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={widgetRef}
            className={`fixed z-50 bg-card border border-border shadow-xl overflow-hidden rounded-2xl ${
              isMobile 
                ? "bottom-24 left-4 right-4 max-h-[80vh]" 
                : "bottom-24 right-6 w-64 md:w-72"
            }`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-3 border-b border-border bg-muted/30 flex justify-between items-center">
              <div>
                <h3 className="font-medium text-base">Voice Assistant</h3>
                <p className="text-xs text-muted-foreground">Ask me anything about Luca's services</p>
              </div>
              <div className="flex items-center">
                <div className={`h-2 w-2 rounded-full mr-2 ${
                  isMicPermissionPending 
                    ? 'bg-amber-500 animate-pulse'
                    : conversation.status === 'connected' 
                      ? (conversation.isSpeaking 
                          ? 'bg-primary animate-pulse' 
                          : 'bg-green-500')
                      : 'bg-muted'
                }`}></div>
                <span className="text-xs text-muted-foreground">
                  {isMicPermissionPending 
                    ? 'Requesting mic...'
                    : conversation.status === 'connected' 
                      ? (conversation.isSpeaking 
                          ? 'Speaking...' 
                          : 'Ready') 
                      : 'Disconnected'}
                </span>
              </div>
            </div>
            
            {error ? (
              <div className="p-3 flex flex-col items-center justify-center">
                <p className="text-destructive mb-3 text-center text-sm">{error}</p>
                <div className="flex space-x-2">
                  <Button onClick={resetError} variant="outline" size="sm">Try Again</Button>
                  <Button onClick={resetConversation} variant="secondary" size="sm">Reset</Button>
                </div>
                {isMobile && error.includes("microphone") && (
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    You may need to allow microphone access in your browser settings.
                  </p>
                )}
              </div>
            ) : (
              <div className="p-3 flex flex-col items-center justify-center">
                {messages.length === 0 ? (
                  <div className="text-center">
                    <p className="text-muted-foreground mb-2 text-sm">Click the button below to start a voice conversation</p>
                    {isMobile && (
                      <p className="text-xs text-muted-foreground">
                        Make sure to allow microphone access when prompted
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-muted-foreground mb-2 text-sm text-center">
                    {conversation.isSpeaking ? 'Listening to response...' : 'Ready for your question'}
                  </p>
                )}
              </div>
            )}
            
            <div className="p-3 border-t border-border flex justify-center">
              {conversation.status !== 'connected' ? (
                <Button
                  onClick={startConversation}
                  variant="default"
                  size={isMobile ? "default" : "sm"}
                  className="rounded-full px-4 py-2 text-sm"
                  disabled={conversation.status === 'connecting' || isMicPermissionPending || isRetrying}
                >
                  <Mic className="h-4 w-4 mr-2" />
                  {isMicPermissionPending 
                    ? 'Requesting Mic...' 
                    : isRetrying
                      ? 'Retrying...'
                      : conversation.status === 'connecting' 
                        ? 'Connecting...' 
                        : 'Start Conversation'}
                </Button>
              ) : (
                <Button
                  onClick={stopConversation}
                  variant="destructive"
                  size={isMobile ? "default" : "sm"}
                  className="rounded-full px-4 py-2 text-sm"
                >
                  <MicOff className="h-4 w-4 mr-2" />
                  End Conversation
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Add TypeScript declaration for the ElevenLabs Widget
declare global {
  interface Window {
    ElevenLabsWidget?: {
      show: (config: any) => void;
      hide: () => void;
      startRecording: () => void;
      stopRecording: () => void;
    };
  }
} 