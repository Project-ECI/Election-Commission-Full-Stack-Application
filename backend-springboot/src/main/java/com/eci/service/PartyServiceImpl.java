package com.eci.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eci.dao.DistrictDao;
import com.eci.dao.PartyDao;
import com.eci.dto.DeleteDto;
import com.eci.dto.GetAllPartyDto;
import com.eci.dto.LoginDto;
import com.eci.dto.PartyRegistrationDto;
import com.eci.dto.UpdatePartyDto;
import com.eci.entity.District;
import com.eci.entity.Party;

@Service
@Transactional
public class PartyServiceImpl implements PartyService {
	@Autowired
	private PartyDao partyDao;
	
	@Autowired
	private DistrictDao districtDao;

	@Autowired
	private ModelMapper mapper;

	@Override
	public PartyRegistrationDto registerParty(PartyRegistrationDto partyDto) {
		Party party = mapper.map(partyDto, Party.class);
		party.setActive(true);
		Party savedParty = partyDao.save(party);

		return mapper.map(savedParty, PartyRegistrationDto.class);
	}

	@Override
	public String loginParty(LoginDto partyDto) {
		Party party = mapper.map(partyDto, Party.class);
		Party party2 = partyDao.findByEmail(party.getEmail());

		if (party2 != null && party.getPassword().equals(party2.getPassword())&&party2.isActive()==true)
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

	@Override
	public String deleteParty(DeleteDto party) {
	Optional<Party> party1 = partyDao.findById(party.getId());
		if (party1.isPresent() && party1.get().isActive() == true) {
			party1.get().setActive(false);
			partyDao.save(party1.get());
			return "Party Deleted Successfully";
		}
		return "Party not found";
	}

	@Override
	public String updateProfile(UpdatePartyDto dto) {
		Optional<Party> partyOpt = partyDao.findById(dto.getPartyId());
		
		if(partyOpt.isPresent()) {
			Party partyToBeUpdated = partyOpt.get();
			Optional<District> districtOpt = districtDao.findById(dto.getDistrictId());
			
			partyToBeUpdated.setDistrictId(districtOpt.get());
			partyToBeUpdated.setEmail(dto.getEmail());
			partyToBeUpdated.setObjective(dto.getObjective());
			partyToBeUpdated.setPartyName(dto.getPartyName());

			partyDao.save(partyToBeUpdated);
			return "Party details updated";
		}
		return "Party doesn't exist";
	}
}
