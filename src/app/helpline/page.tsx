"use client"

import { motion } from "framer-motion"
import { Phone, Globe, Shield, AlertTriangle, ExternalLink, Clock, Mail, MapPin, FileText, Users, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const emergencyContacts = [
  {
    title: "National Cyber Crime Reporting Portal",
    description: "Official government portal for reporting cybercrimes",
    phone: "1930",
    url: "https://cybercrime.gov.in",
    type: "Emergency",
    available: "24/7"
  },
  {
    title: "National Cyber Financial Fraud Helpline",
    description: "Immediate assistance for financial fraud cases",
    phone: "1930",
    url: "https://cybercrime.gov.in",
    type: "Emergency",
    available: "24/7"
  },
  {
    title: "Indian Cybercrime Coordination Centre (I4C)",
    description: "Central coordination for cybercrime response",
    url: "https://i4c.mha.gov.in/ncrp.aspx",
    type: "Government",
    available: "24/7"
  },
  {
    title: "CERT-In (Computer Emergency Response Team)",
    description: "Technical assistance and incident response",
    url: "https://www.cert-in.org.in",
    type: "Technical",
    available: "Business Hours"
  }
]

const legalResources = [
  {
    title: "Digital Personal Data Protection Act, 2023",
    description: "Comprehensive data protection legislation in India",
    url: "https://www.meity.gov.in/static/uploads/2024/02/Digital-Personal-Data-Protection-Act-2023.pdf",
    type: "Law",
    category: "Data Protection"
  },
  {
    title: "Information Technology Act, 2000",
    description: "Primary legislation for cybercrime and electronic commerce",
    url: "https://www.meity.gov.in/rules-and-regulations/information-technology-act-2000",
    type: "Law",
    category: "Cybercrime"
  },
  {
    title: "Consumer Protection Act, 2019",
    description: "Protection against unfair trade practices and fraud",
    url: "https://consumeraffairs.nic.in/acts-and-rules/consumer-protection-act-2019",
    type: "Law",
    category: "Consumer Rights"
  }
]

const supportServices = [
  {
    icon: <Users className="h-6 w-6" />,
    title: "Victim Support Groups",
    description: "Connect with others who have experienced similar situations",
    services: [
      "Online support communities",
      "Counseling services",
      "Legal aid connections",
      "Recovery resources"
    ]
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Legal Assistance",
    description: "Professional help for legal proceedings and documentation",
    services: [
      "Free legal consultation",
      "Document preparation help",
      "Court procedure guidance",
      "Evidence collection support"
    ]
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Documentation Help",
    description: "Guidance on preparing reports and maintaining evidence",
    services: [
      "Complaint filing assistance",
      "Evidence preservation tips",
      "Report templates",
      "Follow-up procedures"
    ]
  }
]

const quickActions = [
  {
    title: "Report a Cybercrime",
    description: "File an official complaint immediately",
    action: "File Report",
    priority: "high",
    url: "https://cybercrime.gov.in"
  },
  {
    title: "Freeze Bank Account",
    description: "Contact your bank to prevent further losses",
    action: "Contact Bank",
    priority: "high",
    url: "#"
  },
  {
    title: "Block Fraudulent Accounts",
    description: "Report and block scammer accounts on platforms",
    action: "Block Accounts",
    priority: "medium",
    url: "#"
  },
  {
    title: "Seek Legal Advice",
    description: "Get professional legal consultation",
    action: "Get Legal Help",
    priority: "medium",
    url: "#"
  }
]

export default function Helpline() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-red-500/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Helpline & Legal Support
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Immediate assistance and resources for cybercrime victims and those seeking legal guidance
          </p>
        </motion.div>

        {/* Emergency Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-800 dark:text-red-200">
                <AlertTriangle className="h-6 w-6" />
                Emergency Helpline: 1930
              </CardTitle>
              <CardDescription className="text-red-700 dark:text-red-300">
                Call immediately if you're a victim of cybercrime or financial fraud. Available 24/7.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-red-600 hover:bg-red-700">
                  <Phone className="mr-2 h-5 w-5" />
                  Call 1930 Now
                </Button>
                <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg">
                    <Globe className="mr-2 h-5 w-5" />
                    Report Online
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Quick Actions</h2>
            <p className="text-muted-foreground">Immediate steps to take if you're a victim</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <Card className={`h-full hover:shadow-lg transition-shadow duration-300 ${
                  action.priority === 'high' ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950' : ''
                }`}>
                  <CardHeader className="text-center">
                    <CardTitle className="text-lg">{action.title}</CardTitle>
                    <CardDescription>{action.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <a href={action.url}>
                      <Button size="sm">
                        {action.action}
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Emergency Contacts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Emergency Contacts</h2>
            <p className="text-muted-foreground">Official helpline numbers and reporting portals</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {emergencyContacts.map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{contact.title}</CardTitle>
                        <CardDescription className="mt-2">{contact.description}</CardDescription>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        contact.type === 'Emergency' 
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}>
                        {contact.type}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {contact.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-primary" />
                          <span className="font-medium">{contact.phone}</span>
                          <span className="text-sm text-muted-foreground">({contact.available})</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-primary" />
                        <a 
                        href={contact.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                      >
                        Visit Website
                        <ExternalLink className="h-3 w-3" />
                      </a>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="mr-1 h-3 w-3" />
                        Open Link
                      </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{contact.available}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Legal Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Legal Resources</h2>
            <p className="text-muted-foreground">Important laws and regulations for your protection</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {legalResources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">{resource.category}</span>
                      </div>
                      <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm">
                          View Document
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Support Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-12"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Support Services</h2>
            <p className="text-muted-foreground">Additional help and resources for victims</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supportServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        {service.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.services.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Important Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                <AlertTriangle className="h-5 w-5" />
                Important Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                The information provided on this page is for educational purposes only and does not constitute legal advice. 
                For specific legal guidance, please consult with qualified legal professionals. In case of emergency, 
                contact the official helpline numbers immediately.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
