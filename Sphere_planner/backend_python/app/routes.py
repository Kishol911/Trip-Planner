from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Any
from app.database import db
from bson import ObjectId
from datetime import datetime

router = APIRouter()


class ItineraryIn(BaseModel):
    destination: str
    duration: int
    startDate: str
    budget: int
    interests: List[str] = []
    preferences: str | None = None
    generated: Any


class ItineraryOut(ItineraryIn):
    id: str
    createdAt: str


def _id_str(doc):
    doc['id'] = str(doc['_id'])
    doc.pop('_id', None)
    return doc


@router.post('/', response_model=ItineraryOut)
def create_itinerary(payload: ItineraryIn):
    doc = payload.dict()
    doc['createdAt'] = datetime.utcnow()
    result = db.itineraries.insert_one(doc)
    created = db.itineraries.find_one({'_id': result.inserted_id})
    created = _id_str(created)
    return created


@router.get('/', response_model=List[ItineraryOut])
def list_itineraries():
    items = []
    cursor = db.itineraries.find().sort('createdAt', -1)
    for doc in cursor:
        items.append(_id_str(doc))
    return items


@router.get('/{item_id}', response_model=ItineraryOut)
def get_itinerary(item_id: str):
    try:
        oid = ObjectId(item_id)
    except Exception:
        raise HTTPException(status_code=400, detail='Invalid id')
    doc = db.itineraries.find_one({'_id': oid})
    if not doc:
        raise HTTPException(status_code=404, detail='Not found')
    return _id_str(doc)
