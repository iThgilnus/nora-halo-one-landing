import os
from dotenv import load_dotenv

# Find .env file in the root directory (2 levels up from backend/app/core)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
env_paths = [
    os.path.join(BASE_DIR, ".env.local"),
    os.path.join(BASE_DIR, ".env")
]

for path in env_paths:
    if os.path.exists(path):
        load_dotenv(dotenv_path=path)
        break

class Settings:
    MYSQL_HOST: str = os.getenv("MYSQL_HOST", "127.0.0.1")
    MYSQL_PORT: int = int(os.getenv("MYSQL_PORT", "3306"))
    MYSQL_USER: str = os.getenv("MYSQL_USER", "nora_admin")
    MYSQL_PASSWORD: str = os.getenv("MYSQL_PASSWORD", "nora_secure_pass")
    MYSQL_DATABASE: str = os.getenv("MYSQL_DATABASE", "nora_db")
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")

settings = Settings()
