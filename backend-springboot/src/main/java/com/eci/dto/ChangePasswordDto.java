package com.eci.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ChangePasswordDto {
	private String voterId;
	
	private String oldPassword;
	
	private String newPassword;
}
