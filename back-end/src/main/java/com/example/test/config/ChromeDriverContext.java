package com.example.test.config;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ChromeDriverContext {
    private WebDriver driver;
    private static final Logger logger = LoggerFactory.getLogger(ChromeDriverContext.class);
    public ServiceKeyConfig config = new ServiceKeyConfig();
    private String CHRHOME_DRIVER_PATH = config.getDriverPath();

    @Bean
    public WebDriver getDriver(){
        return driver;
    }

    @Bean
    public WebDriver getChromeDriver(){
        System.setProperty("webdriver.chrome.driver", CHRHOME_DRIVER_PATH);

        ChromeOptions options = new ChromeOptions();
        options.addArguments("--window-size=1366,768");
        options.addArguments("--headless");
        //options.setProxy(true);
        options.addArguments("--lang=ko");
    	options.addArguments("--no-sandbox");
    	options.addArguments("--disable-dev-shm-usage");
    	options.addArguments("--disable-gpu");

        try {
            /*
             *
             * @ params
             * option : headless
             *
             */
            driver = new ChromeDriver(options);
        } catch (Exception e) {
            logger.error("### [driver error] msg: {}, cause: {}", e.getMessage(), e.getCause());
        }

        return driver;

    }
    
}