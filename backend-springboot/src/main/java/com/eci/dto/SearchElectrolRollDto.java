package com.eci.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SearchElectrolRollDto {
	
	private String fullName;
	
	private boolean gender;
	
	private String district;
	
	private LocalDate dob;
}
