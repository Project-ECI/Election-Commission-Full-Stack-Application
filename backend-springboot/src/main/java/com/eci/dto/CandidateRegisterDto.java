package com.eci.dto;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CandidateRegisterDto {
	private Long voterId;
	private String password;
}
