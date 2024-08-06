package com.eci.dto;

import com.eci.entity.District;

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
	private District districtId;
}
