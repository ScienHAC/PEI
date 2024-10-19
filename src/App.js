import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Header from './MyComponents/Header';
import Footer from './MyComponents/Footer';
import Home from './Pages/Home';
import { About } from './Pages/About';
import Form from './Pages/Form';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import Dashboard from './Pages/Dashboard';
import { AuthProvider } from './Context/AuthContext';
import useAuth from './Hooks/useAuth';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <div id="main">
          <div id="main_body">
            <br /><br />
            <AuthRoutes />
          </div>
        </div>
        <Footer name="PEI" />
      </Router>
    </AuthProvider>
  );
}

function AuthRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      {isAuthenticated ? (
        <>
          <Route path="/form" element={<Form />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <Signup />} />
        </>
      ) : (
        <>
          <Route path="/form" element={isAuthenticated ? <Navigate to="/login" /> : <Form />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </>
      )}
      <Route path="*" element={<h1>Sorry, Page Not Found!</h1>} />
    </Routes>
  );
}

export default App;
