package com.eci.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.eci.dto.CandidateAcceptDto;
import com.eci.dto.ChangePasswordDto;
import com.eci.dto.LoginDto;
import com.eci.dto.PartyCandidateRequestDto;
import com.eci.dto.PartyRegistrationDto;
import com.eci.dto.UpdatePartyDto;
import com.eci.service.PartyService;

@RestController
@RequestMapping("/party")
public class PartyController {
	@Autowired
	private PartyService partyService;

	@PostMapping("/register")
	public ResponseEntity<?> partyRegistration(@RequestBody PartyRegistrationDto partyDto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(partyService.registerParty(partyDto));
	}

	@PostMapping("/login")
	public ResponseEntity<?> partyLogin(@RequestBody LoginDto partyDto) {
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(partyService.loginParty(partyDto));
	}

	@PutMapping("/update/profile")
	public ResponseEntity<?> updateProfile(@RequestBody UpdatePartyDto dto) {
		System.out.println("////////////////");
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(partyService.updateProfile(dto));
	}

	@PostMapping("/get-candidate")
	public ResponseEntity<?> getDistrictCandiate(@RequestBody PartyCandidateRequestDto dto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(partyService.getAllForm(dto));
	}
	
	@GetMapping("/accepted-candidate/{partyId}")
	public ResponseEntity<?> getPartyCandidate(@PathVariable String partyId) {
		return ResponseEntity.status(HttpStatus.CREATED).body(partyService.partyCandidate(partyId));
	}
	
	@PostMapping("/accept-candidate-form")
	public ResponseEntity<?> acceptCandiate(@RequestBody CandidateAcceptDto dto) {
		System.out.println("in controller");
		return ResponseEntity.status(HttpStatus.CREATED).body(partyService.acceptForm(dto));
	}
	
	@PutMapping("/change-password")
	public ResponseEntity<?> updatePassword(@RequestBody ChangePasswordDto dto){
		return ResponseEntity.status(HttpStatus.OK).body(partyService.changePassword(dto));
	}
	
	@PutMapping("/remove/candidate/{candidateId}")
	public ResponseEntity<?> removeFromParty(@PathVariable String candidateId){
		return ResponseEntity.status(HttpStatus.OK).body(partyService.removeFromParty(candidateId));
	}
}
