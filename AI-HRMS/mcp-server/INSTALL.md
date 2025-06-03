# Installation Guide

## Setup Instructions

1. **Create a virtual environment**

```powershell
python -m venv venv
```

2. **Activate the virtual environment**

```powershell
venv\Scripts\activate
```

3. **Install dependencies**

```powershell
pip install -r requirements.txt
```

4. **Configure environment variables**

Edit the `.env` file with your specific settings.

5. **Run the application**

```powershell
python run.py
```

## Environment Variables

Make sure your `.env` file includes:

```
# Database configuration
DB_CONNECTION_STRING=postgresql://postgres:abc123!@160.250.246.78:5432/shophaui?sslaccept=accept_invalid_certs

# Application settings
FLASK_APP=run.py
FLASK_ENV=development
FLASK_DEBUG=1
HOST=0.0.0.0
PORT=5003

# Optional: Google API Key (for Gemini integration)
GOOGLE_API_KEY=your_api_key_here
```
