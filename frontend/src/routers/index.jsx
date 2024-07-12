import { Navigate, Route } from "react-router-dom";
import router from "./router";
import LayoutPlayer from "../layouts/player/LayoutPlayer";
import LayoutHost from "../layouts/host/LayoutHost";
import LayoutAdmin from "../layouts/admin/dashboard/LayoutAdmin";
import LayoutAuth from "../layouts/auth/LayoutAuth";
import { useSelector } from "react-redux";

// eslint-disable-next-line react-refresh/only-export-components
const ProtectedRoute = ({ component, roles = [] }) => {
  const { user, role } = useSelector((state) => state.user);
  if (!user) {
    // Người dùng chưa đăng nhập và route yêu cầu đăng nhập
    return <Navigate to="/login" replace />;
  }
  if (roles.length > 0 && !roles.includes(role)) {
    // Người dùng đã đăng nhập nhưng vai trò không phù hợp
    return <Navigate to="/401" replace />;
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
            element={
              <LayoutAuth>
                {/* <ProtectedRoute
                  component={route.component}
                  roles={route.role}
                /> */}
                {route.component}
              </LayoutAuth>
            }
          />
        );
      default:
        return route.component;
    }
  });
};
