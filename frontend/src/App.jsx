import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import store from "./redux/store.js";
// import routes from "./routes.js";
// import NotFound from "./pages/common/NotFound/NotFound.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListAccount from "./pages/admin/ListAccount/ListAccount";
const ProtectedRoute = ({ component, roles = [] }) => {
  const { user, role } = useSelector((state) => state.user);

  if (!user && roles.length > 0) {
    // Người dùng chưa đăng nhập và route yêu cầu đăng nhập
    return <Navigate to="/login" replace />;
  }

  if (roles.length > 0 && !roles.includes(role)) {
    // Người dùng đã đăng nhập nhưng vai trò không phù hợp
    return <Navigate to="/404" replace />;
  }

  return component;
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <ListAccount />,
  },
]);
function App() {
  const getRoutes = () => {
    return routes.map((route) => (
      <Route
        key={route.path}
        path={route.path}
        element={
          <ProtectedRoute component={route.component} roles={route.role} />
        }
      />
    ));
  };

  // return (
  //   <Provider store={store}>
  //     <Router>
  //       <ToastContainer
  //         position="top-right"
  //         autoClose={5000}
  //         hideProgressBar={false}
  //         newestOnTop={false}
  //         closeOnClick
  //         rtl={false}
  //         pauseOnFocusLoss
  //         draggable
  //         pauseOnHover
  //         theme="light"
  //       />
  //       <div className="App">
  //         {/* <Navbar /> */}
  //         <Routes>
  //           <Route path="*" element={<NotFound />} />
  //         </Routes>
  //       </div>
  //     </Router>
  //   </Provider>
  // );
  return <RouterProvider router={router} />;
}

export default App;
