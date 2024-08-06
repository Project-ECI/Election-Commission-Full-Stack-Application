package com.eci.service;

import com.eci.dto.PartyLoginDto;
import com.eci.dto.PartyRegistrationDto;

public interface PartyService {
	public PartyRegistrationDto registerParty(PartyRegistrationDto partyDto);
	
	public String loginParty(PartyLoginDto partyDto);
}
