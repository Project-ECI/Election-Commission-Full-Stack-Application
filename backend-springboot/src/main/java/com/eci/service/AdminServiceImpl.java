package com.eci.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eci.dao.AdminDao;
import com.eci.dto.LoginDto;
import com.eci.entity.Admin;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {

	@Autowired
	private ModelMapper mapper;

	@Autowired
	private AdminDao adminDao;
	
	@Autowired
	private ObjectMapper objectMapper;

	@Override
	public String loginAdmin(LoginDto adminLoginDto) {
		Admin admin = mapper.map(adminLoginDto, Admin.class);
		Admin validAdmin = adminDao.findByEmail(admin.getEmail());

		if (validAdmin != null && validAdmin.getPassword().equals(adminLoginDto.getPassword())) {
			try {
				return objectMapper.writeValueAsString(validAdmin);
			} catch (JsonProcessingException e) {
				return "success";
			}
		}
		return "fail";
	}
}
