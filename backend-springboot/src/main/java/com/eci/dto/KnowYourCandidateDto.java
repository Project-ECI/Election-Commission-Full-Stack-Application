package com.eci.dto;

import java.util.Optional;

import com.eci.entity.Party;
import com.eci.entity.Voter;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class KnowYourCandidateDto {
	private String candiateName;

	private String partyName;

	private boolean isIndependent;

//	Optional<Voter> voter2 = voterDao.findById(candidate.getVoterId().getVoterId());
//	yourCandidate.setCandiateName(voter2.get().getFullName());
//	Optional<Party> partyOpt = partyDao.findById(candidate.getParty().getPartyId());
//	yourCandidate.setPartyName(partyOpt.get().getPartyName());
//	yourCandidate.setIndependent(candidate.isIndependent());



}
