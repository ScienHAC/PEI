import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './MyComponents/Header';
import Footer from './MyComponents/Footer';
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
              <Route path="/" element={
                <>
                  <h2>Welcome to PEI</h2>
                  <br />
                  <blockquote>
                    <a href="google.com">PIONEERING ENGINEERING INSIGHT</a>
                    (ISSN:0923-4748) is dedicated to publishing high-quality research in
                    the field of Engineering. We strive to provide a platform for
                    scholars, researchers, practitioners to share their insights and
                    contribute to the advancement of knowledge in this dynamic field.
                    <br /><br />
                    The journal links engineering, science, and management disciplines.
                    It addresses the issues involved in the planning, development, and
                    implementation of technological capabilities to shape and accomplish
                    the strategic and operational objectives of an organization. It
                    covers not only R&D management, but also the entire spectrum of
                    managerial concerns in technology-based organizations.
                    This includes
                    issues relating to new product development, human resource
                    management, innovation process management project management,
                    technological fusion, marketing, technological forecasting and
                    strategic planning.
                    <br />
                    <br />
                    The journal provides an interface between technology and other
                    corporate functions such as R&D, marketing, manufacturing and
                    administration. Its ultimate goal is to make a profound contribution
                    to theory development, research ond practice by serving as a leading
                    forum for the publication of scholarly research on all aspects of
                    technology, innovation, and engineering management
                    <br />
                    <br />
                    Scopus Indexing Link -
                    <a href="google.com"> https://www.scopus.com/sourceid/20575</a>
                  </blockquote>
                  <h3>Journal Insights</h3>
                  <br />

                  <table>
                    <thead>
                      <tr>
                        <td>Aims and Scopes</td>
                        <td>
                          <i>Pioneering Engineering Insight</i> is an international scholarly
                          refereed research journal which aims to the theory and practice of
                          technology innovation and engineering management <br /><br /> The journal
                          links engineering, science, and management disciplines. It
                          addresses ...
                        </td>
                      </tr>
                    </thead>
                  </table>
                </>
              } />
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
