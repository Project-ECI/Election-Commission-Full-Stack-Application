package com.eci.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eci.dao.CandidateDao;
import com.eci.dao.DistrictDao;
import com.eci.dao.PartyDao;
import com.eci.dao.VoterDao;
import com.eci.dto.CandidateAcceptDto;
import com.eci.dto.ChangePasswordPartyDto;
import com.eci.dto.GetAllPartyDto;
import com.eci.dto.GetAllpartyForAdmin;
import com.eci.dto.LoginDto;
import com.eci.dto.PartyCandidateRequestDto;
import com.eci.dto.PartyCandidateResponseDto;
import com.eci.dto.PartyRegistrationDto;
import com.eci.entity.Candidate;
import com.eci.dto.UpdatePartyDto;
import com.eci.entity.District;
import com.eci.entity.Party;
import com.eci.entity.UserRole;
import com.eci.entity.Voter;
import com.eci.exception.ApiException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
@Transactional
public class PartyServiceImpl implements PartyService {
	@Autowired
	private PartyDao partyDao;

	@Autowired
	private DistrictDao districtDao;

	@Autowired
	private CandidateDao candidateDao;

	@Autowired
	private VoterDao voterDao;

	@Autowired
	private ModelMapper mapper;

	@Autowired
	private ObjectMapper objectMapper;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public String registerParty(PartyRegistrationDto partyDto) {
		Optional<Party> partyOpt = partyDao.findByEmail(partyDto.getEmail());
		if (partyOpt.isEmpty()) {
			Party party = new Party();
			party.setActive(true);
			party.setName(partyDto.getPartyName());
			party.setEmail(partyDto.getEmail());

			party.setObjective(partyDto.getObjective());
			Optional<District> districtOpt = districtDao.findById(partyDto.getDistrictId());
			String encryptedPassword = passwordEncoder.encode(partyDto.getPassword());
			party.setPassword(encryptedPassword);
			party.setDistrictId(districtOpt.get());
			party.setRole(UserRole.ROLE_PARTY);
			Party savedParty = partyDao.save(party);
			return "Party Registration successfull " + savedParty.toString();
		}
		return "Party regitration fail";
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
	public String deleteParty(String id) {
		Long partyId = Long.parseLong(id);
		Party partyOpt = partyDao.findById(partyId)	.orElseThrow(() -> new ApiException("party not found"));;
		if (partyOpt.isActive()) {
			List<Candidate> candiateList = candidateDao.findAllByPartyId(partyOpt);
			for (Candidate candidate : candiateList) {
				candidate.setActive(false);
				candidateDao.save(candidate);
			}
			partyOpt.setActive(false);
			partyDao.save(partyOpt);
			return "success";
		}
		return "fail";
	}

	@Override
	public String updateProfile(UpdatePartyDto dto) {
		Long partyId = Long.parseLong(dto.getPartyId());
		Long districtId = Long.parseLong(dto.getDistrictId());
		Party partyOpt = partyDao.findById(partyId)
				.orElseThrow(() -> new ApiException("party not found"));
		

		Party partyToBeUpdated = partyOpt;
		District districtOpt = districtDao.findById(districtId)
				.orElseThrow(() -> new ApiException("district not found"));
		

		partyToBeUpdated.setDistrictId(districtOpt);
		partyToBeUpdated.setEmail(dto.getEmail());
		partyToBeUpdated.setObjective(dto.getObjective());
		partyToBeUpdated.setName(dto.getPartyName());

		partyDao.save(partyToBeUpdated);
		return "success";

	}

	@Override
	public List<PartyCandidateResponseDto> getAllForm(PartyCandidateRequestDto dto) {
		List<PartyCandidateResponseDto> partyCandidateList = new ArrayList<PartyCandidateResponseDto>();

		Long partyId = Long.parseLong(dto.getPartyId());
		Long districtId = Long.parseLong(dto.getDistrictId());

		District districtOpt = districtDao.findById(districtId)
				.orElseThrow(() -> new ApiException("district not found"));

		Party partyOpt = partyDao.findById(partyId).orElseThrow(() -> new ApiException("party not found"));

		List<Candidate> candidateList = candidateDao.findByConstituency(districtOpt);
		if (candidateList.isEmpty()) {
			return partyCandidateList;
		}
		for (Candidate candidate : candidateList) {
			if (candidate.isRejected() == false) {
				PartyCandidateResponseDto responseDto = new PartyCandidateResponseDto();
				responseDto.setCandidateId(candidate.getUserId());
				Voter voterOpt = voterDao.findById(candidate.getVoterId().getUserId())
						.orElseThrow(() -> new ApiException("candidate not found"));

				responseDto.setCandidateName(voterOpt.getName());
				responseDto.setConstituency(districtOpt.getDistrictName());
				if (candidate.isAccepted()) {
					responseDto.setIsAccepted("Accepted");
					responseDto.setIsRejected("false");
				} else if (candidate.isRejected()) {
					responseDto.setIsAccepted(null);
					responseDto.setIsRejected("True");
				}
				partyCandidateList.add(responseDto);
			}
		}

		return partyCandidateList;
	}

	@Override
	public String acceptForm(CandidateAcceptDto dto) {
		// parse candidateId string to long
		Long candidateId = Long.parseLong(dto.getCandidateId());
		// parse districtId string to long
		Long districtId = Long.parseLong(dto.getDistrictId());
		// parse partyId string to long
		Long partyId = Long.parseLong(dto.getPartyId());

		// find candidate by candidateId
		Candidate candidateOpt = candidateDao.findById(candidateId)
				.orElseThrow(() -> new ApiException("candidate not found"));
		;
		// find District by districtId
		District districtOpt = districtDao.findById(districtId)
				.orElseThrow(() -> new ApiException("district not found"));
		;

		// getting all candidate of constituency
		List<Candidate> candidateList = candidateDao.findByConstituency(districtOpt);

		for (Candidate candidate : candidateList) {
			// checking candidate for particular party
			if (candidate.getPartyId().getUserId() == partyId) {
				// saving data
				candidate.setAccepted(false);
				candidate.setRejected(true);
				candidateDao.save(candidate);
			}
		}
		// saving data
		candidateOpt.setAccepted(true);
		candidateOpt.setRejected(false);
		candidateDao.save(candidateOpt);
		return "Candidate form accepted";

	}

	@Override
	public List<PartyCandidateResponseDto> partyCandidate(String partyid) {
		// parse partyId string to long
		Long partyId = Long.parseLong(partyid);

		Party partyOpt = partyDao.findById(partyId).orElseThrow(() -> new ApiException("party not found"));
		;

		List<PartyCandidateResponseDto> partyCandidateList = new ArrayList<PartyCandidateResponseDto>();

		List<Candidate> candidateList = candidateDao.findAllByPartyId(partyOpt);
		System.out.println(candidateList);
		if (candidateList.isEmpty()) {
			return null;
		} else {

			for (Candidate candidate : candidateList) {

				if (candidate.isAccepted()) {
					PartyCandidateResponseDto responseDto = new PartyCandidateResponseDto();
					responseDto.setCandidateId(candidate.getUserId());

					Voter voterOpt = voterDao.findById(candidate.getVoterId().getUserId())
							.orElseThrow(() -> new ApiException("candidate not found"));
					;
					responseDto.setCandidateName(voterOpt.getName());

					responseDto.setIsAccepted("Accepted");
					responseDto.setIsRejected("false");

					Optional<District> districtOpt = districtDao.findById(candidate.getConstituency().getDistrictId());
					responseDto.setConstituency(districtOpt.get().getDistrictName());
					partyCandidateList.add(responseDto);
				}
			}
		}
		return partyCandidateList;
	}

	@Override
	public List<GetAllpartyForAdmin> getPartyForAdmin() {
		List<Party> partyList = partyDao.findAll();
		List<GetAllpartyForAdmin> dtoList = new ArrayList<GetAllpartyForAdmin>();

		for (Party party : partyList) {
			if (party.isActive()) {
				GetAllpartyForAdmin dto = new GetAllpartyForAdmin();
				dto.setEmail(party.getEmail());
				dto.setFullName(party.getName());
				dto.setObjective(party.getObjective());
				dto.setPartyId(party.getUserId().toString());
				dtoList.add(dto);
			}
		}
		return dtoList;
	}

	@Override
	public String removeFromParty(String candidateid) {
		Long candidateId = Long.parseLong(candidateid);
		Candidate candidateOpt = candidateDao.findById(candidateId)
				.orElseThrow(() -> new ApiException("candidate not found"));

		candidateOpt.setAccepted(false);
		candidateOpt.setRejected(true);
		candidateDao.save(candidateOpt);
		return "Candidate Remove from Party";

	}

	@Override
	public String changePassword(ChangePasswordPartyDto passwordDto) {
		Long partyId = Long.parseLong(passwordDto.getPartyId());
		Party partyOpt = partyDao.findById(partyId).orElseThrow(() -> new ApiException("party not found"));

		if (passwordEncoder.matches(passwordDto.getOldPassword(), partyOpt.getPassword())) {
			partyDao.save(partyOpt);
			return "success";
		}
		return "fail";
	}

}
