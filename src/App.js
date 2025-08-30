import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { HelmetProvider } from 'react-helmet-async';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import { About } from "./Pages/About";
import BackToTopButton from "./Components/BackToTopButton.js";
import Form from "./Pages/Form";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import ForgotPassword from "./Auth/ForgotPassword";
import Dashboard from "./Pages/Dashboard";
import Admin from "./Admin/Admin";
import { AuthProvider } from "./Context/AuthContext";
import useAuth from "./Hooks/useAuth";
import Profile from "./Pages/Profile";
import ViewPaper from "./Pages/ViewPaper.js";
import ContactForm from "./Pages/ContactForm.js";
import Archives from "./Pages/Archives.js";
import VolumePage from "./Pages/VolumePage.js";
import CurrentIssue from "./Pages/CurrentIssue.js";
import AbstractingandIndexing from "./Pages/AbstractingandIndexing.js";
import EditorialBoard from "./Pages/EditorialBoard.js";
import PrivacyPolicy from "./Pages/PrivacyPolicy.js";
import TermsandConditions from "./Pages/TermsandConditions.js";
import InvitePage from "./Pages/InvitePage.js";
import ReviewerPage from "./Pages/ReviewerPage.js";
import ReviewerDashboard from "./Pages/ReviewerDashboard.js";
import DeveloperTeam from './Components/DeveloperTeam.js';

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Header />
          <div id="main">
            <div id="main_body">
              <br />
              <AuthRoutes />
            </div>
          </div>
          <BackToTopButton />
          <Footer name="ITME" />
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}

function AuthRoutes() {
  const { isAuthenticated, role } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/developers" element={<DeveloperTeam />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/contact" element={<ContactForm />} />
      <Route path="/archives" element={<Archives />} />
      <Route path="/archives/:quarter/:volumeNumber" element={<VolumePage />} />
      <Route path="/current-issue" element={<CurrentIssue />} />
      <Route
        path="/abstracting-indexing"
        element={<AbstractingandIndexing />}
      />
      <Route path="/editorial-board" element={<EditorialBoard />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-and-conditions" element={<TermsandConditions />} />
      {isAuthenticated ? (
        <>
          {role === "reviewer" ? (
            <Route path="/reviewer/dashboard" element={<ReviewerDashboard />} />
          ) : (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/form" element={<Form />} />
            </>
          )}
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          {role === "admin" && (
            <Route path="/reviewer/page/:id" element={<ReviewerPage />} />
          )}
          <Route path="/view/:paperId" element={<ViewPaper />} />
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/signup" element={<Navigate to="/" replace />} />
        </>
      ) : (
        <>
          {/* Public access to manuscript form during early phase */}
          <Route path="/form" element={<Form />} />
          <Route path="/admin" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </>
      )}
      <Route path="/reviewer/invite/:inviteid" element={<InvitePage />} />
      <Route path="*" element={<h1>404, Page Not Exist!!!</h1>} />
    </Routes>
  );
}

export default App;
