"use client"

import { useState } from "react"
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

  // Create click sound effect
  const playClickSound = () => {
    if (!isMuted && typeof window !== "undefined") {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        oscillator.frequency.value = 800
        oscillator.type = "sine"
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
        
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.1)
      } catch (error) {
        console.log("Audio context not available")
      }
    }
  }

  // Text to speech function
  const speak = (text: string) => {
    if (!isMuted && typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 1
      utterance.pitch = 1
      utterance.volume = 1
      
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      
      window.speechSynthesis.speak(utterance)
      if (onTextToSpeech) {
        onTextToSpeech(text)
      }
    }
  }

  // Speech to text function
  const startListening = () => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = "en-US"
      
      recognition.onstart = () => setIsListening(true)
      recognition.onend = () => setIsListening(false)
      recognition.onerror = () => setIsListening(false)
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        if (onSpeechToText) {
          onSpeechToText(transcript)
        }
      }
      
      recognition.start()
    }
  }

  const stopListening = () => {
    setIsListening(false)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    playClickSound()
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMute}
        className="relative"
      >
        {isMuted ? (
          <VolumeX className="h-4 w-4" />
        ) : (
          <Volume2 className="h-4 w-4" />
        )}
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={isListening ? stopListening : startListening}
        className="relative"
      >
        {isListening ? (
          <MicOff className="h-4 w-4 text-red-500" />
        ) : (
          <Mic className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
}

// Hook for using voice system
export function useVoiceSystem() {
  const [isMuted, setIsMuted] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)

  const playClickSound = () => {
    if (!isMuted && typeof window !== "undefined") {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        oscillator.frequency.value = 800
        oscillator.type = "sine"
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
        
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.1)
      } catch (error) {
        console.log("Audio context not available")
      }
    }
  }

  const speak = (text: string) => {
    if (!isMuted && typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 1
      utterance.pitch = 1
      utterance.volume = 1
      
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      
      window.speechSynthesis.speak(utterance)
    }
  }

  const startListening = () => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = "en-US"
      
      recognition.onstart = () => setIsListening(true)
      recognition.onend = () => setIsListening(false)
      recognition.onerror = () => setIsListening(false)
      
      recognition.start()
    }
  }

  return {
    isMuted,
    isListening,
    isSpeaking,
    setIsMuted,
    playClickSound,
    speak,
    startListening
  }
}
