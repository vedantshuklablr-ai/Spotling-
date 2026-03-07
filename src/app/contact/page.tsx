"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Users, HelpCircle, ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const faqs = [
  {
    question: "How accurate is Spotling's deception detection?",
    answer: "Spotling uses advanced AI algorithms trained on millions of data points to achieve over 95% accuracy in detecting various forms of digital deception. However, no system is perfect, and we always recommend human verification for critical decisions."
  },
  {
    question: "What types of content can Spotling analyze?",
    answer: "Spotling can analyze images, text content, and the relationship between them. This includes social media posts, news articles, advertisements, and other digital content. We currently support common image formats (JPG, PNG, GIF) and text analysis in multiple languages."
  },
  {
    question: "Is my data secure and private?",
    answer: "Yes, we take data privacy very seriously. All uploaded content is encrypted and processed securely. We don't store personal information longer than necessary, and you can request data deletion at any time. Read our privacy policy for more details."
  },
  {
    question: "How quickly does Spotling provide results?",
    answer: "Most analyses are completed within 30-60 seconds. Complex cases with multiple images or lengthy text may take up to 2 minutes. We're continuously optimizing our system for faster processing."
  },
  {
    question: "Can Spotling detect deepfakes?",
    answer: "Yes, Spotling is specifically trained to detect various forms of deepfakes and AI-generated content. Our visual forensics can identify inconsistencies typical of manipulated media, though the technology is constantly evolving."
  },
  {
    question: "What should I do if Spotling detects deception?",
    answer: "If Spotling flags content as potentially deceptive, we recommend: 1) Don't share or engage with the content, 2) Report it to the relevant platform, 3) Warn others if appropriate, 4) Contact authorities if it involves illegal activities or financial fraud."
  },
  {
    question: "Is Spotling free to use?",
    answer: "Spotling offers a free tier with basic analysis capabilities. Premium features, advanced analytics, and API access are available through paid subscriptions. Check our pricing page for detailed information."
  },
  {
    question: "How can I report a false positive or negative?",
    answer: "We value user feedback to improve our system. You can report false results through the 'Report Issue' button in your analysis results, or contact our support team directly with details about the case."
  }
]

const contactInfo = [
  {
    icon: <Mail className="h-6 w-6" />,
    title: "Email Support",
    description: "Get help via email",
    contact: "support@spotling.ai",
    responseTime: "24-48 hours"
  },
  {
    icon: <Phone className="h-6 w-6" />,
    title: "Phone Support",
    description: "Emergency assistance",
    contact: "+91-1930 (Cybercrime)",
    responseTime: "24/7"
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "Live Chat",
    description: "Real-time assistance",
    contact: "Available on website",
    responseTime: "Business hours"
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    title: "Office Location",
    description: "Corporate headquarters",
    contact: "Bangalore, India",
    responseTime: "By appointment"
  }
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission here
    alert("Thank you for your message. We'll get back to you soon!")
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-500/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Contact & Support
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get in touch with our team for assistance, feedback, or partnership opportunities
          </p>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="mx-auto p-3 bg-primary/10 rounded-lg text-primary w-fit">
                      {info.icon}
                    </div>
                    <CardTitle className="text-lg">{info.title}</CardTitle>
                    <CardDescription>{info.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium mb-2">{info.contact}</p>
                    <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{info.responseTime}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5 text-primary" />
                  Send us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="How can we help you?"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Please describe your issue or question in detail..."
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>
                  Find quick answers to common questions about Spotling
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border rounded-lg">
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-accent transition-colors"
                      >
                        <span className="font-medium">{faq.question}</span>
                        {expandedFaq === index ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                      {expandedFaq === index && (
                        <div className="px-4 pb-3">
                          <p className="text-sm text-muted-foreground">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                Additional Resources
              </CardTitle>
              <CardDescription>
                More ways to get help and stay informed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary w-fit mx-auto mb-3">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2">Community Forum</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Connect with other users and share experiences
                  </p>
                  <Button variant="outline" size="sm">Join Forum</Button>
                </div>
                <div className="text-center">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary w-fit mx-auto mb-3">
                    <HelpCircle className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2">Help Center</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Detailed guides and tutorials
                  </p>
                  <Button variant="outline" size="sm">Browse Help</Button>
                </div>
                <div className="text-center">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary w-fit mx-auto mb-3">
                    <Mail className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2">Newsletter</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Stay updated with latest features and security tips
                  </p>
                  <Button variant="outline" size="sm">Subscribe</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
