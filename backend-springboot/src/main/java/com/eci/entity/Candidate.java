package com.eci.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
public class Candidate {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long candidateId;
	
	@OneToOne
	@JoinColumn(name = "voter_id", referencedColumnName = "voterId")
	private Voter voterId;
	
	@ManyToOne
	@JoinColumn(name = "party_id", referencedColumnName = "partyId")
	private Party party;

	private boolean isIndependent;

	@ManyToOne
	@JoinColumn(name = "constituency_id", referencedColumnName = "districtId")
	private District constituency;
	
	private int votes;
	
	private boolean isActive;
	
	private boolean isAccepted;
	
	private boolean isRejected;
}
