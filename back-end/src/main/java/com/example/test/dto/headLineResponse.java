package com.example.test.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class headLineResponse {
	
	@JsonProperty("date")
	private String date;

	@JsonProperty("topic_year")
	private String topicYear;
	@JsonProperty("topic_day")
	private String topicDay;
	@JsonProperty("topic_sort")
	private String topicSort;
	
	@JsonProperty("topic_list")
	private List<TopicList> topicList;


	@JsonProperty("topic_category")
	private String topicCategory;
	
	// @JsonProperty("topic_category")
	// private String topicCategory;

	// public headLineResponse(){

	// }
	
	// public String getDate() {
	// 	return date;
	// }
	// public void setDate(String date) {
	// 	this.date = date;
	// }
	// public String getTopicYear() {
	// 	return topicYear;
	// }
	// public void setTopicYear(String topicYear) {
	// 	this.topicYear = topicYear;
	// }
	// public String getTopicDay() {
	// 	return topicDay;
	// }
	// public void setTopicDay(String topicDay) {
	// 	this.topicDay = topicDay;
	// }
	// public String getTopicSort() {
	// 	return topicSort;
	// }
	// public void setTopicSort(String topicSort) {
	// 	this.topicSort = topicSort;
	// }
	// public List<TopicList> getTopicList() {
	// 	return topicList;
	// }
	// public void setTopicList(List<TopicList> topicList) {
	// 	this.topicList = topicList;
	// }
	// public String getTopicCategory() {
	// 	return topicCategory;
	// }
	// public void setTopicCategory(String topicCategory) {
	// 	this.topicCategory = topicCategory;
	// }
	
	
}
