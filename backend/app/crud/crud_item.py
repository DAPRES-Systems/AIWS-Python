from sqlmodel import Session, select
from app.models.item import Item, ItemCreate

def create_item(*, session: Session, item_create: ItemCreate) -> Item:
    db_item = Item(**item_create.dict())
    session.add(db_item)
    session.commit()
    session.refresh(db_item)
    return db_item

def get_item(*, session: Session, item_id: int) -> Item | None:
    return session.get(Item, item_id)

def get_items(*, session: Session, skip: int = 0, limit: int = 10):
    statement = select(Item).offset(skip).limit(limit)
    return session.exec(statement).all()
