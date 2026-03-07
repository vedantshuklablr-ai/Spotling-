"use client"

import { useState, useEffect, useRef } from "react"
import { Volume2, VolumeX, Mic, MicOff } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VoiceSystemProps {
  onTextToSpeech?: (text: string) => void
  onSpeechToText?: (text: string) => void
  className?: string
}

export function VoiceSystem({ onTextToSpeech, onSpeechToText, className }: VoiceSystemProps) {
  const [isMuted, setIsMuted] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Create click sound effect
  const playClickSound = () => {
    if (isMuted) return
    
    try {
      // Create a simple click sound using Web Audio API
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.value = 800
      oscillator.type = 'sine'
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.1)
    } catch (error) {
      console.log("Audio playback failed:", error)
    }
  }

  // Text-to-speech function
  const speak = (text: string) => {
    if (isMuted || !text) return

    try {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 1.0
      utterance.pitch = 1.0
      utterance.volume = 0.8

      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)

      window.speechSynthesis.speak(utterance)
      onTextToSpeech?.(text)
    } catch (error) {
      console.log("Text-to-speech failed:", error)
    }
  }

  // Speech-to-text function
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Speech recognition is not supported in your browser")
      return
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      const recognition = new SpeechRecognition()

      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = 'en-US'

      recognition.onstart = () => {
        setIsListening(true)
        playClickSound()
      }

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        onSpeechToText?.(transcript)
        setIsListening(false)
        playClickSound()
      }

      recognition.onerror = () => {
        setIsListening(false)
        playClickSound()
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognition.start()
    } catch (error) {
      console.log("Speech recognition failed:", error)
      setIsListening(false)
    }
  }

  const stopListening = () => {
    try {
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
        const recognition = new SpeechRecognition()
        recognition.stop()
      }
    } catch (error) {
      console.log("Error stopping speech recognition:", error)
    }
    setIsListening(false)
    playClickSound()
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (isSpeaking) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
    playClickSound()
  }

  // Make functions globally available
  useEffect(() => {
    (window as any).spotlingVoice = {
      speak,
      playClickSound
    }
  }, [isMuted])

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Mute/Unmute Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMute}
        className={`transition-colors ${isMuted ? 'text-muted-foreground' : 'text-primary'}`}
        title={isMuted ? "Unmute voice" : "Mute voice"}
      >
        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </Button>

      {/* Speech-to-Text Button */}
      {onSpeechToText && (
        <Button
          variant="ghost"
          size="icon"
          onClick={isListening ? stopListening : startListening}
          className={`transition-colors ${
            isListening 
              ? 'text-red-500 animate-pulse' 
              : 'text-muted-foreground hover:text-primary'
          }`}
          title={isListening ? "Stop listening" : "Start voice input"}
        >
          {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        </Button>
      )}
    </div>
  )
}

// Hook for easy voice system usage
export function useVoiceSystem() {
  const speak = (text: string) => {
    if ((window as any).spotlingVoice) {
      (window as any).spotlingVoice.speak(text)
    }
  }

  const playClickSound = () => {
    if ((window as any).spotlingVoice) {
      (window as any).spotlingVoice.playClickSound()
    }
  }

  return { speak, playClickSound }
}

// Extend Window interface for global voice system
declare global {
  interface Window {
    spotlingVoice?: {
      speak: (text: string) => void
      playClickSound: () => void
    }
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}
