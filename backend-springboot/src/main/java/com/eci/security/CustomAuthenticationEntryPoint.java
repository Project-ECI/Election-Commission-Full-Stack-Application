package com.eci.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

	//The commence method is triggered when an unauthenticated user tries to access a secured resource.
	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException authException) throws IOException, ServletException {
		// send error message : SC 401
		response.sendError(HttpServletResponse.SC_UNAUTHORIZED, authException.getMessage());

	}

}
/*
 * Purpose: Handle unauthorized access by sending a 401 Unauthorized error.
 * Why: Useful for REST APIs where you want to send a direct error response rather than redirecting users to a login page.
 * How: It implements AuthenticationEntryPoint and sends a custom error message when unauthorized access occurs.
 * 
 */