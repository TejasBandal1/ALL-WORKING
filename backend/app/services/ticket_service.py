from bson import ObjectId
from ..db import get_db

db = get_db()
ticket_collection = db["tickets"]

def create_ticket(ticket_data):
    result = ticket_collection.insert_one(ticket_data.dict(by_alias=True))
    return str(result.inserted_id)

def get_all_tickets():
    return list(ticket_collection.find({}))

def get_ticket_by_id(ticket_id):
    return ticket_collection.find_one({"_id": ObjectId(ticket_id)})

def update_ticket(ticket_id, update_data):
    result = ticket_collection.update_one(
        {"_id": ObjectId(ticket_id)}, {"$set": update_data}
    )
    return result.modified_count

def delete_ticket(ticket_id):
    result = ticket_collection.delete_one({"_id": ObjectId(ticket_id)})
    return result.deleted_count
