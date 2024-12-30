import motor.motor_asyncio
from pymongo import MongoClient
from bson import ObjectId

# Initialize the MongoDB client
client = motor.motor_asyncio.AsyncIOMotorClient("mongodb://localhost:27017")
db = client.ticketing_system
ticket_collection = db.tickets

# Helper function to retrieve the database client
def get_db():
    return db

# Insert a new ticket into the collection
async def create_ticket(ticket_data: dict):
    result = await ticket_collection.insert_one(ticket_data)
    return str(result.inserted_id)

# Retrieve all tickets
async def get_all_tickets():
    tickets = await ticket_collection.find().to_list(100)
    return tickets

# Retrieve a specific ticket by its ID
async def get_ticket_by_id(ticket_id: str):
    ticket = await ticket_collection.find_one({"_id": ObjectId(ticket_id)})
    return ticket

# Update an existing ticket
async def update_ticket(ticket_id: str, update_data: dict):
    result = await ticket_collection.update_one(
        {"_id": ObjectId(ticket_id)}, {"$set": update_data}
    )
    return result.modified_count

# Delete a ticket
async def delete_ticket(ticket_id: str):
    result = await ticket_collection.delete_one({"_id": ObjectId(ticket_id)})
    return result.deleted_count
