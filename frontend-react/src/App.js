import "./App.css";
import LandingPage from "./pages/LandingPage";
import VoterLoginPage from "./pages/Voter/VoterLogin";
import VoterRegPage from "./pages/Voter/VoterRegistration";
import VoterHomepage from "./pages/Voter/VoterHomepage";

import CandidateRegPage from "./pages/Candidate/CandidateRegistration";
import CandidateLoginPage from "./pages/Candidate/CandidateLogin";

import PartyLoginPage from "./pages/Party/PartyLogin";
import PartyRegPage from "./pages/Party/PartyRegistration";
import VoterGuide from "./pages/FooterLinks/VoterArticle";
import PartyArticle from "./pages/FooterLinks/PartyArticle";
import CastVote from "./pages/Voter/CastVote";
import KnowYourCandidate from "./pages/FooterLinks/KnowYourCandidate";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/voter-reg" element={<VoterRegPage />} />
        <Route path="/voter-login" element={<VoterLoginPage />} />
        <Route path="/candidate-reg" element={<CandidateRegPage />} />
        <Route path="/candidate-login" element={<CandidateLoginPage />} />
        <Route path="/party-reg" element={<PartyRegPage />} />
        <Route path="/party-login" element={<PartyLoginPage />} />
        <Route path="/become-good-voter" element={<VoterGuide />} />
        <Route path="/become-good-party" element={<PartyArticle />} />
        <Route path="/voter-homepage" element={<VoterHomepage />} />
        <Route path="/cast-vote" element={<CastVote />} />
        <Route path="/know-your-candidate" element={<KnowYourCandidate />} />
      </Routes>
    </div>
  );
}

export default App;
