from fastapi import FastAPI, APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional, Literal, Dict, Any
import uuid
from datetime import datetime, timezone, timedelta
from passlib.context import CryptContext
import jwt

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Security & Auth
JWT_SECRET = os.environ.get('JWT_SECRET', 'dev-secret-change-me')
JWT_ALGO = 'HS256'
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 8
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# ---------- Utilities ----------

def now_utc_iso() -> str:
    return datetime.now(timezone.utc).isoformat()

async def serialize_doc(doc: Dict[str, Any]) -> Dict[str, Any]:
    if not doc:
        return doc
    doc.pop('_id', None)
    return doc

async def get_user_by_email(email: str) -> Optional[Dict[str, Any]]:
    u = await db.users.find_one({"email": email})
    return await serialize_doc(u)

async def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

def hash_password(pw: str) -> str:
    return pwd_context.hash(pw)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGO)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGO])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except Exception:
        raise credentials_exception
    user = await get_user_by_email(email)
    if user is None:
        raise credentials_exception
    return user

async def require_admin(user: dict = Depends(get_current_user)):
    if not user.get('is_admin', False):
        raise HTTPException(status_code=403, detail='Admin only')
    return user

# ---------- Models ----------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: Literal['bearer'] = 'bearer'

class LoginBody(BaseModel):
    email: EmailStr
    password: str

class UserPublic(BaseModel):
    id: str
    email: EmailStr
    name: Optional[str] = None
    is_admin: bool = True

