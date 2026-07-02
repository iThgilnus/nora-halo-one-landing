import os
import sys
import json
import re
from dotenv import load_dotenv

# Load env variables
app_dir = os.path.dirname(os.path.abspath(__file__))
load_dotenv(dotenv_path=os.path.join(app_dir, ".env"))

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

def update_viewer():
    from langchain_community.vectorstores import Chroma
    from langchain_openai import OpenAIEmbeddings
    
    embeddings = OpenAIEmbeddings(
        model="text-embedding-3-small",
        openai_api_key=OPENAI_API_KEY
    )
    
    persist_dir = os.path.join(app_dir, "chroma_db")
    
    vector_store = Chroma(
        collection_name="nora_kb",
        embedding_function=embeddings,
        persist_directory=persist_dir,
        collection_metadata={"hnsw:space": "cosine"}
    )
    
    # Retrieve all documents
    all_docs = vector_store.get()
    
    chunks_list = []
    for doc_id, doc_content, meta in zip(all_docs['ids'], all_docs['documents'], all_docs['metadatas']):
        chunks_list.append({
            "id": doc_id,
            "content": doc_content,
            "title": meta.get("title", "No Title"),
            "page": int(meta.get("page", 1))
        })
        
    # Sort chunks by page number and then title to keep them ordered
    chunks_list.sort(key=lambda x: (x['page'], x['title']))
    
    # Load chunks_viewer.html
    viewer_path = os.path.join(app_dir, "chunks_viewer.html")
    with open(viewer_path, 'r', encoding='utf-8') as f:
        html_content = f.read()
        
    # Replace the chunks array safely without using re.sub on replacement string
    chunks_json = json.dumps(chunks_list, ensure_ascii=False)
    
    pattern = r"const chunks = \[.*?\];"
    match = re.search(pattern, html_content, flags=re.DOTALL)
    
    if match:
        old_chunks_str = match.group(0)
        new_chunks_str = f"const chunks = {chunks_json};"
        new_html_content = html_content.replace(old_chunks_str, new_chunks_str)
        
        with open(viewer_path, 'w', encoding='utf-8') as f:
            f.write(new_html_content)
        print(f"Successfully fixed and updated {len(chunks_list)} chunks in chunks_viewer.html!")
    else:
        print("LỖI: Không tìm thấy 'const chunks = [...];' trong file HTML!")

if __name__ == '__main__':
    update_viewer()
