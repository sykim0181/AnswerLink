from haystack.nodes import BM25Retriever
from haystack.document_stores import ElasticsearchDocumentStore
from typing import List
import openai
import json

with open('security.json', 'r') as f:
    security = json.load(f)
    
openai.api_key = security['openai']
openai.organization = security["organization"]

# load document store
document_store = ElasticsearchDocumentStore(host="localhost", username="", password="", index="news")
# create retriever node
retriever = BM25Retriever(document_store=document_store)

def retrieve(query: str, top_k: int = 5):
    # retrieve top 5 documents
    return retriever.retrieve(query=query, top_k=top_k)

def retrieve_batch(queries: List[str], top_k: int = 5):
    return retriever.retrieve_batch(queries=queries, top_k=top_k)


PROMPT = """Let's think step-by-step.
You need to expand the query provided by the natural language processing and reasoner.

Follow the instructions below to rewrite and expand the query.
Find the keywords in the query.
Generate keywords that are semantically similar or identical to the keywords.
Create a few questions with the same answer.
Summarize the questions you generated.
Generate answers to the questions you generated.


Please provide your answers in the following format
``` JSON
{{
"re-written": --re-written query --,
"answer": --the correct answer to the generated question--
}}
```

한국어로 생성해줘
Query: {query}
JSON:
"""

def query_augmentation(query: str):
    
    res = openai.ChatCompletion.create(
            model='gpt-3.5-turbo-1106',
            temperature=0,
            seed=1234,
            response_format={"type": 'json_object'},
            messages=[{
                "role": "system",
                "content": PROMPT.format(query=query)
            }]
        )
    
    try:
        augmeted = json.loads(res.choices[0]["message"]["content"])
        return augmeted["re-written"], augmeted["answer"]
    
    except json.decoder.JSONDecodeError:
        return query, ''
    except KeyError:
        return query, res.choices[0]["message"]["content"]

if __name__ == '__main__':
    q = query_augmentation("아이폰 15")
    print(q)
