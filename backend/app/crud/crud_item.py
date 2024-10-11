from sqlalchemy.orm import Session
from app.models.item import Item
from app.schemas.item import ItemCreate, ItemUpdate
from uuid import UUID

def get_item(db: Session, item_id: UUID):
    return db.query(Item).filter(Item.id == item_id).first()

def get_item_by_aiwscode(db: Session, aiwscode: str):
    return db.query(Item).filter(Item.aiwscode == aiwscode).first()

def get_items(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Item).offset(skip).limit(limit).all()

def create_item(db: Session, item: ItemCreate):
    db_item = Item(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def update_item(db: Session, db_item: Item, item_update: ItemUpdate):
    for key, value in item_update.dict(exclude_unset=True).items():
        setattr(db_item, key, value)
    db.commit()
    db.refresh(db_item)
    return db_item

def delete_item(db: Session, item_id: UUID):
    db_item = db.query(Item).filter(Item.id == item_id).first()
    if db_item:
        db.delete(db_item)
        db.commit()
    return db_item
