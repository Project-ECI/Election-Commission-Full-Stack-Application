package com.eci.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class VoterRegisterationDto {
	private String fullName;

	private LocalDate dob;

	private boolean gender;

	private String email;

	private String password;

	private String mobileNo;

	private Long districtId;
}
