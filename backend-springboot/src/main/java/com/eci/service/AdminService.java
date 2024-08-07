package com.eci.service;

import com.eci.dto.AdminLoginDto;
import com.eci.dto.CandidateLoginDto;
import com.eci.dto.CandidateNominationDto;
import com.eci.dto.CandidateRegisterDto;
import com.eci.dto.VoterLoginDto;

public interface AdminService {
	public String loginAdmin(AdminLoginDto adminLoginDto);

	
}
