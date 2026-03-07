"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Upload, Image, FileText, AlertTriangle, CheckCircle, Shield, Eye, Brain, Zap } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useVoiceSystem } from "@/components/voice-system"

interface AnalysisResult {
  deceptionScore: number
  consistencyScore: number
  riskLevel: "Low" | "Medium" | "High"
  visualEvidence: string[]
  linguisticEvidence: string[]
  crossModalEvidence: string[]
}

export default function Analyzer() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [caption, setCaption] = useState("")
  const [postUrl, setPostUrl] = useState("")
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const { speak, playClickSound } = useVoiceSystem()

  const handleAnalyze = async () => {
    if (!imageFile && !caption) {
      playClickSound()
      alert("Please upload an image or enter a caption to analyze")
      return
    }

    setIsAnalyzing(true)
    playClickSound()
    
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Mock analysis result
    const mockResult: AnalysisResult = {
      deceptionScore: Math.floor(Math.random() * 40) + 30, // 30-70 range
      consistencyScore: Math.floor(Math.random() * 30) + 50, // 50-80 range
      riskLevel: "Medium",
      visualEvidence: [
        "Potential image manipulation detected",
        "Inconsistent lighting patterns",
        "Unusual metadata found"
      ],
      linguisticEvidence: [
        "Sensational language detected",
        "Clickbait-style phrasing",
        "Uncertainty markers present"
      ],
      crossModalEvidence: [
        "Caption doesn't fully match visual content",
        "Context inconsistencies found",
        "Temporal mismatch detected"
      ]
    }
    
    setResult(mockResult)
    setIsAnalyzing(false)
    
    // Speak the result
    const resultText = `Analysis complete. Deception score: ${mockResult.deceptionScore}. Consistency score: ${mockResult.consistencyScore}. Risk level: ${mockResult.riskLevel}.`
    speak(resultText)
  }

  const getScoreColor = (score: number) => {
    if (score < 40) return "text-green-500"
    if (score < 70) return "text-yellow-500"
    return "text-red-500"
  }

  const getRiskBadgeColor = (level: string) => {
    switch (level) {
      case "Low": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "High": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const Speedometer = ({ score, label, max = 100 }: { score: number; label: string; max?: number }) => {
    const percentage = (score / max) * 100
    const rotation = (percentage * 180) / 100 - 90
    
    return (
      <div className="flex flex-col items-center">
        <div className="relative w-48 h-24">
          <svg viewBox="0 0 200 100" className="w-full h-full">
            {/* Background arc */}
            <path
              d="M 20 80 A 60 60 0 0 1 180 80"
              fill="none"
              stroke="currentColor"
              strokeWidth="12"
              className="text-muted-foreground/20"
            />
            {/* Colored zones */}
            <path
              d="M 20 80 A 60 60 0 0 1 60 40"
              fill="none"
              stroke="#10b981"
              strokeWidth="8"
              opacity={0.3}
            />
            <path
              d="M 60 40 A 60 60 0 0 1 140 40"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="8"
              opacity={0.3}
            />
            <path
              d="M 140 40 A 60 60 0 0 1 180 80"
              fill="none"
              stroke="#ef4444"
              strokeWidth="8"
              opacity={0.3}
            />
            {/* Needle */}
            <line
              x1="100"
              y1="80"
              x2={100 + 50 * Math.cos((rotation * Math.PI) / 180)}
              y2={80 + 50 * Math.sin((rotation * Math.PI) / 180)}
              stroke="currentColor"
              strokeWidth="3"
              className={getScoreColor(score)}
              style={{ transformOrigin: '100px 80px' }}
            />
            <circle cx="100" cy="80" r="4" fill="currentColor" className={getScoreColor(score)} />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center mt-8">
            <span className={`text-2xl font-bold ${getScoreColor(score)}`}>{score}</span>
          </div>
        </div>
        <p className="text-sm font-medium text-muted-foreground mt-2">{label}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Deception Analyzer
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload an image and caption to detect potential deception using our multimodal AI analysis
          </p>
        </motion.div>

        {!result ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-6 w-6 text-primary" />
                  Input Analysis
                </CardTitle>
                <CardDescription>
                  Provide the content you want to analyze for potential deception
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Image Upload */}
                <div className="space-y-2">
                  <Label htmlFor="image" className="text-sm font-medium">
                    Upload Image
                  </Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                    <input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    <label htmlFor="image" className="cursor-pointer">
                      {imageFile ? (
                        <div className="space-y-2">
                          <Image className="h-12 w-12 text-primary mx-auto" />
                          <p className="text-sm text-muted-foreground">{imageFile.name}</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
                          <p className="text-sm text-muted-foreground">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-muted-foreground">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* Caption Input */}
                <div className="space-y-2">
                  <Label htmlFor="caption" className="text-sm font-medium">
                    Caption / Text Content
                  </Label>
                  <Textarea
                    id="caption"
                    placeholder="Enter the caption or text content to analyze..."
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    rows={4}
                  />
                </div>

                {/* Post URL */}
                <div className="space-y-2">
                  <Label htmlFor="url" className="text-sm font-medium">
                    Post URL (Optional)
                  </Label>
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://example.com/post"
                    value={postUrl}
                    onChange={(e) => setPostUrl(e.target.value)}
                  />
                </div>

                {/* Analyze Button */}
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || (!imageFile && !caption)}
                  className="w-full"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="mr-2"
                      >
                        <Zap className="h-5 w-5" />
                      </motion.div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Brain className="mr-2 h-5 w-5" />
                      Start Analysis
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Risk Badge */}
            <div className="text-center">
              <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getRiskBadgeColor(result.riskLevel)}`}>
                <AlertTriangle className="mr-2 h-4 w-4" />
                Risk Level: {result.riskLevel}
              </span>
            </div>

            {/* Speedometers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Deception Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <Speedometer score={result.deceptionScore} label="Deception" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Consistency Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <Speedometer score={result.consistencyScore} label="Consistency" />
                </CardContent>
              </Card>
            </div>

            {/* Evidence Layers */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-primary" />
                    Visual Evidence
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result.visualEvidence.map((evidence, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{evidence}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Linguistic Evidence
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result.linguisticEvidence.map((evidence, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{evidence}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    Cross-Modal Evidence
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result.crossModalEvidence.map((evidence, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{evidence}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => setResult(null)} variant="outline">
                Analyze Another
              </Button>
              <Link href="/helpline">
                <Button>Get Help</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
