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

}
