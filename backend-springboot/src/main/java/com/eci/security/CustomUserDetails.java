package com.eci.security;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.eci.entity.User;

@SuppressWarnings("serial")
public class CustomUserDetails implements UserDetails {
	private User user;

	public CustomUserDetails(User user) {
		super();
		this.user = user;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// ret list of granted authorities
		// GrantedAuthority : i/f -<--- SimpleGrantedAuthority(String role)
		return List.of(new SimpleGrantedAuthority
				(user.getRole().name()));
	}

	@Override
	public String getPassword() {
		return user.getPassword();
	}

	@Override
	public String getUsername() {
		return user.getEmail();
	}

	@Override
	public boolean isAccountNonExpired() {
		return user.isActive();
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}

/*
 *Implements UserDetails:
 *This class implements the UserDetails interface from Spring Security, providing the necessary information for authentication and authorization.
 *
 *User Object:
 *It stores a User object that holds user-specific details such as email (used as the username), password, and role.
 *
 *User Roles (getAuthorities()):
 *The getAuthorities() method returns the user's role(s) as a collection of GrantedAuthority objects using SimpleGrantedAuthority.
 *The getAuthorities() method in the UserDetails interface returns a Collection<? extends GrantedAuthority> because a user can have multiple roles or permissions. In Spring Security, roles and authorities represent the user's permissions, which can vary in number and scope. 
 */
