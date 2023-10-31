package com.example.test;

import org.springframework.boot.SpringApplication;
//import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

import com.example.test.config.ServiceKeyConfig;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;


//import com.example.test.config.ServiceKeyConfig;
@ConfigurationPropertiesScan
@SpringBootApplication
@RequiredArgsConstructor
public class TestApplication {

	private final ServiceKeyConfig serviceKeyConfig;
	public static void main(String[] args) {
		SpringApplication.run(TestApplication.class, args);
		System.out.println("configuration property : "+serviceKeyConfig.getServiceKey());
	}

	@PostConstruct
	public void init(){
		System.out.println("configuration property : "+serviceKeyConfig.getServiceKey());
	}

}
