import "./App.css";
import LandingPage from "./pages/LandingPage";
import VoterLoginPage from "./pages/Voter/VoterLogin";
import VoterRegPage from "./pages/Voter/VoterRegistration";
import VoterHomepage from "./pages/Voter/VoterHomepage";

import CandidateRegPage from "./pages/Candidate/CandidateRegistration"
import CandidateLoginPage from "./pages/Candidate/CandidateLogin";

import PartyLoginPage from "./pages/Party/PartyLogin";
import PartyRegPage from "./pages/Party/PartyRegistration";
import CastVote from "./pages/Voter/CastVote";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/voter-reg" element={<VoterRegPage/>} />
        <Route path="/voter-login" element={<VoterLoginPage/>} />
        <Route path="/candidate-reg" element={<CandidateRegPage/>} />
        <Route path="/candidate-login" element={<CandidateLoginPage/>} />
        <Route path="/party-reg" element={<PartyRegPage/>} />
        <Route path="/party-login" element={<PartyLoginPage/>} />
        <Route path="/voter-homepage" element={<VoterHomepage/>} />
        <Route path="/" element={<CastVote />} />
      </Routes>
    </div>
  );
}

export default App;
