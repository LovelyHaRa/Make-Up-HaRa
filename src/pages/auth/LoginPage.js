import React from 'react';
import { Helmet } from 'react-helmet-async';
import AuthTemplate from '../../components/auth/AuthTemplate';
import LoginForm from '../../containers/auth/LoginForm';

const LoginPage = () => (
  <AuthTemplate>
    <Helmet>
      <title>로그인 - MAKE UP HARA</title>
    </Helmet>
    <LoginForm />
  </AuthTemplate>
);

export default LoginPage;
