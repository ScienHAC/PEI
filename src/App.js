import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import { About } from './Pages/About';
import BackToTopButton from './Components/BackToTopButton.js';
import Form from './Pages/Form';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import ForgotPassword from './Auth/ForgotPassword';
import Dashboard from './Pages/Dashboard';
import Admin from './Admin/Admin';
import { AuthProvider } from './Context/AuthContext';
import useAuth from './Hooks/useAuth';
import Profile from './Pages/Profile';
import ViewPaper from './Pages/ViewPaper.js';
import ContactForm from './Pages/ContactForm.js';
import HomeLoader from './Components/HomeLoader.js';
import Archives from './Pages/Archives.js';
import VolumePage from './Pages/VolumePage.js';
import CurrentIssue from './Pages/CurrentIssue.js';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <div id="main">
          <div id="main_body">
            <br />
            <AuthRoutes />
          </div>
        </div>
        <BackToTopButton />
        <Footer name="PEI" />
      </Router>
    </AuthProvider>
  );
}


function AuthRoutes() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <HomeLoader />;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/contact" element={<ContactForm />} />
      <Route path="/archives" element={<Archives />} />
      <Route path="/archives/:quarter/:volumeNumber" element={<VolumePage />} />
      <Route path="/current-issue" element={<CurrentIssue />} />
      {isAuthenticated ? (
        <>
          <Route path="/form" element={<Form />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/view/:paperId" element={<ViewPaper />} />
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/signup" element={<Navigate to="/" replace />} />
        </>
      ) : (
        <>
          <Route path="/form" element={<Navigate to="/login" replace />} />
          <Route path="/admin" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </>
      )}
      <Route path="*" element={<h1>404, Page Not Exist!!!</h1>} />
    </Routes>
  );
}


export default App;


