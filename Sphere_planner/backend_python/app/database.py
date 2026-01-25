from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()
MONGODB_URI = os.getenv('MONGODB_URI', 'mongodb://127.0.0.1:27017')
DB_NAME = os.getenv('DB_NAME', 'Tripplanner_db')

client = MongoClient(MONGODB_URI)
# use explicit DB name to match requested Tripplanner_db
db = client[DB_NAME]
