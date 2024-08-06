package com.eci.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eci.dao.DistrictDao;

@Service
@Transactional
public class DistrictServiceImpl implements DistrictService {
	@Autowired
	private DistrictDao districtDao;
	
	@Autowired
	private ModelMapper mapper;
}
