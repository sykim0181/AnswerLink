package com.example.test.service;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;



@Service
public class QuestionAnswerServicce {
	
//	public UserResponse hello() {
		
		//build AI server uri 
//		URI uri = UriComponentsBuilder
//				.fromUriString("http://localhost:9090")
//				.path("/api/server/hello")
//				.encode()
//				.build().
//				toUri();
		
//		System.out.println(uri.toString());
		
		//Rest template 생성해서 위에서 build한 uri로 response 받아오
//		RestTemplate restTemplate = new RestTemplate();
//		ResponseEntity<UserResponse> result = restTemplate.getForEntity(uri, UserResponse.class);
		
//		System.out.println(result.getStatusCode());
//		System.out.println(result.getBody());
//		return result.getBody();
//	}

}
