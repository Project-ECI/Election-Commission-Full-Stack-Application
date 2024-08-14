package com.eci.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GetAllpartyForAdmin {
	private String partyId;
	
	private String fullName;

	private String email;

	private String objective;

}
