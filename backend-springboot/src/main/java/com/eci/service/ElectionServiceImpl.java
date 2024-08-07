package com.eci.service;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eci.dao.DistrictDao;
import com.eci.dao.ElectionDao;
import com.eci.dto.ElectionDto;
import com.eci.entity.District;
import com.eci.entity.Election;

@Service
@Transactional
public class ElectionServiceImpl implements ElectionService {
	@Autowired
	private ElectionDao electionDao;

	@Autowired
	private DistrictDao districtDao;

	@Autowired
	private ModelMapper mapper;

	@Override
	public String addElectionDate(ElectionDto dto) {
		Optional<District> district = districtDao.findById(dto.getDistrictId());

		// if districtId is valid
		if (district.isPresent()) {
			Optional<Election> election = electionDao.findByDistrictId(district.get());

			// update election date
			if (election.isPresent()) {
				election.get().setElectionDate(dto.getElectionDate());
				election.get().setDistrictId(district.get());
				electionDao.save(election.get());
				return election.toString();
			}
			// add new election date
			else {
				Election election1 = mapper.map(dto, Election.class);
				election1.setDistrictId(district.get());
				electionDao.save(election1);
				return election1.toString();
			}
		}
		return "Invalid District";

	}

}
