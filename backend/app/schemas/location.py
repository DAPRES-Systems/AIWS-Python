from pydantic import BaseModel
from typing import Optional
from uuid import UUID

# Shared properties for Location
class LocationBase(BaseModel):
    title: str
    desc: Optional[str] = None
    vehicle_id: UUID

# Properties to receive via API on creation
class LocationCreate(LocationBase):
    pass

# Properties to receive via API on update, all are optional
class LocationUpdate(LocationBase):
    title: Optional[str] = None
    desc: Optional[str] = None

# Properties to return via API, id is always required
class LocationInDB(LocationBase):
    id: UUID

    class Config:
        orm_mode = True
