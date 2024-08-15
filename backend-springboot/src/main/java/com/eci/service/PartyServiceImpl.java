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
import com.eci.dto.CandidateAcceptDto;
import com.eci.dto.ChangePasswordDto;
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
import com.eci.entity.Voter;
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

	@Override
	public String registerParty(PartyRegistrationDto partyDto) {
		Optional<Party> partyOpt = partyDao.findByEmail(partyDto.getEmail());
		if (partyOpt.isEmpty()) {
			Party party = new Party();
			party.setActive(true);
			party.setPartyName(partyDto.getPartyName());
			party.setEmail(partyDto.getEmail());
			party.setPassword(partyDto.getPassword());
			party.setObjective(partyDto.getObjective());
			Optional<District> districtOpt = districtDao.findById(partyDto.getDistrictId());
			party.setDistrictId(districtOpt.get());
			Party savedParty = partyDao.save(party);
			return "Party Registration successfull " + savedParty.toString();
		}
		return "Party regitration fail";
	}

	@Override
	public String loginParty(LoginDto partyDto) {
		Party party = mapper.map(partyDto, Party.class);
		Optional<Party> partyOpt = partyDao.findByEmail(party.getEmail());

		if (partyOpt.isPresent() && party.getPassword().equals(partyOpt.get().getPassword())
				&& partyOpt.get().isActive() == true)
			try {
				return objectMapper.writeValueAsString(partyOpt.get());
			} catch (JsonProcessingException e) {
				return "success";
			}
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
	public String deleteParty(String id) {
		Long partyId = Long.parseLong(id);
		Optional<Party> partyOpt = partyDao.findById(partyId);
		if (partyOpt.isPresent() && partyOpt.get().isActive() == true) {
			List<Candidate> candiateList = candidateDao.findAllByParty(partyOpt.get());
			for (Candidate candidate : candiateList) {
				candidate.setActive(false);
				candidateDao.save(candidate);
			}
			partyOpt.get().setActive(false);
			partyDao.save(partyOpt.get());
			return "success";
		}
		return "fail";
	}

	@Override
	public String updateProfile(UpdatePartyDto dto) {
		Long partyId = Long.parseLong(dto.getPartyId());
		Long districtId = Long.parseLong(dto.getDistrictId());
		Optional<Party> partyOpt = partyDao.findById(partyId);
		if (partyOpt.isPresent()) {
			Party partyToBeUpdated = partyOpt.get();
			Optional<District> districtOpt = districtDao.findById(districtId);

			partyToBeUpdated.setDistrictId(districtOpt.get());
			partyToBeUpdated.setEmail(dto.getEmail());
			partyToBeUpdated.setObjective(dto.getObjective());
			partyToBeUpdated.setPartyName(dto.getPartyName());

			partyDao.save(partyToBeUpdated);
			return "success";
		}
		return "fail";
	}

	@Override
	public List<PartyCandidateResponseDto> getAllForm(PartyCandidateRequestDto dto) {
		List<PartyCandidateResponseDto> partyCandidateList = new ArrayList<PartyCandidateResponseDto>();

		Long partyId = Long.parseLong(dto.getPartyId());
		Long districtId = Long.parseLong(dto.getDistrictId());
		Optional<District> districtOpt = districtDao.findById(districtId);
		Optional<Party> partyOpt = partyDao.findById(partyId);
		if (partyOpt.isPresent() && districtOpt.isPresent()) {
			List<Candidate> candidateList = candidateDao.findByConstituency(districtOpt.get());
			if (candidateList.isEmpty()) {
				return partyCandidateList;
			}
			for (Candidate candidate : candidateList) {
				if (candidate.isRejected() == false) {
					PartyCandidateResponseDto responseDto = new PartyCandidateResponseDto();
					responseDto.setCandidateId(candidate.getCandidateId());
					Optional<Voter> voterOpt = voterDao.findById(candidate.getVoterId().getVoterId());
					responseDto.setCandidateName(voterOpt.get().getFullName());
					responseDto.setConstituency(districtOpt.get().getDistrictName());
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
		Optional<Candidate> candidateOpt = candidateDao.findById(candidateId);
		// find District by districtId
		Optional<District> districtOpt = districtDao.findById(districtId);

		// check if candidate and district is present or not
		if (candidateOpt.isPresent() && districtOpt.isPresent()) {
			// getting all candidate of constituency
			List<Candidate> candidateList = candidateDao.findByConstituency(districtOpt.get());

			for (Candidate candidate : candidateList) {
				// checking candidate for particular party
				if (candidate.getParty().getPartyId() == partyId) {
					// saving data
					candidate.setAccepted(false);
					candidate.setRejected(true);
					candidateDao.save(candidate);
				}
			}
			// saving data
			candidateOpt.get().setAccepted(true);
			candidateOpt.get().setRejected(false);
			candidateDao.save(candidateOpt.get());
			return "Candidate form accepted";
		}
		return "Candidate form failed";
	}

	@Override
	public List<PartyCandidateResponseDto> partyCandidate(String partyid) {
		// parse partyId string to long
		Long partyId = Long.parseLong(partyid);

		Optional<Party> partyOpt = partyDao.findById(partyId);

		List<PartyCandidateResponseDto> partyCandidateList = new ArrayList<PartyCandidateResponseDto>();

		List<Candidate> candidateList = candidateDao.findAllByParty(partyOpt.get());
		System.out.println(candidateList);
		if (candidateList.isEmpty()) {
			return null;
		} else {

			for (Candidate candidate : candidateList) {

				if (candidate.isAccepted()) {
					PartyCandidateResponseDto responseDto = new PartyCandidateResponseDto();
					responseDto.setCandidateId(candidate.getCandidateId());

					Optional<Voter> voterOpt = voterDao.findById(candidate.getVoterId().getVoterId());
					responseDto.setCandidateName(voterOpt.get().getFullName());

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
				dto.setFullName(party.getPartyName());
				dto.setObjective(party.getObjective());
				dto.setPartyId(party.getPartyId().toString());
				dtoList.add(dto);
			}
		}
		return dtoList;
	}

	@Override
	public String removeFromParty(String candidateid) {
		Long candidateId = Long.parseLong(candidateid);
		Optional<Candidate> candidateOpt = candidateDao.findById(candidateId);

		if (candidateOpt.isPresent()) {
			candidateOpt.get().setAccepted(false);
			candidateOpt.get().setRejected(true);
			candidateDao.save(candidateOpt.get());
			return "Candidate Remove from Party";
		}
		return "Something went wrog";
	}

	@Override
	public String changePassword(ChangePasswordPartyDto passwordDto) {
		Long partyId = Long.parseLong(passwordDto.getPartyId());
		Optional<Party> partyOpt = partyDao.findById(partyId);
		if (partyOpt.isPresent() && partyOpt.get().getPassword().equals(passwordDto.getOldPassword())) {
			partyOpt.get().setPassword(passwordDto.getNewPassword());
			partyDao.save(partyOpt.get());
			return "success";
		}
		return "fail";
	}


}
