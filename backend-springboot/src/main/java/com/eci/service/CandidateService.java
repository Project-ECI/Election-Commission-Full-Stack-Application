package com.eci.service;

import java.util.List;
import java.util.Optional;

import com.eci.dto.LoginDto;
import com.eci.dto.CandidateNominationDto;
import com.eci.dto.CandidateRegistrationDto;
import com.eci.dto.DeleteDto;
import com.eci.dto.GetAllVoterForAdmin;
import com.eci.entity.Candidate;


public interface CandidateService {
	public String loginCandidate(LoginDto candidLoginDto);

	public String registerCandidate(CandidateRegistrationDto candidateRegisterDto);

	public String nominateCandidate(CandidateNominationDto dto);
	
	public Optional<Candidate> getCandidateById(Long id);
	
	public String candidateDelete(String id);
	
	public String formStatus(String candidateId);
	
	public List<GetAllVoterForAdmin> getCndidateForAdmin();
}
