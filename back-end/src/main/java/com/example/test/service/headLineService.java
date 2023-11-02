package com.example.test.service;

import java.util.List;
import java.io.File;
import java.io.IOException;
import java.net.URI;

//import org.apache.http.protocol.HTTP;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

//import com.amazonaws.Response;

import com.example.test.dto.ChatResponse;
import com.example.test.dto.ListHeadLineResponse;
import com.example.test.dto.headLineResponse;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class headLineService {
	
	public headLineResponse getHeadLine() {
		System.out.println("head line response in");
		URI uri = UriComponentsBuilder
				.fromUriString("http://localhost:8000")
				.path("/trend")
				.encode()
				.build()
				.toUri();
		
		RestTemplate restTemplate = new RestTemplate();
        System.out.println("head line response middle");
        // HttpHeaders headers = new HttpHeaders();
        // headers.setContentType(MediaType.APPLICATION_JSON);
        // HttpEntity entity = new HttpEntity("parameters", headers);
        // ResponseEntity response = restTemplate.exchange(uri, HttpMethod.GET, entity, ListHeadLineResponse.class);
		ResponseEntity<headLineResponse> result = restTemplate.getForEntity(uri, headLineResponse.class);
        headLineResponse response = restTemplate.getForObject(uri, headLineResponse.class);
		System.out.println(result.getStatusCode());
		System.out.println(result.getBody());
		
		return response;
    
	}

}
