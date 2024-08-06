package com.eci.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;

import com.eci.dto.VoterLoginDto;
import com.eci.entity.Voter;

public interface VoterDao extends JpaRepository<Voter, Long> {
	public Voter findByEmail(String email);
}