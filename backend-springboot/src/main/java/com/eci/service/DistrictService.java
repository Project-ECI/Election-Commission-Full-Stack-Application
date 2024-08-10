package com.eci.service;

import java.util.List;

import com.eci.dto.DistrictDto;

public interface DistrictService {
	public List<DistrictDto> findDistrictByState(Long stateId);
}
