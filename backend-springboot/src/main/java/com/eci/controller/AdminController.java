package com.eci.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
	private CandidateService candidateService ;
	
	@PostMapping("/login")
	public ResponseEntity<?> loginVoter(@RequestBody LoginDto loginDto) {
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(adminService.loginAdmin(loginDto));
	}
	
	@PostMapping("/set/election")
	public ResponseEntity<?> setElectionDates(@RequestBody ElectionDateDto dto){
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(electionService.addElectionDate(dto));
	}
	
	@DeleteMapping("/delete/voter")
	public ResponseEntity<?> deleteVoter(@RequestBody DeleteDto deleteDto ){
		return ResponseEntity.ok(voterService.voterDelete(deleteDto));
	}

	@DeleteMapping("/delete/party")
	public ResponseEntity<?> deleteParty(@RequestBody DeleteDto deleteDto ){
		return ResponseEntity.ok(partyService.deleteParty(deleteDto));
	}
	@DeleteMapping("/delete/candidate")
	public ResponseEntity<?> deleteCandidate(@RequestBody DeleteDto deleteDto ){
		return ResponseEntity.ok(candidateService.candidateDelete(deleteDto));
	}
}
