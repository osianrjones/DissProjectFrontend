import './App.css';
import Login from './LandingPage/Login';
import Welcome from './HomePage/Welcome';
import LandingPage from './LandingPage/LandingPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from "./Registration/Register";
import Vote from "./Voting/Vote";
import ViewCandidates from "./Candidates/ViewCandidates";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Welcome/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/vote" element={<Vote/>} />
          <Route path="/candidates" element={<ViewCandidates />} />
      </Routes>
    </Router>
  );
}

export default App;
