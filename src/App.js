import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SingUp from './auth/SingUp';
import SingIn from './auth/SignIn';
import Home from  './Home/Home';
import Profile from './Home/Profile';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/signup" element={<SingUp />}  />
      <Route path="/"  element={<SingIn />} />
      <Route path="/home"  element={<Home/>} />
      <Route path="/profile"  element={<Profile/>} />
    </Routes>
  </Router>
  );
}

export default App;
