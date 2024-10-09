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
/*
 *Key Points of Use
 *
 *Authentication Support:
 *This service is used by Spring Security during the login process. When a user tries to log in with an email, Spring Security will call this loadUserByUsername() method to retrieve user details.
 *
 *Database Interaction:
 *The method queries the database for a user by their email. If found, it loads the user’s details into a CustomUserDetails object, which is needed by Spring Security to complete the authentication process.
 *
 *Exception Handling:
 *If the email is not found in the database, the service throws a UsernameNotFoundException, indicating a failed login attempt.
 *
 *Integration with CustomUserDetails:
 *The CustomUserDetails class (mentioned earlier) is returned to Spring Security. It encapsulates the user's credentials (email, password) and authorities (roles) for authentication.
 *
 *Example Use Case
 *When a user logs in, Spring Security will use this service to load the user's details by their email. If the email exists, Spring will authenticate the user with the provided password and grant access to protected resources based on their role.






 *
 */
