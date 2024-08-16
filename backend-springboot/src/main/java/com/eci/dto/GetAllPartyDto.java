package com.eci.dto;

import com.eci.entity.District;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GetAllPartyDto {
private Long partyId;
	private String partyName;

	private String objective;

	private String email;

	private District districtId;
}
