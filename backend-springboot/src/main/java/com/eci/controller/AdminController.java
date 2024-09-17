package com.eci.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eci.dto.LoginDto;
import com.eci.dto.SigninResponse;
import com.eci.entity.User;
import com.eci.exception.ApiException;
import com.eci.security.CustomUserDetailsService;
import com.eci.security.JwtUtils;
import com.eci.dao.UserDao;
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

	@Autowired
	private UserDao userDetailsService;
	
	@Autowired
	private AuthenticationManager authMgr;
	
	@Autowired
	private JwtUtils jwtUtil;

	// User Signin
	@PostMapping("/login")
	public ResponseEntity<?> authenticateUser(@RequestBody LoginDto request) {
		System.out.println("in sign in" + request);
		// create a token(implementation of Authentication i/f)
		// to store un verified user email n pwd
		UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(request.getEmail(),
				request.getPassword());
		// invoke auth mgr's authenticate method;
		Authentication verifiedToken = authMgr.authenticate(token);
		// => authentication n authorization successful !
		// CustomUserDetails userPrincipal = (CustomUserDetails) verifiedToken.getPrincipal();
		// System.out.println("Principal: "+ userPrincipal.getUsername());// custom user details object
		// create JWT n send it to the clnt in response
		
		Optional<User> user =userDetailsService.findByEmail(request.getEmail());
		SigninResponse resp = new SigninResponse(jwtUtil.generateJwtToken(verifiedToken),
				"success", request.getEmail(),user.get());
		
		return ResponseEntity.status(HttpStatus.CREATED).body(resp);
	}

	@PreAuthorize("ADMIN")
	@PostMapping("/set/election")
	public ResponseEntity<?> setElectionDates(@RequestBody ElectionDateDto dto) {
		try {
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(electionService.addElectionDate(dto));
		} catch (ApiException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiException(e.getMessage()));
		}
	}

	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/declare-results")
	public ResponseEntity<?> declaredElectionResult(@RequestBody String districtId) {
		try {
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(electionService.declaredResult(districtId));
		} catch (ApiException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiException(e.getMessage()));
		}
	}

	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/getall/voter")
	public ResponseEntity<?> getAllVoter() {
		return ResponseEntity.ok(voterService.getVoterForAdmin());
	}

	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/delete/voter/{id}")
	public ResponseEntity<?> deleteVoter(@PathVariable String id) {
		return ResponseEntity.ok(voterService.voterDelete(id));
	}

	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/change/password")
	public ResponseEntity<?> updatePassword(@RequestBody ChangePasswordAdminDto dto) {
		return ResponseEntity.status(HttpStatus.OK).body(adminService.changePassword(dto));
	}

	@PreAuthorize("ADMIN")
	@DeleteMapping("/delete/party/{adminId}")
	public ResponseEntity<?> deleteAdmin(@PathVariable String adminId) {
		return ResponseEntity.ok(adminService.deleteAdmin(adminId));
	}

	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/delete/party/{partyId}")
	public ResponseEntity<?> deleteParty(@PathVariable String partyId) {
		return ResponseEntity.ok(partyService.deleteParty(partyId));
	}

	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/getall/party")
	public ResponseEntity<?> getAllParty() {
		return ResponseEntity.ok(partyService.getPartyForAdmin());
	}

	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/delete/candidate/{id}")
	public ResponseEntity<?> deleteCandidate(@PathVariable String id) {
		return ResponseEntity.ok(candidateService.candidateDelete(id));
	}

	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/getall/candidate")
	public ResponseEntity<?> getAllCandidate() {
		return ResponseEntity.ok(candidateService.getCndidateForAdmin());
	}

	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/view/feedback")
	public ResponseEntity<?> getAllFeedback() {
		return ResponseEntity.ok(feedbackService.getAllFeedbackForAdmin());
	}
}
