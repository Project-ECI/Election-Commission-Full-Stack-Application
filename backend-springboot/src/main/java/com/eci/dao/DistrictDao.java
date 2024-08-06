package com.eci.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eci.entity.District;

public interface DistrictDao extends JpaRepository<District, Long> {
}