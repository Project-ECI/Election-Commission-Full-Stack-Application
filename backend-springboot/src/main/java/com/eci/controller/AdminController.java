package com.eci.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eci.dto.AdminLoginDto;
import com.eci.dto.ElectionDto;
import com.eci.service.AdminService;
import com.eci.service.ElectionService;

@RestController
@RequestMapping("/admin")
public class AdminController {
	@Autowired
	private AdminService adminService;
	
	@Autowired
	private ElectionService electionService;

	@PostMapping("/login")
	public ResponseEntity<?> loginVoter(@RequestBody AdminLoginDto loginDto) {
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(adminService.loginAdmin(loginDto));
	}
	
	@PostMapping("/set-election")
	public ResponseEntity<?> setElectionDates(@RequestBody ElectionDto dto){
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(electionService.addElectionDate(dto));
	}
}
