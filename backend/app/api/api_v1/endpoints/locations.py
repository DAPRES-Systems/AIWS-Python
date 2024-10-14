from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, schemas
from app.db.session import get_db
from uuid import UUID
from typing import List

router = APIRouter()

@router.get("/", response_model=List[schemas.LocationInDB])
def read_locations(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_locations(db=db, skip=skip, limit=limit)

@router.post("/", response_model=schemas.LocationInDB)
def create_location(location: schemas.LocationCreate, db: Session = Depends(get_db)):
    return crud.create_location(db=db, location=location)

@router.get("/{location_id}", response_model=schemas.LocationInDB)
def read_location(location_id: UUID, db: Session = Depends(get_db)):
    db_location = crud.get_location(db=db, location_id=location_id)
    if not db_location:
        raise HTTPException(status_code=404, detail="Location not found")
    return db_location

@router.put("/{location_id}", response_model=schemas.LocationInDB)
def update_location(location_id: UUID, location: schemas.LocationUpdate, db: Session = Depends(get_db)):
    db_location = crud.get_location(db=db, location_id=location_id)
    if not db_location:
        raise HTTPException(status_code=404, detail="Location not found")
    return crud.update_location(db=db, db_location=db_location, location_update=location)

@router.delete("/{location_id}", response_model=schemas.LocationInDB)
def delete_location(location_id: UUID, db: Session = Depends(get_db)):
    db_location = crud.get_location(db=db, location_id=location_id)
    if not db_location:
        raise HTTPException(status_code=404, detail="Location not found")
    return crud.delete_location(db=db, location_id=location_id)
