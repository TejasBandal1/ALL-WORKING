from fastapi import APIRouter, HTTPException, Form, File, UploadFile
from typing import List
from datetime import datetime
from bson import ObjectId
from app.db import ticket_collection
from app.models.ticket_model import TicketCreate, Ticket
import os

router = APIRouter()

# File storage directory
file_storage_dir = "uploaded_files"
os.makedirs(file_storage_dir, exist_ok=True)

@router.post("/tickets", response_model=Ticket, tags=["Tickets"])
async def create_ticket(
    category: str = Form(...),
    subcategory: str = Form(...),
    subject: str = Form(...),
    description: str = Form(...),
    priority: str = Form(...),
    department: str = Form(...),
    email: str = Form(...),
    attachment: UploadFile = File(None),
):
    """
    Create a new ticket with optional file attachment.
    """
    ticket_data = {
        "category": category,
        "subcategory": subcategory,
        "subject": subject,
        "description": description,
        "priority": priority,
        "department": department,
        "email": email,
        "status": "open",  # Default status is "open"
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    }

    # Handle file upload
    if attachment:
        try:
            file_location = os.path.join(file_storage_dir, attachment.filename)
            with open(file_location, "wb") as f:
                f.write(await attachment.read())
            ticket_data["attachment"] = {"filename": attachment.filename, "file_path": file_location}
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error saving attachment: {str(e)}")

    # Insert ticket into the database
    try:
        result = await ticket_collection.insert_one(ticket_data)
        ticket_data["id"] = str(result.inserted_id)
        return ticket_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating ticket: {str(e)}")

@router.get("/tickets", response_model=List[Ticket], tags=["Tickets"])
async def get_tickets(skip: int = 0, limit: int = 10):
    """
    Retrieve all tickets from the database with pagination.
    """
    try:
        tickets = await ticket_collection.find().skip(skip).limit(limit).to_list(100)
        return [Ticket(**ticket, id=str(ticket["_id"])) for ticket in tickets]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching tickets: {str(e)}")

@router.get("/tickets/{ticket_id}", response_model=Ticket, tags=["Tickets"])
async def get_ticket_by_id(ticket_id: str):
    """
    Retrieve a specific ticket by its ID.
    """
    try:
        ticket = await ticket_collection.find_one({"_id": ObjectId(ticket_id)})
        if not ticket:
            raise HTTPException(status_code=404, detail="Ticket not found")
        return Ticket(**ticket, id=str(ticket["_id"]))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching ticket: {str(e)}")

@router.patch("/tickets/{ticket_id}/status", tags=["Tickets"])
async def update_ticket_status(ticket_id: str, status: str):
    """
    Update the status of a ticket.
    """
    try:
        result = await ticket_collection.update_one(
            {"_id": ObjectId(ticket_id)},
            {"$set": {"status": status, "updated_at": datetime.utcnow()}}
        )
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Ticket not found")
        return {"message": "Ticket status updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating ticket status: {str(e)}")

@router.post("/tickets/{ticket_id}/notify", tags=["Tickets"])
async def notify_ticket_update(ticket_id: str):
    """
    Notify relevant parties about a ticket update.
    This could include sending an email or a notification.
    """
    try:
        ticket = await ticket_collection.find_one({"_id": ObjectId(ticket_id)})
        if not ticket:
            raise HTTPException(status_code=404, detail="Ticket not found")

        # Simulate a notification (this could be replaced with an actual email/notification logic)
        notification_message = f"Ticket {ticket_id} for '{ticket['subject']}' has been updated. Notification sent."
        return {"message": notification_message}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error notifying ticket update: {str(e)}")

@router.delete("/tickets/{ticket_id}", tags=["Tickets"])
async def delete_ticket(ticket_id: str):
    """
    Delete a specific ticket by its ID.
    """
    try:
        result = await ticket_collection.delete_one({"_id": ObjectId(ticket_id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Ticket not found")
        return {"message": "Ticket deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting ticket: {str(e)}")
