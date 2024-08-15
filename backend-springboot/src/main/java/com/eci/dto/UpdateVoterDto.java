package com.eci.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UpdateVoterDto {
	private String voterId;
	
	private String fullName;
	
	private String email;
	
	private String districtId;
	
	private String mobileNo;
}
