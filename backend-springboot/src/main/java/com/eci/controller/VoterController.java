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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eci.dto.VoteDto;
import com.eci.dao.UserDao;
import com.eci.dto.ChangePasswordDto;
import com.eci.dto.LoginDto;
import com.eci.dto.SigninResponse;
import com.eci.dto.UpdateVoterDto;
import com.eci.dto.VoterRegisterationDto;
import com.eci.entity.User;
import com.eci.security.CustomUserDetailsService;
import com.eci.security.JwtUtils;
import com.eci.service.ElectionService;
import com.eci.service.VoterService;

@RestController
@RequestMapping("/voter")
public class VoterController {
	@Autowired
	private VoterService voterService;

	@Autowired
	private ElectionService electionService;


	@Autowired
	private JwtUtils jwtUtil;
	
	@Autowired
	private AuthenticationManager authMgr;
	
	@Autowired
	private UserDao userDetailsService;
	

	// User Signin
	@PostMapping("/login")
	public ResponseEntity<?> authenticateUser(@RequestBody LoginDto request) {
		System.out.println("in sign in" + request);
		// create a token(implementation of Authentication i/f)
		// to store un verified user email n pwd
		UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(request.getEmail(),
				request.getPassword());
		System.out.println("Token "+token);
		// invoke auth mgr's authenticate method;
		Authentication verifiedToken = authMgr.authenticate(token);
		System.out.println("verifiedToken "+verifiedToken);
		// => authentication n authorization successful !
		// CustomUserDetails userPrincipal = (CustomUserDetails) verifiedToken.getPrincipal();
		// System.out.println("Principal: "+ userPrincipal.getUsername());// custom user details object
		// create JWT n send it to the clnt in response
		Optional<User> user =userDetailsService.findByEmail(request.getEmail());
		SigninResponse resp = new SigninResponse(jwtUtil.generateJwtToken(verifiedToken),
				"success", request.getEmail(),user.get());
		
		System.out.println("resp "+resp);
		return ResponseEntity.status(HttpStatus.CREATED).body(resp);
	}
	
	@PostMapping("/register")
	public ResponseEntity<?> voterRegister(@RequestBody VoterRegisterationDto voterRegisterDto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(voterService.registerVoter(voterRegisterDto));
	}
	
	@PreAuthorize("hasRole('ROLE_VOTER')")
	@PostMapping("/test")
	public String check() {
		System.out.println("Test");
		return "Test";
	}

	@PreAuthorize("hasRole('VOTER')")
	@PostMapping("/vote")
	public ResponseEntity<?> vote(@RequestBody VoteDto dto) {
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(voterService.vote(dto));
	}

	@PreAuthorize("hasRole('VOTER')")
	@PostMapping("/know-your-candidate/{voterId}")
	public ResponseEntity<?> knowYourCandidate(@PathVariable String voterId) {
		return ResponseEntity.status(HttpStatus.OK).body(voterService.knowYourCandidate(voterId));
	}

	@PreAuthorize("hasRole('VOTER')")
	@GetMapping("/view/result/{districtId}")
	public ResponseEntity<?> getResult(@PathVariable String districtId) {
		return ResponseEntity.status(HttpStatus.OK).body(electionService.getResultConstituency(districtId));
	}

	@PreAuthorize("hasRole('VOTER')")
	@GetMapping("/view/election-date/{voterId}")
	public ResponseEntity<?> getElectionDate(@PathVariable String voterId) {
		return ResponseEntity.status(HttpStatus.OK).body(electionService.getConstituencyElection(voterId));
	}

	@PreAuthorize("hasRole('VOTER')")
	@PutMapping("/update-profile")
	public ResponseEntity<?> updateProfile(@RequestBody UpdateVoterDto dto) {
		return ResponseEntity.status(HttpStatus.OK).body(voterService.updateProfile(dto));
	}

	@PreAuthorize("hasRole('VOTER')")
	@PutMapping("/change/password")
	public ResponseEntity<?> updatePassword(@RequestBody ChangePasswordDto dto) {
		System.out.println("**********");
		return ResponseEntity.status(HttpStatus.OK).body(voterService.changePassword(dto));
	}

}
