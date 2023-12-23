import logo from './logo.svg';
import './App.css';
import Regitration from './components/Regitration';
import { BrowserRouter as Router,Routes, Route,Link } from "react-router-dom";
import EmailVerification from './components/EmailVerification';
import Login from './components/Login';

const App = () => (
  <Router>
    <Routes>
      <Route exact path="/" element={<Regitration />} />
      <Route path="/verify/:id" element={<EmailVerification/>} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/home" element={<Home />} /> */}
    </Routes>
  </Router>
);


export default App;
