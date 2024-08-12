import { Navigate, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LayoutPlayer from "../layouts/player/LayoutPlayer";
import LayoutHost from "../layouts/host/LayoutHost";
import LayoutAdmin from "../layouts/admin/dashboard/LayoutAdmin";
import LayoutAuth from "../layouts/auth/LayoutAuth";
import router from "./router";

// eslint-disable-next-line react-refresh/only-export-components, react/prop-types
const ProtectedRoute = ({ component, roles = [] }) => {
  const { user, role } = useSelector((state) => state.user);
  if (!user && roles.length > 0) {
    // Người dùng chưa đăng nhập và route yêu cầu đăng nhập
    return <Navigate to="/login" replace />;
  }
  if (roles.length > 0 && !roles.includes(role)) {
    let url = "";
    switch (role) {
      case "HOST":
        url = "/host/dashboard";
        break;
      case "ADMIN":
        url = "/admin/dashboard";
        break;
      case "USER":
        url = "/";
        break;
    }
    return <Navigate to={url} replace />;
  }
  return component;
};

export const getRoutes = () => {
  return router.map((route) => {
    switch (route.layout) {
      case "":
        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              <LayoutPlayer>
                <ProtectedRoute
                  component={route.component}
                  roles={route.role}
                />
                <DialogInfoComponent />
              </LayoutPlayer>
            }
          />
        );
      case "host":
        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              <LayoutHost>
                <ProtectedRoute
                  component={route.component}
                  roles={route.role}
                />
              </LayoutHost>
            }
          />
        );

      case "admin":
        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              <LayoutAdmin>
                <ProtectedRoute
                  component={route.component}
                  roles={route.role}
                />
              </LayoutAdmin>
            }
          />
        );
      case "auth":
        return (
          <Route
            key={route.path}
            path={route.path}
            element={<LayoutAuth>{route.component}</LayoutAuth>}
          />
        );
      default:
        return route.component;
    }
  });
};
