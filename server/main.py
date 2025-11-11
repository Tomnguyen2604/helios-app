from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from ai import generate_response
from stocks import get_trend
from voice import speak
from memory import remember, recall

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",  # React frontend default port
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chat")
async def chat(request: Request):
    data = await request.json()
    prompt = data["prompt"]
    reply = generate_response(prompt)
    return {"reply": reply}

@app.get("/trend")
def trend():
    tickers = ["TSLA", "AMZN", "AAPL", "NVDA", "BTC-USD", "ETH-USD"]
    return {"trend": get_trend(tickers)}

@app.post("/speak")
async def voice_alert(request: Request):
    data = await request.json()
    speak(data["text"])
    return {"status": "spoken"}


@app.post("/remember")
async def save_memory(request: Request):
    data = await request.json()
    remember(data["user_id"], data["key"], data["value"])
    return {"status": "saved"}

@app.get("/recall")
def get_memory(user_id: str, key: str):
    value = recall(user_id, key)
    return {"value": value}