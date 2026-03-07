"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, FileText, Image, AlertTriangle, CheckCircle, Eye, Trash2, Search, Filter, Calendar, Video } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface HistoryItem {
  id: string
  timestamp: Date
  type: "image" | "video" | "text" | "url"
  content: string
  deceptionScore: number
  consistencyScore: number
  riskLevel: "Low" | "Medium" | "High"
  status: "completed" | "processing" | "failed"
  thumbnail?: string
  caption?: string
  url?: string
  threatType?: string
  threatDescription?: string
  modelScores?: {
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

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"all" | "image" | "video" | "text" | "url">("all")
  const [filterRisk, setFilterRisk] = useState<"all" | "Low" | "Medium" | "High">("all")

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("spotling-history")
    if (savedHistory) {
      const parsed = JSON.parse(savedHistory)
      setHistory(parsed.map((item: any) => ({
        ...item,
        timestamp: new Date(item.timestamp)
      })))
    }
  }, [])

  // Filter history based on search and filters
  const filteredHistory = history.filter(item => {
    const matchesSearch = item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.caption && item.caption.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (item.url && item.url.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesType = filterType === "all" || item.type === filterType
    const matchesRisk = filterRisk === "all" || item.riskLevel === filterRisk

    return matchesSearch && matchesType && matchesRisk
  })

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low": return "bg-green-500"
      case "Medium": return "bg-yellow-500"
      case "High": return "bg-red-500"
      default: return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4 text-green-500" />
      case "processing": return <Clock className="h-4 w-4 text-blue-500" />
      case "failed": return <AlertTriangle className="h-4 w-4 text-red-500" />
      default: return null
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "image": return <Image className="h-4 w-4" />
      case "video": return <Video className="h-4 w-4" />
      case "text": return <FileText className="h-4 w-4" />
      case "url": return <Eye className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).format(date)
  }

  const deleteItem = (id: string) => {
    const updatedHistory = history.filter(item => item.id !== id)
    setHistory(updatedHistory)
    localStorage.setItem("spotling-history", JSON.stringify(updatedHistory))
  }

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem("spotling-history")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Analysis History
          </h1>
          <p className="text-gray-300 text-lg">
            Track and review your previous deception detection analyses
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search history..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/5 border-white/20 text-white placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Type Filter */}
                <div className="flex gap-2">
                  <Button
                    variant={filterType === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterType("all")}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    All
                  </Button>
                  <Button
                    variant={filterType === "image" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterType("image")}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <Image className="h-4 w-4 mr-1" />
                    Images
                  </Button>
                  <Button
                    variant={filterType === "video" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterType("video")}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <Video className="h-4 w-4 mr-1" />
                    Videos
                  </Button>
                  <Button
                    variant={filterType === "text" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterType("text")}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    Text
                  </Button>
                  <Button
                    variant={filterType === "url" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterType("url")}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    URLs
                  </Button>
                </div>

                {/* Risk Filter */}
                <div className="flex gap-2">
                  <Button
                    variant={filterRisk === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterRisk("all")}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    All Risks
                  </Button>
                  <Button
                    variant={filterRisk === "Low" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterRisk("Low")}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    Low
                  </Button>
                  <Button
                    variant={filterRisk === "Medium" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterRisk("Medium")}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    Medium
                  </Button>
                  <Button
                    variant={filterRisk === "High" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterRisk("High")}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    High
                  </Button>
                </div>

                {/* Clear History */}
                {history.length > 0 && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={clearHistory}
                    className="bg-red-500/20 border-red-500/50 text-red-300 hover:bg-red-500/30"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Clear All
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* History List */}
        <div className="space-y-4">
          {filteredHistory.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-gray-400 text-lg">
                {history.length === 0 ? (
                  <>
                    <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No analysis history yet</p>
                    <p className="text-sm mt-2">Start by analyzing some content in the Analyzer!</p>
                  </>
                ) : (
                  <>
                    <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No items match your filters</p>
                    <p className="text-sm mt-2">Try adjusting your search or filter criteria</p>
                  </>
                )}
              </div>
              <Link href="/analyzer">
                <Button className="mt-6 bg-purple-600 hover:bg-purple-700">
                  Go to Analyzer
                </Button>
              </Link>
            </motion.div>
          ) : (
            <AnimatePresence>
              {filteredHistory.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          {/* Header */}
                          <div className="flex items-center gap-3 mb-3">
                            {getTypeIcon(item.type)}
                            <div className="flex items-center gap-2">
                              {getStatusIcon(item.status)}
                              <span className="text-white font-medium capitalize">
                                {item.type} Analysis
                              </span>
                            </div>
                            <Badge className={`${getRiskColor(item.riskLevel)} text-white`}>
                              {item.riskLevel} Risk
                            </Badge>
                            <span className="text-gray-400 text-sm">
                              {formatDate(item.timestamp)}
                            </span>
                          </div>

                          {/* Content Preview */}
                          <div className="mb-4">
                            {item.type === "image" && item.thumbnail && (
                              <div className="flex items-center gap-4">
                                <img
                                  src={item.thumbnail}
                                  alt="Analysis thumbnail"
                                  className="w-16 h-16 rounded-lg object-cover"
                                />
                                <div>
                                  <p className="text-gray-300 text-sm">
                                    Image analysis completed
                                  </p>
                                  {item.caption && (
                                    <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                                      "{item.caption}"
                                    </p>
                                  )}
                                </div>
                              </div>
                            )}
                            {item.type === "text" && (
                              <p className="text-gray-300 text-sm line-clamp-3">
                                "{item.content}"
                              </p>
                            )}
                            {item.type === "url" && (
                              <div>
                                <p className="text-gray-300 text-sm">
                                  URL Analysis
                                </p>
                                <p className="text-blue-400 text-xs mt-1 truncate">
                                  {item.url}
                                </p>
                              </div>
                            )}
                          </div>

                          {/* Scores */}
                          <div className="flex items-center gap-6">
                            <div>
                              <p className="text-gray-400 text-xs mb-1">Deception Score</p>
                              <div className="flex items-center gap-2">
                                <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full ${getRiskColor(item.riskLevel)}`}
                                    style={{ width: `${item.deceptionScore}%` }}
                                  />
                                </div>
                                <span className="text-white text-sm font-medium">
                                  {item.deceptionScore}%
                                </span>
                              </div>
                            </div>
                            <div>
                              <p className="text-gray-400 text-xs mb-1">Consistency Score</p>
                              <div className="flex items-center gap-2">
                                <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full ${item.consistencyScore > 70 ? 'bg-green-500' : item.consistencyScore > 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                    style={{ width: `${item.consistencyScore}%` }}
                                  />
                                </div>
                                <span className="text-white text-sm font-medium">
                                  {item.consistencyScore}%
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-white/20 text-white hover:bg-white/10"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteItem(item.id)}
                            className="border-red-500/50 text-red-300 hover:bg-red-500/20"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Stats */}
        {history.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-6">
                <h3 className="text-white font-semibold mb-4">Statistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{history.length}</p>
                    <p className="text-gray-400 text-sm">Total Analyses</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-400">
                      {history.filter(item => item.riskLevel === "Low").length}
                    </p>
                    <p className="text-gray-400 text-sm">Low Risk</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-yellow-400">
                      {history.filter(item => item.riskLevel === "Medium").length}
                    </p>
                    <p className="text-gray-400 text-sm">Medium Risk</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-400">
                      {history.filter(item => item.riskLevel === "High").length}
                    </p>
                    <p className="text-gray-400 text-sm">High Risk</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}
