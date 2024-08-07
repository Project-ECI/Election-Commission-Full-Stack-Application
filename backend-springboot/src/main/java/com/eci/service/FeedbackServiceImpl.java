package com.eci.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eci.dao.FeedbackDao;
import com.eci.dto.FeedbackDto;
import com.eci.entity.Feedback;

@Service
@Transactional
public class FeedbackServiceImpl implements FeedbackService{
	@Autowired
	private FeedbackDao feedbackDao;
	
	@Autowired
	private ModelMapper mapper;
	
	@Override
	public Feedback addFeedback(FeedbackDto dto) {
		Feedback feedback = mapper.map(dto, Feedback.class);
		return feedbackDao.save(feedback);
	}

}
