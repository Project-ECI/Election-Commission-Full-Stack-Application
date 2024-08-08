package com.eci.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PartyRegistrationDto {
	private String partyName;
	private String objective;
	private String email;
	private String password;
	private Long districtId;
}
