# 📊 MongoDB Integration API Documentation

## Overview

The application now includes MongoDB integration for storing and retrieving analysis results. All analysis data is automatically saved to MongoDB, and several API endpoints are available for data retrieval and statistics.

## Prerequisites

### MongoDB Installation

**Option 1: Local MongoDB**
```bash
# Windows - Download and install from https://www.mongodb.com/try/download/community
# macOS
brew install mongodb-community
brew services start mongodb-community

# Linux
sudo apt-get install mongodb
sudo systemctl start mongodb
```

**Option 2: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Copy connection string
4. Add to `.env` file

### Setup .env File

```bash
cp .env.example .env
```

Edit `.env`:
```env
# For local MongoDB
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB=deception_analyzer

# For MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net
MONGODB_DB=deception_analyzer
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

## API Endpoints

### 1. **POST /analyze** - Analyze Social Media Post
Main analysis endpoint (existing).

**Request:**
```bash
curl -X POST http://localhost:5000/analyze \
  -F "media=@photo.jpg" \
  -F "caption=Check this out!" \
  -F "link_url=https://example.com" (optional)
```

**Response:**
```json
{
  "deception_score": 45,
  "consistency_score": 72,
  "explanations": ["..."],
  "media_type": "image",
  "media_filename": "photo.jpg",
  "link_url": "https://example.com",
  "_id": "507f1f77bcf86cd799439011"
}
```

---

### 2. **GET /api/stats** - Get Analysis Statistics
Retrieve aggregated statistics from all stored analyses.

**Request:**
```bash
curl http://localhost:5000/api/stats
```

**Response:**
```json
{
  "total_analyses": 150,
  "avg_deception_score": 42.5,
  "avg_consistency_score": 68.3,
  "max_deception_score": 98,
  "min_deception_score": 5
}
```

**Use Cases:**
- Dashboard statistics
- Trend analysis
- Performance monitoring

---

### 3. **GET /api/history** - Get Recent Analyses
Retrieve paginated history of past analyses.

**Parameters:**
- `limit` (query): Number of results (default: 50, max: 100)
- `skip` (query): Number to skip for pagination (default: 0)

**Request:**
```bash
# Get first 50 analyses
curl http://localhost:5000/api/history

# Get next 50 (pagination)
curl "http://localhost:5000/api/history?limit=50&skip=50"

# Get last 20 analyses
curl "http://localhost:5000/api/history?limit=20"
```

**Response:**
```json
{
  "analyses": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "timestamp": "2026-02-27T15:30:45.123456",
      "deception_score": 45,
      "consistency_score": 72,
      "media_type": "image",
      "media_filename": "photo.jpg",
      "caption": "Check this out!",
      "caption_length": 16,
      "explanation": ["..."]
    }
  ],
  "total": 150,
  "limit": 50,
  "skip": 0
}
```

**Use Cases:**
- View recent analyses
- Build analysis history UI
- Export data

---

### 4. **GET /api/analyses/{id}** - Get Specific Analysis
Retrieve a single analysis by MongoDB ObjectId.

**Parameters:**
- `id` (path): MongoDB ObjectId as string

**Request:**
```bash
curl http://localhost:5000/api/analyses/507f1f77bcf86cd799439011
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "timestamp": "2026-02-27T15:30:45.123456",
  "deception_score": 45,
  "consistency_score": 72,
  "explanations": ["Caption contains...", "Media type suggests..."],
  "media_type": "image",
  "media_filename": "photo.jpg",
  "link_url": "",
  "caption": "Check this out!",
  "caption_length": 16
}
```

**Status Codes:**
- `200` - Success
- `404` - Analysis not found

**Use Cases:**
- View detailed analysis
- Audit specific posts
- Download analysis details

---

### 5. **GET /api/analyses/search/by-score** - Search by Score Range
Search analyses by deception score range.

**Parameters:**
- `min` (query): Minimum deception score (0-100, default: 0)
- `max` (query): Maximum deception score (0-100, default: 100)
- `limit` (query): Max results (default: 50, max: 100)

**Request:**
```bash
# High risk analyses (deception > 70)
curl "http://localhost:5000/api/analyses/search/by-score?min=70&max=100"

# Low risk analyses
curl "http://localhost:5000/api/analyses/search/by-score?min=0&max=30"

# Medium risk with limit
curl "http://localhost:5000/api/analyses/search/by-score?min=30&max=70&limit=20"
```

**Response:**
```json
{
  "analyses": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "timestamp": "2026-02-27T15:30:45.123456",
      "deception_score": 85,
      "consistency_score": 35,
      "media_type": "image",
      "media_filename": "suspicious.jpg",
      "caption": "Unbelievable! You won't believe this!",
      "caption_length": 39,
      "explanations": ["..."]
    }
  ],
  "count": 23,
  "score_range": {
    "min": 70,
    "max": 100
  }
}
```

**Use Cases:**
- Find high-risk posts
- Filter by suspicion level
- Content moderation
- Research patterns

---

## MongoDB Collections

### analyses Collection

Store structure:
```javascript
{
  _id: ObjectId,                        // Unique identifier
  timestamp: Date,                      // When analysis was performed
  deception_score: Number,              // 0-100
  consistency_score: Number,            // 0-100
  explanations: [String],               // Why the scores
  media_type: String,                   // image/video/unknown
  media_filename: String,               // Original filename
  link_url: String,                     // External link if mentioned
  caption: String,                      // Post caption text
  caption_length: Number                // Length of caption
}
```

### Indexes
Automatically created for performance:
- `timestamp` - Sort by date
- `deception_score` - Filter by score
- `consistency_score` - Filter by consistency
- `timestamp` (descending) - Latest first

---

## Code Examples

### Python/Flask (Backend)

```python
from models.analysis import Analysis

