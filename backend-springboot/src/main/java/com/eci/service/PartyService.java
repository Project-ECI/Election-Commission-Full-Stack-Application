package com.eci.service;

import java.util.List;

import com.eci.dto.DeleteDto;
import com.eci.dto.GetAllPartyDto;
import com.eci.dto.LoginDto;
import com.eci.dto.PartyRegistrationDto;

public interface PartyService {
	public PartyRegistrationDto registerParty(PartyRegistrationDto partyDto);
	
	public String loginParty(LoginDto partyDto);
	
	public List<GetAllPartyDto> getAllParty();
	
	public String  deleteParty(DeleteDto party);
}
