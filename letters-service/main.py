from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import letters, reps
from routers.reps import authenticator
# from authenticator import authenticator
import os

app = FastAPI()
app.include_router(letters.router)
app.include_router(reps.router)
# app.include_router(authenticator.router)

origins = [
    "http://localhost:3000",
    os.environ.get("CORS_HOST", None),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
