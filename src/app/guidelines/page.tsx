"use client"

import { motion } from "framer-motion"
import { CheckCircle, Shield, Eye, FileText, Brain, AlertTriangle, BookOpen, Users, Target } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const guidelines = [
  {
    icon: <Eye className="h-6 w-6" />,
    title: "Visual Content Verification",
    description: "How to spot manipulated images and deepfakes",
    tips: [
      "Check for inconsistent lighting and shadows",
      "Look for unnatural facial expressions or movements",
      "Examine image metadata for editing traces",
      "Reverse search images to verify original sources",
      "Be suspicious of unusually perfect or dramatic photos"
    ]
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Text Analysis Techniques",
    description: "Identifying deceptive language and patterns",
    tips: [
      "Watch for urgency and pressure tactics",
      "Be skeptical of guaranteed claims or promises",
      "Check for poor grammar and spelling errors",
      "Look for generic or copied content",
      "Verify information through multiple sources"
    ]
  },
  {
    icon: <Brain className="h-6 w-6" />,
    title: "Cross-Modal Verification",
    description: "Ensuring consistency between text and images",
    tips: [
      "Verify that captions match visual content",
      "Check temporal consistency in posts",
      "Look for contextual mismatches",
      "Verify location claims against visual evidence",
      "Be wary of contradictory information"
    ]
  }
]

const detectionChecklist = [
  {
    category: "Red Flags",
    items: [
      "Unsolicited messages with urgent requests",
      "Requests for personal or financial information",
      "Promises of unrealistic returns or benefits",
      "Poor grammar and unprofessional communication",
      "Pressure to act immediately without verification",
      "Requests for payment via unusual methods"
    ]
  },
  {
    category: "Verification Steps",
    items: [
      "Contact the person/organization through official channels",
      "Search for reviews and complaints online",
      "Check official websites and social media accounts",
      "Verify with friends, family, or professionals",
      "Use trusted fact-checking websites",
      "Document all communications and evidence"
    ]
  },
  {
    category: "Best Practices",
    items: [
      "Enable two-factor authentication on all accounts",
      "Keep software and antivirus updated",
      "Use strong, unique passwords for different services",
      "Regularly review privacy settings on social media",
      "Educate yourself about current scam trends",
      "Trust your instincts - if something feels wrong, investigate"
    ]
  }
]

const safetyProtocols = [
  {
    title: "Immediate Actions",
    steps: [
      "Stop all communication with the suspected scammer",
      "Do not send any money or personal information",
      "Screenshot and save all evidence",
      "Report the incident to relevant platforms",
      "Change passwords for potentially compromised accounts",
      "Contact your bank if financial information was shared"
    ]
  },
  {
    title: "Reporting Procedures",
    steps: [
      "File a complaint with cybercrime authorities",
      "Report to the platform where the scam occurred",
      "Notify consumer protection agencies",
      "Inform friends and family about the scam",
      "Consider filing a police report for significant losses",
      "Keep records of all reports filed"
    ]
  }
]

export default function Guidelines() {
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
            Detection Guidelines
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn how to identify and protect yourself from digital deception with our comprehensive verification techniques
          </p>
        </motion.div>

        {/* Main Guidelines */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {guidelines.map((guideline, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      {guideline.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{guideline.title}</CardTitle>
                      <CardDescription>{guideline.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {guideline.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Detection Checklist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-6 w-6 text-primary" />
                Detection Checklist
              </CardTitle>
              <CardDescription>
                Use this comprehensive checklist to evaluate potential scams
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {detectionChecklist.map((section, index) => (
                  <div key={index}>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      {section.category === "Red Flags" && <AlertTriangle className="h-4 w-4 text-red-500" />}
                      {section.category === "Verification Steps" && <Shield className="h-4 w-4 text-blue-500" />}
                      {section.category === "Best Practices" && <CheckCircle className="h-4 w-4 text-green-500" />}
                      {section.category}
                    </h3>
                    <ul className="space-y-2">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Safety Protocols */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {safetyProtocols.map((protocol, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    {protocol.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-3">
                    {protocol.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-medium">
                          {stepIndex + 1}
                        </span>
                        <span className="text-sm text-muted-foreground">{step}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Educational Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-12"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" />
                Educational Resources
              </CardTitle>
              <CardDescription>
                Expand your knowledge with these trusted learning materials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg hover:bg-accent transition-colors">
                  <h4 className="font-medium mb-2">Online Safety Courses</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Free courses on digital literacy and fraud prevention
                  </p>
                  <Button variant="outline" size="sm">Start Learning</Button>
                </div>
                <div className="p-4 border rounded-lg hover:bg-accent transition-colors">
                  <h4 className="font-medium mb-2">Scam Database</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Search our comprehensive database of known scams
                  </p>
                  <Button variant="outline" size="sm">Browse Database</Button>
                </div>
                <div className="p-4 border rounded-lg hover:bg-accent transition-colors">
                  <h4 className="font-medium mb-2">Video Tutorials</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Step-by-step guides for identifying different scam types
                  </p>
                  <Button variant="outline" size="sm">Watch Videos</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Community Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Users className="h-6 w-6" />
                Join Our Community
              </CardTitle>
              <CardDescription>
                Connect with others and stay updated on the latest security threats
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-6">
                Join thousands of users sharing experiences and helping others stay safe online.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg">
                  Join Community
                </Button>
                <Button variant="outline" size="lg">
                  Subscribe to Alerts
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
