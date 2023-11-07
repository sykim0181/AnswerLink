from haystack.document_stores import ElasticsearchDocumentStore, SQLDocumentStore
from haystack.schema import Document
from tqdm.auto import tqdm
import bareunpy as brn
import json
from multiprocessing import Pool

with open("secutity.json", "r") as f:
    security = json.load(f)

tagger = brn.Tagger(apikey=security["bareun"],
                        host=security["bareun_host"],
                        port=security["bareun_port"]
                        )

def convert_document(document: Document):
    '''
        Convert Document to Document that pos is 
            only Noun, Verb, Adjective, Adverb, Foreign word, Chinese character, Number
        content: post tagged string that Main body of the news article
        meta: {
            title: Title of the article
            created: Creation time in datetime
            url: Link to the article
            category: category of the article
            content: Original main body of the news article
            }
    '''
    content = document.content if document.content else document.meta["title"]
    res = tagger.tag(content)
    # remove unnecessary pos
    pos = [i[0] for i in res.pos()
            if i[1] in ['SL', 'SH', 'SN', 'NNP', 'NNG', 'NNB', 'NR',
                        'VV', 'VA', 'VX', 'VCP', 'VCN', 'XR', 'XPN'
                        ]
        ]
    converted_document = Document(
        content=' '.join(pos),
        meta={
            "title":document.meta["title"], "created":document.meta["created"],
            "url":document.meta["url"], "category":document.meta["category"],
            "content":content
            }
    )
    return converted_document

if __name__ == '__main__':
    # conver DocumentStore from SQL to Elasticsearch
    documents = SQLDocumentStore(url="sqlite:///news_20231101.db").get_all_documents()
    """
    host: str Elasticsearch host url e.g localhost, 127.0.0.1
    username: str Elasticsearch id
    password: str Elasticsearch auth password
    index: str Elasticsearch index name
    
    we store crawled news data in Elasticsearch.
    index name is `news`
    """
    
    converted_documents = []
    with Pool(4) as p:
        converted_documents = list(tqdm(p.imap(convert_document, documents), total=len(documents)))
        
    documentStore = SQLDocumentStore(url="sqlite:///news_20231102.db", duplicate_documents='overwrite')
    documentStore.write_documents(converted_documents,duplicate_documents='overwrite')
