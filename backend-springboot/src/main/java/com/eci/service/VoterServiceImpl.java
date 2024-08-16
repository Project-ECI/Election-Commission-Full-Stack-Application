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
import com.eci.dto.GetAllVoterForAdmin;
import com.eci.dto.KnowYourCandidateDto;
import com.eci.dto.LoginDto;
import com.eci.dto.VoterRegisterationDto;

import com.eci.entity.Candidate;
import com.eci.entity.District;
import com.eci.entity.Party;
import com.eci.entity.Voter;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

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
	private ObjectMapper objectMapper;

	@Autowired
	private ModelMapper mapper;

	@Override
	public String registerVoter(VoterRegisterationDto registerDto) {
		Long districtId=Long.parseLong(registerDto.getDistrictId());
		
		Optional<District> districtOpt = districtDao.findById(districtId);
		Optional<Voter> voterOpt = voterDao.findByEmail(registerDto.getEmail());
		if (voterOpt.isEmpty()) {
			Voter voter = new Voter();
			voter.setFullName(registerDto.getFullName());
			voter.setDob(registerDto.getDob());
			voter.setEmail(registerDto.getEmail());
			if (registerDto.getGender().equals("male")) {
				voter.setGender(true);
			}else
				voter.setGender(false);
			voter.setMobileNo(registerDto.getMobileNo());
			voter.setPassword(registerDto.getPassword());
			voter.setActive(true);
			voter.setDistrictId(districtOpt.get());
			voterDao.save(voter);
			return "success";
		}
		return "fail";
	}

	@Override
	public String loginVoter(LoginDto voterLoginDto) {
		Voter voter = mapper.map(voterLoginDto, Voter.class);
		Optional<Voter> voterOpt = voterDao.findByEmail(voter.getEmail());

		if (voterOpt.isPresent() && voter.getPassword().equals(voterOpt.get().getPassword())
				&& voterOpt.get().isActive() == true) {
			try {
				return objectMapper.writeValueAsString(voterOpt.get());
			} catch (JsonProcessingException e) {
				return "success";
			}
		}
		return "fail";
	}

	@Override
	public Optional<Voter> getVoterById(Long id) {
		return voterDao.findById(id);
	}

	@Override
	public String vote(VoteDto voteDto) {
		try {
			// Check if the IDs are not null or empty
			if (voteDto.getVoterId() == null || voteDto.getVoterId().isEmpty()) {
				return "Invalid Voter ID";
			}
			if (voteDto.getCandidateId() == null || voteDto.getCandidateId().isEmpty()) {
				return "Invalid Candidate ID";
			}

			Long voterId = Long.parseLong(voteDto.getVoterId());
			Long candidateId = Long.parseLong(voteDto.getCandidateId());

			Optional<Voter> voterOpt = voterDao.findById(voterId);
			Optional<Candidate> candidateOpt = candidateDao.findById(candidateId);

			// if the voter and candidate exists
			if (voterOpt.isPresent() && candidateOpt.isPresent()) {
				Voter voter = voterOpt.get();
				Candidate candidate = candidateOpt.get();
				Long districtId = voter.getDistrictId().getDistrictId();

				// can't vote if results are declared or voter has already voted
//				if (electionService.isResultDeclared(districtId) || voter.isVoted()) {
				if (voter.isVoted()) {
					return "Can't vote: you have already voted";
				}
				System.out.println("//////////////");
				// can vote if it's election date and constituency matches
				// if (voter.getDistrictId().equals(candidate.getConstituency()) &&
				// electionService.isElectionDate(districtId))
				if (voter.getDistrictId().getDistrictId() == candidate.getConstituency().getDistrictId()) {
					System.out.println("********************");
					voter.setVoted(true);
					candidate.setVotes(candidate.getVotes() + 1);
					voterDao.save(voter);
					candidateDao.save(candidate);
					return "success";
				}
				return "constituency mismatch";
			}
			return "voter/candidate doesn't exist";
		} catch (NumberFormatException e) {
			// Log the error and return a meaningful message
			System.err.println("Number format exception: " + e.getMessage());
			return "Invalid input format for voter or candidate ID";
		}
	}

	@Override
	public List<KnowYourCandidateDto> knowYourCandidate(String voterid) {
		Long voterId = Long.parseLong(voterid);
		Optional<Voter> voterOpt = voterDao.findById(voterId);
		// if
		// (voterOpt.isPresent()&&electionService.isElectionDate(voterOpt.get().getDistrictId().getDistrictId()))
		if (voterOpt.isPresent()) {
			List<Candidate> listOfCandidate = candidateDao.findByConstituency(voterOpt.get().getDistrictId());
			List<KnowYourCandidateDto> list = new ArrayList<KnowYourCandidateDto>();
			for (Candidate candidate : listOfCandidate) {
				if (!candidate.isRejected()) {
					KnowYourCandidateDto yourCandidate = new KnowYourCandidateDto();
					Optional<Voter> voterOpt1 = voterDao.findById(candidate.getVoterId().getVoterId());
					yourCandidate.setCandiateName(voterOpt1.get().getFullName());
					if (candidate.getParty() == null) {
						yourCandidate.setIndependent(candidate.isIndependent());
						yourCandidate.setPartyName(null);
					} else {
						Optional<Party> partyOpt = partyDao.findById(candidate.getParty().getPartyId());
						yourCandidate.setPartyName(partyOpt.get().getPartyName());
					}
					yourCandidate.setCandidateId(candidate.getCandidateId());
					list.add(yourCandidate);
				}

			}
			return list;
		}
		return null;
	}

	@Override
	public SearchElectrolRollDto searchVoter(String voterid) {
		System.out.println("************");
		Long voterId = Long.parseLong(voterid);
		Optional<Voter> voterOpt = voterDao.findById(voterId);
		if (voterOpt.isPresent()) {
			SearchElectrolRollDto dto = new SearchElectrolRollDto();
			dto.setDistrict(voterOpt.get().getDistrictId().getDistrictName());
			dto.setFullName(voterOpt.get().getFullName());
			dto.setGender(voterOpt.get().isGender());
			dto.setDob(voterOpt.get().getDob());
			return dto;
		}
		return null;
	}

	@Override
	public String voterDelete(String id) {
		Long voterId = Long.parseLong(id);
		Optional<Voter> voterOpt = voterDao.findById(voterId);
		if (voterOpt.isPresent() && voterOpt.get().isActive() == true) {
			Optional<Candidate> candiateOpt = candidateDao.findByVoterId(voterOpt.get());
			if (candiateOpt.isPresent()) {
				candiateOpt.get().setActive(false);
				candidateDao.save(candiateOpt.get());
			}
			voterOpt.get().setActive(false);
			voterDao.save(voterOpt.get());
			return "success";
		}
		return "voter not found";
	}

	@Override
	public String updateProfile(UpdateVoterDto dto) {
		Long voterId = Long.parseLong(dto.getVoterId());
		Long districtId=Long.parseLong(dto.getDistrictId());
		
		Optional<Voter> voterOpt = voterDao.findById(voterId);

		if (voterOpt.isPresent()) {
			Voter voterToBeUpdated = voterOpt.get();
			
			Optional<District> districtOpt = districtDao.findById(districtId);

			voterToBeUpdated.setDistrictId(districtOpt.get());
			voterToBeUpdated.setEmail(dto.getEmail());
			voterToBeUpdated.setFullName(dto.getFullName());
			voterToBeUpdated.setMobileNo(dto.getMobileNo());

			voterDao.save(voterToBeUpdated);
			return "success";
		}
		return "fail";
	}

	@Override
	public String changePassword(ChangePasswordDto passwordDto) {
		Long voterId = Long.parseLong(passwordDto.getVoterId());
		Optional<Voter> voterOpt = voterDao.findById(voterId);
		if (voterOpt.isPresent() && voterOpt.get().getPassword().equals(passwordDto.getOldPassword())) {
			voterOpt.get().setPassword(passwordDto.getNewPassword());
			voterDao.save(voterOpt.get());
			return "success";
		}
		return "Password Change failed";
	}

	@Override
	public List<KnowYourCandidateDto> knowYourCandidateGlobal(String districtid) {
		Long districtId = Long.parseLong(districtid);
		Optional<District> districtOpt = districtDao.findById(districtId);
		if (districtOpt.isPresent()) {
			List<Candidate> listOfCandidate = candidateDao.findByConstituency(districtOpt.get());
			List<KnowYourCandidateDto> list = new ArrayList<KnowYourCandidateDto>();
			for (Candidate candidate : listOfCandidate) {
				if (!candidate.isRejected()) {
					KnowYourCandidateDto yourCandidate = new KnowYourCandidateDto();
					Optional<Voter> voterOpt1 = voterDao.findById(candidate.getVoterId().getVoterId());
					yourCandidate.setCandiateName(voterOpt1.get().getFullName());
					if (candidate.getParty() == null) {
						yourCandidate.setIndependent(candidate.isIndependent());
						yourCandidate.setPartyName(null);
					} else {
						Optional<Party> partyOpt = partyDao.findById(candidate.getParty().getPartyId());
						yourCandidate.setPartyName(partyOpt.get().getPartyName());
					}
					yourCandidate.setCandidateId(candidate.getCandidateId());
					list.add(yourCandidate);
				}

			}
			return list;
		}
		return null;
	}

	@Override
	public List<GetAllVoterForAdmin> getVoterForAdmin() {
		List<Voter> voterList = voterDao.findAll();

		List<GetAllVoterForAdmin> dtoList = new ArrayList<GetAllVoterForAdmin>();

		for (Voter voter : voterList) {
			if (voter.isActive()) {
				GetAllVoterForAdmin dto = new GetAllVoterForAdmin();
				dto.setEmail(voter.getEmail());
				dto.setFullName(voter.getFullName());
				dto.setMobileNo(voter.getMobileNo());
				dto.setVoterId(voter.getVoterId().toString());
				dtoList.add(dto);
			}
		}
		return dtoList;
	}
}
