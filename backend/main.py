from datetime import timedelta
from typing import Annotated
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session


from . import crud, models, schemas
from .auth import ACCESS_TOKEN_EXPIRE_MINUTES, authenticate_user, create_access_token
from .database import engine
from .dependencies import authorized_user, get_current_user, get_db

models.Base.metadata.create_all(bind=engine)


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# API routes

@app.post("/signup", response_model=schemas.User)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # Implementation for user registration (create user in the database)
    db_user = crud.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Username already registered")
    return crud.create_user(db=db, user=user)


@app.post("/login", response_model=schemas.Token)
def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: Session = Depends(get_db)) -> schemas.Token:
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires)
    return schemas.Token(access_token=access_token, token_type="bearer")


@app.get("/users/me", response_model=schemas.User)
def get_user(current_user: Annotated[schemas.User, Depends(get_current_user)],  db: Session = Depends(get_db)):
    # Implementation for getting a user (authenticated user only)
    return current_user


@app.post("/tasks/", response_model=schemas.Task)
def create_task(current_user: Annotated[schemas.User, Depends(get_current_user)], task: schemas.TaskCreate,  db: Session = Depends(get_db)):
    # Implementation for creating a task (authenticated user only)
    return crud.create_user_task(db=db, task=task, user=current_user)


@app.get("/tasks/", response_model=list[schemas.Task])
def get_tasks(current_user: Annotated[schemas.User, Depends(get_current_user)], db: Session = Depends(get_db)):
    # Implementation for reading a task (authenticated user only)
    return crud.get_user_tasks(db=db, user=current_user)


@app.get("/tasks/{task_id}", response_model=schemas.Task)
def get_task(current_user: Annotated[schemas.User, Depends(authorized_user)], task_id: int, db: Session = Depends(get_db)):
    # Implementation for getting a task (authenticated user only)
    task = crud.get_task(db, task_id=task_id)
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )
    return task


@app.put("/tasks/{task_id}", response_model=schemas.Task)
def update_task(current_user: Annotated[schemas.User, Depends(authorized_user)], task_id: int, updated_task: schemas.TaskCreate, db: Session = Depends(get_db)):
    # Implementation for updating a task (authenticated user only)
    return crud.update_task(db, task_id=task_id, task=updated_task)


@app.delete("/tasks/{task_id}", response_model=schemas.Task)
def delete_task(current_user: Annotated[schemas.User, Depends(authorized_user)], task_id: int,  db: Session = Depends(get_db)):
    # Implementation for deleting a task (authenticated user only)
    return crud.delete_task(db, task_id=task_id)


@app.get("/demo")
def demo_get():
    return {"message": "Hello World"}


@app.post("/demo")
def demo_post(user: schemas.UserCreate):
    return user
