package com.eci.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eci.dao.StateDao;

@Service
@Transactional
public class StateServiceImpl implements StateService{
	@Autowired
	private StateDao stateDao;
	
	@Autowired
	private ModelMapper mapper;
}
