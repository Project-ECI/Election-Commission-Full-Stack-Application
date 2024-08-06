package com.eci.service;

import com.eci.dto.VoterLoginDto;
import com.eci.dto.VoterRegisterDto;

public interface VoterService {
	public VoterRegisterDto registerVoter(VoterRegisterDto voterRegisterDto);
	
	public String loginVoter(VoterLoginDto voterLoginDto);
}
