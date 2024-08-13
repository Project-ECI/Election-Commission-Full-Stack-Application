package com.eci.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CandidateNominationDto {
	private String candidateId;

	private String party;

	private boolean isIndependent;

	private String constituency;
}
