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
import com.eci.dao.PartyDao;
import com.eci.dao.VoterDao;

import com.eci.dto.SearchElectrolRollDto;
import com.eci.dto.UpdateVoterDto;
import com.eci.dto.VoteDto;
import com.eci.dto.ChangePasswordDto;
import com.eci.dto.DeleteDto;
import com.eci.dto.KnowYourCandidateDto;
import com.eci.dto.LoginDto;
import com.eci.dto.VoterRegisterationDto;

import com.eci.entity.Candidate;
import com.eci.entity.District;
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
	private DistrictDao districtDao;

	@Autowired
	private ElectionService electionService;

	@Autowired
	private ModelMapper mapper;

	@Override
	public String registerVoter(VoterRegisterationDto registerDto) {
		Optional<District> districtOpt = districtDao.findById(registerDto.getDistrictId());
		Optional<Voter> voterOpt = voterDao.findByEmail(registerDto.getEmail());
		if (voterOpt.isEmpty()) {
			Voter voter = new Voter();
			voter.setFullName(registerDto.getFullName());
			voter.setDob(registerDto.getDob());
			voter.setEmail(registerDto.getEmail());
			voter.setGender(registerDto.isGender());
			voter.setMobileNo(registerDto.getMobileNo());
			voter.setPassword(registerDto.getPassword());
			voter.setActive(true);
			voter.setDistrictId(districtOpt.get());
			Voter savedVoter = voterDao.save(voter);
			return "Registration Successfull " + savedVoter.toString();
		}
		return "Registration Fail";
	}

	@Override
	public String loginVoter(LoginDto voterLoginDto) {
		Voter voter = mapper.map(voterLoginDto, Voter.class);
		Optional<Voter> voterOpt = voterDao.findByEmail(voter.getEmail());

		if (voterOpt.isPresent() && voter.getPassword().equals(voterOpt.get().getPassword())
				&& voterOpt.get().isActive() == true) {
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

		// if the voter and candidate exists
		if (voterOpt.isPresent() && candidateOpt.isPresent()) {
			Voter voter = voterOpt.get();
			Candidate candidate = candidateOpt.get();
			Long districtId = voter.getDistrictId().getDistrictId();

			// can't vote if results are declared or voter has already voted
			if (electionService.isResultDeclared(districtId) || voter.isVoted()) {
				return "Can't vote: Either results are declared or you have already voted";
			}

			// can vote if it's election date and constituency matches
			if (voter.getDistrictId() == candidate.getConstituency() && electionService.isElectionDate(districtId)) {
				voter.setVoted(true);
				candidate.setVotes(candidate.getVotes() + 1);
				voterDao.save(voter);
				candidateDao.save(candidate);
				return "success";
			}
			return "constituency mismatch";
		}
		return "voter/candidate doesn't exist";
	}

	@Override
	public List<KnowYourCandidateDto> knowYourCandidate(Long voterId) {
		Optional<Voter> voterOpt = voterDao.findById(voterId);
		if (voterOpt.isPresent()) {
			List<Candidate> listOfCandidate = candidateDao.findByConstituency(voterOpt.get().getDistrictId());
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
		Optional<Voter> voterOpt = voterDao.findById(voterId);
		if (voterOpt.isPresent()) {
			return mapper.map(voterOpt.get(), SearchElectrolRollDto.class);
		}
		return null;
	}

	@Override
	public String voterDelete(DeleteDto voter1) {
		Optional<Voter> voterOpt = voterDao.findById(voter1.getId());
		if (voterOpt.isPresent() && voterOpt.get().isActive() == true) {
			Optional<Candidate> candiateOpt = candidateDao.findByVoterId(voterOpt.get());
			if (candiateOpt.isPresent()) {
				candiateOpt.get().setActive(false);
				candidateDao.save(candiateOpt.get());
			}
			voterOpt.get().setActive(false);
			voterDao.save(voterOpt.get());
			return "voter Deleted Successfully";
		}
		return "voter not found";
	}

	@Override
	public String updateProfile(UpdateVoterDto dto) {
		Optional<Voter> voterOpt = voterDao.findById(dto.getVoterId());

		if (voterOpt.isPresent()) {
			Voter voterToBeUpdated = voterOpt.get();
			Optional<District> districtOpt = districtDao.findById(dto.getDistrictId());

			voterToBeUpdated.setDistrictId(districtOpt.get());
			voterToBeUpdated.setEmail(dto.getEmail());
			voterToBeUpdated.setFullName(dto.getFullName());
			voterToBeUpdated.setMobileNo(dto.getMobileNo());

			voterDao.save(voterToBeUpdated);
			return "Voter details updated";
		}
		return "No such voter exists";
	}

	@Override
	public String changePassword(ChangePasswordDto passwordDto) {
		Optional<Voter> voterOpt = voterDao.findByEmail(passwordDto.getEmail());
		if (voterOpt.isPresent() && voterOpt.get().getPassword().equals(passwordDto.getOldPassword())) {
			voterOpt.get().setPassword(passwordDto.getNewPassword());
			voterDao.save(voterOpt.get());
			return "Password Change Successfully";
		}
		return "Password Change failed";
	}
}
