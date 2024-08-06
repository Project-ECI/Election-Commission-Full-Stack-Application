package com.eci.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eci.entity.State;

public interface StateDao extends JpaRepository<State, Long> {
}