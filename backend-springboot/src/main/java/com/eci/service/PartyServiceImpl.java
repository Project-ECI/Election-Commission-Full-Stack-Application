package com.eci.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eci.dao.PartyDao;

@Service
@Transactional
public class PartyServiceImpl implements PartyService{
	@Autowired
	private PartyDao partyDao;
	
	@Autowired
	private ModelMapper mapper;
}
