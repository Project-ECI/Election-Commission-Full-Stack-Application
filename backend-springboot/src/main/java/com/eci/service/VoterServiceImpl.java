package com.eci.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
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
import com.eci.dto.VoterRegisterationDto;

import com.eci.entity.Candidate;
import com.eci.entity.District;
import com.eci.entity.Party;
import com.eci.entity.UserRole;
import com.eci.entity.Voter;
import com.eci.exception.ApiException;

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
	private PasswordEncoder passwordEncoder;

	@Override
	public String registerVoter(VoterRegisterationDto registerDto) {
		Long districtId = Long.parseLong(registerDto.getDistrictId());

		District districtOpt = districtDao.findById(districtId)
				.orElseThrow(() -> new ApiException("district not found"));

		Optional<Voter> voterOpt = voterDao.findByEmail(registerDto.getEmail());

		if (voterOpt.isEmpty()) {
			Voter voter = new Voter();
			voter.setName(registerDto.getFullName());
			voter.setDob(registerDto.getDob());
			voter.setEmail(registerDto.getEmail());
			if (registerDto.getGender().equals("male")) {
				voter.setGender(true);
			} else
				voter.setGender(false);
			voter.setMobileNo(registerDto.getMobileNo());

			String encryptedPassword = passwordEncoder.encode(registerDto.getPassword());
			voter.setPassword(encryptedPassword);

			voter.setActive(true);
			voter.setRole(UserRole.ROLE_VOTER);
			voter.setDistrictId(districtOpt);
			voterDao.save(voter);
			return "success";
		}
		return "fail";
	}

	@Override
	public Voter getVoterById(Long id) {
		return voterDao.findById(id).orElseThrow(() -> new ApiException("voter not found"));
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

			Voter voterOpt = voterDao.findById(voterId).orElseThrow(() -> new ApiException("district not found"));

			Candidate candidateOpt = candidateDao.findById(candidateId)
					.orElseThrow(() -> new ApiException("district not found"));

			if (voterOpt.isVoted()) {
				throw (new ApiException("already voted"));
			}

			if (voterOpt.getDistrictId().getDistrictId() == candidateOpt.getConstituency().getDistrictId()) {
				voterOpt.setVoted(true);
				candidateOpt.setVotes(candidateOpt.getVotes() + 1);
				voterDao.save(voterOpt);
				candidateDao.save(candidateOpt);
				return "success";
			}
			return "constituency mismatch";

		} catch (NumberFormatException e) {
			// Log the error and return a meaningful message
			System.err.println("Number format exception: " + e.getMessage());
			return "Invalid input format for voter or candidate ID";
		}
	}

	@Override
	public List<KnowYourCandidateDto> knowYourCandidate(String voterid) {
		Long voterId = Long.parseLong(voterid);
		Voter voterOpt = voterDao.findById(voterId).orElseThrow(() -> new ApiException("voter not found"));

		List<Candidate> listOfCandidate = candidateDao.findByConstituency(voterOpt.getDistrictId());

		List<KnowYourCandidateDto> list = new ArrayList<KnowYourCandidateDto>();

		for (Candidate candidate : listOfCandidate) {
			if (!candidate.isRejected()) {
				KnowYourCandidateDto yourCandidate = new KnowYourCandidateDto();
				Voter voterOpt1 = voterDao.findById(candidate.getVoterId().getUserId())
						.orElseThrow(() -> new ApiException("voter not found"));

				yourCandidate.setCandiateName(voterOpt1.getName());
				if (candidate.getPartyId() == null) {
					yourCandidate.setIndependent(candidate.isIndependent());
					yourCandidate.setPartyName(null);
				} else {
					Optional<Party> partyOpt = partyDao.findById(candidate.getPartyId().getUserId());
					yourCandidate.setPartyName(partyOpt.get().getName());
				}
				yourCandidate.setCandidateId(candidate.getUserId());
				list.add(yourCandidate);
			}

			return list;
		}
		return null;
	}

	@Override
	public SearchElectrolRollDto searchVoter(String voterid) {
		Long voterId = Long.parseLong(voterid);
		Voter voterOpt = voterDao.findById(voterId).orElseThrow(() -> new ApiException("voter not found"));

		SearchElectrolRollDto dto = new SearchElectrolRollDto();
		dto.setDistrict(voterOpt.getDistrictId().getDistrictName());
		dto.setFullName(voterOpt.getName());
		dto.setGender(voterOpt.isGender());
		dto.setDob(voterOpt.getDob());
		return dto;
	}

	@Override
	public String voterDelete(String id) {
		Long voterId = Long.parseLong(id);
		Voter voterOpt = voterDao.findById(voterId).orElseThrow(() -> new ApiException("voter not found"));
		;
		if (voterOpt.isActive()) {
			Optional<Candidate> candiateOpt = candidateDao.findByVoterId(voterOpt);
			if (candiateOpt.isPresent()) {
				candiateOpt.get().setActive(false);
				candidateDao.save(candiateOpt.get());
			}
			voterOpt.setActive(false);
			voterDao.save(voterOpt);
			return "success";
		}
		return "voter not found";
	}

	@Override
	public String updateProfile(UpdateVoterDto dto) {
		Long voterId = Long.parseLong(dto.getVoterId());
		Long districtId = Long.parseLong(dto.getDistrictId());

		Voter voterOpt = voterDao.findById(voterId).orElseThrow(() -> new ApiException("voter not found"));

		District districtOpt = districtDao.findById(districtId).orElseThrow(() -> new ApiException("voter not found"));

		Voter voterToBeUpdated = voterOpt;
		voterToBeUpdated.setDistrictId(districtOpt);
		voterToBeUpdated.setEmail(dto.getEmail());
		voterToBeUpdated.setName(dto.getFullName());
		voterToBeUpdated.setMobileNo(dto.getMobileNo());

		voterDao.save(voterToBeUpdated);
		return "success";
	}

	@Override
	public String changePassword(ChangePasswordDto passwordDto) {
		Long voterId = Long.parseLong(passwordDto.getVoterId());
		Voter voterOpt = voterDao.findById(voterId).orElseThrow(() -> new ApiException("voter not found"));

		if (voterOpt.isActive() && passwordEncoder.matches(passwordDto.getOldPassword(), voterOpt.getPassword())) {
			voterOpt.setPassword(passwordDto.getNewPassword());
			String encryptedPassword = passwordEncoder.encode(passwordDto.getNewPassword());
			voterOpt.setPassword(encryptedPassword);
			return "success";
		}
		return "Password Change failed";
	}

	@Override
	public List<KnowYourCandidateDto> knowYourCandidateGlobal(String districtid) {
		Long districtId = Long.parseLong(districtid);
		District districtOpt = districtDao.findById(districtId).orElseThrow(() -> new ApiException("voter not found"));

		List<Candidate> listOfCandidate = candidateDao.findByConstituency(districtOpt);
		List<KnowYourCandidateDto> list = new ArrayList<KnowYourCandidateDto>();
		for (Candidate candidate : listOfCandidate) {
			if (!candidate.isRejected()) {

				KnowYourCandidateDto yourCandidate = new KnowYourCandidateDto();
				Voter voterOpt1 = voterDao.findById(candidate.getVoterId().getUserId())
						.orElseThrow(() -> new ApiException("voter not found"));

				yourCandidate.setCandiateName(voterOpt1.getName());
				if (candidate.getPartyId() == null) {
					yourCandidate.setIndependent(candidate.isIndependent());
					yourCandidate.setPartyName(null);
				} else {
					Party partyOpt = partyDao.findById(candidate.getPartyId().getUserId())
							.orElseThrow(() -> new ApiException("party not found"));

					yourCandidate.setPartyName(partyOpt.getName());
				}
				yourCandidate.setCandidateId(candidate.getUserId());
				list.add(yourCandidate);
			}

		}
		return list;

	}

	@Override
	public List<GetAllVoterForAdmin> getVoterForAdmin() {
		List<Voter> voterList = voterDao.findAll();

		List<GetAllVoterForAdmin> dtoList = new ArrayList<GetAllVoterForAdmin>();

		for (Voter voter : voterList) {
			if (voter.isActive()) {
				GetAllVoterForAdmin dto = new GetAllVoterForAdmin();
				dto.setEmail(voter.getEmail());
				dto.setFullName(voter.getName());
				dto.setMobileNo(voter.getMobileNo());
				dto.setVoterId(voter.getUserId().toString());
				dtoList.add(dto);
			}
		}
		return dtoList;
	}
}
