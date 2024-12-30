from fastapi.security import OAuth2PasswordRequestForm
from jose import jwt
from datetime import datetime, timedelta
from fastapi import FastAPI, HTTPException, APIRouter, Form, UploadFile, File, BackgroundTasks, Depends
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from pydantic import BaseModel
import motor.motor_asyncio
import os
from bson import ObjectId
from email_validator import validate_email, EmailNotValidError
from passlib.context import CryptContext
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from fastapi import Body


# Constants
SECRET_KEY = "your_secret_key_here"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_HOURS = 2

# SMTP configuration
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
SMTP_USER = "tejas@cirrus.co.in"
SMTP_PASSWORD = "Tejubandal@2511"

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# FastAPI initialization
app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB client initialization
client = motor.motor_asyncio.AsyncIOMotorClient("mongodb://localhost:27017")
db = client.ticketing_system_v2
ticket_collection = db.tickets
user_collection = db.users

# File storage directory
file_storage_dir = "uploaded_files"
os.makedirs(file_storage_dir, exist_ok=True)

# Models
class TicketStatusUpdate(BaseModel):
    status: str

class User(BaseModel):
    username: str
    email: str
    role: str
    password: str

class TokenData(BaseModel):
    email: str
    role: str

# Helper Functions
def ticket_helper(ticket):
    ticket["_id"] = str(ticket["_id"])
    return ticket

def validate_email_format(email: str):
    try:
        validate_email(email)
        return True
    except EmailNotValidError:
        raise HTTPException(status_code=400, detail=f"Invalid email address: {email}")

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

async def create_ticket(ticket_data: dict):
    result = await ticket_collection.insert_one(ticket_data)
    return str(result.inserted_id)

async def get_all_tickets(skip: int = 0, limit: int = 10):
    tickets = await ticket_collection.find().skip(skip).limit(limit).to_list(length=limit)
    return tickets

async def get_ticket_by_id(ticket_id: str):
    ticket = await ticket_collection.find_one({"_id": ObjectId(ticket_id)})
    return ticket

async def update_ticket(ticket_id: str, update_data: dict):
    result = await ticket_collection.update_one({"_id": ObjectId(ticket_id)}, {"$set": update_data})
    return result.modified_count

def send_email(to_email: str, subject: str, body: str):
    try:
        msg = MIMEMultipart()
        msg['From'] = SMTP_USER
        msg['To'] = to_email
        msg['Subject'] = subject
        msg.attach(MIMEText(body, 'plain'))

        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.sendmail(SMTP_USER, to_email, msg.as_string())
            print("Email sent successfully!")
    except Exception as e:
        print(f"Error sending email: {e}")
        raise HTTPException(status_code=500, detail="Failed to send email notification")

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def role_checker(required_role: str):
    def check_role(token: str = Depends(oauth2_scheme)):
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if payload.get("role") != required_role:
            raise HTTPException(status_code=403, detail="Unauthorized")
        return payload
    return check_role

# MongoDB: Hash existing passwords for users
async def hash_existing_passwords():
    async for user in user_collection.find():
        if not pwd_context.identify(user['password']):
            hashed_password = pwd_context.hash(user['password'])
            await user_collection.update_one(
                {"_id": user["_id"]},
                {"$set": {"password": hashed_password}}
            )
    print("Passwords have been hashed successfully!")

# Add this to run the function on startup
@app.on_event("startup")
async def on_startup():
    await hash_existing_passwords()

# Routers
router = APIRouter()

# Authentication
@router.post("/api/login", tags=["Authentication"])
async def login_user(data: dict = Body(...)):
    email = data.get("username")
    password = data.get("password")

    user = await user_collection.find_one({"email": email})
    if not user or not verify_password(password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token_data = {"email": user["email"], "role": user["role"]}
    token = create_access_token(data=token_data)
    return {"token": token, "role": user["role"]}

# User Management
@router.post("/api/users", tags=["Users"])
async def add_user(user: User):
    validate_email_format(user.email)
    existing_user = await user_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")
    user.password = hash_password(user.password)
    result = await user_collection.insert_one(user.dict())
    return {"message": "User added successfully", "user_id": str(result.inserted_id)}

# Ticket Management
@router.get("/tickets", tags=["Tickets"])
async def get_tickets(skip: int = 0, limit: int = 10):
    tickets = await get_all_tickets(skip=skip, limit=limit)
    return [ticket_helper(ticket) for ticket in tickets]

@router.get("/tickets/{ticket_id}", tags=["Tickets"])
async def get_ticket(ticket_id: str):
    ticket = await get_ticket_by_id(ticket_id)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return ticket_helper(ticket)

@router.post("/tickets", tags=["Tickets"])
async def create_ticket_route(
    category: str = Form(...),
    subcategory: str = Form(...),
    subject: str = Form(...),
    description: str = Form(...),
    priority: str = Form(...),
    department: str = Form(...),
    email: str = Form(...),
    attachment: Optional[UploadFile] = File(None),
):
    validate_email_format(email)
    ticket_data = {
        "category": category,
        "subcategory": subcategory,
        "subject": subject,
        "description": description,
        "priority": priority,
        "department": department,
        "email": email,
        "status": "open",
    }
    if attachment:
        file_location = os.path.join(file_storage_dir, attachment.filename)
        with open(file_location, "wb") as f:
            f.write(await attachment.read())
        ticket_data["file"] = {"filename": attachment.filename, "file_path": file_location}

    ticket_id = await create_ticket(ticket_data)
    return {"message": "Ticket created successfully", "ticket_id": ticket_id}

@router.patch("/tickets/{ticket_id}/status", tags=["Tickets"])
async def update_ticket_status(ticket_id: str, ticket_update: TicketStatusUpdate):
    updated_count = await update_ticket(ticket_id, {"status": ticket_update.status})
    if updated_count == 0:
        raise HTTPException(status_code=400, detail="Failed to update ticket status")
    return {"message": f"Ticket {ticket_id} status updated"}

@router.post("/tickets/{ticket_id}/notify", tags=["Tickets"])
async def notify_ticket_update(ticket_id: str, background_tasks: BackgroundTasks):
    ticket = await get_ticket_by_id(ticket_id)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    subject = f"Ticket Update: {ticket['subject']}"
    body = f"Hello, your ticket with ID {ticket_id} has been updated.\n\nStatus: {ticket['status']}"
    background_tasks.add_task(send_email, ticket['email'], subject, body)
    return {"message": "Notification sent"}

# Include Router
app.include_router(router)
