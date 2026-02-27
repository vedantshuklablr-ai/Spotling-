"""
MongoDB database connection and utilities.
Handles connection to MongoDB and provides helper functions.
"""

from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError
import logging
from config import active_config

logger = logging.getLogger(__name__)


class MongoDatabase:
    """MongoDB database connection manager."""
    
    _client = None
    _db = None
    
    @classmethod
    def connect(cls):
        """Establish connection to MongoDB."""
        try:
            if cls._client is None:
                cls._client = MongoClient(
                    active_config.MONGODB_URI,
                    serverSelectionTimeoutMS=5000,
                    retryWrites=True,
                    connectTimeoutMS=10000
                )
                
                # Test connection
                cls._client.admin.command('ping')
                logger.info("✓ Connected to MongoDB")
                
                # Get database
                cls._db = cls._client[active_config.MONGODB_DB]
                
                # Create necessary indexes
                cls._create_indexes()
                
        except (ConnectionFailure, ServerSelectionTimeoutError) as e:
            logger.error(f"✗ Failed to connect to MongoDB: {e}")
            raise
    
    @classmethod
    def disconnect(cls):
        """Close MongoDB connection."""
        try:
            if cls._client is not None:
                cls._client.close()
                cls._client = None
                cls._db = None
                logger.info("✓ Disconnected from MongoDB")
        except Exception as e:
            logger.error(f"✗ Error disconnecting from MongoDB: {e}")
    
    @classmethod
    def get_db(cls):
        """Get database instance."""
        if cls._db is None:
            cls.connect()
        return cls._db
    
    @classmethod
    def get_collection(cls, collection_name):
        """Get specific collection."""
        db = cls.get_db()
        return db[collection_name]
    
    @classmethod
    def _create_indexes(cls):
        """Create database indexes for better query performance."""
        try:
            db = cls._db
            
            # Indexes for analyses collection
            analyses = db['analyses']
            analyses.create_index('timestamp')
            analyses.create_index('deception_score')
            analyses.create_index('consistency_score')
            analyses.create_index([('timestamp', -1)])  # For sorting
            
            logger.info("✓ Database indexes created")
        except Exception as e:
            logger.error(f"✗ Failed to create indexes: {e}")


def get_db():
    """Convenience function to get database."""
    return MongoDatabase.get_db()


def get_analyses_collection():
    """Get analyses collection."""
    return MongoDatabase.get_collection('analyses')
