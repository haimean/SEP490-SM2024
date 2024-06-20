import React from 'react';
import ForgotPasswordForm from '../../../components/auth/ForgotPasswordForm.jsx';
import withAuthRedirect from '../../../utils/withAuthRedirect.jsx';
const ForgotPassword = () => {
  return (
    <div>
       <ForgotPasswordForm />
    </div>
  );
};

export default withAuthRedirect(ForgotPassword, '/');