package com.example.test.service;

import java.util.List;
import java.io.File;
import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.test.dto.headLineResponse;
import com.fasterxml.jackson.core.exc.StreamReadException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class headLineService {
	
	public List<headLineResponse> getHeadLine() throws StreamReadException, DatabindException, IOException{
		ObjectMapper objectMapper = new ObjectMapper();
		
		String absolutePath = "/Users/iminjeong/answerlink";
		String filePath = absolutePath+"/trend_topic.json";
		
		List<headLineResponse> headLineList = objectMapper.readValue(new File(filePath),
				new TypeReference<List<headLineResponse>>() {
			
		});
		
		
		return headLineList;
		
		
	}

}
