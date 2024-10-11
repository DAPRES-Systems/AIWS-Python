from sqlmodel import Field, Relationship, SQLModel
import uuid

# Database model for Location, will be stored as a table in the database
class Location(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    title: str = Field(max_length=64)
    desc: str | None = Field(default=None, max_length=64)
    vehicle_id: uuid.UUID = Field(foreign_key="vehicle.id", nullable=False)

    # Relationship with Vehicle and Item models
    vehicle: "Vehicle" = Relationship(back_populates="locations")
    items: list["Item"] = Relationship(back_populates="location")
