package com.eci.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eci.dto.VoteDto;
import com.eci.dto.VoterLoginDto;
import com.eci.dto.VoterRegisterDto;
import com.eci.entity.Voter;
import com.eci.service.VoterService;

@RestController
@RequestMapping("/voter")
public class VoterController {
	@Autowired
	private VoterService voterService;

	@PostMapping("/register")
	public ResponseEntity<?> voterRegister(@RequestBody VoterRegisterDto voterRegisterDto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(voterService.registerVoter(voterRegisterDto));
	}

	@PostMapping("/login")
	public ResponseEntity<?> loginVoter(@RequestBody VoterLoginDto loginDto) {
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(voterService.loginVoter(loginDto));
	}
	
	@PostMapping("/vote")
	public ResponseEntity<?> vote(@RequestBody VoteDto dto){
		// get voter with voter id
		Optional<Voter> voter = voterService.getVoterById(dto.getVoterId());
		// get candidate with candidate id
		// check if voter.distrcit == candidate.constituency
			// if true isVoted = true and votes++
			// else return "failed"
		return null;
	}
}
