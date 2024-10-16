import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './MyComponents/Header';
import Footer from './MyComponents/Footer';
import Home from './Pages/Home';
import { About } from './Pages/About';
import Form from './Pages/Form';
function App() {
  return (
    <>
      <Router>
        <Header />
        <div id="main">
          <div id="main_body">
            <br /><br />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/form' element={<Form />} />
              <Route path='*' element={<h1>Sorry Page Not Found!!!</h1>} />
            </Routes>
          </div>
        </div>
        <Footer name="PEI" />
      </Router>
    </>
  );
}

export default App;
