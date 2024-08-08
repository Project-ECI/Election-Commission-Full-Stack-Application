package com.eci.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eci.entity.Candidate;
import com.eci.entity.District;
import com.eci.entity.Party;
import com.eci.entity.Voter;

public interface CandidateDao extends JpaRepository<Candidate, Long> {
	public List<Candidate> findByConstituency(District districtId);
	
	public Optional<Candidate> findByVoterId(Voter voterId);
	
	public List<Candidate> findAllByParty(Party partyId);
}