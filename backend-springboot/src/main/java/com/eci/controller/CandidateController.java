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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eci.dto.LoginDto;
import com.eci.dto.SigninResponse;
import com.eci.entity.User;
import com.eci.security.CustomUserDetailsService;
import com.eci.security.JwtUtils;
import com.eci.dao.UserDao;
import com.eci.dto.CandidateNominationDto;
import com.eci.dto.CandidateRegistrationDto;

import com.eci.service.CandidateService;

@RestController
@RequestMapping("/candidate")
public class CandidateController {
	@Autowired
	private CandidateService candidateService;

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
	
	
	@PostMapping("/register")
	public ResponseEntity<?> candidateRegister(@RequestBody CandidateRegistrationDto candidateRegisterDto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(candidateService.registerCandidate(candidateRegisterDto));
	}

	@PreAuthorize("CANDIDATE")
	@PostMapping("/nomination")
	public ResponseEntity<?> candidateNomination(@RequestBody CandidateNominationDto dto) {
		System.out.println(dto);
		return ResponseEntity.status(HttpStatus.CREATED).body(candidateService.nominateCandidate(dto));
	}
	
	@GetMapping("/form-status/{candidateId}")
	public ResponseEntity<?> formStatus(@PathVariable String candidateId) {
		return ResponseEntity.status(HttpStatus.CREATED).body(candidateService.formStatus(candidateId));
	}
}
