import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SingUp from './auth/SingUp';
import SingIn from './auth/SignIn';
import Home from  './Home/Home';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/signup" element={<SingUp />}  />
      <Route path="/"  element={<SingIn />} />
      <Route path="/home"  element={<Home/>} />
    </Routes>
  </Router>
  );
}

export default App;
