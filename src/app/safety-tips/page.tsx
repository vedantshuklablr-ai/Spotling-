"use client"

import { motion } from "framer-motion"
import { Shield, Lock, Eye, Smartphone, Mail, Globe, CheckCircle, AlertTriangle, Users, Key, Wifi, Database } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const safetyCategories = [
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: "Mobile Security",
    description: "Protect your devices and personal data",
    tips: [
      "Enable biometric authentication (fingerprint/face ID)",
      "Keep apps updated from official stores only",
      "Review app permissions regularly",
      "Avoid public Wi-Fi for sensitive transactions",
      "Use VPN when connecting to unknown networks",
      "Enable remote wipe capabilities"
    ]
  },
  {
    icon: <Mail className="h-6 w-6" />,
    title: "Email & Communication",
    description: "Secure your digital communications",
    tips: [
      "Verify sender addresses before clicking links",
      "Enable two-factor authentication on email accounts",
      "Be cautious of urgent or threatening messages",
      "Never share passwords via email",
      "Use encrypted email services for sensitive communication",
      "Report phishing attempts immediately"
    ]
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Social Media Safety",
    description: "Protect your online presence and reputation",
    tips: [
      "Set profiles to private when possible",
      "Be selective about friend/follower requests",
      "Avoid sharing personal location information",
      "Think before posting personal details",
      "Regularly review privacy settings",
      "Be skeptical of messages from new contacts"
    ]
  },
  {
    icon: <Lock className="h-6 w-6" />,
    title: "Financial Security",
    description: "Protect your money and financial information",
    tips: [
      "Use strong, unique passwords for banking apps",
      "Enable transaction alerts and notifications",
      "Never share OTP codes with anyone",
      "Verify payment requests through separate channels",
      "Use credit cards instead of debit cards online",
      "Regularly review account statements"
    ]
  }
]

const warningSigns = [
  {
    title: "Urgency and Pressure",
    description: "Scammers often create false urgency to prevent you from thinking clearly.",
    examples: [
      "Limited time offer - act now!",
      "Your account will be suspended immediately",
      "This opportunity expires in 1 hour",
      "Send money within 24 hours or face consequences"
    ]
  },
  {
    title: "Too Good to Be True",
    description: "If something seems unusually good, it's probably a scam.",
    examples: [
      "Guaranteed 100% returns on investment",
      "You've won a lottery you never entered",
      "Free luxury items with no catch",
      "Get rich quick with no effort required"
    ]
  },
  {
    title: "Request for Personal Information",
    description: "Legitimate organizations rarely ask for sensitive information unexpectedly.",
    examples: [
      "Verify your account by sending your password",
      "We need your bank details to process your prize",
      "Update your security information immediately",
      "Confirm your identity with your SSN/PAN"
    ]
  },
  {
    title: "Unusual Payment Methods",
    description: "Scammers prefer payment methods that are hard to trace or reverse.",
    examples: [
      "Pay only via gift cards or cryptocurrency",
      "Wire transfer to an individual's account",
      "Payment through unofficial payment apps",
      "Cash delivery to unknown locations"
    ]
  }
]

const protectiveMeasures = [
  {
    icon: <Key className="h-8 w-8 text-primary" />,
    title: "Strong Passwords",
    description: "Create complex passwords and use a password manager",
    action: "Use passwords with 12+ characters, including symbols and numbers"
  },
  {
    icon: <Shield className="h-8 w-8 text-primary" />,
    title: "Two-Factor Authentication",
    description: "Add an extra layer of security to your accounts",
    action: "Enable 2FA on all important accounts (email, banking, social media)"
  },
  {
    icon: <Database className="h-8 w-8 text-primary" />,
    title: "Regular Backups",
    description: "Keep your important data safe and accessible",
    action: "Backup important files to cloud storage and external drives"
  },
  {
    icon: <Wifi className="h-8 w-8 text-primary" />,
    title: "Secure Networks",
    description: "Be careful about where and how you connect",
    action: "Avoid public Wi-Fi for sensitive activities, use VPN when necessary"
  }
]

export default function SafetyTips() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-green-500/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Safety Tips
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Essential practices to protect yourself from digital deception and online threats
          </p>
        </motion.div>

        {/* Safety Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {safetyCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary">
                      {category.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{category.title}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.tips.map((tip, tipIndex) => (
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

        {/* Warning Signs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-destructive" />
                Common Warning Signs
              </CardTitle>
              <CardDescription>
                Learn to recognize these red flags to avoid falling victim to scams
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {warningSigns.map((warning, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2 text-destructive">{warning.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{warning.description}</p>
                    <div className="space-y-1">
                      {warning.examples.map((example, exampleIndex) => (
                        <div key={exampleIndex} className="flex items-start gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-destructive mt-2 flex-shrink-0" />
                          <span className="text-xs text-muted-foreground italic">"{example}"</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Protective Measures */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Essential Protective Measures</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Implement these fundamental security practices to stay safe online
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {protectiveMeasures.map((measure, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="mx-auto p-3 bg-primary/10 rounded-lg w-fit">
                      {measure.icon}
                    </div>
                    <CardTitle className="text-lg">{measure.title}</CardTitle>
                    <CardDescription>{measure.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{measure.action}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Action Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-12"
        >
          <Card>
            <CardHeader>
              <CardTitle>Quick Safety Actions</CardTitle>
              <CardDescription>
                Immediate steps you can take right now to improve your security
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Review and update your social media privacy settings</span>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Enable two-factor authentication on email accounts</span>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Update passwords for financial and shopping apps</span>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Install antivirus software on all devices</span>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Set up transaction alerts on bank accounts</span>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Bookmark official government cyber security websites</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Community Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Users className="h-6 w-6" />
                Stay Protected Together
              </CardTitle>
              <CardDescription>
                Security is a team effort. Share these tips with friends and family.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-6">
                Help create a safer digital environment by spreading awareness and looking out for each other.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg">
                  Share Safety Tips
                </Button>
                <Button variant="outline" size="lg">
                  Join Safety Community
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