class Service(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    short: str
    description: Optional[str] = None
    icon: Optional[str] = None
    order: int = 0
    visible: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    slug: str
    short: str
    description: Optional[str] = None
    tags: List[str] = []
    tech: List[str] = []
    cover_url: Optional[str] = None
    gallery: List[str] = []
    live_url: Optional[str] = None
    repo_url: Optional[str] = None
    visible: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class Skill(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    category: str
    icon_url: Optional[str] = None
    level: Optional[str] = None

class Post(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    slug: str
    excerpt: str
    content: str
    thumbnail_url: Optional[str] = None
    tags: List[str] = []
    status: Literal['draft','published'] = 'draft'
    publish_date: Optional[datetime] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class Settings(BaseModel):
    id: str = Field(default_factory=lambda: 'site-settings')
    brand_name: str = 'Elif'
    tagline: str = 'Building Modern Digital Experiences'
    colors: Dict[str, str] = {
        'primary': '#1E4F8C',
        'secondary': '#4D9DE0',
        'background': '#F5F7FB',
        'accent': '#FFB347'
    }
    logo_url: Optional[str] = None
    description: Optional[str] = 'Elegant, modern digital agency.'
    contact_email: Optional[str] = None
    socials: Dict[str, Optional[str]] = {'instagram': None, 'linkedin': None, 'github': None, 'behance': None, 'dribbble': None}

class InquiryCreate(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    service: str
    budget: Optional[str] = None
    message: str

class Inquiry(InquiryCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    status: Literal['new','read','archived'] = 'new'
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    cur = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in cur:
        if isinstance(check.get('timestamp'), str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return cur

# --- Auth ---
@api_router.post('/auth/login', response_model=TokenResponse)
async def login(body: LoginBody):
    user = await db.users.find_one({"email": body.email})
    if not user:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    if not verify_password(body.password, user.get('password_hash','')):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    token = create_access_token({"sub": body.email})
    return TokenResponse(access_token=token)

@api_router.get('/auth/me', response_model=UserPublic)
async def me(user: dict = Depends(get_current_user)):
    return UserPublic(id=user['id'], email=user['email'], name=user.get('name'), is_admin=user.get('is_admin', False))

# --- Services CRUD ---
@api_router.get('/services', response_model=List[Service])
async def list_services():
    items = await db.services.find({"visible": True}, {"_id": 0}).sort("order", 1).to_list(100)
    for it in items:
        if isinstance(it.get('created_at'), str):
            it['created_at'] = datetime.fromisoformat(it['created_at'])
    return items

@api_router.get('/admin/services', response_model=List[Service])
async def admin_list_services(_: dict = Depends(require_admin)):
    items = await db.services.find({}, {"_id": 0}).sort("order", 1).to_list(200)
    for it in items:
        if isinstance(it.get('created_at'), str):
            it['created_at'] = datetime.fromisoformat(it['created_at'])
    return items

@api_router.post('/admin/services', response_model=Service)
async def create_service(data: Service, _: dict = Depends(require_admin)):
    doc = data.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.services.insert_one(doc)
    return data

@api_router.put('/admin/services/{id}', response_model=Service)
async def update_service(id: str, data: Service, _: dict = Depends(require_admin)):
    doc = data.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.services.update_one({"id": id}, {"$set": doc}, upsert=True)
    return data

@api_router.delete('/admin/services/{id}')
async def delete_service(id: str, _: dict = Depends(require_admin)):
    await db.services.delete_one({"id": id})
    return {"ok": True}

# --- Projects CRUD ---
@api_router.get('/projects', response_model=List[Project])
async def list_projects():
    items = await db.projects.find({"visible": True}, {"_id": 0}).sort("created_at", -1).to_list(100)
    for it in items:
        if isinstance(it.get('created_at'), str):
            it['created_at'] = datetime.fromisoformat(it['created_at'])
    return items

@api_router.get('/projects/{slug}', response_model=Optional[Project])
async def get_project(slug: str):
    doc = await db.projects.find_one({"slug": slug, "visible": True})
    doc = await serialize_doc(doc)
    if doc and isinstance(doc.get('created_at'), str):
        doc['created_at'] = datetime.fromisoformat(doc['created_at'])
    return doc

@api_router.get('/admin/projects', response_model=List[Project])
async def admin_list_projects(_: dict = Depends(require_admin)):
    items = await db.projects.find({}, {"_id": 0}).sort("created_at", -1).to_list(200)
    for it in items:
        if isinstance(it.get('created_at'), str):
            it['created_at'] = datetime.fromisoformat(it['created_at'])
    return items

@api_router.post('/admin/projects', response_model=Project)
async def create_project(data: Project, _: dict = Depends(require_admin)):
    doc = data.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.projects.insert_one(doc)
    return data

@api_router.put('/admin/projects/{id}', response_model=Project)
async def update_project(id: str, data: Project, _: dict = Depends(require_admin)):
    doc = data.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.projects.update_one({"id": id}, {"$set": doc}, upsert=True)
    return data

@api_router.delete('/admin/projects/{id}')
async def delete_project(id: str, _: dict = Depends(require_admin)):
    await db.projects.delete_one({"id": id})
    return {"ok": True}

# --- Skills CRUD ---
@api_router.get('/admin/skills', response_model=List[Skill])
async def admin_list_skills(_: dict = Depends(require_admin)):
    items = await db.skills.find({}, {"_id": 0}).to_list(200)
    return items

@api_router.post('/admin/skills', response_model=Skill)
async def create_skill(data: Skill, _: dict = Depends(require_admin)):
    await db.skills.insert_one(data.model_dump())
    return data

@api_router.put('/admin/skills/{id}', response_model=Skill)
async def update_skill(id: str, data: Skill, _: dict = Depends(require_admin)):
    await db.skills.update_one({"id": id}, {"$set": data.model_dump()}, upsert=True)
    return data

@api_router.delete('/admin/skills/{id}')
async def delete_skill(id: str, _: dict = Depends(require_admin)):
    await db.skills.delete_one({"id": id})
    return {"ok": True}

# --- Posts CRUD ---
@api_router.get('/blog', response_model=List[Post])
async def list_posts():
    items = await db.posts.find({"status": "published"}, {"_id": 0}).sort("publish_date", -1).to_list(100)
    for it in items:
        if isinstance(it.get('created_at'), str):
            it['created_at'] = datetime.fromisoformat(it['created_at'])
        if isinstance(it.get('publish_date'), str):
            it['publish_date'] = datetime.fromisoformat(it['publish_date'])
    return items

@api_router.get('/blog/{slug}', response_model=Optional[Post])
async def get_post(slug: str):
    doc = await db.posts.find_one({"slug": slug, "status": "published"})
    doc = await serialize_doc(doc)
    if doc:
        if isinstance(doc.get('created_at'), str):
            doc['created_at'] = datetime.fromisoformat(doc['created_at'])
        if isinstance(doc.get('publish_date'), str):
            doc['publish_date'] = datetime.fromisoformat(doc['publish_date'])
    return doc

@api_router.get('/admin/posts', response_model=List[Post])
async def admin_list_posts(_: dict = Depends(require_admin)):
    items = await db.posts.find({}, {"_id": 0}).sort("created_at", -1).to_list(200)
    for it in items:
        if isinstance(it.get('created_at'), str):
            it['created_at'] = datetime.fromisoformat(it['created_at'])
        if isinstance(it.get('publish_date'), str):
            it['publish_date'] = datetime.fromisoformat(it['publish_date'])
    return items

@api_router.post('/admin/posts', response_model=Post)
async def create_post(data: Post, _: dict = Depends(require_admin)):
    doc = data.model_dump()
    if data.publish_date and isinstance(data.publish_date, datetime):
        doc['publish_date'] = data.publish_date.isoformat()
    doc['created_at'] = data.created_at.isoformat()
    await db.posts.insert_one(doc)
    return data

@api_router.put('/admin/posts/{id}', response_model=Post)
async def update_post(id: str, data: Post, _: dict = Depends(require_admin)):
    doc = data.model_dump()
    if data.publish_date and isinstance(data.publish_date, datetime):
        doc['publish_date'] = data.publish_date.isoformat()
    doc['created_at'] = data.created_at.isoformat()
    await db.posts.update_one({"id": id}, {"$set": doc}, upsert=True)
    return data

@api_router.delete('/admin/posts/{id}')
async def delete_post(id: str, _: dict = Depends(require_admin)):
    await db.posts.delete_one({"id": id})
    return {"ok": True}

# --- Settings ---
@api_router.get('/settings', response_model=Settings)
async def get_settings():
    doc = await db.settings.find_one({"id": "site-settings"})
    if not doc:
        s = Settings()
        await db.settings.insert_one(s.model_dump())
        return s
    doc = await serialize_doc(doc)
    return Settings(**doc)

@api_router.put('/admin/settings', response_model=Settings)
async def update_settings(s: Settings, _: dict = Depends(require_admin)):
    await db.settings.update_one({"id": "site-settings"}, {"$set": s.model_dump()}, upsert=True)
    return s

# --- Inquiries / Contact ---
@api_router.post('/contact', response_model=Inquiry)
async def submit_contact(data: InquiryCreate):
    inquiry = Inquiry(**data.model_dump())
    doc = inquiry.model_dump()
    doc['created_at'] = inquiry.created_at.isoformat()
    await db.inquiries.insert_one(doc)
    # Email notification could be added here (SMTP configurable later)
    return inquiry

@api_router.get('/admin/inquiries', response_model=List[Inquiry])
async def list_inquiries(_: dict = Depends(require_admin)):
    items = await db.inquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(200)
    for it in items:
        if isinstance(it.get('created_at'), str):
            it['created_at'] = datetime.fromisoformat(it['created_at'])
    return items

@api_router.put('/admin/inquiries/{id}/status')
async def set_inquiry_status(id: str, status_body: Dict[str, Literal['new','read','archived']], _: dict = Depends(require_admin)):
    new_status = status_body.get('status')
    if new_status not in ['new','read','archived']:
        raise HTTPException(status_code=400, detail='Invalid status')
    await db.inquiries.update_one({"id": id}, {"$set": {"status": new_status}})
    return {"ok": True}

# --- Admin Stats ---
@api_router.get('/admin/stats')
async def admin_stats(_: dict = Depends(require_admin)):
    projects = await db.projects.count_documents({})
    services = await db.services.count_documents({})
    inquiries = await db.inquiries.count_documents({})
    latest = await db.inquiries.find({}, {"_id": 0}).sort("created_at", -1).limit(10).to_list(10)
    return {"projects": projects, "services": services, "inquiries": inquiries, "latest_inquiries": latest}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def seed_admin_and_indexes():
    # Seed admin user if not exists
    admin_email = os.environ.get('ADMIN_EMAIL', 'admin@elif.agency')
    admin_name = os.environ.get('ADMIN_NAME', 'Elif Admin')
    admin_pw = os.environ.get('ADMIN_PASSWORD', 'admin1234')
    existing = await db.users.find_one({"email": admin_email})
    if not existing:
        await db.users.insert_one({
            'id': str(uuid.uuid4()),
            'email': admin_email,
            'name': admin_name,
            'password_hash': hash_password(admin_pw),
            'is_admin': True,
            'created_at': now_utc_iso(),
        })
    try:
        await db.services.create_index('id', unique=True)
        await db.projects.create_index('id', unique=True)
        await db.projects.create_index('slug', unique=True)
        await db.posts.create_index('id', unique=True)
        await db.posts.create_index('slug', unique=True)
        await db.skills.create_index('id', unique=True)
        await db.inquiries.create_index('id', unique=True)
        await db.users.create_index('email', unique=True)
    except Exception as e:
        logger.warning(f"Index creation issue: {e}")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
