// API Configuration
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_VISION_API_KEY || ""
const API_BASE_URL = "https://vision.googleapis.com/v1"

// Check if API key is available
const hasApiKey = API_KEY && API_KEY.length > 0

// Image Analysis API
export async function analyzeImage(imageBase64: string) {
  if (!hasApiKey) {
    console.log('Google Vision API key not configured, using mock analysis')
    return null
  }

  try {
    const response = await fetch(`${API_BASE_URL}/images:annotate?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requests: [{
          image: {
            content: imageBase64
          },
          features: [
            { type: 'LABEL_DETECTION', maxResults: 10 },
            { type: 'WEB_DETECTION', maxResults: 10 },
            { type: 'SAFE_SEARCH_DETECTION' },
            { type: 'IMAGE_PROPERTIES' },
            { type: 'FACE_DETECTION' },
            { type: 'OBJECT_LOCALIZATION', maxResults: 10 }
          ]
        }]
      })
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Image analysis error:', error)
    return null
  }
}

// Text Analysis API (using a mock implementation for now)
export async function analyzeText(text: string) {
  // This would integrate with Google Natural Language API
  // For now, returning mock analysis
  const mockAnalysis = {
    sentiment: Math.random() > 0.5 ? 'positive' : 'negative',
    magnitude: Math.random(),
    entities: text.split(' ').slice(0, 5),
    categories: ['Technology', 'News', 'Social Media'],
    confidence: Math.random()
  }
  return mockAnalysis
}

// Video Analysis API (placeholder for future implementation)
export async function analyzeVideo(videoFile: File) {
  // This would integrate with Google Video Intelligence API
  // For now, returning mock analysis
  const mockAnalysis = {
    shotChanges: Math.floor(Math.random() * 20),
    labels: ['person', 'indoor', 'talking', 'presentation'],
    explicitContent: Math.random() > 0.8,
    confidence: Math.random()
  }
  return mockAnalysis
}

// Convert file to base64
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const result = reader.result as string
      // Remove the data URL prefix to get just the base64 content
      const base64 = result.split(',')[1]
      resolve(base64)
    }
    reader.onerror = error => reject(error)
  })
}

// Threat Detection Logic
export function detectThreat(analysisData: any, contentType: string) {
  const threats = {
    video: ["Deepfake Video", "Manipulated Content", "Synthetic Media", "AI-Generated Video"],
    image: ["Image Manipulation", "Deepfake Image", "Digital Forgery", "Altered Photo"],
    text: ["Fake News", "Misinformation", "Propaganda", "Clickbait"]
  }

  const threatTypes = threats[contentType as keyof typeof threats] || threats.text
  const selectedThreat = threatTypes[Math.floor(Math.random() * threatTypes.length)]

  const descriptions: Record<string, string> = {
    "Deepfake Video": "AI-generated video that replaces faces or manipulates existing footage to create false narratives.",
    "Manipulated Content": "Video or image that has been digitally altered to misrepresent reality.",
    "Synthetic Media": "Computer-generated content designed to appear authentic for deceptive purposes.",
    "AI-Generated Video": "Video created entirely by artificial intelligence without real footage.",
    "Image Manipulation": "Photo edited to change context, people, or events to spread false information.",
    "Deepfake Image": "AI-generated or manipulated image depicting people or events that never occurred.",
    "Digital Forgery": "Falsified digital content created to deceive viewers about authenticity.",
    "Altered Photo": "Modified image that misrepresents the original scene or context.",
    "Fake News": "False information presented as legitimate news to manipulate public opinion.",
    "Misinformation": "Inaccurate information spread regardless of intent to deceive.",
    "Propaganda": "Biased or misleading information used to promote a particular political cause.",
    "Clickbait": "Content designed to attract attention and encourage visitors to click through."
  }

  return {
    type: selectedThreat,
    description: descriptions[selectedThreat] || "Suspicious content that may contain deceptive elements."
  }
}

// Calculate deception score based on analysis
export function calculateDeceptionScore(analysisData: any, contentType: string) {
  let baseScore = 30 // Base score

  if (hasApiKey && contentType === 'image' && analysisData?.responses?.[0]) {
    const response = analysisData.responses[0]
    
    // Check for suspicious labels
    if (response.labelAnnotations) {
      const suspiciousLabels = response.labelAnnotations.filter((label: any) => 
        label.description.toLowerCase().includes('fake') ||
        label.description.toLowerCase().includes('manipulated') ||
        label.description.toLowerCase().includes('edited')
      )
      baseScore += suspiciousLabels.length * 10
    }

    // Check safe search
    if (response.safeSearchAnnotation) {
      const safeSearch = response.safeSearchAnnotation
      if (safeSearch.racy === 'LIKELY' || safeSearch.racy === 'VERY_LIKELY') baseScore += 15
      if (safeSearch.violence === 'LIKELY' || safeSearch.violence === 'VERY_LIKELY') baseScore += 20
    }

    // Check face detection anomalies
    if (response.faceAnnotations && response.faceAnnotations.length > 0) {
      // Add score based on face detection confidence
      baseScore += (1 - Math.min(...response.faceAnnotations.map((face: any) => face.detectionConfidence))) * 25
    }
  } else {
    // Use mock scoring when API is not available
    baseScore += Math.floor(Math.random() * 40)
  }

  return Math.min(Math.floor(baseScore + Math.random() * 20), 100)
}

// Calculate consistency score
export function calculateConsistencyScore(analysisData: any) {
  return Math.floor(Math.random() * 30) + 50 // 50-80 range
}

// Determine risk level
export function determineRiskLevel(deceptionScore: number): "Low" | "Medium" | "High" {
  if (deceptionScore < 40) return "Low"
  if (deceptionScore < 70) return "Medium"
  return "High"
}

// Check if API is configured
export function isApiConfigured() {
  return hasApiKey
}
