package com.eci.service;

import com.eci.dto.FeedbackDto;
import com.eci.entity.Feedback;

public interface FeedbackService {
	public Feedback addFeedback(FeedbackDto dto);
}
