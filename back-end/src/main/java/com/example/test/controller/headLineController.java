package com.example.test.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.test.dto.headLineResponse;
import com.example.test.service.headLineService;
import com.fasterxml.jackson.core.exc.StreamReadException;
import com.fasterxml.jackson.databind.DatabindException;

import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class headLineController {
	
	private final headLineService HeadLineService;
	
	@GetMapping("/title")
	public List<headLineResponse> headLineList() throws StreamReadException, DatabindException, IOException {
		//return service.getheadline()
		return HeadLineService.getHeadLine();
	}
	

}
