import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/common/Navbar.js';
import ForgotPassword from './pages/common/forgotPassword/ForgotPassword.js';
import Login from "./pages/common/login/Login.js";
import SignUpFormPlayer from './pages/player/signUp/SignUp.js';
import ListAttributeBranch from './pages/admin/ListAttributeBranch.js';
import CreateAttributeBranch from './pages/admin/CreateAttributeBranch.js';
import DetailAttributeBranch from './pages/admin/DetailAttributeBranch.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/sign-up-player" element={<SignUpFormPlayer />} />
          <Route path="/branch-attribute" element={<ListAttributeBranch />} />
          <Route path="/detail-branch-attribute/:id" element={<DetailAttributeBranch />} />
          <Route path="/create-branch-attribute" element={<CreateAttributeBranch />} />
        </Routes>
      </div>

    </Router>
  )
}

export default App;