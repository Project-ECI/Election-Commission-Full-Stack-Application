package com.eci.service;

import com.eci.dto.ChangePasswordAdminDto;
import com.eci.dto.LoginDto;

public interface AdminService {
	public String loginAdmin(LoginDto adminLoginDto);
	
	public String changePassword(ChangePasswordAdminDto dto);
	
	public String deleteAdmin(String id);

	
}
