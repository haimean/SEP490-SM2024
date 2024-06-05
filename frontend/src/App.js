import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./pages/common/login/Login.js";
import SignUpFormPlayer from './pages/player/signUp/SignUp.js';
import ForgotPassword from './pages/common/forgotPassword/ForgotPassword.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up-player" element={<SignUpFormPlayer/>} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;