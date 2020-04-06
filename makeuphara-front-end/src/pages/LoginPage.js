import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import LoginForm from '../containers/auth/LoginForm';
import { Helmet } from 'react-helmet-async';

const LoginPage = () => {
  return (
    <AuthTemplate>
      <Helmet>
        <title>로그인 - MAKE UP HARA</title>
      </Helmet>
      <LoginForm />
    </AuthTemplate>
  );
};

export default LoginPage;
