package com.example.test.dto;

import org.springframework.boot.autoconfigure.kafka.KafkaProperties.Retry.Topic;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class TopicList {
	
	@JsonProperty("topic_text")
	private String topicText;
	@JsonProperty("topic_sn")
	private String topicSn;
	@JsonProperty("topic_count")
	private String topicCount;

	public TopicList(){

	}
	
	// public String getTopicText() {
	// 	return topicText;
	// }
	// public void setTopicText(String topicText) {
	// 	this.topicText = topicText;
	// }
	// public String getTopicSn() {
	// 	return topicSn;
	// }
	// public void setTopicSn(String topicSn) {
	// 	this.topicSn = topicSn;
	// }
	// public String getTopicCount() {
	// 	return topicCount;
	// }
	// public void setTopicCount(String topicCount) {
	// 	this.topicCount = topicCount;
	// }
	
	
	
}
