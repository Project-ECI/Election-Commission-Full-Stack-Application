package com.eci.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eci.dao.CandidateDao;

@Service
@Transactional
public class CandidateServiceImpl implements CandidateService{
	@Autowired
	private CandidateDao candidateDao;
	
	@Autowired
	private ModelMapper mapper;

}
