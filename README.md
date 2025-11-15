# Helios App

Helios is a full-stack financial assistant application designed to provide users with AI-powered advice, real-time stock trend analysis, voice alerts, and personalized memory features.

## Features

*   **AI Advisor:** Get intelligent financial advice and insights powered by the `moonshotai/Kimi-K2-Thinking` model from Hugging Face.
*   **Stock Trend Analysis:** View real-time trend data for popular stocks and cryptocurrencies.
*   **Voice Alerts:** Receive spoken alerts for important financial information.
*   **Personalized Memory:** Helios remembers your preferences and past interactions for a more tailored experience.

## Technologies Used

### Backend (Python - `server/`)

*   **FastAPI:** A modern, fast (high-performance) web framework for building APIs with Python 3.7+.
*   **Hugging Face Transformers:** For integrating advanced AI models like `moonshotai/Kimi-K2-Thinking`.
*   **PyTorch:** An open-source machine learning framework used by the AI model.
*   **Uvicorn:** An ASGI server for running FastAPI applications.
*   **`memory.py`:** Custom module for handling user memory.
*   **`stocks.py`:** Custom module for fetching stock trend data.
*   **`voice.py`:** Custom module for text-to-speech functionality.

### Frontend (React - `client/`)

*   **React.js:** A JavaScript library for building user interfaces.
*   **SCSS:** A CSS pre-processor for styling.
*   **Axios:** A promise-based HTTP client for the browser and Node.js.

## Setup Instructions

Follow these steps to get the Helios app up and running on your local machine.

### 1. Clone the Repository

```bash
git clone <repository_url>
cd helios-app
```

### 2. Backend Setup

Navigate to the `server` directory and set up the Python environment.

```bash
cd server
```

**Create and Activate Virtual Environment (Recommended):**

```bash
# On Windows
python -m venv .venv
.\.venv\Scripts\activate

# On macOS/Linux
python3 -m venv .venv
source .venv/bin/activate
```

**Install Python Dependencies:**

```bash
pip install -r requirements.txt
```

**Run the Backend Server:**

```bash
# Ensure your virtual environment is activated
uvicorn main:app --reload
```

The backend server will run on `http://127.0.0.1:8000`.

### 3. Frontend Setup

Open a new terminal, navigate to the `client` directory, and install Node.js dependencies.

```bash
cd ../client
npm install
```

**Run the Frontend Development Server:**

```bash
npm start
```

The frontend application will typically open in your browser at `http://localhost:3000`.

## Usage

Once both the backend and frontend servers are running:

*   Access the application in your web browser at `http://localhost:3000`.
*   Interact with the AI advisor, view stock trends, and utilize other features.

## Folder Structure

*   `helios-app/`
    *   `client/`: Contains the React frontend application.
    *   `server/`: Contains the FastAPI backend application.
    *   `README.md`: This file.
    *   `.gitignore`: Git ignore file.
