package com.eci.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.eci.service.DistrictService;
import com.eci.service.ElectionService;
import com.eci.service.FeedbackService;
import com.eci.service.PartyService;
import com.eci.service.StateService;
import com.eci.service.VoterService;

@RestController
@RequestMapping("/eci")
public class GlobalController {
	@Autowired
	private FeedbackService feedbackService;

	@Autowired
	private VoterService voterService;

	@Autowired
	private PartyService partyService;

	@Autowired
	private ElectionService electionService;

	@Autowired
	private StateService stateService;
	
	@Autowired
	private DistrictService districtService;
	
	@PostMapping("/feedback")
	public ResponseEntity<?> giveFeedback(@RequestBody String discription) {
		return ResponseEntity.status(HttpStatus.CREATED).body(feedbackService.addFeedback(discription));
	}

	@PostMapping("/search-in-electroll-roll")
	public ResponseEntity<?> searchVoter(@RequestParam Long voterId) {
		return ResponseEntity.ok(voterService.searchVoter(voterId));
	}

	@GetMapping("/all-parties")
	public ResponseEntity<?> getAllParty() {
		return ResponseEntity.status(HttpStatus.OK).body(partyService.getAllParty());
	}

	@GetMapping("/view/result")
	public ResponseEntity<?> getResult() {
		return ResponseEntity.status(HttpStatus.OK).body(electionService.getResult());
	}

	@GetMapping("/view/election-date")
	public ResponseEntity<?> getElectionDate() {
		return ResponseEntity.status(HttpStatus.OK).body(electionService.getElectionDate());
	}

	@GetMapping("/get-all-state")
	public ResponseEntity<?> getAllState() {
		return ResponseEntity.status(HttpStatus.OK).body(stateService.getAllState());
	}
	
	@GetMapping("/get-district")
	public ResponseEntity<?> getdistrict(@RequestParam String stateId) {
		return ResponseEntity.status(HttpStatus.OK).body(districtService.findDistrictByState(stateId));
	}
	
	@GetMapping("/know-your-candidate/{id}")
	public ResponseEntity<?> knowYourCandidate(@PathVariable String districtId) {
		return ResponseEntity.status(HttpStatus.OK).body(voterService.knowYourCandidateGlobal(districtId));
	}
}
