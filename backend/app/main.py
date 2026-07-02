from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.chat import router as chat_router
from app.core.database import init_db

app = FastAPI(title="NORA AI Chatbot Backend", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(chat_router)

@app.on_event("startup")
def startup_event():
    # Initialize MySQL connection on startup
    init_db()

@app.get("/")
def read_root():
    return {"status": "online", "service": "NORA AI Chatbot Backend"}
