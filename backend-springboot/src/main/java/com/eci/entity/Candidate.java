package com.eci.entity;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
@Table(name = "candidate")
public class Candidate extends User {

	@OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "voter_id", referencedColumnName = "user_id")
	private Voter voterId; // Foreign key to 'Voter' entity

	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "party_id", referencedColumnName = "user_id")
	private Party partyId; // Foreign key to 'Party' entity

	@ManyToOne
	@JoinColumn(name = "constituency_id", referencedColumnName = "districtId")
	private District constituency; // Foreign key to 'District' entity

	@Column(nullable = false)
	private boolean isIndependent;

	
	private int votes;

	@Column(nullable = false)
	private boolean isAccepted;

	@Column(nullable = false)
	private boolean isRejected;
}
