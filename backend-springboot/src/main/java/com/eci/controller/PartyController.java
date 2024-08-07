package com.eci.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eci.dto.PartyLoginDto;
import com.eci.dto.PartyRegistrationDto;
import com.eci.service.PartyService;

@RestController
@RequestMapping("/party")
public class PartyController {
	@Autowired
	private PartyService partyService;
	
	@PostMapping("/register")
	public ResponseEntity<?> partyRegistration(@RequestBody PartyRegistrationDto partyDto){
		return ResponseEntity.status(HttpStatus.CREATED).body(partyService.registerParty(partyDto));
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> partyLogin(@RequestBody PartyLoginDto partyDto){
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(partyService.loginParty(partyDto));
	}
	
	@GetMapping
	public ResponseEntity<?> getAllParty(){
		return ResponseEntity.status(HttpStatus.OK).body(partyService.getAllParty());
	}
	
}
