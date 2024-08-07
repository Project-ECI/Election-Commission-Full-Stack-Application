package com.eci.service;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eci.dao.CandidateDao;
import com.eci.dao.DistrictDao;
import com.eci.dao.PartyDao;
import com.eci.dao.VoterDao;

import com.eci.dto.LoginDto;
import com.eci.dto.CandidateNominationDto;
import com.eci.dto.CandidateRegistrationDto;

import com.eci.entity.Candidate;
import com.eci.entity.District;
import com.eci.entity.Party;
import com.eci.entity.Voter;

@Service
@Transactional
public class CandidateServiceImpl implements CandidateService {
	@Autowired
	private CandidateDao candidateDao;

	@Autowired
	private ModelMapper mapper;

	@Autowired
	private DistrictDao districtDao;

	@Autowired
	private VoterDao voterDao;

	@Autowired
	private PartyDao partyDao;

	@Override
	public CandidateRegistrationDto registerCandidate(CandidateRegistrationDto candidateRegisterDto) {
		Optional<Voter> voter = voterDao.findById(candidateRegisterDto.getVoterId());
		if (voter.isPresent() && voter.get().getPassword().equals(candidateRegisterDto.getPassword())) {
			Candidate validCandidate = new Candidate();
			validCandidate.setVoterId(voter.get());
			Candidate savedCandidate = candidateDao.save(validCandidate);

			mapper.typeMap(Candidate.class, CandidateRegistrationDto.class).addMappings(
					mapper -> mapper.map(src -> src.getVoterId().getVoterId(), CandidateRegistrationDto::setVoterId));
			return mapper.map(savedCandidate, CandidateRegistrationDto.class);
		}
		return null;
	}

	public CandidateNominationDto nominateCandidate(CandidateNominationDto dto) {
		Optional<Candidate> candidate = candidateDao.findById(dto.getCandidateId());
		if (candidate.isPresent()) {
			Optional<Party> partyOpt = partyDao.findById(dto.getParty().getPartyId());
			Optional<District> districtOpt = districtDao.findById(dto.getConstituency().getDistrictId());

			District constituency = districtOpt.get();

			CandidateNominationDto candidateNominationDto = new CandidateNominationDto();
			candidateNominationDto.setConstituency(constituency);

			if (partyOpt.isPresent()) {
				Party party = partyOpt.get();
				candidateNominationDto.setParty(party);
				candidateNominationDto.setIndependent(false);
			} else {
				candidateNominationDto.setParty(null);
				candidateNominationDto.setIndependent(true);
			}

			Candidate candidate1 = new Candidate();
			candidate1.setVoterId(candidate.get().getVoterId());
			candidate1.setCandidateId(dto.getCandidateId());
			candidate1.setConstituency(constituency);
			candidate1.setParty(candidateNominationDto.getParty());
			candidate1.setIndependent(candidateNominationDto.isIndependent());

			candidateDao.save(candidate1);

			return candidateNominationDto;
		}
		return null;
	}

	@Override
	public String loginCandidate(LoginDto candidLoginDto) {
		Voter voter = mapper.map(candidLoginDto, Voter.class);
		Voter voter2 = voterDao.findByEmail(voter.getEmail());

		if (voter2 != null && voter.getPassword().equals(voter2.getPassword())) {
			return "Login Successfull";
		}
		return "Login Fail";
	}

	@Override
	public Optional<Candidate> getCandidateById(Long id) {
		return candidateDao.findById(id);
	}
}
