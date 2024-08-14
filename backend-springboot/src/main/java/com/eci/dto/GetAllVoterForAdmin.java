package com.eci.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GetAllVoterForAdmin {
	private String voterId;
	
	private String fullName;

	private String email;

	private String mobileNo;

}
