package com.eci.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eci.entity.User;

public interface UserDao extends JpaRepository<User, Long> {
	Optional<User> findByEmail(String email);
}
