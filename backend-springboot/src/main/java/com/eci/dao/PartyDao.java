package com.eci.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eci.entity.Party;

public interface PartyDao extends JpaRepository<Party, Long> {
	public Party findByEmail(String email);
}