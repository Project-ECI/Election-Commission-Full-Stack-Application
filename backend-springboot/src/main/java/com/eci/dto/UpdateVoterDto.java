package com.eci.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UpdateVoterDto {
	private Long voterId;
	
	private String fullName;
	
	private String email;
	
	private Long districtId;
	
	private String mobileNo;
}
