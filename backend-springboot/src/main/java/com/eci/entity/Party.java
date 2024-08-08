package com.eci.entity;

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
public class Party {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long partyId;
	
	private String partyName;
	
	private String objective;
	
	private String email;
	
	private String password;
	@ManyToOne
	@JoinColumn(name = "district_id", referencedColumnName = "districtId")
	
	private District districtId;
	
	private boolean isActive;
}
