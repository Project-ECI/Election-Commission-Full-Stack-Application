package com.eci.service;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eci.dao.AdminDao;
import com.eci.dao.DistrictDao;
import com.eci.dao.ElectionDao;
import com.eci.dto.LoginDto;
import com.eci.entity.Admin;
import com.eci.entity.District;
import com.eci.entity.Election;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {

	@Autowired
	private ModelMapper mapper;

	@Autowired
	private AdminDao adminDao;

	@Autowired
	private ElectionDao electionDao;

	@Autowired
	private DistrictDao districtDao;

	@Override
	public String loginAdmin(LoginDto adminLoginDto) {
		Admin admin = mapper.map(adminLoginDto, Admin.class);
		Admin validAdmin = adminDao.findByEmail(admin.getEmail());

		if (validAdmin != null && validAdmin.getPassword().equals(adminLoginDto.getPassword())) {
			return "Login Successfull";
		}
		return "Login Fail";
	}
}
