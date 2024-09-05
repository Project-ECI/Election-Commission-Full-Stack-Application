package com.eci.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eci.dao.FeedbackDao;
import com.eci.dto.FeedbackDto;
import com.eci.entity.Feedback;

@Service
@Transactional
public class FeedbackServiceImpl implements FeedbackService {
	@Autowired
	private FeedbackDao feedbackDao;


	@Override
	public String addFeedback(String discription) {
		Feedback feedback = new Feedback();
		feedback.setFeedbackDescription(discription);
		feedbackDao.save(feedback);
		return "success";
	}

	@Override
	public List<FeedbackDto> getAllFeedbackForAdmin() {
		List<FeedbackDto> dtoList =new ArrayList<FeedbackDto>();
		List<Feedback> feedbackList = feedbackDao.findAll();
		for(Feedback feedback: feedbackList) {
			FeedbackDto dto =new FeedbackDto();
			dto.setFeedbackDescription(feedback.getFeedbackDescription());
			dto.setFeedbackId(feedback.getFeedbackId().toString());
			dtoList.add(dto);
		}
		return dtoList;
	}

}
