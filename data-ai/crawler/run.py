from trend_topic import get_topics
from download_news import get_news
import json

if __name__ == '__main__':
    
    print('Start crawling trend topics...')
    topics = get_topics()
    with open('trend_topics.json', 'w') as f:
        json.dump(topics, f, indent=4, ensure_ascii=False)
    print('Finish crawling trend topics')
    print('Start crawling news...')
    get_news()
    print('Finish crawling news')