# Get all analyses
all = Analysis.find_all(limit=100)

# Find high-risk posts
high_risk = Analysis.find_by_score_range(min_deception=70, limit=50)

# Get statistics
stats = Analysis.get_stats()
print(f"Total analyses: {stats['total_analyses']}")
print(f"Average deception: {stats['avg_deception_score']}")

# Count total
total = Analysis.count_total()
```

### JavaScript/Frontend (Frontend)

```javascript
// Get statistics
async function getStats() {
  const response = await fetch('/api/stats');
  const data = await response.json();
  console.log(`Total analyses: ${data.total_analyses}`);
}

// Get recent history
async function getHistory(limit = 50, skip = 0) {
  const url = `/api/history?limit=${limit}&skip=${skip}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(`${data.analyses.length} analyses found`);
}

// Search high-risk posts
async function searchHighRisk() {
  const response = await fetch('/api/analyses/search/by-score?min=70&max=100');
  const data = await response.json();
  console.log(`${data.count} high-risk posts found`);
}

// Get specific analysis
async function getAnalysis(id) {
  const response = await fetch(`/api/analyses/${id}`);
  const data = await response.json();
  console.log(data);
}
```

### cURL Examples

```bash
#!/bin/bash

# Test if MongoDB is connected
curl http://localhost:5000/api/stats

# Get first 20 analyses
curl "http://localhost:5000/api/history?limit=20"

# Find suspicious content
curl "http://localhost:5000/api/analyses/search/by-score?min=75"

# Get specific analysis
curl http://localhost:5000/api/analyses/507f1f77bcf86cd799439011

# Export recent analyses as JSON
curl "http://localhost:5000/api/history?limit=100" | jq . > export.json
```

---

## Error Handling

### Common Errors

**MongoDB Connection Failed**
```json
{
  "error": "Database connection failed"
}
// App still works - analyses are performed but not stored
```

**Invalid Analysis ID**
```json
{
  "status_code": 404,
  "error": "Analysis not found"
}
```

**Invalid Score Range**
```json
{
  "status_code": 400,
  "error": "Score must be between 0 and 100"
}
```

---

## Database Maintenance

### Backup MongoDB

```bash
# Local MongoDB
mongodump --db deception_analyzer --out backup/

# MongoDB Atlas
# Use Atlas UI -> Backup

# Restore from backup
mongorestore backup/deception_analyzer/
```

### Monitor Collections

```bash
# Check connection
mongosh
> db.adminCommand({ ping: 1 })

# View collections
> show collections

# Count analyses
> db.analyses.countDocuments()

# View latest analyses
> db.analyses.find().sort({ timestamp: -1 }).limit(5)

# Get statistics
> db.analyses.aggregate([{
  $group: {
    _id: null,
    avg_deception: { $avg: "$deception_score" },
    count: { $sum: 1 }
  }
}])
```

### Clean Old Data (Optional)

```bash
# Remove analyses older than 30 days
db.analyses.deleteMany({
  timestamp: { $lt: new Date(Date.now() - 30*24*60*60*1000) }
})
```

---

## Troubleshooting

### MongoDB Not Available
- Check MongoDB is running: `mongosh`
- Check connection string in `.env`
- For Atlas: Verify IP whitelist includes your IP

### Slow Queries
- Check indexes are created: `db.analyses.getIndexes()`
- Monitor with: `db.setProfilingLevel(1); db.system.profile.find().limit(5).sort({ts:-1}).pretty()`

### Out of Memory
- MongoDB default: 50% of available RAM
- Check: `db.stats()` to see size
- Clean old data if needed

---

## Performance Tips

✅ **Optimize Queries**
- Pagination: Use skip/limit
- Indexing: Filters use timestamp, scores
- Aggregation: Use /api/stats instead of loading all

✅ **Connection Pooling**
- Flask with MongoClient: Auto-pooled
- Default: 50 connections
- Adjust if needed: `MongoClient(..., maxPoolSize=100)`

✅ **Data Retention**
- Set TTL index for automatic cleanup:
  ```javascript
  db.analyses.createIndex({ "timestamp": 1 }, { expireAfterSeconds: 2592000 })
  // Deletes after 30 days
  ```

---

## Next Steps

1. **Start App**: `python app.py`
2. **Perform Analysis**: Upload image + caption
3. **Check MongoDB**: Verify data stored
4. **Query History**: Visit `/api/history`
5. **Build Dashboard**: Use `/api/stats` for analytics

---

**Last Updated:** February 2026  
**Version:** 1.0  
**Status:** Production Ready
