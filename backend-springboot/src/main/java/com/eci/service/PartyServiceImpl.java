package com.eci.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eci.dao.CandidateDao;
import com.eci.dao.PartyDao;
import com.eci.dto.DeleteDto;
import com.eci.dto.GetAllPartyDto;
import com.eci.dto.LoginDto;
import com.eci.dto.PartyRegistrationDto;
import com.eci.entity.Candidate;
import com.eci.entity.Party;

@Service
@Transactional
public class PartyServiceImpl implements PartyService {
	@Autowired
	private PartyDao partyDao;

	@Autowired
	private CandidateDao candidateDao;

	
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
		List<Party> partyList = partyDao.findAll();

		List<GetAllPartyDto> partyDtoList = new ArrayList<>();

		for (Party party : partyList) {
			GetAllPartyDto partyDto = mapper.map(party, GetAllPartyDto.class);
			partyDtoList.add(partyDto);
		}
		return partyDtoList;
	}

	@Override
	public String deleteParty(DeleteDto party) {
	Optional<Party> partyOpt = partyDao.findById(party.getId());
		if (partyOpt.isPresent() && partyOpt.get().isActive() == true) {
			List<Candidate> candiateList = candidateDao.findAllByParty(partyOpt.get());
			for(Candidate candidate:candiateList) {
				candidate.setActive(false);
				candidateDao.save(candidate);
			}
			partyOpt.get().setActive(false);
			partyDao.save(partyOpt.get());
			return "Party Deleted Successfully";
		}
		return "Party not found";
	}
}
