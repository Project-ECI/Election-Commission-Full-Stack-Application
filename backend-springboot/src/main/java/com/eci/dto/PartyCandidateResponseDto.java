package com.eci.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PartyCandidateResponseDto {
	private Long candidateId;
	
	private String candidateName;
	
	private String constituency;
	
	private boolean isAccpeted;
	
	private boolean isRejected;
}
