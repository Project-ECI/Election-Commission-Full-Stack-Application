import "./App.css";

import LandingPage from "./pages/LandingPage";

import VoterLoginPage from "./pages/Voter/VoterLogin";
import VoterRegPage from "./pages/Voter/VoterRegistration";

import CandidateRegPage from "./pages/Candidate/CandidateRegistration"
import CandidateLoginPage from "./pages/Candidate/CandidateLogin";

import PartyLoginPage from "./pages/Party/PartyLogin";
import PartyRegPage from "./pages/Party/PartyRegistration";


function App() {
  return (
    <div>
      <LandingPage></LandingPage>

      <VoterRegPage></VoterRegPage>
      <VoterLoginPage></VoterLoginPage>

      <CandidateRegPage></CandidateRegPage>
      <CandidateLoginPage></CandidateLoginPage>

      <PartyRegPage></PartyRegPage>
      <PartyLoginPage></PartyLoginPage>
    </div>
  );
}

export default App;
