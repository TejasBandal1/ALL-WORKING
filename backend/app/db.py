from pymongo import MongoClient
from bson import ObjectId
from db import create_ticket, get_all_tickets, get_ticket_by_id, update_ticket, delete_ticket

# Initialize MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client["ticketing_system"]
ticket_collection = db["tickets"]

def create_ticket(ticket_data: dict):
    result = ticket_collection.insert_one(ticket_data)
    return str(result.inserted_id)

def get_all_tickets():
    return list(ticket_collection.find({}))

def get_ticket_by_id(ticket_id: str):
    return ticket_collection.find_one({"_id": ObjectId(ticket_id)})

def update_ticket(ticket_id: str, update_data: dict):
    result = ticket_collection.update_one({"_id": ObjectId(ticket_id)}, {"$set": update_data})
    return result.modified_count

def delete_ticket(ticket_id: str):
    result = ticket_collection.delete_one({"_id": ObjectId(ticket_id)})
    return result.deleted_count
