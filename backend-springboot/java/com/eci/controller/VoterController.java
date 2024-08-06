package com.eci.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.eci.dao.VoterDao;
import com.eci.entity.Voter;

@RestController
@RequestMapping("/voter")
public class VoterController {
	@Autowired
	private VoterDao voterDao;

	@PostMapping("/register")
	public ResponseEntity<?> registerVoter(@RequestBody Voter voter) {
		return ResponseEntity.status(HttpStatus.CREATED).body(voterDao.save(voter));
	}

	@PostMapping("/login")
	public ResponseEntity<?> loginVoter(@RequestBody String email ) {
		System.out.println(email);
//		Voter voter2 = voterDao.findByEmail(email);
		System.out.println(email);
//		System.out.println(voter2);
//		if (voter2 != null && passsword.equals(voter2.getPassword())) {
//			return ResponseEntity.ok("Login successfull");
//		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Login Fail");
	}
}
