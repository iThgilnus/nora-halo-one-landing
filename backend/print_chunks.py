import os
import sys
from dotenv import load_dotenv

# Load env variables
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
load_dotenv(dotenv_path=os.path.join(BASE_DIR, ".env"))

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

def test():
    from langchain_community.vectorstores import Chroma
    from langchain_openai import OpenAIEmbeddings
    
    embeddings = OpenAIEmbeddings(
        model="text-embedding-3-small",
        openai_api_key=OPENAI_API_KEY
    )
    
    persist_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "chroma_db")
    
    vector_store = Chroma(
        collection_name="nora_kb",
        embedding_function=embeddings,
        persist_directory=persist_dir,
        collection_metadata={"hnsw:space": "cosine"}
    )
    
    # Retrieve all documents
    all_docs = vector_store.get()
    print("Total documents in ChromaDB:", len(all_docs['documents']))
    
    for i, (doc, meta) in enumerate(zip(all_docs['documents'], all_docs['metadatas'])):
        print(f"\n--- Chunk {i+1} | Source: {meta.get('title')} ---")
        print(doc)
        print("-" * 60)

if __name__ == '__main__':
    test()
