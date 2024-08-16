package com.eci.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ChangePasswordAdminDto {
	private String adminId;
	
	private String oldPassword;
	
	private String newPassword;
}
