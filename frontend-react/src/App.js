import "./App.css";
import LandingPage from "./pages/LandingPage";
import VoterLoginPage from "./pages/Voter/VoterLogin";
import VoterRegPage from "./pages/Voter/VoterRegistration";
import CandidateRegPage from "./pages/Candidate/CandidateRegistration"
import CandidateLoginPage from "./pages/Candidate/CandidateLogin";
import PartyLoginPage from "./pages/Party/PartyLogin";
import PartyRegPage from "./pages/Party/PartyRegistration";
import CandidateGuides from "./pages/FooterLinks/CandidateArticle";

import { Route, Routes } from "react-router-dom";
import ContactUs from "./pages/ContactUs/ContactUs";
import AboutUs from "./pages/AboutUs/AboutUs";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/voter-reg" element={<VoterRegPage/>} />
        <Route path="/voter-login" element={<VoterLoginPage/>} />
        <Route path="/candidate-reg" element={<CandidateRegPage/>} />
        <Route path="/candidate-login" element={<CandidateLoginPage/>} />
        <Route path="/party-reg" element={<PartyRegPage/>} />
        <Route path="/party-login" element={<PartyLoginPage/>} />
        <Route path="/candidate-guide" element={<CandidateGuides/>} />
        <Route path="/contact-us" element={<ContactUs/>} />
        <Route path="/about-us" element={<AboutUs/>} />



      </Routes>
    </div>
  );
}

export default App;
