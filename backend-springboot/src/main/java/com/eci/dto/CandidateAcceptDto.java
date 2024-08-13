package com.eci.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CandidateAcceptDto {
	private String partyId;

	private String candidateId;
	
	private String districtId;
}
