package com.eci.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eci.entity.District;
import com.eci.entity.Voter;

public interface VoterDao extends JpaRepository<Voter, Long> {
	public Optional<Voter> findByEmail(String email);
	
	public Voter findByDistrictId(District districtId);
}