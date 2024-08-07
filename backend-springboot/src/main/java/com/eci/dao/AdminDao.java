package com.eci.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eci.entity.Admin;
import com.eci.entity.Voter;

public interface AdminDao extends JpaRepository<Admin, Long> {
	public Admin findByEmail(String email);
}