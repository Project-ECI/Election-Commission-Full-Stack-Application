package com.eci.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eci.entity.District;
import com.eci.entity.Election;

public interface ElectionDao extends JpaRepository<Election, Long> {
	public Optional<Election> findByDistrictId(District districtId);

	public List<Election> findAllByDistrictId(District districtId);
}
