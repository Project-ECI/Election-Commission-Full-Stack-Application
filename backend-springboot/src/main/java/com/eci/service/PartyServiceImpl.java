package com.eci.service;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eci.dao.PartyDao;

import com.eci.dto.GetAllPartyDto;
import com.eci.dto.LoginDto;
import com.eci.dto.PartyRegistrationDto;

import com.eci.entity.Party;

@Service
@Transactional
public class PartyServiceImpl implements PartyService {
	@Autowired
	private PartyDao partyDao;

	@Autowired
	private ModelMapper mapper;

	@Override
	public PartyRegistrationDto registerParty(PartyRegistrationDto partyDto) {
		Party party = mapper.map(partyDto, Party.class);
		Party savedParty = partyDao.save(party);

		return mapper.map(savedParty, PartyRegistrationDto.class);
	}

	@Override
	public String loginParty(LoginDto partyDto) {
		Party party = mapper.map(partyDto, Party.class);
		Party party2 = partyDao.findByEmail(party.getEmail());

		if (party2 != null && party.getPassword().equals(party2.getPassword()))
			return "success";
		return "fail";
	}

	@Override
	public List<GetAllPartyDto> getAllParty() {
		List<Party> allParty = partyDao.findAll();

		List<GetAllPartyDto> allPartyDtos = new ArrayList<>();

		for (Party party : allParty) {
			GetAllPartyDto partyDto = mapper.map(party, GetAllPartyDto.class);
			allPartyDtos.add(partyDto);
		}
		return allPartyDtos;
	}
}
