package com.eci.service;

import com.eci.dto.CandidateLoginDto;
import com.eci.dto.CandidateNominationDto;
import com.eci.dto.CandidateRegisterDto;
import com.eci.dto.VoterLoginDto;

public interface CandidateService {
	public String loginCandidate(CandidateLoginDto candidLoginDto);

	public CandidateRegisterDto registerCandidate(CandidateRegisterDto candidateRegisterDto);

	public CandidateNominationDto nominateCandidate(CandidateNominationDto dto);
}
