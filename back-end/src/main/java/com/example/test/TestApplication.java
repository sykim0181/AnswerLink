package com.example.test;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
//import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.context.annotation.ComponentScan;

import com.example.test.config.ServiceKeyConfig;
import com.example.test.dto.ListHeadLineResponse;
import com.example.test.dto.headLineResponse;
import com.example.test.service.QuestionAnswerService;
import com.example.test.service.headLineService;


import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;


//import com.example.test.config.ServiceKeyConfig;
//@ConfigurationPropertiesScan
@SpringBootApplication
//@RequiredArgsConstructor
//@ComponentScan("com.example.test.config.ServiceKeyConfig")
public class TestApplication {

	//public static final ServiceKeyConfig serviceKeyConfig = new ServiceKeyConfig();
	public static void main(String[] args) {
		SpringApplication.run(TestApplication.class, args);
		// headLineService topic = new headLineService();
		// headLineResponse result;
		// try {
		// 	result = topic.getHeadLine();
		// 	System.out.println(result.toString());
		// } catch (StreamReadException e) {
		// 	e.printStackTrace();
		// } catch (DatabindException e) {

		// 	e.printStackTrace();
		// } catch (IOException e) {
		// 	e.printStackTrace();
		// }
		
		// ServiceKeyConfig serviceKeyConfig = new ServiceKeyConfig();
		// System.out.println("configuration property : "+serviceKeyConfig.getServiceKey());
	}

	// @PostConstruct
	// public void init(){
	// 	System.out.println("configuration property : "+serviceKeyConfig.getServiceKey());
	// }

}
