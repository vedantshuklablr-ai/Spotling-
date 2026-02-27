# 🔍 Spotling – Multimodal Deception Analyzer

A lightweight, laptop-friendly application for analyzing social media posts to detect potential deception indicators and text-image inconsistencies.

## Overview

This tool helps identify suspicious patterns in social media posts by analyzing the relationship between captions and media. It uses simple, interpretable heuristics rather than complex ML models, making it fast and runnable on any device.

### Key Features

- **🖼️ Media Upload**: Support for images (JPG, PNG, GIF, WebP) and videos (MP4, AVI, MOV, WebM)
- **📝 Caption Analysis**: Analyzes text for suspicious keywords, exaggeration, and uncertainty indicators
- **🎯 Dual Scoring System**:
  - **Deception Score**: Indicates likelihood of deceptive content (0-100)
  - **Consistency Score**: Measures text-image alignment (0-100)
- **💡 Explainable Results**: Clear explanations for why content received specific scores
- **⚡ Fast & Local**: Runs entirely on your machine without external APIs
- **🎨 Modern UI**: Responsive, accessible interface with smooth animations

## Project Structure

```
PROJECT PANDAV/
├── app.py                 # Flask backend with analysis logic
├── requirements.txt       # Python dependencies
├── templates/
│   └── index.html        # Frontend HTML template
├── static/
│   ├── css/
│   │   └── style.css     # Styling and animations
│   ├── js/
│   │   └── main.js       # JavaScript interactivity
│   └── uploads/          # Uploaded media files (created at runtime)
└── README.md             # This file
```

## Installation

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

### Setup

1. **Clone or navigate to the project directory:**
   ```bash
   cd "PROJECT PANDAV"
   ```

2. **Create a virtual environment (recommended):**
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

## Running the Application

1. **Start the Flask development server:**
   ```bash
   python app.py
   ```

2. **Open your browser and navigate to:**
   ```
   http://localhost:5000
   ```

3. **Upload a social media post:**
   - Select an image or video
   - Paste the caption text
   - (Optional) Add an external URL if mentioned in the post
   - Click "Analyze Post"

## Usage Guide

### How the Analysis Works

#### Deception Score (0-100)
- **0-30**: Low suspicion of deception
- **31-70**: Moderate risk – review carefully
- **71-100**: High risk – caption may misrepresent media

The score increases based on:
- Suspicious keywords (fake, edited, deepfake, etc.)
- Exaggeration language (shocking, unbelievable, etc.)
- Very short or vague captions
- Uncertainty indicators (maybe, idk, not sure)
- Caption-media mismatches

#### Consistency Score (0-100)
- **70-100**: Caption appears consistent with media
- **40-69**: Some inconsistencies present
- **0-39**: Low consistency – caption may not match

The score considers:
- Media type alignment (image vs video references)
- Filename-caption relationship
- External link mentions
- Context and detail matching

### Interpreting Explanations

Each result includes specific explanations for the scores. These help understand which factors contributed to the analysis:

- ✓ Green checkmarks indicate trustworthy patterns
- ⚠️ Yellow warnings highlight potential issues
- 🚨 Red alerts indicate high-risk indicators

## Technical Details

### Backend (Flask)

- **Security**: File size limits (50MB max), file type validation, secure filename handling
- **Logging**: Request and error logging for debugging
- **Error Handling**: Comprehensive error responses for invalid inputs
- **Heuristics**: Rule-based analysis without external ML dependencies

### Frontend (HTML/CSS/JavaScript)

- **Accessibility**: ARIA labels, keyboard navigation, semantic HTML
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Client-side Validation**: Immediate feedback before submission
- **Smooth Animations**: Progress bars and loading states
- **Character Counter**: Real-time caption length tracking

## What This Website Does

Spotling takes an image or video and its caption from a social media post, then applies simple heuristic rules to calculate a deception score and a consistency score. Users receive clear explanations highlighting why the content may be misleading or trustworthy.

## Limitations & Disclaimers

⚠️ **This is a prototype system and should be used cautiously:**

1. **Simple Heuristics**: Uses keyword matching and pattern detection, not AI/ML models
2. **High False Positives**: May flag legitimate sarcasm, satire, or humor as suspicious
3. **No Image Analysis**: Only analyzes the caption text, not visual content
4. **Limited Accuracy**: Should never be used as sole basis for content moderation
5. **No Training**: Results not used for model improvement (privacy-respecting)
6. **Context-Unaware**: Doesn't understand cultural context or linguistic nuance

### Intended Use

- **Educational**: Learn about deception detection patterns
- **Experimentation**: Test hypotheses about text-image consistency
- **Rapid Prototyping**: Quick feedback on caption-media pairs
- **Research**: Baseline comparison for more advanced models

### Not Suitable For

- Professional content moderation
- Legal decisions
- Security authentication
- Detecting sophisticated deepfakes

## Configuration

### Adjusting Analysis Weights

Edit `app.py` to modify keyword lists and scoring weights:

```python
suspicious_keywords = ["fake", "edited", "ai generated", ...]
exaggeration_keywords = ["unbelievable", "shocking", ...]
```

### Changing Port

In `app.py`, modify the last line:
```python
app.run(debug=False, host="127.0.0.1", port=5000)  # Change 5000 to desired port
```

## API Reference

### POST /analyze

Analyze a social media post for deception indicators.

**Request:**
- `media` (file): Image or video file
- `caption` (string): Post caption text
- `link_url` (string, optional): External URL from post

**Response:**
```json
{
  "deception_score": 45,
  "consistency_score": 72,
  "explanations": [
    "Caption contains...",
    "Media type suggests..."
  ],
  "media_type": "image",
  "media_filename": "photo.jpg",
  "link_url": ""
}
```

## Troubleshooting

### Port Already in Use
```bash
# Change port in app.py or kill the process
lsof -i :5000  # Find process
kill -9 <PID>  # Kill it
```

### File Upload Fails
- Check file size (max 50MB)
- Verify file format is supported
- Ensure sufficient disk space in `static/uploads/`

### Server Won't Start
- Verify Python and Flask installed: `pip show Flask`
- Check for syntax errors: `python -m py_compile app.py`
- Try a different port

### Analysis Seems Off
- Remember: This is a simple heuristic system
- Results depend heavily on caption wording
- Visual content is not analyzed
- Consider the explanations, not just the score

## Development

### Project Dependencies

- **Flask**: Web framework
- **Werkzeug**: WSGI utilities and file handling

### Code Style

- Python: PEP 8 compliant
- JavaScript: ES6+ with clear comments
- CSS: Mobile-first responsive design

### Adding Features

Common enhancements:
- Integrate real ML models (CLIP, BERT)
- Add image analysis (histogram, metadata)
- Implement database for result history
- Add user accounts and saved analyses
- Create API for batch processing

## License & Attribution

This project is provided for educational and experimental use. Feel free to modify and extend it for your needs.

## Support & Feedback

For issues, suggestions, or improvements:
1. Check the troubleshooting section above
2. Review the code comments for implementation details
3. Test with different caption-media combinations
4. Consider the limitations before relying on results

---

**Last Updated:** February 2026  
**Version:** 1.0  
**Status:** Active Prototype
