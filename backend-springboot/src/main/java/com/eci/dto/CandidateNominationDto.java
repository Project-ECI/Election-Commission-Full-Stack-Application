package com.eci.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CandidateNominationDto {
	private Long candidateId;

	private Long party;

	private boolean isIndependent;

	private Long constituency;
}
