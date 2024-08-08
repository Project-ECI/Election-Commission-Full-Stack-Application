package com.eci.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eci.entity.Party;

public interface PartyDao extends JpaRepository<Party, Long> {
	public Optional<Party> findByEmail(String email);
}