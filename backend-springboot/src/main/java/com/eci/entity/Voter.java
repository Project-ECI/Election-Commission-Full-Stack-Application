package com.eci.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.springframework.boot.context.properties.bind.DefaultValue;

import lombok.AllArgsConstructor;
import lombok.Builder.Default;
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
public class Voter {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long voterId;
	
	private String fullName;
	
	private LocalDate dob;
	
	private boolean gender;
	
	@Column(unique = true)
	private String email;
	
	private String password;
	
	private String mobileNo;
	
	private boolean isActive;
	
	@ManyToOne
	@JoinColumn(name = "district_id", referencedColumnName = "districtId")
	private District districtId;

	private boolean isVoted;
}
