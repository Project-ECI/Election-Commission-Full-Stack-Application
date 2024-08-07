package com.eci.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eci.dto.FeedbackDto;
import com.eci.service.FeedbackService;

@RestController
@RequestMapping("/eci")
public class GlobalController {
	@Autowired
	private FeedbackService feedbackService;
	
	@PostMapping("/feedback")
	public ResponseEntity<?> giveFeedback(FeedbackDto dto){
		return ResponseEntity.status(HttpStatus.CREATED).body(feedbackService.addFeedback(dto));
	}
}
