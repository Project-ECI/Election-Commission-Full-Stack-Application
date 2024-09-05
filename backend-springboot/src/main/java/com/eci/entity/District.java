package com.eci.entity;

import javax.persistence.Column;
import javax.persistence.Entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

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
public class District {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long districtId;
	
	@Column(nullable = false,length = 15)
	private String districtName;
	
	@ManyToOne
	@JoinColumn(name = "state_id", referencedColumnName = "stateId")
	private State stateId;
}
