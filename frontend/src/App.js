import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar.js';
import routes from './routes.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const getRoutes = () => {
    return routes.map((route) => {
      return (
        <Route
          key={route.path}
          path={route.path}
          element={route.component}
        // key={route.path + route.layout}  chưa hiểu để làm gì
        />
      )
    })
  }
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
          {getRoutes()}
        </Routes>
      </div>

    </Router>
  )
}

export default App;