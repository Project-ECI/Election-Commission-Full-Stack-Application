package com.eci.service;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eci.dao.CandidateDao;
import com.eci.dao.VoterDao;
import com.eci.dto.VoteDto;
import com.eci.dto.VoterLoginDto;
import com.eci.dto.VoterRegisterDto;
import com.eci.entity.Candidate;
import com.eci.entity.Voter;

@Service
@Transactional
public class VoterServiceImpl implements VoterService {
	@Autowired
	private VoterDao voterDao;

	@Autowired
	private CandidateDao candidateDao;

	@Autowired
	private ModelMapper mapper;

	@Override
	public VoterRegisterDto registerVoter(VoterRegisterDto registerDto) {
		Voter voter = mapper.map(registerDto, Voter.class);
		Voter savedVoter = voterDao.save(voter);

		return mapper.map(savedVoter, VoterRegisterDto.class);
	}

	@Override
	public String loginVoter(VoterLoginDto voterLoginDto) {
		Voter voter = mapper.map(voterLoginDto, Voter.class);
		Voter voter2 = voterDao.findByEmail(voter.getEmail());

		if (voter2 != null && voter.getPassword().equals(voter2.getPassword())) {
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

}
