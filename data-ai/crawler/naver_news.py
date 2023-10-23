from utils import get_driver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from tqdm.auto import tqdm
from requests import Session
from bs4 import BeautifulSoup

import re, time, pickle, datetime, json, os

BASE_URL = 'https://news.naver.com/main/list.naver?mode=LSD&mid=sec&sid1={sid1}&date={date}&listType=title'
categories = { '정치': 100, '경제': 101, '사회': 102, '생활문화': 103, '세계': 104, 'IT과학': 105, '오피니언': 110,}

def get_urls(sid1, date):
    urls = []
    driver = get_driver()
    driver.get(BASE_URL.format(sid1=sid1, date=date) + '&page=10000')
    print(driver.current_url)
    # print(driver.headers)
    element = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, '#main_content > div.paging > strong'))
    )
    
    #main_content > div.list_body.newsflash_body  > a
    total_pages = int(element.get_attribute('innerText'))
    for i in tqdm(range(1, total_pages+1)):
        driver.get(BASE_URL.format(sid1=sid1, date=date) + f'&page={i}')
        elements = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, '#main_content > div.list_body.newsflash_body'))
        )
        a_tags = elements.find_elements(By.TAG_NAME, 'a')
        for a_tag in a_tags[4:]:
            urls.append(a_tag.get_attribute('href'))
    return urls

def get_article(url,driver=None,tries=5):
    
    if url.startswith('https://sports.news.naver.com'):
        return None
    if url.startswith('https://entertain.naver.com'):
        return None

    s = Session()
    s.headers.update({'User-Agent': 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Safari/605.1.15'})
    res = s.get(url)
    # html = driver.page_source 
    if res.ok:
        soup = BeautifulSoup(res.text, 'lxml')
        try:
            article = soup.find('div',{'id': 'newsct_article'}).text
        except AttributeError:
            return None
        title = soup.find('h2', {'id': 'title_area'}).text
        date = soup.find_all('div', {'class':'media_end_head_info_datestamp_bunch'})
        created = date[0].find('span', {'class':'media_end_head_info_datestamp_time'}).attrs['data-date-time']
        if len(date) > 1: # modified
            updated = date[1].find('span', {'class':'media_end_head_info_datestamp_time'}).attrs['data-modify-date-time']
        # subtract email in article
        article = re.sub(r'[\w\.-]+@[\w\.-]+', '', article)
        # subtract url in article
        article = re.sub(r'http\S+', '', article)
        # subtract newlines in article
        article = re.sub(r'\n+|\t+', '', article).strip()
        reversed_content = ''.join(reversed(article))
        content = ''
        for i in range(0, len(reversed_content)):
            # the article content and find the first ".다" in the reversed content.
            if reversed_content[i:i + 2] == '.다':
                content = ''.join(reversed(reversed_content[i:]))
                break
        return {"content":content, "title":title, "created":created, "url":url}
    else:
        if tries > 0:
            time.sleep(1)
            return get_article(url, driver, tries-1)
        else:
            return None

if __name__ == '__main__':
    # get yesterday from datetime
    yesterday = datetime.datetime.now() - datetime.timedelta(days=1)
    yesterday = yesterday.strftime('%Y%m%d')
    for i in range(2):
        yesterday = datetime.datetime.now() - datetime.timedelta(days=i+6)
        yesterday = yesterday.strftime('%Y%m%d')
        for category, sid1 in categories.items():
            if os.path.exists("urls_{}_{}.pkl".format(category, yesterday)):
                with open("urls_{}_{}.pkl".format(category, yesterday), "rb") as f:
                    urls = pickle.load(f)
            else:
                urls = get_urls(sid1, yesterday)
            articles = []
            if os.path.exists("news_{}_{}.jsonl".format(category, yesterday)):
                continue
            driver = get_driver()
            with open("urls_{}_{}.pkl".format(category, yesterday), "wb") as f:
                pickle.dump(urls, f)
            with tqdm(total=len(urls)) as pbar:
                for i, url in enumerate(urls):
                    article = get_article(url, driver)
                    pbar.update()
                    if article:
                        articles.append(article)
            
            with open("news_{}_{}.jsonl".format(category, yesterday), "w") as f:
                for article in articles:
                    f.write(json.dumps(article, ensure_ascii=False) + "\n")