import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./middleware/redux/store.jsx";
import NotFound from "./pages/common/NotFound/NotFound.jsx";
import { getRoutes } from "./routers/index.jsx";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider as MuiLocalizationProvider } from "@mui/x-date-pickers";
function App() {
  return (
    <Provider store={store}>
      <MuiLocalizationProvider dateAdapter={AdapterDateFns}>
        <Router>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            theme="light"
          />
          <Routes>
            {getRoutes()}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </MuiLocalizationProvider>
    </Provider>
  );
}

export default App;
