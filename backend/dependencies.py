from typing import Annotated
from . import crud

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from . import schemas
from .auth import ALGORITHM, SECRET_KEY
from .database import SessionLocal


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="login",
    scopes={"me": "Read information about the current user.",
            "items": "Read items."}
)


def get_current_user(token: Annotated[str, Depends(oauth2_scheme)], db: Session = Depends(get_db)):
    # Implementation for getting the current user from the database
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = schemas.TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = crud.get_user_by_username(db, username=token_data.username)
    return user


def authorized_user(task_id: int, user: Annotated[schemas.User, Depends(get_current_user)], db: Session = Depends(get_db)):
    task = crud.get_task(db, task_id)
    # If task not found, even then raise 403 because we don't want to leak information
    if not task or task.user != user:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="Access denied")
    return user
