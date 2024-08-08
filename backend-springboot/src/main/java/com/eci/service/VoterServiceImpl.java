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
import com.eci.dao.VoterDao;

import com.eci.dto.SearchElectrolRollDto;
import com.eci.dto.VoteDto;
import com.eci.dto.DeleteDto;
import com.eci.dto.KnowYourCandidateDto;
import com.eci.dto.LoginDto;
import com.eci.dto.VoterRegisterationDto;

import com.eci.entity.Candidate;
import com.eci.entity.Party;
import com.eci.entity.Voter;

@Service
@Transactional
public class VoterServiceImpl implements VoterService {
	@Autowired
	private VoterDao voterDao;

	@Autowired
	private CandidateDao candidateDao;

	@Autowired
	private PartyDao partyDao;

	@Autowired
	private ModelMapper mapper;

	@Override
	public VoterRegisterationDto registerVoter(VoterRegisterationDto registerDto) {
		Voter voter = mapper.map(registerDto, Voter.class);
		voter.setActive(true);
		Voter savedVoter = voterDao.save(voter);

		return mapper.map(savedVoter, VoterRegisterationDto.class);
	}

	@Override
	public String loginVoter(LoginDto voterLoginDto) {
		Voter voter = mapper.map(voterLoginDto, Voter.class);
		Optional<Voter> voter2 = voterDao.findByEmail(voter.getEmail());

		if (voter2.isPresent() && voter.getPassword().equals(voter2.get().getPassword()) && voter2.get().isActive()==true) {
			return "Login Successfull";
		}
		return "Login Fail";
	}

	@Override
	public Optional<Voter> getVoterById(Long id) {
		return voterDao.findById(id);
	}

	@Override
	public String vote(VoteDto voteDto) {
		Optional<Voter> voterOpt = voterDao.findById(voteDto.getVoterId());
		Optional<Candidate> candidateOpt = candidateDao.findById(voteDto.getCandidateId());

		if (voterOpt.isPresent() && candidateOpt.isPresent()) {
			Voter voter = voterOpt.get();
			Candidate candidate = candidateOpt.get();

			if (voter.getDistrictId() == candidate.getConstituency()) {
				voter.setVoted(true);
				candidate.setVotes(candidate.getVotes() + 1);
				voterDao.save(voter);
				candidateDao.save(candidate);
				return "success";
			}
			return "constituency mismatch";
		}
		return "candidate/voter not found";
	}

	@Override
	public List<KnowYourCandidateDto> knowYourCandidate(Long voterId) {
		Optional<Voter> voter = voterDao.findById(voterId);
		if (voter.isPresent()) {
			List<Candidate> listOfCandidate = candidateDao.findByConstituency(voter.get().getDistrictId());
			List<KnowYourCandidateDto> list = new ArrayList<KnowYourCandidateDto>();
			for (Candidate candidate : listOfCandidate) {
				KnowYourCandidateDto yourCandidate = new KnowYourCandidateDto();
				Optional<Voter> voter2 = voterDao.findById(candidate.getVoterId().getVoterId());
				yourCandidate.setCandiateName(voter2.get().getFullName());
				Optional<Party> partyOpt = partyDao.findById(candidate.getParty().getPartyId());
				yourCandidate.setPartyName(partyOpt.get().getPartyName());
				yourCandidate.setIndependent(candidate.isIndependent());
				list.add(yourCandidate);
				return list;
			}
		}
		return null;
	}

	@Override
	public SearchElectrolRollDto searchVoter(Long voterId) {
		Optional<Voter> voter = voterDao.findById(voterId);
		if (voter.isPresent()) {
			return mapper.map(voter.get(), SearchElectrolRollDto.class);
		}
		return null;
	}

	@Override
	public String voterDelete(DeleteDto voter1) {
		Optional<Voter> voter = voterDao.findById(voter1.getId());
		if (voter.isPresent() && voter.get().isActive() == true) {
			voter.get().setActive(false);
			voterDao.save(voter.get());
			return "voter Deleted Successfully";
		}
		return "voter not found";
	}
}
