package com.eci.entity;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

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
public class Election {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long electionId;
	
	private LocalDate electionDate;
	
	@OneToOne
	@JoinColumn(name = "district_id", referencedColumnName = "districtId", unique = true)
	private District districtId;
	
	private boolean isElectionDeclread;
}
