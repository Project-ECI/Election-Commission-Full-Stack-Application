package com.eci.service;

import java.util.List;

import com.eci.dto.GetAllPartyDto;
import com.eci.dto.PartyLoginDto;
import com.eci.dto.PartyRegistrationDto;

public interface PartyService {
	public PartyRegistrationDto registerParty(PartyRegistrationDto partyDto);
	
	public String loginParty(PartyLoginDto partyDto);
	
	public List<GetAllPartyDto> getAllParty();
}
