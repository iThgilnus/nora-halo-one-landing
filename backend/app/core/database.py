import pymysql
import pymysql.cursors
from app.core.config import settings

db_connection = None

def init_db():
    global db_connection
    try:
        # Kết nối tới MySQL Server
        conn = pymysql.connect(
            host=settings.MYSQL_HOST,
            port=settings.MYSQL_PORT,
            user=settings.MYSQL_USER,
            password=settings.MYSQL_PASSWORD,
            database=settings.MYSQL_DATABASE,
            cursorclass=pymysql.cursors.DictCursor,
            autocommit=True
        )
        db_connection = conn
        print(f"Kết nối thành công MySQL Database: {settings.MYSQL_DATABASE}")
        
        # Khởi tạo các bảng nếu chưa tồn tại
        with conn.cursor() as cursor:
            # 1. Bảng leads
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS leads (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    phone VARCHAR(50) NOT NULL,
                    email VARCHAR(255) NULL,
                    notes TEXT NULL,
                    source VARCHAR(50) NULL,
                    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
            """)
            
            # 2. Bảng events
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS events (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    eventType VARCHAR(100) NOT NULL,
                    category VARCHAR(100) NOT NULL,
                    metadata TEXT NULL,
                    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
            """)
            
        print("Xác thực hệ thống bảng MySQL hoàn tất (leads & events).")
        return conn
    except Exception as e:
        print(f"LỖI: Khởi tạo kết nối database MySQL thất bại: {e}")
        return None

def get_db():
    global db_connection
    try:
        if db_connection is None:
            return init_db()
        # Tự động ping để kiểm tra kết nối còn sống, nếu mất kết nối sẽ tự kết nối lại (Auto-reconnect)
        db_connection.ping(reconnect=True)
        return db_connection
    except Exception:
        return init_db()
