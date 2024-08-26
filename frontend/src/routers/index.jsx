import { Navigate, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LayoutPlayer from "../layouts/player/LayoutPlayer";
import LayoutHost from "../layouts/host/LayoutHost";
import LayoutAdmin from "../layouts/admin/dashboard/LayoutAdmin";
import LayoutAuth from "../layouts/auth/LayoutAuth";
import router from "./router";
import { Helmet } from "react-helmet";
// import { Helmet } from "react-helmet";
// eslint-disable-next-line react-refresh/only-export-components, react/prop-types
const ProtectedRoute = ({ component, roles = [] }) => {
  const { user, role } = useSelector((state) => state.user);
  const userRole = user ? role : "GUEST"; // Nếu chưa đăng nhập, role sẽ là "GUEST"
  // Nếu người dùng chưa đăng nhập và role là GUEST hoặc role có GUEST trong mảng roles
  if (!user && roles.includes("GUEST")) {
    return component; // Cho phép GUEST truy cập nếu role có GUEST
  }
  if (!user && roles.length > 0) {
    // Người dùng chưa đăng nhập và route yêu cầu đăng nhập
    return <Navigate to="/login" replace />;
  }
  if (roles.length > 0 && !roles.includes(userRole)) {
    let url = "";
    switch (userRole) {
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
              <>
                <Helmet>
                  <title>{route.name}</title>
                </Helmet>

                <LayoutPlayer>
                  <ProtectedRoute
                    component={route.component}
                    roles={route.role}
                  />
                </LayoutPlayer>
              </>
            }
          />
        );
      case "host":
        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              <>
                <Helmet>
                  <title>{route.name}</title>
                </Helmet>
                <LayoutHost>
                  <ProtectedRoute
                    component={route.component}
                    roles={route.role}
                  />
                </LayoutHost>
              </>
            }
          />
        );

      case "admin":
        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              <>
                <Helmet>
                  <title>{route.name}</title>
                </Helmet>
                <LayoutAdmin>
                  <ProtectedRoute
                    component={route.component}
                    roles={route.role}
                  />
                </LayoutAdmin>
              </>
            }
          />
        );
      case "auth":
        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              <>
                <Helmet>
                  <title>{route.name}</title>
                </Helmet>
                <LayoutAuth>{route.component}</LayoutAuth>{" "}
              </>
            }
          />
        );
      default:
        return route.component;
    }
  });
};
