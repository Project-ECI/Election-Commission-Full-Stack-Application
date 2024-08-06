package com.eci.dto;

import java.time.LocalDate;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.eci.entity.District;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class VoterRegisterDto {
	private String fullName;
	private LocalDate dob;
	private boolean gender;
	private String email;
	private String password;
	private String mobileNo;
	@ManyToOne
	@JoinColumn(name = "district_id", referencedColumnName = "districtId")
	private District districtId;
}
