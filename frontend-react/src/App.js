import "./App.css";
//Essential
import { Route, Routes } from "react-router-dom";

// Voter
import VoterRegPage from "./pages/Voter/VoterRegistration";
import VoterLoginPage from "./pages/Voter/VoterLogin";
import VoterHomepage from "./pages/Voter/VoterHomepage";
import KnowYourCandidate from "./pages/Voter/KnowYourCandidate";
import VotingPage from "./pages/Voter/VotingPage";
import SearchInElectoralRoll from "./pages/Voter/SearchInElectoralRoll";
import VoterFeedback from "./pages/Voter/VoterFeedback";
import VoterComplaint from "./pages/Voter/VoterComplaint";
import VoterSettings from "./pages/Voter/VoterSettings";
import VoterProfile from "./pages/Voter/VoterProfile";
import VoterAllDate from "./pages/Voter/VoterAllDate";
import VoterDistrictDate from "./pages/Voter/VoterDistrictDate";

// Candidate
import CandidateRegPage from "./pages/Candidate/CandidateRegistration";
import CandidateLoginPage from "./pages/Candidate/CandidateLogin";
import CandidateHomepage from "./pages/Candidate/CandidateHomepage";
import Nominate from "./pages/Candidate/Nominate";
import ApplicationStatus from "./pages/Candidate/ViewApplication";
import CandidateList from "./pages/Party/CandidateList";
import CandidateFeedback from "./pages/Candidate/CandidateFeedback";
import CandidateComplaint from "./pages/Candidate/CandidateComplaint";
import CandidateProfile from "./pages/Candidate/CandidateProfile";
import CandidateSettings from "./pages/Candidate/CandidateSettings";
import CandidateViewDate from "./pages/Candidate/CandidateViewDate";
import CandidateViewResults from "./pages/Candidate/CandidateViewResults";

//Party
import PartyRegPage from "./pages/Party/PartyRegistration";
import PartyLoginPage from "./pages/Party/PartyLogin";
import PartyHomepage from "./pages/Party/PartyHomepage";
import PartyCandidate from "./pages/Party/PartyCandidate";
import PartyFeedback from "./pages/Party/PartyFeedback";
import PartyComplaint from "./pages/Party/PartyComplaint";
import PartyViewDate from "./pages/Party/PartyViewDate";
import PartyViewResult from "./pages/Party/PartyViewResult";
import PartySettings from "./pages/Party/PartySettings";
import PartyProfile from "./pages/Party/PartyProfile";

//Admin
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminHomepage from "./pages/Admin/AdminHomepage";
import SetElectionDate from "./pages/Admin/SetElectionDate";
import DeclareResults from "./pages/Admin/DeclareResults";
import ManageUsers from "./pages/Admin/ManageUser";
import ViewFeedback from "./pages/Admin/ViewFeedback";
import AdminViewDate from "./pages/Admin/AdminViewDate";
import AdminViewResult from "./pages/Admin/AdminViewResult";
import AdminProfile from "./pages/Admin/AdminProfile";
import AdminSettings from "./pages/Admin/AdminSettings";

//Global
import LandingPage from "./pages/LandingPage";
import VoterGuide from "./pages/FooterLinks/VoterArticle";
import PartyArticle from "./pages/FooterLinks/PartyArticle";
import VoterViewAllResult from "./pages/Voter/VoterViewResult";
import VoterDistrictResult from "./pages/Voter/VoterDistrictResult";
import TestToast from "./pages/Test";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* voter */}
        <Route path="/voter/registration" element={<VoterRegPage />} />
        <Route path="/voter/login" element={<VoterLoginPage />} />
        <Route path="/voter/home" element={<VoterHomepage />} />
        <Route
          path="/voter/know-your-candidate"
          element={<KnowYourCandidate />}
        />
        <Route path="/voter/cast-vote" element={<VotingPage />} />
        <Route
          path="/voter/search-in-electoral-roll"
          element={<SearchInElectoralRoll />}
        />
        <Route path="/voter/feedback" element={<VoterFeedback />} />
        <Route path="/voter/complaint" element={<VoterComplaint />} />
        <Route path="/voter/settings" element={<VoterSettings />} />
        <Route path="/voter/profile" element={<VoterProfile />} />
        <Route path="/voter/all-election-date" element={<VoterAllDate />} />
        <Route path="/voter/district-date" element={<VoterDistrictDate />} />
        <Route path="/voter/view/all/result" element={<VoterViewAllResult />} />
        <Route path="/voter/view/result" element={<VoterDistrictResult />} />
        {/* candidate */}
        <Route path="/candidate/registration" element={<CandidateRegPage />} />
        <Route path="/candidate/login" element={<CandidateLoginPage />} />
        <Route path="/candidate/home" element={<CandidateHomepage />} />
        <Route path="/candidate/nominate" element={<Nominate />} />
        <Route
          path="/candidate/application-status"
          element={<ApplicationStatus />}
        />
        <Route path="/candidate/feedback" element={<CandidateFeedback />} />
        <Route path="/candidate/complaint" element={<CandidateComplaint />} />
        <Route path="/candidate/profile" element={<CandidateProfile />} />
        <Route path="/candidate/settings" element={<CandidateSettings />} />
        <Route
          path="/candidate/view/election-dates"
          element={<CandidateViewDate />}
        />
        <Route
          path="/candidate/view/results"
          element={<CandidateViewResults />}
        />
        {/* party */}
        <Route path="/party/registration" element={<PartyRegPage />} />
        <Route path="/party/login" element={<PartyLoginPage />} />
        <Route path="/party/home" element={<PartyHomepage />} />
        <Route path="/party/candidate/list" element={<CandidateList />} />{" "}
        <Route path="/party/party-candidate" element={<PartyCandidate />} />
        <Route path="/party/feedback" element={<PartyFeedback />} />
        <Route path="/party/complaint" element={<PartyComplaint />} />
        <Route path="/party/settings" element={<PartySettings />} />
        <Route path="/party/profile" element={<PartyProfile />} />
        <Route path="/party/view/date" element={<PartyViewDate />} />
        <Route path="/party/view/result" element={<PartyViewResult />} />
        {/* admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/home" element={<AdminHomepage />} />
        <Route path="/admin/set-date" element={<SetElectionDate />} />
        <Route path="/admin/declare-results" element={<DeclareResults />} />
        <Route path="admin/settings" element={<AdminSettings />} />
        <Route path="admin/profile" element={<AdminProfile />} />
        <Route path="/admin/view/date" element={<AdminViewDate />} />
        <Route path="/admin/view/result" element={<AdminViewResult />} />
        <Route path="/admin/manage/user" element={<ManageUsers />} />
        <Route path="/admin/view/feedback" element={<ViewFeedback />} />
        {/* Global */}
        <Route path="/article/voter" element={<VoterGuide />} />
        <Route path="/article/party" element={<PartyArticle />} />
        {/* test */}
        <Route path="/test" element={<TestToast />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
