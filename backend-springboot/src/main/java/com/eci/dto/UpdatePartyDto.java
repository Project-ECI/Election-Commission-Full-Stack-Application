package com.eci.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UpdatePartyDto {
	Long partyId;
	String email;
	String objective;
	String partyName;
	Long districtId;
}
