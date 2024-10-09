package com.eci.security;

import java.io.IOException;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;

@Component // spring bean : can be injected in other spring beans
public class JwtAuthenticationFilter extends OncePerRequestFilter {
	// token verification
	// dep : JWT utils
	@Autowired
	private JwtUtils utils;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		// check auth header from incoming request
		String authHeader = request.getHeader("Authorization");
//		System.out.println(request.toString());
//		System.out.println(response);
//		System.out.println(filterChain);
//		System.out.println(authHeader);
		if (authHeader != null && authHeader.startsWith("Bearer ")) {
			// => req header contains JWT
			String jwt = authHeader.substring(7);
			System.out.println(jwt);
			// validate JWT
			Claims payloadClaims = utils.validateJwtToken(jwt);
			System.out.println(payloadClaims);
			// get user name from the claims
			if (payloadClaims != null) {
				String email = utils.getUserNameFromJwtToken(payloadClaims);
				// get granted authorities as a custom claim
				List<GrantedAuthority> authorities = utils.getAuthoritiesFromClaims(payloadClaims);
				// add username/email n granted authorities in Authentication object
				UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(email, null,
						authorities);
				// save this auth token under spring sec so that subsequent filters will NOT
				// retry the auth again
				SecurityContextHolder.getContext().setAuthentication(token);
				System.out.println("saved auth token in sec ctx");
			}
		}

		filterChain.doFilter(request, response);// to continue with remaining chain of spring sec filters

	}

}
/*
 * Here are the key points for the `JwtAuthenticationFilter` class:

1. **Extends `OncePerRequestFilter`**:
   - The filter is executed once per request to handle JWT authentication logic.

2. **Spring Bean (`@Component`)**:
   - Marked as a Spring component, meaning it can be injected and managed by Spring's IoC container.

3. **Dependency Injection**:
   - Uses `JwtUtils` for validating JWT tokens and extracting claims like username and roles.

4. **JWT Extraction**:
   - Retrieves the JWT token from the `Authorization` header, which starts with the "Bearer " prefix.

5. **Token Validation**:
   - Validates the JWT using `JwtUtils`. If the token is valid, the claims (payload data) are extracted.

6. **Extracting User Info**:
   - Gets the user's email and authorities (roles) from the JWT claims to build an authentication object.

7. **Authentication Object**:
   - Creates a `UsernamePasswordAuthenticationToken` containing the user's email and roles and sets it in the `SecurityContextHolder`.

8. **Security Context Setup**:
   - Saves the authentication token in Spring Security’s `SecurityContext`, marking the user as authenticated for the current request.

9. **Filter Chain Continuation**:
   - After handling authentication, the filter chain continues to allow further processing by other filters or controllers.

10. **Stateless Authentication**:
   - This filter supports a stateless authentication mechanism, as the JWT is used to validate the user in each request, without relying on server-side sessions.
 */
 