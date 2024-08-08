package com.eci.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CandidateAcceptDto {
	private Long partyId;

	private Long candidateId;
	
	private Long districtId;
}
