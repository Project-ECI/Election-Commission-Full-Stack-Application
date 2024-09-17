package com.eci.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eci.dao.UserDao;
import com.eci.entity.User;

@Service
@Transactional
public class CustomUserDetailsService implements UserDetailsService {
	@Autowired
	private UserDao userDao;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		// invoke dao's method
		User user = userDao.findByEmail(email)
				.orElseThrow(() -> 
				new UsernameNotFoundException("Email not found !!!!!"));
		//=> user email exists - user : persistent
		/*
		 * In case of email found -- this method has to ret UserDetails object filled with details lifted from DB
		 */
		return new CustomUserDetails(user);
	}

}
