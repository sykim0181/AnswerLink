from haystack.nodes import BM25Retriever
from haystack.document_stores import ElasticsearchDocumentStore
from typing import List

# load document store
document_store = ElasticsearchDocumentStore(host="localhost", username="", password="", index="news")
# create retriever node
retriever = BM25Retriever(document_store=document_store)

def retrieve(query: str, top_k: int = 5):
    # retrieve top 5 documents
    return retriever.retrieve(query=query, top_k=top_k)

def retrieve_batch(queries: List[str], top_k: int = 5):
    return retriever.retrieve_batch(queries=queries, top_k=top_k)