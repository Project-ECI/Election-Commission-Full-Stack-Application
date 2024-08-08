package com.eci.dto;

import com.eci.entity.District;
import com.eci.entity.Party;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CandidateNominationDto {
	private Long candidateId;
	private Party party;

	private boolean isIndependent;

	private District constituency;
}
