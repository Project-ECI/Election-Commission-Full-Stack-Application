package com.eci.service;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eci.dao.AdminDao;
import com.eci.dto.ChangePasswordAdminDto;
import com.eci.dto.LoginDto;
import com.eci.entity.Admin;
import com.eci.entity.Voter;
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

	@Override
	public String changePassword(ChangePasswordAdminDto dto) {

		Long adminId = Long.parseLong(dto.getAdminId());
		Optional<Admin> adminOpt = adminDao.findById(adminId);
		if (adminOpt.isPresent() && adminOpt.get().getPassword().equals(dto.getOldPassword())) {
			adminOpt.get().setPassword(dto.getNewPassword());
			adminDao.save(adminOpt.get());
			return "success";
		}
		return "Password Change failed";
	}

	@Override
	public String deleteAdmin(String id) {
		Long adminId = Long.parseLong(id);
		Optional<Admin> adminOpt = adminDao.findById(adminId);
		if (adminOpt.isPresent()) {
			adminDao.save(adminOpt.get());
			return "success";
		}
		return "fail";
	}
}
