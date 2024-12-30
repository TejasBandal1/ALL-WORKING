from fastapi import FastAPI, Form, UploadFile, File
from typing import Optional

app = FastAPI()

@app.post("/tickets")
async def create_ticket(
    category: str = Form(...),
    subcategory: str = Form(...),
    subject: str = Form(...),
    description: str = Form(...),
    priority: str = Form(...),
    department: str = Form(...),
    email: str = Form(...),
    attachment: Optional[UploadFile] = File(None)
):
    # Construct the ticket data
    ticket_data = {
        "category": category,
        "subcategory": subcategory,
        "subject": subject,
        "description": description,
        "priority": priority,
        "department": department,
        "email": email,
    }

    # Handle file attachment
    if attachment:
        file_details = {
            "filename": attachment.filename,
            "content_type": attachment.content_type,
        }
        ticket_data["file"] = file_details

    return {"message": "Ticket created successfully", "ticket_data": ticket_data}
