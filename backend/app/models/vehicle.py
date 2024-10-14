from sqlmodel import Field, Relationship, SQLModel
import uuid

# Database model for Vehicle, will be stored as a table in the database
class Vehicle(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    name: str = Field(max_length=64)
    short: str = Field(max_length=16)

    # Relationship with Location model
    locations: list["Location"] = Relationship(back_populates="vehicle")
