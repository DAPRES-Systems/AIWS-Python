from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, schemas
from app.db.session import get_db
from uuid import UUID
from typing import List

router = APIRouter()

@router.get("/", response_model=List[schemas.ItemInDB])
def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_items(db=db, skip=skip, limit=limit)

@router.post("/", response_model=schemas.ItemInDB)
def create_item(item: schemas.ItemCreate, db: Session = Depends(get_db)):
    return crud.create_item(db=db, item=item)

@router.get("/{item_id}", response_model=schemas.ItemInDB)
def read_item(item_id: UUID, db: Session = Depends(get_db)):
    db_item = crud.get_item(db=db, item_id=item_id)
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    return db_item

@router.put("/{item_id}", response_model=schemas.ItemInDB)
def update_item(item_id: UUID, item: schemas.ItemUpdate, db: Session = Depends(get_db)):
    db_item = crud.get_item(db=db, item_id=item_id)
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    return crud.update_item(db=db, db_item=db_item, item_update=item)

@router.delete("/{item_id}", response_model=schemas.ItemInDB)
def delete_item(item_id: UUID, db: Session = Depends(get_db)):
    db_item = crud.get_item(db=db, item_id=item_id)
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    return crud.delete_item(db=db, item_id=item_id)
