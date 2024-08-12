package com.eci.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eci.dao.DistrictDao;
import com.eci.dao.StateDao;
import com.eci.dto.DistrictDto;
import com.eci.entity.District;
import com.eci.entity.State;

@Service
@Transactional
public class DistrictServiceImpl implements DistrictService {

	@Autowired
	private DistrictDao districtDao;

	@Autowired
	private StateDao stateDao;

	@Autowired
	private ModelMapper mapper;

	@Override
	public List<DistrictDto> findDistrictByState(String stateid) {
		Long stateId=Long.parseLong(stateid);
		Optional<State> stateOpt = stateDao.findById(stateId);
		if (stateOpt.isPresent()) {
			List<District> districtList = districtDao.findAllByStateId(stateOpt.get());

			if (!districtList.isEmpty()) {
				List<DistrictDto> dtoList = new ArrayList<DistrictDto>();
				for (District district : districtList) {
					DistrictDto dto = mapper.map(district, DistrictDto.class);
					dtoList.add(dto);
				}
				return dtoList;
			}
		}
		return null;
	}
}
