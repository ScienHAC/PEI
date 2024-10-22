import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Header from './MyComponents/Header';
import Footer from './MyComponents/Footer';
import Home from './Pages/Home';
import { About } from './Pages/About';
import Form from './Pages/Form';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import ForgotPassword from './Auth/ForgotPassword';
import Dashboard from './Pages/Dashboard';
import Admin from './Admin/Admin';
import { AuthProvider } from './Context/AuthContext';
import useAuth from './Hooks/useAuth';
import Profile from './Pages/Profile';

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
        <Footer name="PEI" />
      </Router>
    </AuthProvider>
  );
}


function AuthRoutes() {
  const { isAuthenticated, loading } = useAuth();

  // If loading, show a loading spinner or message
  if (loading) {
    return <i className="fa fa-sign-out" aria-hidden="true"></i>; // You can customize this as needed
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      {isAuthenticated ? (
        <>
          <Route path="/form" element={<Form />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/dashboard" element={<Dashboard />} />
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


