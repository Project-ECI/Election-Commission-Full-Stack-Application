package com.eci.service;

import java.util.List;

import com.eci.dto.FeedbackDto;
import com.eci.entity.Feedback;

public interface FeedbackService {
	
	public String addFeedback(String discription);
	
	public List<FeedbackDto> getAllFeedbackForAdmin();
}
