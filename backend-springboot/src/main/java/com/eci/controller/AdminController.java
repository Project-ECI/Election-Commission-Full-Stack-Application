package com.eci.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.eci.dto.LoginDto;
import com.eci.dto.DeleteDto;
import com.eci.dto.ElectionDateDto;

import com.eci.service.AdminService;
import com.eci.service.CandidateService;
import com.eci.service.ElectionService;
import com.eci.service.PartyService;
import com.eci.service.VoterService;

@RestController
@RequestMapping("/admin")
public class AdminController {
	@Autowired
	private AdminService adminService;

	@Autowired
	private ElectionService electionService;

	@Autowired
	private VoterService voterService;

	@Autowired
	private PartyService partyService;

	@Autowired
	private CandidateService candidateService;

	@PostMapping("/login")
	public ResponseEntity<?> loginAdmin(@RequestBody LoginDto loginDto) {
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(adminService.loginAdmin(loginDto));
	}

	@PostMapping("/set/election")
	public ResponseEntity<?> setElectionDates(@RequestBody ElectionDateDto dto) {
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(electionService.addElectionDate(dto));
	}
	
	@PutMapping("/declare-results")
	public ResponseEntity<?> declaredElectionResult(@RequestBody String districtId) {
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(electionService.declaredResult(districtId));
	}
	
	@GetMapping("/getall/voter")
	public ResponseEntity<?> getAllVoter() {
		return ResponseEntity.ok(voterService.getVoterForAdmin());
	}

	@DeleteMapping("/delete/voter/{id}")
	public ResponseEntity<?> deleteVoter(@PathVariable String id ) {
		return ResponseEntity.ok(voterService.voterDelete(id));
	}

	@DeleteMapping("/delete/party/{partyId}")
	public ResponseEntity<?> deleteParty(@PathVariable String partyId) {
		return ResponseEntity.ok(partyService.deleteParty(partyId));
	}
	
	@GetMapping("/getall/party")
	public ResponseEntity<?> getAllParty() {
		return ResponseEntity.ok(partyService.getPartyForAdmin());
	}

	@DeleteMapping("/delete/candidate/{id}")
	public ResponseEntity<?> deleteCandidate(@PathVariable String id) {
		return ResponseEntity.ok(candidateService.candidateDelete(id));
	}
	

	@GetMapping("/getall/candidate")
	public ResponseEntity<?> getAllCandidate() {
		return ResponseEntity.ok(candidateService.getCndidateForAdmin());
	}

	
}
