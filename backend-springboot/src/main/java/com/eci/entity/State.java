package com.eci.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
@AllArgsConstructor
public class State {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long stateId;
	
	private String stateName;
	
	private String stateCode;
}
