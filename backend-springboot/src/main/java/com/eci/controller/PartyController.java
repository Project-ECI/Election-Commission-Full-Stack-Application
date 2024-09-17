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

import com.eci.dao.UserDao;
import com.eci.dto.CandidateAcceptDto;
import com.eci.dto.ChangePasswordPartyDto;
import com.eci.dto.LoginDto;
import com.eci.dto.PartyCandidateRequestDto;
import com.eci.dto.PartyRegistrationDto;
import com.eci.dto.SigninResponse;
import com.eci.dto.UpdatePartyDto;
import com.eci.entity.User;
import com.eci.security.CustomUserDetailsService;
import com.eci.security.JwtUtils;
import com.eci.service.PartyService;

@RestController
@RequestMapping("/party")
public class PartyController {
	@Autowired
	private PartyService partyService;

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
		// CustomUserDetails userPrincipal = (CustomUserDetails)
		// verifiedToken.getPrincipal();
		// System.out.println("Principal: "+ userPrincipal.getUsername());// custom user
		// details object
		// create JWT n send it to the clnt in response

		Optional<User> user =userDetailsService.findByEmail(request.getEmail());
		SigninResponse resp = new SigninResponse(jwtUtil.generateJwtToken(verifiedToken),
				"success", request.getEmail(),user.get());
		
		return ResponseEntity.status(HttpStatus.CREATED).body(resp);
	}

	@PostMapping("/register")
	public ResponseEntity<?> partyRegistration(@RequestBody PartyRegistrationDto partyDto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(partyService.registerParty(partyDto));
	}

	@PreAuthorize("hasRole('PARTY')")
	@PutMapping("/update/profile")
	public ResponseEntity<?> updateProfile(@RequestBody UpdatePartyDto dto) {
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(partyService.updateProfile(dto));
	}

	@PreAuthorize("PARTY")
	@PostMapping("/get-candidate")
	public ResponseEntity<?> getDistrictCandiate(@RequestBody PartyCandidateRequestDto dto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(partyService.getAllForm(dto));
	}

	@PreAuthorize("hasRole('PARTY')")
	@GetMapping("/accepted-candidate/{partyId}")
	public ResponseEntity<?> getPartyCandidate(@PathVariable String partyId) {
		return ResponseEntity.status(HttpStatus.CREATED).body(partyService.partyCandidate(partyId));
	}

	@PreAuthorize("hasRole('PARTY')")
	@PostMapping("/accept-candidate-form")
	public ResponseEntity<?> acceptCandiate(@RequestBody CandidateAcceptDto dto) {
		System.out.println("in controller");
		return ResponseEntity.status(HttpStatus.CREATED).body(partyService.acceptForm(dto));
	}

	@PreAuthorize("hasRole('PARTY')")
	@PutMapping("/change/password")
	public ResponseEntity<?> updatePassword(@RequestBody ChangePasswordPartyDto dto) {
		System.out.println(dto);
		return ResponseEntity.status(HttpStatus.OK).body(partyService.changePassword(dto));
	}

	@PreAuthorize("hasRole('PARTY')")
	@PutMapping("/remove/candidate/{candidateId}")
	public ResponseEntity<?> removeFromParty(@PathVariable String candidateId) {
		return ResponseEntity.status(HttpStatus.OK).body(partyService.removeFromParty(candidateId));
	}
}
