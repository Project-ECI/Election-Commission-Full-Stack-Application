package com.eci.entity;

import java.time.LocalDate;
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
public class Voter extends User {

	@Column(nullable = false)
	private LocalDate dob;

	@Column(nullable = false)
	private boolean gender;

	@Column(nullable = false,length = 15)
	private String mobileNo;

	@Column(nullable = false)
	private boolean isVoted = false;

	@ManyToOne
	@JoinColumn(name = "district_id", referencedColumnName = "districtId")
	private District districtId;

}
