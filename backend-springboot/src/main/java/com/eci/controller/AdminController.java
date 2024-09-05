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
import org.springframework.web.bind.annotation.RestController;

import com.eci.dto.LoginDto;
import com.eci.exception.ApiException;
import com.eci.dto.ChangePasswordAdminDto;
import com.eci.dto.ElectionDateDto;

import com.eci.service.AdminService;
import com.eci.service.CandidateService;
import com.eci.service.ElectionService;
import com.eci.service.FeedbackService;
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

	@Autowired
	private FeedbackService feedbackService;

	@PostMapping("/login")
	public ResponseEntity<?> loginAdmin(@RequestBody LoginDto loginDto) {
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(adminService.loginAdmin(loginDto));
	}

	@PostMapping("/set/election")
	public ResponseEntity<?> setElectionDates(@RequestBody ElectionDateDto dto) {
		try {
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(electionService.addElectionDate(dto));
		} catch (ApiException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiException(e.getMessage()));
		}
	}

	@PutMapping("/declare-results")
	public ResponseEntity<?> declaredElectionResult(@RequestBody String districtId) {
		try {
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(electionService.declaredResult(districtId));
		} catch (ApiException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiException(e.getMessage()));
		}
	}

	@GetMapping("/getall/voter")
	public ResponseEntity<?> getAllVoter() {
		return ResponseEntity.ok(voterService.getVoterForAdmin());
	}

	@DeleteMapping("/delete/voter/{id}")
	public ResponseEntity<?> deleteVoter(@PathVariable String id) {
		return ResponseEntity.ok(voterService.voterDelete(id));
	}

	@PutMapping("/change/password")
	public ResponseEntity<?> updatePassword(@RequestBody ChangePasswordAdminDto dto) {
		return ResponseEntity.status(HttpStatus.OK).body(adminService.changePassword(dto));
	}

	@DeleteMapping("/delete/party/{adminId}")
	public ResponseEntity<?> deleteAdmin(@PathVariable String adminId) {
		return ResponseEntity.ok(adminService.deleteAdmin(adminId));
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

	@GetMapping("/view/feedback")
	public ResponseEntity<?> getAllFeedback() {
		return ResponseEntity.ok(feedbackService.getAllFeedbackForAdmin());
	}
}
