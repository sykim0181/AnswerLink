package com.example.test.service;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import com.example.test.config.ChromeDriverContext;
import com.example.test.config.SystemConfig;
import com.example.test.dto.TopicList;
import com.example.test.dto.headLineResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;


@Component
@Service
public class FetchTitle {
	
	private static String bigKindsUrl = "https://www.bigkinds.or.kr";
    
    public List<String> fetchTitle() throws IOException{
		//System.out.println("head line topic in");
		ChromeDriverContext driverContext = new ChromeDriverContext();
		WebDriver driver = driverContext.getChromeDriver();
        SystemConfig systemConfig = new SystemConfig();
		JavascriptExecutor js = (JavascriptExecutor) driver;
		driver.get(bigKindsUrl);	
		String result = (String)js.executeScript("return JSON.stringify(trandReportList);");
		ObjectMapper objectMapper = new ObjectMapper();
        System.out.println(result);
		List<headLineResponse> topics = objectMapper.readValue(result, new TypeReference<List<headLineResponse>>() {});
		List<String> topicList = new ArrayList<>();
        //Path directoryPath = Paths.get("../storage");
        File file = new File(systemConfig.getStoragePath()+"/headLine_list.txt");
        BufferedWriter writer = new BufferedWriter(new FileWriter(file,false));
        String final_update_date = topics.get(0).getDate();
        //write final update date
        System.out.println(final_update_date);
        writer.write(final_update_date);
        writer.newLine();
        writer.flush();
		for(headLineResponse topic : topics){
			List<TopicList> topic_container = topic.getTopicList();
			for(TopicList topic_text : topic_container){
				topicList.add(topic_text.getTopicText());
                writer.write(topic_text.getTopicText());
                writer.newLine();
                writer.flush();
				System.out.println(topic_text.getTopicText());
			}
			
		}
		return topicList;
	}
	

}
