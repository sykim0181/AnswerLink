from haystack.document_stores import ElasticsearchDocumentStore, SQLDocumentStore

if __name__ == '__main__':
    # conver DocumentStore from SQL to Elasticsearch
    documents = SQLDocumentStore(url="sqlite:///news_20231026.db").get_all_documents()
    """
    host: str Elasticsearch host url e.g localhost, 127.0.0.1
    username: str Elasticsearch id
    password: str Elasticsearch auth password
    index: str Elasticsearch index name
    
    we store crawled news data in Elasticsearch.
    index name is `news`
    """
    documentStore = ElasticsearchDocumentStore(host="localhost", username="", password="", index="news")
    documentStore.write_documents(documents,duplicate_documents='overwrite')