from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome import options
import os

def get_driver():
    service = Service(ChromeDriverManager().install())
    option = options.Options()
    option.add_argument('--window-size=1920,1080')
    option.add_argument('--disable-gpu')
    option.add_argument('--headless')
    option.add_experimental_option( "prefs", { "download.default_directory": '/Users/peter/AnswerLink/AnswerLink/crawler' })
    driver = webdriver.Chrome(service=service, options=option)
    return driver
