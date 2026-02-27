"""
Analysis document model for MongoDB.
Defines the structure of analysis records stored in the database.
"""

from datetime import datetime
from bson import ObjectId
from db import get_analyses_collection
import logging

logger = logging.getLogger(__name__)


class Analysis:
    """Represents a social media post analysis stored in MongoDB."""
    
    # Collection name
    collection_name = 'analyses'
    
    @staticmethod
    def create(analysis_data):
        """
        Create and store a new analysis in MongoDB.
        
        Args:
            analysis_data (dict): Analysis data containing:
                - deception_score: int (0-100)
                - consistency_score: int (0-100)
                - explanations: list of strings
                - media_type: str (image/video/unknown)
                - media_filename: str
                - link_url: str (optional)
                - caption: str
        
        Returns:
            dict: Created document with _id field
        """
        try:
            collection = get_analyses_collection()
            
            # Build document
            document = {
                'timestamp': datetime.utcnow(),
                'deception_score': int(analysis_data.get('deception_score', 0)),
                'consistency_score': int(analysis_data.get('consistency_score', 0)),
                'explanations': analysis_data.get('explanations', []),
                'media_type': analysis_data.get('media_type', 'unknown'),
                'media_filename': analysis_data.get('media_filename', ''),
                'link_url': analysis_data.get('link_url', ''),
                'caption': analysis_data.get('caption', ''),
                'caption_length': len(analysis_data.get('caption', '')),
            }
            
            # Insert into collection
            result = collection.insert_one(document)
            
            # Add _id to returned data
            analysis_data['_id'] = str(result.inserted_id)
            
            logger.info(f"✓ Analysis stored: {result.inserted_id}")
            return analysis_data
            
        except Exception as e:
            logger.error(f"✗ Failed to store analysis: {e}")
            raise
    
    @staticmethod
    def find_by_id(analysis_id):
        """
        Find analysis by MongoDB ObjectId.
        
        Args:
            analysis_id (str): String representation of ObjectId
        
        Returns:
            dict: Analysis document or None
        """
        try:
            collection = get_analyses_collection()
            return collection.find_one({'_id': ObjectId(analysis_id)})
        except Exception as e:
            logger.error(f"✗ Failed to find analysis: {e}")
            return None
    
    @staticmethod
    def find_all(limit=100, skip=0):
        """
        Find all analyses with pagination.
        
        Args:
            limit (int): Number of documents to return
            skip (int): Number of documents to skip
        
        Returns:
            list: List of analysis documents
        """
        try:
            collection = get_analyses_collection()
            return list(collection.find()
                        .sort('timestamp', -1)
                        .skip(skip)
                        .limit(limit))
        except Exception as e:
            logger.error(f"✗ Failed to find analyses: {e}")
            return []
    
    @staticmethod
    def find_by_score_range(min_deception=0, max_deception=100, limit=100):
        """
        Find analyses by deception score range.
        
        Args:
            min_deception (int): Minimum deception score
            max_deception (int): Maximum deception score
            limit (int): Number of documents to return
        
        Returns:
            list: Matching analysis documents
        """
        try:
            collection = get_analyses_collection()
            query = {
                'deception_score': {
                    '$gte': min_deception,
                    '$lte': max_deception
                }
            }
            return list(collection.find(query)
                        .sort('timestamp', -1)
                        .limit(limit))
        except Exception as e:
            logger.error(f"✗ Failed to find analyses by score: {e}")
            return []
    
    @staticmethod
    def get_stats():
        """
        Get statistics for all analyses.
        
        Returns:
            dict: Statistics including counts and averages
        """
        try:
            collection = get_analyses_collection()
            
            pipeline = [
                {
                    '$group': {
                        '_id': None,
                        'total_analyses': {'$sum': 1},
                        'avg_deception_score': {'$avg': '$deception_score'},
                        'avg_consistency_score': {'$avg': '$consistency_score'},
                        'max_deception_score': {'$max': '$deception_score'},
                        'min_deception_score': {'$min': '$deception_score'},
                    }
                }
            ]
            
            result = list(collection.aggregate(pipeline))
            
            if result:
                stats = result[0]
                stats.pop('_id', None)
                return stats
            
            return {
                'total_analyses': 0,
                'avg_deception_score': 0,
                'avg_consistency_score': 0,
                'max_deception_score': 0,
                'min_deception_score': 0,
            }
        except Exception as e:
            logger.error(f"✗ Failed to get stats: {e}")
            return {}
    
    @staticmethod
    def delete_by_id(analysis_id):
        """
        Delete analysis by ID.
        
        Args:
            analysis_id (str): String representation of ObjectId
        
        Returns:
            bool: True if deleted, False otherwise
        """
        try:
            collection = get_analyses_collection()
            result = collection.delete_one({'_id': ObjectId(analysis_id)})
            return result.deleted_count > 0
        except Exception as e:
            logger.error(f"✗ Failed to delete analysis: {e}")
            return False
    
    @staticmethod
    def count_total():
        """
        Count total number of analyses.
        
        Returns:
            int: Total number of documents
        """
        try:
            collection = get_analyses_collection()
            return collection.count_documents({})
        except Exception as e:
            logger.error(f"✗ Failed to count analyses: {e}")
            return 0
