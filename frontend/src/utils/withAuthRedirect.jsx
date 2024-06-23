import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const withAuthRedirect = (WrappedComponent, defaultRedirectTo) => {
  const AuthRedirect = (props) => {
    const { user, role } = useSelector((state) => state.user);

    if (user) {
      if (role === 'ADMIN') {
        return <Navigate to="/admin/list-account" />;
      } else {
        return <Navigate to={defaultRedirectTo} />;
      }
    }

    return <WrappedComponent {...props} />;
  };

  return AuthRedirect;
};

export default withAuthRedirect;
