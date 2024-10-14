from datetime import date
from sqlmodel import Field, Relationship, SQLModel
import uuid

# Database model for Item, will be stored as a table in the database
class Item(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    aiwscode: str = Field(unique=True, index=True, max_length=6)
    name: str = Field(max_length=64)
    expire: date
    LOT: str | None = Field(default=None, max_length=32)
    STK: str | None = Field(default=None, max_length=32)
    MTK: str | None = Field(default=None, max_length=32)
    location_id: uuid.UUID = Field(foreign_key="location.id", nullable=False)
    notes: str | None = Field(default=None, max_length=128)

    # Relationship with Location model
    location: "Location" = Relationship(back_populates="items")
