package com.eci.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ChangePasswordPartyDto {
	private String partyId;
	
	private String oldPassword;
	
	private String newPassword;
}
