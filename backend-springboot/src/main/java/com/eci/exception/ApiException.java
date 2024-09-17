package com.eci.exception;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@SuppressWarnings("serial")
@NoArgsConstructor
@Getter
@Setter
public class ApiException extends RuntimeException {
	private LocalDateTime timeStamp;
	private String message;

	public ApiException(String message) {
		super();
		this.message = message;
		this.timeStamp = LocalDateTime.now();
	}
}