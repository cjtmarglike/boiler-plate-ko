import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import Auth from './components/hoc/auth'

function App() {

  const LandingP = Auth(LandingPage, null)
  const LoginP = Auth(LoginPage, false)
  const RegisterP = Auth(RegisterPage, false)

  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<LandingP />} />
          <Route path="/login" element={<LoginP />} />
          <Route path="/register" element={<RegisterP />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
