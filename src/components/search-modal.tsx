"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, FileText, AlertTriangle, Shield, Eye, Brain, HelpCircle, ExternalLink } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface SearchResult {
  id: string
  title: string
  description: string
  category: string
  url: string
  icon: React.ReactNode
}

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const allContent: SearchResult[] = [
    {
      id: "1",
      title: "Deception Analyzer",
      description: "Upload images and text to detect potential deception using AI",
      category: "Tool",
      url: "/analyzer",
      icon: <Brain className="h-4 w-4" />
    },
    {
      id: "2", 
      title: "Fraud Alerts",
      description: "Latest scam patterns and trending fraud warnings",
      category: "Alerts",
      url: "/fraud-alerts",
      icon: <AlertTriangle className="h-4 w-4" />
    },
    {
      id: "3",
      title: "Detection Guidelines",
      description: "Learn how to identify and verify digital content",
      category: "Guide",
      url: "/guidelines",
      icon: <Shield className="h-4 w-4" />
    },
    {
      id: "4",
      title: "Safety Tips",
      description: "Essential practices for online security and protection",
      category: "Safety",
      url: "/safety-tips",
      icon: <Eye className="h-4 w-4" />
    },
    {
      id: "5",
      title: "Emergency Helpline",
      description: "24/7 cybercrime reporting and support services",
      category: "Help",
      url: "/helpline",
      icon: <HelpCircle className="h-4 w-4" />
    },
    {
      id: "6",
      title: "Contact Support",
      description: "Get help from our team or browse FAQs",
      category: "Support",
      url: "/contact",
      icon: <FileText className="h-4 w-4" />
    },
    {
      id: "7",
      title: "Visual Forensics",
      description: "How to spot manipulated images and deepfakes",
      category: "Technique",
      url: "/guidelines#visual",
      icon: <Eye className="h-4 w-4" />
    },
    {
      id: "8",
      title: "Text Analysis",
      description: "Identifying deceptive language patterns",
      category: "Technique",
      url: "/guidelines#text",
      icon: <FileText className="h-4 w-4" />
    },
    {
      id: "9",
      title: "Report Cybercrime",
      description: "File official complaints with authorities",
      category: "Action",
      url: "/helpline#report",
      icon: <AlertTriangle className="h-4 w-4" />
    },
    {
      id: "10",
      title: "Deepfake Detection",
      description: "Advanced techniques for identifying AI-generated content",
      category: "Technology",
      url: "/guidelines#deepfake",
      icon: <Brain className="h-4 w-4" />
    }
  ]

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setResults([])
      return
    }

    const filtered = allContent.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 6)

    setResults(filtered)
  }, [searchQuery])

  const handleResultClick = (url: string) => {
    window.location.href = url
    onClose()
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Tool": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "Alerts": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "Guide": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Safety": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Help": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "Support": return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
      case "Technique": return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200"
      case "Action": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      case "Technology": return "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200"
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed left-1/2 top-20 z-50 w-full max-w-2xl -translate-x-1/2"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="border shadow-2xl">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 p-4 border-b">
                  <Search className="h-5 w-5 text-muted-foreground" />
                  <Input
                    ref={inputRef}
                    placeholder="Search for features, guides, help topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-0 shadow-none focus-visible:ring-0 px-0"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {searchQuery.trim() !== "" && (
                  <div className="max-h-96 overflow-y-auto">
                    {results.length > 0 ? (
                      <div className="p-2">
                        {results.map((result) => (
                          <div
                            key={result.id}
                            onClick={() => handleResultClick(result.url)}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent cursor-pointer transition-colors"
                          >
                            <div className="p-2 bg-primary/10 rounded-lg text-primary mt-0.5">
                              {result.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-medium">{result.title}</h3>
                                <span className={`px-2 py-0.5 rounded text-xs font-medium ${getCategoryColor(result.category)}`}>
                                  {result.category}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {result.description}
                              </p>
                            </div>
                            <ExternalLink className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center">
                        <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="font-medium mb-2">No results found</h3>
                        <p className="text-sm text-muted-foreground">
                          Try searching with different keywords
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {searchQuery.trim() === "" && (
                  <div className="p-6">
                    <h3 className="font-medium mb-3">Popular Searches</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        "How to detect deepfakes",
                        "Report cybercrime",
                        "Safety guidelines",
                        "Contact support"
                      ].map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => setSearchQuery(suggestion)}
                          className="text-left p-2 rounded text-sm hover:bg-accent transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
