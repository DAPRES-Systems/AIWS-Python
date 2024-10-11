from fastapi import APIRouter

from app.api.routes import login, users, utils
from app.api.api_v1.endpoints import items, locations, vehicles
# Haupt-Router der API
api_router = APIRouter()

# Bestehende Router
api_router.include_router(login.router, tags=["login"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(utils.router, prefix="/utils", tags=["utils"])

# Neue Router mit den gewünschten Prefixes
api_router.include_router(items.router, prefix="/i", tags=["items"])
api_router.include_router(locations.router, prefix="/l", tags=["locations"])
api_router.include_router(vehicles.router, prefix="/v", tags=["vehicles"])
