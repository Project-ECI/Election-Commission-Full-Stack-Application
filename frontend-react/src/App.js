import "./App.css";

import LandingPage from "./pages/LandingPage";
import VoterLogin from "./pages/Voter/VoterLogin";
import PartyRegister from "./pages/Party/PartyRegistration";
import PartyLogin from "./pages/Party/PartyLogin";
import CandidateLogin from "./pages/Candidate/CandidateLogin";

import VoterRegPage from "./pages/Voter/VoterRegistration";

function App() {
  return (
    <div>
      {/* <LandingPage></LandingPage> */}
      <VoterRegPage></VoterRegPage>
      {/* <VoterLogin></VoterLogin> */}
      {/* <PartyRegister></PartyRegister> */}
      {/* <PartyLogin></PartyLogin> */}
      {/* <CandidateLogin></CandidateLogin> */}
    </div>
  );
}

export default App;
