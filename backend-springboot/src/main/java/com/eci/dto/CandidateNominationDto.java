package com.eci.dto;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.eci.entity.District;
import com.eci.entity.Party;
import com.eci.entity.Voter;

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
