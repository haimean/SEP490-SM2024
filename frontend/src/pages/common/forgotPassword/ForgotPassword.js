import React from 'react';
import ForgotPasswordForm from '../../../components/user/ForgotPasswordForm.js';
import withAuthRedirect from '../../../utils/withAuthRedirect.js';
const ForgotPassword = () => {
  return (
    <div>
       <ForgotPasswordForm />
    </div>
  );
};

export default withAuthRedirect(ForgotPassword, '/');