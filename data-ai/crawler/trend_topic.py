from utils import get_driver
import json

def get_topics():
    driver = get_driver()
    driver.get('https://www.bigkinds.or.kr')
    data = driver.execute_script('return JSON.stringify(trandReportList);')
    return json.loads(data)
