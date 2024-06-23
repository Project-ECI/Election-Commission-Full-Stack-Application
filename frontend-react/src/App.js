import "./App.css";

import LandingPage from "./pages/LandingPage";

import VoterLoginPage from "./pages/Voter/VoterLogin";
import VoterRegPage from "./pages/Voter/VoterRegistration";

import CandidateLoginPage from "./pages/Candidate/CandidateLogin";

import PartyLoginPage from "./pages/Party/PartyLogin";
import PartyRegister from "./pages/Party/PartyRegistration";


function App() {
  return (
    <div>
      <LandingPage></LandingPage>

      <VoterRegPage></VoterRegPage>
      <VoterLoginPage></VoterLoginPage>

      <CandidateLoginPage></CandidateLoginPage>
      {/* <PartyRegister></PartyRegister> */}
      <PartyLoginPage></PartyLoginPage>
    </div>
  );
}

export default App;
