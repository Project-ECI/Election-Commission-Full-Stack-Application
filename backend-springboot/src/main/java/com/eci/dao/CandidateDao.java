package com.eci.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eci.entity.Candidate;
import com.eci.entity.District;

public interface CandidateDao extends JpaRepository<Candidate, Long> {
	public List<Candidate> findByConstituency(District districtId);
}