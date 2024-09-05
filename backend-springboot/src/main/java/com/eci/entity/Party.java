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
@ToString
public class Party extends User {
	
	@Column(nullable = false,length = 500)
	private String objective;
	
	@ManyToOne
	@JoinColumn(name = "district_id", referencedColumnName = "districtId")
	private District districtId;
}
