//package com.example.test.service;
//
//import org.springframework.beans.factory.annotation.Qualifier;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
//import org.springframework.web.client.RestTemplate;
////import org.testng.annotations.Parameters;
//
//
//@Configuration
//public class OpenAIRestTemplateConfig {
//	
//	@Value("${openai.api.key}")
//	private String openaiApiKey;
//	
//	
//	@Bean
//	@Qualifier("openaiRestTemplate")
//	public RestTemplate openaiRestTemplate() {
//		RestTemplate restTemplate = new RestTemplate();
//		restTemplate.setRequestFactory(new HttpComponentsClientHttpRequestFactory());
//		restTemplate.getInterceptors().add((request,body,execution)->{
//			request.getHeaders().add("Authorization", "Bearer" + openaiApiKey);
//			return execution.execute(request, body);
//		});
//		return restTemplate;
//	}
//	
//
//}
