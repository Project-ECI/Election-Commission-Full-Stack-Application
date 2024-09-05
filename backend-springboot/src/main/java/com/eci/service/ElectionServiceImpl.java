package com.eci.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
import com.eci.exception.ApiException;


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


	@Override
	public String addElectionDate(ElectionDateDto dto) {
		Long districtId = Long.parseLong(dto.getDistrictId());
		District district = districtDao.findById(districtId).orElseThrow(() -> new ApiException("district not found"));

		Optional<Election> election = electionDao.findByDistrictId(district);

		// update election date
		if (election.isPresent()) {
			election.get().setElectionDate(LocalDate.parse(dto.getElectionDate()));
			election.get().setDistrictId(district);
			electionDao.save(election.get());
			return "update election date" + election.toString();
		}
		// add new election date
		else {
			Election election1 = new Election();
			election1.setDistrictId(district);
			election1.setElectionDate(LocalDate.parse(dto.getElectionDate()));
			election1.setResultDeclared(false);
			electionDao.save(election1);
			return "add new election date" + election1.toString();
		}

	}

	@Override
	public List<ElectionResultDto> getResult() {
		List<ElectionResultDto> list = new ArrayList<>();
		List<District> districtList = districtDao.findAll();

		for (District district : districtList) {
			Optional<Election> electionOpt = electionDao.findByDistrictId(district);
			if (electionOpt.isPresent() && electionOpt.get().isResultDeclared()) {
				// Use constituency since it's the correct mapping to District in Candidate
				Optional<Candidate> topCandidateOpt = candidateDao.findTopByConstituencyOrderByVotesDesc(district);

				if (topCandidateOpt.isPresent() && topCandidateOpt.get().getPartyId() != null) {
					if (topCandidateOpt.get().isAccepted() || topCandidateOpt.get().isIndependent()) {

						Candidate topCandidate = topCandidateOpt.get();
						ElectionResultDto resultDto = new ElectionResultDto();
						resultDto.setDistrictName(district.getDistrictName());
						resultDto.setCandiateName(topCandidate.getVoterId().getName()); // Assuming Voter has a
																						// voterName
						resultDto.setVotes(topCandidate.getVotes());
						resultDto.setPartyName(topCandidate.getPartyId().getName()); // Assuming Party has a
																						// partyName
						list.add(resultDto);
					}
				}
			}

		}

		return list;
	}

	@Override
	public List<ElectionResultDto> getResultConstituency(String districtid) {
		Long districtId = Long.parseLong(districtid);
		District districtOpt = districtDao.findById(districtId)
				.orElseThrow(() -> new ApiException("district not found"));

		Election electionOpt = electionDao.findByDistrictId(districtOpt)
				.orElseThrow(() -> new ApiException("Election is not found for district"));

		List<ElectionResultDto> list = new ArrayList<ElectionResultDto>();

		if (electionOpt.isResultDeclared()) {

			List<Candidate> listOfCandidate = candidateDao.findByConstituency(districtOpt);
			if (!listOfCandidate.isEmpty()) {
				for (Candidate candidate : listOfCandidate) {
					if (candidate.isIndependent() || (candidate.isAccepted() && candidate.isRejected() == false)) {
						ElectionResultDto dto = new ElectionResultDto();
						if (candidate.getPartyId() != null) {
							Party partyOpt = partyDao.findById(candidate.getPartyId().getUserId())
									.orElseThrow(() -> new ApiException("Election is not found for district"));

							dto.setPartyName(partyOpt.getName());
							dto.setIndependent(false);
						} else {
							dto.setIndependent(true);
							dto.setPartyName(null);
						}

						dto.setCandiateName(candidate.getVoterId().getName());
						dto.setVotes(candidate.getVotes());
						dto.setDistrictName(candidate.getConstituency().getDistrictName());
						list.add(dto);
					}
				}
				return list;
			}

			return list;
		}
		return list;
	}

	@Override
	public List<ElectionDateDto> getElectionDate() {
		List<Election> allElection = electionDao.findAll();
		List<ElectionDateDto> list = new ArrayList<ElectionDateDto>();
		for (Election election : allElection) {
			ElectionDateDto dto = new ElectionDateDto();
			dto.setDistrictId(election.getDistrictId().getDistrictName());
			dto.setElectionDate(election.getElectionDate().toString());
			list.add(dto);
		}
		return list;
	}

	@Override
	public ElectionDateDto getConstituencyElection(String voterid) {
		Long voterId = Long.parseLong(voterid);
		Voter voterOpt = voterDao.findById(voterId).orElseThrow(() -> new ApiException("VOter not found"));

		Election electionOpt = electionDao.findByDistrictId(voterOpt.getDistrictId())
				.orElseThrow(() -> new ApiException("Election is not found for district"));

		ElectionDateDto dto = new ElectionDateDto();
		dto.setDistrictId(electionOpt.getDistrictId().getDistrictName());
		dto.setElectionDate(electionOpt.getElectionDate().toString());
		return dto;

	}

	@Override
	public String declaredResult(String districtid) {
		Long districtId = Long.parseLong(districtid);
		District districtOpt = districtDao.findById(districtId)
				.orElseThrow(() -> new ApiException("Election is not found for district"));

		List<Election> electionList = electionDao.findAllByDistrictId(districtOpt);
		if (!electionList.isEmpty()) {
			for (Election election : electionList) {
				election.setResultDeclared(true);
				electionDao.save(election);
			}
			return "Election Declared";

		}
		return "District not found";
	}

	@Override
	public boolean isResultDeclared(Long districtId) {
		District districtOpt = districtDao.findById(districtId)
				.orElseThrow(() -> new ApiException("Election is not found for district"));

		Election electionDetailsOpt = electionDao.findByDistrictId(districtOpt)
				.orElseThrow(() -> new ApiException("Election is not found for district"));

		return electionDetailsOpt.isResultDeclared();
	}

	@Override
	public boolean isElectionDate(Long districtId) {
		District districtOpt = districtDao.findById(districtId)
				.orElseThrow(() -> new ApiException("Election is not found for district"));

		Election electionDetailsOpt = electionDao.findByDistrictId(districtOpt)
				.orElseThrow(() -> new ApiException("Election is not found for district"));

		LocalDate electionDate = electionDetailsOpt.getElectionDate();
		return electionDate.equals(LocalDate.now());
	}
}
