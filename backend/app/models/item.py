
import uuid
from sqlmodel import Field, SQLModel, Relationship
from typing import Optional
from datetime import date

# Shared properties
class ItemBase(SQLModel):
    title: str = Field(min_length=1, max_length=255)
    description: str | None = Field(default=None, max_length=255)
    aiwscode: str = Field(min_length=1, max_length=50)
    name: str = Field(min_length=1, max_length=255)
    location: str = Field(min_length=1, max_length=255)
    expiry: Optional[date] = Field(default=None)
    stk: Optional[date] = Field(default=None)
    mtk: Optional[date] = Field(default=None)
    lot: Optional[str] = Field(default=None, max_length=255)
    serial: Optional[str] = Field(default=None, max_length=255)
    notes: Optional[str] = Field(default=None, max_length=1000)

# Properties to receive on item creation
class ItemCreate(ItemBase):
    pass

# Properties to receive on item update
class ItemUpdate(ItemBase):
    pass

# Database model, database table inferred from class name
class Item(ItemBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    owner_id: uuid.UUID = Field(
        foreign_key="user.id", nullable=False, ondelete="CASCADE"
    )
    owner: Optional['User'] = Relationship(back_populates="items")  # Lazy import for User using a string

# Properties to return via API, id is always required
class ItemPublic(ItemBase):
    id: uuid.UUID
    owner_id: uuid.UUID

class ItemsPublic(SQLModel):
    data: list[ItemPublic]
    count: int
