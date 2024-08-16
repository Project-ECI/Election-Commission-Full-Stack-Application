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

import com.eci.dto.VoteDto;
import com.eci.dto.ChangePasswordDto;
import com.eci.dto.LoginDto;
import com.eci.dto.UpdateVoterDto;
import com.eci.dto.VoterRegisterationDto;
import com.eci.service.ElectionService;
import com.eci.service.VoterService;

@RestController
@RequestMapping("/voter")
public class VoterController {
	@Autowired
	private VoterService voterService;

	@Autowired
	private ElectionService electionService;

	@PostMapping("/register")
	public ResponseEntity<?> voterRegister(@RequestBody VoterRegisterationDto voterRegisterDto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(voterService.registerVoter(voterRegisterDto));
	}

	@PostMapping("/login")
	public ResponseEntity<?> loginVoter(@RequestBody LoginDto loginDto) {
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(voterService.loginVoter(loginDto));
	}

	@PostMapping("/vote")
	public ResponseEntity<?> vote(@RequestBody VoteDto dto) {
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(voterService.vote(dto));
	}

	@PostMapping("/know-your-candidate")
	public ResponseEntity<?> knowYourCandidate(@RequestBody String voterId) {
		return ResponseEntity.status(HttpStatus.OK).body(voterService.knowYourCandidate(voterId));
	}

	@GetMapping("/view/result/{districtId}")
	public ResponseEntity<?> getResult(@PathVariable String districtId) {
		return ResponseEntity.status(HttpStatus.OK).body(electionService.getResultConstituency(districtId));
	}

	@GetMapping("/view/election-date/{voterId}")
	public ResponseEntity<?> getElectionDate(@PathVariable String voterId) {
		return ResponseEntity.status(HttpStatus.OK).body(electionService.getConstituencyElection(voterId));
	}

	@PutMapping("/update-profile")
	public ResponseEntity<?> updateProfile(@RequestBody UpdateVoterDto dto) {
		return ResponseEntity.status(HttpStatus.OK).body(voterService.updateProfile(dto));
	}

	@PutMapping("/change/password")
	public ResponseEntity<?> updatePassword(@RequestBody ChangePasswordDto dto) {
		return ResponseEntity.status(HttpStatus.OK).body(voterService.changePassword(dto));
	}
	

	
}
