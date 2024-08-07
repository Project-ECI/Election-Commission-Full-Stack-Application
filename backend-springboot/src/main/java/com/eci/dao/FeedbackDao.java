package com.eci.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eci.entity.Feedback;

public interface FeedbackDao extends JpaRepository<Feedback, Long>{
}
