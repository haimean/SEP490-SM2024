import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./pages/common/login/Login.jsx";
import SignUpFormPlayer from './pages/player/signUp/SignUp.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up-player" element={<SignUpFormPlayer/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;