# Sphere Planner — Python Backend

This backend uses FastAPI and MongoDB (motor). It provides endpoints to save and retrieve generated itineraries.

Quick start (Windows PowerShell):

```powershell
cd backend_python
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
# copy .env.example to .env and set MONGODB_URI
uvicorn app.main:app --reload --port 8000
```

Endpoints:
- `GET /` — health
- `POST /api/itineraries` — save itinerary JSON
- `GET /api/itineraries` — list saved itineraries
- `GET /api/itineraries/{id}` — get one itinerary

If you want the frontend to automatically save generated itineraries, I can update `frontend/trip-planner.js` to POST to the backend.
