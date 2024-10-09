
package com.eci.security;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity // to enable spring sec frmwork support
@Configuration // to tell SC , this is config class containing @Bean methods
@EnableGlobalMethodSecurity(prePostEnabled = true)
//To enable method level authorization support : pre n post authorization
public class SecurityConfig {
	// dep : custom jwt auth filter
	@Autowired
	private JwtAuthenticationFilter jwtFilter;
	
	// dep : custom auth entry point
	@Autowired
	private CustomAuthenticationEntryPoint authEntry;

	@Bean
	public SecurityFilterChain authorizeRequests(HttpSecurity http) throws Exception {
//		System.out.println("///////");
		// URL based authorization rules
		http.cors(c -> c.disable())
				// disable CSRF token generation n verification
				.csrf(c -> c.disable())
				.exceptionHandling().authenticationEntryPoint(authEntry)
			.and()
				.authorizeRequests()
				.antMatchers("/**/register", "/**/login", "/eci/**", "/v3/api-docs/**", "/swagger-ui/**").permitAll()
				.antMatchers(HttpMethod.OPTIONS).permitAll()
				.antMatchers("/admin/**").hasRole("ADMIN")
				.antMatchers("/voter/**").hasRole("VOTER")
				.antMatchers("/party/**").hasRole("PARTY")
				.antMatchers("/candidate/**").hasRole("CANDIDATE")
				.anyRequest().authenticated()
			.and()
				// to tell spring sec : not to use HttpSession to store user's auth details
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and()
				// inserting jwt filter before sec filter
				.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}

	// configure AuthMgr as a spring bean
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}

/*
 *Here are the **key points** of the `SecurityConfig` class:

1. **Annotations**:
   - **`@EnableWebSecurity`**: Enables Spring Security's web security features.
   - **`@Configuration`**: Marks this class as a Spring configuration class.
   - **`@EnableGlobalMethodSecurity(prePostEnabled = true)`**: Enables method-level security, allowing annotations like `@PreAuthorize` to secure methods based on roles.

2. **Dependencies**:
   - **`JwtAuthenticationFilter`**: A custom filter for validating JWT tokens.
   - **`CustomAuthenticationEntryPoint`**: A custom entry point to handle unauthorized access by returning a 401 error.

3. **Security Configuration**:
   - **CORS and CSRF**:
     - **CORS disabled**: `cors(c -> c.disable())` disables Cross-Origin Resource Sharing checks.
     - **CSRF disabled**: `csrf(c -> c.disable())` disables CSRF protection, appropriate for JWT-based stateless authentication.
   
   - **Exception Handling**: 
     - Configures the application to use `CustomAuthenticationEntryPoint` to handle unauthorized requests by sending a 401 error.
   
   - **URL Authorization**:
     - **Permit All**: Allows unrestricted access to registration, login, and API documentation endpoints.
     - **Role-based Access Control**:
       - `/admin/**`: Only accessible to `ADMIN`.
       - `/voter/**`, `/party/**`, `/candidate/**`: Restricted to corresponding roles.
     - **Authenticated Access**: All other requests require authentication.
   
   - **Session Management**:
     - **Stateless**: Configured as stateless using `SessionCreationPolicy.STATELESS` since JWT is used for authentication.

4. **Custom JWT Filter**:
   - **JWT Filter Insertion**: The custom JWT filter (`JwtAuthenticationFilter`) is placed before the `UsernamePasswordAuthenticationFilter`, ensuring JWT validation happens first.

5. **Beans**:
   - **`AuthenticationManager`**: Manages authentication processes like login.
   - **`PasswordEncoder`**: Uses `BCryptPasswordEncoder` to securely hash passwords.

This setup provides **stateless JWT-based authentication** with role-based access control and secure password handling.
 */
