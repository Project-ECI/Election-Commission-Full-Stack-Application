package com.eci.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eci.dao.CandidateDao;
import com.eci.dao.DistrictDao;
import com.eci.dao.ElectionDao;
import com.eci.dao.PartyDao;
import com.eci.dao.VoterDao;
import com.eci.dto.ElectionDateDto;
import com.eci.dto.ElectionResultDto;
import com.eci.entity.Candidate;
import com.eci.entity.District;
import com.eci.entity.Election;
import com.eci.entity.Party;
import com.eci.entity.Voter;

@Service
@Transactional
public class ElectionServiceImpl implements ElectionService {
	@Autowired
	private ElectionDao electionDao;

	@Autowired
	private DistrictDao districtDao;

	@Autowired
	private CandidateDao candidateDao;

	@Autowired
	private VoterDao voterDao;

	@Autowired
	private PartyDao partyDao;

	@Autowired
	private ModelMapper mapper;

	@Override
	public String addElectionDate(ElectionDateDto dto) {
		Optional<District> district = districtDao.findById(dto.getDistrictId());

		// if districtId is valid
		if (district.isPresent()) {
			Optional<Election> election = electionDao.findByDistrictId(district.get());

			// update election date
			if (election.isPresent()) {
				election.get().setElectionDate(dto.getElectionDate());
				election.get().setDistrictId(district.get());
				electionDao.save(election.get());
				return election.toString();
			}
			// add new election date
			else {
				Election election1 = mapper.map(dto, Election.class);
				election1.setDistrictId(district.get());
				electionDao.save(election1);
				return election1.toString();
			}
		}
		return "Invalid District";

	}

	@Override
	public List<ElectionResultDto> getResult() {
		List<Candidate> listOfCandidate = candidateDao.findAll();
		List<ElectionResultDto> list = new ArrayList<ElectionResultDto>();

		for (Candidate candidate : listOfCandidate) {
			ElectionResultDto dto = new ElectionResultDto();
			if (candidate.getParty() != null) {
				Optional<Party> party = partyDao.findById(candidate.getParty().getPartyId());
				dto.setPartyName(party.get().getPartyName());
				dto.setIndependent(false);
			} else {
				dto.setIndependent(true);
				dto.setPartyName(null);
			}
			Optional<Voter> voter = voterDao.findById(candidate.getVoterId().getVoterId());
			dto.setCandiateName(voter.get().getFullName());
			dto.setVotes(candidate.getVotes());
			dto.setDistrictName(candidate.getConstituency().getDistrictName());
			list.add(dto);
		}
		return list;
	}

	@Override
	public List<ElectionResultDto> getResultConstituency(Long voterId) {
		Optional<Voter> voter = voterDao.findById(voterId);
		List<Candidate> listOfCandidate = candidateDao.findByConstituency(voter.get().getDistrictId());
		List<ElectionResultDto> list = new ArrayList<ElectionResultDto>();

		for (Candidate candidate : listOfCandidate) {
			ElectionResultDto dto = new ElectionResultDto();
			if (candidate.getParty() != null) {
				Optional<Party> party = partyDao.findById(candidate.getParty().getPartyId());
				dto.setPartyName(party.get().getPartyName());
				dto.setIndependent(false);
			} else {
				dto.setIndependent(true);
				dto.setPartyName(null);
			}
			Optional<Voter> voter1 = voterDao.findById(candidate.getVoterId().getVoterId());
			dto.setCandiateName(voter1.get().getFullName());
			dto.setVotes(candidate.getVotes());
			dto.setDistrictName(candidate.getConstituency().getDistrictName());
			list.add(dto);
		}
		return list;
	}

	@Override
	public List<ElectionDateDto> getElectionDate() {
		List<Election> allElection = electionDao.findAll();
		List<ElectionDateDto> list = new ArrayList<ElectionDateDto>();
		for (Election election : allElection) {
			ElectionDateDto dto = new ElectionDateDto();
			dto.setDistrictId(election.getDistrictId().getDistrictId());
			dto.setElectionDate(election.getElectionDate());
			list.add(dto);
		}
		return list;
	}

	@Override
	public ElectionDateDto getConstituencyElection(Long voterId) {
		Optional<Voter> voter = voterDao.findById(voterId);
		System.out.println(voter.get());
		Optional<Election> election = electionDao.findByDistrictId(voter.get().getDistrictId());
		System.out.println(election.get());
		ElectionDateDto dto = new ElectionDateDto();
		dto.setDistrictId(election.get().getDistrictId().getDistrictId());
		dto.setElectionDate(election.get().getElectionDate());
		return dto;
	}
}
