package com.eci.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ElectionResultDto {

	private String candiateName;
	private String partyName;
	private boolean isIndependent;
	private int votes;
	private String districtName;
}
