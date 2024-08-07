package com.eci.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ElectionDateDto {
	private LocalDate electionDate;
	private Long districtId;
	
}
