package com.eci.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eci.dao.AdminDao;
import com.eci.dto.AdminLoginDto;
import com.eci.entity.Admin;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {

	@Autowired
	private ModelMapper mapper;

	@Autowired
	private AdminDao adminDao;

	@Override
	public String loginAdmin(AdminLoginDto adminLoginDto) {
		Admin admin = mapper.map(adminLoginDto, Admin.class);
		Admin validAdmin = adminDao.findByEmail(admin.getEmail());

		if (validAdmin != null && validAdmin.getPassword().equals(adminLoginDto.getPassword())) {
			return "Login Successfull";
		}
		return "Login Fail";
	}

}
