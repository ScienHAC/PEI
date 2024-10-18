import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './MyComponents/Header';
import Footer from './MyComponents/Footer';
import Home from './Pages/Home';
import { About } from './Pages/About';
import Form from './Pages/Form';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
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
      <Route path="/form" element={<Form />} />
      {isAuthenticated ? (
        <Route path="/dashboard" element={<h1>Welcome to Dashboard!</h1>} />
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </>
      )}
      <Route path="*" element={<h1>Sorry, Page Not Found!</h1>} />
    </Routes>
  );
}

export default App;
