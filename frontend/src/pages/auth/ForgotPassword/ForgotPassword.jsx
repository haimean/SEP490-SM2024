import React from 'react';
import ForgotPasswordForm from '../../../components/auth/ForgotPasswordForm.jsx';
import WithAuthRedirect from '../../../utils/WithAuthRedirect.jsx';
const ForgotPassword = () => {
  return (
    <div>
       <ForgotPasswordForm />
    </div>
  );
};

export default WithAuthRedirect(ForgotPassword, '/');