package com.eci.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class KnowYourCandidateDto {
	private Long candidateId;

	private String candiateName;

	private String partyName;

	private boolean isIndependent;

}
