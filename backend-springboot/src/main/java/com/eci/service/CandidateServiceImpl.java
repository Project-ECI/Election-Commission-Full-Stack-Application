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
import com.eci.dto.DeleteDto;
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
		Optional<Voter> voterOpt = voterDao.findById(candidateRegisterDto.getVoterId());

		if (voterOpt.isPresent() && voterOpt.get().isActive() == true) {
			if (voterOpt.get().getPassword().equals(candidateRegisterDto.getPassword())) {
				Optional<Candidate> candidateOpt = candidateDao.findByVoterId(voterOpt.get());
				if (candidateOpt.isEmpty()) {
					Candidate validCandidate = new Candidate();
					validCandidate.setActive(true);
					validCandidate.setVoterId(voterOpt.get());
					Candidate savedCandidate = candidateDao.save(validCandidate);

					mapper.typeMap(Candidate.class, CandidateRegistrationDto.class).addMappings(mapper -> mapper
							.map(src -> src.getVoterId().getVoterId(), CandidateRegistrationDto::setVoterId));
					return mapper.map(savedCandidate, CandidateRegistrationDto.class);
				}
			}
		}
		return null;
	}

	@Override
	public String loginCandidate(LoginDto candidLoginDto) {
		Optional<Voter> voterOpt = voterDao.findByEmail(candidLoginDto.getEmail());
		Optional<Candidate> candidateOpt = candidateDao.findByVoterId(voterOpt.get());
		if (voterOpt.isPresent() && candidateOpt.isPresent()) {
			if (voterOpt.get().getPassword().equals(candidLoginDto.getPassword()) && candidateOpt.get().isActive() == true) {
				return "Login Successfull";
			}
		}
		return "Login Fail";
	}

	public CandidateNominationDto nominateCandidate(CandidateNominationDto dto) {
		Optional<Candidate> candidateOpt = candidateDao.findById(dto.getCandidateId());
		if (candidateOpt.isPresent()) {
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
			candidate1.setVoterId(candidateOpt.get().getVoterId());
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
	public Optional<Candidate> getCandidateById(Long id) {
		return candidateDao.findById(id);
	}

	@Override
	public String candidateDelete(DeleteDto candidate) {
		Optional<Candidate> candidateOpt = candidateDao.findById(candidate.getId());
		System.out.println(candidateOpt.get());
		if (candidateOpt.isPresent() && candidateOpt.get().isActive() == true) {
			candidateOpt.get().setActive(false);
			candidateDao.save(candidateOpt.get());
			return "Candidate Deleted Successfully";
		}
		return "Candidate not found";
	}
}
