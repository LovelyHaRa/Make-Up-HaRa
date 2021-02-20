import React from 'react';
import { Helmet } from 'react-helmet-async';
import AuthTemplate from '../../components/auth/AuthTemplate';
import RegisterForm from '../../containers/auth/RegisterForm';

const RegisterPage = () => (
  <AuthTemplate>
    <Helmet>
      <title>회원가입 - MAKE UP HARA</title>
    </Helmet>
    <RegisterForm />
  </AuthTemplate>
);

export default RegisterPage;
