package com.example.test.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.example.test.dto.ChatRequest;
import com.example.test.dto.ChatResponse;
import com.example.test.service.QuestionAnswerService;

@RestController
@RequestMapping("/api")
public class ChatController {
	
	@Autowired
	private QuestionAnswerService qaService;

	private String authorization;

	@GetMapping("/chat")
	public String chat(@RequestParam String prompt) {

		//create request
		qaService = new QuestionAnswerService();
		ChatResponse response = qaService.getAnswer(prompt);
		String answer = response.getAnswers();
		System.out.println(answer);
		return answer;
	}
	

	
}
