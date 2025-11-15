# Helios Setup Guide

## Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- npm or yarn

## Installation Steps

### 1. Clone the Repository
```bash
git clone <repository-url>
cd helios-app
```

### 2. Backend Setup
```bash
cd server
python -m venv .venv
.venv\Scripts\activate  # On Windows
# source .venv/bin/activate  # On Mac/Linux
pip install -r requirements.txt
```

### 3. Frontend Setup
```bash
cd client
npm install
```

## Running the Application

### Start Backend Server
```bash
cd server
.venv\Scripts\activate
python main.py
```
The backend will run on `http://localhost:8000`

### Start Frontend Development Server
```bash
cd client
npm start
```
The frontend will run on `http://localhost:3000`

## Features
- Real-time stock price tracking
- AI-powered financial chat assistant
- Interactive charts with Chart.js
- Smart alert system
- Modern dark theme UI

## API Endpoints
- `GET /stocks/{ticker}` - Get current stock price
- `GET /stocks/{ticker}/history` - Get historical data
- `POST /chat` - AI chat interaction
- `GET /health` - Server health check

## Troubleshooting

### CORS Issues
Make sure the backend CORS middleware is properly configured to allow requests from `http://localhost:3000`

### Port Conflicts
If ports 3000 or 8000 are in use, you can change them in the respective configuration files

### Missing Dependencies
Run `pip install -r requirements.txt` and `npm install` again if you encounter import errors
