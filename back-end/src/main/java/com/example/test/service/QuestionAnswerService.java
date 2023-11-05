package com.example.test.service;

import java.net.URI;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import com.example.test.config.SystemConfig;
import com.example.test.dto.ChatResponse;

@Service
public class QuestionAnswerService {
	SystemConfig serviceKeyConfig = new SystemConfig();
	
	public ChatResponse getAnswer(String query) {
		
		String serviceKey = serviceKeyConfig.getServiceKey();
		String authorization = null;
		//build AI server uri 
		URI uri = UriComponentsBuilder
				.fromUriString("https://localhost:8000")
				.path("/chat")
				.queryParam("query", query)
				.queryParam("serviceKey", serviceKey)
				.queryParam("Authorization", authorization)
				.encode()
				.build()
				.toUri();
		
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<ChatResponse> result = restTemplate.getForEntity(uri, ChatResponse.class);
		System.out.println(result.getStatusCode());
		System.out.println(result.getBody());
		
		return result.getBody();
	}

}
