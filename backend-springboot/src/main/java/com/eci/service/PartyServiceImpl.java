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
import com.eci.dto.DeleteDto;
import com.eci.dto.GetAllPartyDto;
import com.eci.dto.LoginDto;
import com.eci.dto.PartyCandidateRequestDto;
import com.eci.dto.PartyCandidateResponseDto;
import com.eci.dto.PartyRegistrationDto;
import com.eci.entity.Candidate;
import com.eci.dto.UpdatePartyDto;
import com.eci.entity.District;
import com.eci.entity.Party;
import com.eci.entity.Voter;

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
			return partyOpt.get().getPartyId().toString();
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
	public String deleteParty(DeleteDto party) {
		Optional<Party> partyOpt = partyDao.findById(party.getId());
		if (partyOpt.isPresent() && partyOpt.get().isActive() == true) {
			List<Candidate> candiateList = candidateDao.findAllByParty(partyOpt.get());
			for (Candidate candidate : candiateList) {
				candidate.setActive(false);
				candidateDao.save(candidate);
			}
			partyOpt.get().setActive(false);
			partyDao.save(partyOpt.get());
			return "Party Deleted Successfully";
		}
		return "Party not found";
	}

	@Override
	public String updateProfile(UpdatePartyDto dto) {
		Optional<Party> partyOpt = partyDao.findById(dto.getPartyId());

		if (partyOpt.isPresent()) {
			Party partyToBeUpdated = partyOpt.get();
			Optional<District> districtOpt = districtDao.findById(dto.getDistrictId());

			partyToBeUpdated.setDistrictId(districtOpt.get());
			partyToBeUpdated.setEmail(dto.getEmail());
			partyToBeUpdated.setObjective(dto.getObjective());
			partyToBeUpdated.setPartyName(dto.getPartyName());

			partyDao.save(partyToBeUpdated);
			return "Party details updated";
		}
		return "Party doesn't exist";
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
					}else if(candidate.isRejected())
					{responseDto.setIsAccepted(null);
					responseDto.setIsRejected("True");}
					partyCandidateList.add(responseDto);
				}
			}
		}
		return partyCandidateList;
	}

	@Override
	public String acceptForm(CandidateAcceptDto dto) {
		Long candidateId=Long.parseLong(dto.getCandidateId());
		Optional<Candidate> candidateOpt = candidateDao.findById(candidateId);
		if (candidateOpt.isPresent()) {
			Long districtId=Long.parseLong(dto.getDistrictId());
			Optional<District> districtOpt = districtDao.findById(districtId);
			List<Candidate> candidateList = candidateDao.findByConstituency(districtOpt.get());
			for (Candidate candidate : candidateList) {
				Long partyId=Long.parseLong(dto.getPartyId());
				if (candidate.getParty().getPartyId() == partyId) {
					candidate.setAccepted(false);
					candidate.setRejected(true);
					candidateDao.save(candidate);
				}
			}
			candidateOpt.get().setAccepted(true);
			candidateOpt.get().setRejected(false);
			candidateDao.save(candidateOpt.get());
			return "Candidate form accepted";
		}
		return "Candidate form failed";
	}

	@Override
	public String changePassword(ChangePasswordDto passwordDto) {
		Optional<Party> partyOpt = partyDao.findByEmail(passwordDto.getEmail());
		if (partyOpt.isPresent() && partyOpt.get().getPassword().equals(passwordDto.getOldPassword())) {
			partyOpt.get().setPassword(passwordDto.getNewPassword());
			partyDao.save(partyOpt.get());
			return "Password Change Successfully";
		}
		return "Password Change failed";
	}

}
