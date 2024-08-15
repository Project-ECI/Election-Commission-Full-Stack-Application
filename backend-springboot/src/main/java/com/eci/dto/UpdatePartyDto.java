package com.eci.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UpdatePartyDto {
	private String partyId;

	private String email;

	private String objective;

	private String partyName;

	private String districtId;
}
