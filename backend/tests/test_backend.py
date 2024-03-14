from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from ..main import app, get_db
from .. import models, schemas

SQLALCHEMY_DATABASE_URL = "sqlite:///./backend/test.db"

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={
    "check_same_thread": False})
TestingSessionLocal = sessionmaker(
    autocommit=False, autoflush=False, bind=engine)

models.Base.metadata.create_all(bind=engine)

def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)


def test_signup():
    user = schemas.UserCreate(username="testuser", password="testpassword")
    response = client.post("/signup", json=user.model_dump())
    assert response.status_code == 200
    data = response.json()
    assert data["username"] == "testuser"
    assert "id" in data
    assert data["tasks"] == []

