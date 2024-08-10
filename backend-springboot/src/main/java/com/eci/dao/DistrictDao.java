package com.eci.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eci.entity.District;
import com.eci.entity.State;

public interface DistrictDao extends JpaRepository<District, Long> {
	public List<District> findAllByStateId(State stateId);
}