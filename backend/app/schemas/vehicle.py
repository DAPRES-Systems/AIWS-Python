from pydantic import BaseModel
from uuid import UUID

# Shared properties for Vehicle
class VehicleBase(BaseModel):
    name: str
    short: str

# Properties to receive via API on creation
class VehicleCreate(VehicleBase):
    pass

# Properties to receive via API on update, all are optional
class VehicleUpdate(VehicleBase):
    name: Optional[str] = None
    short: Optional[str] = None

# Properties to return via API, id is always required
class VehicleInDB(VehicleBase):
    id: UUID

    class Config:
        orm_mode = True
