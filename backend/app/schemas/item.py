from pydantic import BaseModel
from datetime import date
from typing import Optional
from uuid import UUID

# Shared properties for Item
class ItemBase(BaseModel):
    aiwscode: str
    name: str
    expire: date
    LOT: Optional[str] = None
    STK: Optional[str] = None
    MTK: Optional[str] = None
    location_id: UUID
    notes: Optional[str] = None

# Properties to receive via API on creation
class ItemCreate(ItemBase):
    pass

# Properties to receive via API on update, all are optional
class ItemUpdate(ItemBase):
    aiwscode: Optional[str] = None
    name: Optional[str] = None

# Properties to return via API, id is always required
class ItemInDB(ItemBase):
    id: UUID

    class Config:
        orm_mode = True
