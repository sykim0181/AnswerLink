package com.example.test.dto;

import java.util.List;

public class headLineResponse {
	
	private String date;
	private String topic_year;
	private String topic_day;
	private String topic_sort;
	private List<TopicList> topic_list;
	private String topic_category;
	
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getTopic_year() {
		return topic_year;
	}
	public void setTopic_year(String topic_year) {
		this.topic_year = topic_year;
	}
	public String getTopic_day() {
		return topic_day;
	}
	public void setTopic_day(String topic_day) {
		this.topic_day = topic_day;
	}
	public String getTopic_sort() {
		return topic_sort;
	}
	public void setTopic_sort(String topic_sort) {
		this.topic_sort = topic_sort;
	}
	public List<TopicList> getTopic_list() {
		return topic_list;
	}
	public void setTopic_list(List<TopicList> topic_list) {
		this.topic_list = topic_list;
	}
	public String getTopic_category() {
		return topic_category;
	}
	public void setTopic_category(String topic_category) {
		this.topic_category = topic_category;
	}
	
	
}
