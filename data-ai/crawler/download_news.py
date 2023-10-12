from utils import get_driver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
import json
from time import sleep

import os
import time

def latest_download_file():
      path = os.getcwd()
      os.chdir(path)
      files = sorted(os.listdir(os.getcwd()), key=os.path.getmtime)
      newest = files[-1]

      return newest


URLS = 'https://www.bigkinds.or.kr/v2/news/index.do'
with open('security.json', 'r') as f:
    security = json.load(f)

def get_element_until_load(driver, xpath):
    sleep(1)
    element = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, xpath))
    )
    return element

def get_news():
    driver = get_driver()
    action = ActionChains(driver)
    driver.get(URLS)
    # wait until the page is loaded
    login = get_element_until_load(driver, '//*[@id="header"]/div[1]/div/div[2]/button[1]')
    driver.execute_script("arguments[0].click();", login)
    
    login_id = get_element_until_load(driver, '//*[@id="login-user-id"]')
    login_id.send_keys(security['id'])
    
    login_pw = get_element_until_load(driver, '//*[@id="login-user-password"]')
    login_pw.send_keys(security['password'])
    
    login_button = get_element_until_load(driver, '//*[@id="login-btn"]')
    driver.execute_script("arguments[0].click();", login_button)

    duration_button = get_element_until_load(driver, '//*[@id="collapse-step-1-body"]/div[3]/div/div[1]/div[1]/a')
    driver.execute_script("arguments[0].click();", duration_button)
    
    
    oneday_button = get_element_until_load(driver, '//*[@id="srch-tab1"]/div/div[1]/span[1]/label')
    driver.execute_script("arguments[0].click();", oneday_button)
    
    apply_button = get_element_until_load(driver, '//*[@id="search-foot-div"]/div[2]/button[2]')
    driver.execute_script("arguments[0].click();", apply_button)    
    
    sleep(3)
    step03_button = get_element_until_load(driver, '//*[@id="collapse-step-3"]')
    driver.execute_script("arguments[0].click();", step03_button)
    
    sleep(10)
    download_button = WebDriverWait(driver, 10).until(
       EC.presence_of_element_located((By.XPATH, '//*[@id="analytics-data-download"]/div[3]/button'))
    )
    
    driver.execute_script("arguments[0].click();", download_button)   
    
    element = WebDriverWait(driver, 300).until(
       EC.presence_of_element_located((By.CSS_SELECTOR, '#analytics-data-download > div.data-down-scroll > div > div > div.news-loader.loading'))
    )
    visible = element.get_attribute('style')
    while visible != 'display: none;':
        time.sleep(1)
        visible = element.get_attribute('style')
    WebDriverWait(driver, 300).until_not(EC.visibility_of(element))
    fileends = "crdownload"
    while "crdownload" == fileends:
        time.sleep(2)
        newest_file = latest_download_file()
        if "crdownload" in newest_file:
            fileends = "crdownload"
        else:
            fileends = "none"
    