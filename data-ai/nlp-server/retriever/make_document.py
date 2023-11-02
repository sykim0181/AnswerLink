from haystack.document_stores import SQLDocumentStore
from haystack.schema import Document
import os
import jsonlines
from tqdm.auto import tqdm

if __name__ == '__main__':
    """_summary_
    make document from crawled news data
    
    In JSONL format, each line is a JSON object below.
    ```JSON
        {"content": "Main body of the news article",
         "title": "Title of the article",
         "created": "Creation time in datetime",
         "url": "Link to the article"
        }
    ```
    For example, the file name is `news_정치_20231001.jsonl`, the category is `정치`, and the date is `20231001`
    documet format is below.
    Documet = {
        "content": "Main body of the news article",
        "meta": {
            "title": "Title of the article",
            "created": "Creation time in datetime",
            "url": "Link to the article",
            "category": "정치"
        }
    }
    store sqlite database file name is `news_20231026.db`
    """
    document_files = os.listdir()
    doocument_store = SQLDocumentStore(url="sqlite:///news_20231026.db", duplicate_documents='skip')
    documents = []
    for file in tqdm(document_files, unit="file"):
        if file.endswith(".jsonl"):
            with jsonlines.open(file) as reader:
                category = file.split("_")[1]
                for obj in tqdm(reader, leave=False, unit="doc"):
                    document = Document(
                        content=obj['content'],
                        meta={
                                "title":obj["title"], "created":obj["created"],
                                "url":obj["url"], "category":category
                            }
                    )
                    documents.append(document)
    doocument_store.write_documents(documents)
