"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Shield, Eye, Brain, AlertTriangle, CheckCircle, ArrowRight, Zap, Lock, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="absolute inset-0">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
          ></motion.div>
          <motion.div 
            animate={{ 
              y: [0, -30, 0],
              x: [0, 20, 0],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-20 right-10 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl"
          ></motion.div>
          <motion.div 
            animate={{ 
              scale: [1, 0.8, 1],
              opacity: [0.05, 0.15, 0.05]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/2 left-1/3 w-32 h-32 bg-primary/20 rounded-full blur-xl"
          ></motion.div>
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex justify-center mb-6">
              <motion.div
                animate={{ 
                  rotateY: [0, 360],
                  scale: [1, 1.1, 1],
                  rotateZ: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-teal-500/20 rounded-full blur-xl scale-150"></div>
                <div className="relative p-6 rounded-full bg-gradient-to-br from-primary/10 to-teal-500/10 backdrop-blur-sm border border-primary/20 shadow-2xl">
                  <Shield className="h-16 w-16 text-primary relative z-10" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-pulse"></div>
                </div>
              </motion.div>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary/80 bg-clip-text text-transparent">
              Spotling
            </h1>
            
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 text-muted-foreground">
              Multimodal Deception Detector
            </h2>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              We check the image. We check the caption. We cross-verify both.
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/analyzer">
              <Button size="lg" className="text-lg px-8 py-6 w-full sm:w-auto">
                <Zap className="mr-2 h-5 w-5" />
                Try Analyzer
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <Link href="/guidelines">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 w-full sm:w-auto">
                <Shield className="mr-2 h-5 w-5" />
                Learn More
              </Button>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Visual Forensics</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Linguistic Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Cross-Modal Verification</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background/50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-teal-500/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How Spotling Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Advanced AI-powered analysis across multiple modalities to detect deception
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-300 border-primary/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative z-10">
                  <motion.div 
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="mb-4"
                  >
                    <Eye className="h-12 w-12 text-primary" />
                  </motion.div>
                  <CardTitle>Visual Forensics</CardTitle>
                  <CardDescription>
                    Analyzes image artifacts, anatomical inconsistencies, and deepfake traces
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Image manipulation detection</li>
                    <li>• Deepfake identification</li>
                    <li>• Metadata analysis</li>
                    <li>• Visual consistency checks</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-300 border-primary/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative z-10">
                  <motion.div 
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="mb-4"
                  >
                    <Brain className="h-12 w-12 text-primary" />
                  </motion.div>
                  <CardTitle>Linguistic Forensics</CardTitle>
                  <CardDescription>
                    Detects sensational language, bot-like patterns, and uncertainty markers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Sentiment analysis</li>
                    <li>• Bot detection patterns</li>
                    <li>• Clickbait identification</li>
                    <li>• Language consistency</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-300 border-primary/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative z-10">
                  <motion.div 
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="mb-4"
                  >
                    <AlertTriangle className="h-12 w-12 text-primary" />
                  </motion.div>
                  <CardTitle>Cross-Modal Analysis</CardTitle>
                  <CardDescription>
                    Verifies consistency between visual content and textual claims
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Image-text consistency</li>
                    <li>• Context verification</li>
                    <li>• Claim validation</li>
                    <li>• Risk scoring</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-primary/5 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
          <motion.div 
            animate={{ 
              x: [0, 100, 0],
              opacity: [0, 0.5, 0]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl"
          ></motion.div>
          <motion.div 
            animate={{ 
              y: [0, -20, 0],
              opacity: [0, 0.3, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-10 right-20 w-24 h-24 bg-teal-500/10 rounded-full blur-xl"
          ></motion.div>
        </div>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Detect Deception?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of users protecting themselves from digital fraud
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/analyzer">
                <Button size="lg" className="text-lg px-8 py-6 w-full sm:w-auto">
                  Start Analysis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/helpline">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 w-full sm:w-auto">
                  <Lock className="mr-2 h-5 w-5" />
                  Get Help
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              <span className="text-sm">Global Protection</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <span className="text-sm">Enterprise Security</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              <span className="text-sm">Real-time Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm">99.9% Accuracy</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
