package com.eci.service;

import java.util.List;
import java.util.Optional;

import com.eci.dto.SearchElectrolRollDto;
import com.eci.dto.UpdateVoterDto;
import com.eci.dto.VoteDto;
import com.eci.dto.ChangePasswordDto;
import com.eci.dto.DeleteDto;
import com.eci.dto.KnowYourCandidateDto;
import com.eci.dto.LoginDto;
import com.eci.dto.VoterRegisterationDto;

import com.eci.entity.Voter;

public interface VoterService {
	public String registerVoter(VoterRegisterationDto voterRegisterDto);

	public String loginVoter(LoginDto voterLoginDto);

	public Optional<Voter> getVoterById(Long id);

	public String vote(VoteDto voteDto);

	public List<KnowYourCandidateDto> knowYourCandidate(String voterId);

	public List<KnowYourCandidateDto> knowYourCandidateGlobal(String districtId);

	public SearchElectrolRollDto searchVoter(Long voterId);

	public String voterDelete(DeleteDto voter);

	public String updateProfile(UpdateVoterDto dto);

	public String changePassword(ChangePasswordDto passwordDto);
}
