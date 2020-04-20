import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Responsive from '../components/common/Responsive';
import { Helmet } from 'react-helmet-async';
import BodyBlock from '../components/common/BodyBlock';

const WikiEditPage = ({ history }) => {
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  if (!user) {
    history.push('/login');
  }
  return (
    <Responsive>
      <Helmet>
        <title>WIKI 에디터 - MAKE UP HARA</title>
      </Helmet>
      <BodyBlock />
    </Responsive>
  );
};

export default withRouter(WikiEditPage);
