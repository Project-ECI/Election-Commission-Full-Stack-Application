package com.eci.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eci.entity.Candidate;

public interface CandidateDao extends JpaRepository<Candidate, Long> {
}