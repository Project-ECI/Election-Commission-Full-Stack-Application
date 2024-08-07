package com.eci.service;

import java.util.Optional;

import com.eci.dto.LoginDto;
import com.eci.dto.CandidateNominationDto;
import com.eci.dto.CandidateRegistrationDto;

import com.eci.entity.Candidate;


public interface CandidateService {
	public String loginCandidate(LoginDto candidLoginDto);

	public CandidateRegistrationDto registerCandidate(CandidateRegistrationDto candidateRegisterDto);

	public CandidateNominationDto nominateCandidate(CandidateNominationDto dto);
	
	public Optional<Candidate> getCandidateById(Long id);
}
