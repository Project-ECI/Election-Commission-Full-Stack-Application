package com.eci.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eci.dao.VoterDao;


@Service
@Transactional
public class VoterServiceImpl implements VoterService{
	@Autowired
	private VoterDao voterDao;
	
	@Autowired
	private ModelMapper mapper;
}
