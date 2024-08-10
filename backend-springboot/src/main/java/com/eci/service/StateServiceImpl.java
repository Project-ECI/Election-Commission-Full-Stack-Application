package com.eci.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eci.dao.StateDao;
import com.eci.entity.State;

@Service
@Transactional
public class StateServiceImpl implements StateService {
	@Autowired
	private StateDao stateDao;

	@Override
	public List<State> getAllState() {
		List<State> stateList = stateDao.findAll();
		if (stateList.isEmpty()) {
			return null;
		}
		return stateList;
	}
}
