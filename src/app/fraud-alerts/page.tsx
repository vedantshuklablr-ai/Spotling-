"use client"

import { motion } from "framer-motion"
import { AlertTriangle, TrendingUp, Shield, Clock, ExternalLink, Filter } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const fraudAlerts = [
  {
    id: 1,
    title: "AI-Generated Celebrity Endorsement Scams",
    description: "Scammers are using deepfake technology to create fake celebrity endorsements for fraudulent investment schemes.",
    severity: "High",
    category: "Deepfake",
    date: "2024-03-15",
    platforms: ["Instagram", "TikTok", "YouTube"],
    keywords: ["celebrity endorsement", "investment opportunity", "guaranteed returns"],
    advice: "Verify celebrity endorsements through official channels. Be skeptical of unsolicited investment offers."
  },
  {
    id: 2,
    title: "Fake Job Offer Phishing Campaigns",
    description: "Sophisticated phishing emails impersonating major companies with fake job offers to steal personal information.",
    severity: "Medium",
    category: "Phishing",
    date: "2024-03-14",
    platforms: ["Email", "LinkedIn"],
    keywords: ["job offer", "work from home", "immediate hiring"],
    advice: "Always verify job offers through company official websites. Never share sensitive data via email."
  },
  {
    id: 3,
    title: "Cryptocurrency Giveaway Scams",
    description: "Fake giveaways promising to double cryptocurrency investments, often using fake screenshots and testimonials.",
    severity: "High",
    category: "Crypto",
    date: "2024-03-13",
    platforms: ["Twitter", "Telegram", "Discord"],
    keywords: ["crypto giveaway", "double your bitcoin", "free ethereum"],
    advice: "Legitimate giveaways never require you to send crypto first. Use official exchange platforms."
  },
  {
    id: 4,
    title: "Online Shopping Account Takeover",
    description: "Scammers gaining access to shopping accounts to make fraudulent purchases and steal payment information.",
    severity: "Medium",
    category: "Account Security",
    date: "2024-03-12",
    platforms: ["Amazon", "eBay", "Shopify stores"],
    keywords: ["account verification", "payment update", "security check"],
    advice: "Enable two-factor authentication. Never share login credentials or OTP codes."
  },
  {
    id: 5,
    title: "Fake Charity Donation Requests",
    description: "Fraudulent charity campaigns exploiting current events and disasters to solicit donations.",
    severity: "High",
    category: "Charity Fraud",
    date: "2024-03-11",
    platforms: ["Facebook", "Email", "SMS"],
    keywords: ["emergency relief", "disaster fund", "help victims"],
    advice: "Donate only through verified charity organizations. Check official registration numbers."
  },
  {
    id: 6,
    title: "Romance Investment Scams",
    description: "Combination of romance scams and investment fraud where victims are manipulated by fake online partners.",
    severity: "High",
    category: "Romance Scam",
    date: "2024-03-10",
    platforms: ["Dating Apps", "WhatsApp", "Instagram"],
    keywords: ["exclusive investment", "secret opportunity", "future together"],
    advice: "Never send money to someone you've never met. Be wary of investment advice from online relationships."
  }
]

const trendingKeywords = [
  { keyword: "AI-generated content", trend: "up", mentions: 1247 },
  { keyword: "crypto scam", trend: "up", mentions: 892 },
  { keyword: "phishing email", trend: "stable", mentions: 756 },
  { keyword: "fake job offer", trend: "up", mentions: 634 },
  { keyword: "charity fraud", trend: "down", mentions: 423 },
  { keyword: "romance scam", trend: "stable", mentions: 389 }
]

export default function FraudAlerts() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "Medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Low": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Deepfake": return "🤖"
      case "Phishing": return "🎣"
      case "Crypto": return "₿"
      case "Account Security": return "🔐"
      case "Charity Fraud": return "❤️"
      case "Romance Scam": return "💔"
      default: return "⚠️"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-destructive/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Fraud Alerts
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay informed about the latest scam patterns and fraudulent activities targeting users
          </p>
        </motion.div>

        {/* Trending Keywords */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Trending Fraud Keywords
              </CardTitle>
              <CardDescription>
                Most commonly reported scam terms in the last 7 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {trendingKeywords.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{item.keyword}</span>
                      {item.trend === "up" && <TrendingUp className="h-4 w-4 text-green-500" />}
                      {item.trend === "down" && <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />}
                      {item.trend === "stable" && <div className="h-4 w-4 bg-gray-400 rounded-full" />}
                    </div>
                    <span className="text-sm text-muted-foreground">{item.mentions} mentions</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filter Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              All Categories
            </Button>
            <Button variant="outline" size="sm">High Severity</Button>
            <Button variant="outline" size="sm">Last 24 Hours</Button>
            <Button variant="outline" size="sm">Social Media</Button>
          </div>
        </motion.div>

        {/* Fraud Alerts List */}
        <div className="space-y-6">
          {fraudAlerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getCategoryIcon(alert.category)}</span>
                      <div>
                        <CardTitle className="text-xl">{alert.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Clock className="h-4 w-4" />
                          {alert.date} • {alert.category}
                        </CardDescription>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(alert.severity)}`}>
                      {alert.severity}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{alert.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-medium mb-2">Affected Platforms:</h4>
                      <div className="flex flex-wrap gap-2">
                        {alert.platforms.map((platform, idx) => (
                          <span key={idx} className="px-2 py-1 bg-primary/10 text-primary rounded text-sm">
                            {platform}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Watch Keywords:</h4>
                      <div className="flex flex-wrap gap-2">
                        {alert.keywords.map((keyword, idx) => (
                          <span key={idx} className="px-2 py-1 bg-muted rounded text-sm">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg mb-4">
                    <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                      <Shield className="h-4 w-4 inline mr-2" />
                      Safety Advice:
                    </h4>
                    <p className="text-blue-800 dark:text-blue-200 text-sm">{alert.advice}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Report ID: #{alert.id.toString().padStart(6, '0')}
                    </span>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Report Similar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-12 text-center"
        >
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <AlertTriangle className="h-6 w-6 text-destructive" />
                See Something Suspicious?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                If you encounter any of these scams or similar fraudulent activities, report them immediately.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg">
                  Report Fraud
                </Button>
                <Button variant="outline" size="lg">
                  Get Help
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
