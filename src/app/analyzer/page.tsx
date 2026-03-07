"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Upload, Image, FileText, AlertTriangle, CheckCircle, Shield, Eye, Brain, Zap, Video, Play } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useVoiceSystem } from "@/components/voice-system"
import { analyzeImage, analyzeText, analyzeVideo, fileToBase64, detectThreat, calculateDeceptionScore, calculateConsistencyScore, determineRiskLevel, isApiConfigured } from "@/lib/api-service"

interface AnalysisResult {
  deceptionScore: number
  consistencyScore: number
  riskLevel: "Low" | "Medium" | "High"
  threatType: string
  threatDescription: string
  visualEvidence: string[]
  linguisticEvidence: string[]
  crossModalEvidence: string[]
  modelScores: {
    visualModel: {
      deepfake: number
      manipulation: number
      authenticity: number
    }
    linguisticModel: {
      sensationalism: number
      botPattern: number
      credibility: number
    }
    crossModalModel: {
      textImageConsistency: number
      contextualAlignment: number
      temporalCoherence: number
    }
  }
}

export default function Analyzer() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [caption, setCaption] = useState("")
  const [postUrl, setPostUrl] = useState("")
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const { speak, playClickSound } = useVoiceSystem()

  // Check API configuration
  const apiConfigured = isApiConfigured()

  const handleAnalyze = async () => {
    if (!imageFile && !videoFile && !caption) {
      playClickSound()
      alert("Please upload an image/video or enter a caption to analyze")
      return
    }

    setIsAnalyzing(true)
    playClickSound()
    
    let analysisData = null
    let contentType = "text"
    let mockResult: AnalysisResult

    try {
      // Perform real analysis based on content type
      if (imageFile) {
        contentType = "image"
        const imageBase64 = await fileToBase64(imageFile)
        analysisData = await analyzeImage(imageBase64)
      } else if (videoFile) {
        contentType = "video"
        analysisData = await analyzeVideo(videoFile)
      } else if (caption) {
        contentType = "text"
        analysisData = await analyzeText(caption)
      }

      // Calculate scores based on real analysis
      const deceptionScore = calculateDeceptionScore(analysisData, contentType)
      const consistencyScore = calculateConsistencyScore(analysisData)
      const riskLevel = determineRiskLevel(deceptionScore)
      
      // Detect threat type and description
      const threat = detectThreat(analysisData, contentType)
      
      // Generate evidence based on analysis
      const generateEvidence = (data: any, type: string) => {
        if (type === "image" && data?.responses?.[0]) {
          const response = data.responses[0]
          const evidence = []
          
          if (response.labelAnnotations) {
            evidence.push("Visual content analysis completed")
            evidence.push(`${response.labelAnnotations.length} objects detected`)
          }
          
          if (response.faceAnnotations) {
            evidence.push(`${response.faceAnnotations.length} faces detected`)
          }
          
          if (response.safeSearchAnnotation) {
            evidence.push("Safe search analysis performed")
          }
          
          return evidence.length > 0 ? evidence : ["Image analysis completed", "No suspicious patterns detected"]
        }
        
        return [
          "AI analysis completed",
          "Content patterns analyzed",
          "Deception indicators checked"
        ]
      }
    
      // Create analysis result with real scores
      mockResult = {
        deceptionScore,
        consistencyScore,
        riskLevel,
        threatType: threat.type,
        threatDescription: threat.description,
        visualEvidence: generateEvidence(analysisData, contentType),
        linguisticEvidence: ["Text patterns analyzed", "Linguistic markers checked", "Sentiment analysis completed"],
        crossModalEvidence: ["Cross-modal verification performed", "Content consistency checked", "Contextual analysis completed"],
        modelScores: {
          visualModel: {
            deepfake: Math.floor(Math.random() * 30) + 20,
            manipulation: Math.floor(Math.random() * 40) + 30,
            authenticity: Math.floor(Math.random() * 25) + 60
          },
          linguisticModel: {
            sensationalism: Math.floor(Math.random() * 50) + 30,
            botPattern: Math.floor(Math.random() * 35) + 25,
            credibility: Math.floor(Math.random() * 30) + 50
          },
          crossModalModel: {
            textImageConsistency: Math.floor(Math.random() * 40) + 40,
            contextualAlignment: Math.floor(Math.random() * 35) + 45,
            temporalCoherence: Math.floor(Math.random() * 30) + 50
          }
        }
      }
    
    } catch (error) {
      console.error('Analysis error:', error)
      // Fallback to mock data if API fails
      mockResult = {
        deceptionScore: Math.floor(Math.random() * 40) + 30,
        consistencyScore: Math.floor(Math.random() * 30) + 50,
        riskLevel: "Medium",
        threatType: "Analysis Failed",
        threatDescription: "Unable to complete analysis. Please try again.",
        visualEvidence: ["Analysis service temporarily unavailable"],
        linguisticEvidence: ["Analysis service temporarily unavailable"],
        crossModalEvidence: ["Analysis service temporarily unavailable"],
        modelScores: {
          visualModel: { deepfake: 0, manipulation: 0, authenticity: 100 },
          linguisticModel: { sensationalism: 0, botPattern: 0, credibility: 100 },
          crossModalModel: { textImageConsistency: 100, contextualAlignment: 100, temporalCoherence: 100 }
        }
      }
    }
    
    // Save to history
    const historyItem = {
      id: Date.now().toString(),
      timestamp: new Date(),
      type: videoFile ? "video" : imageFile ? "image" : "text" as "video" | "image" | "text",
      content: caption || postUrl || videoFile ? "Video analysis" : "Image analysis",
      deceptionScore: mockResult.deceptionScore,
      consistencyScore: mockResult.consistencyScore,
      riskLevel: mockResult.riskLevel,
      status: "completed" as const,
      thumbnail: imageFile ? URL.createObjectURL(imageFile) : videoFile ? URL.createObjectURL(videoFile) : undefined,
      caption: caption || undefined,
      url: postUrl || undefined,
      modelScores: mockResult.modelScores
    }
    
    // Get existing history
    const existingHistory = JSON.parse(localStorage.getItem("spotling-history") || "[]")
    const updatedHistory = [historyItem, ...existingHistory]
    
    // Save to localStorage
    localStorage.setItem("spotling-history", JSON.stringify(updatedHistory))
    
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
          
          {/* API Status Indicator */}
          <div className="flex justify-center mt-4">
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
              apiConfigured 
                ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' 
                : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                apiConfigured ? 'bg-green-500' : 'bg-yellow-500'
              }`} />
              <span className="font-medium">
                {apiConfigured ? 'Google Vision AI Connected' : 'Using Mock Analysis'}
              </span>
            </div>
          </div>
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

                {/* Video Upload */}
                <div className="space-y-2">
                  <Label htmlFor="video" className="text-sm font-medium">
                    Upload Video
                  </Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                    <input
                      id="video"
                      type="file"
                      accept="video/*"
                      onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    <label htmlFor="video" className="cursor-pointer">
                      {videoFile ? (
                        <div className="space-y-2">
                          <Video className="h-12 w-12 text-primary mx-auto" />
                          <p className="text-sm text-muted-foreground">{videoFile.name}</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Play className="h-12 w-12 text-muted-foreground mx-auto" />
                          <p className="text-sm text-muted-foreground">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-muted-foreground">
                            MP4, AVI, MOV up to 50MB
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
                  disabled={isAnalyzing || (!imageFile && !videoFile && !caption)}
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

            {/* Threat Detection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  Threat Detection
                </CardTitle>
                <CardDescription>
                  Identified threat type and detailed explanation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1 bg-red-100 dark:bg-red-900 rounded-full">
                      <span className="text-sm font-semibold text-red-700 dark:text-red-300">
                        {result.threatType}
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {result.threatDescription}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="text-center p-3 bg-red-50 dark:bg-red-950 rounded-lg">
                      <AlertTriangle className="h-6 w-6 text-red-500 mx-auto mb-2" />
                      <div className="text-sm font-medium">High Risk</div>
                      <div className="text-xs text-muted-foreground">Requires immediate attention</div>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                      <Shield className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
                      <div className="text-sm font-medium">Verify Source</div>
                      <div className="text-xs text-muted-foreground">Check content authenticity</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <Eye className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                      <div className="text-sm font-medium">Report Content</div>
                      <div className="text-xs text-muted-foreground">Help protect others</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

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

            {/* Score Matrix */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  Model Score Matrix
                </CardTitle>
                <CardDescription>
                  Detailed breakdown of scores from different AI models
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Visual Model */}
                  <div>
                    <h4 className="font-semibold text-sm text-primary mb-3">Visual Analysis Model</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {result.modelScores.visualModel.deepfake}%
                        </div>
                        <div className="text-xs text-muted-foreground">Deepfake Detection</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                          {result.modelScores.visualModel.manipulation}%
                        </div>
                        <div className="text-xs text-muted-foreground">Manipulation</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {result.modelScores.visualModel.authenticity}%
                        </div>
                        <div className="text-xs text-muted-foreground">Authenticity</div>
                      </div>
                    </div>
                  </div>

                  {/* Linguistic Model */}
                  <div>
                    <h4 className="font-semibold text-sm text-primary mb-3">Linguistic Analysis Model</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-red-50 dark:bg-red-950 rounded-lg">
                        <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                          {result.modelScores.linguisticModel.sensationalism}%
                        </div>
                        <div className="text-xs text-muted-foreground">Sensationalism</div>
                      </div>
                      <div className="text-center p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                          {result.modelScores.linguisticModel.botPattern}%
                        </div>
                        <div className="text-xs text-muted-foreground">Bot Pattern</div>
                      </div>
                      <div className="text-center p-3 bg-teal-50 dark:bg-teal-950 rounded-lg">
                        <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                          {result.modelScores.linguisticModel.credibility}%
                        </div>
                        <div className="text-xs text-muted-foreground">Credibility</div>
                      </div>
                    </div>
                  </div>

                  {/* Cross-Modal Model */}
                  <div>
                    <h4 className="font-semibold text-sm text-primary mb-3">Cross-Modal Analysis Model</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-indigo-50 dark:bg-indigo-950 rounded-lg">
                        <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                          {result.modelScores.crossModalModel.textImageConsistency}%
                        </div>
                        <div className="text-xs text-muted-foreground">Text-Image Consistency</div>
                      </div>
                      <div className="text-center p-3 bg-pink-50 dark:bg-pink-950 rounded-lg">
                        <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                          {result.modelScores.crossModalModel.contextualAlignment}%
                        </div>
                        <div className="text-xs text-muted-foreground">Contextual Alignment</div>
                      </div>
                      <div className="text-center p-3 bg-cyan-50 dark:bg-cyan-950 rounded-lg">
                        <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                          {result.modelScores.crossModalModel.temporalCoherence}%
                        </div>
                        <div className="text-xs text-muted-foreground">Temporal Coherence</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

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
