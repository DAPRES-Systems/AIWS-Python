from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, schemas
from app.db.session import get_db
from uuid import UUID
from typing import List

router = APIRouter()

@router.get("/", response_model=List[schemas.VehicleInDB])
def read_vehicles(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_vehicles(db=db, skip=skip, limit=limit)

@router.post("/", response_model=schemas.VehicleInDB)
def create_vehicle(vehicle: schemas.VehicleCreate, db: Session = Depends(get_db)):
    return crud.create_vehicle(db=db, vehicle=vehicle)

@router.get("/{vehicle_id}", response_model=schemas.VehicleInDB)
def read_vehicle(vehicle_id: UUID, db: Session = Depends(get_db)):
    db_vehicle = crud.get_vehicle(db=db, vehicle_id=vehicle_id)
    if not db_vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return db_vehicle

@router.put("/{vehicle_id}", response_model=schemas.VehicleInDB)
def update_vehicle(vehicle_id: UUID, vehicle: schemas.VehicleUpdate, db: Session = Depends(get_db)):
    db_vehicle = crud.get_vehicle(db=db, vehicle_id=vehicle_id)
    if not db_vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return crud.update_vehicle(db=db, db_vehicle=db_vehicle, vehicle_update=vehicle)

@router.delete("/{vehicle_id}", response_model=schemas.VehicleInDB)
def delete_vehicle(vehicle_id: UUID, db: Session = Depends(get_db)):
    db_vehicle = crud.get_vehicle(db=db, vehicle_id=vehicle_id)
    if not db_vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return crud.delete_vehicle(db=db, vehicle_id=vehicle_id)
