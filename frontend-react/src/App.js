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
import KnowCandidate from "./pages/Voter/KnowCandidate";
import CandidateHomepage from "./pages/Candidate/CandidateHomepage";
import Nominate from "./pages/Candidate/Nominate";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminHomepage from "./pages/Admin/AdminHomepage"
import SetElectionDate from "./pages/Admin/SetElectionDate"
import DeclareResults from "./pages/Admin/DeclareResults";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/voter/registration" element={<VoterRegPage />} />
        <Route path="/voter/login" element={<VoterLoginPage />} />
        <Route path="/voter/home" element={<VoterHomepage />} />
        <Route path="/voter/cast-vote" element={<CastVote />} />
        <Route path="/voter/know-candidate" element={<KnowCandidate />} />{" "}

        <Route path="/candidate/registration" element={<CandidateRegPage />} />
        <Route path="/candidate/login" element={<CandidateLoginPage />} />
        <Route path="/candidate/home" element={<CandidateHomepage />} />
        <Route path="/candidate/nominate" element={<Nominate />} />

        <Route path="/party/registration" element={<PartyRegPage />} />
        <Route path="/party/login" element={<PartyLoginPage />} />

        <Route path="/article/voter" element={<VoterGuide />} />
        <Route path="/article/party" element={<PartyArticle />} />
        <Route path="/know-your-candidate" element={<KnowYourCandidate />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/home" element={<AdminHomepage />} />
        <Route path="/admin/set-date" element={<SetElectionDate/>}/>
        <Route path="/admin/declare-results" element={<DeclareResults/>}/>
      </Routes>
    </div>
  );
}

export default App;

// <Route path="/application-status" element={<ApplicationStatus />} />