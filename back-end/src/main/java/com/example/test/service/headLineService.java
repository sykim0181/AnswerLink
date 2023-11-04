package com.example.test.service;

import java.util.ArrayList;
import java.util.List;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import com.example.test.config.ChromeDriverContext;
import com.example.test.dto.TopicList;
import com.example.test.dto.headLineResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
@Component
public class headLineService {

	
	private static String bigKindsUrl = "https://www.bigkinds.or.kr";

	public List<String> getHeadLineTitle() throws JsonMappingException, JsonProcessingException{
		System.out.println("head line topic in");
		ChromeDriverContext driverContext = new ChromeDriverContext();
		WebDriver driver = driverContext.getChromeDriver();
		JavascriptExecutor js = (JavascriptExecutor) driver;
		driver.get(bigKindsUrl);	
		//JSONArray jsonArray = new JSONArray();
		String result = (String)js.executeScript("return JSON.stringify(trandReportList);");
		ObjectMapper objectMapper = new ObjectMapper();

		List<headLineResponse> topics = objectMapper.readValue(result, new TypeReference<List<headLineResponse>>() {});
		List<String> topicList = new ArrayList<>();
		for(headLineResponse topic : topics){
			List<TopicList> topic_container = topic.getTopicList();
			for(TopicList topic_text : topic_container){
				topicList.add(topic_text.getTopicText());
				System.out.println(topic_text.getTopicText());
			}
			
		}
		return topicList;
	}

}
