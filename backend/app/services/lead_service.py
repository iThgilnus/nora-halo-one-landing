from app.core.database import get_db

def save_lead(name: str, phone: str, last_message: str) -> bool:
    conn = get_db()
    if not conn:
        return False
        
    try:
        with conn.cursor() as cursor:
            sql = """
                INSERT INTO leads (name, phone, email, notes, source)
                VALUES (%s, %s, %s, %s, %s)
            """
            cursor.execute(sql, (
                name,
                phone,
                "",
                f"Đăng ký tự động qua Chatbot AI Streaming. Câu hỏi: '{last_message}'",
                "chatbot"
            ))
        print(f"Auto-captured lead in MySQL service: {name} - {phone}")
        return True
    except Exception as e:
        print(f"Failed to auto-insert lead in MySQL: {e}")
        return False
