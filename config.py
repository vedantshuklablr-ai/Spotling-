"""
Configuration module for MongoDB and Flask settings.
Load environment variables from .env file.
"""

import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


class Config:
    """Base configuration class."""
    
    # MongoDB Configuration
    MONGODB_URI = os.getenv(
        "MONGODB_URI",
        "mongodb://localhost:27017"
    )
    MONGODB_DB = os.getenv(
        "MONGODB_DB",
        "deception_analyzer"
    )
    
    # Flask Configuration
    FLASK_ENV = os.getenv("FLASK_ENV", "development")
    DEBUG = os.getenv("FLASK_DEBUG", "False").lower() == "true"
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-key-change-in-production")
    
    # Upload Configuration
    MAX_FILE_SIZE = int(os.getenv("MAX_FILE_SIZE_MB", "50")) * 1024 * 1024
    UPLOAD_FOLDER = os.getenv("UPLOAD_FOLDER", "static/uploads")
    
    # Server Configuration
    HOST = os.getenv("HOST", "127.0.0.1")
    PORT = int(os.getenv("PORT", "5000"))


class DevelopmentConfig(Config):
    """Development configuration."""
    DEBUG = True
    TESTING = False


class ProductionConfig(Config):
    """Production configuration."""
    DEBUG = False
    TESTING = False


class TestingConfig(Config):
    """Testing configuration."""
    DEBUG = True
    TESTING = True
    MONGODB_DB = "deception_analyzer_test"


# Select configuration based on environment
config_by_name = {
    "development": DevelopmentConfig,
    "production": ProductionConfig,
    "testing": TestingConfig,
    "default": DevelopmentConfig,
}

# Get active configuration
environment = os.getenv("FLASK_ENV", "development")
active_config = config_by_name.get(environment, DevelopmentConfig)
