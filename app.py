import os
import logging
import datetime
from pathlib import Path
from werkzeug.utils import secure_filename
from flask import Flask, render_template, request, jsonify

# Import configuration and database modules
from config import active_config
from db import MongoDatabase
from models.analysis import Analysis


# Configuration
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
UPLOAD_FOLDER = os.path.join(BASE_DIR, "static", "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Security limits
MAX_FILE_SIZE = active_config.MAX_FILE_SIZE
ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png', 'gif', 'webp', 'mp4', 'avi', 'mov', 'webm'}

# Logging configuration
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["MAX_CONTENT_LENGTH"] = MAX_FILE_SIZE

# Laptop demo mode: MongoDB is optional and disabled by default.
# Enable only if you actually have MongoDB running locally or via Atlas.
MONGODB_ENABLED = os.getenv("ENABLE_MONGODB", "0").strip().lower() in ("1", "true", "yes", "y")


def allowed_file(filename: str) -> bool:
    """Check if file extension is allowed."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def simple_analysis(
    caption: str,
    media_filename: str,
    media_type: str | None = None,
    link_url: str | None = None,
):
    """
    Analyze a social media post for deception indicators using lightweight heuristics.
    
    This function performs rule-based analysis to detect suspicious patterns in captions
    and identify inconsistencies between the caption and media type. It's designed to
    work on any system without requiring heavy ML models.
    
    Args:
        caption: The text caption from the social media post
        media_filename: Name of the media file (for filename-based heuristics)
        media_type: Type of media ('image', 'video', or None)
        link_url: Optional external URL mentioned in the post
    
    Returns:
        tuple: (inconsistency_score, consistency_score, explanations)
            - inconsistency_score (0-100): Higher = more suspicious
            - consistency_score (0-100): Higher = more trustworthy
            - explanations: List of strings explaining the analysis
    """
    caption_lower = caption.lower()

    # Basic keyword-based "inconsistency" detector
    suspicious_keywords = ["fake", "edited", "ai generated", "deepfake", "not real"]
    exaggeration_keywords = ["unbelievable", "shocking", "you won't believe", "must see"]

    inconsistency_score = 0

    if any(word in caption_lower for word in suspicious_keywords):
        inconsistency_score += 35

    if any(word in caption_lower for word in exaggeration_keywords):
        inconsistency_score += 25

    # Heuristic based on caption length (very short, very vague captions)
    if len(caption.split()) < 4:
        inconsistency_score += 20

    # Light penalty if caption contains obvious uncertainty
    if "maybe" in caption_lower or "idk" in caption_lower or "not sure" in caption_lower:
        inconsistency_score += 10

    # Use media filename as a tiny hint (for prototype / experiment)
    filename_lower = media_filename.lower()
    filename_keywords = ["cat", "dog", "car", "food", "meme"]
    filename_matches = [w for w in filename_keywords if w in filename_lower]
    caption_matches = [w for w in filename_keywords if w in caption_lower]

    if filename_matches and not caption_matches:
        inconsistency_score += 20

    # Simple media-type and link-based heuristics
    video_words = ["video", "watch", "clip", "play", "live"]
    link_words = ["link", "below", "bio", "website", "read more", "full story"]

    if media_type == "image" and any(w in caption_lower for w in video_words):
        inconsistency_score += 20

    if media_type == "video" and not any(w in caption_lower for w in video_words):
        inconsistency_score += 10

    if link_url:
        if not any(w in caption_lower for w in link_words):
            inconsistency_score += 10

    # Clamp to [0, 100]
    inconsistency_score = max(0, min(100, inconsistency_score))

    # Derive a "consistency" score as the complement (for prototype)
    consistency_score = 100 - inconsistency_score

    explanations = []

    if any(word in caption_lower for word in suspicious_keywords):
        explanations.append(
            "Caption contains words like 'fake' or 'edited', which may indicate manipulation or deception."
        )

    if any(word in caption_lower for word in exaggeration_keywords):
        explanations.append(
            "Caption uses highly exaggerated language, which can be a sign of misleading content."
        )

    if len(caption.split()) < 4:
        explanations.append(
            "Caption is very short and lacks detail, which can make it easier to misrepresent the image."
        )

    if "maybe" in caption_lower or "idk" in caption_lower or "not sure" in caption_lower:
        explanations.append(
            "Caption expresses uncertainty, which can reduce trust in how accurately it describes the image."
        )

    if filename_matches and not caption_matches:
        explanations.append(
            "Image filename suggests content (e.g., "
            + ", ".join(filename_matches)
            + ") that is not mentioned in the caption."
        )

    if media_type == "image":
        explanations.append("Post contains an image. Scores reflect how the caption aligns with the visual content.")
    elif media_type == "video":
        explanations.append("Post contains a video. Scores reflect how the caption aligns with the video content title.")
    else:
        explanations.append("Media type could not be clearly determined; only caption-based heuristics were used.")

    if link_url:
        explanations.append("An external link is attached to this post; captions that clearly describe the link content are generally more trustworthy.")

    if not explanations:
        explanations.append(
            "No strong indicators of inconsistency were found by the simple heuristic rules."
        )

    return inconsistency_score, consistency_score, explanations


@app.route("/", methods=["GET"])
def index():
    """Render the main analysis page."""
    return render_template("index.html")


@app.route("/fraud-alerts", methods=["GET"])
def fraud_alerts():
    """Render the fraud alerts and common scams page."""
    return render_template("fraud_alerts.html")


@app.route("/marketing-fraud", methods=["GET"])
def marketing_fraud():
    """Render the marketing fraud information page."""
    return render_template("marketing_fraud.html")


@app.route("/guidelines", methods=["GET"])
def guidelines():
    """Render the guidelines and laws page."""
    return render_template("guidelines.html")


@app.route("/helplines", methods=["GET"])
def helplines():
    """Render the helpline numbers page."""
    return render_template("helplines.html")


@app.route("/messages", methods=["GET"])
def messages():
    """Render the online safety messages page."""
    return render_template("messages.html")


@app.route("/analyze", methods=["POST"])
def analyze():
    """Analyze a social media post for deception indicators."""
    try:
        if "media" not in request.files:
            logger.warning("Analyze request received without media file")
            return jsonify({"error": "No media file uploaded."}), 400

        media = request.files["media"]
        caption = request.form.get("caption", "").strip()
        link_url = request.form.get("link_url", "").strip()

        if not media or media.filename == "":
            logger.warning("Empty media file submitted")
            return jsonify({"error": "Please choose a photo or video file."}), 400

        if not allowed_file(media.filename):
            logger.warning(f"Unsupported file type: {media.filename}")
            return jsonify({
                "error": f"Unsupported file type. Allowed: {', '.join(ALLOWED_EXTENSIONS)}"
            }), 400

        if not caption:
            logger.warning("Analysis request received without caption")
            return jsonify({"error": "Please enter a caption for the post."}), 400

        if len(caption) > 5000:
            return jsonify({"error": "Caption is too long (max 5000 characters)."}), 400

        # Detect media type from mimetype
        media_type = "unknown"
        mimetype = (media.mimetype or "").lower()
        if mimetype.startswith("image/"):
            media_type = "image"
        elif mimetype.startswith("video/"):
            media_type = "video"

        # Save media with secure filename
        timestamp = datetime.datetime.utcnow().strftime("%Y%m%d%H%M%S%f")
        original_filename = secure_filename(media.filename)
        safe_filename = f"{timestamp}_{original_filename}"
        save_path = os.path.join(app.config["UPLOAD_FOLDER"], safe_filename)
        
        try:
            media.save(save_path)
            logger.info(f"Media saved: {safe_filename}")
        except Exception as e:
            logger.error(f"Failed to save media: {e}")
            return jsonify({"error": "Failed to save media file."}), 500

        deception_score, consistency_score, explanations = simple_analysis(
            caption, media.filename, media_type, link_url or None
        )

        logger.info(f"Analysis complete: deception={deception_score}, consistency={consistency_score}")

        # Prepare analysis data
        analysis_result = {
            "deception_score": deception_score,
            "consistency_score": consistency_score,
            "explanations": explanations,
            "media_type": media_type,
            "media_filename": media.filename,
            "link_url": link_url,
            "caption": caption,
        }
        
        # Save to MongoDB (optional)
        if MONGODB_ENABLED:
            try:
                stored_analysis = Analysis.create(analysis_result)
                logger.info(f"✓ Analysis saved to MongoDB: {stored_analysis.get('_id')}")
            except Exception as db_error:
                logger.error(f"✗ Failed to save to MongoDB: {db_error}")
                # Continue anyway - don't fail the analysis if DB is down
                analysis_result["_id"] = None
        else:
            analysis_result["_id"] = None
        
        return jsonify(analysis_result)
    except Exception as e:
        logger.error(f"Unhandled error in analyze: {e}", exc_info=True)
        return jsonify({"error": "An unexpected error occurred. Please try again."}), 500


@app.errorhandler(413)
def request_entity_too_large(error):
    """Handle file too large error."""
    logger.warning("File upload exceeded size limit")
    return jsonify({"error": f"File is too large (max {MAX_FILE_SIZE // (1024*1024)}MB)."}), 413


@app.errorhandler(500)
def internal_error(error):
    """Handle internal server errors."""
    logger.error(f"Internal error: {error}", exc_info=True)
    return jsonify({"error": "Internal server error. Please try again later."}), 500


# MongoDB API Endpoints

@app.route("/api/stats", methods=["GET"])
def get_stats():
    """
    Get statistics from all stored analyses.
    
    Returns:
        - total_analyses: Total number of analyses performed
        - avg_deception_score: Average deception score
        - avg_consistency_score: Average consistency score
        - max_deception_score: Highest deception score
        - min_deception_score: Lowest deception score
    """
    try:
        if not MONGODB_ENABLED:
            return jsonify({"error": "History/stats are disabled in laptop demo mode (MongoDB not enabled)."}), 501
        stats = Analysis.get_stats()
        return jsonify(stats), 200
    except Exception as e:
        logger.error(f"Failed to get stats: {e}")
        return jsonify({"error": "Failed to retrieve statistics."}), 500


@app.route("/api/history", methods=["GET"])
def get_history():
    """
    Get recent analysis history.
    
    Query Parameters:
        - limit: Number of results (default: 50, max: 100)
        - skip: Number of results to skip for pagination (default: 0)
    
    Returns:
        - analyses: Array of analysis documents
        - total: Total number of analyses available
    """
    try:
        if not MONGODB_ENABLED:
            return jsonify({"error": "History is disabled in laptop demo mode (MongoDB not enabled)."}), 501
        limit = min(int(request.args.get("limit", 50)), 100)
        skip = int(request.args.get("skip", 0))
        
        analyses = Analysis.find_all(limit=limit, skip=skip)
        total = Analysis.count_total()
        
        # Convert ObjectId to string for JSON serialization
        for analysis in analyses:
            analysis['_id'] = str(analysis['_id'])
            analysis['timestamp'] = analysis['timestamp'].isoformat()
        
        return jsonify({
            "analyses": analyses,
            "total": total,
            "limit": limit,
            "skip": skip,
        }), 200
    except Exception as e:
        logger.error(f"Failed to get history: {e}")
        return jsonify({"error": "Failed to retrieve history."}), 500


@app.route("/api/analyses/<analysis_id>", methods=["GET"])
def get_analysis(analysis_id):
    """
    Get a specific analysis by ID.
    
    Args:
        analysis_id: MongoDB ObjectId as string
    
    Returns:
        - Complete analysis document
    """
    try:
        if not MONGODB_ENABLED:
            return jsonify({"error": "History is disabled in laptop demo mode (MongoDB not enabled)."}), 501
        analysis = Analysis.find_by_id(analysis_id)
        
        if not analysis:
            return jsonify({"error": "Analysis not found."}), 404
        
        # Convert ObjectId to string
        analysis['_id'] = str(analysis['_id'])
        analysis['timestamp'] = analysis['timestamp'].isoformat()
        
        return jsonify(analysis), 200
    except Exception as e:
        logger.error(f"Failed to get analysis: {e}")
        return jsonify({"error": "Failed to retrieve analysis."}), 500


@app.route("/api/analyses/search/by-score", methods=["GET"])
def search_by_score():
    """
    Search analyses by deception score range.
    
    Query Parameters:
        - min: Minimum deception score (default: 0)
        - max: Maximum deception score (default: 100)
        - limit: Number of results (default: 50, max: 100)
    
    Returns:
        - analyses: Matching analysis documents
    """
    try:
        if not MONGODB_ENABLED:
            return jsonify({"error": "History/search are disabled in laptop demo mode (MongoDB not enabled)."}), 501
        min_score = int(request.args.get("min", 0))
        max_score = int(request.args.get("max", 100))
        limit = min(int(request.args.get("limit", 50)), 100)
        
        analyses = Analysis.find_by_score_range(min_score, max_score, limit)
        
        # Convert ObjectId to string
        for analysis in analyses:
            analysis['_id'] = str(analysis['_id'])
            analysis['timestamp'] = analysis['timestamp'].isoformat()
        
        return jsonify({
            "analyses": analyses,
            "count": len(analyses),
            "score_range": {"min": min_score, "max": max_score}
        }), 200
    except Exception as e:
        logger.error(f"Failed to search by score: {e}")
        return jsonify({"error": "Failed to search analyses."}), 500


@app.before_request
def before_request():
    """Initialize MongoDB connection before first request."""
    try:
        if not MONGODB_ENABLED:
            return
        if not hasattr(app, 'db_initialized'):
            MongoDatabase.connect()
            app.db_initialized = True
    except Exception as e:
        logger.warning(f"MongoDB not available: {e}")
        # Don't fail - the app still works without DB


@app.teardown_appcontext
def teardown_appcontext(exception):
    """Close MongoDB connection when app context ends."""
    # MongoDB client handles pooling, we don't need to close it
    pass


if __name__ == "__main__":
    try:
        logger.info("Starting Flask app...")
        
        # Initialize MongoDB connection (optional)
        if MONGODB_ENABLED:
            try:
                MongoDatabase.connect()
                logger.info("✓ MongoDB connection established")
            except Exception as db_error:
                logger.warning(f"⚠️  MongoDB not available - app will work for analysis only: {db_error}")
        else:
            logger.info("MongoDB disabled (laptop demo mode). Set ENABLE_MONGODB=1 to enable it.")
        
        # Run Flask app
        app.run(
            debug=active_config.DEBUG,
            host=active_config.HOST,
            port=active_config.PORT
        )
    except Exception as e:
        logger.error(f"Failed to start application: {e}", exc_info=True)
        raise

