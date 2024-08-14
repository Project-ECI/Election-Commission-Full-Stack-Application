package com.eci.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ElectionDateDto {
	private String electionDate;
	
	private String districtId;
}
