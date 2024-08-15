package com.eci.service;

import java.util.List;

import com.eci.dto.CandidateAcceptDto;
import com.eci.dto.ChangePasswordDto;
import com.eci.dto.ChangePasswordPartyDto;
import com.eci.dto.GetAllPartyDto;
import com.eci.dto.GetAllpartyForAdmin;
import com.eci.dto.LoginDto;
import com.eci.dto.PartyCandidateRequestDto;
import com.eci.dto.PartyCandidateResponseDto;
import com.eci.dto.PartyRegistrationDto;
import com.eci.dto.UpdatePartyDto;

public interface PartyService {
	public String registerParty(PartyRegistrationDto partyDto);
	
	public String loginParty(LoginDto partyDto);
	
	public List<GetAllPartyDto> getAllParty();
	
	public String deleteParty(String id);
	
	public String updateProfile(UpdatePartyDto dto);
	
	public List<PartyCandidateResponseDto> getAllForm(PartyCandidateRequestDto dto);
	
	public List<PartyCandidateResponseDto> partyCandidate(String partyId);
	
	public String acceptForm(CandidateAcceptDto dto);
	
	public String changePassword(ChangePasswordPartyDto passwordDto);
	
	public List<GetAllpartyForAdmin> getPartyForAdmin();
	
	public String removeFromParty(String candidateId);
}
