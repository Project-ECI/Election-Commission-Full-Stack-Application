package com.eci.service;

import org.springframework.http.ResponseEntity;

import com.eci.dto.CandidateNominationDto;
import com.eci.dto.CandidateRegisterDto;

public interface CandidateService {
	public CandidateRegisterDto registerCandidate(CandidateRegisterDto candidateRegisterDto);
	public CandidateNominationDto nominateCandidate(CandidateNominationDto dto);
}
