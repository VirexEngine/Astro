import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = os.getenv(
    "DATABASE_URL", 
    "postgresql://postgres:postgres@localhost:5432/grahganit_db"
)

Base = declarative_base()

def get_engine():
    """Initializes database engine (SQLite by default, or PostgreSQL with fast 2s timeout fallback)."""
    db_url = os.getenv("DATABASE_URL", "sqlite:///./grahganit.db")
    
    if db_url.startswith("sqlite"):
        print("[DB] Operating on local SQLite database (grahganit.db).")
        return create_engine(
            db_url,
            connect_args={"check_same_thread": False}
        )

    try:
        pg_engine = create_engine(
            db_url,
            pool_size=20,
            max_overflow=30,
            pool_pre_ping=True,
            pool_recycle=1800,
            connect_args={"connect_timeout": 2}
        )
        # Test connection fast
        with pg_engine.connect() as conn:
            pass
        print("[DB] Connected to PostgreSQL server successfully.")
        return pg_engine
    except Exception as e:
        print(f"[DB] PostgreSQL connection failed ({e}). Falling back to local SQLite database (grahganit.db).")
        sqlite_url = "sqlite:///./grahganit.db"
        return create_engine(
            sqlite_url,
            connect_args={"check_same_thread": False}
        )

engine = get_engine()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    """FastAPI Dependency for database session management."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
